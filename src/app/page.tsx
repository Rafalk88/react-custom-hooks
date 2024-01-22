'use client'
import { ValueField } from '@/components/ValueField';

import { useLocalStorage } from '@/hooks/useLocalStorage';

import styles from "./page.module.css";

export default function Home() {
  const { storedValue, setValue } = useLocalStorage('count', 0)

  return (
    <main className={styles.main}>
      <ValueField count={storedValue} />)
      <div className={styles.wrapper}>
        <button
          onClick={() => setValue(prev => prev + 1)}
          className={styles.btn}
        >
          +
        </button>
        <button
          onClick={() => setValue(prev => prev - 1)}
          className={styles.btn}
        >
          -
        </button>
      </div>
    </main>
  );
}
