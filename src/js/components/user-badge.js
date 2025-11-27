import { LitElement, html, css } from 'lit';

class UserBadge extends LitElement {
  static properties = {
    name: { type: String }
  };

  static styles = css`
    .badge {
      background: linear-gradient(135deg, #4285f4 0%, #1a73e8 100%);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
      box-shadow: 0 2px 8px rgba(66, 133, 244, 0.3);
      transition: all 0.3s ease;
    }

    .badge:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(66, 133, 244, 0.4);
    }

    .user-icon {
      font-size: 0.75rem;
    }
  `;

  constructor() {
    super();
    this.name = 'Guest';
  }

  static get observedAttributes() {
    return ['name'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'name' && oldValue !== newValue) {
      this.name = newValue || 'Guest';
      this.requestUpdate();
    }
  }

  render() {
    return html`
      <span class="badge">
        <span class="user-icon">👤</span>
        ${this.name}
      </span>
    `;
  }
}

customElements.define("user-badge", UserBadge);
