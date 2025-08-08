import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import { reelsService } from "./reels.service";
import { z } from "zod";
import { createReelDtoSchema, CreateReelDto } from "./reels.types";

const listQuerySchema = z.object({ author: z.string().optional() });

const reelsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  const service = reelsService(fastify);

  // GET /reels/grid (global or filtered by author)
  fastify.get("/reels/grid", async (request, reply) => {
    const { author } = listQuerySchema.parse(request.query ?? {});
    const reels = await service.getAll({ author });
    return reply.code(200).send(reels);
  });

  // SIMPLE JSON POST /reels
  fastify.post<{ Body: CreateReelDto }>("/reels", async (request, reply) => {
    // Validate body against Zod to avoid 500s
    const payload = createReelDtoSchema.parse(request.body);
    const newReel = await service.create(payload);
    return reply.code(201).send(newReel);
  });
};

export { reelsRoutes };
