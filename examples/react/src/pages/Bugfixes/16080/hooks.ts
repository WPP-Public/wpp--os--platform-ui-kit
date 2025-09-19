import { useState } from 'react'

export const useMovingPlacesList = (
  initialList = ['10', '11', '12', '13', '14', '15', '16', '17', '18'],
): [string[], () => void] => {
  const [list, setList] = useState(initialList)
  const movePlaces = () =>
    setList(list => {
      const first = list.at(0)!
      const moved = list.at(6)!

      return [first, moved, ...list.slice(1, 6), ...list.slice(7)]
    })

  return [list, movePlaces]
}
