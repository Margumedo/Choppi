"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { CustomButton } from "@/components/custom-button"
import { Badge } from "@/components/badge"
import { QuantitySelector } from "@/components/quantity-selector"
import { ChevronLeft, Heart, Share2 } from "lucide-react"

const PRODUCT = {
  id: "1",
  name: "Queso Bufalinda Mozzarella 400GR",
  description:
    "Queso mozzarella fresco de la mejor calidad. Perfecta para ensaladas, pizzas y muchos otros platillos. Mantiene su sabor fresco y cremoso.",
  price: 7.41,
  image: "/placeholder.svg?key=91qci",
  store: "Luvebras",
  inStock: true,
  rating: 4.8,
  reviews: 124,
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  const handleAddToCart = () => {
    alert(`Agregaste ${quantity} de ${PRODUCT.name} al carrito`)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-8">
        <div className="container-main max-w-2xl">
          {/* Back Button */}
          <Link href="/stores/1">
            <button className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity mb-6">
              <ChevronLeft size={20} />
              Volver a la tienda
            </button>
          </Link>

          {/* Product Image */}
          <div className="bg-card rounded-2xl overflow-hidden mb-6 shadow-ambient">
            <div className="aspect-square bg-gradient-orange flex items-center justify-center">
              <img
                src={PRODUCT.image || "/placeholder.svg"}
                alt={PRODUCT.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Store Badge */}
          <div className="mb-4">
            <Badge variant="store">{PRODUCT.store}</Badge>
          </div>

          {/* Product Info */}
          <div className="space-y-4 mb-8">
            <h1 className="text-3xl font-bold text-foreground">{PRODUCT.name}</h1>

            <div className="flex items-center gap-2">
              <span className="text-sm text-primary">★ {PRODUCT.rating}</span>
              <span className="text-sm text-muted-foreground">({PRODUCT.reviews} opiniones)</span>
            </div>

            <div className="text-4xl font-bold text-primary">
              ${PRODUCT.price.toFixed(2)}
              <span className="text-sm text-muted-foreground ml-2">ud</span>
            </div>

            <p className="text-muted-foreground leading-relaxed">{PRODUCT.description}</p>

            {!PRODUCT.inStock && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-2 rounded-lg text-sm font-medium">
                Este producto actualmente está agotado
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-4">
            {/* Quantity Selector */}
            <div className="flex items-center justify-between">
              <span className="font-medium text-foreground">Cantidad:</span>
              <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
            </div>

            {/* Add to Cart Button */}
            <CustomButton size="xl" onClick={handleAddToCart} disabled={!PRODUCT.inStock}>
              Agregar al Carrito
            </CustomButton>

            {/* Other Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="flex-1 border-2 border-border rounded-2xl py-3 font-medium text-foreground hover:bg-muted transition-colors flex items-center justify-center gap-2"
              >
                <Heart
                  size={20}
                  fill={isFavorite ? "currentColor" : "none"}
                  color={isFavorite ? "rgb(239, 68, 68)" : "currentColor"}
                />
                {isFavorite ? "Favorito" : "Agregar a Favoritos"}
              </button>
              <button className="flex-1 border-2 border-border rounded-2xl py-3 font-medium text-foreground hover:bg-muted transition-colors flex items-center justify-center gap-2">
                <Share2 size={20} />
                Compartir
              </button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 pt-8 border-t border-border space-y-4">
            <h2 className="text-xl font-bold text-foreground">Información del Producto</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Peso</p>
                <p className="font-semibold text-foreground">400 GR</p>
              </div>
              <div>
                <p className="text-muted-foreground">Tipo</p>
                <p className="font-semibold text-foreground">Queso Fresco</p>
              </div>
              <div>
                <p className="text-muted-foreground">Marca</p>
                <p className="font-semibold text-foreground">Bufalinda</p>
              </div>
              <div>
                <p className="text-muted-foreground">Disponibilidad</p>
                <p className="font-semibold text-secondary">En Stock</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
