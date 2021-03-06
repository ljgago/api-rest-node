# Challenge importadora EMEA S.A.

## Descripción

Diseño de una API para simple para el challenge de Emergencias S.A. para el puesto de backend.

Descripción del enpoint:

- GET `clients`: lista todos los clientes.
- GET `clients/{id}`: obtiene el cliente especificado por el `id`.
- POST `clients`: crea un nuevo cliente.
- PUT `clients/{id}`: actualiza un cliente.
- DELETE `clients/{id}`: elimina un cliente existente.

La api tiene autenticación basica con el `user: admin` y `pass: admin`.

Tambien se define la documentación de la api en `api/api.yaml` usando la especificación OpenAPI 3.0 .

## Ejemplo usando [HTTPie](https://httpie.io/) (endpoint desplegado en [fly.io](https://fly.io)):

Agrego un par de clientes a la base de datos:

```
# POST
http -f POST https://admin:admin@black-wood-1374.fly.dev/clients id=1 name="Roberto Lopéz" email=rlopez@gmail.com
http -f POST https://admin:admin@black-wood-1374.fly.dev/clients id=2 name="María Fernandez" email=mfernandez@gmail.com
```

Obtengo todos los clientes:

```
# GET
http https://admin:admin@black-wood-1374.fly.dev/clients
```

Respuesta:

```json
[
  {
    "id": 1,
    "name": "Roberto Lopéz",
    "email": "rlopez@gmail.com"
  },
  {
    "id": 2,
    "name": "María Fernandez",
    "email": "mfernandez@gmail.com"
  }
]
```

## Resumen de la implementación

Tecnologías usadas:

- NodeJS
- Typescript
- Express
- Typeorm

Se implementó la Arquitectura Hexagonal como patrón de diseño:

Estructura de la arquitectura:

- `core`: se define el núcleo de la implementación sin dependencias externas.
- `core/entities`: se definen los modelos o entidades básicas.
- `core/repositories`: se defienen las interfaces que tienen que ser implementadas por mis fuentes de datos.
- `core/services`: se define la lógica del negocio y se encarga de hacer de puente entré los controladores y las fuentes de datos.
- `controllers`: se encarga de realizar la comunicación con el mundo exterior.
- `datasources`: se encarga de acceder a las fuentes de datos siguiendo la estructura definida en `core/repositories`.

Tambien se defienen unos métodos llamados `Providers` que se encargan de inyectar las dependecias necesarias para habilitar la comunicación bidireccional entre `controllers` <-> `core/services` <-> `datasources`.

En el archivo `server.ts` se crea el servidor y se inyectan las dependencias del los Providers.
