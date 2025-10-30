import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import PortfolioCard from './PortfolioCard'

export default function PortfolioGrid({ featured = false, limit = null }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPortfolioItems()
  }, [featured, limit])

  async function fetchPortfolioItems() {
    try {
      setLoading(true)
      let query = supabase
        .from('portfolio_items')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false })

      if (featured) {
        query = query.eq('is_featured', true)
      }

      if (limit) {
        query = query.limit(limit)
      }

      const { data, error } = await query

      if (error) throw error

      setItems(data || [])
    } catch (err) {
      console.error('Error fetching portfolio items:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="portfolio-loading">Loading portfolio...</div>
  }

  if (error) {
    return <div className="portfolio-error">Error loading portfolio: {error}</div>
  }

  if (items.length === 0) {
    return <div className="portfolio-empty">No portfolio items yet.</div>
  }

  return (
    <div className="portfolio-grid">
      {items.map((item) => (
        <PortfolioCard key={item.id} item={item} />
      ))}
    </div>
  )
}
