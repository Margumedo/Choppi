"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { CustomButton } from "@/components/custom-button"
import { Badge } from "@/components/badge"
import { QuantitySelector } from "@/components/quantity-selector"
import { ChevronLeft, Heart, Share2 } from "lucide-react"
import api from "@/lib/api"
import { toast } from "sonner"
import { useCart } from "@/hooks/use-cart"

interface StoreProduct {
  id: string;
  price: string;
  stock: number;
  store: {
    id: string;
    name: string;
  };
  product: {
    id: string;
    name: string;
    description: string;
    image: string;
    sku?: string;
  };
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string; productId: string }> }) {
  const { id, productId } = use(params);
  const [productData, setProductData] = useState<StoreProduct | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/stores/${id}/products/${productId}`);
        setProductData(response.data);
      } catch (error) {
        toast.error("Error al cargar el producto");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id, productId])

  const handleAddToCart = () => {
    if (!productData) return;

    addToCart({
      id: productData.id, // storeProductId
      productId: productData.product.id,
      name: productData.product.name,
      price: Number(productData.price),
      image: productData.product.image || "/placeholder.svg",
      storeName: productData.store.name,
      storeId: productData.store.id,
    }, quantity)
    toast.success(`Agregaste ${quantity} de ${productData.product.name} al carrito`)
  }

  if (loading) return <div className="text-center py-20">Cargando producto...</div>
  if (!productData) return <div className="text-center py-20">Producto no encontrado</div>

  const { product, price, stock, store } = productData;
  const inStock = stock > 0;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-8">
        <div className="container-main max-w-2xl">
          {/* Back Button */}
          <Link href={`/stores/${id}`}>
            <button className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity mb-6">
              <ChevronLeft size={20} />
              Volver a la tienda
            </button>
          </Link>

          {/* Product Image */}
          <div className="bg-card rounded-2xl overflow-hidden mb-6 shadow-ambient">
            <div className="aspect-square bg-gradient-orange flex items-center justify-center">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Store Badge */}
          <div className="mb-4">
            <Badge variant="store">{store.name}</Badge>
          </div>

          {/* Product Info */}
          <div className="space-y-4 mb-8">
            <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>

            <div className="flex items-center gap-2">
              <span className="text-sm text-primary">★ 4.8</span>
              <span className="text-sm text-muted-foreground">(124 opiniones)</span>
            </div>

            <div className="text-4xl font-bold text-primary">
              ${Number(price).toFixed(2)}
              <span className="text-sm text-muted-foreground ml-2">ud</span>
            </div>

            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            {!inStock && (
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
              <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} maxQuantity={stock} />
            </div>

            {/* Add to Cart Button */}
            <CustomButton size="xl" onClick={handleAddToCart} disabled={!inStock}>
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
                <p className="text-muted-foreground">SKU</p>
                <p className="font-semibold text-foreground">{(product as any).sku || 'N/A'}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Categoría</p>
                <p className="font-semibold text-foreground">General</p>
              </div>
              <div>
                <p className="text-muted-foreground">Tienda</p>
                <p className="font-semibold text-foreground">{store.name}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Disponibilidad</p>
                <p className={`font-semibold ${inStock ? 'text-secondary' : 'text-destructive'}`}>
                  {inStock ? 'En Stock' : 'Agotado'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
