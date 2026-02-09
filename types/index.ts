// User roles matching Prisma schema
export type UserRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "CLUB_OWNER"
  | "USER"
  | "RIDER"
  | "SELLER";

export type ClubMemberRole = "MEMBER" | "OFFICER" | "ADMIN" | "FOUNDER";

export type RideStatus = "PLANNED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

export type RideParticipantStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "DECLINED"
  | "COMPLETED"
  | "CANCELLED";

export type ListingStatus = "ACTIVE" | "SOLD" | "INACTIVE";

export type PostType = "ride" | "content" | "listing" | "club-activity";

// User interface
export interface User {
  id: string;
  username: string | null;
  name: string | null;
  email: string | null;
  bloodType: string | null;
  emailVerified: Date | null;
  image: string | null;
  phone: string | null;
  phoneVerified: Date | null;
  bio: string | null;
  location: string | null;
  ridesCompleted: number | null;
  bikeType: string | null;
  bikeOwned: string | null;
  bikeOwnerSince: Date | null;
  bikeOdometer: number | null;
  bikeModifications: string | null;
  bikeOwnerAge: number | null;
  xpPoints: number | null;
  experienceLevel: string | null;
  levelOfActivity: string | null;
  reputationScore: number | null;
  affiliations: string | null;
  reminders: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

// Bike interface for user profile
export interface Bike {
  id: string;
  make: string;
  model: string;
  year: number;
  nickname?: string;
  image?: string;
}

// Club interfaces
export interface Club {
  id: string;
  name: string;
  description: string | null;
  location: string | null;
  establishedAt: Date | null;
  verified: boolean;
  image: string | null;
  coverImage: string | null;
  clubType: string | null;
  isPublic: boolean;
  memberCount: number;
  trophies: string[];
  trophyCount: number;
  gallery: string[];
  reputation: number | null;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClubMember {
  id: string;
  clubId: string;
  userId: string;
  role: ClubMemberRole;
  joinedAt: Date;
  user?: User;
}

export interface ClubWithDetails extends Club {
  owner: User;
  members: ClubMember[];
  pendingRequests?: ClubMember[];
}

// Ride interfaces
export interface Ride {
  id: string;
  title: string;
  description: string | null;
  startLocation: string;
  endLocation: string | null;
  experienceLevel: string | null;
  xpRequired: number | null;
  pace: string | null;
  distance: number | null;
  duration: number | null;
  scheduledAt: Date | null;
  status: RideStatus;
  chatGroupId: string | null;
  chatLocked: boolean;
  creatorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RideParticipant {
  id: string;
  rideId: string;
  userId: string;
  status: RideParticipantStatus;
  joinedAt: Date;
  user?: User;
}

export interface RideWithDetails extends Ride {
  creator: User;
  participants: RideParticipant[];
  participantCount: number;
}

// Marketplace interfaces
export interface MarketplaceListing {
  id: string;
  title: string;
  description: string | null;
  price: number;
  currency: string;
  images: string[];
  category: string | null;
  subcategory: string | null;
  specifications: string | null;
  condition: string | null;
  status: ListingStatus;
  sellerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  listingId: string;
  reviewerId: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
  updatedAt: Date;
  reviewer?: User;
}

export interface ListingWithDetails extends MarketplaceListing {
  seller: User;
  reviews: Review[];
  averageRating: number;
  reviewCount: number;
}

// Post interfaces
export interface Post {
  id: string;
  type: PostType;
  content: string | null;
  images: string[];
  authorId: string;
  rideId: string | null;
  listingId: string | null;
  clubId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Like {
  id: string;
  postId: string;
  userId: string;
  createdAt: Date;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  author?: User;
}

export interface PostWithDetails extends Post {
  author: User;
  likes: Like[];
  comments: Comment[];
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
}

// Follow interface
export interface Follow {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: Date;
}

// Chat interface
export interface ChatMessage {
  id: string;
  chatGroupId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  sender?: User;
}

// Admin dashboard stats
export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalClubs: number;
  totalRides: number;
  totalListings: number;
  newUsersToday: number;
  newUsersThisWeek: number;
  revenue: number;
}

// Notification interface
export interface Notification {
  id: string;
  userId: string;
  type:
    | "ride_invite"
    | "club_request"
    | "follow"
    | "like"
    | "comment"
    | "message"
    | "system";
  title: string;
  message: string;
  read: boolean;
  data?: Record<string, unknown>;
  createdAt: Date;
}
