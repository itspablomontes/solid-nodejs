import { prisma } from "@/config/database";
import { ICheckInsRepository } from "@/http/interfaces/checkins.repository.interface";
import { CheckIn, Prisma } from "@prisma/client";

export class CheckInsRepository implements ICheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.create({
      data,
    });
    return checkIn;
  }
}
