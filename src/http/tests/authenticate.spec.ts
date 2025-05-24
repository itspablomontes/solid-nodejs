import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../repositories/inMemory/in.memory.users.repository";
import { AuthenticateService } from "../services/authenticate.service";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "../errors/invalid.credentials";
import { beforeEach } from "node:test";
import { IUsersRepository } from "../interfaces/user.repository.interface";

let usersRepository: IUsersRepository;
let sut: AuthenticateService;

describe("Authenticate Service", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateService(usersRepository);
  });

  it("should be able to authenticate", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateService(usersRepository);

    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password_hash: await hash("mynameisjohndoe", 6),
    });

    const { user } = await sut.execute({
      email: "johndoe@gmail.com",
      password: "mynameisjohndoe",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateService(usersRepository);

    await expect(() =>
      sut.execute({
        email: "notjohndoe@gmail.com",
        password: "mynameisjohndoe",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
