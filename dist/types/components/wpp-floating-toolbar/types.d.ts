import { Components } from '../../components';
type ActionButtonBase = Partial<Pick<Components.WppActionButton, 'disabled' | 'loading' | 'autoFocus' | 'name' | 'form' | 'type' | 'value' | 'ariaProps'>> & {
  id?: string;
  onClick?: () => void;
  /** Text shown on hover and on keyboard focus. Icon-only actions need it to be readable by sight. */
  tooltip?: string;
};
/**
 * An action needs an `icon`, a text `label`, or both. A text-only action should still get an
 * accessible name through `ariaProps.label` when its visible text isn't a full description.
 */
export type ActionButtonData = ActionButtonBase & ({
  icon: `wpp-icon-${string}`;
  label?: string;
} | {
  icon?: undefined;
  label: string;
});
export {};
