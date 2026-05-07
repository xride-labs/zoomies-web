'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Upload, CheckCircle2, Clock, AlertCircle, Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { businessApi, type BusinessProfile, type BusinessCategory } from '@/lib/server/business'

const BRAND_CATEGORIES: { value: BusinessCategory; label: string }[] = [
  { value: 'BRAND', label: 'Brand / Manufacturer' },
  { value: 'GEAR_SELLER', label: 'Gear & Apparel' },
  { value: 'HELMET_SELLER', label: 'Helmet Seller' },
  { value: 'PARTS_SELLER', label: 'Parts & Accessories' },
  { value: 'MARKETPLACE_SELLER', label: 'Marketplace Seller' },
  { value: 'SERVICE_STORE', label: 'Service & Repair' },
  { value: 'MECHANIC', label: 'Independent Mechanic' },
  { value: 'CONSULTATION', label: 'Consultation' },
]

type VerificationStatus = 'PENDING' | 'SUBMITTED' | 'APPROVED' | 'REJECTED'

const VERIFICATION_CONFIG: Record<VerificationStatus, { label: string; color: string; icon: React.ElementType }> = {
  PENDING: { label: 'Not submitted', color: 'text-muted-foreground', icon: Clock },
  SUBMITTED: { label: 'Under review', color: 'text-amber-500', icon: Clock },
  APPROVED: { label: 'Verified', color: 'text-green-500', icon: CheckCircle2 },
  REJECTED: { label: 'Rejected', color: 'text-destructive', icon: AlertCircle },
}

export default function BrandSettingsPage() {
  const { success: successToast, error: errorToast } = useToast()
  const [business, setBusiness] = useState<BusinessProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [profile, setProfile] = useState({
    displayName: '',
    tagline: '',
    categories: [] as BusinessCategory[],
    email: '',
    phone: '',
    websiteUrl: '',
    city: '',
    country: 'India',
    description: '',
  })

  useEffect(() => {
    async function load() {
      try {
        const businesses = await businessApi.getMyBusinesses()
        if (businesses.length > 0) {
          const b = businesses[0]
          setBusiness(b)
          setProfile({
            displayName: b.displayName ?? '',
            tagline: b.tagline ?? '',
            categories: b.categories ?? [],
            email: b.email ?? '',
            phone: b.phone ?? '',
            websiteUrl: b.websiteUrl ?? '',
            city: b.city ?? '',
            country: b.country ?? 'India',
            description: b.description ?? '',
          })
        }
      } catch {
        errorToast('Failed to load brand profile')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [errorToast])

  const toggleCategory = (cat: BusinessCategory) => {
    setProfile((p) => ({
      ...p,
      categories: p.categories.includes(cat)
        ? p.categories.filter((c) => c !== cat)
        : [...p.categories, cat],
    }))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!business) return
    setIsSaving(true)
    try {
      const updated = await businessApi.updateBusiness(business.id, {
        displayName: profile.displayName || undefined,
        tagline: profile.tagline || null,
        categories: profile.categories.length > 0 ? profile.categories : undefined,
        email: profile.email || null,
        phone: profile.phone || null,
        websiteUrl: profile.websiteUrl || null,
        city: profile.city || null,
        country: profile.country || null,
        description: profile.description || null,
      })
      setBusiness(updated)
      successToast('Brand profile saved')
    } catch {
      errorToast('Failed to save profile')
    } finally {
      setIsSaving(false)
    }
  }

  const handleSubmitVerification = async () => {
    if (!business) return
    setIsSubmitting(true)
    try {
      const updated = await businessApi.submitBusiness(business.id)
      setBusiness(updated)
      successToast('Submitted for verification!', { description: 'Admin will review your profile within 2-3 business days.' })
    } catch (err) {
      errorToast(err instanceof Error ? err.message : 'Submission failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      </div>
    )
  }

  const verificationStatus = (business?.verification ?? 'PENDING') as VerificationStatus
  const vCfg = VERIFICATION_CONFIG[verificationStatus]
  const VIcon = vCfg.icon

  const canSubmit =
    verificationStatus === 'PENDING' || verificationStatus === 'REJECTED'

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      {/* Verification status */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <VIcon className={`w-5 h-5 ${vCfg.color}`} />
              <div>
                <p className="font-medium text-sm">Verification Status</p>
                <p className={`text-xs ${vCfg.color}`}>{vCfg.label}</p>
              </div>
            </div>
            {verificationStatus === 'PENDING' && (
              <Badge variant="outline" className="text-amber-500 border-amber-500/30">
                Action needed
              </Badge>
            )}
            {verificationStatus === 'REJECTED' && business?.verificationNotes && (
              <p className="text-xs text-destructive max-w-xs text-right">{business.verificationNotes}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Brand Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Brand Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-1.5">
                <Label>Brand Name</Label>
                <Input
                  placeholder="Your brand name"
                  value={profile.displayName}
                  onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                />
              </div>

              <div className="col-span-2 space-y-1.5">
                <Label>Categories <span className="text-muted-foreground text-xs">(select all that apply)</span></Label>
                <div className="flex flex-wrap gap-2">
                  {BRAND_CATEGORIES.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => toggleCategory(c.value)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                        profile.categories.includes(c.value)
                          ? 'border-amber-500 bg-amber-500/10 text-amber-500'
                          : 'border-border text-muted-foreground hover:border-amber-500/50'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="col-span-2 space-y-1.5">
                <Label>Tagline</Label>
                <Input
                  placeholder="e.g. Gear built for the road"
                  value={profile.tagline}
                  onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                />
              </div>
              <div className="col-span-2 space-y-1.5">
                <Label>Description</Label>
                <Textarea
                  rows={3}
                  placeholder="Tell riders about your brand..."
                  value={profile.description}
                  onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                />
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="contact@brand.com"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Phone</Label>
                <Input
                  placeholder="+91 98765 43210"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              </div>
              <div className="col-span-2 space-y-1.5">
                <Label>Website</Label>
                <Input
                  placeholder="https://yourbrand.com"
                  value={profile.websiteUrl}
                  onChange={(e) => setProfile({ ...profile, websiteUrl: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label>City</Label>
                <Input
                  placeholder="Mumbai"
                  value={profile.city}
                  onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Country</Label>
                <Input
                  placeholder="India"
                  value={profile.country}
                  onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white" disabled={isSaving}>
              {isSaving ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Saving...</> : 'Save Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Verification Documents */}
      <Card id="verification">
        <CardHeader>
          <CardTitle className="text-base">Verification Documents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Upload your business registration, GST certificate, or brand authorization letter to get verified and go live on the marketplace.
          </p>
          <div className="border-2 border-dashed rounded-xl p-8 text-center">
            <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground/50" />
            <p className="text-sm font-medium mb-1">Upload documents</p>
            <p className="text-xs text-muted-foreground">PDF, JPG, PNG up to 10MB each</p>
            <Button variant="outline" size="sm" className="mt-4">Choose Files</Button>
          </div>
          <Button
            className="w-full bg-amber-500 hover:bg-amber-600 text-white"
            disabled={!canSubmit || isSubmitting}
            onClick={handleSubmitVerification}
          >
            {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Submitting...</> : 'Submit for Verification'}
          </Button>
          {!canSubmit && (
            <p className="text-xs text-center text-muted-foreground">
              {verificationStatus === 'SUBMITTED' ? 'Already submitted — awaiting admin review' : 'Already verified'}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
