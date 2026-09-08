import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, BookOpen, User, Heart } from 'lucide-react';
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
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      {/* Top bar */}
      <div className="bg-primary-800 text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span>ارسال رایگان برای سفارش‌های بالای ۵۰۰ هزار تومان 🚚</span>
          <div className="hidden md:flex gap-4">
            <span>📞 ۰۲۱-۱۲۳۴۵۶۷۸</span>
            <span>|</span>
            <span>پشتیبانی ۲۴ ساعته</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-primary-800">کتاب‌خانه نوین</h1>
              <p className="text-xs text-gray-500">فروشگاه آنلاین کتاب</p>
            </div>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="جستجوی کتاب، نویسنده یا ناشر..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2.5 px-4 pr-12 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-600 hover:text-primary-700">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link to="/books" className="hidden sm:flex items-center gap-1 text-gray-600 hover:text-primary-600 transition-colors">
              <Heart className="w-5 h-5" />
              <span className="text-sm">علاقه‌مندی</span>
            </Link>
            <button className="hidden sm:flex items-center gap-1 text-gray-600 hover:text-primary-600 transition-colors">
              <User className="w-5 h-5" />
              <span className="text-sm">حساب من</span>
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-xl transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline text-sm">سبد خرید</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -left-2 bg-accent-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-600"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
              className="w-full py-2.5 px-4 pr-12 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-600">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>

      {/* Navigation */}
      <nav className="border-t border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className={`${mobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row md:items-center gap-1 md:gap-6 py-2 md:py-0`}>
            <Link to="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
              صفحه اصلی
            </Link>
            <Link to="/books" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
              همه کتاب‌ها
            </Link>
            <Link to="/books?category=fiction" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
              رمان و داستان
            </Link>
            <Link to="/books?category=self-help" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
              توسعه فردی
            </Link>
            <Link to="/books?category=tech" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
              فناوری
            </Link>
            <Link to="/books?format=digital" className="px-3 py-2 text-sm font-medium text-accent-600 hover:text-accent-700 hover:bg-accent-50 rounded-lg transition-all">
              📱 کتاب‌های دیجیتال
            </Link>
            <Link to="/books?sale=true" className="px-3 py-2 text-sm font-medium text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-all">
              🏷️ تخفیف‌ها
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
