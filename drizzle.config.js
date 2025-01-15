 /** @type {import{"drizzle-kit"}.Config} */
export default {
  schema: "./configs/schema.js",
//   out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:EoNhA1zKg2CF@ep-silent-cake-a58dkl9h.us-east-2.aws.neon.tech/visioncraft?sslmode=require'
  }
};
