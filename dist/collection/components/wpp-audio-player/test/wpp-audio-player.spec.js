import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { FOCUS_TYPE } from '../../../types/common';
import { WppAudioPlayer } from '../wpp-audio-player';
import { AUDIO_SKIP_TIME_VALUE, DEFAULT_PLAYBACK_RATES, LOCALES_DEFAULTS, VOLUME_SKIP_VALUE } from '../const';
const EVENT_NAMES = [
  'wppPlay',
  'wppPause',
  'wppEnded',
  'wppTimeUpdate',
  'wppVolumeChange',
  'wppPlaybackRateChange',
];
/** Stencil's mock DOM has no media element, so the `<audio>` the player drives is faked. */
const createAudioMock = (overrides = {}) => ({
  play: jest.fn().mockResolvedValue(undefined),
  pause: jest.fn(),
  currentTime: 0,
  duration: 120,
  volume: 1,
  muted: false,
  playbackRate: 1,
  buffered: { length: 1, end: jest.fn(() => 60) },
  ...overrides,
});
/**
 * A bare instance, outside any page: watchers and listeners do not fire on their own, so each
 * method is called directly and tested in isolation. The emitters are replaced with mocks, since a
 * detached instance has no host to dispatch on.
 */
const createPlayer = (props = {}, audio = createAudioMock()) => {
  const player = new WppAudioPlayer();
  Object.assign(player, props);
  player.audioRef = audio;
  EVENT_NAMES.forEach(name => (player[name] = { emit: jest.fn() }));
  return { player, audio };
};
const createKeyEvent = (key, init = {}) => ({
  key,
  ctrlKey: false,
  metaKey: false,
  altKey: false,
  defaultPrevented: false,
  preventDefault: jest.fn(),
  composedPath: () => [],
  ...init,
});
const flushPromises = () => new Promise(resolve => setTimeout(resolve, 0));
const renderPlayer = (props = {}) => newSpecPage({
  components: [WppAudioPlayer],
  template: () => h("wpp-audio-player-v4-5-0", { src: "track.mp3", ...props }),
});
const query = (page, selector) => page.root?.shadowRoot?.querySelector(selector);
const queryAll = (page, selector) => Array.from(page.root?.shadowRoot?.querySelectorAll(selector) ?? []);
describe('wpp-audio-player', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });
  describe('Testing initialisation & API', () => {
    it('creates the component with the documented defaults', () => {
      const player = new WppAudioPlayer();
      expect(player).toBeTruthy();
      // Public props
      expect(player.src).toBe('');
      expect(player.type).toBeUndefined();
      expect(player.autoplay).toBe(false);
      expect(player.loop).toBe(false);
      expect(player.preload).toBe('metadata');
      expect(player.playbackRates).toEqual(DEFAULT_PLAYBACK_RATES);
      expect(player.playbackRate).toBe(1);
      expect(player.volume).toBe(1);
      expect(player.locales).toEqual({});
      expect(player.ariaProps).toEqual({});
      // Internal state
      expect(player.audioPlayerState).toBe('idle');
      expect(player.currentAudioTime).toBe(0);
      expect(player.overallAudioTime).toBe(0);
      expect(player.loadedPercentage).toBe(0);
      expect(player.timeFormat).toBe('default');
      expect(player.isPlaybackRateOpen).toBe(false);
      expect(player.focusType).toBe(FOCUS_TYPE.NONE);
      expect(player.isScrubbing).toBe(false);
    });
    it('exposes the public events and methods', async () => {
      const page = await renderPlayer();
      EVENT_NAMES.forEach(name => expect(page.rootInstance[name]).toBeDefined());
      // Methods are reachable on the host element, which is how consumers call them.
      expect(typeof page.root?.play).toBe('function');
      expect(typeof page.root?.pause).toBe('function');
      expect(typeof page.root?.seek).toBe('function');
    });
  });
  describe('Testing Watchers', () => {
    it('applies a volume change to the audio element and emits it, clamped to 0–1', () => {
      const { player, audio } = createPlayer();
      player.volume = 0.4;
      player.onVolumeChange();
      expect(audio.volume).toBe(0.4);
      expect(audio.muted).toBe(false);
      expect(player.wppVolumeChange.emit).toHaveBeenLastCalledWith({ volume: 0.4, isMuted: false });
      player.volume = 1.5;
      player.onVolumeChange();
      expect(audio.volume).toBe(1);
      expect(player.wppVolumeChange.emit).toHaveBeenLastCalledWith({ volume: 1, isMuted: false });
      player.volume = -1;
      player.onVolumeChange();
      expect(audio.volume).toBe(0);
      expect(audio.muted).toBe(true);
      expect(player.wppVolumeChange.emit).toHaveBeenLastCalledWith({ volume: 0, isMuted: true });
    });
    it('applies a playback rate change to the audio element and emits it', () => {
      const { player, audio } = createPlayer();
      player.onPlaybackRateChange(1.5);
      expect(audio.playbackRate).toBe(1.5);
      expect(player.wppPlaybackRateChange.emit).toHaveBeenCalledWith({ playbackRate: 1.5 });
    });
    it('does nothing before the audio element exists', () => {
      const { player } = createPlayer();
      player.audioRef = undefined;
      player.onVolumeChange();
      player.onPlaybackRateChange(2);
      expect(player.wppVolumeChange.emit).not.toHaveBeenCalled();
      expect(player.wppPlaybackRateChange.emit).not.toHaveBeenCalled();
    });
  });
  describe('Testing Listeners', () => {
    const setup = () => {
      const { player, audio } = createPlayer({ volume: 0.5 });
      player.overallAudioTime = 120;
      audio.currentTime = 50;
      return { player, audio };
    };
    it('seeks with the arrow keys, Home and End, and cancels their default', () => {
      const cases = [
        { key: 'ArrowLeft', expected: 50 - AUDIO_SKIP_TIME_VALUE },
        { key: 'ArrowRight', expected: 50 + AUDIO_SKIP_TIME_VALUE },
        { key: 'Home', expected: 0 },
        { key: 'End', expected: 120 },
      ];
      cases.forEach(({ key, expected }) => {
        const { player, audio } = setup();
        const event = createKeyEvent(key);
        player.handleKeyDown(event);
        expect(audio.currentTime).toBe(expected);
        expect(event.preventDefault).toHaveBeenCalled();
      });
    });
    it('changes the volume with the Up/Down arrows, revealing the slider, and mutes with M', () => {
      const { player } = setup();
      const revealSpy = jest.spyOn(player, 'revealVolumeSlider');
      player.handleKeyDown(createKeyEvent('ArrowUp'));
      expect(player.volume).toBeCloseTo(0.5 + VOLUME_SKIP_VALUE);
      expect(revealSpy).toHaveBeenCalledTimes(1);
      player.handleKeyDown(createKeyEvent('ArrowDown'));
      player.handleKeyDown(createKeyEvent('ArrowDown'));
      expect(player.volume).toBeCloseTo(0.5 - VOLUME_SKIP_VALUE);
      expect(revealSpy).toHaveBeenCalledTimes(3);
      player.handleKeyDown(createKeyEvent('m'));
      expect(player.volume).toBe(0);
      player.handleKeyDown(createKeyEvent('M'));
      expect(player.volume).toBeCloseTo(0.5 - VOLUME_SKIP_VALUE);
      // The volume keys stop at the boundaries.
      player.volume = 1;
      player.handleKeyDown(createKeyEvent('ArrowUp'));
      expect(player.volume).toBe(1);
    });
    it('rounds the volume steps to 2 decimals, so repeated presses do not accumulate floating point errors', () => {
      const { player } = setup();
      player.volume = 1;
      Array.from({ length: 4 }).forEach(() => player.handleKeyDown(createKeyEvent('ArrowDown')));
      // Unrounded, 1 - 4 * 0.05 gives 0.7999999999999998.
      expect(player.volume).toBe(0.8);
      Array.from({ length: 3 }).forEach(() => player.handleKeyDown(createKeyEvent('ArrowUp')));
      expect(player.volume).toBe(0.95);
    });
    it('toggles playback with Space, but leaves Space to controls that it activates natively', () => {
      const { player, audio } = setup();
      const button = document.createElement('button');
      // Stencil's mock DOM does not make a `div` an `HTMLElement` instance, as a browser does, so the
      // pill is built on that prototype to reach the role check.
      const pill = Object.assign(Object.create(HTMLElement.prototype), {
        getAttribute: (name) => (name === 'role' ? 'checkbox' : null),
      });
      const plainElement = Object.assign(Object.create(HTMLElement.prototype), { getAttribute: () => null });
      player.handleKeyDown(createKeyEvent(' '));
      expect(audio.play).toHaveBeenCalledTimes(1);
      player.audioPlayerState = 'playing';
      player.handleKeyDown(createKeyEvent(' '));
      expect(audio.pause).toHaveBeenCalledTimes(1);
      const onButton = createKeyEvent(' ', { composedPath: () => [button] });
      const onPill = createKeyEvent(' ', { composedPath: () => [pill] });
      player.handleKeyDown(onButton);
      player.handleKeyDown(onPill);
      expect(audio.pause).toHaveBeenCalledTimes(1);
      expect(onButton.preventDefault).not.toHaveBeenCalled();
      expect(onPill.preventDefault).not.toHaveBeenCalled();
      // An element without an activating role, such as the player itself, keeps the shortcut.
      const onPlainElement = createKeyEvent(' ', { composedPath: () => [plainElement] });
      player.handleKeyDown(onPlainElement);
      expect(audio.pause).toHaveBeenCalledTimes(2);
      expect(onPlainElement.preventDefault).toHaveBeenCalled();
    });
    it('handles the keys pressed anywhere on the player, through its host', async () => {
      const page = await renderPlayer();
      const audio = query(page, 'audio');
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight', cancelable: true });
      page.rootInstance.overallAudioTime = 120;
      audio.currentTime = 50;
      page.root?.dispatchEvent(event);
      expect(audio.currentTime).toBe(50 + AUDIO_SKIP_TIME_VALUE);
      expect(event.defaultPrevented).toBe(true);
    });
    it('ignores modifier shortcuts, already handled events and unmapped keys', () => {
      const { player, audio } = setup();
      const events = [
        createKeyEvent('ArrowLeft', { ctrlKey: true }),
        createKeyEvent('ArrowLeft', { metaKey: true }),
        createKeyEvent('ArrowLeft', { altKey: true }),
        createKeyEvent('ArrowLeft', { defaultPrevented: true }),
        createKeyEvent('Enter'),
        createKeyEvent('a'),
      ];
      events.forEach(event => player.handleKeyDown(event));
      expect(audio.currentTime).toBe(50);
      expect(player.volume).toBe(0.5);
      expect(audio.play).not.toHaveBeenCalled();
      events.forEach(event => expect(event.preventDefault).not.toHaveBeenCalled());
    });
  });
  describe('Testing lifecycle methods', () => {
    it('cancels a pending slider close when removed from the DOM', () => {
      jest.useFakeTimers();
      const { player } = createPlayer();
      const container = { classList: { add: jest.fn(), remove: jest.fn() } };
      player.volumeBarContainerRef = container;
      player.volumeButtonRef = {};
      player.volumeSliderHide(300);
      player.disconnectedCallback();
      jest.advanceTimersByTime(300);
      expect(container.classList.remove).not.toHaveBeenCalled();
      // Nothing scheduled: nothing to cancel either.
      expect(() => player.disconnectedCallback()).not.toThrow();
      jest.useRealTimers();
    });
    it('stops a scrub in progress when removed from the DOM, releasing its window listeners', () => {
      const { player } = createPlayer();
      const removeListener = jest.spyOn(window, 'removeEventListener');
      player.startScrubbing();
      player.disconnectedCallback();
      expect(player.isScrubbing).toBe(false);
      expect(removeListener).toHaveBeenCalledWith('pointerup', player.stopScrubbing);
      expect(removeListener).toHaveBeenCalledWith('pointercancel', player.stopScrubbing);
    });
    it('applies the clamped volume and the playback rate once loaded', () => {
      const { player, audio } = createPlayer({ volume: 3, playbackRate: 1.25 });
      player.componentDidLoad();
      expect(audio.volume).toBe(1);
      expect(audio.playbackRate).toBe(1.25);
    });
    it('does not fail when the audio element is missing', () => {
      const { player } = createPlayer();
      player.audioRef = undefined;
      expect(() => player.componentDidLoad()).not.toThrow();
    });
  });
  describe('Testing public methods', () => {
    it('delegates play and pause to the audio element', async () => {
      const { player, audio } = createPlayer();
      await player.play();
      await player.pause();
      expect(audio.play).toHaveBeenCalledTimes(1);
      expect(audio.pause).toHaveBeenCalledTimes(1);
    });
    it('passes a rejected play on to the caller', async () => {
      const error = new Error('NotAllowedError');
      const { player } = createPlayer({}, createAudioMock({ play: jest.fn().mockRejectedValue(error) }));
      await expect(player.play()).rejects.toBe(error);
    });
    it('seeks to the given time, clamped to the track boundaries', async () => {
      const { player, audio } = createPlayer();
      player.overallAudioTime = 120;
      await player.seek(30);
      expect(audio.currentTime).toBe(30);
      await player.seek(-10);
      expect(audio.currentTime).toBe(0);
      await player.seek(500);
      expect(audio.currentTime).toBe(120);
    });
    it('moves the timeline at once on a seek, without waiting for the audio there to load', async () => {
      const { player } = createPlayer();
      player.overallAudioTime = 120;
      await player.seek(80);
      expect(player.currentAudioTime).toBe(80);
      expect(player.seekProgress).toBeCloseTo(66.67, 2);
      await player.seek(500);
      expect(player.currentAudioTime).toBe(120);
    });
    it('starts over from the beginning when played at the end, even where the browser has not flagged it ended', async () => {
      const cases = [
        // Chromium, after a seek to the very end of a VBR MP3
        { currentTime: 120, ended: false, expectedStart: 0 },
        { currentTime: 120, ended: true, expectedStart: 0 },
        // Any audio left before the end still plays.
        { currentTime: 119.9, ended: false, expectedStart: 119.9 },
        { currentTime: 30, ended: false, expectedStart: 30 },
      ];
      for (const { currentTime, ended, expectedStart } of cases) {
        const { player, audio } = createPlayer({}, createAudioMock({ currentTime, ended }));
        let startedAt;
        // The position is read when playback starts: a restart after it would sound the end first.
        audio.play.mockImplementation(async () => {
          startedAt = audio.currentTime;
        });
        player.overallAudioTime = 120;
        await player.play();
        expect(startedAt).toBe(expectedStart);
        expect(audio.play).toHaveBeenCalledTimes(1);
      }
    });
    it('does not restart before the duration is known', async () => {
      const { player, audio } = createPlayer({}, createAudioMock({ currentTime: 0.1 }));
      await player.play();
      expect(audio.currentTime).toBe(0.1);
      expect(audio.play).toHaveBeenCalledTimes(1);
    });
    it('resolves without an audio element', async () => {
      const { player } = createPlayer();
      player.audioRef = undefined;
      await expect(player.play()).resolves.toBeUndefined();
      await expect(player.pause()).resolves.toBeUndefined();
      await expect(player.seek(10)).resolves.toBeUndefined();
    });
  });
  describe('Testing media event handlers', () => {
    it('reads the duration and picks the time format', () => {
      const cases = [
        { duration: 90, expectedDuration: 90, expectedFormat: 'default' },
        { duration: 3600, expectedDuration: 3600, expectedFormat: 'extended' },
        { duration: Infinity, expectedDuration: 0, expectedFormat: 'default' },
        { duration: NaN, expectedDuration: 0, expectedFormat: 'default' },
      ];
      cases.forEach(({ duration, expectedDuration, expectedFormat }) => {
        const { player } = createPlayer({}, createAudioMock({ duration }));
        player.syncDuration();
        expect(player.overallAudioTime).toBe(expectedDuration);
        expect(player.timeFormat).toBe(expectedFormat);
      });
    });
    it('reads the duration on metadata and autoplays only when asked, logging a rejection', async () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => { });
      const manual = createPlayer();
      manual.player.handleMetadataLoaded();
      expect(manual.player.overallAudioTime).toBe(120);
      expect(manual.audio.play).not.toHaveBeenCalled();
      const autoplay = createPlayer({ autoplay: true });
      autoplay.player.handleMetadataLoaded();
      expect(autoplay.audio.play).toHaveBeenCalledTimes(1);
      const error = new Error('NotAllowedError');
      const blocked = createPlayer({ autoplay: true }, createAudioMock({ play: jest.fn().mockRejectedValue(error) }));
      blocked.player.handleMetadataLoaded();
      await flushPromises();
      expect(consoleError).toHaveBeenCalledWith('Autoplay error:', error);
    });
    it('tracks the playback position and emits it', () => {
      const { player, audio } = createPlayer();
      player.overallAudioTime = 120;
      audio.currentTime = 42;
      player.handleTimeUpdate();
      expect(player.currentAudioTime).toBe(42);
      expect(player.wppTimeUpdate.emit).toHaveBeenCalledWith({ currentTime: 42, duration: 120 });
    });
    it('computes the buffered percentage, capped at 100', () => {
      const { player, audio } = createPlayer();
      player.overallAudioTime = 120;
      player.handleLoadProgress();
      expect(player.loadedPercentage).toBe(50);
      audio.buffered.end.mockReturnValue(200);
      player.handleLoadProgress();
      expect(player.loadedPercentage).toBe(100);
      // Nothing buffered yet, or no duration to measure against: the value is left as it is.
      audio.buffered.length = 0;
      player.handleLoadProgress();
      player.overallAudioTime = 0;
      player.handleLoadProgress();
      expect(player.loadedPercentage).toBe(100);
    });
    it('follows the play, pause and ended states and emits each one', () => {
      const { player, audio } = createPlayer();
      player.handlePlay();
      expect(player.audioPlayerState).toBe('playing');
      expect(player.wppPlay.emit).toHaveBeenCalledTimes(1);
      player.handlePause();
      expect(player.audioPlayerState).toBe('paused');
      expect(player.wppPause.emit).toHaveBeenCalledTimes(1);
      // `ended` re-reads the final position, so the thumb lands on the end of the seek bar.
      audio.currentTime = 120;
      player.handleEnded();
      expect(player.audioPlayerState).toBe('idle');
      expect(player.currentAudioTime).toBe(120);
      expect(player.wppEnded.emit).toHaveBeenCalledTimes(1);
    });
    it('listens to the media events of the rendered audio element', async () => {
      const page = await renderPlayer();
      const audio = query(page, 'audio');
      const instance = page.rootInstance;
      const dispatch = (name) => audio.dispatchEvent(new Event(name));
      Object.defineProperty(audio, 'duration', { value: 120, configurable: true });
      Object.defineProperty(audio, 'buffered', { value: { length: 1, end: () => 30 } });
      dispatch('loadedmetadata');
      expect(instance.overallAudioTime).toBe(120);
      // A duration the browser corrects later moves the end of the seek bar with it.
      Object.defineProperty(audio, 'duration', { value: 150 });
      dispatch('durationchange');
      expect(instance.overallAudioTime).toBe(150);
      audio.currentTime = 42;
      dispatch('timeupdate');
      expect(instance.currentAudioTime).toBe(42);
      dispatch('progress');
      expect(instance.loadedPercentage).toBe(20);
      dispatch('play');
      expect(instance.audioPlayerState).toBe('playing');
      dispatch('pause');
      expect(instance.audioPlayerState).toBe('paused');
      dispatch('ended');
      expect(instance.audioPlayerState).toBe('idle');
    });
    it('ignores media events that arrive without an audio element', () => {
      const { player } = createPlayer();
      player.audioRef = undefined;
      player.handleMetadataLoaded();
      player.syncDuration();
      player.handleTimeUpdate();
      player.handleLoadProgress();
      player.handleEnded();
      expect(player.overallAudioTime).toBe(0);
      expect(player.currentAudioTime).toBe(0);
      expect(player.loadedPercentage).toBe(0);
      expect(player.wppTimeUpdate.emit).not.toHaveBeenCalled();
    });
  });
  describe('Testing user interactions', () => {
    it('seeks and changes the volume from the sliders', () => {
      const { player, audio } = createPlayer();
      player.overallAudioTime = 120;
      player.handleSeek({ target: { value: '30.5' } });
      player.handleVolume({ target: { value: '0.25' } });
      expect(audio.currentTime).toBe(30.5);
      expect(player.currentAudioTime).toBe(30.5);
      expect(player.volume).toBe(0.25);
    });
    it('scrubs from a press on the seek bar until the pointer is released or cancelled anywhere', async () => {
      const page = await renderPlayer();
      const instance = page.rootInstance;
      const seekBar = query(page, '.seek-bar');
      seekBar.dispatchEvent(new Event('pointerdown'));
      expect(instance.isScrubbing).toBe(true);
      window.dispatchEvent(new Event('pointerup'));
      expect(instance.isScrubbing).toBe(false);
      seekBar.dispatchEvent(new Event('pointerdown'));
      window.dispatchEvent(new Event('pointercancel'));
      expect(instance.isScrubbing).toBe(false);
      // The window listeners go with the release, so a later pointerup elsewhere changes nothing.
      const removeListener = jest.spyOn(window, 'removeEventListener');
      instance.isScrubbing = true;
      window.dispatchEvent(new Event('pointerup'));
      expect(instance.isScrubbing).toBe(true);
      expect(removeListener).not.toHaveBeenCalled();
    });
    it('applies a valid speed from the pills and closes the popover, ignoring anything else', () => {
      const { player } = createPlayer();
      player.playbackRatePopoverRef = { closePopover: jest.fn() };
      player.handlePlaybackRateChange({ detail: { value: 1.5 } });
      expect(player.playbackRate).toBe(1.5);
      expect(player.playbackRatePopoverRef.closePopover).toHaveBeenCalledTimes(1);
      player.handlePlaybackRateChange({ detail: { value: 'fast' } });
      expect(player.playbackRate).toBe(1.5);
      expect(player.playbackRatePopoverRef.closePopover).toHaveBeenCalledTimes(1);
      // Still applied before the popover has rendered.
      player.playbackRatePopoverRef = undefined;
      player.handlePlaybackRateChange({ detail: { value: 2 } });
      expect(player.playbackRate).toBe(2);
    });
    it('tracks the playback rate popover open state', async () => {
      const page = await renderPlayer();
      const [ratePopover] = queryAll(page, 'wpp-popover');
      // The popover renders a dialog, which needs an accessible name.
      expect(ratePopover.ariaProps).toEqual({ label: LOCALES_DEFAULTS.playbackRateButtonAriaLabel });
      ratePopover.config.onShow();
      expect(page.rootInstance.isPlaybackRateOpen).toBe(true);
      ratePopover.config.onHide();
      expect(page.rootInstance.isPlaybackRateOpen).toBe(false);
    });
    it('skips from the skip buttons', async () => {
      const page = await renderPlayer();
      const audio = createAudioMock({ currentTime: 50 });
      const [, backButton, , forwardButton] = queryAll(page, 'wpp-action-button');
      page.rootInstance.audioRef = audio;
      page.rootInstance.overallAudioTime = 120;
      backButton.dispatchEvent(new CustomEvent('click'));
      expect(audio.currentTime).toBe(50 - AUDIO_SKIP_TIME_VALUE);
      forwardButton.dispatchEvent(new CustomEvent('click'));
      expect(audio.currentTime).toBe(50);
    });
    it('toggles play and pause from the play button, logging a rejected play', async () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => { });
      const { player, audio } = createPlayer();
      player.togglePlay();
      expect(audio.play).toHaveBeenCalledTimes(1);
      player.audioPlayerState = 'playing';
      player.togglePlay();
      expect(audio.pause).toHaveBeenCalledTimes(1);
      const error = new Error('NotAllowedError');
      audio.play.mockRejectedValueOnce(error);
      player.audioPlayerState = 'paused';
      player.togglePlay();
      await flushPromises();
      expect(consoleError).toHaveBeenCalledWith('Playback error:', error);
    });
    it('opens the volume slider on hover and focus, and closes it shortly after they leave', async () => {
      const page = await renderPlayer();
      // Enabled only once the page is up: Stencil's page setup relies on real timers.
      jest.useFakeTimers();
      const container = query(page, '.volume-container');
      const sliderContainer = query(page, '.slider-container');
      const [, , , , volumeButton] = queryAll(page, 'wpp-action-button');
      const slider = query(page, '.volume-container .progress-bar');
      container.dispatchEvent(new MouseEvent('mouseenter'));
      expect(sliderContainer.classList.contains('active')).toBe(true);
      // The button keeps its hover look while the slider is open.
      expect(container.classList.contains('open')).toBe(true);
      container.dispatchEvent(new MouseEvent('mouseleave'));
      jest.advanceTimersByTime(299);
      expect(sliderContainer.classList.contains('active')).toBe(true);
      jest.advanceTimersByTime(1);
      expect(sliderContainer.classList.contains('active')).toBe(false);
      expect(container.classList.contains('open')).toBe(false);
      // Keyboard users get the slider on focus too, from the button and from the slider itself.
      volumeButton.dispatchEvent(new CustomEvent('focus'));
      expect(sliderContainer.classList.contains('active')).toBe(true);
      volumeButton.dispatchEvent(new CustomEvent('focusout'));
      slider.dispatchEvent(new CustomEvent('focus'));
      jest.advanceTimersByTime(300);
      // Moving the focus into the slider cancels the close that leaving the button scheduled.
      expect(sliderContainer.classList.contains('active')).toBe(true);
      slider.dispatchEvent(new CustomEvent('focusout'));
      jest.advanceTimersByTime(300);
      expect(sliderContainer.classList.contains('active')).toBe(false);
      jest.useRealTimers();
    });
    it('opens the volume slider below the button when there is no room above it in the viewport', async () => {
      const page = await renderPlayer();
      const container = query(page, '.volume-container');
      const sliderContainer = query(page, '.slider-container');
      const originalInnerHeight = window.innerHeight;
      // The player sits near the top of the viewport, so the slider would open past its edge.
      Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true });
      container.getBoundingClientRect = () => ({ top: 50, bottom: 82 });
      sliderContainer.getBoundingClientRect = () => ({ top: -42 });
      container.dispatchEvent(new MouseEvent('mouseenter'));
      expect(sliderContainer).toHaveClass('active');
      expect(sliderContainer).toHaveClass('below');
      Object.defineProperty(window, 'innerHeight', { value: originalInnerHeight, configurable: true });
    });
    it('reveals the slider for a keyboard change, but keeps it open while the slider is focused', () => {
      jest.useFakeTimers();
      const { player } = createPlayer();
      const container = { classList: { add: jest.fn(), remove: jest.fn() } };
      const slider = {};
      player.volumeBarContainerRef = container;
      player.volumeButtonRef = {};
      player.volumeBarRef = slider;
      // `@Element()` compiles to a getter, so the fake host is defined over it.
      Object.defineProperty(player, 'host', { value: { shadowRoot: { activeElement: null } }, configurable: true });
      player.revealVolumeSlider();
      expect(container.classList.add).toHaveBeenCalledWith('active');
      jest.advanceTimersByTime(1000);
      expect(container.classList.remove).toHaveBeenCalledWith('active');
      // The listener is on the slider itself, so hiding it would take their control away.
      container.classList.add.mockClear();
      container.classList.remove.mockClear();
      player.host.shadowRoot.activeElement = slider;
      player.revealVolumeSlider();
      expect(container.classList.add).toHaveBeenCalledWith('active');
      jest.advanceTimersByTime(1000);
      expect(container.classList.remove).not.toHaveBeenCalled();
      // Nothing to show before the volume bar has rendered.
      player.volumeBarContainerRef = undefined;
      expect(() => player.revealVolumeSlider()).not.toThrow();
      jest.useRealTimers();
    });
    it('dismisses the slider on Escape and returns the focus to the mute button', async () => {
      const page = await renderPlayer();
      const container = query(page, '.volume-container');
      const sliderContainer = query(page, '.slider-container');
      const slider = query(page, '.volume-container .progress-bar');
      const nativeButton = { focus: jest.fn() };
      page.rootInstance.volumeButtonRef = { shadowRoot: { querySelector: () => nativeButton } };
      Object.defineProperty(page.rootInstance, 'host', {
        value: { shadowRoot: { activeElement: slider } },
        configurable: true,
      });
      slider.dispatchEvent(new CustomEvent('focus'));
      expect(sliderContainer.classList.contains('active')).toBe(true);
      container.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      // The focus moves first, so the closed slider does not drop it on the body.
      expect(nativeButton.focus).toHaveBeenCalledTimes(1);
      expect(sliderContainer.classList.contains('active')).toBe(false);
      expect(container.classList.contains('open')).toBe(false);
      // Other keys, and Escape on a closed slider, do nothing.
      container.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      container.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      expect(nativeButton.focus).toHaveBeenCalledTimes(1);
      // With the focus on the button, it stays there.
      page.rootInstance.host.shadowRoot.activeElement = {};
      slider.dispatchEvent(new CustomEvent('focus'));
      container.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      expect(nativeButton.focus).toHaveBeenCalledTimes(1);
      expect(sliderContainer.classList.contains('active')).toBe(false);
    });
    it('mutes from a click on the volume button and restores the previous volume', async () => {
      const page = await renderPlayer({ volume: 0.6 });
      const [, , , , volumeButton] = queryAll(page, 'wpp-action-button');
      volumeButton.dispatchEvent(new CustomEvent('click'));
      await page.waitForChanges();
      expect(page.rootInstance.volume).toBe(0);
      expect(query(page, 'wpp-icon-speaker-mute')).toBeTruthy();
      volumeButton.dispatchEvent(new CustomEvent('click'));
      await page.waitForChanges();
      expect(page.rootInstance.volume).toBe(0.6);
      expect(query(page, 'wpp-icon-speaker')).toBeTruthy();
      // Starting muted, unmuting falls back to full volume.
      const muted = createPlayer({ volume: 0 }).player;
      muted.toggleMute();
      expect(muted.volume).toBe(1);
    });
    it('skips relative to the current position, within the track', () => {
      const { player, audio } = createPlayer();
      player.overallAudioTime = 120;
      audio.currentTime = 115;
      player.skip(AUDIO_SKIP_TIME_VALUE);
      expect(audio.currentTime).toBe(120);
      player.skip(-200);
      expect(audio.currentTime).toBe(0);
      player.audioRef = undefined;
      expect(() => player.skip(10)).not.toThrow();
    });
  });
  describe('Testing helpers', () => {
    it('formats times as MM:SS, or HH:MM:SS for long tracks, and treats invalid times as zero', () => {
      const { player } = createPlayer();
      expect(player.formatTime(65)).toBe('01:05');
      expect(player.formatTime(59.9)).toBe('00:59');
      expect(player.formatTime(-5)).toBe('00:00');
      expect(player.formatTime(NaN)).toBe('00:00');
      expect(player.formatTime(Infinity)).toBe('00:00');
      player.timeFormat = 'extended';
      expect(player.formatTime(3725)).toBe('01:02:05');
      expect(player.formatTime(0)).toBe('00:00:00');
    });
    it('formats playback rates with at least one decimal', () => {
      const { player } = createPlayer();
      expect(player.formatPlaybackRate(1)).toBe('1.0x');
      expect(player.formatPlaybackRate(2)).toBe('2.0x');
      expect(player.formatPlaybackRate(0.5)).toBe('0.5x');
      expect(player.formatPlaybackRate(1.25)).toBe('1.25x');
    });
    it('computes the seek progress and clamps volume and time', () => {
      const { player } = createPlayer();
      expect(player.seekProgress).toBe(0);
      player.overallAudioTime = 120;
      player.currentAudioTime = 30;
      expect(player.seekProgress).toBe(25);
      expect(player.clampTime(-1)).toBe(0);
      expect(player.clampTime(121)).toBe(120);
      expect(player.clampVolume(-0.1)).toBe(0);
      expect(player.clampVolume(1.1)).toBe(1);
      expect(player.clampVolume(0.3)).toBe(0.3);
    });
    it('merges partial locales over the defaults', () => {
      const { player } = createPlayer({ locales: { playButtonAriaLabel: 'Start' } });
      expect(player._locales).toEqual({ ...LOCALES_DEFAULTS, playButtonAriaLabel: 'Start' });
    });
    it('renders one source per src, with a type only where one is given for that index', async () => {
      const single = await renderPlayer({ src: 'a.mp3' });
      const [singleSource] = queryAll(single, 'source');
      expect(queryAll(single, 'source')).toHaveLength(1);
      expect(singleSource.getAttribute('src')).toBe('a.mp3');
      expect(singleSource.hasAttribute('type')).toBe(false);
      const multiple = await renderPlayer({ src: ['a.ogg', 'b.mp3'], type: ['audio/ogg'] });
      const [first, second] = queryAll(multiple, 'source');
      expect(first.getAttribute('type')).toBe('audio/ogg');
      // No borrowed type for the fallback, so the browser detects its format itself.
      expect(second.getAttribute('src')).toBe('b.mp3');
      expect(second.hasAttribute('type')).toBe(false);
    });
  });
  describe('Testing accessibility', () => {
    it('names the player as a focusable group, overridable through ariaProps', async () => {
      const container = query(await renderPlayer(), '.audio-player-container');
      expect(container.getAttribute('role')).toBe('group');
      expect(container.getAttribute('aria-label')).toBe(LOCALES_DEFAULTS.hostAriaLabel);
      expect(container.getAttribute('tabindex')).toBe('0');
      const custom = query(await renderPlayer({ ariaProps: { role: 'region', label: 'Episode 12' } }), '.audio-player-container');
      expect(custom.getAttribute('role')).toBe('region');
      expect(custom.getAttribute('aria-label')).toBe('Episode 12');
    });
    it('shows the focus ring only when the player is reached with Tab, not after a click and a hotkey', async () => {
      const page = await renderPlayer();
      const container = query(page, '.audio-player-container');
      // The mock DOM has no `composedPath`, so each keyup carries the element it started from.
      const keyUp = (key, origin) => {
        const event = new KeyboardEvent('keyup', { key, bubbles: true });
        Object.defineProperty(event, 'composedPath', { value: () => [origin] });
        container.dispatchEvent(event);
        return page.waitForChanges();
      };
      // A Tab keyup that bubbles from a control inside does not mark the player.
      await keyUp('Tab', query(page, '.seek-bar'));
      expect(container).not.toHaveClass('tab-focus');
      await keyUp('Tab', container);
      expect(container).toHaveClass('tab-focus');
      // A click takes the ring away, and a hotkey pressed afterwards does not bring it back.
      container.dispatchEvent(new Event('mousedown'));
      await page.waitForChanges();
      expect(container).not.toHaveClass('tab-focus');
      await keyUp('ArrowLeft', container);
      expect(container).not.toHaveClass('tab-focus');
      await keyUp('Tab', container);
      container.dispatchEvent(new Event('blur'));
      await page.waitForChanges();
      expect(container).not.toHaveClass('tab-focus');
    });
    it('describes both sliders to assistive technology', async () => {
      const page = await renderPlayer({ volume: 0.4 });
      page.rootInstance.overallAudioTime = 120;
      page.rootInstance.currentAudioTime = 65;
      await page.waitForChanges();
      const seekBar = query(page, '.seek-bar');
      expect(seekBar.getAttribute('aria-label')).toBe(LOCALES_DEFAULTS.progressAriaLabel);
      expect(seekBar.getAttribute('aria-valuemin')).toBe('0');
      expect(seekBar.getAttribute('aria-valuemax')).toBe('120');
      expect(seekBar.getAttribute('aria-valuenow')).toBe('65');
      expect(seekBar.getAttribute('aria-valuetext')).toBe('01:05');
      const volumeBar = query(page, '.volume-container .progress-bar');
      const volumeLabel = query(page, '.volume-container label.sr-only');
      // Named once, through its label: no `aria-label` repeats it.
      expect(volumeBar.hasAttribute('aria-label')).toBe(false);
      expect(volumeLabel.getAttribute('htmlfor')).toBe(volumeBar.id);
      expect(volumeBar.getAttribute('aria-orientation')).toBe('vertical');
      expect(volumeBar.getAttribute('aria-valuemin')).toBe('0');
      expect(volumeBar.getAttribute('aria-valuemax')).toBe('1');
      expect(volumeBar.getAttribute('aria-valuenow')).toBe('0.4');
      expect(volumeBar.getAttribute('aria-valuetext')).toBe('40%');
      expect(volumeLabel.textContent).toBe(LOCALES_DEFAULTS.volumeProgressLabel);
    });
    it('labels the buttons, swapping the play label instead of using aria-pressed', async () => {
      const page = await renderPlayer({ playbackRate: 2 });
      const labels = () => queryAll(page, 'wpp-action-button').map(button => button.ariaProps);
      const [rate, back, play, forward, volume] = labels();
      expect(rate).toEqual({
        label: `${LOCALES_DEFAULTS.playbackRateButtonAriaLabel} 2.0x`,
        haspopup: 'dialog',
        expanded: false,
      });
      expect(back.label).toBe(LOCALES_DEFAULTS.skipBackwardButtonAriaLabel);
      expect(play).toEqual({ label: LOCALES_DEFAULTS.playButtonAriaLabel });
      expect(forward.label).toBe(LOCALES_DEFAULTS.skipForwardButtonAriaLabel);
      // The volume button names its click action, swapping the label instead of using aria-pressed;
      // only here it also has a tooltip, which follows the label.
      const tooltipText = () => query(page, '.volume-container wpp-tooltip').getAttribute('text');
      expect(volume).toEqual({ label: LOCALES_DEFAULTS.muteButtonAriaLabel });
      expect(tooltipText()).toBe(LOCALES_DEFAULTS.muteButtonAriaLabel);
      page.rootInstance.audioPlayerState = 'playing';
      page.rootInstance.volume = 0;
      await page.waitForChanges();
      const [, , playing, , muted] = labels();
      expect(playing).toEqual({ label: LOCALES_DEFAULTS.pauseButtonAriaLabel });
      expect(muted).toEqual({ label: LOCALES_DEFAULTS.unmuteButtonAriaLabel });
      expect(tooltipText()).toBe(LOCALES_DEFAULTS.unmuteButtonAriaLabel);
    });
    it('labels the times and hides the decorative layers', async () => {
      const page = await renderPlayer();
      const [current, total] = queryAll(page, '[role="timer"]');
      expect(current.getAttribute('aria-label')).toBe(`${LOCALES_DEFAULTS.currentTimeAriaLabel} 00:00`);
      expect(total.getAttribute('aria-label')).toBe(`${LOCALES_DEFAULTS.durationAriaLabel} 00:00`);
      const decorative = ['.progress-rail', '.loading-progress'];
      decorative.forEach(selector => expect(query(page, selector).getAttribute('aria-hidden')).toBe('true'));
      queryAll(page, 'wpp-action-button [slot="icon-start"]').forEach(icon => expect(icon.getAttribute('aria-hidden')).toBe('true'));
    });
    it('reads every label from the locales', async () => {
      const locales = {
        hostAriaLabel: 'Podcast player',
        playButtonAriaLabel: 'Start',
        progressAriaLabel: 'Timeline',
        volumeProgressLabel: 'Loudness',
        muteButtonAriaLabel: 'Silence',
        unmuteButtonAriaLabel: 'Sound on',
        playbackRateButtonAriaLabel: 'Speed',
      };
      const page = await renderPlayer({ locales });
      expect(query(page, '.audio-player-container').getAttribute('aria-label')).toBe('Podcast player');
      expect(query(page, '.seek-bar').getAttribute('aria-label')).toBe('Timeline');
      expect(query(page, '.volume-container label.sr-only').textContent).toBe('Loudness');
      const [rate, , play, , volume] = queryAll(page, 'wpp-action-button').map(button => button.ariaProps);
      expect(rate.label).toBe('Speed 1.0x');
      expect(play.label).toBe('Start');
      expect(volume.label).toBe('Silence');
      page.rootInstance.volume = 0;
      await page.waitForChanges();
      expect(queryAll(page, 'wpp-action-button')[4].ariaProps.label).toBe('Sound on');
    });
  });
  describe('Testing Snapshots', () => {
    it('renders the default player', async () => {
      const page = await renderPlayer();
      expect(page.root).toMatchSnapshot();
    });
    it('renders a configured, muted player while playing', async () => {
      const page = await renderPlayer({
        src: ['a.ogg', 'b.mp3'],
        type: ['audio/ogg'],
        loop: true,
        preload: 'none',
        volume: 0,
        playbackRates: [1, 2],
        playbackRate: 2,
        locales: { playButtonAriaLabel: 'Start', pauseButtonAriaLabel: 'Stop' },
      });
      page.rootInstance.audioPlayerState = 'playing';
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
  });
});
