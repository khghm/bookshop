import { useState } from 'react';
import { Users, Plus, Edit, Trash2, Search, AlertTriangle, Check, Download, Phone, Mail, MapPin, X } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { exportToPDF, exportToExcel } from '../../utils/exportUtils';

export default function AdminSuppliers() {
  const { suppliers, addSupplier, updateSupplier, deleteSupplier } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<any>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const filteredSuppliers = suppliers.filter(s => {
    if (searchQuery && !s.name.includes(searchQuery) && !s.contact.includes(searchQuery)) return false;
    return true;
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = (id: number) => {
    deleteSupplier(id);
    setDeleteConfirm(null);
    showToast('تأمین‌کننده حذف شد');
  };

  const handleSave = (supplierData: any) => {
    if (editingSupplier) {
      updateSupplier(editingSupplier.id, supplierData);
      showToast('اطلاعات تأمین‌کننده بروزرسانی شد');
    } else {
      addSupplier(supplierData);
      showToast('تأمین‌کننده جدید اضافه شد');
    }
    setShowForm(false);
    setEditingSupplier(null);
  };

  const handleExportPDF = () => {
    const data = filteredSuppliers.map(s => [
      s.name,
      s.contact,
      s.phone,
      s.email,
      s.address,
      s.totalOrders.toString(),
      s.totalAmount.toLocaleString('fa-IR'),
      s.status === 'active' ? 'فعال' : 'غیرفعال',
    ]);
    exportToPDF('گزارش تأمین‌کنندگان', ['نام', 'تماس', 'تلفن', 'ایمیل', 'آدرس', 'تعداد سفارشات', 'مبلغ کل', 'وضعیت'], data, 'suppliers-report');
  };

  const handleExportExcel = () => {
    const data = filteredSuppliers.map(s => ({
      'نام': s.name,
      'شخص تماس': s.contact,
      'تلفن': s.phone,
      'ایمیل': s.email,
      'آدرس': s.address,
      'تعداد سفارشات': s.totalOrders,
      'مبلغ کل (تومان)': s.totalAmount,
      'وضعیت': s.status === 'active' ? 'فعال' : 'غیرفعال',
    }));
    exportToExcel(data, 'suppliers-report', 'تأمین‌کنندگان');
  };

  const totalSuppliers = suppliers.length;
  const activeSuppliers = suppliers.filter(s => s.status === 'active').length;
  const totalOrders = suppliers.reduce((sum, s) => sum + s.totalOrders, 0);
  const totalAmount = suppliers.reduce((sum, s) => sum + s.totalAmount, 0);

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-fade-in-up bg-emerald-500/90 text-white">
          <Check className="w-4 h-4" />
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">مدیریت تأمین‌کنندگان</h1>
          <p className="text-sm text-white/40 mt-1">مدیریت ناشران و تأمین‌کنندگان کتاب</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleExportPDF} className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl text-sm text-white/60 hover:text-white">
            <Download className="w-4 h-4" />
            PDF
          </button>
          <button onClick={handleExportExcel} className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl text-sm text-white/60 hover:text-white">
            <Download className="w-4 h-4" />
            Excel
          </button>
          <button
            onClick={() => { setEditingSupplier(null); setShowForm(true); }}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-l from-gold-500 to-gold-600 text-brand-950 rounded-xl text-sm font-bold shadow-lg shadow-gold-500/20"
          >
            <Plus className="w-4 h-4" />
            افزودن تأمین‌کننده
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-black text-white">{totalSuppliers}</p>
              <p className="text-xs text-white/30">کل تأمین‌کنندگان</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-black text-emerald-400">{activeSuppliers}</p>
              <p className="text-xs text-white/30">فعال</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-black text-white">{totalOrders}</p>
              <p className="text-xs text-white/30">کل سفارشات</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gold-500 to-gold-700 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-black text-gold-400">{(totalAmount / 1000000).toFixed(1)}M</p>
              <p className="text-xs text-white/30">مبلغ کل (تومان)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
        <input
          type="text"
          placeholder="جستجوی نام یا شخص تماس..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-2.5 pr-10 pl-4 glass rounded-xl text-sm text-white placeholder-white/20 outline-none focus:border-gold-500/30"
        />
      </div>

      {/* Suppliers list */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredSuppliers.map((supplier) => (
          <div key={supplier.id} className="glass rounded-2xl p-5 hover:border-white/10 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center text-white text-lg font-bold">
                  {supplier.name[0]}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{supplier.name}</h3>
                  <p className="text-xs text-white/40">{supplier.contact}</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-lg ${
                supplier.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
              }`}>
                {supplier.status === 'active' ? 'فعال' : 'غیرفعال'}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-white/50">
                <Phone className="w-4 h-4" />
                <span>{supplier.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/50">
                <Mail className="w-4 h-4" />
                <span>{supplier.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/50">
                <MapPin className="w-4 h-4" />
                <span>{supplier.address}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
              <div>
                <p className="text-xs text-white/30">تعداد سفارشات</p>
                <p className="text-lg font-bold text-white">{supplier.totalOrders}</p>
              </div>
              <div>
                <p className="text-xs text-white/30">مبلغ کل</p>
                <p className="text-lg font-bold text-gold-400">{(supplier.totalAmount / 1000000).toFixed(1)}M</p>
              </div>
            </div>

            <div className="flex gap-2 mt-4 pt-4 border-t border-white/5">
              <button
                onClick={() => { setEditingSupplier(supplier); setShowForm(true); }}
                className="flex-1 flex items-center justify-center gap-2 py-2 glass rounded-xl text-sm text-white/60 hover:text-white transition-colors"
              >
                <Edit className="w-4 h-4" />
                ویرایش
              </button>
              <button
                onClick={() => setDeleteConfirm(supplier.id)}
                className="flex-1 flex items-center justify-center gap-2 py-2 glass rounded-xl text-sm text-red-400/60 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit form */}
      {showForm && (
        <SupplierForm
          supplier={editingSupplier}
          onClose={() => { setShowForm(false); setEditingSupplier(null); }}
          onSave={handleSave}
        />
      )}

      {/* Delete confirmation */}
      {deleteConfirm !== null && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-[#0f0f1a] border border-white/5 rounded-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-white">حذف تأمین‌کننده</h3>
            </div>
            <p className="text-sm text-white/50 mb-6">آیا از حذف این تأمین‌کننده اطمینان دارید؟</p>
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

function SupplierForm({ supplier, onClose, onSave }: { supplier: any; onClose: () => void; onSave: (data: any) => void }) {
  const [formData, setFormData] = useState(supplier || {
    name: '',
    contact: '',
    phone: '',
    email: '',
    address: '',
    status: 'active',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contact) {
      alert('لطفاً فیلدهای ضروری را پر کنید');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#0f0f1a] border border-white/5 rounded-2xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <div className="p-5 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">{supplier ? 'ویرایش تأمین‌کننده' : 'افزودن تأمین‌کننده جدید'}</h3>
          <button onClick={onClose} className="w-8 h-8 glass rounded-lg flex items-center justify-center text-white/40 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="text-xs text-white/40 mb-1.5 block">نام تأمین‌کننده *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30"
              placeholder="مثال: نشر چشمه"
              required
            />
          </div>
          <div>
            <label className="text-xs text-white/40 mb-1.5 block">شخص تماس *</label>
            <input
              type="text"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30"
              placeholder="نام و نام خانوادگی"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">تلفن</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30"
                placeholder="021-12345678"
              />
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">ایمیل</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30"
                placeholder="info@example.com"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-white/40 mb-1.5 block">آدرس</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30"
              placeholder="آدرس کامل"
            />
          </div>
          <div>
            <label className="text-xs text-white/40 mb-1.5 block">وضعیت</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#1a1a2e] border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30"
            >
              <option value="active">فعال</option>
              <option value="inactive">غیرفعال</option>
            </select>
          </div>
          <div className="flex gap-2 pt-4 border-t border-white/5">
            <button type="submit" className="flex-1 py-3 bg-gradient-to-l from-gold-500 to-gold-600 text-brand-950 rounded-xl font-bold text-sm">
              {supplier ? 'ذخیره تغییرات' : 'افزودن تأمین‌کننده'}
            </button>
            <button type="button" onClick={onClose} className="px-6 py-3 glass rounded-xl text-sm text-white/60">
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
