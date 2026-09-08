import { BarChart3, TrendingUp, DollarSign, ShoppingCart, Users, BookOpen, Calendar, Download } from 'lucide-react';
import { salesData } from '../../data/books';
import { useAdmin } from '../../context/AdminContext';
import { exportToPDF, exportToExcel } from '../../utils/exportUtils';

export default function AdminReports() {
  const { books, orders, users } = useAdmin();
  const totalRevenue = salesData.reduce((sum, d) => sum + d.revenue, 0);
  const totalSales = salesData.reduce((sum, d) => sum + d.sales, 0);
  const avgOrderValue = totalRevenue / orders.length;
  const maxRevenue = Math.max(...salesData.map(d => d.revenue));

  const handleExportPDF = () => {
    const data = salesData.map(d => [
      d.month,
      d.revenue.toLocaleString('fa-IR'),
      d.sales.toString(),
    ]);
    exportToPDF('گزارش فروش ماهانه', ['ماه', 'درآمد (تومان)', 'تعداد فروش'], data, 'sales-report');
  };

  const handleExportExcel = () => {
    const data = salesData.map(d => ({
      'ماه': d.month,
      'درآمد (تومان)': d.revenue,
      'تعداد فروش': d.sales,
    }));
    exportToExcel(data, 'sales-report', 'فروش ماهانه');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">گزارشات و آمار</h1>
          <p className="text-sm text-white/40 mt-1">تحلیل عملکرد فروشگاه</p>
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-2.5 glass rounded-xl text-sm text-white/60 outline-none">
            <option>سال ۱۴۰۳</option>
            <option>سال ۱۴۰۲</option>
          </select>
          <button onClick={handleExportPDF} className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl text-sm text-white/60 hover:text-white transition-colors">
            <Download className="w-4 h-4" />
            PDF
          </button>
          <button onClick={handleExportExcel} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-l from-gold-500 to-gold-600 text-brand-950 rounded-xl text-sm font-bold shadow-lg shadow-gold-500/20">
            <Download className="w-4 h-4" />
            Excel
          </button>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'درآمد کل سال', value: (totalRevenue / 1000000).toFixed(0) + 'M', unit: 'تومان', icon: DollarSign, color: 'from-emerald-500 to-emerald-700' },
          { title: 'تعداد فروش', value: totalSales.toLocaleString('fa-IR'), unit: 'نسخه', icon: ShoppingCart, color: 'from-blue-500 to-blue-700' },
          { title: 'میانگین سفارش', value: (avgOrderValue / 1000).toFixed(0) + 'K', unit: 'تومان', icon: BookOpen, color: 'from-purple-500 to-purple-700' },
          { title: 'نرخ تبدیل', value: '۳.۸٪', unit: '', icon: TrendingUp, color: 'from-gold-500 to-gold-700' },
        ].map((stat, i) => (
          <div key={i} className="glass rounded-2xl p-5">
            <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-xl font-black text-white">{stat.value}</p>
            <p className="text-xs text-white/30 mt-0.5">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-sm font-bold text-white mb-6">روند درآمد ماهانه</h3>
        <div className="flex items-end gap-3 h-56">
          {salesData.map((data, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
              <span className="text-[9px] text-white/30 opacity-0 group-hover:opacity-100 transition-opacity">
                {(data.revenue / 1000000).toFixed(1)}M
              </span>
              <div className="relative w-full flex items-end justify-center h-44">
                <div
                  className="w-full max-w-[28px] bg-gradient-to-t from-brand-600 to-brand-400 rounded-t-lg hover:from-gold-600 hover:to-gold-400 transition-all cursor-pointer"
                  style={{ height: `${(data.revenue / maxRevenue) * 100}%` }}
                />
              </div>
              <span className="text-[9px] text-white/30">{data.month.slice(0, 3)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top selling books */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="glass rounded-2xl p-6">
          <h3 className="text-sm font-bold text-white mb-4">پرفروش‌ترین کتاب‌ها</h3>
          <div className="space-y-3">
            {books.sort((a, b) => b.salesCount - a.salesCount).slice(0, 6).map((book, i) => (
              <div key={book.id} className="flex items-center gap-3">
                <span className="text-sm font-black text-white/10 w-5">{i + 1}</span>
                <img src={book.cover} alt="" className="w-8 h-10 object-cover rounded" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white line-clamp-1">{book.title}</p>
                  <p className="text-[10px] text-white/30">{book.salesCount} فروش</p>
                </div>
                <div className="w-24 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-l from-gold-500 to-gold-600 rounded-full" style={{ width: `${(book.salesCount / 3500) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="text-sm font-bold text-white mb-4">آمار کاربران</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white/3 rounded-xl">
              <span className="text-sm text-white/60">کل کاربران</span>
              <span className="text-lg font-bold text-white">{users.length.toLocaleString('fa-IR')}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/3 rounded-xl">
              <span className="text-sm text-white/60">کاربران فعال</span>
              <span className="text-lg font-bold text-emerald-400">{users.filter(u => u.status === 'active').length}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/3 rounded-xl">
              <span className="text-sm text-white/60">میانگین خرید هر کاربر</span>
              <span className="text-lg font-bold text-gold-400">{(users.reduce((s, u) => s + u.totalSpent, 0) / users.length / 1000).toFixed(0)}K ت</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/3 rounded-xl">
              <span className="text-sm text-white/60">میانگین سفارش هر کاربر</span>
              <span className="text-lg font-bold text-blue-400">{(users.reduce((s, u) => s + u.totalOrders, 0) / users.length).toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
