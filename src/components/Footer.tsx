import { Link } from 'react-router-dom';
import { BookOpen, Phone, Mail, MapPin, Instagram, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter */}
      <div className="bg-primary-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-white text-lg font-bold">عضویت در خبرنامه</h3>
              <p className="text-primary-200 text-sm">از آخرین تخفیف‌ها و کتاب‌های جدید باخبر شوید</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="ایمیل خود را وارد کنید..."
                className="flex-1 md:w-72 px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
              />
              <button className="px-6 py-2.5 bg-warm-500 hover:bg-warm-600 text-white rounded-lg font-medium transition-colors">
                عضویت
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white text-lg font-bold">کتاب‌خانه نوین</h3>
            </div>
            <p className="text-sm leading-7 text-gray-400">
              فروشگاه آنلاین کتاب‌خانه نوین با بیش از ۱۰ سال سابقه در ارائه کتاب‌های کاغذی و دیجیتال، 
              مرجعی معتبر برای علاقه‌مندان به کتاب و مطالعه است.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors">
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold mb-4">دسترسی سریع</h4>
            <ul className="space-y-2.5">
              <li><Link to="/books" className="text-sm hover:text-primary-400 transition-colors">همه کتاب‌ها</Link></li>
              <li><Link to="/books?category=fiction" className="text-sm hover:text-primary-400 transition-colors">رمان و داستان</Link></li>
              <li><Link to="/books?category=self-help" className="text-sm hover:text-primary-400 transition-colors">توسعه فردی</Link></li>
              <li><Link to="/books?format=digital" className="text-sm hover:text-primary-400 transition-colors">کتاب‌های دیجیتال</Link></li>
              <li><Link to="/books?sale=true" className="text-sm hover:text-primary-400 transition-colors">تخفیف‌ها</Link></li>
            </ul>
          </div>

          {/* Customer service */}
          <div>
            <h4 className="text-white font-bold mb-4">خدمات مشتریان</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm hover:text-primary-400 transition-colors">راهنمای خرید</a></li>
              <li><a href="#" className="text-sm hover:text-primary-400 transition-colors">شرایط بازگشت</a></li>
              <li><a href="#" className="text-sm hover:text-primary-400 transition-colors">حریم خصوصی</a></li>
              <li><a href="#" className="text-sm hover:text-primary-400 transition-colors">سوالات متداول</a></li>
              <li><a href="#" className="text-sm hover:text-primary-400 transition-colors">درباره ما</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">تماس با ما</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-primary-400" />
                <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-primary-400" />
                <span>info@ketabkhaneh-novin.ir</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 text-primary-400 shrink-0 mt-1" />
                <span>تهران، خیابان انقلاب، پلاک ۱۲۳</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <p className="text-xs text-gray-500">
              © ۱۴۰۳ کتاب‌خانه نوین. تمامی حقوق محفوظ است.
            </p>
            <div className="flex items-center gap-4">
              <img src="https://img.shields.io/badge/نماد_اعتماد-الکترونیک-green?style=flat-square" alt="e-namad" className="h-8 rounded" />
              <span className="text-xs text-gray-500">پرداخت امن</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
