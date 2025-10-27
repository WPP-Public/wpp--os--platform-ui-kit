import { ButtonState } from '../../types';
import { ToastIcon } from '../../types';
export interface ToastState {
  message: string;
  type?: 'warning' | 'error' | 'information' | 'success';
  header?: string;
  duration?: number;
  icon?: ToastIcon;
  maxMessageLines?: number;
  primaryBtn?: ButtonState;
  secondaryBtn?: ButtonState;
}
