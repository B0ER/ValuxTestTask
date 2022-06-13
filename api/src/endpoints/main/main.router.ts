import { FastifyPluginAsync } from 'fastify';
import { MainService } from './main.service';
import * as ValidationSchema from './schemas';

export const register: FastifyPluginAsync = async (instance, reply) => {
  const mainService = new MainService();

  instance.post<{ Body: ValidationSchema.inputSchema['body'] }>(
    '/input',
    {
      schema: ValidationSchema.inputSchema,
    },
    async (req, reply) => {
      const { number } = req.body;
      const response = await mainService.Input(number);
      return response;
    });


  instance.get<{ Querystring: ValidationSchema.outputSchema['querystring'] }>(
    '/output',
    {
      schema: ValidationSchema.outputSchema,
    },
    async (req, reply) => {
      const { ticket } = req.query;
      const response = await mainService.Output(ticket);
      return response;
    });
}
