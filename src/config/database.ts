import { env } from "@/env";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: env.NODE_ENV === "dev" ? ["query"] : [],
  });

if (process.env.NODE_ENV === "production") {
  globalForPrisma.prisma === prisma;
}
