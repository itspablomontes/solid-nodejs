import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { RegisterService } from "../services/register.service";
import { PrismaUsersRepository } from "../repositories/prisma/prisma.users.repository";
import { UserAlreadyExistsError } from "../errors/user.already.exists";

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const usersRepository = new PrismaUsersRepository();
    const registerService = new RegisterService(usersRepository);

    await registerService.execute({ name, email, password });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send();
    }
    throw Error;
  }

  return reply.status(201).send();
};
