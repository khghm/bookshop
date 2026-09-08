import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Star, BookOpen, Users, Award, Sparkles, ChevronLeft } from 'lucide-react';
import { books, categories } from '../data/books';
import BookCard from '../components/BookCard';

export default function HomePage() {
  const bestsellers = books.filter(b => b.bestseller);
  const newArrivals = books.filter(b => b.newArrival);
  const discounted = books.filter(b => b.discount);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://image.qwenlm.ai/generated-images/2839473f-e873-4edc-ab6f-f7309fe3ede6/_result.png"
            alt="hero"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#0a0a0f] via-[#0a0a0f]/80 to-[#0a0a0f]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-brand-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span className="text-xs text-gold-300">جشنواره فروش بهاره ۱۴۰۳</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight">
              <span className="gradient-text-white">دنیای بی‌پایان</span>
              <br />
              <span className="gradient-text-gold">کتاب و دانش</span>
            </h1>
            <p className="text-lg text-white/50 max-w-lg leading-8">
              بیش از ۱۰,۰۰۰ عنوان کتاب کاغذی و دیجیتال با بهترین قیمت و ارسال سریع به سراسر ایران
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/books" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-l from-gold-500 to-gold-600 text-brand-950 rounded-2xl font-bold text-sm shadow-2xl shadow-gold-500/20 hover:shadow-gold-500/40 transition-all hover:scale-105 btn-premium">
                مشاهده کتاب‌ها
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <Link to="/books?format=digital" className="inline-flex items-center gap-2 px-8 py-4 glass rounded-2xl text-white font-medium text-sm hover:bg-white/10 transition-all">
                <BookOpen className="w-4 h-4 text-brand-400" />
                کتاب‌های دیجیتال
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              {[
                { value: '۱۰K+', label: 'عنوان کتاب' },
                { value: '۵۰K+', label: 'مشتری راضی' },
                { value: '۴.۹', label: 'امتیاز کاربران' },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl font-black gradient-text-gold">{stat.value}</div>
                  <div className="text-xs text-white/30">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured books */}
          <div className="hidden lg:flex justify-center items-center relative">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-600/20 to-gold-500/10 rounded-3xl blur-2xl" />
              <img
                src="https://image.qwenlm.ai/generated-images/77ab7beb-8a92-444c-bf38-59a481adfa9a/_result.png"
                alt="featured books"
                className="relative w-full max-w-lg rounded-3xl shadow-2xl glow-card"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-white">دسته‌بندی کتاب‌ها</h2>
            <p className="text-sm text-white/40 mt-1">مجموعه‌ای از بهترین کتاب‌ها در دسته‌بندی‌های مختلف</p>
          </div>
          <Link to="/books" className="flex items-center gap-1 text-sm text-gold-400 hover:text-gold-300 transition-colors">
            مشاهده همه
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              to={`/books?category=${cat.id}`}
              className={`group glass rounded-2xl p-5 hover:border-gold-500/30 transition-all hover:scale-[1.02] opacity-0 animate-fade-in-up`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="text-3xl mb-3">{cat.icon}</div>
              <h3 className="text-sm font-bold text-white group-hover:text-gold-400 transition-colors">{cat.name}</h3>
              <p className="text-xs text-white/30 mt-1">{cat.count} عنوان</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-brand-950" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">پرفروش‌ترین‌ها</h2>
              <p className="text-sm text-white/40">محبوب‌ترین کتاب‌ها بین خوانندگان</p>
            </div>
          </div>
          <Link to="/books?sort=bestseller" className="flex items-center gap-1 text-sm text-gold-400 hover:text-gold-300 transition-colors">
            مشاهده همه
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {bestsellers.map((book, i) => (
            <BookCard key={book.id} book={book} index={i} />
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="relative overflow-hidden rounded-3xl glass">
          <div className="absolute inset-0 bg-gradient-to-l from-brand-900/80 to-brand-800/60" />
          <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-white">کتاب‌های دیجیتال 📱</h3>
              <p className="text-white/50 mt-2 max-w-md">دسترسی فوری به هزاران کتاب دیجیتال با ۳۰٪ تخفیف ویژه. مطالعه در هر زمان و هر مکان!</p>
              <Link to="/books?format=digital" className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-gradient-to-l from-gold-500 to-gold-600 text-brand-950 rounded-xl font-bold text-sm shadow-lg shadow-gold-500/20">
                مشاهده کتاب‌های دیجیتال
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
            <div className="text-6xl animate-float">📚</div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">تازه‌های نشر</h2>
              <p className="text-sm text-white/40">جدیدترین کتاب‌های منتشر شده</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {newArrivals.map((book, i) => (
            <BookCard key={book.id} book={book} index={i} />
          ))}
        </div>
      </section>

      {/* Discounted */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">تخفیف‌های ویژه</h2>
              <p className="text-sm text-white/40">فرصت محدود برای خرید با تخفیف</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {discounted.map((book, i) => (
            <BookCard key={book.id} book={book} index={i} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-black text-white">نظرات مشتریان</h2>
          <p className="text-sm text-white/40 mt-1">تجربه خوانندگان ما از خرید کتاب</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { name: 'سارا احمدی', text: 'کیفیت کتاب‌ها عالی بود و ارسال هم خیلی سریع انجام شد. حتماً دوباره خرید می‌کنم.', rating: 5 },
            { name: 'محمد رضایی', text: 'تنوع کتاب‌ها فوق‌العاده‌ست. هر کتابی که می‌خواستم رو پیدا کردم.', rating: 5 },
            { name: 'نیلوفر کریمی', text: 'قیمت‌ها نسبت به بقیه فروشگاه‌ها مناسب‌تره و بسته‌بندی هم خیلی تمیز بود.', rating: 4 },
          ].map((review, i) => (
            <div key={i} className="glass rounded-2xl p-6 space-y-3">
              <div className="flex gap-0.5">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-gold-400 text-gold-400" />
                ))}
              </div>
              <p className="text-sm text-white/60 leading-7">"{review.text}"</p>
              <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-700 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {review.name[0]}
                </div>
                <span className="text-sm text-white/60">{review.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: BookOpen, title: 'بیش از ۱۰,۰۰۰ عنوان', desc: 'مجموعه‌ای بی‌نظیر از کتاب‌های فارسی و ترجمه', color: 'from-brand-500 to-brand-700' },
            { icon: Users, title: '۵۰,۰۰۰+ مشتری', desc: 'اعتماد هزاران خواننده به فروشگاه ما', color: 'from-gold-500 to-gold-700' },
            { icon: Award, title: 'ضمانت اصالت', desc: 'تمامی کتاب‌ها اورجینال و با مجوز رسمی', color: 'from-emerald-500 to-emerald-700' },
          ].map((feature, i) => (
            <div key={i} className="glass rounded-2xl p-8 text-center space-y-3">
              <div className={`w-14 h-14 mx-auto bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white">{feature.title}</h3>
              <p className="text-sm text-white/40">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
