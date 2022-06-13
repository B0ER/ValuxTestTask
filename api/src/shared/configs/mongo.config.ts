// here is better to check env and throw error if not correct
export const mongo = {
  connectionLink: String(process.env.MONGO_CONNECTION_LINK),
  collection: String(process.env.MONGO_COLLECTION),
  authCollection: process.env.MONGO_AUTH_COLLECTION ? String(process.env.MONGO_AUTH_COLLECTION) : 'admin',
};
