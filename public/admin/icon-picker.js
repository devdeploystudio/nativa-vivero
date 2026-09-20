// Widget propio "icon-picker": un selector visual de ícono (se ve el
// dibujo de cada opción, no solo el nombre en texto) — un <select> nativo
// del navegador no puede mostrar SVGs dentro de sus opciones, por eso hace
// falta un widget a medida en vez del widget "select" de siempre. Mismo
// patrón que se usa en los paneles de santilli-aparts / estudio-s3.
//
// El set de íconos tiene que coincidir con `ICONOS`/`IconKey` en
// src/components/Icon.astro (el que realmente dibuja el ícono en el
// sitio) — si se agrega un ícono nuevo, agregarlo en LOS DOS lugares. No
// se puede evitar la duplicación: Icon.astro es un componente de Astro
// (corre en el build), este archivo es JS de navegador que corre en el
// panel — son dos entornos distintos, no comparten módulo.
//
// Todo el archivo va adentro de un IIFE: sin type="module" (ver
// index.html), dos <script> classic que declaran un `const` con el mismo
// nombre en su nivel superior CHOCAN (comparten el scope léxico de nivel
// superior, a diferencia de los módulos ES).
(function () {

const ICONOS = {
  sol: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M12 3v2 M12 19v2 M4.2 4.2l1.4 1.4 M18.4 18.4l1.4 1.4 M3 12h2 M19 12h2 M4.2 19.8l1.4-1.4 M18.4 5.6l1.4-1.4",
  gota: "M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z",
  hoja: "M6 20c-1-5 1-13 12-15-1 9-5 13-12 15Z M7.5 18.5 15 8",
  maceta: "M6 8h12l-1 11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 8Z M5 8h14 M12 8V4 M9.5 6L12 4l2.5 2",
  pata: "M7 9a1.6 1.6 0 1 0 0-3.2A1.6 1.6 0 0 0 7 9z M12 6.5a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2z M17 9a1.6 1.6 0 1 0 0-3.2A1.6 1.6 0 0 0 17 9z M4.5 13a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2z M12 12.5c3 0 5 2 5 4.2 0 1.8-1.4 2.8-3 2.3l-.6-.2a3 3 0 0 0-2.8 0l-.6.2c-1.6.5-3-.5-3-2.3 0-2.2 2-4.2 5-4.2Z",
  reloj: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 7v5l3.5 2",
  calendario: "M4 5h16v15H4z M4 9h16 M8 3v4 M16 3v4 M8 13h2 M14 13h2 M8 17h2",
  estrella: "M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5-4.7-4.6 6.5-.9z",
  corazon: "M12 20.5s-7.5-4.6-9.8-9.1C.6 7.8 2.2 4 6 4c2 0 3.4 1.1 4 2 0.6-0.9 2-2 4-2 3.8 0 5.4 3.8 3.8 7.4C19.5 15.9 12 20.5 12 20.5z",
  lupa: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z M16 16l5 5",
  campana: "M12 3a5 5 0 0 0-5 5v3c0 2-1 3-1 3h12s-1-1-1-3V8a5 5 0 0 0-5-5z M10 19a2 2 0 0 0 4 0",
  ubicacion: "M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11z M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  familia: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M2.5 21v-1.5A4 4 0 0 1 6.5 15.5h1 M17 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M13.5 21v-1A4 4 0 0 1 17.5 16h1a4 4 0 0 1 4 4v1",
  libro: "M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z M19 3v16 M4 5v14",
  candado: "M5 11h14v9H5z M8 11V7a4 4 0 0 1 8 0v4 M12 15v2",
};

const ETIQUETAS = {
  sol: "Luz / sol",
  gota: "Riego / agua",
  hoja: "Hojas",
  maceta: "Maceta / trasplante",
  pata: "Mascotas",
  reloj: "Tiempo / frecuencia",
  calendario: "Estación / calendario",
  estrella: "Destacado / calidad",
  corazon: "Cuidado especial",
  lupa: "Diagnóstico / plagas",
  campana: "Recordatorio",
  ubicacion: "Ubicación",
  familia: "Para toda la familia",
  libro: "Guía / info",
  candado: "Seguridad",
};

function svgIcono(nombre, tamaño) {
  return h(
    "svg",
    {
      viewBox: "0 0 24 24",
      width: tamaño,
      height: tamaño,
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.6",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    h("path", { d: ICONOS[nombre] || "" }),
  );
}

const { createClass, h } = window;

const IconPickerControl = createClass({
  render() {
    const valorActual = this.props.value;
    return h(
      "div",
      {
        className: this.props.classNameWrapper,
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(84px, 1fr))",
          gap: "8px",
        },
      },
      Object.keys(ICONOS).map((clave) =>
        h(
          "button",
          {
            key: clave,
            type: "button",
            onClick: () => this.props.onChange(clave),
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
              padding: "10px 6px",
              borderRadius: "10px",
              border: valorActual === clave ? "2px solid #a2653c" : "1px solid #e1d7bf",
              background: valorActual === clave ? "#f7ede2" : "#ffffff",
              color: "#262a1e",
              cursor: "pointer",
              fontFamily: "sans-serif",
              fontSize: "11px",
              lineHeight: 1.2,
              textAlign: "center",
            },
          },
          svgIcono(clave, 22),
          ETIQUETAS[clave] || clave,
        ),
      ),
    );
  },
});

const IconPickerPreview = createClass({
  render() {
    const valor = this.props.value;
    if (!valor || !ICONOS[valor]) return h("span", {}, "(sin ícono)");
    return h(
      "span",
      { style: { display: "inline-flex", alignItems: "center", gap: "6px" } },
      svgIcono(valor, 18),
      ETIQUETAS[valor] || valor,
    );
  },
});

CMS.registerWidget("icon-picker", IconPickerControl, IconPickerPreview);

})();
