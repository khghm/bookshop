export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  cover: string;
  category: string;
  format: 'paper' | 'digital' | 'both';
  rating: number;
  reviewCount: number;
  description: string;
  pages: number;
  publisher: string;
  publishYear: number;
  isbn: string;
  language: string;
  bestseller?: boolean;
  newArrival?: boolean;
  discount?: number;
  stock: number;
  salesCount: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: { bookId: number; quantity: number; format: string; price: number }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  address: string;
  paymentMethod: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive' | 'banned';
  avatar: string;
}

export const categories = [
  { id: 'fiction', name: 'داستان و رمان', count: 156 },
  { id: 'science', name: 'علمی و دانشگاهی', count: 98 },
  { id: 'history', name: 'تاریخ و سیاست', count: 74 },
  { id: 'self-help', name: 'توسعه فردی', count: 112 },
  { id: 'children', name: 'کودک و نوجوان', count: 89 },
  { id: 'art', name: 'هنر و ادبیات', count: 63 },
  { id: 'tech', name: 'فناوری و برنامه‌نویسی', count: 45 },
  { id: 'philosophy', name: 'فلسفه و عرفان', count: 57 },
];

export const books: Book[] = [
  {
    id: 1,
    title: 'بوف کور',
    author: 'صادق هدایت',
    price: 85000,
    originalPrice: 120000,
    cover: 'https://image.qwenlm.ai/generated-images/47668d80-9acc-4c84-8a2d-ad9b5e6f81a0/_result.png',
    category: 'fiction',
    format: 'both',
    rating: 4.8,
    reviewCount: 342,
    description: 'بوف کور شاهکار صادق هدایت، یکی از مهم‌ترین آثار ادبیات مدرن ایران است. این رمان کوتاه با نثری سوررئالیستی و نمادین، روایتگر سفری درونی به اعماق روان انسان است.',
    pages: 120,
    publisher: 'نشر چشمه',
    publishYear: 1395,
    isbn: '978-964-362-045-1',
    language: 'فارسی',
    bestseller: true,
    discount: 29,
    stock: 45,
    salesCount: 1250,
  },
  {
    id: 2,
    title: 'کلیدر (جلد اول)',
    author: 'محمود دولت‌آبادی',
    price: 245000,
    originalPrice: 320000,
    cover: 'https://image.qwenlm.ai/generated-images/c0bb4e76-9c58-45e2-9b42-3ded37692c5f/_result.png',
    category: 'fiction',
    format: 'paper',
    rating: 4.9,
    reviewCount: 521,
    description: 'کلیدر بزرگ‌ترین رمان ادبیات فارسی و یکی از طولانی‌ترین رمان‌های جهان است. این اثر حماسی روایتگر زندگی مردم خراسان در دهه ۱۳۲۰ شمسی است.',
    pages: 890,
    publisher: 'نشر سخن',
    publishYear: 1398,
    isbn: '978-964-372-112-7',
    language: 'فارسی',
    bestseller: true,
    discount: 23,
    stock: 28,
    salesCount: 890,
  },
  {
    id: 3,
    title: 'تاریخ ایران کمبریج',
    author: 'پیتر آوری و همکاران',
    price: 380000,
    cover: 'https://image.qwenlm.ai/generated-images/5525d386-9e00-43bc-8f74-20099b77a941/_result.png',
    category: 'history',
    format: 'paper',
    rating: 4.6,
    reviewCount: 89,
    description: 'مجموعه تاریخ ایران کمبریج جامع‌ترین و معتبرترین تاریخ ایران از دوران باستان تا عصر حاضر است که توسط گروهی از ایران‌شناسان برجسته جهان نگاشته شده.',
    pages: 650,
    publisher: 'نشر علمی و فرهنگی',
    publishYear: 1400,
    isbn: '978-964-445-234-6',
    language: 'فارسی',
    newArrival: true,
    stock: 15,
    salesCount: 340,
  },
  {
    id: 4,
    title: 'اثر مرکب',
    author: 'دارن هاردی',
    price: 95000,
    originalPrice: 130000,
    cover: 'https://image.qwenlm.ai/generated-images/2a952afe-7b0d-4e8e-b929-3a3a77570c40/_result.png',
    category: 'self-help',
    format: 'both',
    rating: 4.5,
    reviewCount: 678,
    description: 'اثر مرکب فرمول موفقیت را در قالب عادات کوچک روزانه بیان می‌کند. این کتاب به شما نشان می‌دهد چگونه با انتخاب‌های کوچک و مداوم، نتایج بزرگ به دست آورید.',
    pages: 210,
    publisher: 'نشر میلکان',
    publishYear: 1401,
    isbn: '978-622-7745-12-3',
    language: 'فارسی',
    bestseller: true,
    discount: 27,
    stock: 120,
    salesCount: 2100,
  },
  {
    id: 5,
    title: 'شازده کوچولو',
    author: 'آنتوان دو سنت‌اگزوپری',
    price: 65000,
    cover: 'https://image.qwenlm.ai/generated-images/cfbd8910-3831-4264-8b5a-e119db79d5e9/_result.png',
    category: 'children',
    format: 'both',
    rating: 4.9,
    reviewCount: 1203,
    description: 'شازده کوچولو یکی از محبوب‌ترین داستان‌های جهان است که هم برای کودکان و هم بزرگسالان جذابیت دارد. این کتاب فلسفی با زبانی ساده، مفاهیم عمیق زندگی را بیان می‌کند.',
    pages: 96,
    publisher: 'نشر افق',
    publishYear: 1399,
    isbn: '978-964-363-456-8',
    language: 'فارسی',
    bestseller: true,
    stock: 200,
    salesCount: 3500,
  },
  {
    id: 6,
    title: 'هنر شفاف اندیشیدن',
    author: 'رولف دوبلی',
    price: 110000,
    originalPrice: 145000,
    cover: 'https://image.qwenlm.ai/generated-images/3b37b173-a82c-4ee9-8d39-b50f0028ddcc/_result.png',
    category: 'self-help',
    format: 'digital',
    rating: 4.4,
    reviewCount: 445,
    description: 'این کتاب ۹۹ خطای فکری رایج را معرفی می‌کند که مانع تصمیم‌گیری درست ما می‌شوند. با شناخت این خطاها می‌توانید تصمیمات بهتری در زندگی بگیرید.',
    pages: 320,
    publisher: 'نشر نوین',
    publishYear: 1400,
    isbn: '978-622-7745-89-2',
    language: 'فارسی',
    discount: 24,
    stock: 999,
    salesCount: 1800,
  },
  {
    id: 7,
    title: 'مبانی برنامه‌نویسی پایتون',
    author: 'اریک متز',
    price: 185000,
    cover: 'https://image.qwenlm.ai/generated-images/a090bbe9-46d4-402d-b740-4fd1084c22a5/_result.png',
    category: 'tech',
    format: 'both',
    rating: 4.7,
    reviewCount: 234,
    description: 'این کتاب مرجعی کامل برای یادگیری زبان برنامه‌نویسی پایتون از مبتدی تا پیشرفته است. با مثال‌های عملی و پروژه‌های کاربردی.',
    pages: 480,
    publisher: 'نشر فنی ایران',
    publishYear: 1402,
    isbn: '978-964-567-789-3',
    language: 'فارسی',
    newArrival: true,
    stock: 60,
    salesCount: 560,
  },
  {
    id: 8,
    title: 'فوتیسم و فلسفه شرق',
    author: 'ویلیام چیتیک',
    price: 165000,
    cover: 'https://image.qwenlm.ai/generated-images/6a2a9767-fb42-4f3e-a01c-06174e2f66a6/_result.png',
    category: 'philosophy',
    format: 'paper',
    rating: 4.3,
    reviewCount: 156,
    description: 'این کتاب به بررسی تطبیقی فوطیسم و فلسفه شرقی می‌پردازد و ارتباطات عمیق بین این دو سنت فکری را آشکار می‌سازد.',
    pages: 380,
    publisher: 'نشر ققنوس',
    publishYear: 1397,
    isbn: '978-964-876-234-1',
    language: 'فارسی',
    stock: 35,
    salesCount: 420,
  },
  {
    id: 9,
    title: 'صد سال تنهایی',
    author: 'گابریل گارسیا مارکز',
    price: 175000,
    originalPrice: 220000,
    cover: 'https://image.qwenlm.ai/generated-images/47668d80-9acc-4c84-8a2d-ad9b5e6f81a0/_result.png',
    category: 'fiction',
    format: 'both',
    rating: 4.8,
    reviewCount: 892,
    description: 'صد سال تنهایی شاهکار مارکز و یکی از بزرگ‌ترین رمان‌های قرن بیستم است. این اثر حماسه خانواده بوئندیا در شهر خیالی ماکوندو را روایت می‌کند.',
    pages: 450,
    publisher: 'نشر کاروان',
    publishYear: 1401,
    isbn: '978-964-234-567-9',
    language: 'فارسی',
    bestseller: true,
    discount: 20,
    stock: 75,
    salesCount: 1650,
  },
  {
    id: 10,
    title: 'نقاشی رنگ روغن برای مبتدیان',
    author: 'مریم احمدی',
    price: 220000,
    cover: 'https://image.qwenlm.ai/generated-images/2a952afe-7b0d-4e8e-b929-3a3a77570c40/_result.png',
    category: 'art',
    format: 'both',
    rating: 4.6,
    reviewCount: 178,
    description: 'آموزش جامع تکنیک‌های نقاشی رنگ روغن از پایه تا پیشرفته با تصاویر رنگی و تمرین‌های عملی. مناسب برای هنرجویان مبتدی و متوسط.',
    pages: 256,
    publisher: 'نشر هنر رسانه',
    publishYear: 1402,
    isbn: '978-964-890-123-5',
    language: 'فارسی',
    newArrival: true,
    stock: 40,
    salesCount: 280,
  },
  {
    id: 11,
    title: 'فیزیک کوانتوم به زبان ساده',
    author: 'استیون هاوکینگ',
    price: 145000,
    originalPrice: 180000,
    cover: 'https://image.qwenlm.ai/generated-images/cfbd8910-3831-4264-8b5a-e119db79d5e9/_result.png',
    category: 'science',
    format: 'digital',
    rating: 4.7,
    reviewCount: 567,
    description: 'توضیح مفاهیم پیچیده فیزیک کوانتوم با زبانی ساده و قابل فهم برای عموم. این کتاب شما را به سفری شگفت‌انگیز در دنیای ذرات زیراتمی می‌برد.',
    pages: 280,
    publisher: 'نشر فاطمی',
    publishYear: 1401,
    isbn: '978-964-123-456-7',
    language: 'فارسی',
    bestseller: true,
    discount: 19,
    stock: 999,
    salesCount: 1400,
  },
  {
    id: 12,
    title: 'دیوان حافظ',
    author: 'حافظ شیرازی',
    price: 195000,
    cover: 'https://image.qwenlm.ai/generated-images/c0bb4e76-9c58-45e2-9b42-3ded37692c5f/_result.png',
    category: 'art',
    format: 'paper',
    rating: 5.0,
    reviewCount: 1567,
    description: 'دیوان کامل حافظ شیرازی با تصحیح علمی و حواشی توضیحی. این نسخه شامل فهرست موضوعی، واژه‌نامه و مقدمه‌ای جامع درباره زندگی و اندیشه حافظ است.',
    pages: 720,
    publisher: 'نشر نی',
    publishYear: 1399,
    isbn: '978-964-185-234-6',
    language: 'فارسی',
    bestseller: true,
    stock: 55,
    salesCount: 2800,
  },
];

