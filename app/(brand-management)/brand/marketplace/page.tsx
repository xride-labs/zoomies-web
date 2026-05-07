'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShoppingBag, Plus } from 'lucide-react'
import Link from 'next/link'

export default function BrandMarketplacePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Marketplace Listings</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage your active listings on the Zoomies marketplace</p>
        </div>
        <Button className="bg-amber-500 hover:bg-amber-600 text-white" asChild>
          <Link href="/brand/products/create">
            <Plus className="w-4 h-4 mr-2" /> New Listing
          </Link>
        </Button>
      </div>

      <Card className="border-dashed border-2">
        <CardContent className="py-20 text-center">
          <ShoppingBag className="w-14 h-14 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">No active listings</h3>
          <p className="text-muted-foreground text-sm max-w-xs mx-auto mb-6">
            Approved products automatically appear as marketplace listings once your brand is verified.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
