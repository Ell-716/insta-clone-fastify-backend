import Fastify from "fastify";
import { reelsRoutes } from "./reels.routes";

describe("GET /reels/grid", () => {
  it("should return a list of reels with a 200 status code", async () => {
    const app = Fastify();

    const mockReels = [
      {
        id: 1,
        video_url: "http://example.com/video1.mp4",
        thumbnail_url: "http://example.com/thumb1.png",
        caption: "Reel 1",
        views: 100,
      },
      {
        id: 2,
        video_url: "http://example.com/video2.mp4",
        thumbnail_url: "http://example.com/thumb2.png",
        caption: "Reel 2",
        views: 200,
      },
    ];

    app.decorate("transactions", {
      posts: {
        getById: jest.fn(),
        getAll: jest.fn(),
        create: jest.fn(),
      },
      reels: {
        getAll: jest.fn().mockReturnValue(mockReels),
        create: jest.fn(),
      },
      tagged: {
        getTagged: jest.fn(),
        create: jest.fn(),
      },
      highlights: {
        getAll: jest.fn(),
        getById: jest.fn(),
        create: jest.fn(),
      },
    });

    app.register(reelsRoutes);

    const response = await app.inject({
      method: "GET",
      url: "/reels/grid",
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toEqual(mockReels);
  });
});
