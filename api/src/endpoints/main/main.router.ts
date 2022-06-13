import { FastifyPluginAsync } from 'fastify';
import * as ValidationSchema from './schemas';

export const register: FastifyPluginAsync = async (instance, reply) => {

  instance.post(
    '/input',
    {
      schema: ValidationSchema.inputSchema,
    },
    async (req, reply) => {

    });


  instance.get(
    '/output',
    {
      schema: ValidationSchema.outputSchema,
    },
    async (req, reply) => {

    });
}
