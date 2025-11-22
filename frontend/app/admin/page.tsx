"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { CustomButton } from "@/components/custom-button"
import { CustomInput } from "@/components/custom-input"
import { Card } from "@/components/card"
import { Trash2, Edit2, Plus } from "lucide-react"

interface Store {
  id: string
  name: string
  location: string
}

interface Product {
  id: string
  name: string
  price: number
}

export default function AdminPage() {
  const [stores, setStores] = useState<Store[]>([
    { id: "1", name: "Luvebras", location: "Centro Comercial" },
    { id: "2", name: "Mercato Market", location: "La Aurora" },
  ])

  const [products, setProducts] = useState<Product[]>([
    { id: "1", name: "Queso Mozzarella 400GR", price: 7.41 },
    { id: "2", name: "Chorizo 5 Und", price: 7.71 },
  ])

  const [newStore, setNewStore] = useState({ name: "", location: "" })
  const [newProduct, setNewProduct] = useState({ name: "", price: "" })

  const handleAddStore = () => {
    if (newStore.name && newStore.location) {
      setStores([...stores, { id: Date.now().toString(), ...newStore }])
      setNewStore({ name: "", location: "" })
    }
  }

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price) {
      setProducts([
        ...products,
        { id: Date.now().toString(), name: newProduct.name, price: Number.parseFloat(newProduct.price) },
      ])
      setNewProduct({ name: "", price: "" })
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-8">
        <div className="container-main space-y-12">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Panel de Administración</h1>
            <p className="text-muted-foreground">Gestiona tiendas y productos</p>
          </div>

          {/* Stores Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Tiendas</h2>

            <Card className="p-6">
              <h3 className="font-bold text-foreground mb-4">Crear Nueva Tienda</h3>
              <div className="space-y-3">
                <CustomInput
                  placeholder="Nombre de la tienda"
                  value={newStore.name}
                  onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
                />
                <CustomInput
                  placeholder="Ubicación"
                  value={newStore.location}
                  onChange={(e) => setNewStore({ ...newStore, location: e.target.value })}
                />
                <CustomButton onClick={handleAddStore} className="w-full">
                  <Plus size={18} className="mr-2" />
                  Crear Tienda
                </CustomButton>
              </div>
            </Card>

            <div className="space-y-3">
              {stores.map((store) => (
                <Card key={store.id} className="p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-foreground">{store.name}</h4>
                    <p className="text-sm text-muted-foreground">📍 {store.location}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Edit2 size={18} className="text-primary" />
                    </button>
                    <button
                      onClick={() => setStores(stores.filter((s) => s.id !== store.id))}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                    >
                      <Trash2 size={18} className="text-destructive" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Products Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Productos</h2>

            <Card className="p-6">
              <h3 className="font-bold text-foreground mb-4">Crear Nuevo Producto</h3>
              <div className="space-y-3">
                <CustomInput
                  placeholder="Nombre del producto"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
                <CustomInput
                  type="number"
                  placeholder="Precio"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
                <CustomButton onClick={handleAddProduct} className="w-full">
                  <Plus size={18} className="mr-2" />
                  Crear Producto
                </CustomButton>
              </div>
            </Card>

            <div className="space-y-3">
              {products.map((product) => (
                <Card key={product.id} className="p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-foreground">{product.name}</h4>
                    <p className="text-sm text-primary">${product.price.toFixed(2)}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Edit2 size={18} className="text-primary" />
                    </button>
                    <button
                      onClick={() => setProducts(products.filter((p) => p.id !== product.id))}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                    >
                      <Trash2 size={18} className="text-destructive" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
