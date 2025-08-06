import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import { taggedService } from "./tagged.service";

const taggedRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  const service = taggedService(fastify);

  // GET /tagged/grid
  fastify.get("/tagged/grid", async (_request, reply) => {
    const tagged = await service.getTagged();
    return reply.code(200).send(tagged);
  });
};

export { taggedRoutes };
