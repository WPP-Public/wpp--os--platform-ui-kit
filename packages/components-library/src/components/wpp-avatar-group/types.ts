export interface AvatarState {
  name: string
  src?: string
  color?: string
  interactable?: boolean
}

// deprecated interface will be deleted in version 3.0.0
export interface UserState {
  name: string
  src?: string
  color?: string
}

export interface AvatarChangeEventDetail {
  value: HTMLWppAvatarElement
}

export interface AvatarGroupChangeEventDetail {
  value: HTMLWppAvatarElement | HTMLWppListItemElement
  avatarIndex: number
  fromDropdown: boolean
}

export type AvatarSize = 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl'

export type AvatarVariant = 'square' | 'circle'