export const orders: Order[] = [
  { id: 'ORD-1001', customerName: 'علی محمدی', customerEmail: 'ali@email.com', items: [{ bookId: 1, quantity: 2, format: 'paper', price: 85000 }], total: 170000, status: 'delivered', date: '۱۴۰۳/۰۳/۱۵', address: 'تهران، خیابان ولیعصر', paymentMethod: 'آنلاین' },
  { id: 'ORD-1002', customerName: 'مریم حسینی', customerEmail: 'maryam@email.com', items: [{ bookId: 4, quantity: 1, format: 'digital', price: 66500 }, { bookId: 6, quantity: 1, format: 'digital', price: 77000 }], total: 143500, status: 'shipped', date: '۱۴۰۳/۰۳/۱۴', address: 'اصفهان، خیابان چهارباغ', paymentMethod: 'آنلاین' },
  { id: 'ORD-1003', customerName: 'رضا کریمی', customerEmail: 'reza@email.com', items: [{ bookId: 2, quantity: 1, format: 'paper', price: 245000 }], total: 245000, status: 'processing', date: '۱۴۰۳/۰۳/۱۳', address: 'شیراز، بلوار زند', paymentMethod: 'کارت به کارت' },
  { id: 'ORD-1004', customerName: 'فاطمه احمدی', customerEmail: 'fatemeh@email.com', items: [{ bookId: 5, quantity: 3, format: 'paper', price: 65000 }], total: 195000, status: 'pending', date: '۱۴۰۳/۰۳/۱۲', address: 'مشهد، بلوار وکیل‌آباد', paymentMethod: 'درگاه آنلاین' },
  { id: 'ORD-1005', customerName: 'حسین رضایی', customerEmail: 'hossein@email.com', items: [{ bookId: 9, quantity: 1, format: 'paper', price: 175000 }, { bookId: 12, quantity: 1, format: 'paper', price: 195000 }], total: 370000, status: 'delivered', date: '۱۴۰۳/۰۳/۱۰', address: 'تبریز، خیابان آزادی', paymentMethod: 'آنلاین' },
  { id: 'ORD-1006', customerName: 'زهرا نوری', customerEmail: 'zahra@email.com', items: [{ bookId: 7, quantity: 1, format: 'digital', price: 129500 }], total: 129500, status: 'delivered', date: '۱۴۰۳/۰۳/۰۹', address: 'کرج، مهرشهر', paymentMethod: 'آنلاین' },
  { id: 'ORD-1007', customerName: 'امیر جعفری', customerEmail: 'amir@email.com', items: [{ bookId: 11, quantity: 2, format: 'digital', price: 101500 }], total: 203000, status: 'cancelled', date: '۱۴۰۳/۰۳/۰۸', address: 'اهواز، کیانپارس', paymentMethod: 'آنلاین' },
  { id: 'ORD-1008', customerName: 'سارا موسوی', customerEmail: 'sara@email.com', items: [{ bookId: 3, quantity: 1, format: 'paper', price: 380000 }], total: 380000, status: 'shipped', date: '۱۴۰۳/۰۳/۰۷', address: 'قم، بلوار امین', paymentMethod: 'کارت به کارت' },
];

