# Choppi - Technical Test MVP 🚀

Bienvenido al repositorio del MVP de Choppi. Este proyecto es una solución Full-Stack para la gestión de inventario y ventas multi-tienda, desarrollada como parte de una prueba técnica para el rol de Full-Stack Engineer.

## 🏗️ Arquitectura (Monorepo)

El proyecto está estructurado como un monorepo para facilitar el desarrollo y despliegue unificado:

*   **`/backend`**: API RESTful construida con **NestJS**, **TypeORM** y **PostgreSQL**. Maneja la lógica de negocio, autenticación y base de datos.
*   **`/frontend`**: Aplicación web moderna construida con **Next.js 15**, **Tailwind CSS** y **TypeScript**. Ofrece una experiencia de usuario premium ("Da Vinci Standard").

## ✨ Características Principales

*   **Gestión Multi-Tienda**: Administración centralizada de inventarios para múltiples sucursales.
*   **Catálogo Global**: Productos unificados con precios y stock específicos por tienda.
*   **Autenticación Segura**: Sistema de Login/Registro con JWT y encriptación Bcrypt.
*   **Diseño Premium**: Interfaz de usuario moderna, responsiva y con animaciones fluidas.
*   **Docker Ready**: Configuración lista para levantar la base de datos localmente.

## 🚀 Inicio Rápido

### Prerrequisitos
*   Node.js (v18+)
*   Docker & Docker Compose (para la base de datos)
*   npm o pnpm

### 1. Levantar Infraestructura (Base de Datos)
```bash
docker-compose up -d
```
Esto iniciará un contenedor de PostgreSQL listo para usar.

### 2. Iniciar Backend
```bash
cd backend
npm install
npm run start:dev
```
El servidor iniciará en `http://localhost:3000`.
Documentación API (Swagger): `http://localhost:3000/api/docs`

### 3. Iniciar Frontend
```bash
cd frontend
npm install
npm run dev
```
La aplicación web iniciará en `http://localhost:3001`.

## 🧪 Testing
Se han implementado pruebas de flujo crítico (E2E) para asegurar la integridad del sistema:
*   Registro e Inicio de Sesión.
*   Navegación de Tiendas y Productos.
*   Cálculo de Carrito.

---
Desarrollado por Maicol Argumedo para Choppi.
