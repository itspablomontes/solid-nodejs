import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../repositories/inMemory/in.memory.users.repository";
import { AuthenticateService } from "../services/authenticate.service";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "../errors/invalid.credentials";

describe("Authenticate Service", () => {
  it("should be able to authenticate", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const authenticateService = new AuthenticateService(usersRepository);

    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password_hash: await hash("1223342", 6),
    });

    const { user } = await authenticateService.execute({
      email: "johndoe@gmail.com",
      password: "mynameisjohndoe",
    });
  });
  it("should not be able to authenticate with wrong email", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const authenticateService = new AuthenticateService(usersRepository);

    await expect(() =>
      authenticateService.execute({
        email: "johndoe@gmail.com",
        password: "mynameisjohndoe",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
