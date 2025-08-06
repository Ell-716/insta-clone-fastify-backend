import Fastify from "fastify";
import { taggedRoutes } from "./tagged.routes";

describe("GET /tagged/grid", () => {
  it("should return a list of tagged posts with a 200 status code", async () => {
    const app = Fastify();

    const mockTagged = [
      {
        id: 1,
        image_url: "https://example.com/image.jpg",
        user_id: 1,
      },
    ];

    app.decorate("transactions", {
      getTaggedGrid: async () => mockTagged,
    });

    app.register(taggedRoutes);

    const response = await app.inject({
      method: "GET",
      url: "/tagged/grid",
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toEqual(mockTagged);
  });
});
