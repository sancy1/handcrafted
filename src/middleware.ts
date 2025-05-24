

// src/middleware.ts

// // src/middleware.ts
// import NextAuth from 'next-auth';
// import { authConfig } from './auth.config';

// export default NextAuth(authConfig).auth;

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|register|login).*)'],
// };




// // src/middleware.ts

// import NextAuth from 'next-auth';
// import { authConfig } from './auth.config';
// export default NextAuth(authConfig).auth;

// export const config = {
//   matcher: [
//     '/((?!api|_next/static|_next/image|.*\\.png$|register|login).*)',
//     '/dashboard/:path*'
//   ],
// };




// src/middleware.ts

import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico|login|register).*)'
  ]
};