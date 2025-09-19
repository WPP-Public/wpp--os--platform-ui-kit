import React, { useEffect, useState } from 'react'
import { WppAutocomplete, WppListItem } from '@platform-ui-kit/components-library-react'
import { AutocompleteDefaultOption } from '@platform-ui-kit/components-library'

import { MovieOption, movieOptions } from '../options'

import { ResultsView } from '../ResultsView'
import { SelectedValues } from '../SelectedValues'

import styles from '../Autocomplete.module.scss'

const MovieOptionView = ({ option }: { option: MovieOption }) => (
  <WppListItem disabled={option.unavailable} value={option}>
    <p slot="label">
      {option.unavailable && <span className={styles.unavailable}>(Sold out) </span>}
      {option.label} <span className={styles.year}>({option.year})</span>{' '}
      <span className={styles.rating}>⭐ {option.rating.toFixed(1)}</span>
    </p>
  </WppListItem>
)

export const ServerSearch = () => {
  const [serverDataValue, setServerDataValue] = useState<AutocompleteDefaultOption[]>([])

  const [isGettingInitialMoviesValue, setIsGettingInitialMoviesValue] = useState(true)
  const [isSearchingMovies, setIsSearchingMovies] = useState(true)
  const [movieSearchValue, setMovieSearchValue] = useState('')
  const [movieSearchResult, setMovieSearchResult] = useState<MovieOption[]>([])

  const movieSearchValueTrimmed = movieSearchValue.trim()
  const moviesLoadingNote = isGettingInitialMoviesValue ? '(Loading initial values) ' : ''

  // Load initial server value
  useEffect(() => {
    setTimeout(() => {
      setServerDataValue([
        {
          id: 'tt2948356',
          label: 'Zootopia',
          year: 2016,
          rating: 8,
          unavailable: false,
        },
        {
          id: 'tt0107290',
          label: 'Jurassic Park',
          year: 1993,
          rating: 8.2,
          unavailable: false,
        },
        {
          id: 'tt1074638',
          label: 'Skyfall',
          year: 2012,
          rating: 7.8,
          unavailable: true,
        },
      ])
      setIsGettingInitialMoviesValue(false)
    }, 2000)
  }, [])

  // Load movie options based on search
  useEffect(() => {
    setIsSearchingMovies(true)

    const timeout = 700 + Math.round(Math.random() * 1300)
    const timer = setTimeout(() => {
      setMovieSearchResult(
        movieOptions
          .filter(option => {
            const searchValue = movieSearchValueTrimmed.toLocaleLowerCase()

            return option.label.toLocaleLowerCase().includes(searchValue) || String(option.year).includes(searchValue)
          })
          .sort((a, b) => (a.label.toLocaleLowerCase() > b.label.toLocaleLowerCase() ? 1 : -1)),
      )
      setIsSearchingMovies(false)
    }, timeout)

    return () => clearTimeout(timer)
  }, [movieSearchValueTrimmed])

  return (
    <div className={styles.item}>
      <WppAutocomplete
        required
        loading={isSearchingMovies}
        disabled={isGettingInitialMoviesValue}
        name="server-data"
        labelConfig={{
          text: `${moviesLoadingNote}Server search with lots of customization (max 5 selected items)`,
        }}
        placeholder="Select movies"
        value={serverDataValue}
        onWppSearchValueChange={(e: CustomEvent) => setMovieSearchValue(e.detail)}
        onWppChange={(e: CustomEvent) => setServerDataValue(e.detail.value as any)}
        limitSelectedItems={5}
        multiple
        showCreateNewElement
        simpleSearch
      >
        {movieSearchResult.map(option => (
          <MovieOptionView key={option.id} option={option} />
        ))}
        <SelectedValues
          values={serverDataValue}
          onCloseClick={value => setServerDataValue(serverDataValue.filter(i => i.id !== value))}
        />
      </WppAutocomplete>

      <ResultsView value={serverDataValue.map(item => item.id)} />
    </div>
  )
}
