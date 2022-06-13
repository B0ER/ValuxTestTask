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

const fibonacci = async (inputValue: number): Promise<number> => {
  if (inputValue <= 2) {
    return 1;
  }

  const left = await new Promise<number>((res, rej) => { setImmediate(() => { res(memoizeFibonacci(inputValue - 1)); }) });
  const right = await new Promise<number>((res, rej) => { setImmediate(() => { res(memoizeFibonacci(inputValue - 2)); }) });

  return left + right;
};

const memoizeFibonacci = memoize(fibonacci);

const subscriber = redis.duplicate();
subscriber.on('connect', () => console.log('Redis Client[Subscriber] is connected'));

subscriber.on('error', (err) => console.log('Redis Client[Subscriber] Error', err));

subscriber.connect().then(async () => {
  await subscriber.pSubscribe('tickets.*', async (message) => {
    console.log('Subscriber Started');
    const messageObj: { ticket: number, inputValue: number } = JSON.parse(message);

    const ticketDoc = await Ticket.model.findOne({ ticket: messageObj.ticket });

    if (!ticketDoc) {
      return;
    }

    const calculatedValue = await memoizeFibonacci(messageObj.inputValue);

    ticketDoc.outputValue = calculatedValue;

    await ticketDoc.save();
    console.log('Subscriber Finished');
  });
});
