import React from 'react'
import PortfolioGrid from './components/PortfolioGrid'
import './styles/portfolio.css'

export default function Portfolio() {
  return (
    <div className="portfolio-page">
      <header className="portfolio-header">
        <h1>Portfolio</h1>
        <p>A collection of products and projects I've built</p>
      </header>
      <main className="portfolio-main">
        <PortfolioGrid />
      </main>
    </div>
  )
}
