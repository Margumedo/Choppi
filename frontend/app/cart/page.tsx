"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CustomButton } from "@/components/custom-button"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"
import { useCart, type CartItem } from "@/hooks/use-cart"
import { toast } from "sonner"

export default function CartPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const { items, updateQuantity, removeFromCart, getSubtotal, isLoaded } = useCart()

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [authLoading, isAuthenticated, router])

  if (authLoading || !isAuthenticated) {
    return null // Or a loading spinner
  }

  const subtotal = getSubtotal()
  const serviceFee = subtotal > 0 ? 1.5 : 0
  const total = subtotal + serviceFee

  if (!isLoaded) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <p className="text-muted-foreground">Cargando carrito...</p>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background">
        <div className="container-main py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Carrito de Compras</h1>
            <p className="text-muted-foreground">{items.length} producto(s) en el carrito</p>
          </div>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <ShoppingBag size={48} className="text-muted-foreground mb-4 opacity-50" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Carrito Vacío</h2>
              <p className="text-muted-foreground mb-8">Aún no tienes productos en tu carrito</p>
              <Link href="/stores">
                <CustomButton size="lg">Explorar Tiendas</CustomButton>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-card rounded-2xl border border-border hover:shadow-ambient transition-shadow"
                  >
                    {/* Image */}
                    <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = `/placeholder.svg?height=96&width=96&text=${encodeURIComponent(item.name)}`
                        }}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground mb-1">{item.storeName}</p>
                      <h3 className="font-bold text-foreground mb-2">{item.name}</h3>
                      <p className="font-bold text-primary">${item.price.toFixed(2)} ud</p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="p-2 hover:bg-muted rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Disminuir cantidad"
                      >
                        <Minus size={18} className="text-foreground" />
                      </button>
                      <span className="w-8 text-center font-bold text-foreground">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                        aria-label="Aumentar cantidad"
                      >
                        <Plus size={18} className="text-foreground" />
                      </button>
                      <button
                        onClick={() => {
                          removeFromCart(item.id)
                          toast.info(`Eliminado: ${item.name}`)
                        }}
                        className="p-2 hover:bg-destructive/10 rounded-lg transition-colors ml-4"
                        aria-label="Eliminar del carrito"
                      >
                        <Trash2 size={18} className="text-destructive" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="lg:col-span-1">
                <div className="p-6 bg-card rounded-2xl border border-border sticky top-20 space-y-4">
                  <h3 className="font-bold text-lg text-foreground">Resumen</h3>

                  <div className="space-y-3 border-t border-border pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Productos</span>
                      <span className="font-semibold text-foreground">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tarifa de servicio</span>
                      <span className="font-semibold text-foreground">${serviceFee.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4 flex justify-between">
                    <span className="font-bold text-foreground">Total</span>
                    <span className="font-bold text-lg text-primary">${total.toFixed(2)}</span>
                  </div>

                  <CustomButton className="w-full" size="lg">
                    Checkout
                  </CustomButton>

                  <Link href="/stores">
                    <button className="w-full py-2 text-center text-sm text-primary hover:bg-muted rounded-lg transition-colors">
                      Continuar Comprando
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}
