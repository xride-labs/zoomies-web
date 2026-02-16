import { useAppDispatch, useAppSelector } from "../shared/hooks";
import {
  selectUserProfile,
  selectUserLoading,
  selectUserError,
} from "./selectors";
import { fetchProfile, updateUserProfile } from "./thunks";

export const useUser = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectUserProfile);
  const isLoading = useAppSelector(selectUserLoading);
  const error = useAppSelector(selectUserError);

  return {
    profile,
    isLoading,
    error,
    fetchProfile: () => dispatch(fetchProfile()),
    updateProfile: (data: any) => dispatch(updateUserProfile(data)),
  };
};
