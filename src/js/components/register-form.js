import { LitElement, html } from 'lit';
import { t } from '../i18n/translations-lit.js';
import { register } from '../services/authService.js';

class RegisterForm extends LitElement {
  static properties = {
    loading: { type: Boolean },
    showPassword: { type: Boolean },
    feedback: { type: Object },
  };

  constructor() {
    super();
    this.loading = false;
    this.showPassword = false;
    this.feedback = { error: '', success: '' };
  }

  createRenderRoot() {
    return this;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const input = this.querySelector('#password');
    if (input) {
      input.type = this.showPassword ? 'text' : 'password';
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    }
  }

  setLoadingState(button, isLoading) {
    this.loading = isLoading;
    if (!button) return;
    if (isLoading) {
      button.disabled = true;
      button.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2" role="status"></span>
        ${t('processing')}
      `;
    } else {
      button.disabled = false;
      button.innerHTML = `<i class="bi bi-person-plus me-2"></i>${t('register')}`;
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    this.feedback = { error: '', success: '' };

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const password = form.querySelector('#password').value;
    const submitButton = form.querySelector('button[type="submit"]');
    this.setLoadingState(submitButton, true);

    try {
      await register({ name, email, password });
      this.feedback = { success: t('registerSuccess'), error: '' };
      form.reset();
      setTimeout(() => {
        window.location.href = '/login.html';
      }, 1500);
    } catch (error) {
      this.feedback = { error: error.message || t('genericError'), success: '' };
    } finally {
      this.setLoadingState(submitButton, false);
    }
  }

  renderFeedback() {
    if (this.feedback.error) {
      return html`<div class="alert alert-danger" role="alert">${this.feedback.error}</div>`;
    }
    if (this.feedback.success) {
      return html`<div class="alert alert-success" role="alert">${this.feedback.success}</div>`;
    }
    return null;
  }

  render() {
    return html`
      <div class="row justify-content-center">
        <div class="col-12 col-md-7 col-lg-5">
          <div class="card shadow border-0">
            <div class="card-body p-4 p-md-5">
              <h1 class="h3 fw-bold text-primary mb-2">${t('register')}</h1>
              <p class="text-muted mb-4">${t('registerSubtitle')}</p>

              ${this.renderFeedback() || ''}

              <form class="needs-validation" novalidate @submit=${this.handleSubmit}>
                <div class="mb-3">
                  <label for="name" class="form-label fw-semibold">${t('name')}</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    required
                    minlength="3"
                    placeholder="Dicoding Learner"
                  />
                  <div class="invalid-feedback">
                    ${t('nameRequired')}
                  </div>
                </div>

                <div class="mb-3">
                  <label for="email" class="form-label fw-semibold">${t('email')}</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    required
                    autocomplete="email"
                    placeholder="you@example.com"
                  />
                  <div class="invalid-feedback">
                    ${t('emailRequired')}
                  </div>
                </div>

                <div class="mb-4">
                  <label for="password" class="form-label fw-semibold d-flex justify-content-between align-items-center">
                    <span>${t('password')}</span>
                    <button type="button" class="btn btn-link btn-sm p-0" @click=${this.togglePasswordVisibility}>
                      ${this.showPassword ? t('hidePassword') : t('showPassword')}
                    </button>
                  </label>
                  <div class="input-group">
                    <input
                      type="password"
                      class="form-control"
                      id="password"
                      required
                      minlength="8"
                      autocomplete="new-password"
                      placeholder="••••••••"
                    />
                    <span class="input-group-text">
                      ${this.showPassword ? '👁️' : '🙈'}
                    </span>
                  </div>
                  <div class="form-text">${t('passwordHint')}</div>
                  <div class="invalid-feedback">
                    ${t('passwordHint')}
                  </div>
                </div>

                <button type="submit" class="btn btn-primary w-100">
                  <i class="bi bi-person-plus me-2"></i>${t('register')}
                </button>
              </form>

              <p class="text-center mt-4 mb-0">
                ${t('haveAccountQuestion')}
                <a href="/login.html">${t('goToLogin')}</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('register-form', RegisterForm);

