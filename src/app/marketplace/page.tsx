'use client'

import { useState, useEffect } from 'react'
import { ShoppingBag, Search, Filter, CheckCircle2, Link as LinkIcon, Loader2, Info } from 'lucide-react'

interface Marketplace {
  id: string
  name: string
  category: string
  description: string
  logoUrl: string
  connections: { status: string }[]
}

export default function MarketplacePage() {
  const [marketplaces, setMarketplaces] = useState<Marketplace[]>([])
  const [loading, setLoading] = useState(true)
  const [connecting, setConnecting] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  // Mock Vendor ID for demo purposes
  const DEMO_VENDOR_ID = 'clp_demo_vendor_123'

  useEffect(() => {
    fetchMarketplaces()
  }, [])

  const fetchMarketplaces = async () => {
    try {
      const res = await fetch('/api/marketplace')
      const data = await res.json()
      if (data.success) setMarketplaces(data.marketplaces)
    } catch (err) {
      console.error('Failed to fetch marketplaces:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleConnect = async (id: string) => {
    setConnecting(id)
    try {
      const res = await fetch('/api/marketplace/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vendorId: DEMO_VENDOR_ID, marketplaceId: id })
      })
      const data = await res.json()
      if (data.success) {
        setMarketplaces(prev => prev.map(m => 
          m.id === id ? { ...m, connections: [{ status: 'CONNECTED' }] } : m
        ))
      }
    } catch (err) {
      console.error('Connection failed:', err)
    } finally {
      setConnecting(null)
    }
  }

  const filtered = marketplaces.filter(m => 
    (category === 'All' || m.category === category) &&
    (m.name.toLowerCase().includes(search.toLowerCase()) || m.description.toLowerCase().includes(search.toLowerCase()))
  )

  const categories = ['All', ...Array.from(new Set(marketplaces.map(m => m.category)))]

  return (
    <div className="animate-slide-up">
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="section-title">Marketplace Exploration</h1>
          <p className="section-subtitle">Discover and connect your business with top delivery and e-commerce platforms.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group min-w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-emerald-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search platforms..." 
              className="input pl-12 h-12"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="relative h-12">
            <select 
              className="input h-12 pr-10 appearance-none bg-secondary/50 cursor-pointer"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={16} />
          </div>
        </div>
      </header>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-emerald-500" size={40} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((market) => {
            const isConnected = market.connections && market.connections.length > 0;
            return (
              <div key={market.id} className="card group flex flex-col h-full hover:shadow-xl hover:shadow-emerald-500/5 transition-all">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-white p-2 border border-border group-hover:border-emerald-500/20 transition-all flex items-center justify-center overflow-hidden shadow-sm">
                    {market.logoUrl ? (
                      <img src={market.logoUrl} alt={`${market.name} logo`} className="max-w-full max-h-full object-contain" />
                    ) : (
                      <ShoppingBag className="text-muted-foreground" size={24} />
                    )}
                  </div>
                  {isConnected && (
                    <span className="badge badge-verified flex items-center gap-1.5 animate-fade-in">
                      <CheckCircle2 size={12} />
                      Connected
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-bold mb-1 group-hover:text-emerald-500 transition-colors">{market.name}</h3>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-500/80 mb-4 block">{market.category}</span>
                <p className="text-sm text-muted-foreground mb-8 flex-1 leading-relaxed">{market.description}</p>
                
                <div className="pt-6 border-t border-border mt-auto flex items-center gap-3">
                  <button 
                    disabled={isConnected || connecting === market.id}
                    className={`btn flex-1 h-12 rounded-xl text-sm ${isConnected ? 'btn-secondary opacity-70 cursor-not-allowed text-muted-foreground' : 'btn-primary shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20'}`}
                    onClick={() => handleConnect(market.id)}
                  >
                    {connecting === market.id ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : isConnected ? (
                      'Connected'
                    ) : (
                      <>
                        <LinkIcon size={16} />
                        Connect Now
                      </>
                    )}
                  </button>
                  <button className="btn btn-secondary w-12 h-12 p-0 flex items-center justify-center rounded-xl" title="Platform Details">
                    <Info size={18} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-center py-24 bg-card rounded-3xl border border-dashed border-border mt-10 animate-fade-in shadow-inner">
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="text-muted-foreground" size={32} />
          </div>
          <h3 className="text-xl font-bold mb-2">No platforms found</h3>
          <p className="text-muted-foreground mb-8">Try adjusting your search or category filters.</p>
          <button className="btn btn-secondary h-12 px-8" onClick={() => { setSearch(''); setCategory('All'); }}>
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}
