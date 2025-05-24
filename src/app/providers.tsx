

// src/app/providers.tsx

'use client';

import { SessionProvider } from 'next-auth/react';

export function Providers({ 
  children,
  session
}: { 
  children: React.ReactNode;
  session?: any; // Make session optional
}) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}