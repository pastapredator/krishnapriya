import React from 'react'
import PortfolioGrid from './components/PortfolioGrid'
import './styles/home.css'

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <img src="/krishnapriya/assets/img/pudhina.jpg" alt="Profile" className="hero-img" />
        <div className="hero-text">
          <h1>Hello,</h1>
          <h2>I like to make ideas happen...</h2>
          <p>A collection of musings on technology, design and maybe a few adventures in between.</p>
        </div>
      </section>

      <section className="portfolio-section">
        <div className="section-header">
          <h2>Featured Projects</h2>
          <a href="/krishnapriya/portfolio.html" className="view-all-link">View All →</a>
        </div>
        <PortfolioGrid featured={true} limit={6} />
      </section>
    </div>
  )
}
