import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchFeed,
  fetchMoreFeed,
  createPostThunk,
  deletePostThunk,
  likePostThunk,
  unlikePostThunk,
  savePostThunk,
  unsavePostThunk,
} from "../features/feed/thunks";

export type PostType = "ride" | "content" | "listing" | "club-activity";

export interface Post {
  id: string;
  type: PostType;
  content: string;
  images: string[];
  author: {
    id: string;
    name: string;
    username: string;
    avatar: string | null;
    clubs: { id: string; name: string; avatar: string | null }[];
  };
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  isSaved: boolean;
  createdAt: string;
  // For ride posts
  ride?: {
    id: string;
    title: string;
    scheduledAt: string;
    participantsCount: number;
  };
  // For listing posts
  listing?: {
    id: string;
    title: string;
    price: number;
    currency: string;
    isSold: boolean;
  };
  // For club activity posts
  club?: {
    id: string;
    name: string;
    avatar: string | null;
  };
}

interface FeedState {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
}

const initialState: FeedState = {
  posts: [],
  isLoading: false,
  error: null,
  hasMore: true,
  page: 1,
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
      state.page = 1;
    },
    appendPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = [...state.posts, ...action.payload];
      state.page += 1;
    },
    prependPost: (state, action: PayloadAction<Post>) => {
      state.posts = [action.payload, ...state.posts];
    },
    updatePost: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<Post> }>,
    ) => {
      const index = state.posts.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = {
          ...state.posts[index],
          ...action.payload.updates,
        };
      }
    },
    removePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((p) => p.id !== action.payload);
    },
    toggleLike: (state, action: PayloadAction<string>) => {
      const post = state.posts.find((p) => p.id === action.payload);
      if (post) {
        post.isLiked = !post.isLiked;
        post.likesCount += post.isLiked ? 1 : -1;
      }
    },
    toggleSave: (state, action: PayloadAction<string>) => {
      const post = state.posts.find((p) => p.id === action.payload);
      if (post) {
        post.isSaved = !post.isSaved;
      }
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetFeed: (state) => {
      state.posts = [];
      state.page = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    // Fetch feed
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload.posts;
        state.hasMore = action.payload.hasMore;
        state.page = 1;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch more feed
    builder
      .addCase(fetchMoreFeed.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMoreFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = [...state.posts, ...action.payload.posts];
        state.hasMore = action.payload.hasMore;
        state.page += 1;
      })
      .addCase(fetchMoreFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Create post
    builder
      .addCase(createPostThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPostThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = [action.payload, ...state.posts];
      })
      .addCase(createPostThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Delete post
    builder.addCase(deletePostThunk.fulfilled, (state, action) => {
      state.posts = state.posts.filter((p) => p.id !== action.payload);
    });

    // Like post
    builder.addCase(likePostThunk.fulfilled, (state, action) => {
      const post = state.posts.find((p) => p.id === action.payload);
      if (post) {
        post.isLiked = true;
        post.likesCount += 1;
      }
    });

    // Unlike post
    builder.addCase(unlikePostThunk.fulfilled, (state, action) => {
      const post = state.posts.find((p) => p.id === action.payload);
      if (post) {
        post.isLiked = false;
        post.likesCount -= 1;
      }
    });

    // Save post
    builder.addCase(savePostThunk.fulfilled, (state, action) => {
      const post = state.posts.find((p) => p.id === action.payload);
      if (post) {
        post.isSaved = true;
      }
    });

    // Unsave post
    builder.addCase(unsavePostThunk.fulfilled, (state, action) => {
      const post = state.posts.find((p) => p.id === action.payload);
      if (post) {
        post.isSaved = false;
      }
    });
  },
});

export const {
  setLoading,
  setPosts,
  appendPosts,
  prependPost,
  updatePost,
  removePost,
  toggleLike,
  toggleSave,
  setHasMore,
  setError,
  clearError,
  resetFeed,
} = feedSlice.actions;

export default feedSlice.reducer;
