import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border">
      {/* Main Footer Content */}
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-bold text-xl text-primary">Choppi</h3>
            <p className="text-sm text-muted-foreground">
              Tu solución integral para compras de supermercado rápidas y frescas, entregadas directamente a tu puerta.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 hover:bg-muted rounded-lg transition-colors">
                <Facebook size={18} className="text-primary" />
              </a>
              <a href="#" className="p-2 hover:bg-muted rounded-lg transition-colors">
                <Instagram size={18} className="text-primary" />
              </a>
              <a href="#" className="p-2 hover:bg-muted rounded-lg transition-colors">
                <Twitter size={18} className="text-primary" />
              </a>
            </div>
          </div>

          {/* Empresa */}
          <div className="space-y-3">
            <h4 className="font-bold text-foreground">Empresa</h4>
            <nav className="space-y-2">
              <Link href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Sobre Nosotros
              </Link>
              <Link href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Careers
              </Link>
              <Link href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Press
              </Link>
              <Link href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Blog
              </Link>
            </nav>
          </div>

          {/* Recursos */}
          <div className="space-y-3">
            <h4 className="font-bold text-foreground">Recursos</h4>
            <nav className="space-y-2">
              <Link href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Centro de Ayuda
              </Link>
              <Link href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Política de Privacidad
              </Link>
              <Link href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Términos de Servicio
              </Link>
              <Link href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Contacto
              </Link>
            </nav>
          </div>

          {/* Contacto */}
          <div className="space-y-3">
            <h4 className="font-bold text-foreground">Contacto</h4>
            <div className="space-y-3">
              <div className="flex gap-3 items-start text-sm">
                <Phone size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">+58 (212) 000-0000</p>
                  <p className="text-muted-foreground">Lun-Vie 8:00 - 20:00</p>
                </div>
              </div>
              <div className="flex gap-3 items-start text-sm">
                <Mail size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">support@choppi.com</p>
              </div>
              <div className="flex gap-3 items-start text-sm">
                <MapPin size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">Caracas, Venezuela</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} Choppi Inc. Todos los derechos reservados. | Hecho con ❤️
          </p>
        </div>
      </div>
    </footer>
  )
}
