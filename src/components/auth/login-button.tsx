
// src/components/auth/login-button.tsx


'use client';

import Link from 'next/link';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

export default function LoginButton() {
  return (
    <Link
      href="/login"
      className="flex items-center gap-2 bg-[#B55B3D] hover:bg-[#9E4F37] p-2 rounded transition-colors text-white"
    >
      <ArrowRightOnRectangleIcon className="h-6 w-6" />
      <span>Login</span>
    </Link>
  );
}