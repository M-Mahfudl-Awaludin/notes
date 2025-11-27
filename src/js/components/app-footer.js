import { LitElement, html } from 'lit';

class AppFooter extends LitElement {
  createRenderRoot() {
    return this; // Disable shadow DOM to use Bootstrap
  }

  render() {
    const year = new Date().getFullYear();
    return html`
      <footer class="app-footer">
        <div class="container">
          <div class="row">
            <div class="col-12 text-center">
              <p class="mb-0">© ${year} Story App — Dibuat dengan <span class="text-danger">❤️</span></p>
              <p class="text-muted small mt-2">Share your stories, share your life</p>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('app-footer', AppFooter);
