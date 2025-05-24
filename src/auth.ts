
// // src/auth.ts


// import NextAuth from 'next-auth';
// import Credentials from 'next-auth/providers/credentials';
// import { authConfig } from './auth.config';
// import { sql } from '@vercel/postgres';
// import { User, UserRole } from './lib/definitions';
// import bcrypt from 'bcryptjs';
// import { LoginFormSchema } from './lib/schemas';

// async function getUserByEmail(email: string): Promise<User | undefined> {
//   try {
//     const user = await sql<User>`SELECT * FROM users WHERE email=${email} LIMIT 1`;
//     return user.rows[0];
//   } catch (error) {
//     console.error('Failed to fetch user:', error);
//     throw new Error('Failed to fetch user.');
//   }
// }

// export const { auth, signIn, signOut } = NextAuth({
//   ...authConfig,
//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//   },
//   providers: [
//     Credentials({
//       name: 'Credentials',
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         try {
//           const parsedCredentials = LoginFormSchema.safeParse(credentials);
          
//           if (!parsedCredentials.success) {
//             return null;
//           }

//           const { email, password } = parsedCredentials.data;
//           const user = await getUserByEmail(email);
          
//           if (!user) {
//             return null;
//           }

//           const passwordsMatch = await bcrypt.compare(password, user.password);
//           if (!passwordsMatch) {
//             return null;
//           }

//           return {
//             id: user.id,
//             email: user.email,
//             name: user.name,
//             role: user.role
//           };
          
//         } catch (error) {
//           console.error('Authorization error:', error);
//           return null;
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string;
//         session.user.role = token.role as UserRole;
//       }
//       return session;
//     },
//     async redirect({ url, baseUrl }) {
//       // Allows relative callback URLs
//       if (url.startsWith("/")) return `${baseUrl}${url}`
//       // Allows callback URLs on the same origin
//       else if (new URL(url).origin === baseUrl) return url
//       return baseUrl
//     }
//   }
// });










// import NextAuth from 'next-auth';
// import Credentials from 'next-auth/providers/credentials';
// import { authConfig } from './auth.config';
// import { sql } from '@vercel/postgres';
// import { User, UserRole } from './lib/definitions';
// import bcrypt from 'bcryptjs';
// import { LoginFormSchema } from './lib/schemas';

// async function getUserByEmail(email: string): Promise<User | undefined> {
//   try {
//     const user = await sql<User>`SELECT * FROM users WHERE email=${email} LIMIT 1`;
//     return user.rows[0];
//   } catch (error) {
//     console.error('Failed to fetch user:', error);
//     throw new Error('Failed to fetch user.');
//   }
// }

// export const { auth, signIn, signOut } = NextAuth({
//   ...authConfig,
//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//   },
//   providers: [
//     Credentials({
//       name: 'Credentials',
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         try {
//           const parsedCredentials = LoginFormSchema.safeParse(credentials);
          
//           if (!parsedCredentials.success) {
//             return null;
//           }

//           const { email, password } = parsedCredentials.data;
//           const user = await getUserByEmail(email);
          
//           if (!user) {
//             return null;
//           }

//           const passwordsMatch = await bcrypt.compare(password, user.password);
//           if (!passwordsMatch) {
//             return null;
//           }

//           return {
//             id: user.id,
//             email: user.email,
//             name: user.name,
//             role: user.role
//           };
          
//         } catch (error) {
//           console.error('Authorization error:', error);
//           return null;
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.role = user.role;
//         token.name = user.name;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string;
//         session.user.role = token.role as UserRole;
//         session.user.name = token.name as string;
//       }
//       return session;
//     },
//     async redirect({ url, baseUrl }) {
//       if (url.startsWith("/")) return `${baseUrl}${url}`
//       else if (new URL(url).origin === baseUrl) return url
//       return baseUrl
//     }
//   }
// });










// src/auth.ts
// src/auth.ts
// import NextAuth from 'next-auth';
// import Credentials from 'next-auth/providers/credentials';
// import { authConfig } from './auth.config';
// import { sql } from '@vercel/postgres';
// import { User, UserRole } from './lib/definitions';
// import bcrypt from 'bcryptjs';
// import { LoginFormSchema } from './lib/schemas';

// async function getUser(email: string): Promise<User | undefined> {
//   try {
//     const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
//     return user.rows[0];
//   } catch (error) {
//     console.error('Failed to fetch user:', error);
//     throw new Error('Failed to fetch user.');
//   }
// }

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   ...authConfig,
//   trustHost: true, // Important for proper URL generation
//   secret: process.env.AUTH_SECRET,
//   session: { strategy: "jwt" },
//   providers: [
//     Credentials({
//       async authorize(credentials) {
//         const parsedCredentials = LoginFormSchema.safeParse(credentials);
//         if (parsedCredentials.success) {
//           const { email, password } = parsedCredentials.data;
//           const user = await getUser(email);
//           if (!user) return null;
//           const passwordsMatch = await bcrypt.compare(password, user.password);
//           if (passwordsMatch) {
//             return {
//               id: user.id,
//               name: user.name,
//               email: user.email,
//               role: user.role
//             };
//           }
//         }
//         return null;
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.name = user.name;
//         token.role = user.role as UserRole;
//         token.email = user.email;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string;
//         session.user.name = token.name as string;
//         session.user.role = token.role as UserRole;
//         session.user.email = token.email as string;
//       }
//       return session;
//     },
//   },
// });








// src/auth.ts
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { sql } from '@vercel/postgres';
import { User, UserRole } from './lib/definitions';
import bcrypt from 'bcryptjs';
import { LoginFormSchema } from './lib/schemas';

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  session: { 
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = LoginFormSchema.safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role
            };
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.role = user.role as UserRole;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.role = token.role as UserRole;
        session.user.email = token.email as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to dashboard after successful login
      if (url.startsWith('/login')) {
        return `${baseUrl}/dashboard`;
      }
      return url.startsWith('/') ? `${baseUrl}${url}` : url;
    }
  },
});