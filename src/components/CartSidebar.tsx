import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartSidebar() {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  const formatPrice = (price: number) => {
    return price.toLocaleString('fa-IR');
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary-600" />
            <h2 className="text-lg font-bold text-gray-800">سبد خرید</h2>
            <span className="bg-primary-100 text-primary-700 text-xs font-bold px-2 py-0.5 rounded-full">
              {totalItems} کالا
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-gray-600 font-medium">سبد خرید شما خالی است</h3>
              <p className="text-sm text-gray-400 mt-1">کتاب‌های مورد علاقه خود را اضافه کنید</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700 transition-colors"
              >
                مشاهده کتاب‌ها
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => {
                const itemPrice = item.format === 'digital' ? item.book.price * 0.7 : item.book.price;
                return (
                  <div key={`${item.book.id}-${item.format}`} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                    <img
                      src={item.book.cover}
                      alt={item.book.title}
                      className="w-16 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-800 line-clamp-1">{item.book.title}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">{item.book.author}</p>
                      <span className={`text-xs mt-1 inline-block px-1.5 py-0.5 rounded ${
                        item.format === 'digital' ? 'bg-purple-100 text-purple-700' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {item.format === 'digital' ? 'دیجیتال' : 'کاغذی'}
                      </span>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => updateQuantity(item.book.id, item.format, item.quantity - 1)}
                            className="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.book.id, item.format, item.quantity + 1)}
                            className="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-primary-700">
                            {formatPrice(itemPrice * item.quantity)}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.book.id, item.format)}
                            className="w-6 h-6 rounded-md hover:bg-red-50 flex items-center justify-center text-red-400 hover:text-red-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">جمع کل:</span>
              <span className="text-lg font-bold text-primary-700">{formatPrice(totalPrice)} تومان</span>
            </div>
            <Link
              to="/cart"
              onClick={() => setIsCartOpen(false)}
              className="block w-full text-center py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors"
            >
              تکمیل خرید
            </Link>
            <button
              onClick={() => setIsCartOpen(false)}
              className="block w-full text-center py-2 text-sm text-gray-500 hover:text-primary-600 transition-colors"
            >
              ادامه خرید
            </button>
          </div>
        )}
      </div>
    </>
  );
}
