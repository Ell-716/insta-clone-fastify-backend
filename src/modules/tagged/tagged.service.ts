import type { FastifyInstance } from "fastify";
import { CreateTaggedDto } from "./tagged.types";

const taggedService = (fastify: FastifyInstance) => {
  return {
    create: async (taggedData: CreateTaggedDto) => {
      fastify.log.info("Creating a new tagged post");
      return fastify.transactions.tagged.create(taggedData);
    },

    getTagged: async () => {
      fastify.log.info("Fetching all tagged posts");
      return fastify.transactions.tagged.getTagged();
    },
  };
};

export { taggedService };
