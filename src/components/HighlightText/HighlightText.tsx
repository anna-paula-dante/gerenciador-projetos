import { Fragment } from 'react'
import { getHighlightSegments } from '../../utils/highlight'
import styles from './HighlightText.module.css'

interface HighlightTextProps {
  text: string
  query?: string
}

export function HighlightText({ text, query }: HighlightTextProps) {
  if (!query) return <>{text}</>

  const segments = getHighlightSegments(text, query)

  return (
    <>
      {segments.map((segment, index) => (
        <Fragment key={index}>
          {segment.highlighted ? (
            <mark className={styles.mark}>{segment.text}</mark>
          ) : (
            segment.text
          )}
        </Fragment>
      ))}
    </>
  )
}
