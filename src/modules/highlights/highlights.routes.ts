import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import { highlightsService } from "./highlights.service";

const highlightsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  const service = highlightsService(fastify);

  // GET /highlights
  fastify.get("/highlights", async (request, reply) => {
    const highlights = await service.getAll();
    return reply.code(200).send(highlights);
  });

  // GET /highlights/:id
  fastify.get("/highlights/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const highlight = await service.getById(Number(id));

    if (!highlight) {
      return reply.code(404).send({ message: "Highlight not found" });
    }

    return reply.code(200).send(highlight);
  });
};

export { highlightsRoutes };
