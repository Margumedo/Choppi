# Choppi Frontend App 🎨

Aplicación web moderna y responsiva para Choppi, enfocada en una experiencia de usuario excepcional ("Da Vinci Standard").

## 💻 Stack Tecnológico
*   **Framework**: Next.js 15 (App Router)
*   **Lenguaje**: TypeScript
*   **Estilos**: Tailwind CSS v4
*   **Componentes**: Radix UI + Shadcn Concepts
*   **Iconos**: Lucide React
*   **Notificaciones**: Sonner
*   **Cliente HTTP**: Axios

## 🔧 Configuración

### Variables de Entorno (.env.local)
Crea un archivo `.env.local` en la raíz de `/frontend` para conectar con tu backend:

```env
# URL del Backend (sin slash al final)
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Instalación y Ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Servidor de desarrollo
npm run dev
```
Abre `http://localhost:3001` en tu navegador.

## 📂 Estructura del Proyecto

*   `/app`: Rutas y páginas (Next.js App Router).
    *   `(auth)`: Rutas de autenticación.
    *   `/stores`: Flujo principal de compra.
*   `/components`: Biblioteca de componentes reutilizables.
*   `/hooks`: Lógica de negocio encapsulada (`use-cart`, `use-auth`).
*   `/lib`: Configuración de cliente API (Axios) y utilidades.
*   `/public`: Activos estáticos.

## 🔐 Autenticación & Estado
*   **Auth**: Manejo de sesión híbrido (JWT en localStorage + Cookies opcionales). Soporta redirección post-login.
*   **Carrito**: Estado persistente del lado del cliente para mantener la selección de productos entre recargas.
