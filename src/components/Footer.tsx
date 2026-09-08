import { Link } from 'react-router-dom';
import { BookOpen, Phone, Mail, MapPin, Instagram, Send, Shield, Truck, CreditCard } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a12] border-t border-white/5">
      {/* Trust badges */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck, title: 'ارسال سریع', desc: 'به سراسر ایران', color: 'text-blue-400' },
              { icon: Shield, title: 'ضمانت اصالت', desc: '۱۰۰٪ اورجینال', color: 'text-emerald-400' },
              { icon: CreditCard, title: 'پرداخت امن', desc: 'درگاه معتبر', color: 'text-purple-400' },
              { icon: Phone, title: 'پشتیبانی ۲۴/۷', desc: 'همیشه در کنار شما', color: 'text-gold-400' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-2xl glass">
                <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${item.color}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  <p className="text-xs text-white/40">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-brand-900/50 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 py-10 relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-black text-white">عضویت در خبرنامه ✉️</h3>
              <p className="text-sm text-white/40 mt-1">از آخرین تخفیف‌ها و کتاب‌های جدید باخبر شوید</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="ایمیل خود را وارد کنید..."
                className="flex-1 md:w-72 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-gold-500/50 outline-none text-sm"
              />
              <button className="px-6 py-3 bg-gradient-to-l from-gold-500 to-gold-600 text-brand-950 rounded-xl font-bold text-sm hover:from-gold-400 hover:to-gold-500 transition-all shadow-lg shadow-gold-500/20">
                عضویت
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-brand-950" />
              </div>
              <div>
                <h3 className="text-white font-bold">کتاب‌خانه نوین</h3>
                <p className="text-[10px] text-white/30">NOVIN BOOKSTORE</p>
              </div>
            </div>
            <p className="text-sm leading-7 text-white/40">
              فروشگاه آنلاین کتاب‌خانه نوین با بیش از ۱۰ سال سابقه، مرجعی معتبر برای علاقه‌مندان به کتاب و مطالعه است.
            </p>
            <div className="flex gap-2 mt-4">
              <a href="#" className="w-9 h-9 glass rounded-lg flex items-center justify-center text-white/40 hover:text-gold-400 hover:border-gold-500/30 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 glass rounded-lg flex items-center justify-center text-white/40 hover:text-gold-400 hover:border-gold-500/30 transition-all">
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 text-sm">دسترسی سریع</h4>
            <ul className="space-y-2.5">
              {[
                { to: '/books', label: 'همه کتاب‌ها' },
                { to: '/books?category=fiction', label: 'رمان و داستان' },
                { to: '/books?category=self-help', label: 'توسعه فردی' },
                { to: '/books?format=digital', label: 'کتاب‌های دیجیتال' },
                { to: '/books?sale=true', label: 'تخفیف‌ها' },
              ].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm text-white/40 hover:text-gold-400 transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 text-sm">خدمات مشتریان</h4>
            <ul className="space-y-2.5">
              {['راهنمای خرید', 'شرایط بازگشت', 'حریم خصوصی', 'سوالات متداول', 'درباره ما'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-white/40 hover:text-gold-400 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 text-sm">تماس با ما</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-white/40">
                <Phone className="w-4 h-4 text-gold-400" />
                <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/40">
                <Mail className="w-4 h-4 text-gold-400" />
                <span>info@ketabkhaneh-novin.ir</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/40">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-1" />
                <span>تهران، خیابان انقلاب، پلاک ۱۲۳</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/30">© ۱۴۰۳ کتاب‌خانه نوین. تمامی حقوق محفوظ است.</p>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 glass rounded-md">
              <span className="text-[10px] text-white/40">نماد اعتماد الکترونیکی</span>
            </div>
            <div className="px-3 py-1 glass rounded-md">
              <span className="text-[10px] text-white/40">پرداخت امن SSL</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
