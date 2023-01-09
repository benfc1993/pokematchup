import { Children, useCallback, useEffect, useState } from 'react';
import styles from './CardFlip.module.scss';

interface CardFlipProps {
  children: React.ReactNode;
  subscribe: (sub: () => void) => () => void;
}

export const CardFlip: React.FC<CardFlipProps> = (props) => {
  const { children, subscribe } = props;
  const [flip, setFlipCard] = useState<boolean>();

  const handleFlip = useCallback(() => {
    setFlipCard((state) => !state);
  }, []);

  useEffect(() => {
    return subscribe(() => handleFlip());
  }, [subscribe, handleFlip]);

  const arrayChildren = Children.toArray(children);
  return (
    <div className={styles['flip-card']}>
      <div
        className={`${styles['flip-card-inner']} ${flip && styles['active']}`}
      >
        <div className={styles['flip-card-front']}>{arrayChildren[0]}</div>
        <div className={styles['flip-card-back']}>{arrayChildren[1]}</div>
      </div>
    </div>
  );
};
