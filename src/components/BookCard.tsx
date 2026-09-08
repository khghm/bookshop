import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { Book } from '../data/books';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(book, book.format === 'digital' ? 'digital' : 'paper');
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('fa-IR');
  };

  return (
    <Link
      to={`/book/${book.id}`}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary-200"
    >
      {/* Cover */}
      <div className="relative overflow-hidden bg-gray-50 p-4 book-card">
        <div className="aspect-[3/4] rounded-lg overflow-hidden mx-auto max-w-[180px]">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover book-cover"
          />
        </div>

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          {book.discount && (
            <span className="bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
              {book.discount}% تخفیف
            </span>
          )}
          {book.bestseller && (
            <span className="bg-warm-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
              پرفروش
            </span>
          )}
          {book.newArrival && (
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
              جدید
            </span>
          )}
        </div>

        {/* Format badge */}
        <div className="absolute bottom-3 left-3">
          <span className={`text-xs font-medium px-2 py-1 rounded-lg ${
            book.format === 'digital' ? 'bg-purple-100 text-purple-700' :
            book.format === 'both' ? 'bg-blue-100 text-blue-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {book.format === 'digital' ? '📱 دیجیتال' :
             book.format === 'both' ? '📖 کاغذی + دیجیتال' : '📖 کاغذی'}
          </span>
        </div>

        {/* Quick actions */}
        <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all">
            <Eye className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-bold text-gray-800 text-sm leading-6 line-clamp-1 group-hover:text-primary-600 transition-colors">
          {book.title}
        </h3>
        <p className="text-xs text-gray-500 mt-1">{book.author}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <Star className="w-3.5 h-3.5 fill-warm-400 text-warm-400" />
          <span className="text-xs text-gray-600">{book.rating}</span>
          <span className="text-xs text-gray-400">({book.reviewCount} نظر)</span>
        </div>

        {/* Price */}
        <div className="mt-3 flex items-center justify-between">
          <div>
            {book.originalPrice && (
              <span className="text-xs text-gray-400 line-through block">
                {formatPrice(book.originalPrice)} تومان
              </span>
            )}
            <span className="text-sm font-bold text-primary-700">
              {formatPrice(book.price)} تومان
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              added
                ? 'bg-green-500 text-white scale-110'
                : 'bg-primary-50 hover:bg-primary-600 text-primary-600 hover:text-white'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Link>
  );
}
