import { StepCountriesConfigType, CitiesType } from './types'

export const countries: StepCountriesConfigType[] = [
  {
    label: 'Ukraine',
    id: '1',
  },
  {
    label: 'United Kingdom',
    id: '2',
  },
  {
    label: 'Poland',
    id: '3',
  },
  {
    label: 'Lithuania',
    id: '4',
  },
]

export const cities: CitiesType = {
  1: [
    {
      label: 'Kyiv',
      id: '1-1',
    },
    {
      label: 'Dnipro',
      id: '1-2',
    },
    {
      label: 'Kharkiv',
      id: '1-3',
    },
    {
      label: 'Melitopol',
      id: '1-4',
    },
    {
      label: 'Lviv',
      id: '1-5',
    },
  ],
  2: [
    {
      label: 'London',
      id: '2-1',
    },
    {
      label: 'Liverpool',
      id: '2-2',
    },
    {
      label: 'Manchester',
      id: '2-3',
    },
    {
      label: 'Oxford',
      id: '2-4',
    },
    {
      label: 'Sheffield',
      id: '2-5',
    },
  ],
  3: [
    {
      label: 'Warszawa',
      id: '3-1',
    },
    {
      label: 'Krakow',
      id: '3-2',
    },
    {
      label: 'Wroclaw',
      id: '3-3',
    },
    {
      label: 'Gdansk',
      id: '3-4',
    },
    {
      label: 'Lublin',
      id: '3-5',
    },
  ],
  4: [
    {
      label: 'Vilnius',
      id: '4-1',
    },
    {
      label: 'Kaunas',
      id: '4-2',
    },
    {
      label: 'Klaipeda',
      id: '4-3',
    },
    {
      label: 'Palanga',
      id: '4-4',
    },
    {
      label: 'Trakai',
      id: '4-5',
    },
  ],
}
