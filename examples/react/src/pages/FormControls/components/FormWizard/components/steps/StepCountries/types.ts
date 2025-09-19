export interface StepCountriesConfigType {
  label: string
  id: string
}

export type CitiesType = Record<string, StepCountriesConfigType[]>

export interface FormValues {
  cities: string
  countries: string
}
