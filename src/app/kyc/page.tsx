'use client'

import { useState } from 'react'
import { CheckCircle2, Upload, AlertCircle, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function KYCPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    panNumber: '',
    aadhaarNumber: '',
  })

  // Basic client-side validation logic
  const handleNext = () => {
    if (step === 1 && (!formData.fullName || !formData.email || !formData.businessName || !formData.phone)) {
      setError('Please fill in all personal and business fields.')
      return
    }
    setError('')
    setStep(step + 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/kyc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (!data.success) throw new Error(data.error || 'Submission failed')

      setStep(4) // Success step
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Something went wrong during submission.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto animate-slide-up">
      <div className="mb-12 text-center">
        <h1 className="section-title">KYC Onboarding</h1>
        <p className="section-subtitle">Complete your verification to start connecting with marketplaces.</p>
        
        {/* Progress Tracker */}
        <div className="flex items-center justify-center gap-4 mt-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex-center font-bold text-sm transition-all shadow-md ${
                step >= s ? 'bg-emerald-500 text-white' : 'bg-secondary text-muted-foreground'
              }`}>
                {step > s ? <CheckCircle2 size={18} /> : s}
              </div>
              {s < 3 && <div className={`w-12 h-0.5 rounded ${step > s ? 'bg-emerald-500' : 'bg-secondary'}`}></div>}
            </div>
          ))}
        </div>
      </div>

      <div className="card shadow-2xl relative overflow-hidden">
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-destructive/10 text-destructive text-sm flex items-center gap-3 border border-destructive/20 animate-fade-in">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {step === 1 && (
          <div className="animate-fade-in space-y-6">
            <h2 className="text-xl font-bold mb-4">Business Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="label">Full Name</label>
                <input 
                  type="text" 
                  className="input" 
                  placeholder="Kushagra Singh" 
                  value={formData.fullName} 
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label className="label">Business Name</label>
                <input 
                  type="text" 
                  className="input" 
                  placeholder="Kush Electronics" 
                  value={formData.businessName} 
                  onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="label">Business Email</label>
              <input 
                type="email" 
                className="input" 
                placeholder="kush@example.com" 
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label className="label">Mobile Number</label>
              <input 
                type="tel" 
                className="input" 
                placeholder="9876543210" 
                value={formData.phone} 
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <button className="btn btn-primary w-full h-12 mt-4" onClick={handleNext}>Next Step</button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in space-y-6">
            <h2 className="text-xl font-bold mb-4">Identity Verification</h2>
            <div className="form-group">
              <label className="label">PAN Number</label>
              <input 
                type="text" 
                className="input uppercase" 
                placeholder="ABCDE1234F" 
                maxLength={10}
                value={formData.panNumber} 
                onChange={(e) => setFormData({...formData, panNumber: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label className="label">Aadhaar Number</label>
              <input 
                type="text" 
                className="input" 
                placeholder="12 digit number" 
                maxLength={12}
                value={formData.aadhaarNumber} 
                onChange={(e) => setFormData({...formData, aadhaarNumber: e.target.value})}
              />
            </div>
            <div className="flex gap-4">
              <button className="btn btn-secondary flex-1 h-12" onClick={() => setStep(1)}>Back</button>
              <button className="btn btn-primary flex-1 h-12" onClick={handleNext}>Next Step</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <form className="animate-fade-in space-y-6" onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-4">Upload Documents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-2 border-dashed border-border rounded-2xl p-8 flex flex-col items-center gap-3 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group cursor-pointer">
                <Upload className="text-muted-foreground group-hover:text-emerald-500 transition-colors" />
                <p className="text-xs font-semibold">Upload PAN Card</p>
                <p className="text-[10px] text-muted-foreground">PDF, JPEG or PNG</p>
              </div>
              <div className="border-2 border-dashed border-border rounded-2xl p-8 flex flex-col items-center gap-3 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group cursor-pointer">
                <Upload className="text-muted-foreground group-hover:text-emerald-500 transition-colors" />
                <p className="text-xs font-semibold">Upload Aadhaar</p>
                <p className="text-[10px] text-muted-foreground">Max size 2MB</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-500 text-xs">
              <AlertCircle size={16} />
              Files are securely stored and encrypted (AES-256).
            </div>
            <div className="flex gap-4">
              <button type="button" className="btn btn-secondary flex-1 h-12" onClick={() => setStep(2)}>Back</button>
              <button type="submit" disabled={loading} className="btn btn-primary flex-1 h-12">
                {loading ? <Loader2 className="animate-spin" /> : 'Submit KYC'}
              </button>
            </div>
          </form>
        )}

        {step === 4 && (
          <div className="animate-fade-in text-center py-12 flex flex-col items-center gap-6">
            <div className="w-24 h-24 bg-emerald-500 rounded-full shadow-2xl shadow-emerald-500/20 flex items-center justify-center text-white scale-110">
              <CheckCircle2 size={48} strokeWidth={3} />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">Onboarding Request Received</h2>
              <p className="text-muted-foreground max-w-xs mx-auto">Our verification engine is now processing your documents. Status will update in your dashboard.</p>
            </div>
            <button className="btn btn-primary px-10 h-14 rounded-2xl shadow-lg shadow-emerald-500/20 mt-4" onClick={() => router.push('/')}>
              Return to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
