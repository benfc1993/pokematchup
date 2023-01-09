import React, { ReactNode } from 'react';
import { ScrollToPoint } from '../App';

export const Page: React.FC<{ children: ReactNode }> = (props: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <ScrollToPoint />
      {props.children}
    </>
  );
};
