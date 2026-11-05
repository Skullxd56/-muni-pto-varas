/* ==========================================================
   Municipalidad de Puerto Varas - Control Global de Modo Oscuro
   Persistencia en localStorage y aplicación automática de .dark-mode
   ========================================================== */

(function () {
  "use strict";

  // Claves de localStorage soportadas
  var STORAGE_KEY_DARK = "dark-mode";
  var STORAGE_KEY_THEME = "theme";
  var STORAGE_KEY_TEMA = "tema";

  /**
   * Determina si el modo oscuro está activo en localStorage
   * @returns {boolean}
   */
  function estaModoOscuroActivo() {
    try {
      var valorDarkMode = localStorage.getItem(STORAGE_KEY_DARK);
      var valorTheme = localStorage.getItem(STORAGE_KEY_THEME);
      var valorTema = localStorage.getItem(STORAGE_KEY_TEMA);

      return (
        valorDarkMode === "true" ||
        valorDarkMode === "enabled" ||
        valorTheme === "dark" ||
        valorTheme === "oscuro" ||
        valorTema === "oscuro" ||
        valorTema === "dark"
      );
    } catch (e) {
      return false;
    }
  }

  /**
   * Aplica o remueve la clase .dark-mode y atributos de tema en body y html
   * @param {boolean} activar
   */
  function aplicarModoOscuro(activar) {
    var body = document.body;
    var docEl = document.documentElement;

    if (activar) {
      if (body) {
        body.classList.add("dark-mode");
      }
      docEl.classList.add("dark-mode");
      docEl.setAttribute("data-theme", "oscuro");
    } else {
      if (body) {
        body.classList.remove("dark-mode");
      }
      docEl.classList.remove("dark-mode");
      docEl.removeAttribute("data-theme");
    }
  }

  /**
   * Guarda la preferencia del usuario en localStorage
   * @param {boolean} activo
   */
  function guardarPreferencia(activo) {
    try {
      if (activo) {
        localStorage.setItem(STORAGE_KEY_DARK, "true");
        localStorage.setItem(STORAGE_KEY_THEME, "dark");
        localStorage.setItem(STORAGE_KEY_TEMA, "oscuro");
      } else {
        localStorage.setItem(STORAGE_KEY_DARK, "false");
        localStorage.setItem(STORAGE_KEY_THEME, "light");
        localStorage.setItem(STORAGE_KEY_TEMA, "claro");
      }
    } catch (e) {
      console.warn("No se pudo guardar la preferencia en localStorage:", e);
    }
  }

  /**
   * Alterna el estado del modo oscuro y guarda la preferencia
   */
  function alternarModoOscuro() {
    var nuevoEstado = !estaModoOscuroActivo();
    aplicarModoOscuro(nuevoEstado);
    guardarPreferencia(nuevoEstado);
  }

  // 1. Verificación inmediata al cargar el script para evitar parpadeos (FOUC)
  if (estaModoOscuroActivo()) {
    document.documentElement.classList.add("dark-mode");
    document.documentElement.setAttribute("data-theme", "oscuro");
    if (document.body) {
      document.body.classList.add("dark-mode");
    }
  }

  /**
   * Inicialización completa cuando el DOM esté listo
   */
  function inicializar() {
    // 2. Verificar localStorage al cargar y aplicar la clase .dark-mode al body automáticamente
    if (estaModoOscuroActivo()) {
      aplicarModoOscuro(true);
    } else {
      aplicarModoOscuro(false);
    }

    // 3. Configurar listeners para todos los botones de cambio de tema
    var selectoresBoton = "#tema-boton, .tema-boton, [data-theme-toggle]";
    var botones = document.querySelectorAll(selectoresBoton);
    botones.forEach(function (boton) {
      boton.removeEventListener("click", alternarModoOscuro);
      boton.addEventListener("click", alternarModoOscuro);
    });

    // 4. Reestructuración de servicios en la portada si aplica
    var seccionDepartamentos = document.getElementById("departamentos");
    var seccionServicios = document.getElementById("servicios");
    if (seccionDepartamentos && seccionServicios && seccionDepartamentos.parentNode) {
      if (
        seccionDepartamentos.nextElementSibling === seccionServicios ||
        seccionDepartamentos.compareDocumentPosition(seccionServicios) & Node.DOCUMENT_POSITION_FOLLOWING
      ) {
        seccionDepartamentos.parentNode.insertBefore(seccionServicios, seccionDepartamentos);
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inicializar);
  } else {
    inicializar();
  }

  // Exponer funciones globales
  window.estaModoOscuroActivo = estaModoOscuroActivo;
  window.aplicarModoOscuro = aplicarModoOscuro;
  window.alternarModoOscuro = alternarModoOscuro;
  window.toggleDarkMode = alternarModoOscuro;

  /** Mantiene la navegación por Tab dentro del menú móvil modal abierto. */
  window.mantenerFocoMenu = function (evento) {
    var dialogo = evento.currentTarget;
    var controles = Array.from(dialogo.querySelectorAll(
      "a[href], button:not([disabled]), [tabindex]"
    )).filter(function (elemento) {
      return elemento.tabIndex >= 0 && elemento.getClientRects().length > 0 &&
        window.getComputedStyle(elemento).visibility !== "hidden";
    });
    if (!controles.length) {
      evento.preventDefault();
      return;
    }
    var primero = controles[0];
    var ultimo = controles[controles.length - 1];
    if (evento.shiftKey && (document.activeElement === primero ||
        !dialogo.contains(document.activeElement))) {
      evento.preventDefault();
      ultimo.focus();
    } else if (!evento.shiftKey && document.activeElement === ultimo) {
      evento.preventDefault();
      primero.focus();
    }
  };

  /** Tras cerrar el menú, enfoca la sección destino de un enlace de la misma página. */
  window.enfocarDestinoNavegacion = function (evento) {
    var enlace = evento.target.closest("a[href]");
    if (!enlace) return;
    var destinoUrl = new URL(enlace.href, window.location.href);
    if (destinoUrl.origin !== window.location.origin ||
        destinoUrl.pathname !== window.location.pathname || !destinoUrl.hash) return;
    var destino = document.getElementById(decodeURIComponent(destinoUrl.hash.slice(1)));
    if (!destino) return;
    if (!destino.hasAttribute("tabindex")) destino.setAttribute("tabindex", "-1");
    destino.focus({ preventScroll: true });
    destino.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    });
  };
})();
