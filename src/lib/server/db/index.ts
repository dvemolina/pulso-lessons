import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '$env/dynamic/private';
import * as users from '$lib/server/db/schemas/users'
import * as normalized from '$lib/server/db/schemas/normalized'
import * as availability from '$lib/server/db/schemas/availability';
import * as lessons from '$lib/server/db/schemas/lessons';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
const client = postgres(env.DATABASE_URL);

export const db = drizzle(client, {schema: { ...users, ...normalized, ...availability, ...lessons }})
