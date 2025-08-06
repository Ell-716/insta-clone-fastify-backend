import type { FastifyInstance } from "fastify";
import { CreateHighlightDto } from "./highlights.types";

const highlightsService = (fastify: FastifyInstance) => {
  return {
    create: async (highlightData: CreateHighlightDto) => {
      fastify.log.info("Creating a new highlight");
      return fastify.transactions.highlights.create(highlightData);
    },

    getAll: async () => {
      fastify.log.info("Fetching all highlights");
      return fastify.transactions.highlights.getAll();
    },

    getById: async (id: number) => {
      fastify.log.info(`Fetching highlight with ID: ${id}`);
      return fastify.transactions.highlights.getById(id);
    },
  };
};

export { highlightsService };
