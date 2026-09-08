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

interface WarehouseItem {
  id: number;
  bookId: number;
  location: string;
  shelf: string;
  quantity: number;
  lastUpdated: string;
  notes: string;
}

interface DigitalStorage {
  id: number;
  bookId: number;
  filePath: string;
  fileSize: string;
  format: string;
  uploadDate: string;
  downloadCount: number;
}

interface Supplier {
  id: number;
  name: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
  totalOrders: number;
  totalAmount: number;
  status: 'active' | 'inactive';
}

interface Transaction {
  id: number;
  date: string;
  type: 'income' | 'expense';
  category: string;
  description: string;
  amount: number;
  referenceNumber: string;
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

interface Notification {
  id: number;
  type: 'order' | 'user' | 'stock' | 'system';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

interface AdminContextType {
  books: Book[];
  orders: Order[];
  users: User[];
  coupons: Coupon[];
  warehouse: WarehouseItem[];
  digitalStorage: DigitalStorage[];
  suppliers: Supplier[];
  transactions: Transaction[];
  settings: StoreSettings;
  notifications: Notification[];
  
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
  
  // Warehouse operations
  addWarehouseItem: (item: Omit<WarehouseItem, 'id'>) => void;
  updateWarehouseItem: (id: number, item: Partial<WarehouseItem>) => void;
  deleteWarehouseItem: (id: number) => void;
  
  // Digital Storage operations
  addDigitalFile: (file: Omit<DigitalStorage, 'id' | 'downloadCount'>) => void;
  updateDigitalFile: (id: number, file: Partial<DigitalStorage>) => void;
  deleteDigitalFile: (id: number) => void;
  
  // Supplier operations
  addSupplier: (supplier: Omit<Supplier, 'id' | 'totalOrders' | 'totalAmount'>) => void;
  updateSupplier: (id: number, supplier: Partial<Supplier>) => void;
  deleteSupplier: (id: number) => void;
  
  // Transaction operations
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: number) => void;
  
  // Settings
  updateSettings: (settings: Partial<StoreSettings>) => void;
  
