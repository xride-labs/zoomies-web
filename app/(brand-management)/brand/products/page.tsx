'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Package, Plus, Loader2, Tag } from 'lucide-react'
import Link from 'next/link'
import { businessApi, type MarketplaceListing } from '@/lib/server/business'

export default function BrandProductsPage() {
  const [listings, setListings] = useState<MarketplaceListing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const businesses = await businessApi.getMyBusinesses()
        if (businesses.length > 0) {
          const res = await businessApi.getBusinessListings(businesses[0].id)
          setListings(res.items)
        }
      } catch {
        // no-op
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

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
            <Card key={l.id} className="overflow-hidden">
              {l.images?.[0] ? (
                <img src={l.images[0]} alt={l.title} className="w-full h-40 object-cover" />
              ) : (
                <div className="w-full h-40 bg-muted flex items-center justify-center">
                  <Package className="w-10 h-10 text-muted-foreground/30" />
                </div>
              )}
              <CardContent className="p-4">
                <p className="font-medium truncate">{l.title}</p>
                <div className="flex items-center justify-between mt-1">
                  {l.price != null && (
                    <span className="text-sm font-bold text-amber-500">
                      ₹{l.price.toLocaleString()}
                    </span>
                  )}
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
    </div>
  )
}
