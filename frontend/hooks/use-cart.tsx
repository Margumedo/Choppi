"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export interface CartItem {
    id: string // storeProductId
    productId: string
    name: string
    price: number
    quantity: number
    image: string
    storeName: string
    storeId: string
}

interface CartContextType {
    items: CartItem[]
    addToCart: (product: Omit<CartItem, "quantity">, quantity?: number) => void
    removeFromCart: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
    getCartCount: () => number
    getSubtotal: () => number
    isLoaded: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = "choppi-cart"

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [isLoaded, setIsLoaded] = useState(false)

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY)
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart))
            } catch (e) {
                console.error("Failed to parse cart from localStorage", e)
            }
        }
        setIsLoaded(true)
    }, [])

    // Save to localStorage whenever items change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
        }
    }, [items, isLoaded])

    const addToCart = (product: Omit<CartItem, "quantity">, quantity: number = 1) => {
        setItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id)

            if (existingItem) {
                // Update quantity if product already in cart
                return prevItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            } else {
                // Add new product to cart
                return [...prevItems, { ...product, quantity }]
            }
        })
    }

    const removeFromCart = (id: string) => {
        setItems((prevItems) => {
            return prevItems.filter((item) => item.id !== id)
        })
    }

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity < 1) return // Prevent going below 1

        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        )
    }

    const clearCart = () => {
        setItems([])
    }

    const getCartCount = () => {
        return items.reduce((sum, item) => sum + item.quantity, 0)
    }

    const getSubtotal = () => {
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    }

    return (
        <CartContext.Provider
            value= {{
        items,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getCartCount,
            getSubtotal,
            isLoaded,
            }
}
        >
    { children }
    </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
