

// src/auth.config.ts


// import type { NextAuthConfig } from 'next-auth';

// export const authConfig = {
//   pages: {
//     signIn: '/login',
//   },
//   callbacks: {
//     authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user;
//       const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      
//       if (isOnDashboard) {
//         if (isLoggedIn) return true;
//         return false; // Redirect unauthenticated users to login page
//       } else if (isLoggedIn) {
//         return Response.redirect(new URL('/dashboard', nextUrl));
//       }
//       return true;
//     },
//   },
//   providers: [], // Add providers with an empty array for now
// } satisfies NextAuthConfig;






// // src/auth.config.ts
// import type { NextAuthConfig } from 'next-auth';

// export const authConfig: NextAuthConfig = {
//   pages: {
//     signIn: '/login',
//     newUser: '/register'
//   },
//   callbacks: {
//     authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user;
//       const isAuthPage = 
//         nextUrl.pathname.startsWith('/login') || 
//         nextUrl.pathname.startsWith('/register');
      
//       if (isAuthPage && isLoggedIn) {
//         return Response.redirect(new URL('/dashboard', nextUrl));
//       }
//       return true;
//     },
//   },
//   providers: [], // Add your providers here
// };











// src/auth.config.ts

import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
    error: '/login'
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAuthPage = 
        nextUrl.pathname.startsWith('/login') || 
        nextUrl.pathname.startsWith('/register');
      
      if (isAuthPage && isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      
      // Protect dashboard routes
      if (nextUrl.pathname.startsWith('/dashboard') && !isLoggedIn) {
        return Response.redirect(new URL('/login', nextUrl));
      }
      
      return true;
    },
  },
  providers: [],
};

