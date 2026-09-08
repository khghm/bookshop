import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Shield, CreditCard } from 'lucide-react';
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
    if (couponCode.trim().toUpperCase() === 'BOOK20' || couponCode.trim() === 'کتاب') {
      setCouponApplied(true);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-12 h-12 text-gray-300" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">سبد خرید شما خالی است</h2>
        <p className="text-gray-500 mt-2">هنوز کتابی به سبد خرید اضافه نکرده‌اید</p>
        <Link
          to="/books"
          className="inline-flex items-center gap-2 mt-6 px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors"
        >
          <ArrowRight className="w-5 h-5" />
          مشاهده کتاب‌ها
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-black text-gray-800 mb-8">سبد خرید</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const itemPrice = item.format === 'digital' ? item.book.price * 0.7 : item.book.price;
            return (
              <div key={`${item.book.id}-${item.format}`} className="flex gap-4 bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <Link to={`/book/${item.book.id}`}>
                  <img src={item.book.cover} alt={item.book.title} className="w-24 h-32 object-cover rounded-lg" />
                </Link>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <Link to={`/book/${item.book.id}`} className="font-bold text-gray-800 hover:text-primary-600 transition-colors">
                        {item.book.title}
                      </Link>
                      <p className="text-sm text-gray-500 mt-0.5">{item.book.author}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.book.id, item.format)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <span className={`inline-block text-xs mt-2 px-2 py-0.5 rounded ${
                    item.format === 'digital' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {item.format === 'digital' ? '📱 نسخه دیجیتال' : '📖 نسخه کاغذی'}
                  </span>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.book.id, item.format, item.quantity - 1)}
                        className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.book.id, item.format, item.quantity + 1)}
                        className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-left">
                      <span className="text-lg font-bold text-primary-700">
                        {formatPrice(itemPrice * item.quantity)}
                      </span>
                      <span className="text-xs text-gray-400 mr-1">تومان</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <button
            onClick={clearCart}
            className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" />
            حذف همه موارد
          </button>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm sticky top-32">
            <h3 className="text-lg font-bold text-gray-800 mb-4">خلاصه سفارش</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">قیمت کالاها ({totalItems} عدد)</span>
                <span className="font-medium">{formatPrice(totalPrice)} تومان</span>
              </div>
              {couponApplied && (
                <div className="flex justify-between text-green-600">
                  <span>تخفیف کد تخفیف (۱۰٪)</span>
                  <span className="font-medium">-{formatPrice(discount)} تومان</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500">هزینه ارسال</span>
                <span className={`font-medium ${shipping === 0 ? 'text-green-600' : ''}`}>
                  {shipping === 0 ? 'رایگان' : `${formatPrice(shipping)} تومان`}
                </span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="font-bold text-gray-800">مبلغ قابل پرداخت</span>
                <span className="text-xl font-black text-primary-700">{formatPrice(finalPrice)} تومان</span>
              </div>
            </div>

            {/* Coupon */}
            <div className="mt-4 pt-4 border-t">
              <label className="text-sm font-medium text-gray-700 mb-2 block">کد تخفیف</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="کد تخفیف را وارد کنید"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-primary-500 outline-none"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  اعمال
                </button>
              </div>
              {couponApplied && (
                <p className="text-xs text-green-600 mt-1">✓ کد تخفیف با موفقیت اعمال شد</p>
              )}
              <p className="text-xs text-gray-400 mt-1">کد آزمایشی: BOOK20</p>
            </div>

            {/* Checkout button */}
            <button className="w-full mt-6 py-3.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold text-lg transition-all hover:scale-[1.02] shadow-lg shadow-primary-600/20">
              تکمیل خرید و پرداخت
            </button>

            {/* Trust badges */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Shield className="w-4 h-4 text-green-500" />
                <span>پرداخت امن با رمز یکبار مصرف</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Truck className="w-4 h-4 text-blue-500" />
                <span>ارسال سریع به سراسر ایران</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <CreditCard className="w-4 h-4 text-purple-500" />
                <span>امکان پرداخت در محل</span>
              </div>
            </div>

            <Link
              to="/books"
              className="block text-center mt-4 text-sm text-primary-600 hover:text-primary-700"
            >
              ← ادامه خرید
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
