import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, ShoppingCart, Users, BarChart3, Settings, LogOut, Bell, Search, Menu, X, Package, Tag } from 'lucide-react';
import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';

interface AdminLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

export default function AdminLayout({ children, onLogout }: AdminLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { notifications, clearNotifications } = useAdmin();
  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'داشبورد' },
    { path: '/admin/books', icon: BookOpen, label: 'مدیریت کتاب‌ها' },
    { path: '/admin/orders', icon: ShoppingCart, label: 'سفارشات' },
    { path: '/admin/users', icon: Users, label: 'کاربران' },
    { path: '/admin/warehouse', icon: Package, label: 'انبار فیزیکی' },
    { path: '/admin/digital', icon: Tag, label: 'انبار دیجیتال' },
    { path: '/admin/suppliers', icon: Users, label: 'تأمین‌کنندگان' },
    { path: '/admin/accounting', icon: BarChart3, label: 'حسابداری' },
    { path: '/admin/coupons', icon: Tag, label: 'کدهای تخفیف' },
    { path: '/admin/reports', icon: BarChart3, label: 'گزارشات' },
    { path: '/admin/settings', icon: Settings, label: 'تنظیمات' },
  ];

  const handleLogout = () => {
    onLogout();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 right-0 z-50 w-64 bg-[#0f0f1a] border-l border-white/5 flex flex-col transition-transform ${sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
        {/* Logo */}
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-brand-950" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">پنل مدیریت</h2>
              <p className="text-[10px] text-white/30">کتاب‌خانه نوین</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`admin-nav-item flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                  isActive ? 'bg-gradient-to-l from-brand-600/20 to-gold-500/10 text-gold-400 border-r-2 border-gold-500' : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>خروج از پنل</span>
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-white/40 hover:text-white">
                <Menu className="w-5 h-5" />
              </button>
              <div className="relative hidden md:block">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input
                  type="text"
                  placeholder="جستجو در پنل..."
                  className="w-64 py-2 pr-10 pl-4 glass rounded-xl text-sm text-white placeholder-white/20 outline-none focus:border-gold-500/30"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={clearNotifications}
                className="relative w-9 h-9 glass rounded-xl flex items-center justify-center text-white/40 hover:text-white transition-colors"
                title="پاک کردن اعلان‌ها"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold">{unreadCount}</span>
                )}
              </button>
              <div className="flex items-center gap-2 px-3 py-1.5 glass rounded-xl">
                <div className="w-7 h-7 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center text-white text-xs font-bold">م</div>
                <div className="hidden sm:block">
                  <p className="text-xs font-medium text-white">مدیر سایت</p>
                  <p className="text-[10px] text-white/30">admin@novin.ir</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
