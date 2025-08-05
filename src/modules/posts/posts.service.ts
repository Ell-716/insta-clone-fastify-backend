import type { FastifyInstance } from "fastify";
import { CreatePostDto } from "./posts.types";

const postsService = (fastify: FastifyInstance) => {
  return {
    create: async (postData: CreatePostDto) => {
      fastify.log.info(`Creating a new post`);
      const post = fastify.transactions.posts.create(postData);
      return post;
    },
    getAll: async () => {
      fastify.log.info(`Fetching all posts`);
      const posts = fastify.transactions.posts.getAll();
      return posts;
    },
  };
};

export { postsService };
