'use client'

import { useState, useEffect } from 'react'
import { Truck, Star, MapPin, CheckCircle, Clock, Loader2, Search, UserPlus, Info } from 'lucide-react'

interface Partner {
  id: string
  name: string
  type: string
  rating: number
  location: string
  availability: boolean
  hiringRequests: { status: string }[]
}

export default function DeliveryPage() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [hiring, setHiring] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  // Mock Vendor ID for demo purposes
  const DEMO_VENDOR_ID = 'clp_demo_vendor_123'

  useEffect(() => {
    fetchPartners()
  }, [])

  const fetchPartners = async () => {
    try {
      const res = await fetch('/api/delivery')
      const data = await res.json()
      if (data.success) setPartners(data.partners)
    } catch (err) {
      console.error('Failed to fetch partners:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleHire = async (id: string) => {
    setHiring(id)
    try {
      const res = await fetch('/api/delivery/hire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vendorId: DEMO_VENDOR_ID, partnerId: id })
      })
      const data = await res.json()
      if (data.success) {
        setPartners(prev => prev.map(p => 
          p.id === id ? { ...p, hiringRequests: [{ status: 'PENDING' }] } : p
        ))
      }
    } catch (err) {
      console.error('Hiring failed:', err)
    } finally {
      setHiring(null)
    }
  }

  const filtered = partners.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.location.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="animate-slide-up">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="section-title">Delivery Partner Hiring</h1>
          <p className="section-subtitle">Scale your delivery fleet by hiring verified independent partners and agencies.</p>
        </div>
        <div className="relative group min-w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-emerald-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search by name or location..." 
            className="input pl-12 h-14 rounded-2xl shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-emerald-500" size={40} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((partner) => {
            const hasApplied = partner.hiringRequests && partner.hiringRequests.length > 0;
            return (
              <div key={partner.id} className="card group hover:shadow-2xl hover:shadow-emerald-500/5 transition-all flex flex-col h-full">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-inner">
                    <Truck size={24} />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-1 bg-amber-500/10 text-amber-500 px-2 py-1 rounded-lg text-xs font-bold">
                      <Star size={12} fill="currentColor" />
                      {partner.rating.toFixed(1)}
                    </div>
                    {hasApplied && (
                      <span className="badge badge-pending flex items-center gap-1 animate-fade-in shadow-sm">
                        <Clock size={12} />
                        Request Sent
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-1 tracking-tight">{partner.name}</h3>
                  <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest">{partner.type}</p>
                </div>

                <div className="space-y-3 mb-8 flex-1">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <MapPin size={16} className="text-emerald-500/70" />
                    {partner.location}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle size={16} className={`text-emerald-500/70 ${!partner.availability && 'text-destructive/70'}`} />
                    {partner.availability ? 'Available for hiring' : 'Currently busy'}
                  </div>
                </div>

                <div className="mt-auto flex items-center gap-3 pt-6 border-t border-border">
                  <button 
                    disabled={hasApplied || hiring === partner.id || !partner.availability}
                    className={`btn flex-1 h-12 rounded-xl text-sm font-bold ${hasApplied ? 'btn-secondary opacity-70 cursor-not-allowed text-muted-foreground' : 'btn-primary shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20'}`}
                    onClick={() => handleHire(partner.id)}
                  >
                    {hiring === partner.id ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : hasApplied ? (
                      'Request Pending'
                    ) : (
                      <>
                        <UserPlus size={16} />
                        Hire Partner
                      </>
                    )}
                  </button>
                  <button className="btn btn-secondary w-12 h-12 p-0 flex items-center justify-center rounded-xl hover:border-emerald-500/50 transition-colors">
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
            <Truck className="text-muted-foreground" size={32} />
          </div>
          <h3 className="text-xl font-bold mb-2">No partners found</h3>
          <p className="text-muted-foreground mb-8">Try searching for metro cities or specific partner types.</p>
          <button className="btn btn-secondary h-12 px-8" onClick={() => setSearch('')}>
            Reset Search
          </button>
        </div>
      )}
    </div>
  )
}
