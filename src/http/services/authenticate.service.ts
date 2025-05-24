import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "../errors/invalid.credentials";
import { IUsersRepository } from "../interfaces/user.repository.interface";
import { User } from "@prisma/client";

interface AuthenticateServiceRequest {
  email: string;
  password: string;
}

interface AuthenticateServiceResponse {
  user: User;
}

export class AuthenticateService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    const user = await this.usersRepository.getByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doPasswordsMatch = await compare(password, user.password_hash);

    if (!doPasswordsMatch) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}
