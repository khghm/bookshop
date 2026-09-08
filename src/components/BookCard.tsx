import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Eye, Heart } from 'lucide-react';
import { Book } from '../data/books';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

interface BookCardProps {
  book: Book;
  index?: number;
}

export default function BookCard({ book, index = 0 }: BookCardProps) {
  const { addToCart } = useCart();
  const [selectedFormat, setSelectedFormat] = useState<'paper' | 'digital'>('paper');
  const [isLiked, setIsLiked] = useState(false);

  const formatPrice = (price: number) => price.toLocaleString('fa-IR');
  const displayPrice = selectedFormat === 'digital' ? book.price * 0.7 : book.price;

  return (
    <div className={`book-card group relative glass rounded-2xl overflow-hidden glow-card opacity-0 animate-fade-in-up`} style={{ animationDelay: `${index * 0.08}s` }}>
      {/* Badges */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5">
        {book.discount && (
          <span className="px-2 py-0.5 bg-red-500/90 text-white text-[10px] font-bold rounded-md backdrop-blur-sm">
            {book.discount}٪ تخفیف
          </span>
        )}
        {book.bestseller && (
          <span className="px-2 py-0.5 bg-gold-500/90 text-brand-950 text-[10px] font-bold rounded-md backdrop-blur-sm">
            پرفروش
          </span>
        )}
        {book.newArrival && (
          <span className="px-2 py-0.5 bg-emerald-500/90 text-white text-[10px] font-bold rounded-md backdrop-blur-sm">
            جدید
          </span>
        )}
      </div>

      {/* Like button */}
      <button
        onClick={(e) => { e.preventDefault(); setIsLiked(!isLiked); }}
        className="absolute top-3 left-3 z-10 w-8 h-8 glass rounded-full flex items-center justify-center text-white/40 hover:text-red-400 transition-colors"
      >
        <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-400 text-red-400' : ''}`} />
      </button>

      {/* Cover */}
      <Link to={`/book/${book.id}`} className="block relative overflow-hidden">
        <div className="aspect-[3/4] bg-gradient-to-b from-white/5 to-transparent">
          <img
            src={book.cover}
            alt={book.title}
            className="book-cover-img w-full h-full object-cover"
          />
        </div>
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
          <div className="flex gap-2">
            <span className="px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-lg text-white text-xs flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              مشاهده
            </span>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4 space-y-2.5">
        {/* Category */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded-full">
            {book.format === 'digital' ? 'دیجیتال' : book.format === 'both' ? 'کاغذی و دیجیتال' : 'کاغذی'}
          </span>
          <div className="flex items-center gap-0.5">
            <Star className="w-3 h-3 fill-gold-400 text-gold-400" />
            <span className="text-[10px] text-white/60">{book.rating}</span>
          </div>
        </div>

        {/* Title & Author */}
        <Link to={`/book/${book.id}`}>
          <h3 className="font-bold text-white text-sm leading-6 line-clamp-1 group-hover:text-gold-400 transition-colors">
            {book.title}
          </h3>
        </Link>
        <p className="text-xs text-white/40">{book.author}</p>

        {/* Format toggle */}
        {book.format === 'both' && (
          <div className="flex gap-1 p-0.5 bg-white/5 rounded-lg">
            <button
              onClick={() => setSelectedFormat('paper')}
              className={`flex-1 text-[10px] py-1 rounded-md transition-all ${selectedFormat === 'paper' ? 'bg-white/10 text-white' : 'text-white/30'}`}
            >
              کاغذی
            </button>
            <button
              onClick={() => setSelectedFormat('digital')}
              className={`flex-1 text-[10px] py-1 rounded-md transition-all ${selectedFormat === 'digital' ? 'bg-purple-500/20 text-purple-300' : 'text-white/30'}`}
            >
              دیجیتال
            </button>
          </div>
        )}

        {/* Price & Add to cart */}
        <div className="flex items-center justify-between pt-1">
          <div>
            {book.originalPrice && (
              <span className="text-[10px] text-white/30 line-through block">
                {formatPrice(selectedFormat === 'digital' ? book.originalPrice * 0.7 : book.originalPrice)}
              </span>
            )}
            <span className="text-sm font-black text-gold-400">
              {formatPrice(displayPrice)}
              <span className="text-[10px] text-white/30 font-normal mr-0.5">تومان</span>
            </span>
          </div>
          <button
            onClick={(e) => { e.preventDefault(); addToCart(book, selectedFormat); }}
            className="w-9 h-9 bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl flex items-center justify-center text-brand-950 hover:scale-110 transition-transform shadow-lg shadow-gold-500/20"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
