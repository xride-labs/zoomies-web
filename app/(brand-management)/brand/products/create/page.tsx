'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'
import { apiAuthenticated } from '@/lib/server/base'

const CONDITIONS = ['New', 'Like New', 'Good', 'Fair', 'For Parts']
const CATEGORIES = [
  'Helmet', 'Jacket', 'Gloves', 'Boots', 'Pants',
  'Engine Parts', 'Exhaust', 'Tyres', 'Accessories',
  'Electronics', 'Tools', 'Other',
]

export default function CreateProductPage() {
  const router = useRouter()
  const { success: successToast, error: errorToast } = useToast()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: 'New',
    location: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim() || !form.price) {
      errorToast('Title and price are required')
      return
    }
    setLoading(true)
    try {
      await apiAuthenticated.post('/marketplace', {
        title: form.title,
        description: form.description || undefined,
        price: parseFloat(form.price),
        category: form.category || undefined,
        condition: form.condition,
        location: form.location || undefined,
      })
      successToast('Product listed!', { description: 'Your product is now live on the marketplace.' })
      router.push('/brand/products')
    } catch (err) {
      errorToast(err instanceof Error ? err.message : 'Failed to create listing')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/brand/products"><ArrowLeft className="w-4 h-4" /></Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold">Add Product</h2>
          <p className="text-sm text-muted-foreground">List a product on the Zoomies marketplace</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Product Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>Title</Label>
              <Input
                placeholder="e.g. AGV K6 Helmet — Size M"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label>Description <span className="text-muted-foreground text-xs">(optional)</span></Label>
              <Textarea
                rows={3}
                placeholder="Describe your product..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Price (₹)</Label>
                <Input
                  type="number"
                  placeholder="e.g. 4999"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label>Location <span className="text-muted-foreground text-xs">(optional)</span></Label>
                <Input
                  placeholder="e.g. Mumbai"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Category</Label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setForm({ ...form, category: cat })}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      form.category === cat
                        ? 'border-amber-500 bg-amber-500/10 text-amber-500'
                        : 'border-border text-muted-foreground hover:border-amber-500/50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Condition</Label>
              <div className="flex gap-2 flex-wrap">
                {CONDITIONS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setForm({ ...form, condition: c })}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      form.condition === c
                        ? 'border-amber-500 bg-amber-500/10 text-amber-500'
                        : 'border-border text-muted-foreground hover:border-amber-500/50'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Button
          type="submit"
          className="w-full bg-amber-500 hover:bg-amber-600 text-white h-12"
          disabled={loading}
        >
          {loading ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Listing product...</> : 'List Product'}
        </Button>
      </form>
    </div>
  )
}
