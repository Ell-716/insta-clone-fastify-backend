// src/plugins/database.transactions.ts
import type { Database } from "better-sqlite3";
import { CreatePostDto } from "src/modules/posts/posts.types";
import { CreateReelDto } from "src/modules/reels/reels.types";
import { CreateTaggedDto } from "src/modules/tagged/tagged.types";

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

  return { posts, reels, tagged };
};

export type TransactionHelpers = ReturnType<typeof createTransactionHelpers>;
export { createTransactionHelpers };
