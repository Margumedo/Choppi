# Choppi Backend API 🛠️

API RESTful robusta y escalable construida con **NestJS**, diseñada para gestionar la lógica de negocio de Choppi.

## 📚 Stack Tecnológico
*   **Framework**: NestJS (Modular Architecture)
*   **Lenguaje**: TypeScript
*   **Base de Datos**: PostgreSQL
*   **ORM**: TypeORM
*   **Documentación**: Swagger (OpenAPI)
*   **Autenticación**: Passport (JWT + Google OAuth2)

## 🔧 Configuración

### Variables de Entorno (.env)
Crea un archivo `.env` en la raíz de `/backend` basándote en `.env.example`:

```env
# Base de Datos
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_password
DB_DATABASE=choppi_db
DB_SSL=false
DB_SYNCHRONIZE=false

# Servidor
PORT=3000
FRONTEND_URL=http://localhost:3001

# Seguridad (JWT)
JWT_SECRET=tu_secreto_super_seguro

# Google OAuth (Opcional para desarrollo local sin login social)
GOOGLE_CLIENT_ID=tu_client_id
GOOGLE_CLIENT_SECRET=tu_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
```

### Instalación y Ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Ejecutar migraciones (crear tablas)
npm run migration:run

# 3. Poblar base de datos (Seed)
# Crea tiendas, productos y usuarios de prueba
npm run seed

# 4. Iniciar en modo desarrollo
npm run start:dev
```

## 📖 Documentación API
Una vez iniciado el servidor, visita:
**`http://localhost:3000/api/docs`**
Para ver la documentación interactiva de todos los endpoints.

## 🗄️ Módulos Principales
*   `Auth`: Login (Local/Google), Registro y Guards.
*   `Stores`: Gestión de tiendas físicas.
*   `Products`: Catálogo maestro de productos.
*   `StoreProducts`: Gestión de inventario (precio/stock) por tienda.
*   `Cart`: Lógica de cotización de carritos de compra.
