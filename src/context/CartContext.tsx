import { createContext, useContext, useState, ReactNode } from 'react';
import { Book } from '../data/books';

export interface CartItem {
  book: Book;
  quantity: number;
  format: 'paper' | 'digital';
}

interface CartContextType {
  items: CartItem[];
  addToCart: (book: Book, format: 'paper' | 'digital') => void;
  removeFromCart: (bookId: number, format: 'paper' | 'digital') => void;
  updateQuantity: (bookId: number, format: 'paper' | 'digital', quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (book: Book, format: 'paper' | 'digital') => {
    setItems(prev => {
      const existing = prev.find(item => item.book.id === book.id && item.format === format);
      if (existing) {
        return prev.map(item =>
          item.book.id === book.id && item.format === format
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { book, quantity: 1, format }];
    });
  };

  const removeFromCart = (bookId: number, format: 'paper' | 'digital') => {
    setItems(prev => prev.filter(item => !(item.book.id === bookId && item.format === format)));
  };

  const updateQuantity = (bookId: number, format: 'paper' | 'digital', quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId, format);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.book.id === bookId && item.format === format
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => {
    const price = item.format === 'digital' ? item.book.price * 0.7 : item.book.price;
    return sum + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      isCartOpen,
      setIsCartOpen,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
