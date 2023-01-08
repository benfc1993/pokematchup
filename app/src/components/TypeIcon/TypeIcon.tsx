import React from 'react';

import styles from './TypeIcon.module.scss';

type TypeIconProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & {
  type: string;
  size?: 'xsmall' | 'small' | 'medium' | 'large';
};

export const TypeIcon: React.FC<TypeIconProps> = (props) => {
  const { type, size = 'medium', ...restProps } = props;

  return (
    <img
      {...restProps}
      src={`/assets/type-icons/${type}.png`}
      alt={type}
      className={`${styles['type-icon']} ${styles[`type-icon--${size}`]}`}
    />
  );
};
