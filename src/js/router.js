import { renderStoryList } from './components/story-list.js';

function route() {
  const path = location.pathname;
  const hash = location.hash;
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', route);
    return;
  }
  
  const staticRoutes = [
    { path: 'profile.html', hash: '#/profile' },
    { path: 'add.html', hash: '#/add' },
    { path: 'login.html', hash: '#/login' },
    { path: 'register.html', hash: '#/register' },
  ];

  const isStaticRoute = staticRoutes.some((route) => (
    path.endsWith(route.path) ||
    path === `/${route.path}` ||
    hash === route.hash
  ));

  if (isStaticRoute) {
    return;
  }
  
  // Handle story list route (home)
  const root = document.getElementById('story-list-root');
  if (root) {
    // Always re-render to get latest data from localStorage
    renderStoryList(root);
  }
}

// Handle navigation
window.addEventListener('popstate', () => {
  setTimeout(route, 50);
});

// Run route on page load
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(route, 100);
} else {
  window.addEventListener('load', () => {
    setTimeout(route, 100);
  });
}

// Handle link clicks
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href]');
  if (link && link.href && !link.target && !link.hasAttribute('data-bs-toggle')) {
    const href = link.getAttribute('href');
    if (href === 'add.html' || href === '/add.html' || href === '/add') {
      e.preventDefault();
      window.location.href = '/add.html';
    }
  }
});

export function navigateTo(href) {
  if (href === 'add.html' || href === '/add.html' || href === '/add') {
    window.location.href = '/add.html';
  } else {
    history.pushState({}, '', href);
    setTimeout(route, 50);
  }
}