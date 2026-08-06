import { AvatarSize } from '../wpp-avatar-group/types';
/** Border radius applied to circular avatars (large enough to always render a full circle). */
export declare const AVATAR_CIRCLE_BORDER_RADIUS = "120px";
/** Rendered icon size (px) for each avatar size. */
export declare const AVATAR_ICON_SIZE: Record<AvatarSize, number>;
/**
 * Maps each avatar size to the design-token size used for the square (rounded rectangle) radius.
 * Several avatar sizes intentionally share the same radius token.
 */
export declare const AVATAR_SQUARE_RADIUS_TOKEN: Record<AvatarSize, string>;
