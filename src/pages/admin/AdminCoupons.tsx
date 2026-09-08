import { useState } from 'react';
import { Tag, Plus, Edit, Trash2, Copy, Check, Percent, Calendar, Save, X, AlertTriangle, Download } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { exportToPDF, exportToExcel } from '../../utils/exportUtils';

export default function AdminCoupons() {
  const { coupons, addCoupon, updateCoupon, deleteCoupon } = useAdmin();
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<any>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const copyCode = (code: string, id: number) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleExportPDF = () => {
    const data = coupons.map(c => [
      c.code,
      c.type === 'percent' ? `${c.discount}٪` : `${c.discount.toLocaleString('fa-IR')} تومان`,
      c.usageLimit.toString(),
      c.usedCount.toString(),
      c.expiryDate,
      c.status === 'active' ? 'فعال' : c.status === 'expired' ? 'منقضی' : 'غیرفعال',
    ]);
    exportToPDF('گزارش کدهای تخفیف', ['کد', 'مقدار تخفیف', 'محدودیت', 'استفاده شده', 'تاریخ انقضا', 'وضعیت'], data, 'coupons-report');
  };

  const handleExportExcel = () => {
    const data = coupons.map(c => ({
      'کد تخفیف': c.code,
      'نوع': c.type === 'percent' ? 'درصدی' : 'مبلغ ثابت',
      'مقدار تخفیف': c.type === 'percent' ? `${c.discount}٪` : c.discount,
      'محدودیت استفاده': c.usageLimit,
      'تعداد استفاده': c.usedCount,
      'تاریخ انقضا': c.expiryDate,
      'وضعیت': c.status === 'active' ? 'فعال' : c.status === 'expired' ? 'منقضی' : 'غیرفعال',
    }));
    exportToExcel(data, 'coupons-report', 'کدهای تخفیف');
  };

  const handleDelete = (id: number) => {
    deleteCoupon(id);
    setDeleteConfirm(null);
    showToast('کد تخفیف حذف شد');
  };

  const handleSave = (couponData: any) => {
    if (editingCoupon) {
      updateCoupon(editingCoupon.id, couponData);
      showToast('کد تخفیف ویرایش شد');
    } else {
      addCoupon(couponData);
      showToast('کد تخفیف جدید ایجاد شد');
    }
    setShowForm(false);
    setEditingCoupon(null);
  };

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
          <h1 className="text-2xl font-black text-white">کدهای تخفیف</h1>
          <p className="text-sm text-white/40 mt-1">مدیریت کدهای تخفیف فروشگاه</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleExportPDF} className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl text-sm text-white/60 hover:text-white transition-colors">
            <Download className="w-4 h-4" />
            PDF
          </button>
          <button onClick={handleExportExcel} className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl text-sm text-white/60 hover:text-white transition-colors">
            <Download className="w-4 h-4" />
            Excel
          </button>
          <button
            onClick={() => { setEditingCoupon(null); setShowForm(true); }}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-l from-gold-500 to-gold-600 text-brand-950 rounded-xl text-sm font-bold shadow-lg shadow-gold-500/20"
          >
            <Plus className="w-4 h-4" />
            ایجاد کد تخفیف
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-black text-emerald-400">{coupons.filter(c => c.status === 'active').length}</p>
          <p className="text-xs text-white/30 mt-1">کد فعال</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-black text-yellow-400">{coupons.reduce((s, c) => s + c.usedCount, 0)}</p>
          <p className="text-xs text-white/30 mt-1">کل استفاده‌ها</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-black text-brand-400">{coupons.filter(c => c.status === 'expired').length}</p>
          <p className="text-xs text-white/30 mt-1">منقضی شده</p>
        </div>
      </div>

      {/* Coupons list */}
      <div className="space-y-3">
        {coupons.map((coupon) => (
          <div key={coupon.id} className="glass rounded-2xl p-5 hover:border-white/10 transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${coupon.status === 'active' ? 'bg-emerald-500/10' : coupon.status === 'expired' ? 'bg-yellow-500/10' : 'bg-red-500/10'}`}>
                  <Percent className={`w-6 h-6 ${coupon.status === 'active' ? 'text-emerald-400' : coupon.status === 'expired' ? 'text-yellow-400' : 'text-red-400'}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <code className="text-lg font-black text-white tracking-wider">{coupon.code}</code>
                    <button
                      onClick={() => copyCode(coupon.code, coupon.id)}
                      className="w-6 h-6 rounded-md hover:bg-white/5 flex items-center justify-center text-white/30 hover:text-white transition-colors"
                    >
                      {copiedId === coupon.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gold-400 font-medium">
                      {coupon.type === 'percent' ? `${coupon.discount}٪ تخفیف` : `${coupon.discount.toLocaleString('fa-IR')} تومان تخفیف`}
                    </span>
                    <span className="text-[10px] text-white/30 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {coupon.expiryDate}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-sm font-bold text-white">{coupon.usedCount}/{coupon.usageLimit}</p>
                  <p className="text-[10px] text-white/30">استفاده شده</p>
                </div>
                <div className="w-20 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-l from-gold-500 to-gold-600 rounded-full" style={{ width: `${(coupon.usedCount / coupon.usageLimit) * 100}%` }} />
                </div>
                <span className={`text-xs px-2 py-1 rounded-lg ${
                  coupon.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' :
                  coupon.status === 'expired' ? 'bg-yellow-500/10 text-yellow-400' :
                  'bg-red-500/10 text-red-400'
                }`}>
                  {coupon.status === 'active' ? 'فعال' : coupon.status === 'expired' ? 'منقضی' : 'غیرفعال'}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => { setEditingCoupon(coupon); setShowForm(true); }}
                    className="w-7 h-7 rounded-lg hover:bg-white/5 flex items-center justify-center text-white/30 hover:text-gold-400 transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(coupon.id)}
                    className="w-7 h-7 rounded-lg hover:bg-white/5 flex items-center justify-center text-white/30 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit form */}
      {showForm && (
        <CouponForm
          coupon={editingCoupon}
          onClose={() => { setShowForm(false); setEditingCoupon(null); }}
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
              <h3 className="text-lg font-bold text-white">حذف کد تخفیف</h3>
            </div>
            <p className="text-sm text-white/50 mb-6">آیا از حذف این کد تخفیف اطمینان دارید؟</p>
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

function CouponForm({ coupon, onClose, onSave }: { coupon: any; onClose: () => void; onSave: (data: any) => void }) {
  const [formData, setFormData] = useState(coupon || {
    code: '',
    discount: 0,
    type: 'percent',
    usageLimit: 100,
    expiryDate: '',
    status: 'active',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code || !formData.discount) {
      alert('لطفاً فیلدهای ضروری را پر کنید');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#0f0f1a] border border-white/5 rounded-2xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <div className="p-5 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">{coupon ? 'ویرایش کد تخفیف' : 'ایجاد کد تخفیف جدید'}</h3>
          <button onClick={onClose} className="w-8 h-8 glass rounded-lg flex items-center justify-center text-white/40 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="text-xs text-white/40 mb-1.5 block">کد تخفیف *</label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30"
              placeholder="مثال: SUMMER30"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">نوع تخفیف</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white/60 outline-none"
              >
                <option value="percent">درصدی</option>
                <option value="fixed">مبلغ ثابت</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">مقدار تخفیف *</label>
              <input
                type="number"
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: Number(e.target.value) })}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">محدودیت استفاده</label>
              <input
                type="number"
                value={formData.usageLimit}
                onChange={(e) => setFormData({ ...formData, usageLimit: Number(e.target.value) })}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30"
              />
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">تاریخ انقضا</label>
              <input
                type="text"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30"
                placeholder="1403/12/29"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-white/40 mb-1.5 block">وضعیت</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white/60 outline-none"
            >
              <option value="active">فعال</option>
              <option value="expired">منقضی</option>
              <option value="disabled">غیرفعال</option>
            </select>
          </div>
          <div className="flex gap-2 pt-4 border-t border-white/5">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-l from-gold-500 to-gold-600 text-brand-950 rounded-xl font-bold text-sm"
            >
              <Save className="w-4 h-4" />
              {coupon ? 'ذخیره تغییرات' : 'ایجاد کد تخفیف'}
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
