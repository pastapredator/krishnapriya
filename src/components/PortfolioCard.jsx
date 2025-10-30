import React from 'react'

export default function PortfolioCard({ item }) {
  const imageUrl = item.preview_image || item.og_image || '/assets/img/pudhina.jpg'

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="portfolio-card"
    >
      <div className="portfolio-card-image">
        <img src={imageUrl} alt={item.title} loading="lazy" />
      </div>
      <div className="portfolio-card-content">
        <h3 className="portfolio-card-title">{item.title}</h3>
        {item.description && (
          <p className="portfolio-card-description">{item.description}</p>
        )}
        {item.technologies && item.technologies.length > 0 && (
          <div className="portfolio-card-tags">
            {item.technologies.map((tech, idx) => (
              <span key={idx} className="portfolio-tag">{tech}</span>
            ))}
          </div>
        )}
        {item.category && (
          <span className="portfolio-card-category">{item.category}</span>
        )}
      </div>
    </a>
  )
}
