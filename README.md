##
# Inspectia Backend

Este es el backend para el proyecto Inspectia, desarrollado con Node.js y Express.

## Requisitos Previos

-   Node.js (se recomienda versión 18.x o superior)
-   npm o yarn

## Instalación

1.  Clona el repositorio en tu máquina local:
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd inspectia-backend
    ```

2.  Instala las dependencias del proyecto:
    ```bash
    npm install
    ```
    O si prefieres usar yarn:
    ```bash
    yarn install
    ```

## Variables de Entorno

Para que la aplicación funcione correctamente, es necesario configurar las variables de entorno.

1.  Crea un archivo `.env` en la raíz del proyecto.
2.  Puedes copiar el contenido del archivo `.env.example` como plantilla y modificar los valores según tu configuración.

```.env.example
# Puerto en el que correrá el servidor
PORT=3000

# URL de conexión a la base de datos
DATABASE_URL="postgresql://user:password@host:port/database"

# Secreto para firmar los JSON Web Tokens (JWT)
JWT_SECRET="TU_SECRETO_SUPER_SECRETO"
```

## Ejecución de la Aplicación

### Modo de Desarrollo

Para iniciar el servidor en modo de desarrollo, que se reiniciará automáticamente al detectar cambios en el código, ejecuta:

```bash
npm run dev
```

El servidor estará escuchando en el puerto especificado en tu archivo `.env` (por defecto, el puerto 3000).

### Modo de Producción

Para iniciar la aplicación en un entorno de producción, utiliza:

```bash
npm start
```

## Scripts Disponibles

-   `npm start`: Inicia el servidor en modo de producción.
-   `npm run dev`: Inicia el servidor en modo de desarrollo con `nodemon`.
-   `npm test`: Ejecuta los tests del proyecto (si están configurados).
-   `npm run lint`: Ejecuta el linter para revisar la calidad del código (si está configurado).