import { drizzle } from 'drizzle-orm/neon-http';

export const db = drizzle('postgresql://mydb_owner:npg_4OmJG6LpVHBX@ep-long-base-a539ukk6.us-east-2.aws.neon.tech/mydb?sslmode=require');
