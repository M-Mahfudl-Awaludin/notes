export function bindLangEvents(component) {
  window.addEventListener('lang-changed', () => {
    component.requestUpdate(); // memaksa Lit me-render ulang
  });
}
