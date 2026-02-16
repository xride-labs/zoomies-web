import { useAppDispatch, useAppSelector } from "../shared/hooks";
import {
  selectListings,
  selectMyListings,
  selectSavedListings,
  selectCurrentListing,
  selectMarketplaceFilters,
  selectMarketplaceLoading,
  selectMarketplaceError,
} from "./selectors";
import {
  fetchListings,
  fetchMoreListings,
  fetchMyListings,
  fetchSavedListings,
  fetchListingDetails,
  createListingThunk,
  updateListingThunk,
  deleteListingThunk,
  saveListingThunk,
  unsaveListingThunk,
  markAsSoldThunk,
} from "./thunks";

export const useMarketplace = () => {
  const dispatch = useAppDispatch();
  const listings = useAppSelector(selectListings);
  const myListings = useAppSelector(selectMyListings);
  const savedListings = useAppSelector(selectSavedListings);
  const currentListing = useAppSelector(selectCurrentListing);
  const filters = useAppSelector(selectMarketplaceFilters);
  const isLoading = useAppSelector(selectMarketplaceLoading);
  const error = useAppSelector(selectMarketplaceError);

  return {
    listings,
    myListings,
    savedListings,
    currentListing,
    filters,
    isLoading,
    error,
    fetchListings: (filters?: any) => dispatch(fetchListings(filters)),
    fetchMoreListings: (filters?: any) =>
      dispatch(fetchMoreListings(filters || {})),
    fetchMyListings: () => dispatch(fetchMyListings()),
    fetchSavedListings: () => dispatch(fetchSavedListings()),
    fetchListingDetails: (listingId: string) =>
      dispatch(fetchListingDetails(listingId)),
    createListing: (data: any) => dispatch(createListingThunk(data)),
    updateListing: (listingId: string, data: any) =>
      dispatch(updateListingThunk({ listingId, data })),
    deleteListing: (listingId: string) =>
      dispatch(deleteListingThunk(listingId)),
    saveListing: (listingId: string) => dispatch(saveListingThunk(listingId)),
    unsaveListing: (listingId: string) =>
      dispatch(unsaveListingThunk(listingId)),
    markAsSold: (listingId: string) => dispatch(markAsSoldThunk(listingId)),
  };
};
