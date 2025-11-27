import { LitElement, html } from 'lit';
import { setLang, getCurrentLocale, t } from '../i18n/translations-lit.js';
import { bindLangEvents } from '../i18n/helpers/translationHelper.js';
import { AUTH_EVENT, getCurrentUser, isAuthenticated, logout } from '../services/authService.js';

class AppNavbar extends LitElement {
  constructor() {
    super();
    this._authHandler = () => this.requestUpdate();
  }

  createRenderRoot() {
    return this; // Disable shadow DOM for Bootstrap compatibility
  }

  firstUpdated() {
    // Re-render navbar when language changes
    bindLangEvents(this);

    // Add language switch listeners
    this.addEventListener("click", async (e) => {
      const item = e.target.closest(".dropdown-item");
      if (item) {
        e.preventDefault();
        const lang = item.getAttribute("data-lang");
        if (lang) await setLang(lang);
      }
    });

    // Offcanvas handling (avoid error if bootstrap is not loaded)
    const offcanvasElement = document.getElementById('offcanvasNavbar');
    if (offcanvasElement && window.bootstrap) {
      const bsOffcanvas = new bootstrap.Offcanvas(offcanvasElement);

      const toggler = this.querySelector('[data-bs-toggle="offcanvas"]');
      if (toggler) {
        toggler.addEventListener('click', () => {
          bsOffcanvas.toggle();
        });
      }
    }

    window.addEventListener(AUTH_EVENT, this._authHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener(AUTH_EVENT, this._authHandler);
  }

  handleLogout(e) {
    if (e) e.preventDefault();
    logout();
    window.location.href = '/login.html';
  }

  renderAuthActions() {
    if (isAuthenticated()) {
      const user = getCurrentUser();
      return html`
        <div class="d-flex align-items-center gap-2">
          <user-badge name="${user?.name || 'User'}"></user-badge>
          <button class="btn btn-outline-danger" @click=${this.handleLogout}>
            <span class="me-2">🔓</span>${t('logout')}
          </button>
        </div>
      `;
    }

    return html`
      <a href="/login.html" class="btn btn-outline-success">
        <span class="me-2">🔐</span>${t('login')}
      </a>
      <a href="/register.html" class="btn btn-success text-white">
        <span class="me-2">🆕</span>${t('register')}
      </a>
    `;
  }

  renderOffcanvasAuth() {
    if (isAuthenticated()) {
      const user = getCurrentUser();
      return html`
        <div class="text-center mb-3">
          <user-badge name="${user?.name || 'User'}"></user-badge>
        </div>
        <button class="btn btn-outline-danger w-100 mb-2" @click=${this.handleLogout}>
          <span class="me-2">🔓</span>${t('logout')}
        </button>
      `;
    }

    return html`
      <a href="/login.html" class="btn btn-outline-success w-100">
        <span class="me-2">🔐</span>${t('login')}
      </a>
      <a href="/register.html" class="btn btn-success w-100">
        <span class="me-2">🆕</span>${t('register')}
      </a>
    `;
  }

  render() {
    const locale = getCurrentLocale() || "en";

    return html`
      <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div class="container-fluid">
          <a class="navbar-brand fw-bold text-primary" href="/">
            <span class="me-2">📖</span>${t('appName')}
          </a>
          
          <button 
            class="navbar-toggler d-lg-none" 
            type="button" 
            data-bs-toggle="offcanvas" 
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="d-none d-lg-flex align-items-center gap-2">
            <a href="/add.html" class="btn btn-outline-primary">
              <span class="me-2">➕</span>${t('addStory')}
            </a>

            <a href="/profile.html" class="btn btn-outline-info">
              <span class="me-2">👤</span>${t('profile')}
            </a>

            ${this.renderAuthActions()}
            
            <div class="dropdown">
              <button 
                class="btn btn-secondary dropdown-toggle" 
                type="button" 
                data-bs-toggle="dropdown"
              >
                🌐 ${locale.toUpperCase()}
              </button>

              <ul class="dropdown-menu dropdown-menu-end">
                ${this.languageItems(locale)}
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <!-- Offcanvas -->
      <div 
        class="offcanvas offcanvas-end" 
        tabindex="-1" 
        id="offcanvasNavbar"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title fw-bold text-primary">
            ${t('appName')}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>

        <div class="offcanvas-body">
          <div class="d-flex flex-column gap-3">

            <a href="/" class="btn btn-outline-primary w-100">
              <span class="me-2">🏠</span>${t('home')}
            </a>

            <a href="/add.html" class="btn btn-primary w-100">
              <span class="me-2">➕</span>${t('addStory')}
            </a>

            <a href="/profile.html" class="btn btn-outline-info w-100">
              <span class="me-2">👤</span>${t('profileDeveloper')}
            </a>

            ${this.renderOffcanvasAuth()}

            <hr>

            <div class="dropdown">
              <button class="btn btn-secondary w-100 dropdown-toggle" type="button" data-bs-toggle="dropdown">
                🌐 ${t('language') || "Language"}
              </button>

              <ul class="dropdown-menu w-100">
                ${this.languageItems(locale)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Render language items dynamically
  languageItems(locale) {
    const languages = [
      { code: "id", label: "🇮🇩 Indonesia" },
      { code: "en", label: "🇬🇧 English" },
      { code: "es", label: "🇪🇸 Español" },
      { code: "fr", label: "🇫🇷 Français" }
    ];

    return languages.map(l => html`
      <li>
        <a 
          href="#" 
          data-lang="${l.code}" 
          class="dropdown-item ${locale === l.code ? 'active' : ''}"
        >
          ${l.label}
        </a>
      </li>
    `);
  }
}

customElements.define('app-navbar', AppNavbar);
