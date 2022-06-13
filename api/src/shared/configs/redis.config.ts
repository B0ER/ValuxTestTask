export const redis = {
  // here is better to check env
  url: process.env.REDIS_URL ? String(process.env.REDIS_URL) : 'redis://redis:6379',
};
