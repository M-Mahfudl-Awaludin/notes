import { LitElement, html, css } from 'lit';

class ProfilePage extends LitElement {
  static styles = css`
    .profile-container {
      max-width: 1000px;
      margin: 0 auto;
    }

    .profile-header-card {
      background: linear-gradient(135deg, #4285f4 0%, #1a73e8 100%);
      border: none !important;
      overflow: hidden;
      position: relative;
    }

    .profile-header-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(66, 133, 244, 0.1) 0%, rgba(26, 115, 232, 0.1) 100%);
      pointer-events: none;
    }

    .profile-header-card .card-body {
      position: relative;
      z-index: 1;
      color: white;
    }

    .profile-avatar-wrapper {
      position: relative;
      display: inline-block;
    }

    .profile-avatar {
      width: 180px;
      height: 180px;
      border-radius: 50%;
      border: 6px solid rgba(255, 255, 255, 0.9);
      object-fit: cover;
      display: block;
      margin: 0 auto;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .profile-avatar:hover {
      transform: scale(1.05);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
    }

    .profile-name {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      flex-wrap: wrap;
      color: white;
    }

    .verification-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(10px);
      padding: 0.375rem 0.875rem;
      border-radius: 20px;
      font-size: 0.875rem;
      font-weight: 500;
      border: 1px solid rgba(255, 255, 255, 0.3);
    }

    .profile-title {
      font-size: 1.125rem;
      font-weight: 500;
      margin-bottom: 0.25rem;
      color: rgba(255, 255, 255, 0.95);
    }

    .profile-pronouns {
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.85);
    }

    .profile-card {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid #e8eaed;
      overflow: hidden;
    }

    .profile-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15) !important;
    }

    .profile-card .card-header {
      border: none;
      font-weight: 600;
      padding: 1rem 1.5rem;
    }

    .profile-card .card-body {
      padding: 1.5rem;
    }

    .experience-item {
      padding: 1rem 0;
      border-bottom: 1px solid #e8eaed;
    }

    .experience-item:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    .experience-title {
      font-weight: 600;
      color: #202124;
      font-size: 1rem;
      margin-bottom: 0.25rem;
    }

    .experience-org {
      color: #5f6368;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }

    .skills-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .skill-badge {
      background: linear-gradient(135deg, #4285f4 0%, #1a73e8 100%);
      color: white;
      padding: 0.625rem 1.25rem;
      border-radius: 25px;
      font-size: 0.875rem;
      font-weight: 500;
      box-shadow: 0 2px 8px rgba(66, 133, 244, 0.3);
      transition: all 0.2s ease;
    }

    .skill-badge:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(66, 133, 244, 0.4);
    }

    .contact-card {
      background: linear-gradient(135deg, #f8f9fa 0%, #e8eaed 100%);
      border: none !important;
    }

    .contact-title {
      font-size: 1.75rem;
      font-weight: 700;
      color: #202124;
      margin-bottom: 0;
    }

    .contact-links {
      display: flex;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
      margin-top: 1.5rem;
    }

    .contact-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.875rem 1.75rem;
      background: white;
      border-radius: 12px;
      text-decoration: none;
      color: #4285f4;
      font-weight: 500;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      border: 2px solid transparent;
    }

    .contact-link:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 20px rgba(66, 133, 244, 0.25);
      color: #1a73e8;
      border-color: #4285f4;
      background: #f8f9ff;
    }

    .badge {
      font-size: 0.8rem;
      padding: 0.4rem 0.8rem;
      font-weight: 500;
    }

    @media (max-width: 768px) {
      .profile-avatar {
        width: 140px;
        height: 140px;
      }

      .profile-name {
        font-size: 1.5rem;
        flex-direction: column;
      }

      .profile-title {
        font-size: 1rem;
      }

      .contact-title {
        font-size: 1.5rem;
      }
    }
  `;

  createRenderRoot() {
    return this; // Disable shadow DOM to use Bootstrap
  }

