import { useState } from 'react';
import { Save, Globe, Truck, CreditCard, Bell, Shield, Palette, Check } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export default function AdminSettings() {
  const { settings, updateSettings } = useAdmin();
  const [activeTab, setActiveTab] = useState('general');
  const [toast, setToast] = useState<string | null>(null);

  const tabs = [
    { id: 'general', label: 'عمومی', icon: Globe },
    { id: 'shipping', label: 'ارسال', icon: Truck },
    { id: 'payment', label: 'پرداخت', icon: CreditCard },
    { id: 'notification', label: 'اعلان‌ها', icon: Bell },
    { id: 'security', label: 'امنیت', icon: Shield },
    { id: 'appearance', label: 'ظاهر', icon: Palette },
  ];

  const handleSave = () => {
    updateSettings(settings);
    setToast('تنظیمات با موفقیت ذخیره شد');
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-fade-in-up bg-emerald-500/90 text-white">
          <Check className="w-4 h-4" />
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}

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
                    <input
                      type="text"
                      value={settings.storeName}
                      onChange={(e) => updateSettings({ storeName: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 mb-1.5 block">ایمیل فروشگاه</label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) => updateSettings({ email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 mb-1.5 block">تلفن تماس</label>
                    <input
                      type="text"
                      value={settings.phone}
                      onChange={(e) => updateSettings({ phone: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 mb-1.5 block">واحد پول</label>
                    <select
                      value={settings.currency}
                      onChange={(e) => updateSettings({ currency: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-sm text-white/60 outline-none"
                    >
                      <option value="تومان">تومان</option>
                      <option value="ریال">ریال</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-white/40 mb-1.5 block">آدرس</label>
                  <input
                    type="text"
                    value={settings.address}
                    onChange={(e) => updateSettings({ address: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/40 mb-1.5 block">توضیحات فروشگاه</label>
                  <textarea
                    rows={3}
                    value={settings.description}
                    onChange={(e) => updateSettings({ description: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30 resize-none"
                  />
                </div>
              </>
            )}

            {activeTab === 'shipping' && (
              <>
                <h3 className="text-lg font-bold text-white">تنظیمات ارسال</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-white/40 mb-1.5 block">هزینه ارسال عادی (تومان)</label>
                    <input
                      type="number"
                      value={settings.shippingCost}
                      onChange={(e) => updateSettings({ shippingCost: Number(e.target.value) })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 mb-1.5 block">ارسال رایگان از (تومان)</label>
                    <input
                      type="number"
                      value={settings.freeShippingThreshold}
                      onChange={(e) => updateSettings({ freeShippingThreshold: Number(e.target.value) })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 mb-1.5 block">زمان پردازش (روز)</label>
                    <input
                      type="number"
                      value={settings.processingTime}
                      onChange={(e) => updateSettings({ processingTime: Number(e.target.value) })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 mb-1.5 block">شرکت پستی پیش‌فرض</label>
                    <select
                      value={settings.defaultCourier}
                      onChange={(e) => updateSettings({ defaultCourier: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-sm text-white/60 outline-none"
                    >
                      <option value="post-express">پست پیشتاز</option>
                      <option value="tipax">تیپاکس</option>
                      <option value="post-regular">پست سفارشی</option>
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
                      <input
                        type="checkbox"
                        checked={settings.onlinePayment}
                        onChange={(e) => updateSettings({ onlinePayment: e.target.checked })}
                        className="sr-only peer"
                      />
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
                      <input
                        type="checkbox"
                        checked={settings.cardToCard}
                        onChange={(e) => updateSettings({ cardToCard: e.target.checked })}
                        className="sr-only peer"
                      />
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
                      <input
                        type="checkbox"
                        checked={settings.codPayment}
                        onChange={(e) => updateSettings({ codPayment: e.target.checked })}
                        className="sr-only peer"
                      />
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
                    { key: 'orderNotification', title: 'اعلان سفارش جدید', desc: 'دریافت ایمیل هنگام ثبت سفارش جدید' },
                    { key: 'userNotification', title: 'اعلان ثبت‌نام کاربر', desc: 'دریافت اعلان هنگام ثبت‌نام کاربر جدید' },
                    { key: 'dailyReport', title: 'خلاصه روزانه فروش', desc: 'دریافت گزارش روزانه فروش' },
                    { key: 'stockAlert', title: 'هشدار موجودی کم', desc: 'هشدار هنگام کم شدن موجودی کتاب' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/3 rounded-xl">
                      <div>
                        <p className="text-sm font-medium text-white">{item.title}</p>
                        <p className="text-xs text-white/30">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
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
                    <select
                      value={settings.theme}
                      onChange={(e) => updateSettings({ theme: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-sm text-white/60 outline-none"
                    >
                      <option value="dark">تیره (پیش‌فرض)</option>
                      <option value="light">روشن</option>
                      <option value="auto">خودکار</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-white/40 mb-1.5 block">رنگ اصلی</label>
                    <div className="flex gap-2">
                      {['#7c3aed', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'].map((color, i) => (
                        <button
                          key={i}
                          onClick={() => updateSettings({ primaryColor: color })}
                          className={`w-8 h-8 rounded-lg ${settings.primaryColor === color ? 'ring-2 ring-white' : ''}`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Save button */}
            <div className="pt-4 border-t border-white/5 flex justify-end">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-l from-gold-500 to-gold-600 text-brand-950 rounded-xl font-bold text-sm shadow-lg shadow-gold-500/20"
              >
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
