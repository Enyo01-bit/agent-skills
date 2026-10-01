# Ventanas y Fachadas Oriental — sitio web

Página de una sola vista, en español y pensada primero para celular. No necesita compilación: son archivos estáticos.

| Archivo | Para qué sirve |
| --- | --- |
| `config.js` | **Todos los datos del negocio** (WhatsApp, teléfono, dirección, logo, fotos de proyectos). Lo único que hace falta editar. |
| `styles.css` | Diseño. Los colores de marca están al inicio, en `:root` (azul marino) y `.tema-rojo` (rojo). |
| `index.html` | Estructura y textos de las secciones. |
| `main.js` | Galería con filtros, visor ampliado y animaciones al hacer scroll. |

## Ver la página

Abre `index.html` en el navegador o sirve la carpeta:

```bash
npx serve sites/ventanas-fachadas-oriental
```

Para publicarla, sube la carpeta a cualquier hosting estático (Vercel, Netlify, GitHub Pages).

## Datos pendientes del cliente

Busca `PENDIENTE_` en `config.js`:

- `PENDIENTE_DIRECCION`: dirección exacta. Mientras falte, se muestra "San Cristóbal, República Dominicana · Dirección exacta por confirmar" y el mapa busca el nombre del negocio.
- `PENDIENTE_HORARIO`: horario completo. Mientras falte, no se muestra.
- `PENDIENTE_LOGO`: ruta del logo (por ejemplo `img/logo.svg`). Mientras falte, se muestra un ícono genérico con el nombre.
- `PENDIENTE_FOTO`, `PENDIENTE_TITULO`, `PENDIENTE_LUGAR`: datos de cada proyecto de la galería. Las fotos pendientes aparecen como recuadros "Foto pendiente".

Ya confirmados: WhatsApp +1 829-677-2989, teléfono (809) 656-5840 y el enlace a la ficha de Google Maps.

## Cambiar colores

- Para usar el rojo como color principal, cambia `tema: "azul"` por `tema: "rojo"` en `config.js`.
- Para ajustar los tonos exactos cuando llegue el logo, edita las variables `--marca*` en `styles.css`.

## Animaciones

Solo se animan `transform` y `opacity`, una vez por elemento, al entrar en pantalla. Si el dispositivo tiene activado "reducir movimiento", todo aparece directamente en su estado final.
