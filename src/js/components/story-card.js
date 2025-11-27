import { LitElement, html, css } from 'lit';

class StoryCard extends LitElement {
  static properties = {
    story: { type: Object }
  };

  constructor() {
    super();
    this.story = null;
  }

  createRenderRoot() {
    return this; // Disable shadow DOM to use Bootstrap
  }

  render() {
    if (!this.story) return html``;

    return html`
      <div class="story-card card h-100 shadow-sm">
        <img 
          src="${this.story.photoUrl}" 
          alt="${this.story.name}" 
          class="card-img-top"
          loading="lazy"
        />

        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${this.story.name}</h5>
          <p class="card-text flex-grow-1">${this.story.description}</p>

          <localized-date 
            date="${this.story.createdAt}"
            class="text-muted small"
          ></localized-date>
        </div>
      </div>
    `;
  }
}

customElements.define('story-card', StoryCard);
