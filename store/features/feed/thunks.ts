import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  feedApi,
  type Post,
  type Comment,
  type CreatePostData,
} from "@/lib/server/feed";

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

export type { Post, Comment, CreatePostData };
