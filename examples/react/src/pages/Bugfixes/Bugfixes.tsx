import { useState, useEffect, Suspense } from 'react'
import { useParams } from 'react-router-dom'

import styles from './Bugfixes.module.scss'

export const BugfixesPage = () => {
  const { ticket } = useParams()

  const [DynamicComponent, setDynamicComponent] = useState('a')

  useEffect(() => {
    import(`./${ticket}`)
      .then(module => setDynamicComponent(() => module.default))
      .catch(error => {
        console.error(`Error loading component: ${error.message}`)
      })
  }, [ticket])

  return (
    <div>
      <h1>
        <a href={`https://jira.uhub.biz/browse/WPPLONOP-${ticket}`} target="_blank">
          TICKET: #{ticket}
        </a>
      </h1>
      <div className={styles.content}>
        <Suspense fallback={<div>Loading...</div>}>{DynamicComponent ? <DynamicComponent /> : null}</Suspense>
      </div>
    </div>
  )
}
