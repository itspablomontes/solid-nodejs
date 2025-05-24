import { PrismaUsersRepository } from "@/http/repositories/prisma/prisma.users.repository";
import { AuthenticateService } from "../authenticate.service";

export function makeAuthenticateService() {
  const usersRepository = new PrismaUsersRepository();
  const authenticateService = new AuthenticateService(usersRepository);

  return authenticateService;
}
