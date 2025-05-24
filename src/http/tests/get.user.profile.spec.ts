import { beforeEach } from "vitest";
import { describe, expect, it } from "vitest";
import { IUsersRepository } from "../interfaces/user.repository.interface";
import { GetUserProfileService } from "../services/get.user.profile.service";
import { InMemoryUsersRepository } from "../repositories/inMemory/in.memory.users.repository";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "../errors/resource.not.found";

let usersRepository: IUsersRepository;
let sut: GetUserProfileService;

describe("Get User Profile Service", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileService(usersRepository);
  });

  it("should be able to authenticate", async () => {
    const { id } = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password_hash: await hash("mynameisjohndoe", 6),
    });

    const { user } = await sut.execute({ id });

    expect(user.name).toEqual("John Doe");
  });

  it("should not be able to authenticate without valid id", async () => {
    await expect(() =>
      sut.execute({ id: "Non-existant-id" }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
