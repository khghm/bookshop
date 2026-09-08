import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartSidebar() {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  const formatPrice = (price: number) => price.toLocaleString('fa-IR');

  if (!isCartOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity" onClick={() => setIsCartOpen(false)} />
      <div className="fixed top-0 left-0 h-full w-full max-w-md bg-[#0f0f1a] border-r border-white/5 z-50 flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-brand-950" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">سبد خرید</h2>
              <p className="text-xs text-white/40">{totalItems} کالا</p>
            </div>
          </div>
          <button onClick={() => setIsCartOpen(false)} className="w-8 h-8 rounded-lg glass flex items-center justify-center text-white/40 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 glass rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-10 h-10 text-white/20" />
              </div>
              <h3 className="text-white/60 font-medium">سبد خرید شما خالی است</h3>
              <p className="text-sm text-white/30 mt-1">کتاب‌های مورد علاقه خود را اضافه کنید</p>
              <button onClick={() => setIsCartOpen(false)} className="mt-4 px-6 py-2.5 bg-gradient-to-l from-gold-500 to-gold-600 text-brand-950 rounded-xl text-sm font-bold">
                مشاهده کتاب‌ها
              </button>
            </div>
          ) : (
            items.map((item) => {
              const itemPrice = item.format === 'digital' ? item.book.price * 0.7 : item.book.price;
              return (
                <div key={`${item.book.id}-${item.format}`} className="flex gap-3 p-3 glass rounded-xl">
                  <img src={item.book.cover} alt={item.book.title} className="w-16 h-20 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-white line-clamp-1">{item.book.title}</h4>
                    <p className="text-xs text-white/40 mt-0.5">{item.book.author}</p>
                    <span className={`text-[10px] mt-1 inline-block px-1.5 py-0.5 rounded ${
                      item.format === 'digital' ? 'bg-purple-500/20 text-purple-300' : 'bg-white/5 text-white/50'
                    }`}>
                      {item.format === 'digital' ? 'دیجیتال' : 'کاغذی'}
                    </span>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => updateQuantity(item.book.id, item.format, item.quantity - 1)} className="w-6 h-6 glass rounded-md flex items-center justify-center text-white/40 hover:text-white">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-medium text-white w-5 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.book.id, item.format, item.quantity + 1)} className="w-6 h-6 glass rounded-md flex items-center justify-center text-white/40 hover:text-white">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gold-400">{formatPrice(itemPrice * item.quantity)}</span>
                        <button onClick={() => removeFromCart(item.book.id, item.format)} className="w-6 h-6 rounded-md hover:bg-red-500/20 flex items-center justify-center text-white/30 hover:text-red-400">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-white/5 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/50">جمع کل:</span>
              <span className="text-xl font-black gradient-text-gold">{formatPrice(totalPrice)} <span className="text-xs text-white/30">تومان</span></span>
            </div>
            <Link to="/cart" onClick={() => setIsCartOpen(false)} className="block w-full text-center py-3.5 bg-gradient-to-l from-gold-500 to-gold-600 text-brand-950 rounded-xl font-bold text-sm shadow-lg shadow-gold-500/20 hover:from-gold-400 hover:to-gold-500 transition-all btn-premium">
              تکمیل خرید
            </Link>
            <button onClick={() => setIsCartOpen(false)} className="block w-full text-center py-2 text-xs text-white/40 hover:text-gold-400 transition-colors">
              ادامه خرید
            </button>
          </div>
        )}
      </div>
    </>
  );
}
