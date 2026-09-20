export function buildWhatsappLink(numero: string, texto: string): string {
  return `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
}

export function buildConsultaGeneralLink(numero: string): string {
  return buildWhatsappLink(numero, "¡Hola! Quería consultar por una planta en Nativa Vivero.");
}

export function buildConsultaPlantaLink(numero: string, nombrePlanta: string): string {
  return buildWhatsappLink(numero, `¡Hola! Quería consultar disponibilidad de ${nombrePlanta} en Nativa Vivero.`);
}

// Formato legible del número (Argentina: 54 9 + área + local) para
// mostrarlo como texto en el sitio, no solo como link. Si el número
// cargado no matchea ese patrón, se muestra tal cual con el "+" adelante
// en vez de romper.
export function formatWhatsappDisplay(numero: string): string {
  const match = numero.match(/^54(9)?(\d{2})(\d{4})(\d{4})$/);
  if (!match) return `+${numero}`;
  const [, movil, area, parte1, parte2] = match;
  return `+54 ${movil ? "9 " : ""}${area} ${parte1}-${parte2}`;
}
