"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { ProductCard } from "@/components/product-card"
import { FilterChips } from "@/components/filter-chips"
import { Pagination } from "@/components/pagination"
import { ChevronLeft } from "lucide-react"
import api from "@/lib/api"
import { toast } from "sonner"

interface Store {
  id: string;
  name: string;
  address: string;
}

interface Product {
  id: string;
  price: string;
  stock: number;
  product: {
    id: string;
    name: string;
    description: string;
    image: string;
  }
}

const ITEMS_PER_PAGE = 8

export default function StoreDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [store, setStore] = useState<Store | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [inStockFilter, setInStockFilter] = useState<string | null>(null)

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await api.get(`/stores/${id}`);
        setStore(response.data);
      } catch (error) {
        toast.error("Error al cargar la tienda");
      }
    }
    fetchStore();
  }, [id])

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const response = await api.get(`/stores/${id}/products`, {
          params: {
            page: currentPage,
            limit: ITEMS_PER_PAGE,
            inStock: inStockFilter === 'in-stock'
          }
        });
        setProducts(response.data.data);
        setTotalPages(response.data.meta.lastPage);
      } catch (error) {
        toast.error("Error al cargar productos");
      } finally {
        setLoading(false)
      }
    }
    fetchProducts();
  }, [id, currentPage, inStockFilter])

  if (!store) return <div className="text-center py-20">Cargando tienda...</div>

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Store Hero */}
        <div className="bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground py-8">
          <div className="container-main">
            <Link href="/stores">
              <button className="flex items-center gap-2 text-secondary-foreground hover:opacity-80 transition-opacity mb-4">
                <ChevronLeft size={20} />
                Volver
              </button>
            </Link>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-secondary-foreground/20 rounded-2xl flex items-center justify-center">
                <span className="text-3xl font-bold">{store.name[0]}</span>
              </div>
              <h1 className="text-3xl font-bold">{store.name}</h1>
            </div>
          </div>
        </div>

        {/* Filters & Products */}
        <div className="container-main py-8 space-y-6">
          {/* Filters */}
          <FilterChips
            options={[{ id: "in-stock", label: "En Stock" }]}
            selected={inStockFilter}
            onSelect={setInStockFilter}
          />

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-12">Cargando productos...</div>
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((item) => (
                  <ProductCard
                    key={item.id}
                    id={item.id}
                    name={item.product.name}
                    price={Number(item.price)}
                    image={item.product.image}
                    inStock={item.stock > 0}
                    storeName={store.name}
                    storeId={store.id}
                  />
                ))}
              </div>

              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No hay productos disponibles</p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
