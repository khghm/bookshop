import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Star, ShoppingCart, Heart, Share2, BookOpen, FileText, Calendar, Globe, Check, Shield, Truck, ChevronLeft } from 'lucide-react';
import { books, categories } from '../data/books';
import { useCart } from '../context/CartContext';
import BookCard from '../components/BookCard';

export default function BookDetailPage() {
  const { id } = useParams();
  const book = books.find(b => b.id === Number(id));
  const { addToCart } = useCart();
  const [selectedFormat, setSelectedFormat] = useState<'paper' | 'digital'>(book?.format === 'digital' ? 'digital' : 'paper');
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  if (!book) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-white">کتاب یافت نشد</h2>
        <Link to="/books" className="mt-4 inline-flex items-center gap-2 text-gold-400">
          <ChevronLeft className="w-4 h-4" /> بازگشت
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
      <nav className="flex items-center gap-2 text-sm text-white/30 mb-8">
        <Link to="/" className="hover:text-gold-400">خانه</Link>
        <span>/</span>
        <Link to="/books" className="hover:text-gold-400">کتاب‌ها</Link>
        <span>/</span>
        <span className="text-white/60">{book.title}</span>
      </nav>

      {/* Main */}
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Cover */}
        <div className="flex justify-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-600/20 to-gold-500/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all" />
            <img
              src={book.cover}
              alt={book.title}
              className="relative w-72 md:w-80 aspect-[3/4] object-cover rounded-2xl shadow-2xl glow-card group-hover:scale-[1.02] transition-transform duration-500"
            />
            {book.discount && (
              <div className="absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30">
                <span className="text-white font-black text-sm">{book.discount}%</span>
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {book.bestseller && <span className="px-2.5 py-1 bg-gold-500/20 text-gold-400 text-xs font-bold rounded-lg">پرفروش</span>}
              {book.newArrival && <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-lg">جدید</span>}
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white">{book.title}</h1>
            <p className="text-lg text-white/50">نویسنده: <span className="text-gold-400 font-medium">{book.author}</span></p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.floor(book.rating) ? 'fill-gold-400 text-gold-400' : 'text-white/10'}`} />
              ))}
            </div>
            <span className="text-sm font-bold text-white">{book.rating}</span>
            <span className="text-sm text-white/30">({book.reviewCount} نظر)</span>
          </div>

          {/* Format */}
          <div>
            <h4 className="text-sm font-bold text-white/60 mb-2">نوع کتاب:</h4>
            <div className="flex gap-2">
              {(book.format === 'paper' || book.format === 'both') && (
                <button onClick={() => setSelectedFormat('paper')} className={`flex items-center gap-2 px-5 py-3 rounded-xl border-2 transition-all ${selectedFormat === 'paper' ? 'border-gold-500 bg-gold-500/10 text-gold-400' : 'border-white/10 text-white/40 hover:border-white/20'}`}>
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm font-medium">کاغذی</span>
                </button>
              )}
              {(book.format === 'digital' || book.format === 'both') && (
                <button onClick={() => setSelectedFormat('digital')} className={`flex items-center gap-2 px-5 py-3 rounded-xl border-2 transition-all ${selectedFormat === 'digital' ? 'border-purple-500 bg-purple-500/10 text-purple-400' : 'border-white/10 text-white/40 hover:border-white/20'}`}>
                  <FileText className="w-4 h-4" />
                  <span className="text-sm font-medium">دیجیتال</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded">۳۰٪ تخفیف</span>
                </button>
              )}
            </div>
          </div>

          {/* Price */}
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center gap-3">
              {book.originalPrice && (
                <span className="text-lg text-white/30 line-through">
                  {formatPrice(selectedFormat === 'digital' ? book.originalPrice * 0.7 : book.originalPrice)}
                </span>
              )}
              <span className="text-3xl font-black gradient-text-gold">
                {formatPrice(displayPrice)} <span className="text-sm text-white/30 font-normal">تومان</span>
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base transition-all ${
                added ? 'bg-emerald-500 text-white' : 'bg-gradient-to-l from-gold-500 to-gold-600 text-brand-950 shadow-2xl shadow-gold-500/20 hover:shadow-gold-500/40 hover:scale-[1.02]'
              } btn-premium`}
            >
              {added ? <><Check className="w-5 h-5" /> اضافه شد</> : <><ShoppingCart className="w-5 h-5" /> افزودن به سبد خرید</>}
            </button>
            <button className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-white/40 hover:text-red-400 hover:border-red-500/30 transition-all">
              <Heart className="w-5 h-5" />
            </button>
            <button className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-white/40 hover:text-gold-400 hover:border-gold-500/30 transition-all">
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-3">
            <div className="glass rounded-xl p-3 flex items-center gap-2">
              <Truck className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="text-xs font-bold text-white">ارسال رایگان</p>
                <p className="text-[10px] text-white/30">بالای ۵۰۰ هزار تومان</p>
              </div>
            </div>
            <div className="glass rounded-xl p-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-xs font-bold text-white">ضمانت اصالت</p>
                <p className="text-[10px] text-white/30">۱۰۰٪ اورجینال</p>
              </div>
            </div>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
            {[
              { icon: Calendar, label: 'سال انتشار', value: book.publishYear.toString() },
              { icon: BookOpen, label: 'تعداد صفحات', value: `${book.pages} صفحه` },
              { icon: Globe, label: 'زبان', value: book.language },
              { icon: FileText, label: 'ناشر', value: book.publisher },
            ].map((spec, i) => (
              <div key={i} className="flex items-center gap-2">
                <spec.icon className="w-4 h-4 text-white/20" />
                <span className="text-xs text-white/30">{spec.label}:</span>
                <span className="text-xs font-medium text-white/70">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="flex gap-1 border-b border-white/5">
          {[
            { id: 'description', label: 'توضیحات' },
            { id: 'specs', label: 'مشخصات فنی' },
            { id: 'reviews', label: `نظرات (${book.reviewCount})` },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-all ${activeTab === tab.id ? 'border-gold-500 text-gold-400' : 'border-transparent text-white/30 hover:text-white/60'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="py-8">
          {activeTab === 'description' && (
            <p className="text-white/60 leading-8 text-base max-w-3xl">{book.description}</p>
          )}
          {activeTab === 'specs' && (
            <div className="grid md:grid-cols-2 gap-3 max-w-3xl">
              {[
                { label: 'عنوان', value: book.title },
                { label: 'نویسنده', value: book.author },
                { label: 'ناشر', value: book.publisher },
                { label: 'سال انتشار', value: book.publishYear.toString() },
                { label: 'صفحات', value: `${book.pages}` },
                { label: 'زبان', value: book.language },
                { label: 'شابک', value: book.isbn },
                { label: 'نوع', value: book.format === 'digital' ? 'دیجیتال' : book.format === 'both' ? 'کاغذی و دیجیتال' : 'کاغذی' },
              ].map((spec, i) => (
                <div key={i} className="flex justify-between p-3 glass rounded-xl">
                  <span className="text-sm text-white/40">{spec.label}</span>
                  <span className="text-sm font-medium text-white/70">{spec.value}</span>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="space-y-4 max-w-3xl">
              {[
                { name: 'محمد رضایی', rating: 5, date: '۱۴۰۳/۰۲/۱۵', text: 'کتاب فوق‌العاده‌ای بود. ترجمه بسیار روان و عالی.' },
                { name: 'فاطمه احمدی', rating: 4, date: '۱۴۰۳/۰۱/۲۸', text: 'محتوای کتاب خیلی خوب بود. بسته‌بندی عالی.' },
              ].map((review, i) => (
                <div key={i} className="glass rounded-xl p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-700 rounded-full flex items-center justify-center text-white text-xs font-bold">{review.name[0]}</div>
                      <span className="text-sm font-medium text-white">{review.name}</span>
                    </div>
                    <span className="text-xs text-white/30">{review.date}</span>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className={`w-3.5 h-3.5 ${j < review.rating ? 'fill-gold-400 text-gold-400' : 'text-white/10'}`} />
                    ))}
                  </div>
                  <p className="text-sm text-white/50 leading-7">{review.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      {relatedBooks.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-black text-white mb-6">کتاب‌های مرتبط</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {relatedBooks.map((book, i) => (
              <BookCard key={book.id} book={book} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
