// src/modules/highlights/highlights.test.ts
import Fastify from "fastify";
import { highlightsRoutes } from "./highlights.routes";

describe("Highlights Routes", () => {
  const mockHighlights = [
    {
      id: 1,
      title: "Highlight 1",
      cover_image: "https://example.com/cover.jpg",
      user_id: 1,
    },
    {
      id: 2,
      title: "Highlight 2",
      cover_image: "https://example.com/cover2.jpg",
      user_id: 2,
    },
  ];

  it("GET /highlights → should return a list of highlights with 200 status", async () => {
    const app = Fastify();

    app.decorate("transactions", {
      posts: {
        getById: jest.fn(),
        getAll: jest.fn(),
        create: jest.fn(),
      },
      reels: {
        getAll: jest.fn(),
        create: jest.fn(),
      },
      tagged: {
        getTagged: jest.fn(),
        create: jest.fn(),
      },
      highlights: {
        getAll: () => mockHighlights,
        getById: jest.fn(), // not needed here, but added for full structure
        create: jest.fn(),
      },
    });

    app.register(highlightsRoutes);

    const response = await app.inject({
      method: "GET",
      url: "/highlights",
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toEqual(mockHighlights);
  });

  it("GET /highlights/:id → should return a single highlight by ID", async () => {
    const app = Fastify();

    const highlightId = 1;
    const highlight = mockHighlights.find((h) => h.id === highlightId);

    app.decorate("transactions", {
      posts: {
        getById: jest.fn(),
        getAll: jest.fn(),
        create: jest.fn(),
      },
      reels: {
        getAll: jest.fn(),
        create: jest.fn(),
      },
      tagged: {
        getTagged: jest.fn(),
        create: jest.fn(),
      },
      highlights: {
        getAll: jest.fn(),
        getById: () => highlight,
        create: jest.fn(),
      },
    });

    app.register(highlightsRoutes);

    const response = await app.inject({
      method: "GET",
      url: `/highlights/${highlightId}`,
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toEqual(highlight);
  });
});
