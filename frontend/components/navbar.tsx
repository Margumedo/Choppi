"use client"

import Link from "next/link"
import { Menu, ShoppingCart, MapPin } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { useAuth } from "@/hooks/use-auth"

interface NavbarProps {
  cartCount?: number
}

export function Navbar({ cartCount = 0 }: NavbarProps) {
  const { user, isAuthenticated, logout } = useAuth()
  const [isAnimating, setIsAnimating] = useState(false)
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    const timer1 = setTimeout(() => setIsAnimating(true), 500)
    const timer2 = setTimeout(() => setShowText(true), 1000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  return (
    <nav className="sticky top-0 z-40 bg-card border-b border-border shadow-ambient">
      <div className="container-main flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className={`transition-transform duration-700 ease-in-out ${isAnimating ? "rotate-[360deg]" : ""}`}>
            <Image src="/images/logo-icon.png" alt="Choppi Logo" width={32} height={32} className="object-contain" />
          </div>
          <span
            className={`font-bold text-2xl text-primary overflow-hidden transition-all duration-700 ease-in-out ${showText ? "max-w-[200px] opacity-100" : "max-w-0 opacity-0"
              }`}
          >
            Choppi
          </span>
        </Link>

        {/* Location */}
        <div className="hidden sm:flex items-center gap-2 text-muted-foreground text-sm">
          <MapPin size={16} />
          <span>Casa</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {isAuthenticated && user ? (
            <div className="hidden sm:flex items-center gap-4">
              <span className="text-sm font-medium text-foreground">
                Hola, <span className="text-primary">{user.name.split(' ')[0]}</span>
              </span>
              <button
                onClick={logout}
                className="text-sm text-muted-foreground hover:text-destructive transition-colors"
              >
                Salir
              </button>
            </div>
          ) : (
            <Link href="/login" className="hidden sm:inline text-foreground hover:text-primary transition-colors">
              Iniciar Sesión
            </Link>
          )}

          <Link href="/stores" className="hidden sm:inline text-foreground hover:text-primary transition-colors">
            Tiendas
          </Link>
          <button className="sm:hidden p-2 hover:bg-muted rounded-lg">
            <Menu size={24} className="text-foreground" />
          </button>
          <Link href="/cart" className="relative p-2 hover:bg-muted rounded-lg">
            <ShoppingCart size={24} className="text-foreground" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-destructive text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}
