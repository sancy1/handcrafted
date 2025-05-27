

// // src/app/(auth)/login/page.tsx

// 'use client';

// import { useActionState } from 'react';
// import { useFormStatus } from 'react-dom';
// import { login } from '../../../lib/actions';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';
// import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
// import { useSession } from 'next-auth/react';


// export default function LoginPage() {
//   const [state, formAction] = useActionState(login, {
//     errors: {},
//     message: null,
//     success: false,
//     redirectUrl: '/dashboard'
//   });
//   const router = useRouter();
//   const { status } = useSession();

//   useEffect(() => {
//     if (status === 'authenticated') {
//       // Force a hard redirect to ensure full page load
//       window.location.href = '/dashboard';
//     }
//   }, [status]);

//   useEffect(() => {
//     if (state?.success && state.redirectUrl) {
//       // Use window.location for initial login to ensure full page load
//       window.location.href = state.redirectUrl;
//     }
//   }, [state]);

//   if (status === 'authenticated') {
//     return null; // Will redirect immediately
//   }

// return (
//     <div className="min-h-screen flex items-center justify-center bg-[#F9F4EF]">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md my-8 border border-[#E6E1DC]"> 
//         <h1 className="text-2xl font-bold text-[#3E3E3E] mb-6 font-serif"> 
//           Login
//         </h1>
//         {state?.message && !state.success && (
//           <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md"> 
//             {state.message}
//           </div>
//         )}
//         <form action={formAction} className="space-y-4">
//           {/* Email Field */}
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-[#3E3E3E]"> 
//               Email
//             </label>
//             <div className="relative mt-1">
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 required
//                 className="block w-full rounded-md border border-[#E6E1DC] py-2 pl-10 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white" 
//               />
//               <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6C6C6C]" /> 
//             </div>
//           </div>

//           {/* Password Field */}
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-[#3E3E3E]"> 
//               Password
//             </label>
//             <div className="relative mt-1">
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 className="block w-full rounded-md border border-[#E6E1DC] py-2 pl-10 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white" 
//               />
//               <LockClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6C6C6C]" /> 
//             </div>
//           </div>

//           {/* Remember Me */}
//           <div className="flex items-center">
//             <input
//               id="remember"
//               name="remember"
//               type="checkbox"
//               className="h-4 w-4 rounded border-[#E6E1DC] text-[#B55B3D] focus:ring-[#B55B3D]" 
//             />
//             <label htmlFor="remember" className="ml-2 block text-sm text-[#3E3E3E]"> 
//               Remember me
//             </label>
//           </div>

//           {/* Submit Button */}
//           <LoginButton />
//         </form>

//         <div className="mt-4 text-center">
//           <p className="text-sm text-[#3E3E3E]"> 
//             Don't have an account?{' '}
//             <Link href="/register" className="text-[#B55B3D] hover:underline"> 
//               Register
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// function LoginButton() {
//   const { pending } = useFormStatus();
  
//   return (
//     <button
//       type="submit"
//       className="w-full rounded-md bg-[#B55B3D] py-2 px-4 text-white hover:bg-[#9E4F37] focus:outline-none focus:ring-2 focus:ring-[#B55B3D] focus:ring-offset-2 disabled:opacity-50" 
//       disabled={pending}
//     >
//       {pending ? 'Logging in...' : 'Login'}
//     </button>
//   );
// }












// src/app/(auth)/login/page.tsx

'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { login } from '../../../lib/actions';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';


export default function LoginPage() {
  const [state, formAction] = useActionState(login, {
    errors: {},
    message: null,
    success: false,
    redirectUrl: '/dashboard'
  });
  // const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      // Force a hard redirect to ensure full page load
      window.location.href = '/dashboard';
    }
  }, [status]);

  useEffect(() => {
    if (state?.success && state.redirectUrl) {
      // Use window.location for initial login to ensure full page load
      window.location.href = state.redirectUrl;
    }
  }, [state]);

  if (status === 'authenticated') {
    return null; // Will redirect immediately
  }

return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F4EF]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md my-8 border border-[#E6E1DC]"> 
        <h1 className="text-2xl font-bold text-[#3E3E3E] mb-6 font-serif"> 
          Login
        </h1>
        {state?.message && !state.success && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md"> 
            {state.message}
          </div>
        )}
        <form action={formAction} className="space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#3E3E3E]"> 
              Email
            </label>
            <div className="relative mt-1">
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full rounded-md border border-[#E6E1DC] py-2 pl-10 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white" 
              />
              <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6C6C6C]" /> 
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#3E3E3E]"> 
              Password
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full rounded-md border border-[#E6E1DC] py-2 pl-10 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white" 
              />
              <LockClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6C6C6C]" /> 
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input
              id="remember"
              name="remember"
              type="checkbox"
              className="h-4 w-4 rounded border-[#E6E1DC] text-[#B55B3D] focus:ring-[#B55B3D]" 
            />
            <label htmlFor="remember" className="ml-2 block text-sm text-[#3E3E3E]"> 
              Remember me
            </label>
          </div>

          {/* Submit Button */}
          <LoginButton />
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-[#3E3E3E]"> 
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-[#B55B3D] hover:underline"> 
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      className="w-full rounded-md bg-[#B55B3D] py-2 px-4 text-white hover:bg-[#9E4F37] focus:outline-none focus:ring-2 focus:ring-[#B55B3D] focus:ring-offset-2 disabled:opacity-50" 
      disabled={pending}
    >
      {pending ? 'Logging in...' : 'Login'}
    </button>
  );
}