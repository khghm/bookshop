import { useState } from 'react';
import { Search, Filter, Eye, Package, CheckCircle, XCircle, Clock, Truck, Download, ChevronDown } from 'lucide-react';
import { orders, Order } from '../../data/books';

export default function AdminOrders() {
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter(o => {
    if (statusFilter && o.status !== statusFilter) return false;
    if (searchQuery && !o.customerName.includes(searchQuery) && !o.id.includes(searchQuery)) return false;
    return true;
  });

  const statusConfig = {
    pending: { label: 'در انتظار', color: 'text-yellow-400 bg-yellow-500/10', icon: Clock },
    processing: { label: 'در حال پردازش', color: 'text-blue-400 bg-blue-500/10', icon: Package },
    shipped: { label: 'ارسال شده', color: 'text-purple-400 bg-purple-500/10', icon: Truck },
    delivered: { label: 'تحویل شده', color: 'text-emerald-400 bg-emerald-500/10', icon: CheckCircle },
    cancelled: { label: 'لغو شده', color: 'text-red-400 bg-red-500/10', icon: XCircle },
  };

  const statusCounts = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">مدیریت سفارشات</h1>
          <p className="text-sm text-white/40 mt-1">{orders.length} سفارش ثبت شده</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl text-sm text-white/60">
          <Download className="w-4 h-4" />
          خروجی اکسل
        </button>
      </div>

      {/* Status tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: '', label: 'همه', count: statusCounts.all },
          { key: 'pending', label: 'در انتظار', count: statusCounts.pending },
          { key: 'processing', label: 'پردازش', count: statusCounts.processing },
          { key: 'shipped', label: 'ارسال شده', count: statusCounts.shipped },
          { key: 'delivered', label: 'تحویل شده', count: statusCounts.delivered },
          { key: 'cancelled', label: 'لغو شده', count: statusCounts.cancelled },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setStatusFilter(tab.key)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              statusFilter === tab.key ? 'bg-gold-500/20 text-gold-400 border border-gold-500/30' : 'glass text-white/40 hover:text-white'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
        <input
          type="text"
          placeholder="جستجوی شماره سفارش یا نام مشتری..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-2.5 pr-10 pl-4 glass rounded-xl text-sm text-white placeholder-white/20 outline-none focus:border-gold-500/30"
        />
      </div>

      {/* Orders list */}
      <div className="space-y-3">
        {filteredOrders.map((order) => {
          const sc = statusConfig[order.status];
          return (
            <div key={order.id} className="glass rounded-2xl p-5 hover:border-white/10 transition-all">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center text-white font-bold">
                    {order.customerName[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{order.customerName}</p>
                    <p className="text-xs text-white/30">{order.id} • {order.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-left">
                    <p className="text-lg font-black text-gold-400">{order.total.toLocaleString('fa-IR')} <span className="text-xs text-white/30">تومان</span></p>
                    <p className="text-[10px] text-white/30">{order.paymentMethod}</p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-lg ${sc.color}`}>{sc.label}</span>
                  <button className="w-8 h-8 glass rounded-lg flex items-center justify-center text-white/30 hover:text-white transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {/* Items */}
              <div className="mt-3 pt-3 border-t border-white/5 flex flex-wrap gap-2">
                {order.items.map((item, i) => (
                  <span key={i} className="text-[10px] px-2 py-1 bg-white/5 rounded-lg text-white/40">
                    کتاب #{item.bookId} × {item.quantity}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
