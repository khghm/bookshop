import { createContext, useContext, useState, ReactNode } from 'react';
import { books as initialBooks, orders as initialOrders, users as initialUsers, Book, Order, User } from '../data/books';

interface Coupon {
  id: number;
  code: string;
  discount: number;
  type: 'percent' | 'fixed';
  usageLimit: number;
  usedCount: number;
  expiryDate: string;
  status: 'active' | 'expired' | 'disabled';
}

interface StoreSettings {
  storeName: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  currency: string;
  shippingCost: number;
  freeShippingThreshold: number;
  processingTime: number;
  defaultCourier: string;
  onlinePayment: boolean;
  cardToCard: boolean;
  codPayment: boolean;
  theme: string;
  primaryColor: string;
}

interface AdminContextType {
  books: Book[];
  orders: Order[];
  users: User[];
  coupons: Coupon[];
  settings: StoreSettings;
  // Book operations
  addBook: (book: Omit<Book, 'id' | 'salesCount'>) => void;
  updateBook: (id: number, book: Partial<Book>) => void;
  deleteBook: (id: number) => void;
  // Order operations
  updateOrderStatus: (id: string, status: Order['status']) => void;
  deleteOrder: (id: string) => void;
  // User operations
  updateUserStatus: (id: number, status: User['status']) => void;
  deleteUser: (id: number) => void;
  // Coupon operations
  addCoupon: (coupon: Omit<Coupon, 'id' | 'usedCount'>) => void;
  updateCoupon: (id: number, coupon: Partial<Coupon>) => void;
  deleteCoupon: (id: number) => void;
  // Settings
  updateSettings: (settings: Partial<StoreSettings>) => void;
  // Notifications
  notifications: Notification[];
  markNotificationRead: (id: number) => void;
  clearNotifications: () => void;
}

interface Notification {
  id: number;
  type: 'order' | 'user' | 'stock' | 'system';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

const initialCoupons: Coupon[] = [
  { id: 1, code: 'BOOK20', discount: 10, type: 'percent', usageLimit: 100, usedCount: 45, expiryDate: '1403/06/31', status: 'active' },
  { id: 2, code: 'WELCOME50', discount: 50000, type: 'fixed', usageLimit: 50, usedCount: 32, expiryDate: '1403/04/31', status: 'active' },
  { id: 3, code: 'SUMMER30', discount: 30, type: 'percent', usageLimit: 200, usedCount: 200, expiryDate: '1403/05/31', status: 'expired' },
  { id: 4, code: 'VIP25', discount: 25, type: 'percent', usageLimit: 30, usedCount: 8, expiryDate: '1403/12/29', status: 'active' },
  { id: 5, code: 'OFF100', discount: 100000, type: 'fixed', usageLimit: 500, usedCount: 120, expiryDate: '1403/08/30', status: 'disabled' },
];

const initialNotifications: Notification[] = [
  { id: 1, type: 'order', title: 'سفارش جدید', message: 'سفارش ORD-1009 توسط علی محمدی ثبت شد', date: '۱۴۰۳/۰۳/۱۶', read: false },
  { id: 2, type: 'user', title: 'کاربر جدید', message: 'کاربر جدیدی با نام سارا رضایی ثبت‌نام کرد', date: '۱۴۰۳/۰۳/۱۶', read: false },
  { id: 3, type: 'stock', title: 'هشدار موجودی', message: 'موجودی کتاب "تاریخ ایران کمبریج" به ۱۵ عدد رسید', date: '۱۴۰۳/۰۳/۱۵', read: false },
  { id: 4, type: 'system', title: 'پشتیبان‌گیری', message: 'پشتیبان‌گیری روزانه با موفقیت انجام شد', date: '۱۴۰۳/۰۳/۱۵', read: true },
];

const initialSettings: StoreSettings = {
  storeName: 'کتاب‌خانه نوین',
  email: 'info@ketabkhaneh-novin.ir',
  phone: '۰۲۱-۱۲۳۴۵۶۷۸',
  address: 'تهران، خیابان انقلاب، پلاک ۱۲۳',
  description: 'فروشگاه آنلاین کتاب‌خانه نوین با بیش از ۱۰ سال سابقه در ارائه کتاب‌های کاغذی و دیجیتال',
  currency: 'تومان',
  shippingCost: 35000,
  freeShippingThreshold: 500000,
  processingTime: 2,
  defaultCourier: 'post-express',
  onlinePayment: true,
  cardToCard: true,
  codPayment: false,
  theme: 'dark',
  primaryColor: '#7c3aed',
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [settings, setSettings] = useState<StoreSettings>(initialSettings);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  // Book operations
  const addBook = (book: Omit<Book, 'id' | 'salesCount'>) => {
    const newBook: Book = { ...book, id: Math.max(...books.map(b => b.id)) + 1, salesCount: 0 };
    setBooks(prev => [newBook, ...prev]);
  };

  const updateBook = (id: number, updates: Partial<Book>) => {
    setBooks(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const deleteBook = (id: number) => {
    setBooks(prev => prev.filter(b => b.id !== id));
  };

  // Order operations
  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const deleteOrder = (id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  // User operations
  const updateUserStatus = (id: number, status: User['status']) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status } : u));
  };

  const deleteUser = (id: number) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  // Coupon operations
  const addCoupon = (coupon: Omit<Coupon, 'id' | 'usedCount'>) => {
    const newCoupon: Coupon = { ...coupon, id: Math.max(...coupons.map(c => c.id), 0) + 1, usedCount: 0 };
    setCoupons(prev => [newCoupon, ...prev]);
  };

  const updateCoupon = (id: number, updates: Partial<Coupon>) => {
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteCoupon = (id: number) => {
    setCoupons(prev => prev.filter(c => c.id !== id));
  };

  // Settings
  const updateSettings = (updates: Partial<StoreSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  // Notifications
  const markNotificationRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearNotifications = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <AdminContext.Provider value={{
      books, orders, users, coupons, settings,
      addBook, updateBook, deleteBook,
      updateOrderStatus, deleteOrder,
      updateUserStatus, deleteUser,
      addCoupon, updateCoupon, deleteCoupon,
      updateSettings,
      notifications, markNotificationRead, clearNotifications,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within AdminProvider');
  return context;
}
