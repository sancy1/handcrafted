

// // src/app/providers.tsx

// 'use client';

// import { SessionProvider } from 'next-auth/react';

// export function Providers({ 
//   children,
//   session
// }: { 
//   children: React.ReactNode;
//   session?: any; // Make session optional
// }) {
//   return (
//     <SessionProvider session={session}>
//       {children}
//     </SessionProvider>
//   );
// }








// src/app/providers.tsx

'use client';

import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

export function Providers({ 
  children,
  session
}: { 
  children: React.ReactNode;
  // session?: any;
  session?: Session | null;
}) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}