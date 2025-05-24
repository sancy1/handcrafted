
// src/components/auth/login-button.tsx

'use client';

import Link from 'next/link';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

export default function LoginButton() {
  return (
    <Link
      href="/login"
      className="flex items-center gap-2 hover:bg-amber-700 p-2 rounded transition-colors"
    >
      <ArrowRightOnRectangleIcon className="h-6 w-6 text-amber-50" />
      <span className="text-amber-50">Login</span>
    </Link>
  );
}