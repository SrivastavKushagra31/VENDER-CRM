import { Bell, Search } from 'lucide-react'

const Navbar = () => {
  return (
    <header className="fixed top-0 right-0 left-64 h-20 glass border-b z-40 px-8 flex items-center justify-between">
      <div className="relative group w-96">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-emerald-500 transition-colors" size={18} />
        <input 
          type="text" 
          placeholder="Search for marketplaces, partners..." 
          className="w-full bg-secondary/50 border-transparent focus:bg-secondary focus:border-emerald-500/50 py-2.5 pl-12 pr-4 rounded-xl text-sm transition-all outline-none"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2.5 rounded-xl hover:bg-secondary transition-all text-muted-foreground relative">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-[#020617]"></span>
        </button>
        
        <div className="h-8 w-px bg-border mx-2"></div>
        
        <div className="flex items-center gap-3 pl-2 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold group-hover:text-emerald-500 transition-colors tracking-tight">Kushagra Singh</p>
            <p className="text-xs text-muted-foreground">Premium Vendor</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex-center text-white font-bold text-lg shadow-lg shadow-emerald-500/20">
            K
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
