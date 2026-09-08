import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, Grid3X3, List, X, ChevronDown } from 'lucide-react';
import { books, categories } from '../data/books';
import BookCard from '../components/BookCard';

export default function BooksPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState(500000);

  const searchQuery = searchParams.get('search') || '';
  const selectedCategory = searchParams.get('category') || '';
  const selectedFormat = searchParams.get('format') || '';
  const isSale = searchParams.get('sale') === 'true';

  const filteredBooks = useMemo(() => {
    let result = [...books];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q));
    }
    if (selectedCategory) result = result.filter(b => b.category === selectedCategory);
    if (selectedFormat) result = result.filter(b => b.format === selectedFormat || b.format === 'both');
    if (isSale) result = result.filter(b => b.discount);
    result = result.filter(b => b.price <= priceRange);

    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result.sort((a, b) => b.publishYear - a.publishYear); break;
      default: result.sort((a, b) => b.salesCount - a.salesCount);
    }
    return result;
  }, [searchQuery, selectedCategory, selectedFormat, isSale, sortBy, priceRange]);

  const toggleCategory = (cat: string) => {
    const params = new URLSearchParams(searchParams);
    if (selectedCategory === cat) params.delete('category');
    else params.set('category', cat);
    setSearchParams(params);
  };

  const toggleFormat = (fmt: string) => {
    const params = new URLSearchParams(searchParams);
    if (selectedFormat === fmt) params.delete('format');
    else params.set('format', fmt);
    setSearchParams(params);
  };

  const clearFilters = () => setSearchParams({});

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-white">
            {selectedCategory ? categories.find(c => c.id === selectedCategory)?.name : 'همه کتاب‌ها'}
          </h1>
          <p className="text-sm text-white/40 mt-1">{filteredBooks.length} عنوان کتاب</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all ${showFilters ? 'bg-gold-500/20 text-gold-400 border border-gold-500/30' : 'glass text-white/60 hover:text-white'}`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            فیلترها
          </button>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none px-4 py-2.5 pr-10 glass rounded-xl text-sm text-white/60 outline-none cursor-pointer"
            >
              <option value="popular">محبوب‌ترین</option>
              <option value="newest">جدیدترین</option>
              <option value="price-asc">ارزان‌ترین</option>
              <option value="price-desc">گران‌ترین</option>
              <option value="rating">بالاترین امتیاز</option>
            </select>
            <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
          </div>
          <div className="hidden md:flex gap-1 glass rounded-xl p-1">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-white/30'}`}>
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-white/30'}`}>
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="glass rounded-2xl p-6 mb-8 animate-fade-in-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Filter className="w-4 h-4 text-gold-400" />
              فیلترها
            </h3>
            <button onClick={clearFilters} className="text-xs text-white/40 hover:text-red-400 flex items-center gap-1">
              <X className="w-3 h-3" /> حذف فیلترها
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-xs text-white/40 mb-2">دسته‌بندی</h4>
              <div className="flex flex-wrap gap-1.5">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => toggleCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs transition-all ${selectedCategory === cat.id ? 'bg-gold-500/20 text-gold-400 border border-gold-500/30' : 'bg-white/5 text-white/40 hover:text-white'}`}
                  >
                    {cat.icon} {cat.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs text-white/40 mb-2">فرمت</h4>
              <div className="flex flex-wrap gap-1.5">
                {[{ id: 'paper', label: '📖 کاغذی' }, { id: 'digital', label: '📱 دیجیتال' }].map(fmt => (
                  <button
                    key={fmt.id}
                    onClick={() => toggleFormat(fmt.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs transition-all ${selectedFormat === fmt.id ? 'bg-gold-500/20 text-gold-400 border border-gold-500/30' : 'bg-white/5 text-white/40 hover:text-white'}`}
                  >
                    {fmt.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs text-white/40 mb-2">محدوده قیمت</h4>
              <input
                type="range"
                min={0}
                max={500000}
                step={10000}
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full mt-2"
              />
              <p className="text-xs text-white/40 mt-1">تا {priceRange.toLocaleString('fa-IR')} تومان</p>
            </div>
          </div>
        </div>
      )}

      {/* Active filters */}
      {(selectedCategory || selectedFormat || isSale || searchQuery) && (
        <div className="flex flex-wrap gap-2 mb-6">
          {searchQuery && (
            <span className="px-3 py-1 glass rounded-lg text-xs text-white/60">
              جستجو: "{searchQuery}"
              <button onClick={() => { const p = new URLSearchParams(searchParams); p.delete('search'); setSearchParams(p); }} className="mr-1 text-white/30 hover:text-red-400">×</button>
            </span>
          )}
          {selectedCategory && (
            <span className="px-3 py-1 bg-gold-500/10 border border-gold-500/20 rounded-lg text-xs text-gold-400">
              {categories.find(c => c.id === selectedCategory)?.name}
              <button onClick={() => toggleCategory(selectedCategory)} className="mr-1 text-gold-400/50 hover:text-red-400">×</button>
            </span>
          )}
          {selectedFormat && (
            <span className="px-3 py-1 bg-brand-500/10 border border-brand-500/20 rounded-lg text-xs text-brand-400">
              {selectedFormat === 'digital' ? 'دیجیتال' : 'کاغذی'}
              <button onClick={() => toggleFormat(selectedFormat)} className="mr-1 text-brand-400/50 hover:text-red-400">×</button>
            </span>
          )}
          {isSale && (
            <span className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-400">
              تخفیف‌دار
              <button onClick={() => { const p = new URLSearchParams(searchParams); p.delete('sale'); setSearchParams(p); }} className="mr-1 text-red-400/50 hover:text-red-400">×</button>
            </span>
          )}
        </div>
      )}

      {/* Books grid */}
      {filteredBooks.length > 0 ? (
        <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' : 'grid-cols-1 md:grid-cols-2'}`}>
          {filteredBooks.map((book, i) => (
            <BookCard key={book.id} book={book} index={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📚</div>
          <h3 className="text-lg font-bold text-white/60">کتابی یافت نشد</h3>
          <p className="text-sm text-white/30 mt-1">فیلترهای خود را تغییر دهید</p>
          <button onClick={clearFilters} className="mt-4 px-6 py-2 bg-gold-500/20 text-gold-400 rounded-xl text-sm">
            حذف فیلترها
          </button>
        </div>
      )}
    </div>
  );
}
