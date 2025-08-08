import type { FastifyInstance } from "fastify";
import { CreateReelDto } from "./reels.types";

const reelsService = (fastify: FastifyInstance) => {
  return {
    create: async (reelData: CreateReelDto) => {
      fastify.log.info(`Creating a new reel`);
      const data = { ...reelData, views: reelData.views ?? 0 }; // default views
      return fastify.transactions.reels.create(data);
    },
    getAll: async (filter?: { author?: string }) => {
      fastify.log.info(`Fetching all reels`);
      const reels = fastify.transactions.reels.getAll();
      return filter?.author ? reels.filter((r: any) => r.author === filter.author) : reels;
    },
  };
};

export { reelsService };
