import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import { reelsService } from "./reels.service";
import { CreateReelDto } from "./reels.types";

const reelsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  const service = reelsService(fastify);

  // GET /reels/grid
  fastify.get("/reels/grid", async (request, reply) => {
    const reels = await service.getAll();
    return reply.code(200).send(reels);
  });

};

export { reelsRoutes };
