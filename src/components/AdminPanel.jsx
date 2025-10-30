import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function AdminPanel({ user }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    preview_image: '',
    og_image: '',
    technologies: '',
    category: '',
    date_completed: '',
    display_order: 0,
    is_featured: false,
    is_published: true
  })

  useEffect(() => {
    fetchItems()
  }, [])

  async function fetchItems() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false })

      if (error) throw error
      setItems(data || [])
    } catch (error) {
      console.error('Error:', error)
      alert('Error loading items: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const itemData = {
      ...formData,
      technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
      created_by: user.id
    }

    try {
      if (editing) {
        const { error } = await supabase
          .from('portfolio_items')
          .update(itemData)
          .eq('id', editing)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('portfolio_items')
          .insert([itemData])

        if (error) throw error
      }

      resetForm()
      fetchItems()
    } catch (error) {
      console.error('Error:', error)
      alert('Error saving item: ' + error.message)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this item?')) return

    try {
      const { error } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchItems()
    } catch (error) {
      console.error('Error:', error)
      alert('Error deleting item: ' + error.message)
    }
  }

  function handleEdit(item) {
    setEditing(item.id)
    setFormData({
      title: item.title,
      description: item.description || '',
      url: item.url,
      preview_image: item.preview_image || '',
      og_image: item.og_image || '',
      technologies: (item.technologies || []).join(', '),
      category: item.category || '',
      date_completed: item.date_completed || '',
      display_order: item.display_order || 0,
      is_featured: item.is_featured || false,
      is_published: item.is_published !== false
    })
  }

  function resetForm() {
    setEditing(null)
    setFormData({
      title: '',
      description: '',
      url: '',
      preview_image: '',
      og_image: '',
      technologies: '',
      category: '',
      date_completed: '',
      display_order: 0,
      is_featured: false,
      is_published: true
    })
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    window.location.reload()
  }

  async function fetchOgImage() {
    if (!formData.url) return

    try {
      const response = await fetch(formData.url)
      const html = await response.text()
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, 'text/html')
      const ogImage = doc.querySelector('meta[property="og:image"]')?.content

      if (ogImage) {
        setFormData({ ...formData, og_image: ogImage })
      }
    } catch (error) {
      console.error('Error fetching OG image:', error)
    }
  }

  if (loading) {
    return <div className="admin-loading">Loading...</div>
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Portfolio Admin</h1>
        <button onClick={handleSignOut} className="btn-secondary">Sign Out</button>
      </div>

      <div className="admin-content">
        <div className="admin-form-section">
          <h2>{editing ? 'Edit Item' : 'Add New Item'}</h2>
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>URL *</label>
              <div className="input-with-button">
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  required
                />
                <button type="button" onClick={fetchOgImage} className="btn-secondary btn-sm">
                  Fetch OG Image
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>Preview Image URL</label>
              <input
                type="url"
                value={formData.preview_image}
                onChange={(e) => setFormData({ ...formData, preview_image: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>OG Image URL</label>
              <input
                type="url"
                value={formData.og_image}
                onChange={(e) => setFormData({ ...formData, og_image: e.target.value })}
                readOnly={false}
              />
            </div>

            <div className="form-group">
              <label>Technologies (comma-separated)</label>
              <input
                type="text"
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                placeholder="React, Node.js, PostgreSQL"
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="Web App, Mobile App, etc."
              />
            </div>

            <div className="form-group">
              <label>Date Completed</label>
              <input
                type="date"
                value={formData.date_completed}
                onChange={(e) => setFormData({ ...formData, date_completed: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Display Order</label>
              <input
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div className="form-group-checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                />
                Featured (show on homepage)
              </label>
            </div>

            <div className="form-group-checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={formData.is_published}
                  onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                />
                Published
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editing ? 'Update' : 'Add'} Item
              </button>
              {editing && (
                <button type="button" onClick={resetForm} className="btn-secondary">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="admin-items-section">
          <h2>Portfolio Items ({items.length})</h2>
          <div className="items-list">
            {items.map((item) => (
              <div key={item.id} className="item-row">
                <div className="item-info">
                  <h3>{item.title}</h3>
                  <p className="item-url">{item.url}</p>
                  <div className="item-meta">
                    {item.is_featured && <span className="badge">Featured</span>}
                    {!item.is_published && <span className="badge badge-draft">Draft</span>}
                    <span className="badge">Order: {item.display_order}</span>
                  </div>
                </div>
                <div className="item-actions">
                  <button onClick={() => handleEdit(item)} className="btn-secondary btn-sm">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="btn-danger btn-sm">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
