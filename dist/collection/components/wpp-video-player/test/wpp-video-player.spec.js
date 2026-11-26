import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppVideoPlayer } from '../wpp-video-player';
import { placeVolumeSlider } from '../components/wpp-volume-bar';
import { formatTime, calculateBufferProgress } from '../utils';
import { ANNOUNCEMENT_RESET_DELAY, LOCALES_DEFAULTS } from '../const';
import * as themeUtils from '../../../utils/subscribe-to-theme';
let originalQuerySelector;
let originalQuerySelectorAll;
describe('wpp-video-player', () => {
  const videoSrc = 'https://www.w3schools.com/html/mov_bbb.mp4';
  const thumbnailSrc = 'https://example.com/thumbnail.jpg';
  const captionValue = {
    label: 'English',
    kind: 'captions',
    src: 'https://example.com/captions-en.vtt',
    srclang: 'en',
    // Off, so the specs built on it start from the captions-off state their names describe.
    default: false,
  };
  // Mock for HTMLMediaElement
  let playMock;
  let pauseMock;
  let videoMock;
  // Every player a test loads, so `afterEach` can tear each one down (see there).
  const loadedPlayers = new Set();
  beforeEach(() => {
    // Create a mock implementation for video element methods
    playMock = jest.fn().mockResolvedValue(undefined);
    pauseMock = jest.fn();
    // Create a more comprehensive video element mock
    videoMock = {
      play: playMock,
      pause: pauseMock,
      muted: true,
      autoplay: true,
      currentTime: 0,
      duration: 100,
      volume: 1,
      textTracks: {
        length: 0,
        onaddtrack: null,
      },
      buffered: {
        length: 1,
        start: () => 0,
        end: () => 50,
      },
      timeFormat: 'default',
      getAttribute: (attr) => (attr === 'autoplay' ? '' : null),
      hasAttribute: (attr) => attr === 'autoplay',
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      style: {
        setProperty: jest.fn(),
      },
      videoWidth: 640,
      videoHeight: 360,
    };
    // Save original methods to restore later
    originalQuerySelector = HTMLElement.prototype.querySelector;
    originalQuerySelectorAll = HTMLElement.prototype.querySelectorAll;
    // Replace the component's internal videoPlayerRef directly after it's instantiated
    // This is the most reliable approach to ensure the mock is used
    const originalComponentDidLoad = WppVideoPlayer.prototype.componentDidLoad;
    WppVideoPlayer.prototype.componentDidLoad = function () {
      loadedPlayers.add(this);
      // Call the original method first
      if (originalComponentDidLoad) {
        originalComponentDidLoad.call(this);
      }
      // Directly set the videoPlayerRef to our mock
      // Use type assertion to bypass private property restriction
      this['videoPlayerRef'] = videoMock;
    };
    // Also mock querySelector in case it's used internally
    HTMLElement.prototype.querySelector = jest.fn().mockImplementation((selector) => {
      if (selector === 'video' || selector === '.video-player') {
        return videoMock;
      }
      return null;
    });
    // Mock querySelectorAll for source and track elements
    HTMLElement.prototype.querySelectorAll = jest.fn().mockImplementation((selector) => {
      if (selector === 'source') {
        return [{ getAttribute: (attr) => (attr === 'type' ? 'video/mp4' : null) }];
      }
      if (selector === 'track') {
        return [{ getAttribute: (attr) => (attr === 'srclang' ? 'en' : null) }];
      }
      return [];
    });
  });
  afterEach(() => {
    // Restore original methods
    HTMLElement.prototype.querySelector = originalQuerySelector;
    HTMLElement.prototype.querySelectorAll = originalQuerySelectorAll;
    // Spec pages are never disconnected, and a second page in the same test replaces the first player
    // without disconnecting it either. A pending announcement timer would then outlive the test and
    // fire into a torn-down Stencil, crashing the run after the last test. `disconnectedCallback`
    // clears it, so it runs for every player the test loaded.
    loadedPlayers.forEach(player => player.disconnectedCallback());
    loadedPlayers.clear();
    jest.restoreAllMocks();
  });
  describe('snapshots', () => {
    it('should render default component', async () => {
      const page = await newSpecPage({
        components: [WppVideoPlayer],
        template: () => h("wpp-video-player-v4-7-0", { src: videoSrc }),
      });
      expect(page.root).toMatchSnapshot();
    });
    it('should render component with autoplay and mute', async () => {
      const page = await newSpecPage({
        components: [WppVideoPlayer],
        template: () => h("wpp-video-player-v4-7-0", { src: videoSrc, controlPanelConfig: { autoplay: true } }),
      });
      expect(page.root).toMatchSnapshot();
    });
  });
  describe('component', () => {
    describe('rendering', () => {
      it('should render component with default props', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          html: `<wpp-video-player src="${videoSrc}"></wpp-video-player>`,
        });
        expect(page.root).toBeTruthy();
        expect(page.root?.shadowRoot?.querySelector('video')).toBeTruthy();
        expect(page.root?.shadowRoot?.querySelector('.controls')).toBeTruthy();
        expect(page.rootInstance.src).toBe(videoSrc);
      });
      it('should distinguish the current time and the duration timers by their accessible name', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          html: `<wpp-video-player src="${videoSrc}"></wpp-video-player>`,
        });
        // The control bar, and so the timers, are only rendered once the player leaves the idle state.
        page.rootInstance.videoPlayerState = 'paused';
        await page.waitForChanges();
        const [currentTime, duration] = Array.from(page.root?.shadowRoot?.querySelectorAll('[role="timer"]') ?? []);
        // The name identifies the timer; the time itself is the content, so it is not announced
        // twice and the name does not change on every tick.
        expect(currentTime.getAttribute('aria-label')).toBe('Current time');
        expect(duration.getAttribute('aria-label')).toBe('Total time');
        expect(currentTime.textContent).toBe('00:00');
      });
      it('should keep the current-time accessible name stable as the time advances', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          html: `<wpp-video-player src="${videoSrc}"></wpp-video-player>`,
        });
        page.rootInstance.videoPlayerState = 'paused';
        await page.waitForChanges();
        const timerOf = () => page.root?.shadowRoot?.querySelector('[role="timer"]');
        const nameBefore = timerOf()?.getAttribute('aria-label');
        page.rootInstance.currentVideoTime = 42;
        await page.waitForChanges();
        expect(timerOf()?.getAttribute('aria-label')).toBe(nameBefore);
        expect(timerOf()?.textContent).toBe('00:42');
      });
      it('should use the custom locales for the timers accessible names', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          template: () => (h("wpp-video-player-v4-7-0", { src: videoSrc, locales: { currentTimeAriaLabel: 'Elapsed', durationAriaLabel: 'Duration' } })),
        });
        // The control bar, and so the timers, are only rendered once the player leaves the idle state.
        page.rootInstance.videoPlayerState = 'paused';
        await page.waitForChanges();
        const [currentTime, duration] = Array.from(page.root?.shadowRoot?.querySelectorAll('[role="timer"]') ?? []);
        expect(currentTime.getAttribute('aria-label')).toBe('Elapsed');
        expect(duration.getAttribute('aria-label')).toBe('Duration');
      });
      it('should render with thumbnail', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          html: `<wpp-video-player src="${videoSrc}" thumbnail="${thumbnailSrc}"></wpp-video-player>`,
        });
        const component = page.rootInstance;
        expect(component.thumbnail).toBe(thumbnailSrc);
      });
      it('should render with custom size', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          template: () => h("wpp-video-player-v4-7-0", { src: videoSrc, size: { width: 800, height: 600 } }),
        });
        const component = page.rootInstance;
        expect(component.videoPlayerSize.width).toBe(800);
        expect(component.videoPlayerSize.height).toBe(600);
      });
      // The `muted` property, not the attribute, decides whether sound plays: `componentDidLoad` writes
      // it from the starting volume, which used to unmute an autoplay video the attribute had muted.
      it.each([
        ['autoplay', true, { autoplay: true }],
        ['muted', true, { muted: true }],
        ['no volume button', true, { showVolumeButton: false }],
        ['the default config', false, {}],
      ])('with %s, the video starts muted: %s', async (_name, isMuted, controlPanelConfig) => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          template: () => h("wpp-video-player-v4-7-0", { src: videoSrc, controlPanelConfig: controlPanelConfig }),
        });
        const video = page.root?.shadowRoot?.querySelector('video');
        expect(video.muted).toBe(isMuted);
        expect(video.hasAttribute('muted')).toBe(isMuted);
      });
      it('should render with multiple source elements when array is provided', async () => {
        // Update the mock for this specific test
        HTMLElement.prototype.querySelectorAll = jest.fn().mockImplementation(selector => {
          if (selector === 'source') {
            return [
              { getAttribute: (attr) => (attr === 'type' ? 'video/mp4' : null) },
              { getAttribute: (attr) => (attr === 'type' ? 'video/webm' : null) },
            ];
          }
          if (selector === 'track') {
            return [{ getAttribute: (attr) => (attr === 'srclang' ? 'en' : null) }];
          }
          return [];
        });
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          template: () => (h("wpp-video-player-v4-7-0", { src: [videoSrc, videoSrc], type: ['video/mp4', 'video/webm'] })),
        });
        const sourceElements = page.root?.shadowRoot?.querySelectorAll('source');
        expect(sourceElements.length).toBe(2);
        expect(sourceElements[0].getAttribute('type')).toBe('video/mp4');
        expect(sourceElements[1].getAttribute('type')).toBe('video/webm');
      });
      it('should create track elements when captions are provided', async () => {
        const captionData = {
          label: 'English',
          kind: 'subtitles',
          src: 'en-captions.vtt',
          srclang: 'en',
          default: true,
        };
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          template: () => h("wpp-video-player-v4-7-0", { src: videoSrc, caption: captionData }),
        });
        const trackElements = page.root?.shadowRoot?.querySelectorAll('track');
        expect(trackElements.length).toBe(1);
        expect(trackElements[0].getAttribute('srclang')).toBe('en');
      });
      it('should render without volume button and volume need to be set to 0', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          template: () => (h("wpp-video-player-v4-7-0", { src: videoSrc, controlPanelConfig: { showVolumeButton: false } })),
        });
        expect(page.rootInstance.controlPanelConfigDefault.showVolumeButton).toBe(false);
        expect(page.rootInstance.volume).toBe(0);
      });
    });
    describe('rendering methods', () => {
      it('should render video time component', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          html: `<wpp-video-player src="${videoSrc}"></wpp-video-player>`,
        });
        // Spy on the internal renderVideoCurrentTimeComponent function
        const renderSpy = jest.spyOn(page.rootInstance, 'renderVideoTime');
        // Call the render method with test data
        page.rootInstance.renderVideoTime(150, 'Current time');
        // Verify the method was called with the correct parameters
        expect(renderSpy).toHaveBeenCalledWith(150, 'Current time');
        // Clean up
        renderSpy.mockRestore();
      });
      it('should render seek bar component', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          html: `<wpp-video-player src="${videoSrc}"></wpp-video-player>`,
        });
        // Setup required properties
        page.rootInstance.overallVideoTime = 100;
        page.rootInstance.loadedPercentage = 50;
        // Spy on the rendering method
        const renderSpy = jest.spyOn(page.rootInstance, 'renderSeekBar');
        // Call the render method
        page.rootInstance.renderSeekBar();
        // Verify the method was called
        expect(renderSpy).toHaveBeenCalled();
        // Clean up
        renderSpy.mockRestore();
      });
      it('should render volume bar component', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          html: `<wpp-video-player src="${videoSrc}"></wpp-video-player>`,
        });
        // Set the volume value
        page.rootInstance.volume = 0.75;
        // Spy on the rendering method
        const renderSpy = jest.spyOn(page.rootInstance, 'renderVolumeBar');
        // Call the render method
        page.rootInstance.renderVolumeBar();
        // Verify the method was called
        expect(renderSpy).toHaveBeenCalled();
        // Clean up
        renderSpy.mockRestore();
      });
      it('should render captions component when captions are available', async () => {
        const captionData = {
          label: 'English',
          kind: 'subtitles',
          src: 'en-captions.vtt',
          srclang: 'en',
          default: true,
        };
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          template: () => h("wpp-video-player-v4-7-0", { src: videoSrc, caption: captionData }),
        });
        // Set required properties for captions
        page.rootInstance.isCaptionEnabled = true;
        page.rootInstance.activeCues = [{ text: 'Sample caption text' }];
        // Spy on the rendering method
        const renderSpy = jest.spyOn(page.rootInstance, 'renderCaptions');
        // Call the render method
        page.rootInstance.renderCaptions();
        // Verify the method was called
        expect(renderSpy).toHaveBeenCalled();
        // Clean up
        renderSpy.mockRestore();
      });
      it('should render accessibility instructions component', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          html: `<wpp-video-player src="${videoSrc}"></wpp-video-player>`,
        });
        // Spy on the rendering method
        const renderSpy = jest.spyOn(page.rootInstance, 'renderAccessibilityInstructions');
        // Call the render method
        page.rootInstance.renderAccessibilityInstructions();
        // Verify the method was called
        expect(renderSpy).toHaveBeenCalled();
        // Clean up
        renderSpy.mockRestore();
      });
    });
    describe('methods and functionality', () => {
      it('should get metadata after component got created', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          html: `<wpp-video-player src="${videoSrc}"></wpp-video-player>`,
        });
        page.rootInstance.handleMetadataLoaded();
        expect(page.rootInstance.videoPlayerRef.duration).toBe(100);
        expect(page.rootInstance.timeFormat).toBe('default');
        expect(page.rootInstance.overallVideoTime).toBe(100);
        expect(formatTime(page.rootInstance.timeFormat, page.rootInstance.overallVideoTime)).toBe('01:40');
        expect(page.rootInstance.aspectRatio).toBe('1.7777777777777777');
        expect(page.rootInstance.videoPlayerRef.style.setProperty).toHaveBeenCalledWith('--aspect-ratio', '1.7777777777777777');
      });
      it('should get metadata after component got created with extended duration', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          html: `<wpp-video-player src="${videoSrc}"></wpp-video-player>`,
        });
        // Override the video duration to be longer than 1 hour (3640 seconds = 1h 0m 40s)
        const videoRef = page.rootInstance.videoPlayerRef;
        videoRef.duration = 3680;
        page.rootInstance.handleMetadataLoaded();
        // Check that the time format was updated to "extended" due to longer duration
        expect(page.rootInstance.timeFormat).toBe('extended');
        // Verify the formatted overall time includes hours
        expect(page.rootInstance.overallVideoTime).toBe(3680);
        expect(formatTime(page.rootInstance.timeFormat, page.rootInstance.overallVideoTime)).toBe('01:01:20');
      });
      it('should play video when play method is called', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          html: `<wpp-video-player src="${videoSrc}"></wpp-video-player>`,
        });
        expect(page.rootInstance.videoPlayerState).toBe('idle');
        await page.rootInstance.play();
        expect(playMock).toHaveBeenCalled();
        expect(page.rootInstance.videoPlayerState).toBe('playing');
      });
      it('should pause video when pause method is called', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          html: `<wpp-video-player src="${videoSrc}"></wpp-video-player>`,
        });
        await page.rootInstance.pause();
        expect(page.rootInstance.videoPlayerState).toBe('paused');
      });
      it('should toggle play/pause when togglePlay is called', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          html: `<wpp-video-player src="${videoSrc}"></wpp-video-player>`,
        });
        const playSpy = jest.spyOn(page.rootInstance, 'play');
        const pauseSpy = jest.spyOn(page.rootInstance, 'pause');
        // Initial state is idle, should call play
        page.rootInstance.togglePlay();
        expect(playSpy).toHaveBeenCalled();
        // Set state to playing
        page.rootInstance.videoPlayerState = 'playing';
        page.rootInstance.togglePlay();
        expect(pauseSpy).toHaveBeenCalled();
      });
      it('should toggle mute when toggleMute is called', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          html: `<wpp-video-player src="${videoSrc}"></wpp-video-player>`,
        });
        // Initial volume should be 1
        expect(page.rootInstance.volume).toBe(1);
        // Call toggleMute
        page.rootInstance.toggleMute();
        // Volume should now be 0
        expect(page.rootInstance.volume).toBe(0);
        expect(page.rootInstance.savedVolume).toBe(1);
        // Call toggleMute again
        page.rootInstance.toggleMute();
        // Volume should be restored
        expect(page.rootInstance.volume).toBe(1);
      });
      it('should show and hide volume slider when showAndHideVolumeSlider is called', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          html: `<wpp-video-player src="${videoSrc}"></wpp-video-player>`,
        });
        jest.spyOn(global, 'clearTimeout').mockImplementation(jest.fn());
        // Create spies for the methods that showAndHideVolumeSlider calls
        const handleSliderShowSpy = jest.spyOn(page.rootInstance, 'handleSliderShow');
        const handleSliderHideSpy = jest.spyOn(page.rootInstance, 'handleSliderHide');
        // Mock clearTimeout since it's used in the method
        const originalClearTimeout = window.clearTimeout;
        window.clearTimeout = jest.fn();
        // Call the method with a default delay
        page.rootInstance.showAndHideVolumeSlider();
        // Verify that handleSliderShow was called
        expect(handleSliderShowSpy).toHaveBeenCalled();
        // Verify that clearTimeout was called
        expect(global.clearTimeout).toHaveBeenCalled();
        // Verify that handleSliderHide was called with the default delay
        expect(handleSliderHideSpy).toHaveBeenCalledWith(1000);
        // Reset the spies
        handleSliderShowSpy.mockClear();
        handleSliderHideSpy.mockClear();
        jest.mocked(global.clearTimeout).mockClear();
        // Call the method with custom delay
        const customDelay = 2000;
        page.rootInstance.showAndHideVolumeSlider(customDelay);
        // Verify that handleSliderShow was called
        expect(handleSliderShowSpy).toHaveBeenCalled();
        // Verify that clearTimeout was called
        expect(global.clearTimeout).toHaveBeenCalled();
        // Verify that handleSliderHide was called with the custom delay
        expect(handleSliderHideSpy).toHaveBeenCalledWith(customDelay);
        // Restore the original clearTimeout
        window.clearTimeout = originalClearTimeout;
      });
      it('should show volume slider when volumeSliderShow is called', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          html: `<wpp-video-player src="${videoSrc}"></wpp-video-player>`,
        });
        // Create mock elements, with room above the button for the slider
        const mockBarContainer = {
          classList: { add: jest.fn(), remove: jest.fn() },
          getBoundingClientRect: () => ({ top: 208 }),
        };
        const mockContainer = {
          classList: { add: jest.fn() },
          getBoundingClientRect: () => ({ top: 300, bottom: 332 }),
        };
        // Add the mocked elements to the component instance
        page.rootInstance.volumeBarContainerRef = mockBarContainer;
        page.rootInstance.volumeContainerRef = mockContainer;
        page.rootInstance.volumeButtonRef = {};
        // Mock clearTimeout
        jest.spyOn(global, 'clearTimeout').mockImplementation(jest.fn());
        // Call the method
        page.rootInstance.volumeSliderShow();
        // Verify clearTimeout was called
        expect(global.clearTimeout).toHaveBeenCalled();
        // Verify the classList.add was called with 'active'
        expect(mockBarContainer.classList.add).toHaveBeenCalledWith('active');
        // Verify the container keeps the button in its hover look while the slider is open
        expect(mockContainer.classList.add).toHaveBeenCalledWith('open');
        // Verify the slider is placed before it shows, here above the button
        expect(mockBarContainer.classList.remove).toHaveBeenCalledWith('below');
        expect(mockBarContainer.classList.add).not.toHaveBeenCalledWith('below');
      });
      it('should not show volume slider when refs are not available', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          html: `<wpp-video-player src="${videoSrc}"></wpp-video-player>`,
        });
        // Make sure refs are undefined
        page.rootInstance.volumeBarContainerRef = undefined;
        page.rootInstance.volumeButtonRef = undefined;
        // Mock clearTimeout
        const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout').mockImplementation(jest.fn());
        // Call the method
        page.rootInstance.volumeSliderShow();
        // Verify clearTimeout was not called
        expect(clearTimeoutSpy).not.toHaveBeenCalled();
      });
      it('should hide volume slider when volumeSliderHide is called', async () => {
        let timeoutCallback = jest.fn();
        let timeoutDelay = 0;
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          html: `<wpp-video-player src="${videoSrc}"></wpp-video-player>`,
        });
        // Mock setTimeout to capture the callback
        jest.spyOn(global, 'setTimeout').mockImplementation((handler, timeout) => {
          timeoutCallback = handler;
          timeoutDelay = timeout || 0;
          // Return a number instead of the Timeout object to match browser setTimeout
          return 123;
        });
        // Create mock elements
        const mockBarContainer = { classList: { remove: jest.fn() } };
        const mockContainer = { classList: { remove: jest.fn() } };
        // Add the mocked elements to the component instance
        page.rootInstance.volumeBarContainerRef = mockBarContainer;
        page.rootInstance.volumeContainerRef = mockContainer;
        // Mock clearTimeout
        jest.spyOn(global, 'clearTimeout').mockImplementation(jest.fn());
        // Call the method with a default delay
        page.rootInstance.volumeSliderHide();
        // Verify setTimeout was called with the default delay
        expect(timeoutDelay).toBe(300);
        // Execute the timeout callback
        timeoutCallback();
        // Verify the classList.remove was called with 'active'
        expect(mockBarContainer.classList.remove).toHaveBeenCalledWith('active');
        // Verify the container drops the button's hover look with the slider
        expect(mockContainer.classList.remove).toHaveBeenCalledWith('open');
        // Call the method with custom delay
        page.rootInstance.volumeSliderHide(500);
        // Verify setTimeout was called with the custom delay
        expect(timeoutDelay).toBe(500);
      });
      it('should dismiss the volume slider on Escape and return the focus to the mute button', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          html: `<wpp-video-player src="${videoSrc}"></wpp-video-player>`,
        });
        const mockBarContainer = { classList: { contains: jest.fn().mockReturnValue(true), remove: jest.fn() } };
        const mockContainer = { classList: { remove: jest.fn() } };
        const nativeButton = { focus: jest.fn() };
        const slider = {};
        page.rootInstance.volumeBarContainerRef = mockBarContainer;
        page.rootInstance.volumeContainerRef = mockContainer;
        page.rootInstance.volumeBarRef = slider;
        page.rootInstance.volumeButtonRef = { shadowRoot: { querySelector: () => nativeButton } };
        page.rootInstance.hoverTimeout = 123;
        Object.defineProperty(page.rootInstance, 'host', {
          value: { shadowRoot: { activeElement: slider } },
          configurable: true,
        });
        const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout').mockImplementation(jest.fn());
        page.rootInstance.dismissVolumeSlider();
        // The focus moves first, so the closed slider does not drop it on the body
        expect(nativeButton.focus).toHaveBeenCalledTimes(1);
        expect(clearTimeoutSpy).toHaveBeenCalledWith(123);
        expect(mockBarContainer.classList.remove).toHaveBeenCalledWith('active');
        expect(mockContainer.classList.remove).toHaveBeenCalledWith('open');
        // With the focus on the button, it stays there
        nativeButton.focus.mockClear();
        page.rootInstance.host.shadowRoot.activeElement = {};
        page.rootInstance.dismissVolumeSlider();
        expect(nativeButton.focus).not.toHaveBeenCalled();
        // Nothing to dismiss while the slider is closed
        mockBarContainer.classList.contains.mockReturnValue(false);
        mockBarContainer.classList.remove.mockClear();
        page.rootInstance.dismissVolumeSlider();
        expect(mockBarContainer.classList.remove).not.toHaveBeenCalled();
      });
      it('should clear previous timeout when volumeSliderHide is called multiple times', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          html: `<wpp-video-player src="${videoSrc}"></wpp-video-player>`,
        });
        // Set a hoverTimeout
        page.rootInstance.hoverTimeout = 123;
        // Mock clearTimeout
        const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout').mockImplementation(jest.fn());
        // Mock setTimeout to return a new timeout ID
        jest.spyOn(global, 'setTimeout').mockImplementation(() => 456);
        // Call the method
        page.rootInstance.volumeSliderHide();
        // Verify clearTimeout was called with the previous timeout ID
        expect(clearTimeoutSpy).toHaveBeenCalledWith(123);
        // Verify the hoverTimeout was updated
        expect(page.rootInstance.hoverTimeout).toBe(456);
      });
      it('should integrate with showAndHideVolumeSlider method', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          html: `<wpp-video-player src="${videoSrc}"></wpp-video-player>`,
        });
        // Create spies for the methods
        const showSpy = jest.spyOn(page.rootInstance, 'volumeSliderShow');
        const hideSpy = jest.spyOn(page.rootInstance, 'volumeSliderHide');
        // Mock clearTimeout
        jest.spyOn(global, 'clearTimeout').mockImplementation(jest.fn());
        // Call the integration method with a default delay
        page.rootInstance.showAndHideVolumeSlider();
        // Verify methods were called correctly
        expect(showSpy).toHaveBeenCalled();
        expect(global.clearTimeout).toHaveBeenCalled();
        expect(hideSpy).toHaveBeenCalledWith(1000);
        // Reset spies
        showSpy.mockClear();
        hideSpy.mockClear();
        jest.mocked(global.clearTimeout).mockClear();
        // Call with custom delay
        page.rootInstance.showAndHideVolumeSlider(2000);
        // Verify methods were called with custom delay
        expect(showSpy).toHaveBeenCalled();
        expect(global.clearTimeout).toHaveBeenCalled();
        expect(hideSpy).toHaveBeenCalledWith(2000);
      });
    });
    describe('event handlers', () => {
      it('should update time when handleTimeUpdate is called', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          html: `<wpp-video-player src="${videoSrc}"></wpp-video-player>`,
        });
        // Mock the video element
        page.rootInstance.videoPlayerRef = {
          currentTime: 30,
        };
        // Call the event handler
        page.rootInstance.handleTimeUpdate();
        expect(page.rootInstance.currentVideoTime).toBe(30);
      });
      it('should update progress when handleSeek is called', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          html: `<wpp-video-player src="${videoSrc}"></wpp-video-player>`,
        });
        // Mock the video element
        page.rootInstance.videoPlayerRef = {
          currentTime: 0,
        };
        // Create a mock event with a target value
        const mockEvent = {
          target: {
            value: '45',
          },
        };
        // Call the event handler
        page.rootInstance.handleSeek(mockEvent);
        expect(page.rootInstance.videoPlayerRef.currentTime).toBe(45);
      });
      it('should update state when video ends', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          html: `<wpp-video-player src="${videoSrc}"></wpp-video-player>`,
        });
        // Set state to playing
        page.rootInstance.videoPlayerState = 'playing';
        // Trigger video ended event
        page.rootInstance.handleVideoEnded();
        expect(page.rootInstance.videoPlayerState).toBe('paused');
        expect(page.rootInstance.isInvisible).toBe(false);
      });
      it('should return to idle when an autoplay video ends', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          html: `<wpp-video-player src="${videoSrc}"></wpp-video-player>`,
        });
        page.rootInstance.controlPanelConfigDefault.autoplay = true;
        page.rootInstance.videoPlayerState = 'playing';
        page.rootInstance.handleVideoEnded();
        expect(page.rootInstance.videoPlayerState).toBe('idle');
      });
      it('should pin the current time to the full duration when video ends', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          html: `<wpp-video-player src="${videoSrc}"></wpp-video-player>`,
        });
        Object.defineProperty(page.rootInstance.videoPlayerRef, 'duration', { value: 12.345678, configurable: true });
        page.rootInstance.currentVideoTime = 12.1;
        page.rootInstance.handleVideoEnded();
        expect(page.rootInstance.currentVideoTime).toBe(12.345678);
      });
      it('should update controls visibility on mouse events', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          html: `<wpp-video-player src="${videoSrc}"></wpp-video-player>`,
        });
        // Set state to playing
        page.rootInstance.videoPlayerState = 'playing';
        // Initially, controls should be visible (not invisible)
        expect(page.rootInstance.isInvisible).toBe(false);
        // Trigger mouse leave
        page.rootInstance.handleMouseLeave();
        expect(page.rootInstance.isInvisible).toBe(true);
        // Trigger mouse move
        page.rootInstance.handleMouseMove();
        expect(page.rootInstance.isInvisible).toBe(false);
      });
      it('should hide controls on mouse leave when paused', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          html: `<wpp-video-player src="${videoSrc}"></wpp-video-player>`,
        });
        page.rootInstance.videoPlayerState = 'paused';
        page.rootInstance.handleMouseLeave();
        expect(page.rootInstance.isInvisible).toBe(true);
      });
      it('should keep controls visible on mouse leave when idle', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          html: `<wpp-video-player src="${videoSrc}"></wpp-video-player>`,
        });
        page.rootInstance.handleMouseLeave();
        expect(page.rootInstance.isInvisible).toBe(false);
      });
      it('should show hidden controls when focus moves into the player', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          html: `<wpp-video-player src="${videoSrc}"></wpp-video-player>`,
        });
        page.rootInstance.videoPlayerState = 'paused';
        page.rootInstance.handleMouseLeave();
        page.rootInstance.handleFocusIn();
        expect(page.rootInstance.isInvisible).toBe(false);
      });
    });
    describe('keyboard controls', () => {
      it('should handle space key for play/pause', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          template: () => h("wpp-video-player-v4-7-0", { src: videoSrc }),
        });
        const playSpy = jest.spyOn(page.rootInstance, 'play');
        // Mock the focus conditions
        jest.spyOn(page.rootInstance.host, 'contains').mockReturnValue(true);
        jest.spyOn(page.rootInstance.host, 'matches').mockReturnValue(true);
        Object.defineProperty(page.rootInstance.host, 'shadowRoot', {
          value: {
            activeElement: page.rootInstance.host,
          },
          writable: true,
        });
        // Create a keyboard event for the space key
        const spaceEvent = new KeyboardEvent('keydown', { code: 'Space' });
        page.rootInstance.handleKeyboardInput(spaceEvent);
        expect(playSpy).toHaveBeenCalled();
      });
      it('should handle arrow keys for seeking', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          template: () => h("wpp-video-player-v4-7-0", { src: videoSrc }),
        });
        // Mock the focus conditions
        jest.spyOn(page.rootInstance.host, 'contains').mockReturnValue(true);
        jest.spyOn(page.rootInstance.host, 'matches').mockReturnValue(true);
        // Mock video element
        page.rootInstance.videoPlayerRef = {
          currentTime: 60,
          duration: 120,
        };
        page.rootInstance.overallVideoTime = 120;
        // Test left arrow (skip backward)
        const leftEvent = new KeyboardEvent('keydown', { code: 'ArrowLeft' });
        page.rootInstance.handleKeyboardInput(leftEvent);
        expect(page.rootInstance.videoPlayerRef.currentTime).toBe(55);
        // Test right arrow (skip forward)
        const rightEvent = new KeyboardEvent('keydown', { code: 'ArrowRight' });
        page.rootInstance.handleKeyboardInput(rightEvent);
        expect(page.rootInstance.videoPlayerRef.currentTime).toBe(60);
      });
      it('should handle volume keys', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          html: `<wpp-video-player src="${videoSrc}"></wpp-video-player>`,
        });
        // Mock the focus conditions
        jest.spyOn(page.rootInstance.host, 'contains').mockReturnValue(true);
        jest.spyOn(page.rootInstance.host, 'matches').mockReturnValue(true);
        // Initial volume should be 1
        expect(page.rootInstance.volume).toBe(1);
        // Test arrow down (decrease volume)
        const downEvent = new KeyboardEvent('keydown', { code: 'ArrowDown' });
        page.rootInstance.handleKeyboardInput(downEvent);
        expect(page.rootInstance.volume).toBe(0.95);
        // Test arrow up (increase volume)
        const upEvent = new KeyboardEvent('keydown', { code: 'ArrowUp' });
        page.rootInstance.handleKeyboardInput(upEvent);
        expect(page.rootInstance.volume).toBe(1);
      });
      it('should handle M key for mute/unmute', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          html: `<wpp-video-player src="${videoSrc}"></wpp-video-player>`,
        });
        // Mock the focus conditions
        jest.spyOn(page.rootInstance.host, 'contains').mockReturnValue(true);
        jest.spyOn(page.rootInstance.host, 'matches').mockReturnValue(true);
        const toggleMuteSpy = jest.spyOn(page.rootInstance, 'toggleMute');
        // Test M key
        const mEvent = new KeyboardEvent('keydown', { code: 'KeyM' });
        page.rootInstance.handleKeyboardInput(mEvent);
        expect(toggleMuteSpy).toHaveBeenCalled();
      });
      it('should handle F key for fullscreen', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          html: `<wpp-video-player src="${videoSrc}"></wpp-video-player>`,
        });
        // Mock the focus conditions
        jest.spyOn(page.rootInstance.host, 'contains').mockReturnValue(true);
        jest.spyOn(page.rootInstance.host, 'matches').mockReturnValue(true);
        const toggleFullscreenSpy = jest.spyOn(page.rootInstance, 'toggleFullscreen');
        // Test F key
        const fEvent = new KeyboardEvent('keydown', { code: 'KeyF' });
        page.rootInstance.handleKeyboardInput(fEvent);
        expect(toggleFullscreenSpy).toHaveBeenCalled();
      });
      it('should call showControls when controls are hidden and the user presses a key', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          html: `<wpp-video-player src="${videoSrc}"></wpp-video-player>`,
        });
        const showControlsSpy = jest.spyOn(page.rootInstance, 'showControls');
        page.rootInstance.isInvisible = true;
        // Mock the focus conditions
        jest.spyOn(page.rootInstance.host, 'contains').mockReturnValue(true);
        jest.spyOn(page.rootInstance.host, 'matches').mockReturnValue(true);
        // Test F key
        const fEvent = new KeyboardEvent('keydown', { code: 'KeyF' });
        page.rootInstance.handleKeyboardInput(fEvent);
        expect(showControlsSpy).toHaveBeenCalled();
      });
    });
    describe('caption handling', () => {
      const captionData = {
        label: 'English',
        kind: 'subtitles',
        src: 'en-captions.vtt',
        srclang: 'en',
        default: true,
      };
      it('starts with captions on when the track is `default`, and toggles them', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          template: () => h("wpp-video-player-v4-7-0", { src: videoSrc, caption: captionData }),
        });
        expect(page.rootInstance.isCaptionEnabled).toBe(true);
        page.rootInstance.toggleCaptions();
        expect(page.rootInstance.isCaptionEnabled).toBe(false);
        page.rootInstance.toggleCaptions();
        expect(page.rootInstance.isCaptionEnabled).toBe(true);
      });
      it.each([
        ['`default: false`', { ...captionData, default: false }],
        ['no `default`', { label: 'English', kind: 'subtitles', src: 'en-captions.vtt', srclang: 'en' }],
      ])('starts with captions off for %s', async (_name, caption) => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          template: () => h("wpp-video-player-v4-7-0", { src: videoSrc, caption: caption }),
        });
        expect(page.rootInstance.isCaptionEnabled).toBe(false);
      });
      it('should handle C key for toggling captions', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          template: () => h("wpp-video-player-v4-7-0", { src: videoSrc, caption: captionData }),
        });
        const toggleCaptionsSpy = jest.spyOn(page.rootInstance, 'toggleCaptions');
        // Mock the focus conditions
        jest.spyOn(page.rootInstance.host, 'contains').mockReturnValue(true);
        jest.spyOn(page.rootInstance.host, 'matches').mockReturnValue(true);
        // Test C key
        const cEvent = new KeyboardEvent('keydown', { code: 'KeyC' });
        page.rootInstance.handleKeyboardInput(cEvent);
        expect(toggleCaptionsSpy).toHaveBeenCalled();
      });
    });
    describe('volume slider placement', () => {
      const originalInnerHeight = window.innerHeight;
      /** A button and the slider panel, with the layout the browser would report for them. */
      const createLayout = ({ anchorTop, panelTop, isBelow = false, }) => {
        const anchor = document.createElement('div');
        const panel = document.createElement('div');
        anchor.getBoundingClientRect = () => ({ top: anchorTop, bottom: anchorTop + 32 });
        panel.getBoundingClientRect = () => ({ top: panelTop });
        if (isBelow)
          panel.classList.add('below');
        return { anchor, panel };
      };
      const setViewportHeight = (height) => Object.defineProperty(window, 'innerHeight', { value: height, configurable: true });
      afterEach(() => setViewportHeight(originalInnerHeight));
      it('should open above the button when the slider fits there', () => {
        setViewportHeight(800);
        const { anchor, panel } = createLayout({ anchorTop: 300, panelTop: 208 });
        placeVolumeSlider(anchor, panel);
        expect(panel.classList.contains('below')).toBe(false);
      });
      it('should open below the button when the slider leaves the top of the viewport and there is more room below', () => {
        setViewportHeight(800);
        const { anchor, panel } = createLayout({ anchorTop: 50, panelTop: -42 });
        placeVolumeSlider(anchor, panel);
        expect(panel.classList.contains('below')).toBe(true);
      });
      it('should stay above the button when there is even less room below', () => {
        setViewportHeight(100);
        const { anchor, panel } = createLayout({ anchorTop: 50, panelTop: -42 });
        placeVolumeSlider(anchor, panel);
        expect(panel.classList.contains('below')).toBe(false);
      });
      it('should go back above the button once there is room again', () => {
        setViewportHeight(800);
        const { anchor, panel } = createLayout({ anchorTop: 300, panelTop: 208, isBelow: true });
        placeVolumeSlider(anchor, panel);
        expect(panel.classList.contains('below')).toBe(false);
      });
      it('should do nothing before the volume bar has rendered', () => {
        const { panel } = createLayout({ anchorTop: 50, panelTop: -42 });
        expect(() => placeVolumeSlider(undefined, panel)).not.toThrow();
        expect(() => placeVolumeSlider(panel, undefined)).not.toThrow();
        expect(panel.classList.contains('below')).toBe(false);
      });
    });
    describe('utils', () => {
      it('should format time correctly', () => {
        expect(formatTime('default', 65)).toBe('01:05');
        expect(formatTime('extended', 3665)).toBe('01:01:05');
        expect(formatTime('default', 0)).toBe('00:00');
        expect(formatTime('extended', 0)).toBe('00:00:00');
        expect(() => formatTime('default', -1)).toThrow('Time cannot be negative');
      });
      it('should calculate buffer progress correctly', () => {
        const mockVideo = {
          duration: 100,
          currentTime: 25,
          buffered: {
            length: 1,
            start: () => 0,
            end: () => 50,
          },
        };
        const progress = calculateBufferProgress(mockVideo);
        expect(progress).toBe(50);
      });
      it('should handle edge cases in buffer progress calculation', () => {
        // No buffered ranges
        const emptyBuffered = {
          duration: 100,
          currentTime: 25,
          buffered: {
            length: 0,
          },
        };
        expect(calculateBufferProgress(emptyBuffered)).toBe(0);
        // Invalid duration
        const invalidDuration = {
          duration: NaN,
          currentTime: 25,
          buffered: {
            length: 1,
            start: () => 0,
            end: () => 50,
          },
        };
        expect(calculateBufferProgress(invalidDuration)).toBe(0);
      });
    });
    describe('fullscreen handling', () => {
      it('should toggle fullscreen when toggleFullscreen is called', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          html: `<wpp-video-player src="${videoSrc}"></wpp-video-player>`,
        });
        await page.waitForChanges();
        if (!page.root)
          return;
        // Mock requestFullscreen directly on the host element (page.root)
        const requestFullscreenMock = jest.fn().mockResolvedValue(undefined);
        page.root.requestFullscreen = requestFullscreenMock;
        // Mock document.fullscreenElement to return null initially
        Object.defineProperty(document, 'fullscreenElement', {
          value: null,
          writable: true,
          configurable: true,
        });
        await page.rootInstance.toggleFullscreen();
        expect(requestFullscreenMock).toHaveBeenCalled();
        expect(page.rootInstance.isFullscreen).toBe(true);
      });
      it('should handle fullscreen change event', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          html: `<wpp-video-player src="${videoSrc}"></wpp-video-player>`,
        });
        // Mock document.fullscreenElement
        Object.defineProperty(document, 'fullscreenElement', {
          configurable: true,
          get: jest.fn().mockReturnValue(page.root),
        });
        // Call the handler
        page.rootInstance.handleFullscreenChange();
        expect(page.rootInstance.isFullscreen).toBe(true);
        // Change fullscreenElement to null
        Object.defineProperty(document, 'fullscreenElement', {
          configurable: true,
          get: jest.fn().mockReturnValue(null),
        });
        page.rootInstance.handleFullscreenChange();
        expect(page.rootInstance.isFullscreen).toBe(false);
      });
    });
    describe('watchers', () => {
      it('should update seek progress when currentVideoTime changes', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          html: `<wpp-video-player src="${videoSrc}"></wpp-video-player>`,
        });
        // Mock video player ref
        page.rootInstance.videoPlayerRef = {};
        page.rootInstance.updateSeekProgress = jest.fn();
        // Call the watcher directly
        page.rootInstance.onCurrentVideoTimeChange(65);
        expect(page.rootInstance.updateSeekProgress).toHaveBeenCalledWith(65);
      });
      it('should update muted state when volume changes', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          html: `<wpp-video-player src="${videoSrc}"></wpp-video-player>`,
        });
        // Mock video player ref
        page.rootInstance.videoPlayerRef = {
          muted: false,
          volume: 1,
        };
        // Call the watcher directly
        page.rootInstance.onVolumeChange(0);
        expect(page.rootInstance.videoPlayerRef.muted).toBe(true);
        expect(page.rootInstance.videoPlayerRef.volume).toBe(0);
        page.rootInstance.onVolumeChange(0.5);
        expect(page.rootInstance.videoPlayerRef.muted).toBe(false);
        expect(page.rootInstance.videoPlayerRef.volume).toBe(0.5);
      });
    });
  });
  describe('subscribing to theme changes', () => {
    let mockStart;
    let mockStop;
    beforeEach(() => {
      mockStart = jest.fn();
      mockStop = jest.fn();
      jest.spyOn(themeUtils, 'themeSubscriptionController').mockReturnValue({
        start: mockStart,
        stop: mockStop,
      });
    });
    afterEach(() => {
      jest.restoreAllMocks();
    });
    it('Test the component subscribes when it connects (connectedCallback & componentDidLoad)', async () => {
      await newSpecPage({
        components: [WppVideoPlayer],
        html: `<wpp-video-player src="${videoSrc}"></wpp-video-player>`,
      });
      expect(mockStart).toHaveBeenCalledTimes(1);
    });
    it('should unsubscribe from theme when component disconnects (disconnectedCallback)', async () => {
      const page = await newSpecPage({
        components: [WppVideoPlayer],
        html: `<wpp-video-player src="${videoSrc}"></wpp-video-player>`,
      });
      page.root?.remove();
      expect(mockStop).toHaveBeenCalledTimes(1);
    });
  });
  describe('Testing accessibility', () => {
    const playing = async (template) => {
      const page = await newSpecPage({ components: [WppVideoPlayer], template });
      // The control bar only exists once the player leaves the idle state.
      page.rootInstance.videoPlayerState = 'paused';
      await page.waitForChanges();
      return page;
    };
    const shadow = (page) => page.root?.shadowRoot;
    const all = (page, selector) => Array.from(shadow(page)?.querySelectorAll(selector) ?? []);
    // Child `wpp-*` components are not registered in the spec DOM, so `ariaProps` stays a property
    // and never reflects to an attribute. Read the props the player actually passes down.
    const ariaOf = (el) => el?.ariaProps ?? {};
    const labelOf = (el) => ariaOf(el).label ?? el?.getAttribute('aria-label');
    // An announcement is written once the region has been emptied for `ANNOUNCEMENT_RESET_DELAY`. The
    // first flush lets async callers (`toggleFullscreen`) reach `announce` before the wait starts.
    const afterAnnouncement = async (page) => {
      await page.waitForChanges();
      await new Promise(resolve => setTimeout(resolve, ANNOUNCEMENT_RESET_DELAY));
      await page.waitForChanges();
    };
    describe('auto-hiding controls', () => {
      it('takes the control bar out of the tab order and the accessibility tree while it is hidden', async () => {
        const page = await playing(() => h("wpp-video-player-v4-7-0", { src: videoSrc }));
        const bar = () => shadow(page)?.querySelector('.controls-bar');
        expect(bar()?.hasAttribute('inert')).toBe(false);
        page.rootInstance.isInvisible = true;
        await page.waitForChanges();
        // Fading the bar out leaves its buttons focusable, so the markup has to remove them.
        expect(bar()?.hasAttribute('inert')).toBe(true);
        expect(bar()?.getAttribute('aria-hidden')).toBe('true');
        page.rootInstance.isInvisible = false;
        await page.waitForChanges();
        expect(bar()?.hasAttribute('inert')).toBe(false);
        expect(bar()?.hasAttribute('aria-hidden')).toBe(false);
      });
      it('matches the rendered playing-state tree', async () => {
        const page = await playing(() => h("wpp-video-player-v4-7-0", { src: videoSrc, caption: captionValue }));
        // The seek slider's id is unique per element by design, so pin it for the snapshot only.
        page.rootInstance.seekBarId = 'progress-slider-test';
        page.rootInstance.videoPlayerState = 'playing';
        // The live region takes the new state a moment later; wait for it so the snapshot is stable.
        await afterAnnouncement(page);
        // Paired expectations, so the snapshot cannot silently absorb an ARIA regression.
        const bar = shadow(page)?.querySelector('.controls-bar');
        expect(bar).toBeTruthy();
        expect(bar?.hasAttribute('inert')).toBe(false);
        expect(shadow(page)?.querySelector('[role="status"]')?.getAttribute('aria-live')).toBe('polite');
        expect(all(page, 'wpp-action-button').map(labelOf)).toEqual([
          'Pause',
          'Pause',
          'Show captions',
          'Mute',
          'Enter full screen',
        ]);
        expect(page.root).toMatchSnapshot();
      });
      it('keeps the status live region outside the control bar, so hiding the bar does not take it', async () => {
        const page = await playing(() => h("wpp-video-player-v4-7-0", { src: videoSrc }));
        page.rootInstance.isInvisible = true;
        await page.waitForChanges();
        const status = shadow(page)?.querySelector('[role="status"]');
        const bar = shadow(page)?.querySelector('.controls-bar');
        expect(status).toBeTruthy();
        expect(bar?.contains(status)).toBe(false);
      });
      it('keeps a tab stop on the player while the control bar is hidden', async () => {
        const page = await playing(() => h("wpp-video-player-v4-7-0", { src: videoSrc }));
        const controls = () => shadow(page)?.querySelector('.controls');
        // Visible: the controls themselves are the tab stops, so the container is not one.
        expect(controls()?.getAttribute('tabindex')).toBe('-1');
        page.rootInstance.isInvisible = true;
        await page.waitForChanges();
        // Hidden: the bar is inert, so without this the player has no tab stop at all and a
        // keyboard user can never reach the controls of a playing video.
        expect(shadow(page)?.querySelector('.controls-bar')?.hasAttribute('inert')).toBe(true);
        expect(controls()?.getAttribute('tabindex')).toBe('0');
      });
      it('reveals the control bar again when focus moves into the player', async () => {
        const page = await playing(() => h("wpp-video-player-v4-7-0", { src: videoSrc }));
        const bar = () => shadow(page)?.querySelector('.controls-bar');
        page.rootInstance.isInvisible = true;
        await page.waitForChanges();
        expect(bar()?.hasAttribute('inert')).toBe(true);
        // A control that takes focus must never be left inside the hidden subtree.
        page.root?.dispatchEvent(new Event('focusin'));
        await page.waitForChanges();
        expect(bar()?.hasAttribute('inert')).toBe(false);
        expect(bar()?.hasAttribute('aria-hidden')).toBe(false);
      });
    });
    describe('toggle semantics', () => {
      it('names the play control by its action, never by the player state', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          template: () => h("wpp-video-player-v4-7-0", { src: videoSrc }),
        });
        const overlay = () => shadow(page)?.querySelector('.play-button');
        expect(labelOf(overlay())).toBe('Play');
        page.rootInstance.videoPlayerState = 'playing';
        await page.waitForChanges();
        expect(labelOf(overlay())).toBe('Pause');
        // "Video paused" named the state of the video, not what pressing the control would do.
        expect(labelOf(overlay())).not.toContain('Video');
      });
      it('never pairs aria-pressed with a label that already flips', async () => {
        const page = await playing(() => h("wpp-video-player-v4-7-0", { src: videoSrc, caption: captionValue }));
        const toggles = all(page, 'wpp-action-button');
        expect(toggles.length).toBeGreaterThan(0);
        toggles.forEach(button => expect(ariaOf(button).pressed).toBeUndefined());
      });
      it('flips the caption and fullscreen labels with their state', async () => {
        const page = await playing(() => h("wpp-video-player-v4-7-0", { src: videoSrc, caption: captionValue }));
        const buttons = () => all(page, 'wpp-action-button');
        const named = (text) => buttons().some(b => labelOf(b) === text);
        expect(named('Show captions')).toBe(true);
        expect(named('Enter full screen')).toBe(true);
        page.rootInstance.isCaptionEnabled = true;
        page.rootInstance.isFullscreen = true;
        await page.waitForChanges();
        expect(named('Hide captions')).toBe(true);
        expect(named('Exit full screen')).toBe(true);
      });
    });
    describe('keyboard', () => {
      it('leaves arrow keys to the seek slider while it has focus', async () => {
        const page = await playing(() => h("wpp-video-player-v4-7-0", { src: videoSrc }));
        // Let the watcher's setTimeout(0) register the document listener.
        await new Promise(resolve => setTimeout(resolve, 0));
        const seek = shadow(page)?.querySelector('input.progress-bar');
        jest.spyOn(page.rootInstance.host, 'matches').mockReturnValue(true);
        Object.defineProperty(shadow(page), 'activeElement', { get: () => seek, configurable: true });
        page.rootInstance.videoPlayerRef = { currentTime: 60, duration: 120 };
        page.rootInstance.overallVideoTime = 120;
        document.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowRight' }));
        // The range input moves itself; seeking here too would jump twice on one press.
        expect(page.rootInstance.videoPlayerRef.currentTime).toBe(60);
      });
      it('keeps a visible pause control on a player that starts by itself', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          template: () => (h("wpp-video-player-v4-7-0", { src: videoSrc, controlPanelConfig: { autoplay: true, loop: true } })),
        });
        page.rootInstance.videoPlayerState = 'playing';
        await page.waitForChanges();
        const overlay = shadow(page)?.querySelector('.play-button');
        // An autoplay player renders no control bar, so this is the only way to stop it.
        expect(overlay?.classList.contains('invisible')).toBe(false);
        expect(labelOf(overlay)).toBe('Pause');
      });
      it.each([
        ['Ctrl+C (copy)', { code: 'KeyC', ctrlKey: true }],
        ['Cmd+C (copy)', { code: 'KeyC', metaKey: true }],
        ['Alt+ArrowLeft (Back)', { code: 'ArrowLeft', altKey: true }],
        ['Ctrl+F (find)', { code: 'KeyF', ctrlKey: true }],
        ['Cmd+M (minimise)', { code: 'KeyM', metaKey: true }],
      ])('leaves %s to the browser', async (_name, init) => {
        const page = await playing(() => h("wpp-video-player-v4-7-0", { src: videoSrc, caption: captionValue }));
        const toggleFullscreen = jest.spyOn(page.rootInstance, 'toggleFullscreen');
        jest.spyOn(page.rootInstance.host, 'matches').mockReturnValue(true);
        page.rootInstance.videoPlayerRef = { currentTime: 60, duration: 120 };
        page.rootInstance.overallVideoTime = 120;
        const event = new KeyboardEvent('keydown', { ...init, cancelable: true });
        page.rootInstance.handleKeyboardInput(event);
        expect(event.defaultPrevented).toBe(false);
        expect(page.rootInstance.isCaptionEnabled).toBe(false);
        expect(page.rootInstance.videoPlayerRef.currentTime).toBe(60);
        expect(page.rootInstance.volume).toBe(1);
        expect(toggleFullscreen).not.toHaveBeenCalled();
      });
      it('offers "Play" until an autoplay video reports it is playing', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          template: () => h("wpp-video-player-v4-7-0", { src: videoSrc, controlPanelConfig: { autoplay: true } }),
        });
        const overlay = () => shadow(page)?.querySelector('.play-button');
        // The browser can block autoplay, so a "Pause" here would offer to stop a video that never started.
        expect(page.rootInstance.videoPlayerState).toBe('idle');
        expect(labelOf(overlay())).toBe('Play');
        page.rootInstance.videoPlayerRef = { paused: false };
        shadow(page)?.querySelector('video')?.dispatchEvent(new Event('play'));
        await page.waitForChanges();
        expect(labelOf(overlay())).toBe('Pause');
      });
      it('lets Space start an autoplay video the browser blocked, and drops the listener on teardown', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          template: () => h("wpp-video-player-v4-7-0", { src: videoSrc, controlPanelConfig: { autoplay: true } }),
        });
        const video = page.rootInstance.videoPlayerRef;
        jest.spyOn(page.rootInstance.host, 'matches').mockReturnValue(true);
        Object.defineProperty(shadow(page), 'activeElement', { get: () => video, configurable: true });
        // Still `idle`: the shortcut listener cannot wait for the state to leave it.
        document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
        expect(playMock).toHaveBeenCalledTimes(1);
        const removeSpy = jest.spyOn(document, 'removeEventListener');
        page.root?.remove();
        expect(removeSpy).toHaveBeenCalledWith('keydown', page.rootInstance.handleKeyboardInput);
      });
      it('lets the autoplay pause control auto-hide rather than sitting on the picture', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          template: () => (h("wpp-video-player-v4-7-0", { src: videoSrc, controlPanelConfig: { autoplay: true, loop: true } })),
        });
        page.rootInstance.videoPlayerState = 'playing';
        page.rootInstance.isInvisible = false;
        await page.waitForChanges();
        const overlay = () => shadow(page)?.querySelector('.play-button');
        expect(overlay()?.classList.contains('invisible')).toBe(false);
        // It follows the same auto-hide as the control bar; the <video> stays focusable on
        // autoplay, so there is always a way to bring it back.
        page.rootInstance.isInvisible = true;
        await page.waitForChanges();
        expect(overlay()?.classList.contains('invisible')).toBe(true);
        expect(shadow(page)?.querySelector('video')?.getAttribute('tabindex')).toBe('0');
      });
      it('keeps the replay control once an autoplay video has finished, even if it had auto-hidden', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          template: () => h("wpp-video-player-v4-7-0", { src: videoSrc, controlPanelConfig: { autoplay: true } }),
        });
        page.rootInstance.videoPlayerState = 'playing';
        page.rootInstance.isInvisible = true;
        await page.waitForChanges();
        const overlay = () => shadow(page)?.querySelector('.play-button');
        expect(overlay()?.classList.contains('invisible')).toBe(true);
        // The video finishes while the controls are hidden. This overlay is the only way to replay
        // a player with no control bar, so it has to come back rather than follow the hide timer.
        page.rootInstance.videoPlayerState = 'idle';
        await page.waitForChanges();
        expect(overlay()?.classList.contains('invisible')).toBe(false);
        expect(labelOf(overlay())).toBe('Play');
      });
      it('renames the pause control when the browser stops playback by itself', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          template: () => (h("wpp-video-player-v4-7-0", { src: videoSrc, controlPanelConfig: { autoplay: true, loop: true } })),
        });
        page.rootInstance.videoPlayerState = 'playing';
        await page.waitForChanges();
        expect(labelOf(shadow(page)?.querySelector('.play-button'))).toBe('Pause');
        // Scrolling an autoplaying video out of view is enough for the browser to pause it; the
        // player has to notice, or the control offers to pause something already stopped.
        page.rootInstance.videoPlayerRef = { paused: true };
        shadow(page)?.querySelector('video')?.dispatchEvent(new Event('pause'));
        await page.waitForChanges();
        expect(labelOf(shadow(page)?.querySelector('.play-button'))).toBe('Play');
      });
    });
    describe('announcements', () => {
      it('has its one live region before the first play, so "Video is playing" changes one that exists', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          template: () => h("wpp-video-player-v4-7-0", { src: videoSrc }),
        });
        const regions = () => all(page, '[role="status"]');
        const [region] = regions();
        // A live region that appears already holding its text is not announced.
        expect(regions()).toHaveLength(1);
        expect(region?.textContent).toBe('Video is ready to play');
        page.rootInstance.videoPlayerState = 'playing';
        await afterAnnouncement(page);
        // Compared as a boolean: on failure Jest would try to print both DOM nodes in full.
        expect(regions()).toHaveLength(1);
        expect(regions()[0] === region).toBe(true);
        expect(region?.textContent).toBe('Video is playing');
      });
      it('gives an autoplay player no status regions, so a background video does not announce itself', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          template: () => h("wpp-video-player-v4-7-0", { src: videoSrc, controlPanelConfig: { autoplay: true } }),
        });
        expect(shadow(page)?.querySelector('[role="status"]')).toBeNull();
      });
      it('keeps the player state in a live status region but not the static help', async () => {
        const page = await playing(() => h("wpp-video-player-v4-7-0", { src: videoSrc }));
        const regions = all(page, '.sr-only');
        const status = regions.find(r => r.getAttribute('role') === 'status');
        const help = regions.find(r => r.querySelector('ul'));
        expect(status?.getAttribute('aria-live')).toBe('polite');
        expect(help).toBeTruthy();
        // Static help is not a status; announcing the whole list on re-render talks over the video.
        expect(help?.hasAttribute('aria-live')).toBe(false);
      });
      describe('keyboard shortcut results', () => {
        // Focus sits on the Play button, so nothing else would tell a screen reader what changed.
        const press = async (code, setup = {}) => {
          const page = await playing(() => h("wpp-video-player-v4-7-0", { src: videoSrc, caption: captionValue }));
          const playButton = shadow(page)?.querySelector('.play-pause-button');
          jest.spyOn(page.rootInstance.host, 'matches').mockReturnValue(true);
          Object.defineProperty(shadow(page), 'activeElement', { get: () => playButton, configurable: true });
          page.rootInstance.videoPlayerRef = { currentTime: setup.time ?? 60, duration: 100 };
          page.rootInstance.overallVideoTime = 100;
          page.rootInstance.volume = setup.volume ?? 0.5;
          page.rootInstance.handleKeyboardInput(new KeyboardEvent('keydown', { code }));
          await afterAnnouncement(page);
          return { page, status: () => shadow(page)?.querySelector('.announcement')?.textContent };
        };
        it.each([
          ['ArrowRight', {}, '01:05 of 01:40'],
          ['ArrowLeft', {}, '00:55 of 01:40'],
          ['ArrowUp', {}, 'Volume 55%'],
          ['ArrowDown', {}, 'Volume 45%'],
          ['KeyM', {}, 'Muted'],
          ['KeyM', { volume: 0 }, 'Unmuted'],
          ['KeyC', {}, 'Captions on'],
          ['KeyF', {}, 'Full screen'],
        ])('announces what %s changed', async (code, setup, expected) => {
          const { status } = await press(code, setup);
          expect(status()).toBe(expected);
        });
        it.each([
          ['ArrowUp at 100%', 'ArrowUp', { volume: 1 }],
          ['ArrowDown at 0%', 'ArrowDown', { volume: 0 }],
          ['ArrowRight at the end', 'ArrowRight', { time: 100 }],
          ['ArrowLeft at the start', 'ArrowLeft', { time: 0 }],
        ])('says nothing for %s, where nothing changed', async (_name, code, setup) => {
          const { status } = await press(code, setup);
          // Still the play state the player was put into; no new message replaced it.
          expect(status()).toBe('Video is paused');
        });
        it('speaks a real change worded like the last message, and leaves the message in place', async () => {
          const page = await playing(() => h("wpp-video-player-v4-7-0", { src: videoSrc }));
          // Let the "Video is paused" from setting the player up land first, on real timers.
          await afterAnnouncement(page);
          jest.useFakeTimers();
          try {
            page.rootInstance.toggleMute();
            jest.advanceTimersByTime(ANNOUNCEMENT_RESET_DELAY);
            expect(page.rootInstance.announcement).toBe('Muted');
            // Unmuted by dragging the slider, which announces nothing, then muted again: still "Muted",
            // so the region is emptied first to make it a change the screen reader hears.
            page.rootInstance.volume = 0.5;
            page.rootInstance.toggleMute();
            expect(page.rootInstance.announcement).toBe('');
            jest.advanceTimersByTime(ANNOUNCEMENT_RESET_DELAY);
            expect(page.rootInstance.announcement).toBe('Muted');
            // Nothing clears it afterwards.
            jest.advanceTimersByTime(10000);
            expect(page.rootInstance.announcement).toBe('Muted');
          }
          finally {
            jest.useRealTimers();
          }
        });
        it('moves the focused volume slider by volumeSkipValue on ↑/↓, keeps its fine step for dragging, and stays quiet', async () => {
          const page = await playing(() => (h("wpp-video-player-v4-7-0", { src: videoSrc, jumpValues: { videoSkipTimeValue: 5, volumeSkipValue: 0.1 } })));
          const volumeSlider = shadow(page)?.querySelector('#volume-slider');
          jest.spyOn(page.rootInstance.host, 'matches').mockReturnValue(true);
          Object.defineProperty(shadow(page), 'activeElement', { get: () => volumeSlider, configurable: true });
          page.rootInstance.volume = 0.5;
          const event = new KeyboardEvent('keydown', { code: 'ArrowUp', cancelable: true });
          page.rootInstance.handleKeyboardInput(event);
          await afterAnnouncement(page);
          // The slider's own 1% step is cancelled in favour of the shortcut's.
          expect(event.defaultPrevented).toBe(true);
          expect(page.rootInstance.volume).toBe(0.6);
          expect(volumeSlider?.getAttribute('step')).toBe('0.01');
          // The focused slider reads its own new value, so the region keeps the play state.
          expect(shadow(page)?.querySelector('.announcement')?.textContent).toBe('Video is paused');
        });
      });
      it('announces leaving full screen through the browser, and ignores other elements going full screen', async () => {
        const page = await playing(() => h("wpp-video-player-v4-7-0", { src: videoSrc }));
        const announcement = () => shadow(page)?.querySelector('.announcement')?.textContent;
        const setFullscreenElement = (element) => Object.defineProperty(document, 'fullscreenElement', { configurable: true, get: () => element });
        try {
          // Escape exits through the browser, never through `toggleFullscreen`.
          page.rootInstance.isFullscreen = true;
          setFullscreenElement(null);
          page.rootInstance.handleFullscreenChange();
          await afterAnnouncement(page);
          expect(page.rootInstance.isFullscreen).toBe(false);
          expect(announcement()).toBe('Exited full screen');
          page.rootInstance.announcement = '';
          setFullscreenElement(document.createElement('div'));
          page.rootInstance.handleFullscreenChange();
          await afterAnnouncement(page);
          expect(page.rootInstance.isFullscreen).toBe(false);
          expect(announcement()).toBe('');
        }
        finally {
          setFullscreenElement(null);
        }
      });
      // Screen readers rarely re-read a focused button whose name has just flipped, so pressing the
      // button has to be announced like the shortcut is.
      it.each([
        ['Mute', 'Muted'],
        ['Show captions', 'Captions on'],
        ['Enter full screen', 'Full screen'],
      ])('announces what the "%s" button changed', async (buttonLabel, expected) => {
        const page = await playing(() => h("wpp-video-player-v4-7-0", { src: videoSrc, caption: captionValue }));
        const button = all(page, 'wpp-action-button').find(el => labelOf(el) === buttonLabel);
        button?.dispatchEvent(new MouseEvent('click'));
        await afterAnnouncement(page);
        expect(shadow(page)?.querySelector('.announcement')?.textContent).toBe(expected);
      });
    });
    describe('seek slider arrow keys', () => {
      // The slider's own step is 1% of the duration: 0.1s on a short clip, which the spoken
      // "00:03 of 00:10" cannot show, so a press would sound like it did nothing.
      it.each([
        ['ArrowRight', 60, 5, 65, '01:05 of 01:40'],
        ['ArrowLeft', 60, 5, 55, '00:55 of 01:40'],
        ['ArrowRight', 98, 5, 100, '01:40 of 01:40'],
        ['ArrowLeft', 2, 5, 0, '00:00 of 01:40'],
        ['ArrowRight', 60, 15, 75, '01:15 of 01:40'],
      ])('%s from %ss moves by the %ss shortcut distance', async (code, from, skip, to, valueText) => {
        const page = await playing(() => (h("wpp-video-player-v4-7-0", { src: videoSrc, jumpValues: { videoSkipTimeValue: skip, volumeSkipValue: 0.05 } })));
        const seek = shadow(page)?.querySelector('.progress-container input');
        // Kept in hand: the re-render below puts the real <video> back into `videoPlayerRef`.
        const video = { currentTime: from, duration: 100 };
        page.rootInstance.videoPlayerRef = video;
        page.rootInstance.overallVideoTime = 100;
        const event = new KeyboardEvent('keydown', { code, cancelable: true });
        seek.dispatchEvent(event);
        await page.waitForChanges();
        expect(event.defaultPrevented).toBe(true);
        expect(video.currentTime).toBe(to);
        // Updated at once rather than on `timeupdate`, so the screen reader reads the new time.
        expect(seek.getAttribute('aria-valuetext')).toBe(valueText);
        // The slider reads its own value; an announcement would only say it twice, so the region keeps
        // the play state.
        await afterAnnouncement(page);
        expect(shadow(page)?.querySelector('.announcement')?.textContent).toBe('Video is paused');
      });
      it('keeps its spoken value still while focused during playback, and moves it only for deliberate seeks', async () => {
        const page = await playing(() => h("wpp-video-player-v4-7-0", { src: videoSrc }));
        const seek = shadow(page)?.querySelector('.progress-container input');
        const video = { currentTime: 0, duration: 100 };
        // Every re-render puts the real <video> back into `videoPlayerRef`, so this goes back in before each step.
        const useFakeVideo = () => (page.rootInstance.videoPlayerRef = video);
        const tick = async (time) => {
          video.currentTime = time;
          page.rootInstance.currentVideoTime = time;
          await page.waitForChanges();
        };
        page.rootInstance.overallVideoTime = 100;
        page.rootInstance.videoPlayerState = 'playing';
        await page.waitForChanges();
        // Without focus it keeps up silently, so focus lands on the current time.
        await tick(3);
        expect(seek.getAttribute('aria-valuetext')).toBe('00:03 of 01:40');
        // Focused, playback ticking on would otherwise have it read out every second.
        Object.defineProperty(shadow(page), 'activeElement', { get: () => seek, configurable: true });
        await tick(6);
        expect(seek.getAttribute('aria-valuetext')).toBe('00:03 of 01:40');
        // An arrow key on the slider.
        useFakeVideo();
        seek.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowRight', cancelable: true }));
        await page.waitForChanges();
        expect(seek.getAttribute('aria-valuetext')).toBe('00:11 of 01:40');
        // A drag or a click on the track.
        useFakeVideo();
        seek.value = '40';
        seek.dispatchEvent(new Event('input'));
        await page.waitForChanges();
        expect(seek.getAttribute('aria-valuetext')).toBe('00:40 of 01:40');
        // Paused, it follows the position again.
        page.rootInstance.currentVideoTime = 42;
        page.rootInstance.videoPlayerState = 'paused';
        await page.waitForChanges();
        expect(seek.getAttribute('aria-valuetext')).toBe('00:42 of 01:40');
      });
    });
    describe('keyboard-shortcut help', () => {
      it('lists the volume and fullscreen shortcuts only when those controls exist', async () => {
        const withControls = await playing(() => h("wpp-video-player-v4-7-0", { src: videoSrc }));
        const textOf = (page) => shadow(page)?.querySelector('.sr-only ul')?.textContent ?? '';
        expect(textOf(withControls)).toContain('volume');
        expect(textOf(withControls)).toContain('mute');
        const withoutVolume = await playing(() => (h("wpp-video-player-v4-7-0", { src: videoSrc, controlPanelConfig: { showVolumeButton: false, showFullscreenButton: false } })));
        // These keys are refused when their control is absent, so advertising them would be a lie.
        expect(textOf(withoutVolume)).not.toContain('volume');
        expect(textOf(withoutVolume)).not.toContain('Fullscreen');
      });
      it('states the seek distance that jumpValues actually uses', async () => {
        const page = await playing(() => (h("wpp-video-player-v4-7-0", { src: videoSrc, jumpValues: { videoSkipTimeValue: 15, volumeSkipValue: 0.1 } })));
        const help = shadow(page)?.querySelector('.sr-only ul')?.textContent ?? '';
        expect(help).toContain('15 seconds');
        expect(help).not.toContain('{seconds}');
      });
      it('introduces the help without adding a heading to the page outline', async () => {
        const page = await playing(() => h("wpp-video-player-v4-7-0", { src: videoSrc }));
        const help = all(page, '.sr-only').find(r => r.querySelector('ul'));
        // The player cannot know its heading level in the page, so a fixed one would break the outline.
        expect(help?.querySelector('h1, h2, h3, h4, h5, h6')).toBeNull();
        expect(help?.textContent).toContain('Keyboard shortcuts');
      });
    });
    describe('captions', () => {
      it('reads the seek position as a clock time out of the total, not a bare number of seconds', async () => {
        const page = await playing(() => h("wpp-video-player-v4-7-0", { src: videoSrc }));
        page.rootInstance.overallVideoTime = 100;
        page.rootInstance.currentVideoTime = 65;
        await page.waitForChanges();
        const seek = shadow(page)?.querySelector('input.progress-bar');
        // `aria-valuenow="65"` is announced as "65"; the value text gives "01:05 of 01:40".
        expect(seek?.getAttribute('aria-valuenow')).toBe('65');
        expect(seek?.getAttribute('aria-valuetext')).toBe('01:05 of 01:40');
      });
      it('reads only the position for a live stream, whose infinite duration would read as "NaN:NaN"', async () => {
        const page = await playing(() => h("wpp-video-player-v4-7-0", { src: videoSrc }));
        page.rootInstance.overallVideoTime = Infinity;
        page.rootInstance.currentVideoTime = 65;
        await page.waitForChanges();
        expect(shadow(page)?.querySelector('input.progress-bar')?.getAttribute('aria-valuetext')).toBe('01:05');
      });
      it('marks the captions with the track language, which may not be the page language', async () => {
        const page = await playing(() => (h("wpp-video-player-v4-7-0", { src: videoSrc, caption: { ...captionValue, srclang: 'fr' } })));
        expect(shadow(page)?.querySelector('.captions-wrapper')?.getAttribute('lang')).toBe('fr');
      });
      it('removes caption text from the accessibility tree while captions are off', async () => {
        const page = await playing(() => h("wpp-video-player-v4-7-0", { src: videoSrc, caption: captionValue }));
        const wrapper = () => shadow(page)?.querySelector('.captions-wrapper');
        expect(wrapper()?.hasAttribute('inert')).toBe(true);
        expect(wrapper()?.getAttribute('aria-hidden')).toBe('true');
        page.rootInstance.isCaptionEnabled = true;
        await page.waitForChanges();
        expect(wrapper()?.hasAttribute('inert')).toBe(false);
      });
      it('shows captions as plain text, not a live region read over the soundtrack', async () => {
        const page = await playing(() => (h("wpp-video-player-v4-7-0", { src: videoSrc, caption: { ...captionValue, default: true } })));
        page.rootInstance.activeCues = [{ text: 'Hello there' }];
        await page.waitForChanges();
        const wrapper = shadow(page)?.querySelector('.captions-wrapper');
        // On from the start here, so a live region would read every cue unasked.
        expect(wrapper?.hasAttribute('aria-live')).toBe(false);
        expect(wrapper?.hasAttribute('role')).toBe(false);
        expect(wrapper?.hasAttribute('aria-hidden')).toBe(false);
        expect(wrapper?.textContent).toBe('Hello there');
      });
    });
    describe('jumpValues', () => {
      it.each([
        ['videoSkipTimeValue', { videoSkipTimeValue: 10 }, 70, 0.55],
        ['volumeSkipValue', { volumeSkipValue: 0.1 }, 65, 0.6],
      ])('keeps the default for the key left out when only %s is passed', async (_name, jumpValues, time, volume) => {
        const page = await playing(() => (h("wpp-video-player-v4-7-0", { src: videoSrc, jumpValues: jumpValues })));
        const video = { currentTime: 60, duration: 100 };
        jest.spyOn(page.rootInstance.host, 'matches').mockReturnValue(true);
        Object.defineProperty(shadow(page), 'activeElement', {
          get: () => shadow(page)?.querySelector('.play-pause-button'),
          configurable: true,
        });
        page.rootInstance.videoPlayerRef = video;
        page.rootInstance.overallVideoTime = 100;
        page.rootInstance.volume = 0.5;
        page.rootInstance.handleKeyboardInput(new KeyboardEvent('keydown', { code: 'ArrowRight' }));
        page.rootInstance.handleKeyboardInput(new KeyboardEvent('keydown', { code: 'ArrowUp' }));
        // A missing `volumeSkipValue` used to make the volume NaN.
        expect(video.currentTime).toBe(time);
        expect(page.rootInstance.volume).toBe(volume);
      });
    });
    describe('host and popup semantics', () => {
      it('starts silent but still offers a way back when controlPanelConfig.muted is set', async () => {
        const page = await playing(() => (h("wpp-video-player-v4-7-0", { src: videoSrc, controlPanelConfig: { muted: true } })));
        // Silent from the start, with the volume control still there to turn sound on.
        expect(page.rootInstance.volume).toBe(0);
        const mute = shadow(page)?.querySelector('.volume-button');
        expect(mute).toBeTruthy();
        expect(labelOf(mute)).toBe('Unmute');
        // And unmuting has to actually produce sound, not restore the silence it began with.
        page.rootInstance.toggleMute();
        await page.waitForChanges();
        expect(page.rootInstance.volume).toBe(1);
        expect(labelOf(shadow(page)?.querySelector('.volume-button'))).toBe('Mute');
      });
      it('defaults the host to a group rather than a landmark, and lets ariaProps override it', async () => {
        const plain = await newSpecPage({
          components: [WppVideoPlayer],
          template: () => h("wpp-video-player-v4-7-0", { src: videoSrc }),
        });
        // Ten players on a page used to publish ten identical "Video player" landmarks.
        expect(plain.root?.getAttribute('role')).toBe('group');
        expect(plain.root?.getAttribute('aria-label')).toBe('Video player');
        const named = await newSpecPage({
          components: [WppVideoPlayer],
          template: () => (h("wpp-video-player-v4-7-0", { src: videoSrc, ariaProps: { role: 'region', label: 'Trailer' } })),
        });
        expect(named.root?.getAttribute('role')).toBe('region');
        expect(named.root?.getAttribute('aria-label')).toBe('Trailer');
      });
      it('exposes the volume slider as a popup on the mute button', async () => {
        const page = await playing(() => h("wpp-video-player-v4-7-0", { src: videoSrc }));
        const mute = () => shadow(page)?.querySelector('.volume-button');
        expect(ariaOf(mute()).haspopup).toBe('dialog');
        expect(ariaOf(mute()).expanded).toBe(false);
        page.rootInstance.isVolumeSliderOpen = true;
        await page.waitForChanges();
        expect(ariaOf(mute()).expanded).toBe(true);
      });
    });
    describe('locales', () => {
      it('still honours the deprecated locale keys a consumer already ships', async () => {
        const page = await playing(() => (h("wpp-video-player-v4-7-0", { src: videoSrc, caption: captionValue, locales: {
            playButtonAriaLabel: { play: 'LEGACY playing', pause: 'LEGACY paused' },
            captionButtonAriaLabel: 'LEGACY captions',
            volumeButtonAriaLabel: 'LEGACY volume',
            fullscreenButtonAriaLabel: 'LEGACY fullscreen',
            videoProgressAriaLabel: 'LEGACY seek',
          } })));
        // Deprecated is not the same as ignored: dropping these would silently throw away a
        // translation shipped against 4.4.0.
        const names = all(page, 'wpp-action-button').map(labelOf);
        expect(names).toContain('LEGACY paused');
        expect(names).toContain('LEGACY captions');
        expect(names).toContain('LEGACY volume');
        expect(names).toContain('LEGACY fullscreen');
        expect(shadow(page)?.querySelector('input.progress-bar')?.getAttribute('aria-label')).toBe('LEGACY seek');
      });
      it('keeps a name on both states when a deprecated key is only partly supplied', async () => {
        const page = await playing(() => (h("wpp-video-player-v4-7-0", { src: videoSrc,
          // Half-filled on purpose. The type forbids it, but `mergeLocales` is a shallow spread,
          // so a JavaScript consumer can still get here and must not end up with a nameless control.
          locales: { playButtonAriaLabel: { play: 'ONLY-PLAY' } } })));
        // `locales` is documented as partial. Supplying one half must not leave the other
        // unnamed — an icon-only button with no accessible name is an axe `button-name` failure.
        const names = () => all(page, 'wpp-action-button').map(labelOf);
        names().forEach(name => expect(name).toBeTruthy());
        // Paused, so the missing half falls back to the replacement wording for that state.
        expect(names()).toContain('Play');
        page.rootInstance.videoPlayerState = 'playing';
        await page.waitForChanges();
        expect(names()).toContain('ONLY-PLAY');
      });
      it('renders every accessible name it is given, rather than the defaults', async () => {
        const page = await playing(() => (h("wpp-video-player-v4-7-0", { src: videoSrc, caption: captionValue, locales: {
            playPauseButtonArealLabels: { play: 'Lire', pause: 'Suspendre' },
            showCaptionsButtonAriaLabel: 'Afficher les sous-titres',
            muteButtonAriaLabel: 'Couper le son',
            enterFullscreenButtonAriaLabel: 'Plein ecran',
            videoProgressLabel: 'Progression',
          } })));
        const names = () => all(page, 'wpp-action-button').map(labelOf);
        expect(names()).toContain('Lire');
        expect(names()).toContain('Afficher les sous-titres');
        expect(names()).toContain('Couper le son');
        expect(names()).toContain('Plein ecran');
        expect(shadow(page)?.querySelector('label[class="sr-only"]')?.textContent).toBe('Progression');
        page.rootInstance.videoPlayerState = 'playing';
        await page.waitForChanges();
        expect(names()).toContain('Suspendre');
      });
      it('keeps the default wording for the nested keys a partial override leaves out', async () => {
        const page = await playing(() => (h("wpp-video-player-v4-7-0", { src: videoSrc, locales: {
            videoStates: { playing: 'Lecture' },
            playPauseButtonArealLabels: { play: 'Lire' },
            keyboardShortcutsDescription: { title: 'Raccourcis' },
          } })));
        const { videoStates, playPauseButtonArealLabels, keyboardShortcutsDescription } = page.rootInstance._locales;
        expect(videoStates).toEqual({ ...LOCALES_DEFAULTS.videoStates, playing: 'Lecture' });
        expect(playPauseButtonArealLabels).toEqual({ ...LOCALES_DEFAULTS.playPauseButtonArealLabels, play: 'Lire' });
        expect(keyboardShortcutsDescription).toEqual({
          ...LOCALES_DEFAULTS.keyboardShortcutsDescription,
          title: 'Raccourcis',
        });
      });
    });
  });
});
