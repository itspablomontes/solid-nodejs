import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { InvalidCredentialsError } from "../errors/invalid.credentials";
import { makeAuthenticateService } from "../services/factories/make.authenticate.service";

export const authenticate = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const authenticateRequestSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  const { email, password } = authenticateRequestSchema.parse(request.body);

  try {
    const authenticateService = makeAuthenticateService();

    await authenticateService.execute({ email, password });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send();
    }
    throw Error;
  }

  return reply.status(200).send();
};
