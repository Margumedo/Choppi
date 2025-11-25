import Link from "next/link"
import { Card } from "./card"
import { Badge } from "./badge"

interface ProductCardProps {
  id: string
  name: string
  image?: string
  price: number
  storeName?: string
  inStock?: boolean
}

export function ProductCard({ id, name, image, price, storeName, inStock = true, storeId }: ProductCardProps & { storeId?: string }) {
  return (
    <Link href={storeId ? `/stores/${storeId}/products/${id}` : `/products/${id}`}>
      <Card className="cursor-pointer h-full flex flex-col hover:shadow-lg transition-all duration-200">
        <div className="relative aspect-square bg-muted overflow-hidden">
          {image ? (
            <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-orange flex items-center justify-center">
              <span className="text-4xl">📦</span>
            </div>
          )}
          {!inStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white font-bold">Agotado</span>
            </div>
          )}
          {storeName && (
            <div className="absolute top-2 left-2">
              <Badge variant="store" className="text-xs">
                {storeName}
              </Badge>
            </div>
          )}
        </div>
        <div className="flex-1 p-3 flex flex-col">
          <h3 className="font-bold text-foreground line-clamp-2 text-sm">{name}</h3>
          <div className="mt-auto pt-2 flex items-center justify-between">
            <span className="text-lg font-bold text-primary">${price.toFixed(2)}</span>
            <span className="text-xs text-muted-foreground">ud</span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
