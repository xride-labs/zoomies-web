import { apiAuthenticated } from "../base";

export interface MediaUploadResult {
  publicId?: string;
  url?: string;
  secureUrl?: string;
  thumbnailUrl?: string;
  resourceType?: string;
  [key: string]: unknown;
}

export interface MediaUploadResponse {
  media: MediaUploadResult;
  imageUrl?: string;
  listing?: {
    id: string;
    images: string[];
  };
}

export type MediaType = "image" | "video";

export async function uploadProfileImage(
  file: string,
): Promise<MediaUploadResponse> {
  return apiAuthenticated.post<MediaUploadResponse>("/media/upload/profile", {
    file,
  });
}

export async function uploadProfileCover(
  file: string,
): Promise<MediaUploadResponse> {
  return apiAuthenticated.post<MediaUploadResponse>(
    "/media/upload/profile/cover",
    { file },
  );
}

export async function uploadProfileGallery(
  file: string,
): Promise<MediaUploadResponse> {
  return apiAuthenticated.post<MediaUploadResponse>(
    "/media/upload/profile/gallery",
    { file },
  );
}

export async function uploadClubImage(
  clubId: string,
  file: string,
  type: "logo" | "cover" = "logo",
): Promise<MediaUploadResponse> {
  return apiAuthenticated.post<MediaUploadResponse>(
    `/media/upload/club/${clubId}`,
    { file, type },
  );
}

export async function uploadClubGallery(
  clubId: string,
  file: string,
): Promise<MediaUploadResponse> {
  return apiAuthenticated.post<MediaUploadResponse>(
    `/media/upload/club/${clubId}/gallery`,
    { file },
  );
}

export async function uploadBikeImage(
  bikeId: string,
  file: string,
): Promise<MediaUploadResponse> {
  return apiAuthenticated.post<MediaUploadResponse>(
    `/media/upload/bike/${bikeId}`,
    { file },
  );
}

export async function uploadRideMedia(
  rideId: string,
  file: string,
  type: MediaType = "image",
): Promise<MediaUploadResponse> {
  return apiAuthenticated.post<MediaUploadResponse>("/media/upload", {
    folder: "rides",
    file,
    type,
    resourceId: rideId,
  });
}

export async function uploadListingImage(
  listingId: string,
  file: string,
): Promise<MediaUploadResponse> {
  return apiAuthenticated.post<MediaUploadResponse>(
    `/media/upload/listing/${listingId}`,
    { file },
  );
}

export async function deleteMedia(
  publicId: string,
  resourceType: MediaType = "image",
): Promise<void> {
  return apiAuthenticated.delete<void>(
    `/media/${publicId}?resourceType=${resourceType}`,
  );
}

export const mediaApi = {
  uploadProfileImage,
  uploadProfileCover,
  uploadProfileGallery,
  uploadClubImage,
  uploadClubGallery,
  uploadBikeImage,
  uploadRideMedia,
  uploadListingImage,
  deleteMedia,
};
