# Choppi - E-commerce MVP 🚀

Plataforma de e-commerce moderna y escalable para la gestión de compras multi-tienda, con entrega rápida y productos frescos. Desarrollada con una arquitectura Full-Stack robusta y estándares de código de alta calidad.

## 🏗️ Arquitectura (Monorepo)

## 🏗️ Stack Tecnológico

El proyecto utiliza un stack moderno enfocado en rendimiento, escalabilidad y experiencia de desarrollador:

### Backend (`/backend`)
*   **Framework:** NestJS (TypeScript)
*   **Base de Datos:** PostgreSQL con TypeORM
*   **Autenticación:** Passport.js (JWT Strategy + Google OAuth2)
*   **Documentación:** Swagger / OpenAPI
*   **Testing:** Jest (Unit & E2E)

### Frontend (`/frontend`)
*   **Framework:** Next.js 15 (App Router)
*   **Estilos:** Tailwind CSS v4 + Radix UI
*   **Estado:** React Hooks + Context API
*   **Cliente HTTP:** Axios

---

## 🚀 Guía de Instalación

### Prerrequisitos
*   Node.js (v18 o superior)
*   Docker Desktop (para base de datos local)
*   Cuenta de Google Cloud (opcional, para Google Auth)

### 1. Configuración de Base de Datos
Levanta el contenedor de PostgreSQL usando Docker Compose:
```bash
docker-compose up -d
```

### 2. Configuración del Backend

1.  Entra al directorio: `cd backend`
2.  Instala dependencias: `npm install`
3.  Configura variables de entorno:
    ```bash
    cp .env.example .env
    # Edita .env con tus credenciales (DB_PASSWORD, GOOGLE_CLIENT_ID, etc.)
    ```
4.  Ejecuta migraciones y seed (datos de prueba):
    ```bash
    npm run migration:run
    npm run seed
    ```
5.  Inicia el servidor de desarrollo:
    ```bash
    npm run start:dev
    ```
    *API corriendo en: http://localhost:3000*  
    *Documentación Swagger: http://localhost:3000/api/docs*

### 3. Configuración del Frontend

1.  Entra al directorio: `cd frontend`
2.  Instala dependencias: `npm install`
3.  Configura variables de entorno:
    Crea un archivo `.env.local` en la raíz de `frontend/`:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:3000
    ```
4.  Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    ```
    *App disponible en: http://localhost:3001*

---

## ✨ Funcionalidades Principales

*   **Autenticación Híbrida:** Registro por correo/contraseña y Login social con Google.
*   **Gestión Multi-Tienda:** Inventarios independientes por sucursal (Luvebras, Farmatodo, etc.).
*   **Catálogo Dinámico:** Productos con precios y stock variables según la tienda seleccionada.
*   **Carrito Persistente:** Gestión de estado local del carrito de compras.
*   **UI/UX Premium:** Diseño responsivo, animaciones fluidas y feedback visual inmediato (Toasts).

---

## 📦 Despliegue (Producción)

El proyecto está preparado para despliegue continuo (CI/CD):
*   **Backend:** Configurado para plataformas como SeeNode/Render. Incluye migraciones automáticas al inicio (`npm run start:prod`).
*   **Frontend:** Optimizado para Vercel/Netlify con Static Generation.

### Comandos Útiles
*   `npm run build`: Construye la aplicación para producción.
*   `npm run lint`: Ejecuta linter para asegurar calidad de código.
*   `npm run test`: Ejecuta suite de pruebas.

---

Desarrollado por **Maicol Argumedo**.
