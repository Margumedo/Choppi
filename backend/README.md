# Choppi Backend API 🛠️

API RESTful robusta y escalable construida con **NestJS**, diseñada para gestionar la lógica de negocio de Choppi.

## 📚 Stack Tecnológico
*   **Framework**: NestJS
*   **Lenguaje**: TypeScript
*   **Base de Datos**: PostgreSQL
*   **ORM**: TypeORM
*   **Documentación**: Swagger (OpenAPI)
*   **Autenticación**: Passport + JWT

## 🔧 Configuración

### Variables de Entorno (.env)
Crea un archivo `.env` en la raíz de `/backend` (o usa los valores por defecto para desarrollo):
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=choppi_db
JWT_SECRET=tu_secreto_super_seguro
```

### Instalación y Ejecución
```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run start:dev

# Modo producción
npm run build
npm run start:prod
```

## 📖 Documentación API
Una vez iniciado el servidor, visita:
**`http://localhost:3000/api/docs`**
Para ver la documentación interactiva de todos los endpoints (Auth, Stores, Products, Cart).

## 🗄️ Módulos Principales
*   `Auth`: Login, Registro y validación de tokens.
*   `Stores`: Gestión de tiendas físicas.
*   `Products`: Catálogo maestro de productos.
*   `StoreProducts`: Gestión de inventario (precio/stock) por tienda.
*   `Cart`: Lógica de cotización de carritos de compra.