  // Notifications
  markNotificationRead: (id: number) => void;
  clearNotifications: () => void;
}

const initialCoupons: Coupon[] = [
  { id: 1, code: 'BOOK20', discount: 10, type: 'percent', usageLimit: 100, usedCount: 45, expiryDate: '1403/06/31', status: 'active' },
  { id: 2, code: 'WELCOME50', discount: 50000, type: 'fixed', usageLimit: 50, usedCount: 32, expiryDate: '1403/04/31', status: 'active' },
  { id: 3, code: 'SUMMER30', discount: 30, type: 'percent', usageLimit: 200, usedCount: 200, expiryDate: '1403/05/31', status: 'expired' },
  { id: 4, code: 'VIP25', discount: 25, type: 'percent', usageLimit: 30, usedCount: 8, expiryDate: '1403/12/29', status: 'active' },
  { id: 5, code: 'OFF100', discount: 100000, type: 'fixed', usageLimit: 500, usedCount: 120, expiryDate: '1403/08/30', status: 'disabled' },
];

const initialWarehouse: WarehouseItem[] = [
  { id: 1, bookId: 1, location: 'انبار اصلی', shelf: 'A-01', quantity: 45, lastUpdated: '1403/03/15', notes: '' },
  { id: 2, bookId: 2, location: 'انبار اصلی', shelf: 'A-02', quantity: 28, lastUpdated: '1403/03/14', notes: '' },
  { id: 3, bookId: 3, location: 'انبار اصلی', shelf: 'B-01', quantity: 15, lastUpdated: '1403/03/13', notes: 'موجودی کم' },
  { id: 4, bookId: 4, location: 'انبار مرکزی', shelf: 'C-01', quantity: 120, lastUpdated: '1403/03/12', notes: '' },
  { id: 5, bookId: 5, location: 'انبار مرکزی', shelf: 'C-02', quantity: 200, lastUpdated: '1403/03/11', notes: '' },
];

const initialDigitalStorage: DigitalStorage[] = [
  { id: 1, bookId: 1, filePath: '/books/buff-e-koor.pdf', fileSize: '12.5 MB', format: 'PDF', uploadDate: '1403/01/15', downloadCount: 234 },
  { id: 2, bookId: 4, filePath: '/books/asar-morakab.epub', fileSize: '8.2 MB', format: 'EPUB', uploadDate: '1403/01/20', downloadCount: 456 },
  { id: 3, bookId: 6, filePath: '/books/honar-shafaf.pdf', fileSize: '15.8 MB', format: 'PDF', uploadDate: '1403/02/01', downloadCount: 189 },
  { id: 4, bookId: 7, filePath: '/books/python-basics.pdf', fileSize: '22.3 MB', format: 'PDF', uploadDate: '1403/02/10', downloadCount: 312 },
];

const initialSuppliers: Supplier[] = [
  { id: 1, name: 'نشر چشمه', contact: 'احمد رضایی', phone: '021-88776655', email: 'info@cheshmeh.ir', address: 'تهران، خیابان انقلاب', totalOrders: 45, totalAmount: 12500000, status: 'active' },
  { id: 2, name: 'نشر سخن', contact: 'مریم محمدی', phone: '021-77665544', email: 'info@sokhan.ir', address: 'تهران، خیابان ولیعصر', totalOrders: 38, totalAmount: 9800000, status: 'active' },
  { id: 3, name: 'نشر نی', contact: 'علی حسینی', phone: '031-33445566', email: 'info@ney.ir', address: 'اصفهان، خیابان چهارباغ', totalOrders: 52, totalAmount: 15600000, status: 'active' },
  { id: 4, name: 'نشر افق', contact: 'فاطمه کریمی', phone: '051-38776655', email: 'info@ofogh.ir', address: 'مشهد، بلوار وکیل‌آباد', totalOrders: 28, totalAmount: 7200000, status: 'active' },
  { id: 5, name: 'نشر ققنوس', contact: 'رضا نوری', phone: '041-33445566', email: 'info@ghoghnoos.ir', address: 'تبریز، خیابان آزادی', totalOrders: 15, totalAmount: 3800000, status: 'inactive' },
];

const initialTransactions: Transaction[] = [
  { id: 1, date: '1403/03/15', type: 'income', category: 'فروش کتاب', description: 'فروش آنلاین کتاب بوف کور', amount: 85000, referenceNumber: 'ORD-1001' },
  { id: 2, date: '1403/03/14', type: 'income', category: 'فروش کتاب', description: 'فروش آنلاین کتاب اثر مرکب', amount: 66500, referenceNumber: 'ORD-1002' },
  { id: 3, date: '1403/03/13', type: 'expense', category: 'خرید از تأمین‌کننده', description: 'خرید کتاب از نشر چشمه', amount: 2500000, referenceNumber: 'INV-2001' },
  { id: 4, date: '1403/03/12', type: 'expense', category: 'هزینه ارسال', description: 'هزینه پست سفارشات', amount: 350000, referenceNumber: 'EXP-3001' },
  { id: 5, date: '1403/03/11', type: 'income', category: 'فروش کتاب', description: 'فروش حضوری کتاب کلیدر', amount: 245000, referenceNumber: 'ORD-1003' },
  { id: 6, date: '1403/03/10', type: 'expense', category: 'حقوق پرسنل', description: 'حقوق ماهانه کارکنان', amount: 15000000, referenceNumber: 'SAL-4001' },
  { id: 7, date: '1403/03/09', type: 'income', category: 'فروش کتاب', description: 'فروش آنلاین کتاب شازده کوچولو', amount: 65000, referenceNumber: 'ORD-1004' },
  { id: 8, date: '1403/03/08', type: 'expense', category: 'اجاره', description: 'اجاره مغازه ماهانه', amount: 8000000, referenceNumber: 'RENT-5001' },
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
  const [warehouse, setWarehouse] = useState<WarehouseItem[]>(initialWarehouse);
  const [digitalStorage, setDigitalStorage] = useState<DigitalStorage[]>(initialDigitalStorage);
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
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

  // Warehouse operations
  const addWarehouseItem = (item: Omit<WarehouseItem, 'id'>) => {
    const newItem: WarehouseItem = { ...item, id: Math.max(...warehouse.map(w => w.id), 0) + 1 };
    setWarehouse(prev => [newItem, ...prev]);
  };

  const updateWarehouseItem = (id: number, updates: Partial<WarehouseItem>) => {
    setWarehouse(prev => prev.map(w => w.id === id ? { ...w, ...updates } : w));
  };

  const deleteWarehouseItem = (id: number) => {
    setWarehouse(prev => prev.filter(w => w.id !== id));
  };

  // Digital Storage operations
  const addDigitalFile = (file: Omit<DigitalStorage, 'id' | 'downloadCount'>) => {
    const newFile: DigitalStorage = { ...file, id: Math.max(...digitalStorage.map(d => d.id), 0) + 1, downloadCount: 0 };
    setDigitalStorage(prev => [newFile, ...prev]);
  };

  const updateDigitalFile = (id: number, updates: Partial<DigitalStorage>) => {
    setDigitalStorage(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d));
  };

  const deleteDigitalFile = (id: number) => {
    setDigitalStorage(prev => prev.filter(d => d.id !== id));
  };

  // Supplier operations
  const addSupplier = (supplier: Omit<Supplier, 'id' | 'totalOrders' | 'totalAmount'>) => {
    const newSupplier: Supplier = { ...supplier, id: Math.max(...suppliers.map(s => s.id), 0) + 1, totalOrders: 0, totalAmount: 0 };
    setSuppliers(prev => [newSupplier, ...prev]);
  };

  const updateSupplier = (id: number, updates: Partial<Supplier>) => {
    setSuppliers(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const deleteSupplier = (id: number) => {
    setSuppliers(prev => prev.filter(s => s.id !== id));
  };

  // Transaction operations
  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = { ...transaction, id: Math.max(...transactions.map(t => t.id), 0) + 1 };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id: number) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
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
      books, orders, users, coupons, warehouse, digitalStorage, suppliers, transactions, settings, notifications,
      addBook, updateBook, deleteBook,
      updateOrderStatus, deleteOrder,
      updateUserStatus, deleteUser,
      addCoupon, updateCoupon, deleteCoupon,
      addWarehouseItem, updateWarehouseItem, deleteWarehouseItem,
      addDigitalFile, updateDigitalFile, deleteDigitalFile,
      addSupplier, updateSupplier, deleteSupplier,
      addTransaction, deleteTransaction,
      updateSettings,
      markNotificationRead, clearNotifications,
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
