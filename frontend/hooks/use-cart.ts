"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"

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

const CART_STORAGE_KEY = "choppi-cart"

export function useCart() {
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
                toast.success(`Actualizado: ${product.name}`)
                return prevItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            } else {
                // Add new product to cart
                toast.success(`Agregado al carrito: ${product.name}`)
                return [...prevItems, { ...product, quantity }]
            }
        })
    }

    const removeFromCart = (id: string) => {
        setItems((prevItems) => {
            const item = prevItems.find((i) => i.id === id)
            if (item) {
                toast.info(`Eliminado: ${item.name}`)
            }
            return prevItems.filter((item) => item.id !== id)
        })
    }

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(id)
        } else {
            setItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === id ? { ...item, quantity } : item
                )
            )
        }
    }

    const clearCart = () => {
        setItems([])
        toast.info("Carrito vacío")
    }

    const getCartCount = () => {
        return items.reduce((sum, item) => sum + item.quantity, 0)
    }

    const getSubtotal = () => {
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    }

    return {
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
