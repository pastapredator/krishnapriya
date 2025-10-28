---
layout: page
title: Portfolio
subtitle: My Projects
sitemap:
  priority: 0.9
---

<div class="portfolio-container">
  <div class="portfolio-intro">
    <p>Here are some of the projects I've worked on.</p>
  </div>

  <div class="portfolio-grid">
    <div class="project-card">
      <h3>Project Title 1</h3>
      <p class="project-description">
        Brief description of the project, technologies used, and your role.
      </p>
      <div class="project-links">
        <a href="#" class="project-link">View Project</a>
        <a href="#" class="project-link">GitHub</a>
      </div>
    </div>

    <div class="project-card">
      <h3>Project Title 2</h3>
      <p class="project-description">
        Brief description of the project, technologies used, and your role.
      </p>
      <div class="project-links">
        <a href="#" class="project-link">View Project</a>
        <a href="#" class="project-link">GitHub</a>
      </div>
    </div>

    <div class="project-card">
      <h3>Project Title 3</h3>
      <p class="project-description">
        Brief description of the project, technologies used, and your role.
      </p>
      <div class="project-links">
        <a href="#" class="project-link">View Project</a>
        <a href="#" class="project-link">GitHub</a>
      </div>
    </div>

    <div class="project-card">
      <h3>Project Title 4</h3>
      <p class="project-description">
        Brief description of the project, technologies used, and your role.
      </p>
      <div class="project-links">
        <a href="#" class="project-link">View Project</a>
        <a href="#" class="project-link">GitHub</a>
      </div>
    </div>
  </div>
</div>

<style>
.portfolio-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.portfolio-intro {
  text-align: center;
  margin-bottom: 40px;
}

.portfolio-intro p {
  font-size: 1.1em;
  color: #666;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 30px;
}

.project-card {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 25px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.project-card h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #333;
  font-size: 1.4em;
}

.project-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}

.project-links {
  display: flex;
  gap: 15px;
}

.project-link {
  display: inline-block;
  padding: 8px 16px;
  background: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.3s ease;
}

.project-link:hover {
  background: #0056b3;
}
</style>
