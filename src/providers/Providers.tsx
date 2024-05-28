'use client';

import { PropsWithChildren } from 'react';

import { NextUIProvider } from '@nextui-org/system';
import { SessionProvider } from 'next-auth/react';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </SessionProvider>
  );
}
