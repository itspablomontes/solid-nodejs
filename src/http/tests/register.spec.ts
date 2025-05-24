import { describe, expect, it } from "vitest";
import { RegisterService } from "../services/register.service";
import { InMemoryUsersRepository } from "../repositories/inMemory/in.memory.users.repository";
import bcrypt from "bcryptjs";
import { UserAlreadyExistsError } from "../errors/user.already.exists";

describe("Register Service", () => {
  it("should be able to register", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerService = new RegisterService(usersRepository);

    const { user } = await registerService.execute({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "mynameisjohndoe",
    });

    expect(user.id).toEqual(expect.any(String));
  });
  it("should hash user password upon registration", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerService = new RegisterService(usersRepository);

    const { user } = await registerService.execute({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "mynameisjohndoe",
    });

    const isPasswordCorrectlyHashed = await bcrypt.compare(
      "mynameisjohndoe",
      user.password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
  it("should not allow two users with the same email", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerService = new RegisterService(usersRepository);

    await registerService.execute({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "mynameisjohndoe",
    });

    expect(() =>
      registerService.execute({
        name: "John Doe",
        email: "johndoe@gmail.com",
        password: "mynameisjohndoe",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
