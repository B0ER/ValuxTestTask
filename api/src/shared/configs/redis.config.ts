export const redis = {
  // here is better to check env
  url: String(process.env.REDIS_URL) || 'redis://redis:6379',
};
