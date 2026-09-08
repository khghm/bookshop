import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, BookOpen, User, Heart, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Top announcement bar */}
      <div className="bg-gradient-to-l from-brand-900 via-brand-800 to-brand-900 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-2 text-xs text-gold-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>جشنواره فروش بهاره — تا ۵۰٪ تخفیف روی صدها عنوان کتاب</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xs text-white/50">
            <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
            <span className="w-px h-3 bg-white/20" />
            <span>ارسال رایگان بالای ۵۰۰ هزار تومان</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0 group">
              <div className="relative">
                <div className="w-11 h-11 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center shadow-lg shadow-gold-500/20 group-hover:shadow-gold-500/40 transition-shadow">
                  <BookOpen className="w-6 h-6 text-brand-950" />
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-brand-950 animate-pulse" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-black gradient-text-gold">کتاب‌خانه نوین</h1>
                <p className="text-[10px] text-white/40 -mt-0.5">NOVIN BOOKSTORE</p>
              </div>
            </Link>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 max-w-lg hidden md:block">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="جستجوی کتاب، نویسنده یا ناشر..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2.5 px-4 pr-12 rounded-2xl bg-white/5 border border-white/10 focus:border-gold-500/50 focus:bg-white/8 focus:ring-2 focus:ring-gold-500/10 outline-none transition-all text-sm text-white placeholder-white/30"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gold-400 group-hover:text-gold-300 transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Link to="/books" className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl text-white/50 hover:text-gold-400 hover:bg-white/5 transition-all text-sm">
                <Heart className="w-4 h-4" />
                <span>علاقه‌مندی</span>
              </Link>
              <Link to="/admin" className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl text-white/50 hover:text-brand-400 hover:bg-white/5 transition-all text-sm">
                <User className="w-4 h-4" />
                <span>پنل مدیریت</span>
              </Link>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 px-4 py-2.5 bg-gradient-to-l from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-brand-950 rounded-xl font-bold text-sm transition-all shadow-lg shadow-gold-500/20 hover:shadow-gold-500/30 btn-premium"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">سبد خرید</span>
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -left-1.5 w-5 h-5 bg-brand-600 text-white text-[10px] rounded-full flex items-center justify-center font-bold border-2 border-brand-950">
                    {totalItems}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-white/60 hover:text-white p-2"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile search */}
          <form onSubmit={handleSearch} className="mt-3 md:hidden">
            <div className="relative">
              <input
                type="text"
                placeholder="جستجوی کتاب..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2.5 px-4 pr-12 rounded-xl bg-white/5 border border-white/10 focus:border-gold-500/50 outline-none text-sm text-white placeholder-white/30"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            </div>
          </form>
        </div>

        {/* Navigation */}
        <div className="border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4">
            <nav className={`${mobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row md:items-center gap-0.5 md:gap-1 py-2 md:py-0`}>
              {[
                { to: '/', label: 'صفحه اصلی' },
                { to: '/books', label: 'همه کتاب‌ها' },
                { to: '/books?category=fiction', label: 'رمان و داستان' },
                { to: '/books?category=self-help', label: 'توسعه فردی' },
                { to: '/books?category=tech', label: 'فناوری' },
                { to: '/books?format=digital', label: 'کتاب دیجیتال', special: true },
                { to: '/books?sale=true', label: 'تخفیف‌ها', special: true },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-3 py-2 rounded-lg text-sm transition-all ${
                    item.special
                      ? 'text-gold-400 hover:bg-gold-500/10'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
