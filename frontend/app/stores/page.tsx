"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { StoreCard } from "@/components/store-card"
import { CustomInput } from "@/components/custom-input"
import { Pagination } from "@/components/pagination"
import { Search } from "lucide-react"
import api from "@/lib/api"
import { toast } from "sonner"

interface Store {
  id: string;
  name: string;
  address: string;
}

const ITEMS_PER_PAGE = 6

export default function StoresPage() {
  const [stores, setStores] = useState<Store[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchStores = async () => {
      setLoading(true)
      try {
        const response = await api.get('/stores', {
          params: { page: currentPage, limit: ITEMS_PER_PAGE, q: searchQuery }
        });
        setStores(response.data.data);
        setTotalPages(response.data.meta.lastPage);
      } catch (error) {
        toast.error("Error al cargar tiendas");
      } finally {
        setLoading(false)
      }
    }

    const timeoutId = setTimeout(() => {
      fetchStores();
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [currentPage, searchQuery])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-8">
        <div className="container-main space-y-8">
          {/* Header */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Nuestras Tiendas</h1>
              <p className="text-muted-foreground">Encuentra todos nuestros supermercados disponibles</p>
            </div>

            {/* Search */}
            <CustomInput
              type="search"
              placeholder="Busca una tienda..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              icon={<Search size={18} />}
              className="max-w-md"
            />
          </div>

          {/* Grid */}
          {loading ? (
            <div className="text-center py-12">Cargando...</div>
          ) : stores.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {stores.map((store) => (
                  <StoreCard key={store.id} id={store.id} name={store.name} location={store.address} logo="" />
                ))}
              </div>

              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No encontramos tiendas que coincidan con tu búsqueda</p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
