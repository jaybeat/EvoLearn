import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <>
      <Outlet />
      <Toaster
        position="top-center"
        theme="light"
        toastOptions={{
          style: {
            background: 'hsl(var(--color-surface))',
            color: 'hsl(var(--color-text-primary))',
            border: '1px solid hsl(var(--color-border))',
          },
        }}
      />
    </>
  );
}
