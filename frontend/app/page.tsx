"use client"

import Link from "next/link"
import { CustomButton } from "@/components/custom-button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroCarousel } from "@/components/hero-carousel"
import { ShoppingBag, MapPin, Zap, Lock, TrendingUp, Truck } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export default function Home() {
  const { user, isAuthenticated } = useAuth()
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-hero">
        {/* Hero Section */}
        <section className="py-12 sm:py-20 container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Tus compras entregadas <span className="text-primary">frescas y rápidas</span>
                </h1>
              </div>
              <p className="text-lg text-muted-foreground max-w-lg">
                Compra fácilmente en tu supermercado favorito, ahida tus productos al carrito y recibe tus compras
                entregadas por nuestros Choppers dedicados, ya sea para ti o para enviar a tus familias.
              </p>
              <div className="flex gap-4 pt-2">
                {!isAuthenticated && (
                  <Link href="/login">
                    <CustomButton size="lg">Inicia Sesión</CustomButton>
                  </Link>
                )}
                <Link href="/stores">
                  <CustomButton variant={isAuthenticated ? "primary" : "outline"} size="lg">
                    Explorar Tiendas
                  </CustomButton>
                </Link>
              </div>
            </div>

            <div className="hidden lg:block">
              <HeroCarousel />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-card border-t border-border">
          <div className="container-main">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">¿Por qué elegir Choppi?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: ShoppingBag,
                  title: "Múltiples Supermercados",
                  desc: "Compra en todos tus locales favoritos en un solo lugar",
                },
                { icon: Truck, title: "Entrega Rápida", desc: "Recibe tus compras en la puerta de tu casa en minutos" },
                {
                  icon: TrendingUp,
                  title: "Mejores Precios",
                  desc: "Compara precios entre mercados y obtén las mejores ofertas",
                },
                {
                  icon: MapPin,
                  title: "Seguimiento en Vivo",
                  desc: "Rastrea tu pedido en tiempo real directamente con tu Chopper",
                },
                { icon: Lock, title: "Pagos Seguros", desc: "Múltiples opciones de pago seguro para tu tranquilidad" },
                {
                  icon: Zap,
                  title: "Productos Frescos",
                  desc: "Todos nuestros Choppers seleccionan cuidadosamente tus productos",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="group p-6 rounded-2xl bg-background border border-border hover:bg-primary hover:border-primary hover:shadow-ambient hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <feature.icon className="w-10 h-10 text-primary mb-3 transition-colors group-hover:text-white" />
                  <h3 className="font-bold text-foreground mb-2 transition-colors group-hover:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground transition-colors group-hover:text-white/90">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 container-main">
          <div className="bg-gradient-orange rounded-3xl p-12 text-center space-y-6">
            <h2 className="text-3xl font-bold text-foreground">
              {isAuthenticated && user ? `¿Listo para comprar, ${user.name ? user.name.split(' ')[0] : user.email?.split('@')[0] || 'Usuario'}?` : "¿Listo para comprar?"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto whitespace-nowrap">
              Comienza a explorar nuestras tiendas y encuentra todo lo que necesitas
            </p>
            <Link href="/stores">
              <CustomButton size="lg">Explorar Ahora</CustomButton>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
