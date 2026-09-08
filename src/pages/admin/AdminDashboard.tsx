import { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, BookOpen, Eye, Edit, Trash2, Plus, Search, Filter, ChevronDown, Package, CheckCircle, XCircle, Clock, BarChart3, Download } from 'lucide-react';
import { salesData, categories, Order } from '../../data/books';
import { useAdmin } from '../../context/AdminContext';
import { exportToPDF, exportToExcel } from '../../utils/exportUtils';

export default function AdminDashboard() {
  const { books, orders, users } = useAdmin();
  const [activeSection] = useState('overview');

  const handleExportPDF = () => {
    const data = salesData.map(d => [
      d.month,
      d.revenue.toLocaleString('fa-IR'),
      d.sales.toString(),
    ]);
    exportToPDF('گزارش فروش ماهانه', ['ماه', 'درآمد (تومان)', 'تعداد فروش'], data, 'dashboard-report');
  };

  const handleExportExcel = () => {
    const data = salesData.map(d => ({
      'ماه': d.month,
      'درآمد (تومان)': d.revenue,
      'تعداد فروش': d.sales,
    }));
    exportToExcel(data, 'dashboard-report', 'فروش ماهانه');
  };

  const stats = [
    { title: 'فروش کل', value: '۲۴۵,۸۰۰,۰۰۰', unit: 'تومان', change: '+۱۲.۵٪', positive: true, icon: DollarSign, color: 'from-emerald-500 to-emerald-700' },
    { title: 'سفارشات', value: '۱,۲۸۴', unit: 'عدد', change: '+۸.۳٪', positive: true, icon: ShoppingCart, color: 'from-blue-500 to-blue-700' },
    { title: 'کاربران', value: '۵,۶۷۲', unit: 'نفر', change: '+۱۵.۲٪', positive: true, icon: Users, color: 'from-purple-500 to-purple-700' },
    { title: 'کتاب‌ها', value: '۱۰,۲۴۵', unit: 'عنوان', change: '+۳.۱٪', positive: true, icon: BookOpen, color: 'from-gold-500 to-gold-700' },
  ];

  const maxRevenue = Math.max(...salesData.map(d => d.revenue));

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">داشبورد مدیریت</h1>
          <p className="text-sm text-white/40 mt-1">خلاصه وضعیت فروشگاه کتاب‌خانه نوین</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="px-4 py-2 glass rounded-xl text-sm text-white/60 outline-none">
            <option>۳۰ روز اخیر</option>
            <option>۷ روز اخیر</option>
            <option>۳ ماه اخیر</option>
            <option>امسال</option>
          </select>
          <button onClick={handleExportExcel} className="px-4 py-2 bg-gradient-to-l from-gold-500 to-gold-600 text-brand-950 rounded-xl text-sm font-bold">
            دانلود گزارش
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="glass rounded-2xl p-5 space-y-3 hover:border-white/10 transition-all">
            <div className="flex items-center justify-between">
              <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <span className={`text-xs font-medium flex items-center gap-0.5 ${stat.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                {stat.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-2xl font-black text-white">{stat.value}</p>
              <p className="text-xs text-white/30 mt-0.5">{stat.title} <span className="text-white/20">({stat.unit})</span></p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Revenue chart */}
        <div className="lg:col-span-2 glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-white">نمودار فروش</h3>
              <p className="text-xs text-white/30 mt-0.5">درآمد ماهانه فروشگاه</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gold-500" />
              <span className="text-xs text-white/40">درآمد</span>
            </div>
          </div>
          <div className="flex items-end gap-2 h-48">
            {salesData.map((data, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                <div className="relative w-full flex items-end justify-center h-40">
                  <div
                    className="w-full max-w-[30px] bg-gradient-to-t from-gold-600 to-gold-400 rounded-t-lg transition-all hover:from-brand-500 hover:to-brand-400 cursor-pointer opacity-0 animate-fade-in-up"
                    style={{ height: `${(data.revenue / maxRevenue) * 100}%`, animationDelay: `${i * 0.05}s` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-white/10 rounded-md text-[10px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      {(data.revenue / 1000000).toFixed(1)}M
                    </div>
                  </div>
                </div>
                <span className="text-[9px] text-white/30">{data.month.slice(0, 3)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category distribution */}
        <div className="glass rounded-2xl p-6">
          <h3 className="text-sm font-bold text-white mb-4">توزیع دسته‌بندی</h3>
          <div className="space-y-3">
            {categories.slice(0, 6).map((cat, i) => {
              const total = categories.reduce((sum, c) => sum + c.count, 0);
              const pct = Math.round((cat.count / total) * 100);
              const colors = ['bg-gold-500', 'bg-brand-500', 'bg-emerald-500', 'bg-blue-500', 'bg-red-500', 'bg-purple-500'];
              return (
                <div key={cat.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/60">{cat.name}</span>
                    <span className="text-white/30">{pct}٪</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full ${colors[i]} rounded-full transition-all`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent orders & top books */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Recent orders */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white">آخرین سفارشات</h3>
            <a href="#" className="text-xs text-gold-400 hover:text-gold-300">مشاهده همه</a>
          </div>
          <div className="space-y-2">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-white/3 rounded-xl hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                    {order.customerName[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{order.customerName}</p>
                    <p className="text-[10px] text-white/30">{order.id} • {order.date}</p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-gold-400">{order.total.toLocaleString('fa-IR')} <span className="text-[10px] text-white/30">ت</span></p>
                  <OrderStatus status={order.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top books */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white">پرفروش‌ترین کتاب‌ها</h3>
            <a href="#" className="text-xs text-gold-400 hover:text-gold-300">مشاهده همه</a>
          </div>
          <div className="space-y-2">
            {books.sort((a, b) => b.salesCount - a.salesCount).slice(0, 5).map((book, i) => (
              <div key={book.id} className="flex items-center gap-3 p-3 bg-white/3 rounded-xl hover:bg-white/5 transition-colors">
                <span className="text-lg font-black text-white/10 w-6 text-center">{i + 1}</span>
                <img src={book.cover} alt={book.title} className="w-10 h-12 object-cover rounded-lg" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white line-clamp-1">{book.title}</p>
                  <p className="text-[10px] text-white/30">{book.author}</p>
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-emerald-400">{book.salesCount}</p>
                  <p className="text-[10px] text-white/30">فروش</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: Plus, label: 'افزودن کتاب', color: 'from-emerald-500 to-emerald-700' },
          { icon: Package, label: 'مدیریت سفارشات', color: 'from-blue-500 to-blue-700' },
          { icon: Users, label: 'مدیریت کاربران', color: 'from-purple-500 to-purple-700' },
          { icon: BarChart3, label: 'گزارش‌گیری', color: 'from-gold-500 to-gold-700' },
        ].map((action, i) => (
          <button key={i} className="glass rounded-2xl p-5 flex flex-col items-center gap-3 hover:border-white/10 transition-all hover:scale-[1.02]">
            <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center shadow-lg`}>
              <action.icon className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-medium text-white/70">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function OrderStatus({ status }: { status: Order['status'] }) {
  const config = {
    pending: { label: 'در انتظار', color: 'text-yellow-400 bg-yellow-500/10' },
    processing: { label: 'در حال پردازش', color: 'text-blue-400 bg-blue-500/10' },
    shipped: { label: 'ارسال شده', color: 'text-purple-400 bg-purple-500/10' },
    delivered: { label: 'تحویل شده', color: 'text-emerald-400 bg-emerald-500/10' },
    cancelled: { label: 'لغو شده', color: 'text-red-400 bg-red-500/10' },
  };
  const c = config[status];
  return <span className={`text-[10px] px-1.5 py-0.5 rounded ${c.color}`}>{c.label}</span>;
}
