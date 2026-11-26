import { WppVideoPlayer } from '../wpp-video-player';
/**
 * The screen-reader-only live region: the last thing that happened, whether a play-state change or
 * what a control or shortcut just changed (see `announce`). Rendered from the start, idle included:
 * a live region that appears already holding its text is not announced, so it has to exist before
 * the first "Video is playing".
 */
export declare function renderStatusRegionComponent(this: WppVideoPlayer): any;
/**
 * Screen-reader-only help text. The shortcut list is generated from the live config so it can only
 * ever describe shortcuts that actually work: the volume, mute and fullscreen keys are handled
 * solely when their control is rendered, and the seek distance comes from `jumpValues`.
 */
export declare function renderAccessibilityInstructionsComponent(this: WppVideoPlayer): any;
