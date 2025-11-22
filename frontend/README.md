# Choppi Frontend App 🎨

Aplicación web moderna y responsiva para Choppi, enfocada en una experiencia de usuario excepcional ("Da Vinci Standard").

## 💻 Stack Tecnológico
*   **Framework**: Next.js 15 (App Router)
*   **Lenguaje**: TypeScript
*   **Estilos**: Tailwind CSS
*   **Iconos**: Lucide React
*   **Notificaciones**: Sonner
*   **Cliente HTTP**: Axios

## 🚀 Características UI
*   **Glassmorphism**: Estética moderna con transparencias y desenfoques.
*   **Animaciones**: Transiciones suaves y micro-interacciones.
*   **Responsive**: Adaptable a móviles, tablets y escritorio.
*   **Modo Oscuro**: Soporte nativo (preparado).

## 🛠️ Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev
```
Abre `http://localhost:3001` en tu navegador.

## 📂 Estructura de Carpetas
*   `/app`: Rutas y páginas (Next.js App Router).
*   `/components`: Componentes reutilizables (UI Kit).
*   `/lib`: Utilidades y configuración de API (Axios).
*   `/public`: Activos estáticos (imágenes, iconos).

## 🔐 Autenticación
El frontend maneja la sesión mediante JWT almacenado en `localStorage`.
*   `/login`: Inicio de sesión.
*   `/register`: Registro de nuevos usuarios.
*   Rutas protegidas redirigen automáticamente al login si no hay sesión.
