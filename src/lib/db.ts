

// src/lib/db.ts


import postgres from 'postgres';
import { User, UserInput } from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function createUser(userInput: UserInput): Promise<User> {
  const now = new Date();
  const result = await sql<User[]>`
    INSERT INTO users (
      name, 
      email, 
      password, 
      role,
      email_verified,
      verification_token,
      reset_token,
      reset_token_expires,
      created_at,
      updated_at
    ) VALUES (
      ${userInput.name}, 
      ${userInput.email}, 
      ${userInput.password}, 
      ${userInput.role},
      ${userInput.email_verified ?? false},
      ${userInput.verification_token ?? null},
      ${userInput.reset_token ?? null},
      ${userInput.reset_token_expires ?? null},
      ${userInput.created_at ?? now},
      ${userInput.updated_at ?? now}
    ) RETURNING *
  `;
  return result[0];
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const result = await sql<User[]>`
      SELECT * FROM users WHERE email = ${email} LIMIT 1
    `;
    return result[0] || null;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}