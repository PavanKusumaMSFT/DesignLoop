'use client'

import Link from 'next/link'
import { makeStyles, tokens, Button, Text } from '@fluentui/react-components'

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "400px",
    padding: "24px",
    textAlign: "center",
  },
  title: {
    fontSize: "20px",
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: "16px",
  },
  message: {
    color: tokens.colorNeutralForeground3,
    marginBottom: "24px",
  },
})

export default function NotFound() {
  const styles = useStyles()

  return (
    <div className={styles.container}>
      <Text className={styles.title}>Page Not Found</Text>
      <Text className={styles.message}>
        The page you are looking for does not exist or has been moved.
      </Text>
      <Link href="/">
        <Button appearance="outline">
          Return to Home
        </Button>
      </Link>
    </div>
  )
}
