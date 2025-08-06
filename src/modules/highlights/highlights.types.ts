import { z } from "zod";

const createHighlightDtoSchema = z.object({
    cover_image_url: z.string().url(),
    title: z.string().nullable(),
});

const highlightSchema = z.object({
    id: z.number(),
    cover_image_url: z.string().url(),
    title: z.string().nullable(),
});

const highlightsArraySchema = z.array(highlightSchema);

type CreateHighlightDto = z.infer<typeof createHighlightDtoSchema>;
type Highlight = z.infer<typeof highlightSchema>;

export {
    createHighlightDtoSchema,
    highlightSchema,
    highlightsArraySchema,
    CreateHighlightDto,
    Highlight
};
