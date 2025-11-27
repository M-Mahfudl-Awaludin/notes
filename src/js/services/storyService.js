import { apiGet, apiPostForm } from './api.js';

export function getAllStories({ page = 1, size = 20, location = 0 } = {}) {
  return apiGet('/stories', { page, size, location });
}

export function getStoryDetail(id) {
  return apiGet(`/stories/${id}`);
}

export function addStory({ photoFile, description, lat, lon }) {
  const form = new FormData();
  form.append('photo', photoFile);
  form.append('description', description);
  if (lat !== undefined && lat !== null) form.append('lat', lat);
  if (lon !== undefined && lon !== null) form.append('lon', lon);

  return apiPostForm('/stories', form);
}

export function addStoryGuest({ photoFile, description, lat, lon }) {
  const form = new FormData();
  form.append('photo', photoFile);
  form.append('description', description);
  if (lat !== undefined && lat !== null) form.append('lat', lat);
  if (lon !== undefined && lon !== null) form.append('lon', lon);

  return apiPostForm('/stories/guest', form);
}
