import cors from "@fastify/cors";
import Fastify from "fastify";
import routes from "./routes/routes.js";

const fastify = Fastify({
  logger: true,
});

await fastify.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
});

// Enregistre les routes à partir d'un autre fichier
fastify.register(routes, { prefix: "/habits" });

// Run the server!
try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
