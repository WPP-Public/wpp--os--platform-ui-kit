import { WppActionButton } from '../wpp-action-button/wpp-action-button';
export type ActionButtonData = Partial<Pick<WppActionButton, 'disabled' | 'loading' | 'autoFocus' | 'name' | 'form' | 'type' | 'value' | 'ariaProps'>> & {
  icon: `wpp-icon-${string}`;
  onClick?: () => void;
};
