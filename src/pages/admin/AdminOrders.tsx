import { useState } from 'react';
import { Search, Eye, Package, CheckCircle, XCircle, Clock, Truck, Download, ChevronDown, Trash2, AlertTriangle, X } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { Order } from '../../data/books';
import { exportToPDF, exportToExcel } from '../../utils/exportUtils';

export default function AdminOrders() {
  const { orders, updateOrderStatus, deleteOrder } = useAdmin();
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

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

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleExportPDF = () => {
    const data = filteredOrders.map(o => [
      o.id,
      o.customerName,
      o.date,
      o.total.toLocaleString('fa-IR'),
      o.paymentMethod,
      o.status === 'pending' ? 'در انتظار' : o.status === 'processing' ? 'پردازش' : o.status === 'shipped' ? 'ارسال شده' : o.status === 'delivered' ? 'تحویل شده' : 'لغو شده',
    ]);
    exportToPDF('گزارش سفارشات', ['شماره سفارش', 'مشتری', 'تاریخ', 'مبلغ', 'روش پرداخت', 'وضعیت'], data, 'orders-report');
  };

  const handleExportExcel = () => {
    const data = filteredOrders.map(o => ({
      'شماره سفارش': o.id,
      'مشتری': o.customerName,
      'ایمیل': o.customerEmail,
      'تاریخ': o.date,
      'مبلغ (تومان)': o.total,
      'روش پرداخت': o.paymentMethod,
      'وضعیت': o.status,
      'آدرس': o.address,
    }));
    exportToExcel(data, 'orders-report', 'سفارشات');
  };

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    updateOrderStatus(orderId, newStatus);
    showToast('وضعیت سفارش بروزرسانی شد');
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const handleDelete = (id: string) => {
    deleteOrder(id);
    setDeleteConfirm(null);
    showToast('سفارش حذف شد');
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-fade-in-up bg-emerald-500/90 text-white">
          <CheckCircle className="w-4 h-4" />
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">مدیریت سفارشات</h1>
          <p className="text-sm text-white/40 mt-1">{orders.length} سفارش ثبت شده</p>
        </div>
        <button onClick={handleExportPDF} className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl text-sm text-white/60 hover:text-white transition-colors">
          <Download className="w-4 h-4" />
          PDF
        </button>
        <button onClick={handleExportExcel} className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl text-sm text-white/60 hover:text-white transition-colors">
          <Download className="w-4 h-4" />
          Excel
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
                    <p className="text-xs text-white/30">{order.id} - {order.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-left">
                    <p className="text-lg font-black text-gold-400">{order.total.toLocaleString('fa-IR')} <span className="text-xs text-white/30">تومان</span></p>
                    <p className="text-[10px] text-white/30">{order.paymentMethod}</p>
                  </div>
                  {/* Status dropdown */}
                  <div className="relative">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                      className={`appearance-none text-xs px-3 py-1.5 pr-3 pl-8 rounded-lg ${sc.color} outline-none cursor-pointer`}
                    >
                      <option value="pending">در انتظار</option>
                      <option value="processing">در حال پردازش</option>
                      <option value="shipped">ارسال شده</option>
                      <option value="delivered">تحویل شده</option>
                      <option value="cancelled">لغو شده</option>
                    </select>
                    <ChevronDown className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" />
                  </div>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="w-8 h-8 glass rounded-lg flex items-center justify-center text-white/30 hover:text-white transition-colors"
                    title="مشاهده جزئیات"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(order.id)}
                    className="w-8 h-8 glass rounded-lg flex items-center justify-center text-white/30 hover:text-red-400 transition-colors"
                    title="حذف سفارش"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {/* Items */}
              <div className="mt-3 pt-3 border-t border-white/5 flex flex-wrap gap-2">
                {order.items.map((item, i) => (
                  <span key={i} className="text-[10px] px-2 py-1 bg-white/5 rounded-lg text-white/40">
                    کتاب #{item.bookId} x {item.quantity}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Order details modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedOrder(null)}>
          <div className="bg-[#0f0f1a] border border-white/5 rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">جزئیات سفارش</h3>
              <button onClick={() => setSelectedOrder(null)} className="w-8 h-8 glass rounded-lg flex items-center justify-center text-white/40 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="glass rounded-xl p-3">
                  <p className="text-[10px] text-white/30">شماره سفارش</p>
                  <p className="text-sm font-bold text-white">{selectedOrder.id}</p>
                </div>
                <div className="glass rounded-xl p-3">
                  <p className="text-[10px] text-white/30">تاریخ</p>
                  <p className="text-sm font-bold text-white">{selectedOrder.date}</p>
                </div>
                <div className="glass rounded-xl p-3">
                  <p className="text-[10px] text-white/30">مشتری</p>
                  <p className="text-sm font-bold text-white">{selectedOrder.customerName}</p>
                </div>
                <div className="glass rounded-xl p-3">
                  <p className="text-[10px] text-white/30">مبلغ کل</p>
                  <p className="text-sm font-bold text-gold-400">{selectedOrder.total.toLocaleString('fa-IR')} تومان</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-white/40 mb-2">آدرس:</p>
                <p className="text-sm text-white/60">{selectedOrder.address}</p>
              </div>
              <div>
                <p className="text-xs text-white/40 mb-2">روش پرداخت:</p>
                <p className="text-sm text-white/60">{selectedOrder.paymentMethod}</p>
              </div>
              <div>
                <p className="text-xs text-white/40 mb-2">وضعیت:</p>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value as Order['status'])}
                  className="w-full px-3 py-2 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none"
                >
                  <option value="pending">در انتظار</option>
                  <option value="processing">در حال پردازش</option>
                  <option value="shipped">ارسال شده</option>
                  <option value="delivered">تحویل شده</option>
                  <option value="cancelled">لغو شده</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-[#0f0f1a] border border-white/5 rounded-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-white">حذف سفارش</h3>
            </div>
            <p className="text-sm text-white/50 mb-6">آیا از حذف این سفارش اطمینان دارید؟</p>
            <div className="flex gap-2">
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium text-sm transition-colors">
                تایید حذف
              </button>
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 glass rounded-xl text-sm text-white/60 hover:text-white">
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
