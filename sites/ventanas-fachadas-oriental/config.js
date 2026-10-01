/*
 * CONFIGURACIÓN DEL SITIO — Ventanas y Fachadas Oriental
 * -------------------------------------------------------
 * Todos los datos del negocio se editan SOLO en este archivo.
 * Lo que diga "PENDIENTE_..." todavía no lo ha confirmado el cliente.
 * Mientras un dato siga pendiente, la página lo oculta o muestra un aviso
 * neutro ("por confirmar"); nunca muestra el marcador al visitante.
 */
window.SITIO = {
  nombre: "Ventanas y Fachadas Oriental",
  razonSocial: "PYV Fachadas Oriental, S.R.L.",
  frase: "Ventanas, puertas y fachadas en cristal y aluminio",
  subtitulo: "Fabricación, venta e instalación en San Cristóbal y gran parte del país.",

  // Colores: "azul" (azul marino, principal) o "rojo" (alternativa).
  // Los tonos exactos están en styles.css, en el bloque :root (variables --marca-*).
  tema: "azul",

  // Logo: ruta a la imagen, por ejemplo "img/logo.svg".
  // Mientras esté pendiente se muestra el nombre con un ícono genérico.
  logo: "PENDIENTE_LOGO",

  // WhatsApp: solo dígitos, con código de país (1 para República Dominicana).
  whatsapp: "18296772989",
  whatsappVisible: "+1 829-677-2989",
  mensajeWhatsapp: "Hola, quisiera cotizar un trabajo con Ventanas y Fachadas Oriental.",

  // Teléfono fijo (tomado de la ficha de Google del negocio).
  telefono: "18096565840",
  telefonoVisible: "(809) 656-5840",

  // Dirección exacta: PENDIENTE. La ficha de Google solo indica "San Cristóbal 91000".
  direccion: "PENDIENTE_DIRECCION",
  ciudad: "San Cristóbal, República Dominicana",

  // Horario: PENDIENTE. Google solo muestra "Cierra a las 6 p.m."; falta el horario completo.
  horario: "PENDIENTE_HORARIO",

  // Enlace a la ficha del negocio en Google Maps (botón "Abrir en Google Maps").
  enlaceMapa: "https://share.google/IPdYSvxDCJIk5UTha",
  // Lo que busca el mapa incrustado. Cambiarlo por la dirección exacta cuando llegue.
  busquedaMapa: "Puertas y Ventanas Fachadas Oriental, San Cristóbal, República Dominicana",

  /*
   * GALERÍA DE PROYECTOS
   * categoria: "publicos" | "escuelas" | "iglesias"
   * foto: ruta a la imagen (por ejemplo "img/proyectos/escuela-1.jpg").
   *       Si dice "PENDIENTE_FOTO", se muestra un recuadro "Foto pendiente".
   * titulo / lugar: si dicen "PENDIENTE_...", se ocultan y solo se muestra el tipo de obra.
   * Añadir o quitar entradas libremente; no hay un mínimo ni un máximo.
   */
  proyectos: [
    { categoria: "publicos", titulo: "PENDIENTE_TITULO", lugar: "PENDIENTE_LUGAR", foto: "PENDIENTE_FOTO" },
    { categoria: "publicos", titulo: "PENDIENTE_TITULO", lugar: "PENDIENTE_LUGAR", foto: "PENDIENTE_FOTO" },
    { categoria: "escuelas", titulo: "PENDIENTE_TITULO", lugar: "PENDIENTE_LUGAR", foto: "PENDIENTE_FOTO" },
    { categoria: "escuelas", titulo: "PENDIENTE_TITULO", lugar: "PENDIENTE_LUGAR", foto: "PENDIENTE_FOTO" },
    { categoria: "iglesias", titulo: "PENDIENTE_TITULO", lugar: "PENDIENTE_LUGAR", foto: "PENDIENTE_FOTO" },
    { categoria: "iglesias", titulo: "PENDIENTE_TITULO", lugar: "PENDIENTE_LUGAR", foto: "PENDIENTE_FOTO" }
  ]
};
