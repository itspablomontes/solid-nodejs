import { InMemoryCheckInsRepository } from "../repositories/inMemory/in.memory.checkins.repository";
import { expect, describe, it, beforeEach } from "vitest";
import { CheckInService } from "../services/checkin.service";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInService;

describe("Check-in Service", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInService(checkInsRepository);
  });
  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
