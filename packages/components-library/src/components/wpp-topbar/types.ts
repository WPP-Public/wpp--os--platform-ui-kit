export interface NavigationState {
  label?: string
  value: string
  path?: string | undefined
  active?: boolean
  children?: NavigationState[]
  chevronOnly?: boolean
}

export interface NavigationItemEventDetail {
  value: string
  path?: string
  label?: string
}

export type TopbarChangeEventDetail = NavigationItemEventDetail
