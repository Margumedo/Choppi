import Link from "next/link"
import { Card } from "./card"

interface StoreCardProps {
  id: string
  name: string
  logo?: string
  location?: string
}

export function StoreCard({ id, name, logo, location }: StoreCardProps) {
  return (
    <Link href={`/stores/${id}`}>
      <Card className="cursor-pointer hover:shadow-lg transform hover:scale-105 transition-transform duration-200">
        <div className="aspect-square bg-gradient-orange flex items-center justify-center p-4">
          {logo ? (
            <img src={logo || "/placeholder.svg"} alt={name} className="w-48 h-48 object-contain" />
          ) : (
            <div className="w-48 h-48 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-5xl font-bold text-primary">{name[0]}</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-foreground text-lg line-clamp-2">{name}</h3>
          {location && <p className="text-sm text-muted-foreground mt-1">📍 {location}</p>}
        </div>
      </Card>
    </Link>
  )
}
