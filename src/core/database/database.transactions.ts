// src/plugins/database.transactions.ts
import type { Database } from "better-sqlite3";
import { CreatePostDto } from "src/modules/posts/posts.types";
import { CreateReelDto } from "src/modules/reels/reels.types";
import { CreateTaggedDto } from "src/modules/tagged/tagged.types";
import { CreateHighlightDto } from "src/modules/highlights/highlights.types";

const createTransactionHelpers = (db: Database) => {
  const statements = {
    // Posts
    getPostById: db.prepare("SELECT * FROM posts WHERE id = ?"),
    getAllPosts: db.prepare("SELECT * FROM posts"),
    createPost: db.prepare(
      "INSERT INTO posts (img_url, caption) VALUES (@img_url, @caption) RETURNING *"
    ),

    // Reels
    getAllReels: db.prepare("SELECT * FROM reels"),
    createReel: db.prepare(
      "INSERT INTO reels (video_url, thumbnail_url, caption, views) VALUES (@video_url, @thumbnail_url, @caption, @views) RETURNING *"
    ),

    // Tagged
    getTaggedGrid: db.prepare("SELECT * FROM tagged"),
    createTagged: db.prepare(
      "INSERT INTO tagged (img_url, caption, user) VALUES (@img_url, @caption, @user) RETURNING *"
    ),

    // Highlights
    getAllHighlights: db.prepare("SELECT * FROM highlights"),
    getHighlightById: db.prepare("SELECT * FROM highlights WHERE id = ?"),
    createHighlight: db.prepare(
        "INSERT INTO highlights (cover_image_url, title) VALUES (@cover_image_url, @title) RETURNING *"
    ),
  };

  const posts = {
    getById: (id: number) => statements.getPostById.get(id),
    getAll: () => statements.getAllPosts.all(),
    create: (data: CreatePostDto) => statements.createPost.get(data),
  };

  const reels = {
    getAll: () => statements.getAllReels.all(),
    create: (data: CreateReelDto) => statements.createReel.get(data),
  };

  const tagged = {
    getTagged: () => statements.getTaggedGrid.all(),
    create: (data: CreateTaggedDto) => statements.createTagged.get(data),
  };

  const highlights = {
      getAll: () => statements.getAllHighlights.all(),
      getById: (id: number) => statements.getHighlightById.get(id),
      create: (data: CreateHighlightDto) => statements.createHighlight.get(data),
  };

  return { posts, reels, tagged, highlights };
};

export type TransactionHelpers = ReturnType<typeof createTransactionHelpers>;
export { createTransactionHelpers };
