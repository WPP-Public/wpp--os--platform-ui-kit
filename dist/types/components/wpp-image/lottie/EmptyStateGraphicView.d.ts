import { FunctionalComponent } from '../../../stencil-public-runtime';
import { EmptyStateGraphic } from './empty-state-graphic';
export interface EmptyStateGraphicViewProps {
  graphic: EmptyStateGraphic;
  /** Host class the graphic has always carried, e.g. `wpp-empty-404`. */
  name: string;
  width?: number;
  height?: number;
}
/**
 * Markup shared by all 12 wpp-empty-* components.
 *
 * The animation container is always rendered at the final size, and the
 * skeleton sits on top of it while loading - so the swap cannot shift layout.
 */
export declare const EmptyStateGraphicView: FunctionalComponent<EmptyStateGraphicViewProps>;
