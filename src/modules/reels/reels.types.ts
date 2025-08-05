// src/modules/reels/reels.types.ts
import { z } from "zod";

// Define the schema for creating a reel
const createReelDtoSchema = z.object({
  video_url: z.string().url(),
  thumbnail_url: z.string().url(),
  caption: z.string().nullable().optional(),
  views: z.number().optional(), // views can be optional during creation
});

// Define the schema for a full reel object
const reelSchema = z.object({
  id: z.number(),
  video_url: z.string().url(),
  thumbnail_url: z.string().url(),
  caption: z.string().nullable(),
  views: z.number(),
  created_at: z.string(),
});

// Used to validate GET /reels/grid response
export const reelsSchema = z.array(reelSchema);

// Infer TS types from Zod schemas
type CreateReelDto = z.infer<typeof createReelDtoSchema>;
type Reel = z.infer<typeof reelSchema>;

export {
  createReelDtoSchema,
  reelSchema,
  reelsSchema,
  CreateReelDto,
  Reel
};
