import { prisma } from "@/config/database";
import { hash } from "bcryptjs";
import { prismaUsersRepository } from "../repositories/prisma/prisma.users.repository";
import { IUsersRepository } from "../interfaces/user.repository.interface";

interface RegisterServiceRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterService {
  constructor(private usersRepository: IUsersRepository) {}
  async execute({ email, name, password }: RegisterServiceRequest) {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.getByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
