import { useState } from 'react';
import { Save, Globe, Truck, CreditCard, Mail, Bell, Shield, Palette } from 'lucide-react';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'عمومی', icon: Globe },
    { id: 'shipping', label: 'ارسال', icon: Truck },
    { id: 'payment', label: 'پرداخت', icon: CreditCard },
    { id: 'notification', label: 'اعلان‌ها', icon: Bell },
    { id: 'security', label: 'امنیت', icon: Shield },
    { id: 'appearance', label: 'ظاهر', icon: Palette },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">تنظیمات</h1>
        <p className="text-sm text-white/40 mt-1">تنظیمات فروشگاه و سیستم</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="glass rounded-2xl p-3 space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm transition-all ${
                  activeTab === tab.id ? 'bg-gold-500/10 text-gold-400 border-r-2 border-gold-500' : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="glass rounded-2xl p-6 space-y-6">
            {activeTab === 'general' && (
              <>
                <h3 className="text-lg font-bold text-white">تنظیمات عمومی</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-white/40 mb-1.5 block">نام فروشگاه</label>
                    <input type="text" defaultValue="کتاب‌خانه نوین" className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30" />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 mb-1.5 block">ایمیل فروشگاه</label>
                    <input type="email" defaultValue="info@ketabkhaneh-novin.ir" className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30" />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 mb-1.5 block">تلفن تماس</label>
                    <input type="text" defaultValue="۰۲۱-۱۲۳۴۵۶۷۸" className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30" />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 mb-1.5 block">واحد پول</label>
                    <select className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-sm text-white/60 outline-none">
                      <option>تومان</option>
                      <option>ریال</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-white/40 mb-1.5 block">آدرس</label>
                  <input type="text" defaultValue="تهران، خیابان انقلاب، پلاک ۱۲۳" className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30" />
                </div>
                <div>
                  <label className="text-xs text-white/40 mb-1.5 block">توضیحات فروشگاه</label>
                  <textarea rows={3} defaultValue="فروشگاه آنلاین کتاب‌خانه نوین با بیش از ۱۰ سال سابقه..." className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30 resize-none" />
                </div>
              </>
            )}

            {activeTab === 'shipping' && (
              <>
                <h3 className="text-lg font-bold text-white">تنظیمات ارسال</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-white/40 mb-1.5 block">هزینه ارسال عادی (تومان)</label>
                    <input type="number" defaultValue="35000" className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30" />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 mb-1.5 block">ارسال رایگان از (تومان)</label>
                    <input type="number" defaultValue="500000" className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30" />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 mb-1.5 block">زمان پردازش (روز)</label>
                    <input type="number" defaultValue="2" className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30" />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 mb-1.5 block">شرکت پستی پیش‌فرض</label>
                    <select className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-sm text-white/60 outline-none">
                      <option>پست پیشتاز</option>
                      <option>تیپاکس</option>
                      <option>پست سفارشی</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'payment' && (
              <>
                <h3 className="text-lg font-bold text-white">تنظیمات پرداخت</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/3 rounded-xl">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-gold-400" />
                      <div>
                        <p className="text-sm font-medium text-white">درگاه آنلاین</p>
                        <p className="text-xs text-white/30">پرداخت از طریق درگاه بانکی</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-500"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/3 rounded-xl">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="text-sm font-medium text-white">کارت به کارت</p>
                        <p className="text-xs text-white/30">انتقال مستقیم کارت به کارت</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-500"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/3 rounded-xl">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-emerald-400" />
                      <div>
                        <p className="text-sm font-medium text-white">پرداخت در محل</p>
                        <p className="text-xs text-white/30">پرداخت هنگام تحویل کالا</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-500"></div>
                    </label>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'notification' && (
              <>
                <h3 className="text-lg font-bold text-white">تنظیمات اعلان‌ها</h3>
                <div className="space-y-4">
                  {[
                    { title: 'اعلان سفارش جدید', desc: 'دریافت ایمیل هنگام ثبت سفارش جدید', checked: true },
                    { title: 'اعلان ثبت‌نام کاربر', desc: 'دریافت اعلان هنگام ثبت‌نام کاربر جدید', checked: true },
                    { title: 'خلاصه روزانه فروش', desc: 'دریافت گزارش روزانه فروش', checked: false },
                    { title: 'هشدار موجودی کم', desc: 'هشدار هنگام کم شدن موجودی کتاب', checked: true },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/3 rounded-xl">
                      <div>
                        <p className="text-sm font-medium text-white">{item.title}</p>
                        <p className="text-xs text-white/30">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={item.checked} className="sr-only peer" />
                        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-500"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'security' && (
              <>
                <h3 className="text-lg font-bold text-white">تنظیمات امنیت</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-white/40 mb-1.5 block">رمز عبور فعلی</label>
                    <input type="password" className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30" />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 mb-1.5 block">رمز عبور جدید</label>
                    <input type="password" className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30" />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 mb-1.5 block">تکرار رمز عبور جدید</label>
                    <input type="password" className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30" />
                  </div>
                </div>
              </>
            )}

            {activeTab === 'appearance' && (
              <>
                <h3 className="text-lg font-bold text-white">تنظیمات ظاهری</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-white/40 mb-1.5 block">تم رنگی</label>
                    <select className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-sm text-white/60 outline-none">
                      <option>تیره (پیش‌فرض)</option>
                      <option>روشن</option>
                      <option>خودکار</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-white/40 mb-1.5 block">رنگ اصلی</label>
                    <div className="flex gap-2">
                      {['bg-purple-500', 'bg-blue-500', 'bg-emerald-500', 'bg-gold-500', 'bg-red-500'].map((color, i) => (
                        <button key={i} className={`w-8 h-8 rounded-lg ${color} ${i === 0 ? 'ring-2 ring-white' : ''}`} />
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Save button */}
            <div className="pt-4 border-t border-white/5 flex justify-end">
              <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-l from-gold-500 to-gold-600 text-brand-950 rounded-xl font-bold text-sm shadow-lg shadow-gold-500/20">
                <Save className="w-4 h-4" />
                ذخیره تغییرات
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
