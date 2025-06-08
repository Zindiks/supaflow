// This file provides a singleton instance of the PrismaClient
import { PrismaClient } from "@prisma/client";

// Create a single instance of Prisma Client
// Adapted for browser environment

// Check if we're in a browser environment
const isBrowser = typeof window !== "undefined";

// For browser, create a new instance each time
// For Node.js, use the singleton pattern
let prismaInstance: PrismaClient;

if (isBrowser) {
  // In browser, simply create a new client
  prismaInstance = new PrismaClient();
} else {
  // In Node.js environments, use singleton pattern
  const globalForPrisma = global as unknown as { prisma: PrismaClient };

  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      log:
        process.env.NODE_ENV === "development"
          ? ["query", "error", "warn"]
          : ["error"],
    });
  }

  prismaInstance = globalForPrisma.prisma;
}

export const prisma = prismaInstance;