  render() {
    return html`
      <div class="profile-container">
        <!-- Profile Header Card -->
        <div class="card profile-header-card shadow-lg border-0 mb-4">
          <div class="card-body text-center p-4">
            <div class="profile-avatar-wrapper mb-3">
              <img 
                src="profile.png" 
                alt="M Mahfudl Awaludin" 
                class="profile-avatar"
                onerror="this.src='https://ui-avatars.com/api/?name=M+Mahfudl+Awaludin&size=300&background=4285f4&color=fff&bold=true'"
              />
            </div>
            <h1 class="profile-name mb-2">
              M Mahfudl (Mahfud) Awaludin
              <span class="verification-badge">
                        </span>
            </h1>
            <p class="profile-title mb-1">Machine Learning Mentor | Technical Team Lead</p>
            <p class="profile-pronouns text-muted mb-0">He/Him</p>
          </div>
        </div>

        <!-- Profile Content Grid -->
        <div class="row g-4 mb-4">
          <!-- Education Card -->
          <div class="col-12 col-md-6 col-lg-4">
            <div class="card profile-card h-100 shadow-sm border-0">
              <div class="card-header bg-primary text-white">
                <h5 class="card-title mb-0">
                  <span class="me-2">🎓</span> Education
                </h5>
              </div>
              <div class="card-body">
                <div class="experience-item">
                  <h6 class="experience-title mb-1">Bachelor of Informatics</h6>
                  <p class="experience-org mb-1">Universitas Siber Asia</p>
                  <span class="badge bg-primary">2025</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Current Role Card -->
          <div class="col-12 col-md-6 col-lg-4">
            <div class="card profile-card h-100 shadow-sm border-0">
              <div class="card-header bg-success text-white">
                <h5 class="card-title mb-0">
                  <span class="me-2">💼</span> Current Role
                </h5>
              </div>
              <div class="card-body">
                <div class="experience-item mb-3">
                  <h6 class="experience-title mb-1">Machine Learning Mentor</h6>
                  <p class="experience-org mb-1">ASAH 2025</p>
                  <span class="badge bg-success">2025</span>
                </div>
                <div class="experience-item">
                  <h6 class="experience-title mb-1">Technical Team Lead</h6>
                  <p class="experience-org mb-1">Pekalongan XXI</p>
                  <span class="badge bg-info">Present</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Certifications Card -->
          <div class="col-12 col-md-6 col-lg-4">
            <div class="card profile-card h-100 shadow-sm border-0">
              <div class="card-header bg-warning text-dark">
                <h5 class="card-title mb-0">
                  <span class="me-2">🏆</span> Certifications
                </h5>
              </div>
              <div class="card-body">
                <div class="experience-item mb-3">
                  <h6 class="experience-title mb-1">Graduate BEKUP CREATE</h6>
                  <p class="experience-org mb-1">Flutter Development</p>
                  <span class="badge bg-warning text-dark">2025</span>
                </div>
                <div class="experience-item mb-3">
                  <h6 class="experience-title mb-1">Laskar AI</h6>
                  <p class="experience-org mb-1">AI Program</p>
                  <span class="badge bg-warning text-dark">2025</span>
                </div>
                <div class="experience-item">
                  <h6 class="experience-title mb-1">Bangkit Academy</h6>
                  <p class="experience-org mb-1">Batch 1 & 2</p>
                  <span class="badge bg-warning text-dark">2024</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Skills Card -->
          <div class="col-12">
            <div class="card profile-card shadow-sm border-0">
              <div class="card-header bg-info text-white">
                <h5 class="card-title mb-0">
                  <span class="me-2">🛠️</span> Skills & Expertise
                </h5>
              </div>
              <div class="card-body">
                <div class="skills-grid">
                  <span class="skill-badge">Machine Learning</span>
                  <span class="skill-badge">Flutter</span>
                  <span class="skill-badge">Python</span>
                  <span class="skill-badge">JavaScript</span>
                  <span class="skill-badge">Web Development</span>
                  <span class="skill-badge">AI/ML</span>
                  <span class="skill-badge">Technical Leadership</span>
                  <span class="skill-badge">Mentoring</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Card -->
        <div class="card contact-card shadow-sm border-0">
          <div class="card-body text-center p-4">
            <h3 class="contact-title mb-4">Get in Touch</h3>
            <div class="contact-links">
              <a href="mailto:mahfudawaludin.009@gmail.com" class="contact-link">
                <span>📧</span> Email
              </a>
              <a href="https://linkedin.com" target="_blank" class="contact-link">
                <span>💼</span> LinkedIn
              </a>
              <a href="https://github.com" target="_blank" class="contact-link">
                <span>💻</span> GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('profile-page', ProfilePage);

