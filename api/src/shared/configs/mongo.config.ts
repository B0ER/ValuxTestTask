// here is better to check env
export const mongo = {
  connectionLink: String(process.env.MONGO_CONNECTION_LINK),
  collection: String(process.env.MONGO_COLLECTION),
  authCollection: String(process.env.MONGO_AUTH_COLLECTION) || 'admin',
};
