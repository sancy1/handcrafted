

// // src/components/layout/header.tsx

// // src/components/layout/header.tsx
// 'use client';

// import UserDropdown from '../../components/auth/user-dropdown';
// import LoginButton from '../../components/auth/login-button';
// import { useSession } from 'next-auth/react';

// export default function Header() {
//   const { data: session } = useSession();

//   return (
//     <header className="bg-amber-800 text-amber-50 p-4 shadow-md flex justify-between items-center">
//       <h1 className="text-2xl font-serif font-bold">Handcrafted Haven</h1>
//       <nav>
//         {session?.user ? (
//           <UserDropdown name={session.user.name || 'User'} />
//         ) : (
//           <LoginButton />
//         )}
//       </nav>
//     </header>
//   );
// }









// src/components/layout/header.tsx

'use client';

import UserDropdown from '../auth/user-dropdown';
import LoginButton from '../auth/login-button';
import { useSession } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();

  return (
    <nav>
      {session?.user ? (
        <UserDropdown name={session.user.name || 'User'} />
      ) : (
        <LoginButton />
      )}
    </nav>
  );
}