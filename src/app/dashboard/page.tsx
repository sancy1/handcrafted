

// src/app/dashboard/page.tsx
'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import WelcomeMessage from '../../components/dashboard/WelcomeMessage';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div className="p-6">Loading session...</div>;
  }

  if (status !== 'authenticated') {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {session?.user && (
        <WelcomeMessage 
          name={session.user.name || 'User'} 
          role={session.user.role} 
        />
      )}
    </div>
  );
}






// src/app/dashboard/page.tsx
// import { auth } from '../../auth';
// import UserDropdown from '../../components/auth/user-dropdown';
// import LoginButton from '../../components/auth/login-button';

// export default async function Dashboard() {
//   const session = await auth();

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Dashboard</h1>
//         <nav>
//           {session?.user ? (
//             <UserDropdown name={session.user.name || 'User'} />
//           ) : (
//             <LoginButton />
//           )}
//         </nav>
//       </div>
//       <p>Welcome to your dashboard!</p>
//     </div>
//   );
// }



// src/app/dashboard/page.tsx
// import { auth } from '../../auth';
// import UserDropdown from '../../components/auth/user-dropdown';
// import LoginButton from '../../components/auth/login-button';

// export default async function Dashboard() {
//   const session = await auth();

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Dashboard</h1>
//         <nav>
//           {session?.user ? (
//             <UserDropdown name={session.user.name || 'User'} />
//           ) : (
//             <LoginButton />
//           )}
//         </nav>
//       </div>
//       <p>Welcome to your dashboard!</p>
//     </div>
//   );
// }



// src/app/dashboard/page.tsx
// import { auth } from '../../auth';
// import UserDropdown from '../../components/auth/user-dropdown';
// import LoginButton from '../../components/auth/login-button';

// export default async function Dashboard() {
//   const session = await auth();

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Dashboard</h1>
//         <nav>
//           {session?.user ? (
//             <UserDropdown name={session.user.name || 'User'} />
//           ) : (
//             <LoginButton />
//           )}
//         </nav>
//       </div>
//       <p>Welcome to your dashboard!</p>
//     </div>
//   );
// }