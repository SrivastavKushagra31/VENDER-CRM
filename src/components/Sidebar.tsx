import Link from 'next/link'
import { LayoutDashboard, FileCheck, ShoppingBag, Truck, Settings, LogOut } from 'lucide-react'

const Sidebar = () => {
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', href: '/' },
    { icon: <FileCheck size={20} />, label: 'KYC Onboarding', href: '/kyc' },
    { icon: <ShoppingBag size={20} />, label: 'Marketplace', href: '/marketplace' },
    { icon: <Truck size={20} />, label: 'Delivery Hiring', href: '/delivery' },
  ]

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 glass border-r z-50 flex flex-col p-6">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex-center">
          <Truck className="text-white" size={18} />
        </div>
        <span className="font-bold text-xl tracking-tight">VendorBridge</span>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-emerald-500/10 hover:text-emerald-500 text-muted-foreground font-medium"
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-2">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary transition-all"
        >
          <Settings size={20} />
          Settings
        </Link>
        <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-all text-left">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
