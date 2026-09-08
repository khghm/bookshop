import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Shield, Truck, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const formatPrice = (price: number) => price.toLocaleString('fa-IR');
  const discount = couponApplied ? totalPrice * 0.1 : 0;
  const shipping = totalPrice > 500000 ? 0 : 35000;
  const finalPrice = totalPrice - discount + shipping;

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'BOOK20' || couponCode.trim() === 'کتاب') setCouponApplied(true);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-24 h-24 glass rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-12 h-12 text-white/20" />
        </div>
        <h2 className="text-2xl font-black text-white">سبد خرید شما خالی است</h2>
        <p className="text-sm text-white/40 mt-2">هنوز کتابی به سبد خرید اضافه نکرده‌اید</p>
        <Link to="/books" className="inline-flex items-center gap-2 mt-6 px-8 py-3.5 bg-gradient-to-l from-gold-500 to-gold-600 text-brand-950 rounded-2xl font-bold text-sm shadow-lg shadow-gold-500/20">
          <ArrowRight className="w-4 h-4" /> مشاهده کتاب‌ها
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-black text-white mb-8">سبد خرید</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => {
            const itemPrice = item.format === 'digital' ? item.book.price * 0.7 : item.book.price;
            return (
              <div key={`${item.book.id}-${item.format}`} className="flex gap-4 glass rounded-2xl p-4">
                <Link to={`/book/${item.book.id}`}>
                  <img src={item.book.cover} alt={item.book.title} className="w-24 h-32 object-cover rounded-xl" />
                </Link>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <Link to={`/book/${item.book.id}`} className="font-bold text-white hover:text-gold-400 transition-colors">{item.book.title}</Link>
                      <p className="text-sm text-white/40 mt-0.5">{item.book.author}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.book.id, item.format)} className="text-white/20 hover:text-red-400 transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <span className={`inline-block text-xs mt-2 px-2 py-0.5 rounded ${item.format === 'digital' ? 'bg-purple-500/20 text-purple-300' : 'bg-white/5 text-white/40'}`}>
                    {item.format === 'digital' ? '📱 دیجیتال' : '📖 کاغذی'}
                  </span>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.book.id, item.format, item.quantity - 1)} className="w-8 h-8 glass rounded-lg flex items-center justify-center text-white/40 hover:text-white">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium text-white">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.book.id, item.format, item.quantity + 1)} className="w-8 h-8 glass rounded-lg flex items-center justify-center text-white/40 hover:text-white">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-lg font-black text-gold-400">{formatPrice(itemPrice * item.quantity)} <span className="text-xs text-white/30 font-normal">تومان</span></span>
                  </div>
                </div>
              </div>
            );
          })}
          <button onClick={clearCart} className="text-sm text-red-400/60 hover:text-red-400 flex items-center gap-1 transition-colors">
            <Trash2 className="w-4 h-4" /> حذف همه موارد
          </button>
        </div>

        <div className="lg:col-span-1">
          <div className="glass rounded-2xl p-6 sticky top-32 space-y-4">
            <h3 className="text-lg font-bold text-white">خلاصه سفارش</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-white/40">قیمت کالاها ({totalItems} عدد)</span><span className="font-medium text-white">{formatPrice(totalPrice)} تومان</span></div>
              {couponApplied && <div className="flex justify-between text-emerald-400"><span>تخفیف (۱۰٪)</span><span className="font-medium">-{formatPrice(discount)} تومان</span></div>}
              <div className="flex justify-between"><span className="text-white/40">هزینه ارسال</span><span className={`font-medium ${shipping === 0 ? 'text-emerald-400' : 'text-white'}`}>{shipping === 0 ? 'رایگان' : `${formatPrice(shipping)} تومان`}</span></div>
              <div className="border-t border-white/5 pt-3 flex justify-between"><span className="font-bold text-white">مبلغ قابل پرداخت</span><span className="text-xl font-black gradient-text-gold">{formatPrice(finalPrice)} تومان</span></div>
            </div>

            <div className="pt-4 border-t border-white/5">
              <label className="text-sm font-medium text-white/60 mb-2 block">کد تخفیف</label>
              <div className="flex gap-2">
                <input type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} placeholder="کد تخفیف" className="flex-1 px-3 py-2.5 glass rounded-xl text-sm text-white placeholder-white/20 outline-none focus:border-gold-500/50" />
                <button onClick={handleApplyCoupon} className="px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-xl text-sm font-medium transition-colors">اعمال</button>
              </div>
              {couponApplied && <p className="text-xs text-emerald-400 mt-1">✓ کد تخفیف اعمال شد</p>}
            </div>

            <button className="w-full py-4 bg-gradient-to-l from-gold-500 to-gold-600 text-brand-950 rounded-2xl font-black text-lg shadow-2xl shadow-gold-500/20 hover:shadow-gold-500/40 transition-all hover:scale-[1.02] btn-premium">
              تکمیل خرید و پرداخت
            </button>

            <div className="space-y-2 pt-2">
              {[
                { icon: Shield, text: 'پرداخت امن با رمز یکبار مصرف', color: 'text-emerald-400' },
                { icon: Truck, text: 'ارسال سریع به سراسر ایران', color: 'text-blue-400' },
                { icon: CreditCard, text: 'امکان پرداخت در محل', color: 'text-purple-400' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-white/40">
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            <Link to="/books" className="block text-center text-sm text-gold-400 hover:text-gold-300 transition-colors pt-2">← ادامه خرید</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
