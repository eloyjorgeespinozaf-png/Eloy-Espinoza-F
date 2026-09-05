/**
 * Safe print utility to prevent iframe crashes if window.print is restricted.
 */
export function safePrint(): void {
  try {
    if (typeof window !== 'undefined' && typeof window.print === 'function') {
      window.print();
    }
  } catch (error) {
    console.warn('Función de impresión no permitida por las políticas del contenedor iframe:', error);
  }
}
