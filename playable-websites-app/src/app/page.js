'use client'
import styles from './page.module.css'
import MainCanvas from './three/mainCanvas'

export default function Home() {
  return (
    <>
    {/*<main className={styles.main}>*/}
    <main>
      <MainCanvas />
    </main>
    </>
  )
}
