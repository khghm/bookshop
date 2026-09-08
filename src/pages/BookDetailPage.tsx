import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Star, ShoppingCart, Heart, Share2, BookOpen, FileText, Calendar, Globe, ArrowRight, Check, Shield, Truck } from 'lucide-react';
import { books, categories } from '../data/books';
import { useCart } from '../context/CartContext';
import BookCard from '../components/BookCard';

export default function BookDetailPage() {
  const { id } = useParams();
  const book = books.find(b => b.id === Number(id));
  const { addToCart } = useCart();
  const [selectedFormat, setSelectedFormat] = useState<'paper' | 'digital'>(
    book?.format === 'digital' ? 'digital' : 'paper'
  );
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  if (!book) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800">کتاب یافت نشد</h2>
        <Link to="/books" className="mt-4 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700">
          <ArrowRight className="w-4 h-4" />
          بازگشت به لیست کتاب‌ها
        </Link>
      </div>
    );
  }

  const formatPrice = (price: number) => price.toLocaleString('fa-IR');
  const displayPrice = selectedFormat === 'digital' ? book.price * 0.7 : book.price;
  const relatedBooks = books.filter(b => b.category === book.category && b.id !== book.id).slice(0, 5);

  const handleAddToCart = () => {
    addToCart(book, selectedFormat);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-primary-600">خانه</Link>
        <span>/</span>
        <Link to="/books" className="hover:text-primary-600">کتاب‌ها</Link>
        <span>/</span>
        <Link to={`/books?category=${book.category}`} className="hover:text-primary-600">
          {categories.find(c => c.id === book.category)?.name}
        </Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">{book.title}</span>
      </nav>

      {/* Main content */}
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-50 rounded-3xl transform rotate-3" />
            <img
              src={book.cover}
              alt={book.title}
              className="relative w-64 md:w-80 aspect-[3/4] object-cover rounded-2xl shadow-xl"
            />
            {book.discount && (
              <div className="absolute -top-3 -right-3 bg-accent-500 text-white text-sm font-bold w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
                {book.discount}%
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {book.bestseller && (
                <span className="bg-warm-100 text-warm-700 text-xs font-bold px-2 py-1 rounded-lg">🏆 پرفروش</span>
              )}
              {book.newArrival && (
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-lg">✨ جدید</span>
              )}
            </div>
            <h1 className="text-3xl font-black text-gray-800">{book.title}</h1>
            <p className="text-lg text-gray-500 mt-1">نویسنده: <span className="text-primary-600 font-medium">{book.author}</span></p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.floor(book.rating) ? 'fill-warm-400 text-warm-400' : 'text-gray-200'}`} />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-700">{book.rating}</span>
            <span className="text-sm text-gray-400">({book.reviewCount} نظر)</span>
          </div>

          {/* Format selection */}
          <div>
            <h4 className="text-sm font-bold text-gray-700 mb-2">نوع کتاب:</h4>
            <div className="flex gap-2">
              {(book.format === 'paper' || book.format === 'both') && (
                <button
                  onClick={() => setSelectedFormat('paper')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all ${
                    selectedFormat === 'paper'
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm font-medium">کاغذی</span>
                </button>
              )}
              {(book.format === 'digital' || book.format === 'both') && (
                <button
                  onClick={() => setSelectedFormat('digital')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all ${
                    selectedFormat === 'digital'
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span className="text-sm font-medium">دیجیتال</span>
                  <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">۳۰٪ تخفیف</span>
                </button>
              )}
            </div>
          </div>

          {/* Price */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              {book.originalPrice && (
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(selectedFormat === 'digital' ? book.originalPrice * 0.7 : book.originalPrice)} تومان
                </span>
              )}
              <span className="text-3xl font-black text-primary-700">
                {formatPrice(displayPrice)} تومان
              </span>
            </div>
            {selectedFormat === 'digital' && (
              <p className="text-xs text-green-600 mt-1">💡 نسخه دیجیتال ۳۰٪ ارزان‌تر + دسترسی فوری</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-lg transition-all ${
                added
                  ? 'bg-green-500 text-white'
                  : 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-600/30 hover:scale-[1.02]'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5" />
                  به سبد خرید اضافه شد
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  افزودن به سبد خرید
                </>
              )}
            </button>
            <button className="w-12 h-12 border-2 border-gray-200 rounded-xl flex items-center justify-center hover:border-red-300 hover:text-red-500 transition-colors text-gray-400">
              <Heart className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 border-2 border-gray-200 rounded-xl flex items-center justify-center hover:border-primary-300 hover:text-primary-500 transition-colors text-gray-400">
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl">
              <Truck className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-xs font-bold text-green-800">ارسال رایگان</p>
                <p className="text-xs text-green-600">سفارش بالای ۵۰۰ هزار</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl">
              <Shield className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-xs font-bold text-blue-800">ضمانت اصالت</p>
                <p className="text-xs text-blue-600">۱۰۰٪ اورجینال</p>
              </div>
            </div>
          </div>

          {/* Book details */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-500">سال انتشار:</span>
              <span className="font-medium text-gray-700">{book.publishYear}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <BookOpen className="w-4 h-4 text-gray-400" />
              <span className="text-gray-500">تعداد صفحات:</span>
              <span className="font-medium text-gray-700">{book.pages}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Globe className="w-4 h-4 text-gray-400" />
              <span className="text-gray-500">زبان:</span>
              <span className="font-medium text-gray-700">{book.language}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <FileText className="w-4 h-4 text-gray-400" />
              <span className="text-gray-500">ناشر:</span>
              <span className="font-medium text-gray-700">{book.publisher}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <div className="flex gap-1 border-b">
          {[
            { id: 'description', label: 'توضیحات' },
            { id: 'specs', label: 'مشخصات' },
            { id: 'reviews', label: `نظرات (${book.reviewCount})` },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="py-6">
          {activeTab === 'description' && (
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-600 leading-8 text-base">{book.description}</p>
              <p className="text-gray-600 leading-8 text-base mt-4">
                این کتاب در قطع رقعی چاپ شده و دارای جلد شومیز می‌باشد. کاغذ استفاده شده در این کتاب از نوع تحریر مرغوب است 
                که خواندن آن را لذت‌بخش می‌کند. ترجمه فارسی این اثر با دقت و وسواس فراوان انجام شده و تمام تلاش مترجم 
                بر این بوده که لحن و سبک نویسنده حفظ شود.
              </p>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: 'عنوان', value: book.title },
                { label: 'نویسنده', value: book.author },
                { label: 'ناشر', value: book.publisher },
                { label: 'سال انتشار', value: book.publishYear.toString() },
                { label: 'تعداد صفحات', value: `${book.pages} صفحه` },
                { label: 'زبان', value: book.language },
                { label: 'شابک', value: book.isbn },
                { label: 'نوع جلد', value: 'شومیز' },
                { label: 'قطع', value: 'رقعی' },
                { label: 'نوع کاغذ', value: 'تحریر' },
                { label: 'وزن', value: '۳۵۰ گرم' },
                { label: 'نوع', value: book.format === 'digital' ? 'دیجیتال' : book.format === 'both' ? 'کاغذی و دیجیتال' : 'کاغذی' },
              ].map((spec, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-500">{spec.label}</span>
                  <span className="text-sm font-medium text-gray-800">{spec.value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {[
                { name: 'محمد رضایی', rating: 5, date: '۱۴۰۳/۰۲/۱۵', text: 'کتاب فوق‌العاده‌ای بود. ترجمه بسیار روان و عالی. حتماً پیشنهاد می‌کنم.' },
                { name: 'فاطمه احمدی', rating: 4, date: '۱۴۰۳/۰۱/۲۸', text: 'محتوای کتاب خیلی خوب بود. بسته‌بندی و ارسال هم عالی.' },
                { name: 'امیر حسینی', rating: 5, date: '۱۴۰۲/۱۲/۱۰', text: 'یکی از بهترین کتاب‌هایی که اخیراً خوندم. نویسنده خیلی خوب مفاهیم رو بیان کرده.' },
              ].map((review, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-primary-700">{review.name[0]}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-800">{review.name}</span>
                    </div>
                    <span className="text-xs text-gray-400">{review.date}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className={`w-3.5 h-3.5 ${j < review.rating ? 'fill-warm-400 text-warm-400' : 'text-gray-200'}`} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-7">{review.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related books */}
      {relatedBooks.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-black text-gray-800 mb-6">کتاب‌های مرتبط</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {relatedBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
