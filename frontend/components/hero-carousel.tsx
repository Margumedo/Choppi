"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function HeroCarousel() {
  const [current, setCurrent] = useState(0)

  const slides = [
    {
      image: "/images/carousel/branded-bags.jpg",
      alt: "Bolsas de compra Choppi con productos frescos",
    },
    {
      image: "/images/carousel/branded-delivery.jpg",
      alt: "Delivery Choppi entregando pedidos con sonrisa",
    },
    {
      image: "/images/carousel/branded-cashier.jpg",
      alt: "Empleados Choppi con uniforme atendiendo amablemente",
    },
    {
      image: "/images/carousel/branded-elderly.jpg",
      alt: "Adultos mayores felices recibiendo su pedido Choppi",
    },
    {
      image: "/images/carousel/branded-kids-gaming.jpg",
      alt: "Niños jugando videojuegos con snacks Choppi",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const prev = () => setCurrent((current - 1 + slides.length) % slides.length)
  const next = () => setCurrent((current + 1) % slides.length)

  return (
    <div className="relative aspect-square bg-gradient-orange rounded-3xl overflow-hidden shadow-ambient group">
      {/* Carousel Images */}
      <div className="relative w-full h-full">
        {slides.map((slide, i) => (
          <img
            key={i}
            src={slide.image || "/placeholder.svg"} // Updated to use static image path
            alt={slide.alt}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 hover:bg-white rounded-full transition-all opacity-0 group-hover:opacity-100"
        aria-label="Anterior"
      >
        <ChevronLeft size={24} className="text-foreground" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 hover:bg-white rounded-full transition-all opacity-0 group-hover:opacity-100"
        aria-label="Siguiente"
      >
        <ChevronRight size={24} className="text-foreground" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? "bg-white w-8" : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Ir a slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
