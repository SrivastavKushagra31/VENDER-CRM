import { 
  ArrowUpRight, 
  Users, 
  ShoppingBag, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  TrendingUp
} from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const stats = [
    { label: 'Active Connects', value: '12', icon: <ShoppingBag className="text-emerald-500" size={20} />, trend: '+2.5%', color: 'emerald' },
    { label: 'Hired Partners', value: '48', icon: <Users className="text-blue-500" size={20} />, trend: '+12%', color: 'blue' },
    { label: 'KYC Status', value: 'Verified', icon: <CheckCircle2 className="text-emerald-500" size={20} />, trend: 'Manual', color: 'emerald' },
    { label: 'Pending Tasks', value: '3', icon: <Clock className="text-amber-500" size={20} />, trend: '-1', color: 'amber' },
  ]

  const activities = [
    { id: 1, title: 'Zomato Connection', status: 'Connected', time: '2 hours ago', icon: <CheckCircle2 size={16} /> },
    { id: 2, title: 'Shadowfax Hiring', status: 'Pending', time: '5 hours ago', icon: <Clock size={16} /> },
    { id: 3, title: 'PAN Verification', status: 'Success', time: 'Yesterday', icon: <CheckCircle2 size={16} /> },
  ]

  return (
    <div className="animate-slide-up">
      <header className="mb-10">
        <h1 className="section-title">Dashboard Overview</h1>
        <p className="section-subtitle">Welcome back, Kushagra. Here&apos;s what&apos;s happening with your vendor profile today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="card group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-2xl bg-secondary group-hover:bg-emerald-500/10 transition-colors">
                {stat.icon}
              </div>
              <span className={`badge ${stat.color === 'emerald' ? 'badge-verified' : 'badge-pending'} flex items-center gap-1`}>
                <TrendingUp size={12} />
                {stat.trend}
              </span>
            </div>
            <p className="text-muted-foreground text-sm font-medium mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold tracking-tight">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Recent Activity</h3>
            <button className="text-emerald-500 text-sm font-semibold hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {activities.map((act) => (
              <div key={act.id} className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-transparent hover:border-border transition-all cursor-default">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${act.status === 'Connected' || act.status === 'Success' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                    {act.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{act.title}</p>
                    <p className="text-xs text-muted-foreground">{act.time}</p>
                  </div>
                </div>
                <span className={`badge ${act.status === 'Connected' || act.status === 'Success' ? 'badge-verified' : 'badge-pending'}`}>
                  {act.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="card bg-emerald-500/5 border-emerald-500/20 relative overflow-hidden h-full">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex-center mb-6 shadow-lg shadow-emerald-500/20">
                <AlertCircle className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Complete Profile</h3>
              <p className="text-sm text-muted-foreground mb-6">Your KYC is almost complete. Finish the remaining steps to unlock all marketplaces.</p>
              <Link href="/kyc" className="btn btn-primary w-full shadow-lg shadow-emerald-500/20">
                Continue Onboarding
                <ArrowUpRight size={18} />
              </Link>
            </div>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="card border-dashed">
            <h4 className="font-bold text-sm mb-4">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/marketplace" className="btn btn-secondary text-xs h-20 flex-col gap-2">
                <ShoppingBag size={16} />
                Browse Apps
              </Link>
              <Link href="/delivery" className="btn btn-secondary text-xs h-20 flex-col gap-2">
                <Users size={16} />
                Hire Rider
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
