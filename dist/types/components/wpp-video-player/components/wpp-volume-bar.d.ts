/**
 * What a player must expose to render this volume bar: the refs the bar fills in, the volume it
 * shows, the labels it reads and the handlers it wires. Both the video and the audio player
 * provide these.
 */
export interface VolumeBarHost {
  volumeContainerRef: HTMLDivElement | undefined;
  volumeButtonRef: HTMLWppActionButtonElement | undefined;
  volumeBarContainerRef: HTMLDivElement | undefined;
  volumeBarRef: HTMLInputElement | undefined;
  volume: number;
  readonly _locales: {
    volumeProgressLabel: string;
  };
  /** The mute button's current label. A player may swap it with the mute state, or keep one label. */
  readonly volumeButtonLabel: string;
  handleSliderShow: () => void;
  handleSliderHide: (delay: number) => void;
  dismissVolumeSlider: () => void;
  toggleMute: () => void;
  handleVolume: (event: Event) => void;
}
export interface VolumeBarOptions {
  /** The mute button variant: `inverted` on the video's dark controls bar, `secondary` on a light surface. */
  variant?: 'inverted' | 'secondary';
  /** If `true`, the mute button also shows a tooltip with its label. */
  withTooltip?: boolean;
  /**
   * If `true`, the mute button exposes the muted state as `aria-pressed`. A player whose label
   * already names the state (Mute / Unmute) turns this off, since a toggle uses one or the other.
   */
  withPressedState?: boolean;
}
/**
 * Picks the side the slider opens on, each time it opens: above the mute button by default, and
 * below it when it would leave the top of the viewport and there is more room below, like a
 * flipping popover. Both players call it before showing the slider, so it lands in place.
 *
 * The default placement is restored before measuring, so a previous flip does not skew the reading.
 */
export declare function placeVolumeSlider(anchor: HTMLElement | undefined, panel: HTMLElement | undefined): void;
/**
 * A mute button with a volume slider that opens while the button is hovered or focused, and closes
 * shortly after both leave. While closed the slider is hidden from the tab order and from assistive
 * technology, like a closed popover, so it is only reached through the button. Escape dismisses it.
 */
export declare function renderVolumeBarComponent(this: VolumeBarHost, { variant, withTooltip, withPressedState }?: VolumeBarOptions): any;
