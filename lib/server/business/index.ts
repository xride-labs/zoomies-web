import { apiAuthenticated } from '../base'

export type BusinessCategory =
  | 'BRAND'
  | 'GEAR_SELLER'
  | 'HELMET_SELLER'
  | 'PARTS_SELLER'
  | 'MARKETPLACE_SELLER'
  | 'CLUB'
  | 'SERVICE_STORE'
  | 'MECHANIC'
  | 'CONSULTATION'

export type BusinessVerificationStatus = 'PENDING' | 'SUBMITTED' | 'APPROVED' | 'REJECTED'

export type AdStatus = 'DRAFT' | 'PENDING_APPROVAL' | 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'REJECTED'

export type AdSlot =
  | 'HOME_FEED'
  | 'DISCOVER_TOP'
  | 'MARKETPLACE_INLINE'
  | 'CHAT_LIST_TOP'
  | 'POST_RIDE_SUMMARY'

export interface BusinessDocument {
  type: string
  url: string
  uploadedAt: string
}

export interface BusinessProfile {
  id: string
  ownerId: string
  categories: BusinessCategory[]
  displayName: string
  slug: string
  tagline?: string | null
  description?: string | null
  logoUrl?: string | null
  bannerUrl?: string | null
  phone?: string | null
  email?: string | null
  websiteUrl?: string | null
  addressLine1?: string | null
  addressLine2?: string | null
  city?: string | null
  region?: string | null
  country?: string | null
  latitude?: number | null
  longitude?: number | null
  pricingTier?: 'BASIC' | 'PRO' | 'ENTERPRISE' | null
  brandTier: 'FREE' | 'PRO'
  brandProExpiresAt?: string | null
  verification: BusinessVerificationStatus
  verificationNotes?: string | null
  documents?: BusinessDocument[] | null
  createdAt: string
  updatedAt: string
}

export interface BrandBillingStatus {
  tier: 'FREE' | 'PRO'
  expiresAt: string | null
}

export interface AdCampaign {
  id: string
  businessId: string
  title: string
  ctaLabel: string
  ctaUrl?: string | null
  deepLink?: string | null
  imageUrl: string
  videoUrl?: string | null
  startsAt: string
  endsAt: string
  budgetPaise: number
  slots: AdSlot[]
  targetTags: string[]
  impressionCap?: number | null
  impressionCount: number
  clickCount: number
  status: AdStatus
  createdAt: string
  updatedAt: string
}

export interface Discount {
  id: string
  businessId: string
  code?: string | null
  title: string
  description?: string | null
  imageUrl?: string | null
  percentOff?: number | null
  amountOffPaise?: number | null
  validFrom: string
  validUntil: string
  appliesTo?: unknown
  isFeatured: boolean
  createdAt: string
  updatedAt: string
}

export interface BusinessAnalytics {
  campaigns: number
  discounts: number
  listings: number
  totalImpressions: number
  totalClicks: number
}

export interface BusinessListParams {
  category?: BusinessCategory
  search?: string
  page?: number
  limit?: number
}

