import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, SlidersHorizontal, Grid3X3, List, X, ShoppingCart } from 'lucide-react';
import { books, categories, Book } from '../data/books';
import BookCard from '../components/BookCard';
import { useCart } from '../context/CartContext';

export default function BooksPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const searchQuery = searchParams.get('search') || '';
  const categoryFilter = searchParams.get('category') || '';
  const formatFilter = searchParams.get('format') || '';
  const saleFilter = searchParams.get('sale') || '';
  const sortFilter = searchParams.get('sort') || '';

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const filteredBooks = useMemo(() => {
    let result = [...books];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.publisher.toLowerCase().includes(q)
      );
    }

    if (categoryFilter) {
      result = result.filter(b => b.category === categoryFilter);
    }

    if (formatFilter) {
      result = result.filter(b => b.format === formatFilter || b.format === 'both');
    }

    if (saleFilter === 'true') {
      result = result.filter(b => b.discount);
    }

    if (sortFilter === 'popular') {
      result.sort((a, b) => b.reviewCount - a.reviewCount);
    } else if (sortFilter === 'newest') {
      result.sort((a, b) => b.publishYear - a.publishYear);
    } else if (sortFilter === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortFilter === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortFilter === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    result = result.filter(b => b.price >= priceRange[0] && b.price <= priceRange[1]);

    return result;
  }, [searchQuery, categoryFilter, formatFilter, saleFilter, sortFilter, priceRange]);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchParams({});
    setPriceRange([0, 500000]);
    setLocalSearch('');
  };

  const activeFiltersCount = [categoryFilter, formatFilter, saleFilter, sortFilter].filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-800">
          {categoryFilter
            ? categories.find(c => c.id === categoryFilter)?.name || 'کتاب‌ها'
            : saleFilter === 'true'
            ? 'تخفیف‌های ویژه'
            : searchQuery
            ? `نتایج جستجو: "${searchQuery}"`
            : 'همه کتاب‌ها'
          }
        </h1>
        <p className="text-gray-500 mt-1">{filteredBooks.length} عنوان کتاب یافت شد</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <input
            type="text"
            placeholder="جستجو در نتایج..."
            value={localSearch}
            onChange={(e) => {
              setLocalSearch(e.target.value);
              updateFilter('search', e.target.value);
            }}
            className="w-full py-2.5 px-4 pr-10 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none text-sm"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
            showFilters || activeFiltersCount > 0
              ? 'border-primary-500 bg-primary-50 text-primary-700'
              : 'border-gray-200 text-gray-600 hover:border-primary-300'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          فیلترها
          {activeFiltersCount > 0 && (
            <span className="w-5 h-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>

        <select
          value={sortFilter}
          onChange={(e) => updateFilter('sort', e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 outline-none focus:border-primary-500"
        >
          <option value="">مرتب‌سازی</option>
          <option value="popular">محبوب‌ترین</option>
          <option value="newest">جدیدترین</option>
          <option value="price-low">ارزان‌ترین</option>
          <option value="price-high">گران‌ترین</option>
          <option value="rating">بالاترین امتیاز</option>
        </select>

        <div className="hidden sm:flex items-center border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2.5 ${viewMode === 'grid' ? 'bg-primary-50 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2.5 ${viewMode === 'list' ? 'bg-primary-50 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>

        {activeFiltersCount > 0 && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600"
          >
            <X className="w-4 h-4" />
            حذف فیلترها
          </button>
        )}
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 animate-fade-in-up">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h4 className="font-bold text-sm text-gray-800 mb-3">دسته‌بندی</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="category" checked={!categoryFilter} onChange={() => updateFilter('category', '')} className="accent-primary-600" />
                  <span className="text-sm text-gray-600">همه دسته‌ها</span>
                </label>
                {categories.map(cat => (
                  <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="category" checked={categoryFilter === cat.id} onChange={() => updateFilter('category', cat.id)} className="accent-primary-600" />
                    <span className="text-sm text-gray-600">{cat.icon} {cat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-sm text-gray-800 mb-3">نوع کتاب</h4>
              <div className="space-y-2">
                {[
                  { value: '', label: 'همه' },
                  { value: 'paper', label: '📖 کاغذی' },
                  { value: 'digital', label: '📱 دیجیتال' },
                  { value: 'both', label: '📖📱 هر دو' },
                ].map(opt => (
                  <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="format" checked={formatFilter === opt.value} onChange={() => updateFilter('format', opt.value)} className="accent-primary-600" />
                    <span className="text-sm text-gray-600">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-sm text-gray-800 mb-3">محدوده قیمت</h4>
              <div className="space-y-3">
                <input
                  type="range"
                  min="0"
                  max="500000"
                  step="10000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-primary-600"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{priceRange[0].toLocaleString('fa-IR')} تومان</span>
                  <span>{priceRange[1].toLocaleString('fa-IR')} تومان</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-sm text-gray-800 mb-3">تخفیف</h4>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={saleFilter === 'true'}
                  onChange={(e) => updateFilter('sale', e.target.checked ? 'true' : '')}
                  className="accent-primary-600 w-4 h-4"
                />
                <span className="text-sm text-gray-600">فقط کتاب‌های تخفیف‌دار</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Books grid */}
      {filteredBooks.length > 0 ? (
        <div className={viewMode === 'grid'
          ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'
          : 'space-y-4'
        }>
          {filteredBooks.map(book => (
            viewMode === 'grid' ? (
              <BookCard key={book.id} book={book} />
            ) : (
              <BookListItem key={book.id} book={book} />
            )
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-600">کتابی یافت نشد</h3>
          <p className="text-sm text-gray-400 mt-1">لطفاً فیلترهای خود را تغییر دهید</p>
          <button
            onClick={clearFilters}
            className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700 transition-colors"
          >
            حذف فیلترها
          </button>
        </div>
      )}
    </div>
  );
}

function BookListItem({ book }: { book: Book }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(book, book.format === 'digital' ? 'digital' : 'paper');
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const formatPrice = (price: number) => price.toLocaleString('fa-IR');

  return (
    <div className="flex gap-4 bg-white rounded-xl border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all p-4">
      <Link to={`/book/${book.id}`} className="shrink-0">
        <img src={book.cover} alt={book.title} className="w-20 h-28 object-cover rounded-lg" />
      </Link>
      <div className="flex-1">
        <Link to={`/book/${book.id}`}>
          <h3 className="font-bold text-gray-800 hover:text-primary-600 transition-colors">{book.title}</h3>
        </Link>
        <p className="text-sm text-gray-500">{book.author}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded">
            {categories.find(c => c.id === book.category)?.name}
          </span>
          <span className="text-xs text-gray-400">⭐ {book.rating}</span>
          <span className={`text-xs px-1.5 py-0.5 rounded ${
            book.format === 'digital' ? 'bg-purple-100 text-purple-700' :
            book.format === 'both' ? 'bg-blue-100 text-blue-700' :
            'bg-gray-100 text-gray-600'
          }`}>
            {book.format === 'digital' ? 'دیجیتال' : book.format === 'both' ? 'کاغذی + دیجیتال' : 'کاغذی'}
          </span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div>
            {book.originalPrice && (
              <span className="text-xs text-gray-400 line-through ml-2">
                {formatPrice(book.originalPrice)}
              </span>
            )}
            <span className="font-bold text-primary-700">{formatPrice(book.price)} تومان</span>
          </div>
          <button
            onClick={handleAddToCart}
            className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              added ? 'bg-green-500 text-white' : 'bg-primary-600 hover:bg-primary-700 text-white'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {added ? 'اضافه شد' : 'افزودن به سبد'}
          </button>
        </div>
      </div>
    </div>
  );
}
