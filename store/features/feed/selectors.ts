import type { RootState } from "../../index";

export const selectFeed = (state: RootState) => state.feed;
export const selectPosts = (state: RootState) => state.feed.posts;
export const selectFeedLoading = (state: RootState) => state.feed.isLoading;
export const selectFeedError = (state: RootState) => state.feed.error;
export const selectFeedHasMore = (state: RootState) => state.feed.hasMore;
export const selectFeedPage = (state: RootState) => state.feed.page;

export const selectPostById = (postId: string) => (state: RootState) =>
  state.feed.posts.find((post) => post.id === postId);
