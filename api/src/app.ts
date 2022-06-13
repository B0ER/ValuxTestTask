import Fastify from 'fastify';
import * as MainRouter from './endpoints/main/main.router';


async function main() {
  const fastifyInstance = await Fastify({
    logger: true,
  });

  await fastifyInstance.register(MainRouter.register);


  // Run the server!
  fastifyInstance.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
    if (err) {
      console.error(err);

      fastifyInstance.log.error(err);
      process.exit(1);
    }

    console.log(fastifyInstance.printRoutes());
  });
}

main().catch(err => console.error(err));

process.on('unhandledRejection', (error) => {
  console.error(error, 'unhandledRejection');
});

process.on('uncaughtException', (error) => {
  console.error(error, 'uncaughtException');
});