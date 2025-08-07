import Fastify from "fastify";
import path from "path";
import fs from "fs/promises";
import { randomUUID } from "crypto";
import multipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import { databasePlugin } from "./core/database/database.plugin";
import { postsRoutes } from "./modules/posts/posts.routes";
import { reelsRoutes } from "./modules/reels/reels.routes";
import { taggedRoutes } from "./modules/tagged/tagged.routes";
import { highlightsRoutes } from "./modules/highlights/highlights.routes";

const fastify = Fastify({
  logger: true,
});

fastify.register(multipart);

// Register static file serving
fastify.register(fastifyStatic, {
  root: path.join(__dirname, "../public"),
  prefix: "/",
});

fastify.register(databasePlugin);
fastify.register(postsRoutes);
fastify.register(reelsRoutes);
fastify.register(taggedRoutes);
fastify.register(highlightsRoutes);

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
