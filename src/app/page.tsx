'use client'
import { ValueField } from '@/components/ValueField';

import { useLocalStorage } from '@/hooks/useLocalStorage';

import styles from "./page.module.css";

export default function Home() {
  const [count, setCount] = useLocalStorage('count', 0)

  return (
    <main className={styles.main}>
      <ValueField count={count} />
      <div className={styles.wrapper}>
        <button
          onClick={() => setCount(prev => prev + 1)}
          className={styles.btn}
        >
          +
        </button>
        <button
          onClick={() => setCount(prev => prev - 1)}
          className={styles.btn}
        >
          -
        </button>
      </div>
    </main>
  );
}
