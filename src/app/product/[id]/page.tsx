import { ProductDetailPageClient } from './ProductDetailPageClient'

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return <ProductDetailPageClient id={params.id} />
}
