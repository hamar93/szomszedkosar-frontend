// src/app/product/[id]/page.tsx

import ProductDetailPageClient from './ProductDetailPageClient'

type Props = {
  params: {
    id: string
  }
}

export default function ProductDetailPage({ params }: Props) {
  return <ProductDetailPageClient id={params.id} />
}
