'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Package, Plus, Loader2, Tag, MoreHorizontal, Trash2, CheckCircle2, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'
import { marketplaceApi } from '@/lib/services'
import type { Listing } from '@/store/slices/marketplaceSlice'

export default function BrandProductsPage() {
  const { success: successToast, error: errorToast } = useToast()
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState<Listing | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const { listings: myListings } = await marketplaceApi.getMyListings()
        setListings(myListings)
      } catch {
        // no-op — show empty state
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleMarkAsSold = async (listing: Listing) => {
    setActionLoading(listing.id)
    try {
      const { listing: updated } = await marketplaceApi.markAsSold(listing.id)
      setListings((prev) => prev.map((l) => l.id === updated.id ? { ...l, isSold: true } : l))
      successToast('Marked as sold')
    } catch {
      errorToast('Failed to update listing')
    } finally {
      setActionLoading(null)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setActionLoading(deleteTarget.id)
    try {
      await marketplaceApi.deleteListing(deleteTarget.id)
      setListings((prev) => prev.filter((l) => l.id !== deleteTarget.id))
      successToast('Product removed')
    } catch {
      errorToast('Failed to delete product')
    } finally {
      setActionLoading(null)
      setDeleteTarget(null)
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Products</h2>
        <Button className="bg-amber-500 hover:bg-amber-600 text-white" asChild>
          <Link href="/brand/products/create">
            <Plus className="w-4 h-4 mr-2" /> Add Product
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
        </div>
      ) : listings.length === 0 ? (
        <Card className="border-dashed border-2">
          <CardContent className="py-20 text-center">
            <Package className="w-14 h-14 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">No products yet</h3>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto mb-6">
              Add products to list them on the Zoomies marketplace and reach riders across India.
            </p>
            <Button className="bg-amber-500 hover:bg-amber-600 text-white" asChild>
              <Link href="/brand/products/create">
                <Plus className="w-4 h-4 mr-2" /> Add your first product
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {listings.map((l) => (
            <Card key={l.id} className={`overflow-hidden ${l.isSold ? 'opacity-70' : ''}`}>
              <div className="relative">
                {l.images?.[0] ? (
                  <img src={l.images[0]} alt={l.title} className="w-full h-40 object-cover" />
                ) : (
                  <div className="w-full h-40 bg-muted flex items-center justify-center">
                    <Package className="w-10 h-10 text-muted-foreground/30" />
                  </div>
                )}
                {l.isSold && (
                  <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                    <span className="bg-background text-sm font-semibold px-3 py-1 rounded-full border">Sold</span>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium truncate flex-1">{l.title}</p>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0 -mr-1 -mt-0.5">
                        {actionLoading === l.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <MoreHorizontal className="w-3.5 h-3.5" />
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/marketplace/${l.id}`} className="flex items-center gap-2">
                          <ExternalLink className="w-4 h-4" /> View listing
                        </Link>
                      </DropdownMenuItem>
                      {!l.isSold && (
                        <DropdownMenuItem onClick={() => handleMarkAsSold(l)}>
                          <CheckCircle2 className="w-4 h-4 mr-2" /> Mark as sold
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => setDeleteTarget(l)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm font-bold text-amber-500">₹{l.price.toLocaleString()}</span>
                  {l.condition && (
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Tag className="w-3 h-3" /> {l.condition}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation */}
      <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete product?</DialogTitle>
            <DialogDescription>
              <span className="font-medium">{deleteTarget?.title}</span> will be permanently removed from the marketplace. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)} disabled={!!actionLoading}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={!!actionLoading}>
              {actionLoading ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Deleting...</> : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
