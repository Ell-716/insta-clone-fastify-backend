import Fastify from "fastify";
import { databasePlugin } from "./core/database/database.plugin";
import { postsRoutes } from "./modules/posts/posts.routes";

const fastify = Fastify({
  logger: true,
});

// Register our database plugin
fastify.register(databasePlugin);
// Register our new posts routes
fastify.register(postsRoutes);

// Declare a default route
fastify.get("/", function (request, reply) {
  reply.send({ hello: "world" });
});

const port = 3000;

fastify.listen({ port }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
