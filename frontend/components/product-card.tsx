"use client"

import Link from "next/link"
import { Card } from "./card"
import { Badge } from "./badge"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useState } from "react"

interface ProductCardProps {
  id: string
  name: string
  image?: string
  price: number
  storeName?: string
  inStock?: boolean
  storeId?: string
  productId?: string
}

export function ProductCard({ id, name, image, price, storeName, inStock = true, storeId, productId }: ProductCardProps) {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation to product detail
    e.stopPropagation()

    if (!inStock || isAdding) return

    setIsAdding(true)
    addToCart({
      id, // storeProductId
      productId: productId || id,
      name,
      price,
      image: image || "/placeholder.svg",
      storeName: storeName || "Tienda",
      storeId: storeId || "",
    })

    // Reset button state after animation
    setTimeout(() => setIsAdding(false), 1000)
  }

  return (
    <Link href={storeId ? `/stores/${storeId}/products/${id}` : `/products/${id}`}>
      <Card className="cursor-pointer h-full flex flex-col hover:shadow-lg transition-all duration-200 group">
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

          {/* Add to Cart Button - appears on hover */}
          <button
            onClick={handleAddToCart}
            disabled={!inStock || isAdding}
            className={`absolute bottom-2 right-2 p-2 rounded-lg transition-all duration-200 ${!inStock
                ? "opacity-0"
                : "bg-primary text-white shadow-lg opacity-0 group-hover:opacity-100 hover:scale-110 disabled:opacity-50"
              }`}
            aria-label="Agregar al carrito"
          >
            <ShoppingCart size={18} className={isAdding ? "animate-bounce" : ""} />
          </button>
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
