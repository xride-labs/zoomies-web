import { useAppDispatch, useAppSelector } from "../shared/hooks";
import {
  selectPosts,
  selectFeedLoading,
  selectFeedError,
  selectFeedHasMore,
} from "./selectors";
import {
  fetchFeed,
  fetchMoreFeed,
  createPostThunk,
  deletePostThunk,
  likePostThunk,
  unlikePostThunk,
  savePostThunk,
  unsavePostThunk,
} from "./thunks";

export const useFeed = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const isLoading = useAppSelector(selectFeedLoading);
  const error = useAppSelector(selectFeedError);
  const hasMore = useAppSelector(selectFeedHasMore);

  return {
    posts,
    isLoading,
    error,
    hasMore,
    fetchFeed: (page?: number) => dispatch(fetchFeed(page || 1)),
    fetchMoreFeed: (page: number) => dispatch(fetchMoreFeed(page)),
    createPost: (data: any) => dispatch(createPostThunk(data)),
    deletePost: (postId: string) => dispatch(deletePostThunk(postId)),
    likePost: (postId: string) => dispatch(likePostThunk(postId)),
    unlikePost: (postId: string) => dispatch(unlikePostThunk(postId)),
    savePost: (postId: string) => dispatch(savePostThunk(postId)),
    unsavePost: (postId: string) => dispatch(unsavePostThunk(postId)),
  };
};
