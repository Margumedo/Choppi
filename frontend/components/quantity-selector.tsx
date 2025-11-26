"use client"

import { Minus, Plus } from "lucide-react"

interface QuantitySelectorProps {
  quantity: number
  onQuantityChange: (qty: number) => void
  maxQuantity?: number
}

export function QuantitySelector({ quantity, onQuantityChange, maxQuantity = 999 }: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-3 bg-muted rounded-3xl p-2 w-fit">
      <button
        onClick={() => onQuantityChange(Math.max(quantity - 1, 1))}
        disabled={quantity <= 1}
        className="p-2 hover:bg-border rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Minus size={18} className="text-primary" />
      </button>

      <span className="w-8 text-center font-bold text-foreground">{quantity}</span>

      <button
        onClick={() => onQuantityChange(Math.min(quantity + 1, maxQuantity))}
        disabled={quantity >= maxQuantity}
        className="p-2 hover:bg-border rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Plus size={18} className="text-primary" />
      </button>
    </div>
  )
}