export interface BusinessListResponse {
  items: BusinessProfile[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface CreateBusinessInput {
  categories: BusinessCategory[]
  displayName: string
  tagline?: string
}

export interface UpdateBusinessInput {
  categories?: BusinessCategory[]
  displayName?: string
  tagline?: string | null
  description?: string | null
  logoUrl?: string | null
  bannerUrl?: string | null
  phone?: string | null
  email?: string | null
  websiteUrl?: string | null
  addressLine1?: string | null
  addressLine2?: string | null
  city?: string | null
  region?: string | null
  country?: string | null
  latitude?: number | null
  longitude?: number | null
  pricingTier?: 'BASIC' | 'PRO' | 'ENTERPRISE' | null
}

export interface CreateCampaignInput {
  title: string
  ctaLabel: string
  ctaUrl?: string | null
  deepLink?: string | null
  imageUrl: string
  videoUrl?: string | null
  startsAt: string
  endsAt: string
  budgetPaise?: number
  slots: AdSlot[]
  targetTags?: string[]
  impressionCap?: number | null
}

export interface CreateDiscountInput {
  code?: string | null
  title: string
  description?: string | null
  imageUrl?: string | null
  percentOff?: number | null
  amountOffPaise?: number | null
  validFrom: string
  validUntil: string
  appliesTo?: unknown
  isFeatured?: boolean
}

// ─── Business CRUD ──────────────────────────────────────────────────────────

export async function listBusinesses(params?: BusinessListParams): Promise<BusinessListResponse> {
  return apiAuthenticated.get<BusinessListResponse>('/business', { params })
}

export async function getMyBusinesses(): Promise<BusinessProfile[]> {
  return apiAuthenticated.get<BusinessProfile[]>('/business/me')
}

export async function getBusiness(id: string): Promise<BusinessProfile> {
  return apiAuthenticated.get<BusinessProfile>(`/business/${id}`)
}

export async function createBusiness(data: CreateBusinessInput): Promise<BusinessProfile> {
  return apiAuthenticated.post<BusinessProfile>('/business', data)
}

export async function updateBusiness(id: string, data: UpdateBusinessInput): Promise<BusinessProfile> {
  return apiAuthenticated.patch<BusinessProfile>(`/business/${id}`, data)
}

export async function submitBusiness(id: string): Promise<BusinessProfile> {
  return apiAuthenticated.post<BusinessProfile>(`/business/${id}/submit`)
}

export async function attachBusinessDocuments(id: string, documents: BusinessDocument[]): Promise<BusinessProfile> {
  return apiAuthenticated.post<BusinessProfile>(`/business/${id}/documents`, { documents })
}

// ─── Analytics ──────────────────────────────────────────────────────────────

export async function getBusinessAnalytics(id: string): Promise<BusinessAnalytics> {
  return apiAuthenticated.get<BusinessAnalytics>(`/business/${id}/analytics`)
}

// ─── Listings ───────────────────────────────────────────────────────────────

export interface BusinessListingsResponse {
  items: MarketplaceListing[]
  pagination: { page: number; limit: number; total: number; totalPages: number }
}

export interface MarketplaceListing {
  id: string
  title: string
  price?: number | null
  images?: string[]
  condition?: string | null
  category?: string | null
  createdAt: string
}

export async function getBusinessListings(id: string, page = 1, limit = 20): Promise<BusinessListingsResponse> {
  return apiAuthenticated.get<BusinessListingsResponse>(`/business/${id}/listings`, { params: { page, limit } })
}

// ─── Campaigns ──────────────────────────────────────────────────────────────

export async function getCampaigns(businessId: string): Promise<AdCampaign[]> {
  return apiAuthenticated.get<AdCampaign[]>(`/business/${businessId}/campaigns`)
}

export async function createCampaign(businessId: string, data: CreateCampaignInput): Promise<AdCampaign> {
  return apiAuthenticated.post<AdCampaign>(`/business/${businessId}/campaigns`, data)
}

export async function updateCampaign(businessId: string, campaignId: string, data: Partial<CreateCampaignInput>): Promise<AdCampaign> {
  return apiAuthenticated.patch<AdCampaign>(`/business/${businessId}/campaigns/${campaignId}`, data)
}

export async function deleteCampaign(businessId: string, campaignId: string): Promise<void> {
  return apiAuthenticated.delete<void>(`/business/${businessId}/campaigns/${campaignId}`)
}

// ─── Discounts ──────────────────────────────────────────────────────────────

export async function getDiscounts(businessId: string): Promise<Discount[]> {
  return apiAuthenticated.get<Discount[]>(`/business/${businessId}/discounts`)
}

export async function createDiscount(businessId: string, data: CreateDiscountInput): Promise<Discount> {
  return apiAuthenticated.post<Discount>(`/business/${businessId}/discounts`, data)
}

export async function updateDiscount(businessId: string, discountId: string, data: Partial<CreateDiscountInput>): Promise<Discount> {
  return apiAuthenticated.patch<Discount>(`/business/${businessId}/discounts/${discountId}`, data)
}

export async function deleteDiscount(businessId: string, discountId: string): Promise<void> {
  return apiAuthenticated.delete<void>(`/business/${businessId}/discounts/${discountId}`)
}

// ─── Brand Billing ───────────────────────────────────────────────────────────

export async function getBrandBillingStatus(businessId: string): Promise<BrandBillingStatus> {
  return apiAuthenticated.get<BrandBillingStatus>(`/payments/brand-status/${businessId}`)
}

export async function createBrandCheckout(businessId: string): Promise<{ checkoutUrl: string }> {
  return apiAuthenticated.post<{ checkoutUrl: string }>('/payments/brand-checkout', { businessId })
}

export const businessApi = {
  listBusinesses,
  getMyBusinesses,
  getBusiness,
  createBusiness,
  updateBusiness,
  submitBusiness,
  attachBusinessDocuments,
  getBusinessAnalytics,
  getBusinessListings,
  getCampaigns,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  getDiscounts,
  createDiscount,
  updateDiscount,
  deleteDiscount,
  getBrandBillingStatus,
  createBrandCheckout,
}
