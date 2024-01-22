import React from 'react';

import styles from './styles.module.css';

type Props = {
  count: number;
}

export const ValueField = ({ count }: Props) => {
  return (
    <p
      className={styles.p}
      aria-valuenow={count}
    >
      {count}
    </p>
  );
};
