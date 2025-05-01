import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from './routes.ts';
import { SliceContext } from './slice/sliceContext.tsx';
import { slices } from './slice/slice.ts';
import './main.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SliceContext slices={slices}>
      <RouterProvider router={router} />
    </SliceContext>
  </StrictMode>
);
