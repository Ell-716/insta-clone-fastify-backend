import { z } from "zod";

const createTaggedDtoSchema = z.object({
  img_url: z.string().url(),
  caption: z.string().nullable().optional(),
  user: z.string(),
});

const taggedSchema = z.object({
  id: z.number(),
  img_url: z.string().url(),
  caption: z.string().nullable(),
  user: z.string(),
});

const taggedArraySchema = z.array(taggedSchema);

type CreateTaggedDto = z.infer<typeof createTaggedDtoSchema>;
type Tagged = z.infer<typeof taggedSchema>;

export {
  createTaggedDtoSchema,
  taggedSchema,
  taggedArraySchema,
  CreateTaggedDto,
  Tagged
};
