import { FunctionalComponent } from '../../stencil-public-runtime';
declare const ICON_SIZE_FOR_S = 16;
declare const ICON_SIZE_FOR_M = 20;
export interface Props {
  width?: number;
  height?: number;
  initialViewBoxNumber?: typeof ICON_SIZE_FOR_S | typeof ICON_SIZE_FOR_M;
  size: 'm' | 's';
  color?: string;
  name: string;
  viewBoxX?: number;
  viewBoxY?: number;
  ariaLabel?: string;
}
export declare const WppIcon: FunctionalComponent<Props>;
export {};
