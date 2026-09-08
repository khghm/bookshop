import { Link } from 'react-router-dom';
import { ArrowLeft, Star, TrendingUp, Zap, BookOpen, Shield, Truck, Headphones } from 'lucide-react';
import { books, categories } from '../data/books';
import BookCard from '../components/BookCard';

export default function HomePage() {
  const bestsellers = books.filter(b => b.bestseller);
  const newArrivals = books.filter(b => b.newArrival);
  const discounted = books.filter(b => b.discount);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-bl from-primary-900 via-primary-800 to-primary-950">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-white space-y-6 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Zap className="w-4 h-4 text-warm-400" />
                <span className="text-sm">جشنواره بزرگ فروش بهاره</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                دنیای کتاب را
                <br />
                <span className="text-warm-400">آنلاین</span> کشف کنید
              </h1>
              <p className="text-lg text-primary-200 leading-8 max-w-lg">
                بیش از ۱۰,۰۰۰ عنوان کتاب کاغذی و دیجیتال با بهترین قیمت و ارسال سریع به سراسر ایران
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/books"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-warm-500 hover:bg-warm-600 text-white rounded-xl font-bold transition-all hover:scale-105 shadow-lg shadow-warm-500/30"
                >
                  مشاهده کتاب‌ها
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <Link
                  to="/books?format=digital"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-xl font-medium transition-all border border-white/20"
                >
                  📱 کتاب‌های دیجیتال
                </Link>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="text-center">
                  <p className="text-2xl font-black text-white">۱۰K+</p>
                  <p className="text-xs text-primary-300">عنوان کتاب</p>
                </div>
                <div className="w-px h-10 bg-primary-600" />
                <div className="text-center">
                  <p className="text-2xl font-black text-white">۵۰K+</p>
                  <p className="text-xs text-primary-300">مشتری راضی</p>
                </div>
                <div className="w-px h-10 bg-primary-600" />
                <div className="text-center">
                  <p className="text-2xl font-black text-white">۴.۹</p>
                  <p className="text-xs text-primary-300">امتیاز کاربران</p>
                </div>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-warm-400/20 rounded-full blur-3xl" />
                <div className="relative grid grid-cols-2 gap-4 transform rotate-3">
                  {bestsellers.slice(0, 4).map((book, i) => (
                    <div
                      key={book.id}
                      className="rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform"
                      style={{ transform: `rotate(${-3 + i * 2}deg) translateY(${i % 2 === 0 ? '0' : '20'}px)` }}
                    >
                      <img src={book.cover} alt={book.title} className="w-36 h-48 object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck, title: 'ارسال سریع', desc: 'به سراسر ایران' },
              { icon: Shield, title: 'ضمانت اصالت', desc: 'تمامی کتاب‌ها اورجینال' },
              { icon: Headphones, title: 'پشتیبانی ۲۴/۷', desc: 'همیشه در کنار شما' },
              { icon: BookOpen, title: 'نسخه دیجیتال', desc: 'دسترسی فوری به کتاب' },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary-50 transition-colors">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                  <feature.icon className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800">{feature.title}</h4>
                  <p className="text-xs text-gray-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-gray-800">دسته‌بندی کتاب‌ها</h2>
              <p className="text-sm text-gray-500 mt-1">کتاب مورد نظر خود را در دسته‌بندی‌های مختلف پیدا کنید</p>
            </div>
            <Link to="/books" className="hidden sm:flex items-center gap-1 text-primary-600 hover:text-primary-700 text-sm font-medium">
              مشاهده همه
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/books?category=${cat.id}`}
                className="group flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all"
              >
                <span className="text-2xl">{cat.icon}</span>
                <div>
                  <h4 className="text-sm font-bold text-gray-800 group-hover:text-primary-600 transition-colors">{cat.name}</h4>
                  <p className="text-xs text-gray-400">{cat.count} عنوان</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-12 bg-gradient-to-b from-white to-primary-50/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-warm-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-warm-600" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-800">پرفروش‌ترین‌ها</h2>
                <p className="text-sm text-gray-500">محبوب‌ترین کتاب‌ها بین خوانندگان</p>
              </div>
            </div>
            <Link to="/books?sort=popular" className="hidden sm:flex items-center gap-1 text-primary-600 hover:text-primary-700 text-sm font-medium">
              مشاهده همه
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {bestsellers.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* Discount Banner */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-l from-accent-600 to-accent-500 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-white rounded-full" />
              <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-white rounded-full" />
            </div>
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-white text-center md:text-right">
                <h3 className="text-2xl md:text-3xl font-black">تخفیف‌های ویژه بهاره 🌸</h3>
                <p className="text-accent-100 mt-2">تا ۵۰٪ تخفیف روی صدها عنوان کتاب</p>
              </div>
              <Link
                to="/books?sale=true"
                className="px-8 py-3.5 bg-white text-accent-600 rounded-xl font-bold hover:bg-accent-50 transition-colors shadow-lg"
              >
                مشاهده تخفیف‌ها
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Star className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-800">تازه‌های کتابخانه</h2>
                <p className="text-sm text-gray-500">آخرین کتاب‌های اضافه شده</p>
              </div>
            </div>
            <Link to="/books?sort=newest" className="hidden sm:flex items-center gap-1 text-primary-600 hover:text-primary-700 text-sm font-medium">
              مشاهده همه
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {newArrivals.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* Discounted Books */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-accent-600" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-800">فرصت‌های استثنایی</h2>
                <p className="text-sm text-gray-500">کتاب‌های با تخفیف ویژه</p>
              </div>
            </div>
            <Link to="/books?sale=true" className="hidden sm:flex items-center gap-1 text-primary-600 hover:text-primary-700 text-sm font-medium">
              مشاهده همه
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {discounted.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-black text-gray-800 text-center mb-8">نظرات مشتریان</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'سارا محمدی', text: 'خرید از کتاب‌خانه نوین همیشه لذت‌بخشه. بسته‌بندی عالی و ارسال سریع.', rating: 5 },
              { name: 'علی رضایی', text: 'تنوع کتاب‌ها فوق‌العاده‌ست. هر کتابی که نیاز داشتم رو اینجا پیدا کردم.', rating: 5 },
              { name: 'مریم کریمی', text: 'کتاب‌های دیجیتالشون خیلی راحته. روی تبلت و گوشی به راحتی می‌تونم بخونم.', rating: 4 },
            ].map((review, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className={`w-4 h-4 ${j < review.rating ? 'fill-warm-400 text-warm-400' : 'text-gray-200'}`} />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-7">{review.text}</p>
                <p className="text-sm font-bold text-gray-800 mt-3">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
