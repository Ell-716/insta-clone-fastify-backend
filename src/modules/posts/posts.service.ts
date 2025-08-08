import type { FastifyInstance } from "fastify";
import { fileStorageService } from "../../common/file-storage.service";

type CreatePostServiceArgs = {
  caption: string;
  imageFile?: { buffer: Buffer; filename: string };
  author?: string; // <- added
};

type GetAllFilter = {
  author?: string;
};

export const postsService = (fastify: FastifyInstance) => {
  return {
    create: async (data: CreatePostServiceArgs) => {
      fastify.log.info(`Creating a new post`);

      let img_url = data.caption; // fallback if no image
      if (data.imageFile) {
        img_url = await fileStorageService.saveImage(
          data.imageFile.buffer,
          data.imageFile.filename
        );
      }

      const post = fastify.transactions.posts.create({
        img_url,
        caption: data.caption,
        author: data.author ?? "me", // <- store author
      });

      return post;
    },

    getAll: async (filter?: GetAllFilter) => {
      fastify.log.info(`Fetching all posts`);
      const posts = fastify.transactions.posts.getAll();

      if (filter?.author) {
        return posts.filter((p: any) => p.author === filter.author);
      }

      return posts;
    },
  };
};
