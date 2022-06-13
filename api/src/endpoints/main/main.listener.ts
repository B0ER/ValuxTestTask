import { Ticket } from '../../shared/database';
import { redis } from '../../shared/libraries';


const argKey = (x: any) => x.toString() + ':' + typeof x;
const generateKey = (...args: any[]) => args.map(argKey).join('|');

const memoize = (fn: Function) => {
  const cache = Object.create(null);
  return (...args: any[]) => {
    const key = generateKey(args);
    const val = cache[key];
    if (val) return val;
    const res = fn(...args);
    cache[key] = res;
    return res;
  };
};

const fibonacci = (inputValue: number): number => (inputValue <= 2 ? 1 : fibonacci(inputValue - 1) + fibonacci(inputValue - 2));

const memoizeFibonacci = memoize(fibonacci);

const subscriber = redis.duplicate();
subscriber.on('connect', () => console.log('Redis Client[Subscriber] is connected'));

subscriber.on('error', (err) => console.log('Redis Client[Subscriber] Error', err));

subscriber.connect().then(async () => {
  await subscriber.pSubscribe('tickets.*', async (message) => {
    console.log('Subscriber: ');
    const messageObj: { ticket: number, inputValue: number } = JSON.parse(message);

    const ticketDoc = await Ticket.model.findOne({ ticket: messageObj.ticket });

    if (!ticketDoc) {
      return;
    }

    const calculatedValue = memoizeFibonacci(messageObj.inputValue);

    ticketDoc.outputValue = calculatedValue;

    await ticketDoc.save();
  });
});
