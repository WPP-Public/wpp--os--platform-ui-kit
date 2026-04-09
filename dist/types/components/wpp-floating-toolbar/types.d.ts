import { Components } from '../../components';
export type ActionButtonData = Partial<Pick<Components.WppActionButton, 'disabled' | 'loading' | 'autoFocus' | 'name' | 'form' | 'type' | 'value' | 'ariaProps'>> & {
  icon: `wpp-icon-${string}`;
  onClick?: () => void;
};
