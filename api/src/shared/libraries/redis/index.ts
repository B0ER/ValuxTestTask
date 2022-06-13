import * as config from '../../configs';
import { createClient } from 'redis';

export const redisClient = createClient({
  url: config.redis.url,
});
