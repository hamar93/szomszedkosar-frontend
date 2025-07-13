// src/app/product/[id]/page.tsx

import ProductDetailPageClient from './ProductDetailPageClient'

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params
  return <ProductDetailPageClient id={id} />
}