export const users: User[] = [
  { id: 1, name: 'علی محمدی', email: 'ali@email.com', phone: '۰۹۱۲۱۲۳۴۵۶۷', joinDate: '۱۴۰۲/۰۶/۱۵', totalOrders: 12, totalSpent: 2450000, status: 'active', avatar: 'ع' },
  { id: 2, name: 'مریم حسینی', email: 'maryam@email.com', phone: '۰۹۱۳۲۳۴۵۶۷۸', joinDate: '۱۴۰۲/۰۸/۲۰', totalOrders: 8, totalSpent: 1850000, status: 'active', avatar: 'م' },
  { id: 3, name: 'رضا کریمی', email: 'reza@email.com', phone: '۰۹۱۴۳۴۵۶۷۸۹', joinDate: '۱۴۰۲/۱۰/۰۵', totalOrders: 5, totalSpent: 980000, status: 'active', avatar: 'ر' },
  { id: 4, name: 'فاطمه احمدی', email: 'fatemeh@email.com', phone: '۰۹۱۵۴۵۶۷۸۹۰', joinDate: '۱۴۰۳/۰۱/۱۰', totalOrders: 3, totalSpent: 520000, status: 'active', avatar: 'ف' },
  { id: 5, name: 'حسین رضایی', email: 'hossein@email.com', phone: '۰۹۱۶۵۶۷۸۹۰۱', joinDate: '۱۴۰۲/۰۴/۲۲', totalOrders: 18, totalSpent: 4200000, status: 'active', avatar: 'ح' },
  { id: 6, name: 'زهرا نوری', email: 'zahra@email.com', phone: '۰۹۱۷۶۷۸۹۰۱۲', joinDate: '۱۴۰۳/۰۲/۰۱', totalOrders: 2, totalSpent: 350000, status: 'inactive', avatar: 'ز' },
  { id: 7, name: 'امیر جعفری', email: 'amir@email.com', phone: '۰۹۱۸۷۸۹۰۱۲۳', joinDate: '۱۴۰۲/۱۲/۱۵', totalOrders: 7, totalSpent: 1200000, status: 'active', avatar: 'ا' },
  { id: 8, name: 'سارا موسوی', email: 'sara@email.com', phone: '۰۹۱۹۸۹۰۱۲۳۴', joinDate: '۱۴۰۳/۰۳/۰۱', totalOrders: 1, totalSpent: 380000, status: 'banned', avatar: 'س' },
];

export const salesData = [
  { month: 'فروردین', sales: 45, revenue: 12500000 },
  { month: 'اردیبهشت', sales: 52, revenue: 15800000 },
  { month: 'خرداد', sales: 61, revenue: 18200000 },
  { month: 'تیر', sales: 48, revenue: 14500000 },
  { month: 'مرداد', sales: 55, revenue: 16800000 },
  { month: 'شهریور', sales: 72, revenue: 22000000 },
  { month: 'مهر', sales: 68, revenue: 20500000 },
  { month: 'آبان', sales: 80, revenue: 25000000 },
  { month: 'آذر', sales: 75, revenue: 23500000 },
  { month: 'دی', sales: 65, revenue: 19800000 },
  { month: 'بهمن', sales: 90, revenue: 28000000 },
  { month: 'اسفند', sales: 95, revenue: 30500000 },
];
