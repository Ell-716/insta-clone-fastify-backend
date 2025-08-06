import { z } from "zod";

const createHighlightsDtoSchema = z.object({
    cover_image_url: z.string().url(),
    title: z.string().nullable(),
});

const highlightSchema = z.object({
    id: z.number(),
    cover_image_url: z.string().url(),
    title: z.string().nullable(),
});

const highlightsArraySchema = z.array(highlightSchema);

type CreateHighlightsDto = z.infer<typeof createHighlightsDtoSchema>;
type Highlight = z.infer<typeof highlightSchema>;

export {
    createHighlightsDtoSchema,
    highlightSchema,
    highlightsArraySchema,
    CreateHighlightsDto,
    Highlight
};
