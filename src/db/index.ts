import { createClient } from '@libsql/client/ws';
import { drizzle } from 'drizzle-orm/libsql/ws';
import * as schema from './schema';

const client = createClient({
    url: process.env.DATABASE_URL,
    authToken: process.env.DATABASE_AUTH_TOKEN
    });

const db = drizzle(client,{schema});
