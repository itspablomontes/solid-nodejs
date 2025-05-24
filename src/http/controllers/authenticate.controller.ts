import { FastifyReply, FastifyRequest } from "fastify";
import { AuthenticateService } from "../services/authenticate.service";
import { z } from "zod";
import { PrismaUsersRepository } from "../repositories/prisma/prisma.users.repository";
import { InvalidCredentialsError } from "../errors/invalid.credentials";

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
    const usersRepository = new PrismaUsersRepository();
    const authenticateService = new AuthenticateService(usersRepository);

    await authenticateService.execute({ email, password });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send();
    }
    throw Error;
  }

  return reply.status(200).send();
};
