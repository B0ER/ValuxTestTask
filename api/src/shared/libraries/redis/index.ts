import * as config from '../../configs';
import { createClient } from 'redis';

export const redis = createClient({
  url: config.redis.url,
});

redis.on('connect', () => console.log('Redis Client is connected'));

redis.on('error', (err) => console.log('Redis Client Error', err));
