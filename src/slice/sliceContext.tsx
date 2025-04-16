import { map, reduce } from 'lodash';
import { cloneElement, createElement, FunctionComponent, ReactNode } from 'react';

type sliceType = {
  slices: FunctionComponent[];
  children: ReactNode;
};

export function SliceContext({ slices, children }: sliceType) {
  return (
    <>
      {reduce(
        map(slices, (s: FunctionComponent) => createElement(s)),
        (prev, next) => cloneElement(next, {}, prev),
        <>{children}</>
      )}
    </>
  );
}
