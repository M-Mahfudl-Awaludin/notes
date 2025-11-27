import { LitElement, html } from 'lit';
import { t } from '../i18n/translations-lit.js';
import { addStory } from '../services/storyService.js';
import { isAuthenticated } from '../services/authService.js';

class AddStoryForm extends LitElement {
  static properties = {
    isValidated: { type: Boolean },
    loading: { type: Boolean }
  };

  constructor() {
    super();
    this.isValidated = false;
    this.loading = false;
  }

  createRenderRoot() {
    return this; // Disable shadow DOM to use Bootstrap
  }

  firstUpdated() {
    const form = this.querySelector('form');
    if (form) {
      form.addEventListener('submit', this.handleSubmit.bind(this));
      // Add validation on input
      form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('blur', () => this.validateField(input));
        input.addEventListener('input', () => {
          if (this.isValidated) {
            this.validateField(input);
          }
        });
      });
    }
  }

  validateField(field) {
    const isValid = field.checkValidity();
    if (isValid) {
      field.classList.remove('is-invalid');
      field.classList.add('is-valid');
    } else {
      field.classList.remove('is-valid');
      field.classList.add('is-invalid');
    }
    return isValid;
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.isValidated = true;

    if (!isAuthenticated()) {
      this.showErrorMessage(t('loginRequired'));
      return;
    }

    const form = e.target;
    const descriptionField = form.querySelector('#description');
    const photoField = form.querySelector('#photo');
    const description = descriptionField.value.trim();
    const photo = photoField.files[0];

    const isDescriptionValid = this.validateField(descriptionField);
    const isPhotoValid = this.validateField(photoField);

    if (!isDescriptionValid || !isPhotoValid) {
      form.classList.add('was-validated');
      return;
    }

    if (!photo.type.startsWith('image/')) {
      this.showErrorMessage(t('photoMustImage'));
      return;
    }

    const maxSize = 1 * 1024 * 1024; // 1MB
    if (photo.size > maxSize) {
      this.showErrorMessage(t('photoTooLarge'));
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    this.setLoadingState(submitButton, true);

    try {
      await addStory({ description, photoFile: photo });
      this.showSuccessMessage();
      form.reset();
      form.classList.remove('was-validated');
      form.querySelectorAll('.is-valid, .is-invalid').forEach((el) => {
        el.classList.remove('is-valid', 'is-invalid');
      });

      this.setLoadingState(submitButton, false);

      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } catch (error) {
      this.showErrorMessage(error.message || t('genericError'));
      this.setLoadingState(submitButton, false);
    }
  }

  setLoadingState(button, isLoading) {
    this.loading = isLoading;
    if (!button) return;
    if (isLoading) {
      button.disabled = true;
      button.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2" role="status"></span>
        ${t('saving')}
      `;
    } else {
      button.disabled = false;
      button.innerHTML = `<i class="bi bi-check-circle me-2"></i>${t('submit')}`;
    }
  }

  showSuccessMessage() {
    const alert = document.createElement('div');
    alert.className = 'alert alert-success alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3';
    alert.style.zIndex = '9999';
    alert.innerHTML = `
      <strong>${t('successMessage')}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(alert);

    setTimeout(() => {
      alert.remove();
    }, 3000);
  }

  showErrorMessage(message = t('genericError')) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-danger alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3';
    alert.style.zIndex = '9999';
    alert.style.maxWidth = '500px';
    alert.innerHTML = `
      <strong>Error!</strong> ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(alert);

    setTimeout(() => {
      alert.remove();
    }, 5000);
  }

  render() {
    return html`
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-6">
          <div class="card shadow-lg border-0">
            <div class="card-header bg-primary text-white">
              <h3 class="card-title mb-0">
                <i class="bi bi-plus-circle me-2"></i>${t('addStory')}
              </h3>
            </div>
            <div class="card-body p-4">
              <form class="needs-validation" novalidate>
                <div class="mb-4">
                  <label for="description" class="form-label fw-bold">
                    ${t('description')}
                  </label>
                  <textarea 
                    class="form-control" 
                    id="description" 
                    rows="5" 
                    placeholder="Ceritakan kisah Anda..."
                    required
                    minlength="10"
                  ></textarea>
                  <div class="invalid-feedback">
                    ${t('validationDescription')}
                  </div>
                  <div class="valid-feedback">
                    ${t('validationDescriptionGood')}
                  </div>
                </div>

                <div class="mb-4">
                  <label for="photo" class="form-label fw-bold">
                    ${t('choosePhoto')}
                  </label>
                  <input 
                    type="file" 
                    class="form-control" 
                    id="photo" 
                    accept="image/*"
                    required
                  />
                  <div class="invalid-feedback">
                    ${t('validationPhoto')}
                  </div>
                  <div class="valid-feedback">
                    ${t('validationPhotoGood')}
                  </div>
                  <small class="form-text text-muted">
                    ${t('photoHelper')}
                  </small>
                </div>

                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                  <a href="/" class="btn btn-outline-secondary">
                    ${t('cancel')}
                  </a>
                  <button type="submit" class="btn btn-primary">
                    <i class="bi bi-check-circle me-2"></i>${t('submit')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('add-story-form', AddStoryForm);
