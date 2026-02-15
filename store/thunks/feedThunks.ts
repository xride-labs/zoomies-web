import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  feedApi,
  type Post,
  type Comment,
  type CreatePostData,
} from "@/lib/server/feed";

/**
 * Fetch feed posts
 */
export const fetchFeed = createAsyncThunk(
  "feed/fetch",
  async (page: number = 1, { rejectWithValue }) => {
    try {
      const response = await feedApi.getFeed(page);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch feed",
      );
    }
  },
);

/**
 * Fetch more feed posts (pagination)
 */
export const fetchMoreFeed = createAsyncThunk(
  "feed/fetchMore",
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await feedApi.getFeed(page);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to load more",
      );
    }
  },
);

/**
 * Create a post
 */
export const createPostThunk = createAsyncThunk(
  "feed/createPost",
  async (data: CreatePostData, { rejectWithValue }) => {
    try {
      const post = await feedApi.createPost(data);
      return post;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to create post",
      );
    }
  },
);

/**
 * Delete a post
 */
export const deletePostThunk = createAsyncThunk(
  "feed/deletePost",
  async (postId: string, { rejectWithValue }) => {
    try {
      await feedApi.deletePost(postId);
      return postId;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to delete post",
      );
    }
  },
);

/**
 * Like a post
 */
export const likePostThunk = createAsyncThunk(
  "feed/like",
  async (postId: string, { rejectWithValue }) => {
    try {
      await feedApi.likePost(postId);
      return postId;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to like post",
      );
    }
  },
);

/**
 * Unlike a post
 */
export const unlikePostThunk = createAsyncThunk(
  "feed/unlike",
  async (postId: string, { rejectWithValue }) => {
    try {
      await feedApi.unlikePost(postId);
      return postId;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to unlike post",
      );
    }
  },
);

/**
 * Save a post
 */
export const savePostThunk = createAsyncThunk(
  "feed/save",
  async (postId: string, { rejectWithValue }) => {
    try {
      await feedApi.savePost(postId);
      return postId;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to save post",
      );
    }
  },
);

/**
 * Unsave a post
 */
export const unsavePostThunk = createAsyncThunk(
  "feed/unsave",
  async (postId: string, { rejectWithValue }) => {
    try {
      await feedApi.unsavePost(postId);
      return postId;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to unsave post",
      );
    }
  },
);

/**
 * Fetch comments for a post
 */
export const fetchComments = createAsyncThunk(
  "feed/fetchComments",
  async (
    { postId, page = 1 }: { postId: string; page?: number },
    { rejectWithValue },
  ) => {
    try {
      const response = await feedApi.getComments(postId, page);
      return { postId, ...response };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch comments",
      );
    }
  },
);

/**
 * Add a comment to a post
 */
export const addCommentThunk = createAsyncThunk(
  "feed/addComment",
  async (
    { postId, content }: { postId: string; content: string },
    { rejectWithValue },
  ) => {
    try {
      const comment = await feedApi.addComment(postId, content);
      return { postId, comment };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to add comment",
      );
    }
  },
);

/**
 * Delete a comment
 */
export const deleteCommentThunk = createAsyncThunk(
  "feed/deleteComment",
  async (
    { postId, commentId }: { postId: string; commentId: string },
    { rejectWithValue },
  ) => {
    try {
      await feedApi.deleteComment(postId, commentId);
      return { postId, commentId };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to delete comment",
      );
    }
  },
);

// Re-export types
export type { Post, Comment, CreatePostData };
