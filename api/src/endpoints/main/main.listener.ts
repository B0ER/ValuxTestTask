import { redis } from '../../shared/libraries';

const subscriber = redis.duplicate();

console.log('INIT HEEEERE!');

subscriber.connect().then(async () => {
  console.log('INIT HEEEERE!');
  await subscriber.subscribe('tickets.*', (message) => {
    console.log('HEEEERE!');
    console.log(message);
  });
});
