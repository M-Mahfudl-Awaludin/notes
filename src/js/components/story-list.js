import { getAllStories } from '../services/storyService.js';
import './story-card.js';
import { t } from '../i18n/translations-lit.js';

function createLoadingState() {
  const wrapper = document.createElement('div');
  wrapper.className = 'col-12 text-center py-5';
  wrapper.innerHTML = `
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <p class="mt-3 text-muted">${t('loadingStories')}</p>
  `;
  return wrapper;
}

function renderEmptyState(container) {
  const emptyState = document.createElement('div');
  emptyState.className = 'col-12';
  emptyState.innerHTML = `
    <div class="card border-0 shadow-sm text-center py-5">
      <div class="card-body">
        <div class="mb-3" style="font-size: 4rem;">📖</div>
        <h3 class="card-title">${t('emptyState')}</h3>
        <p class="text-muted">${t('emptyStateDesc')}</p>
        <a href="/add.html" class="btn btn-primary mt-3">
          <span class="me-2">➕</span>${t('addStory')}
        </a>
      </div>
    </div>
  `;
  container.appendChild(emptyState);
}

function renderStories(container, stories = []) {
  stories.forEach((story) => {
    const col = document.createElement('div');
    col.className = 'col-12 col-md-6 col-lg-4';
    const card = document.createElement('story-card');
    card.story = story;
    col.appendChild(card);
    container.appendChild(col);
  });
}

export async function renderStoryList(root) {
  if (!root) return;

  root.innerHTML = '';
  const header = document.createElement('div');
  header.className = 'mb-4';
  header.innerHTML = `
    <div class="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center gap-3">
      <div>
        <h1 class="h2 fw-bold text-primary mb-1">
          <span class="me-2">📚</span>${t('stories')}
        </h1>
        <p class="text-muted mb-0">${t('storiesSubtitle')}</p>
      </div>
      <a href="/add.html" class="btn btn-primary">
        <span class="me-2">➕</span>${t('addStory')}
      </a>
    </div>
  `;
  root.appendChild(header);

  const container = document.createElement('div');
  container.className = 'row g-4';
  container.appendChild(createLoadingState());
  root.appendChild(container);

  try {
    const { listStory = [] } = await getAllStories({ size: 30 });
    container.innerHTML = '';
    if (listStory.length === 0) {
      renderEmptyState(container);
      return;
    }

    renderStories(container, listStory);
  } catch (error) {
    const isUnauthorized = error.status === 401;
    const message = isUnauthorized ? t('loginRequired') : (error.message || 'Unknown error');

    container.innerHTML = `
      <div class="col-12">
        <div class="alert alert-danger text-center" role="alert">
          <strong>${t('loadStoriesError')}</strong>
          <p class="text-muted mb-0 mt-2">${message}</p>
          ${
            isUnauthorized
              ? `<a class="btn btn-primary mt-3" href="/login.html">${t('login')}</a>`
              : `<button class="btn btn-outline-light mt-3" data-action="retry-stories">${t('tryAgain')}</button>`
          }
        </div>
      </div>
    `;

    if (!isUnauthorized) {
      container.querySelector('[data-action="retry-stories"]')?.addEventListener('click', () => {
        renderStoryList(root);
      });
    }
  }
}