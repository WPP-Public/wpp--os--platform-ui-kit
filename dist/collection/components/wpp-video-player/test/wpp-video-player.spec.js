import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppVideoPlayer } from '../wpp-video-player';
import { formatTime, calculateBufferProgress } from '../utils';
let originalQuerySelector;
let originalQuerySelectorAll;
describe('wpp-video-player', () => {
  const videoSrc = 'https://www.w3schools.com/html/mov_bbb.mp4';
  const thumbnailSrc = 'https://example.com/thumbnail.jpg';
  // Mock for HTMLMediaElement
  let playMock;
  let pauseMock;
  let videoMock;
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
    jest.restoreAllMocks();
  });
  describe('snapshots', () => {
    it('should render default component', async () => {
      const page = await newSpecPage({
        components: [WppVideoPlayer],
        template: () => h("wpp-video-player-v3-3-0", { src: videoSrc }),
      });
      expect(page.root).toMatchSnapshot();
    });
    it('should render component with autoplay and mute', async () => {
      const page = await newSpecPage({
        components: [WppVideoPlayer],
        template: () => h("wpp-video-player-v3-3-0", { src: videoSrc, controlPanelConfig: { autoplay: true } }),
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
          template: () => h("wpp-video-player-v3-3-0", { src: videoSrc, size: { width: 800, height: 600 } }),
        });
        const component = page.rootInstance;
        expect(component.videoPlayerSize.width).toBe(800);
        expect(component.videoPlayerSize.height).toBe(600);
      });
      it('should render with autoplay configuration', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          template: () => h("wpp-video-player-v3-3-0", { src: videoSrc, controlPanelConfig: { autoplay: true } }),
        });
        const video = page.root?.shadowRoot?.querySelector('video');
        expect(video).toBeTruthy();
        expect(video.hasAttribute('autoplay')).toBe(true);
        expect(video.hasAttribute('muted')).toBe(true);
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
          template: () => (h("wpp-video-player-v3-3-0", { src: [videoSrc, videoSrc], type: ['video/mp4', 'video/webm'] })),
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
          template: () => h("wpp-video-player-v3-3-0", { src: videoSrc, caption: captionData }),
        });
        const trackElements = page.root?.shadowRoot?.querySelectorAll('track');
        expect(trackElements.length).toBe(1);
        expect(trackElements[0].getAttribute('srclang')).toBe('en');
      });
      it('should render without volume button and volume need to be set to 0', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          template: () => (h("wpp-video-player-v3-3-0", { src: videoSrc, controlPanelConfig: { showVolumeButton: false } })),
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
        const timeFormat = { minutes: '02', seconds: '30' };
        page.rootInstance.renderVideoTime(timeFormat);
        // Verify the method was called with the correct parameters
        expect(renderSpy).toHaveBeenCalledWith(timeFormat);
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
          template: () => h("wpp-video-player-v3-3-0", { src: videoSrc, caption: captionData }),
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
        expect(page.rootInstance.splitOverallVideoTime).toEqual({ minutes: '01', seconds: '40' });
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
        // Verify the split time format includes hours
        expect(page.rootInstance.splitOverallVideoTime).toEqual({
          hours: '01',
          minutes: '01',
          seconds: '20',
        });
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
        // Create mock elements
        const mockBarContainer = { classList: { add: jest.fn() } };
        const mockButton = {
          shadowRoot: { querySelector: jest.fn().mockReturnValue({ classList: { add: jest.fn() } }) },
        };
        // Add the mocked elements to the component instance
        page.rootInstance.volumeBarContainerRef = mockBarContainer;
        page.rootInstance.volumeButtonRef = mockButton;
        // Mock clearTimeout
        jest.spyOn(global, 'clearTimeout').mockImplementation(jest.fn());
        // Call the method
        page.rootInstance.volumeSliderShow();
        // Verify clearTimeout was called
        expect(global.clearTimeout).toHaveBeenCalled();
        // Verify the classList.add was called with 'active'
        expect(mockBarContainer.classList.add).toHaveBeenCalledWith('active');
        // Verify the button's classList.add was called with 'hover-active'
        const btnEl = mockButton.shadowRoot.querySelector();
        expect(btnEl.classList.add).toHaveBeenCalledWith('hover-active');
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
        const mockButtonShadowElement = { classList: { remove: jest.fn() } };
        const mockButton = {
          shadowRoot: { querySelector: jest.fn().mockReturnValue(mockButtonShadowElement) },
        };
        // Add the mocked elements to the component instance
        page.rootInstance.volumeBarContainerRef = mockBarContainer;
        page.rootInstance.volumeButtonRef = mockButton;
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
        // Verify the button's classList.remove was called with 'hover-active'
        expect(mockButtonShadowElement.classList.remove).toHaveBeenCalledWith('hover-active');
        // Call the method with custom delay
        page.rootInstance.volumeSliderHide(500);
        // Verify setTimeout was called with the custom delay
        expect(timeoutDelay).toBe(500);
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
        expect(page.rootInstance.videoPlayerState).toBe('idle');
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
    });
    describe('keyboard controls', () => {
      it('should handle space key for play/pause', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          template: () => h("wpp-video-player-v3-3-0", { src: videoSrc }),
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
          template: () => h("wpp-video-player-v3-3-0", { src: videoSrc }),
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
      it('should toggle captions when toggleCaptions is called', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          template: () => h("wpp-video-player-v3-3-0", { src: videoSrc, caption: captionData }),
        });
        // Initial state
        expect(page.rootInstance.isCaptionEnabled).toBe(false);
        // Toggle captions
        page.rootInstance.toggleCaptions();
        expect(page.rootInstance.isCaptionEnabled).toBe(true);
        // Toggle again
        page.rootInstance.toggleCaptions();
        expect(page.rootInstance.isCaptionEnabled).toBe(false);
      });
      it('should handle C key for toggling captions', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          template: () => h("wpp-video-player-v3-3-0", { src: videoSrc, caption: captionData }),
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
    describe('utils', () => {
      it('should format time correctly', () => {
        expect(formatTime('default', 65)).toBe('01:05');
        expect(formatTime('extended', 3665)).toBe('01:01:05');
        const splitFormat = formatTime('default', 65, true);
        expect(splitFormat.minutes).toBe('01');
        expect(splitFormat.seconds).toBe('05');
        const splitFormatExtended = formatTime('extended', 3665, true);
        expect(splitFormatExtended.hours).toBe('01');
        expect(splitFormatExtended.minutes).toBe('01');
        expect(splitFormatExtended.seconds).toBe('05');
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
      it('should update splitCurrentVideoTime when currentVideoTime changes', async () => {
        const page = await newSpecPage({
          components: [WppVideoPlayer],
          html: `<wpp-video-player src="${videoSrc}"></wpp-video-player>`,
        });
        // Mock video player ref
        page.rootInstance.videoPlayerRef = {};
        page.rootInstance.updateSeekProgress = jest.fn();
        // Call the watcher directly
        page.rootInstance.onCurrentVideoTimeChange(65);
        expect(page.rootInstance.splitCurrentVideoTime).toEqual({
          minutes: '01',
          seconds: '05',
        });
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
});
