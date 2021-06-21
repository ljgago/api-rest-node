# Challenger importadora EMEA S.A.

## Descripción

Diseño de una API para simple para el challenger de Emergencias S.A. para el puesto de backend.

Descripción del enpoint:

- GET `clients`: lista todos los clientes.
- GET `clients/{id}`: obtiene el cliente especificado por el `id`.
- POST `clients`: crea un nuevo cliente.
- PUT `clients`: actualiza un cliente.
- DELETE `clients/{id}`: elimina un cliente existente.

Ejemplo usando [HTTPie](https://httpie.io/):

```
# POST
http -f POST https://black-wood-1374.fly.dev/clients id=1 name="Roberto Lopéz" email=rlopez@gmail.com
http -f POST https://black-wood-1374.fly.dev/clients id=2 name="María Fernandez" email=mfernandez@gmail.com

# GET
http https://black-wood-1374.fly.dev/clients
```

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
