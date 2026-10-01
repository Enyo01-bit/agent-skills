(function () {
  "use strict";

  var S = window.SITIO || {};
  var pendiente = function (v) { return !v || String(v).indexOf("PENDIENTE") === 0; };
  var $ = function (sel, raiz) { return (raiz || document).querySelector(sel); };
  var $$ = function (sel, raiz) { return Array.prototype.slice.call((raiz || document).querySelectorAll(sel)); };

  /* ---------- Datos de config.js ---------- */
  if (S.tema === "rojo") document.documentElement.classList.add("tema-rojo");

  $$("[data-campo]").forEach(function (el) {
    var v = S[el.getAttribute("data-campo")];
    if (!pendiente(v)) el.textContent = v;
  });

  if (!pendiente(S.logo)) {
    $$("[data-logo]").forEach(function (el) {
      el.innerHTML = "";
      var img = document.createElement("img");
      img.src = S.logo;
      img.alt = "";
      el.appendChild(img);
    });
  }

  var enlaceWa = pendiente(S.whatsapp) ? "#contacto"
    : "https://wa.me/" + S.whatsapp + "?text=" + encodeURIComponent(S.mensajeWhatsapp || "");
  $$("[data-wa]").forEach(function (a) {
    a.href = enlaceWa;
    if (enlaceWa !== "#contacto") { a.target = "_blank"; a.rel = "noopener"; }
  });

  $$("[data-tel]").forEach(function (a) { a.href = "tel:+" + S.telefono; });
  $$("[data-si]").forEach(function (el) {
    el.hidden = pendiente(S[el.getAttribute("data-si")]);
  });

  var dir = $("[data-direccion]");
  if (dir) {
    if (pendiente(S.direccion)) {
      dir.innerHTML = "";
      dir.appendChild(document.createTextNode(S.ciudad || ""));
      var aviso = document.createElement("small");
      aviso.textContent = "Dirección exacta por confirmar";
      dir.appendChild(aviso);
    } else {
      dir.textContent = S.direccion + (S.ciudad ? ", " + S.ciudad : "");
    }
  }

  var mapa = $("[data-mapa]");
  if (mapa) {
    var q = pendiente(S.direccion) ? S.busquedaMapa : S.direccion + ", " + S.ciudad;
    mapa.src = "https://maps.google.com/maps?q=" + encodeURIComponent(q || "San Cristóbal, República Dominicana") + "&z=14&output=embed";
  }
  var enlaceMapa = $("[data-enlace-mapa]");
  if (enlaceMapa) {
    if (pendiente(S.enlaceMapa)) enlaceMapa.hidden = true;
    else enlaceMapa.href = S.enlaceMapa;
  }

  var anio = $("[data-anio]");
  if (anio) anio.textContent = new Date().getFullYear();

  /* ---------- Galería ---------- */
  var categorias = { publicos: "Sitio público", escuelas: "Escuela", iglesias: "Iglesia" };
  var proyectos = (S.proyectos || []).map(function (p) {
    return {
      categoria: p.categoria,
      tipo: categorias[p.categoria] || "Proyecto",
      titulo: pendiente(p.titulo) ? "" : p.titulo,
      lugar: pendiente(p.lugar) ? "" : p.lugar,
      foto: pendiente(p.foto) ? "" : p.foto
    };
  });

  var iconoFoto = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="12" cy="12" r="3.5"/><path d="M8 5l1.5-2h5L16 5"/></svg>';

  function relleno(p) {
    var d = document.createElement("div");
    d.className = "foto-pendiente";
    d.innerHTML = iconoFoto + "<b>Foto pendiente</b><span></span>";
    d.querySelector("span").textContent = p.tipo;
    return d;
  }

  function imagen(p, carga) {
    var img = document.createElement("img");
    img.src = p.foto;
    img.alt = (p.titulo || p.tipo) + (p.lugar ? ", " + p.lugar : "");
    img.loading = carga || "lazy";
    img.decoding = "async";
    return img;
  }

  var galeria = $("[data-galeria]");
  proyectos.forEach(function (p, i) {
    var li = document.createElement("li");
    li.dataset.categoria = p.categoria;
    li.className = "aparecer";

    var boton = document.createElement("button");
    boton.type = "button";
    boton.className = "foto-boton";
    boton.dataset.indice = i;
    boton.setAttribute("aria-label", "Ampliar foto: " + (p.titulo || "proyecto") + " (" + p.tipo + ")");

    var marco = document.createElement("span");
    marco.className = "foto-marco";
    marco.style.display = "block";
    marco.appendChild(p.foto ? imagen(p) : relleno(p));

    var pie = document.createElement("span");
    pie.className = "foto-pie";
    pie.textContent = p.titulo || p.tipo;
    if (p.titulo || p.lugar) {
      var sub = document.createElement("small");
      sub.textContent = p.titulo ? p.tipo + (p.lugar ? " · " + p.lugar : "") : p.lugar;
      pie.appendChild(sub);
    }

    boton.appendChild(marco);
    boton.appendChild(pie);
    li.appendChild(boton);
    galeria.appendChild(li);
  });

  $$(".filtro").forEach(function (b) {
    b.addEventListener("click", function () {
      var f = b.dataset.filtro;
      $$(".filtro").forEach(function (o) {
        var activo = o === b;
        o.classList.toggle("activo", activo);
        o.setAttribute("aria-pressed", activo);
      });
      $$("li", galeria).forEach(function (li) {
        li.hidden = f !== "todos" && li.dataset.categoria !== f;
      });
    });
  });

  /* ---------- Visor ampliado ---------- */
  var visor = $("[data-visor]");
  var actual = 0;

  function visibles() {
    return $$("li:not([hidden]) .foto-boton", galeria).map(function (b) { return +b.dataset.indice; });
  }

  function mostrar(i) {
    actual = i;
    var p = proyectos[i];
    var caja = $("[data-visor-imagen]", visor);
    caja.innerHTML = "";
    caja.appendChild(p.foto ? imagen(p, "eager") : relleno(p));
    var texto = $("[data-visor-texto]", visor);
    texto.textContent = p.titulo || p.tipo;
    if (p.titulo || p.lugar) {
      var sub = document.createElement("small");
      sub.textContent = p.titulo ? p.tipo + (p.lugar ? " · " + p.lugar : "") : p.lugar;
      texto.appendChild(sub);
    }
  }

  function mover(paso) {
    var lista = visibles();
    var pos = lista.indexOf(actual);
    if (!lista.length) return;
    mostrar(lista[(pos + paso + lista.length) % lista.length]);
  }

  if (visor && typeof visor.showModal === "function") {
    galeria.addEventListener("click", function (e) {
      var b = e.target.closest(".foto-boton");
      if (!b) return;
      mostrar(+b.dataset.indice);
      visor.showModal();
    });
    $("[data-cerrar]", visor).addEventListener("click", function () { visor.close(); });
    $("[data-anterior]", visor).addEventListener("click", function () { mover(-1); });
    $("[data-siguiente]", visor).addEventListener("click", function () { mover(1); });
    visor.addEventListener("click", function (e) { if (e.target === visor) visor.close(); });
    visor.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") mover(-1);
      if (e.key === "ArrowRight") mover(1);
    });
    // Deslizar con el dedo para cambiar de foto
    var x0 = null;
    visor.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    visor.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) mover(dx < 0 ? 1 : -1);
      x0 = null;
    }, { passive: true });
  }

  /* ---------- Animaciones al hacer scroll ---------- */
  var portada = $(".portada");
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { portada && portada.classList.add("cargada"); });
  });

  var animables = $$(".aparecer, .ilus, .radar");
  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("visible");
          obs.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.15 });
    animables.forEach(function (el) { obs.observe(el); });
  } else {
    animables.forEach(function (el) { el.classList.add("visible"); });
  }

  // Botón flotante de WhatsApp: aparece al pasar la portada
  var flotante = $(".wa-flotante");
  if (flotante && portada && "IntersectionObserver" in window) {
    new IntersectionObserver(function (en) {
      flotante.classList.toggle("mostrar", !en[0].isIntersecting);
    }).observe(portada);
  }
})();
