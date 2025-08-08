import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import { postsService } from "./posts.service";
import { z } from "zod";

// Temp “current user”
const CURRENT_USER_ID = process.env.CURRENT_USER_ID ?? "me";

const listQuerySchema = z.object({
  author: z.string().optional(),
});

const createPostSchema = z.object({
  caption: z.string().min(1, "Caption cannot be empty.").optional(),
});

const postsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  const service = postsService(fastify);

  fastify.post("/posts", async (request, reply) => {
    if (!request.isMultipart()) {
      reply.code(415).send({ message: "Request must be multipart" });
      return;
    }

    const parts = request.parts();

    let caption: string | undefined;
    let imageFile: { buffer: Buffer; filename: string } | undefined;

    for await (const part of parts) {
      if (part.type === "field") {
        if (part.fieldname === "caption") caption = part.value as string;
      } else if (part.type === "file") {
        const buffers: Buffer[] = [];
        for await (const chunk of part.file) buffers.push(chunk);
        imageFile = { buffer: Buffer.concat(buffers), filename: part.filename };
      }
    }

    if (!imageFile && !caption) {
      return reply
        .code(400)
        .send({ message: "Either image or caption is required." });
    }

    try {
      if (caption) createPostSchema.pick({ caption: true }).parse({ caption });

      const newPost = await service.create({
        caption: caption || "",
        imageFile,
        author: CURRENT_USER_ID, // <- add author
      });

      return reply.code(201).send(newPost);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply
          .code(400)
          .send({ message: "Validation failed", errors: error.errors });
      }
      fastify.log.error(error);
      return reply.code(500).send({ message: "Failed to create post" });
    }
  });

  // GET /posts (global or filtered by author)
  fastify.get("/posts", async (request, reply) => {
    const { author } = listQuerySchema.parse(request.query ?? {});
    const posts = await service.getAll({ author });
    return reply.code(200).send(posts);
  });
};

export { postsRoutes };
