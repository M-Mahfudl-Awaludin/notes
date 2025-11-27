import { LitElement, html, css } from 'lit';
import { formatDateISOToLocale } from '../utils/date.js';
import { getCurrentLocale } from '../i18n/translations-lit.js';

class LocalizedDate extends LitElement {
  static properties = {
    date: { type: String }
  };

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .date-icon {
      font-size: 0.875rem;
      opacity: 0.7;
    }
    
    span {
      font-size: 0.875rem;
    }
  `;

  constructor() {
    super();
    this.date = '';
  }

  static get observedAttributes() {
    return ['date'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'date' && oldValue !== newValue) {
      this.date = newValue;
      this.requestUpdate();
    }
  }

  render() {
    if (!this.date) return html``;

    const currentLocale = getCurrentLocale();
    let locale = 'en-US';
    if (currentLocale === 'id') locale = 'id-ID';
    else if (currentLocale === 'es') locale = 'es-ES';
    else if (currentLocale === 'fr') locale = 'fr-FR';
    const formatted = formatDateISOToLocale(this.date, locale);

    return html`
      <span class="date-icon">📅</span>
      <span>${formatted}</span>
    `;
  }
}

customElements.define("localized-date", LocalizedDate);
