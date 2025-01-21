import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://mydb_owner:npg_4OmJG6LpVHBX@ep-long-base-a539ukk6.us-east-2.aws.neon.tech/mydb?sslmode=require',
  },
});
