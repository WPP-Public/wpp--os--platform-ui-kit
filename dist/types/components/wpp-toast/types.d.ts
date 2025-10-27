export interface ButtonState {
  label: string;
  variant: 'primary' | 'secondary' | 'inverted';
  disabled?: boolean;
  loading?: boolean;
  onClick: (index: string) => void;
}
export interface ToastCompleteDetail {
  currentIndex: string;
}
export type ToastIcon = {
  name: string;
  styles?: Record<string, string>;
} | {
  url: string;
  styles?: Record<string, string>;
};
