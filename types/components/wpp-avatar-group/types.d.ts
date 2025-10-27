export interface AvatarState {
  name: string;
  src?: string;
  color?: string;
  interactable?: boolean;
}
export interface UserState {
  name: string;
  src?: string;
  color?: string;
}
export interface AvatarChangeEventDetail {
  value: HTMLWppAvatarElement;
}
export interface AvatarGroupChangeEventDetail {
  value: HTMLWppAvatarElement | HTMLWppListItemElement;
  avatarIndex: number;
  fromDropdown: boolean;
}
export type AvatarSize = 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl' | '3xl' | '4xl';
export type AvatarVariant = 'square' | 'circle';
