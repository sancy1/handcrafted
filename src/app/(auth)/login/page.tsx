

// src/app/(auth)/login/page.tsx

'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { login } from '../../../lib/actions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export default function LoginPage() {
  const [state, formAction] = useActionState(login, {
    errors: {},
    message: null,
    success: false,
    redirectUrl: '/dashboard'
  });
  const router = useRouter();

  useEffect(() => {
    if (state?.success && state.redirectUrl) {
      router.push(state.redirectUrl);
    }
  }, [state, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md my-8">
        <h1 className="text-2xl font-bold text-amber-900 mb-6">Login</h1>
        {state?.message && !state.success && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {state.message}
          </div>
        )}
        <form action={formAction} className="space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-amber-900">
              Email
            </label>
            <div className="relative mt-1">
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full rounded-md border border-amber-200 py-2 pl-10 shadow-sm focus:border-amber-500 focus:ring-amber-500 bg-amber-50"
              />
              <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-500" />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-amber-900">
              Password
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full rounded-md border border-amber-200 py-2 pl-10 shadow-sm focus:border-amber-500 focus:ring-amber-500 bg-amber-50"
              />
              <LockClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-500" />
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input
              id="remember"
              name="remember"
              type="checkbox"
              className="h-4 w-4 rounded border-amber-300 text-amber-600 focus:ring-amber-500"
            />
            <label htmlFor="remember" className="ml-2 block text-sm text-amber-900">
              Remember me
            </label>
          </div>

          {/* Submit Button */}
          <LoginButton />
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-amber-800">
            Don't have an account?{' '}
            <Link href="/register" className="text-amber-600 hover:underline">
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
      className="w-full rounded-md bg-amber-600 py-2 px-4 text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50"
      disabled={pending}
    >
      {pending ? 'Logging in...' : 'Login'}
    </button>
  );
}