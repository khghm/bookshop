import { useState } from 'react';
import { DollarSign, Plus, Trash2, Search, AlertTriangle, Check, Download, TrendingUp, TrendingDown, Filter, X, Calendar, FileText, BarChart3, PieChart } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { exportToPDF, exportToExcel } from '../../utils/exportUtils';

export default function AdminAccounting() {
  const { transactions, addTransaction, deleteTransaction } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const filteredTransactions = transactions.filter(t => {
    if (searchQuery && !t.description.includes(searchQuery) && !(t.referenceNumber || '').includes(searchQuery)) return false;
    if (typeFilter && t.type !== typeFilter) return false;
    return true;
  });

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const netProfit = totalIncome - totalExpense;

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = (id: number) => {
    deleteTransaction(id);
    setDeleteConfirm(null);
    showToast('تراکنش حذف شد');
  };

  const handleSave = (transactionData: any) => {
    addTransaction(transactionData);
    showToast('تراکنش جدید ثبت شد');
    setShowForm(false);
  };

  const handleExportPDF = () => {
    const data = filteredTransactions.map(t => [
      t.date,
      t.type === 'income' ? 'درآمد' : 'هزینه',
      t.category,
      t.description,
      t.amount.toLocaleString('fa-IR'),
      t.referenceNumber || '-',
    ]);
    exportToPDF('گزارش حسابداری', ['تاریخ', 'نوع', 'دسته‌بندی', 'توضیحات', 'مبلغ (تومان)', 'شماره مرجع'], data, 'accounting-report');
  };

  const handleExportExcel = () => {
    const data = filteredTransactions.map(t => ({
      'تاریخ': t.date,
      'نوع': t.type === 'income' ? 'درآمد' : 'هزینه',
      'دسته‌بندی': t.category,
      'توضیحات': t.description,
      'مبلغ (تومان)': t.amount,
      'شماره مرجع': t.referenceNumber || '-',
    }));
    exportToExcel(data, 'accounting-report', 'حسابداری');
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
          <h1 className="text-2xl font-black text-white">حسابداری و مالی</h1>
          <p className="text-sm text-white/40 mt-1">مدیریت تراکنش‌ها و گزارشات مالی</p>
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
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-l from-gold-500 to-gold-600 text-brand-950 rounded-xl text-sm font-bold shadow-lg shadow-gold-500/20"
          >
            <Plus className="w-4 h-4" />
            ثبت تراکنش
          </button>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-xs text-emerald-400">کل درآمد</span>
          </div>
          <p className="text-2xl font-black text-emerald-400">{totalIncome.toLocaleString('fa-IR')}</p>
          <p className="text-xs text-white/30 mt-1">تومان</p>
        </div>
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-red-400" />
            </div>
            <span className="text-xs text-red-400">کل هزینه</span>
          </div>
          <p className="text-2xl font-black text-red-400">{totalExpense.toLocaleString('fa-IR')}</p>
          <p className="text-xs text-white/30 mt-1">تومان</p>
        </div>
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 ${netProfit >= 0 ? 'bg-gold-500/10' : 'bg-red-500/10'} rounded-xl flex items-center justify-center`}>
              <DollarSign className={`w-5 h-5 ${netProfit >= 0 ? 'text-gold-400' : 'text-red-400'}`} />
            </div>
            <span className={`text-xs ${netProfit >= 0 ? 'text-gold-400' : 'text-red-400'}`}>سود خالص</span>
          </div>
          <p className={`text-2xl font-black ${netProfit >= 0 ? 'text-gold-400' : 'text-red-400'}`}>{netProfit.toLocaleString('fa-IR')}</p>
          <p className="text-xs text-white/30 mt-1">تومان</p>
        </div>
      </div>

      {/* Filters */}
      <div className="glass rounded-2xl p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input
              type="text"
              placeholder="جستجوی توضیحات یا شماره مرجع..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2.5 pr-10 pl-4 bg-white/5 border border-white/5 rounded-xl text-sm text-white placeholder-white/20 outline-none focus:border-gold-500/30"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setTypeFilter('')}
              className={`px-4 py-2.5 rounded-xl text-xs transition-all ${typeFilter === '' ? 'bg-gold-500/20 text-gold-400 border border-gold-500/30' : 'glass text-white/40 hover:text-white'}`}
            >
              همه
            </button>
            <button
              onClick={() => setTypeFilter('income')}
              className={`px-4 py-2.5 rounded-xl text-xs transition-all ${typeFilter === 'income' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'glass text-white/40 hover:text-white'}`}
            >
              درآمد
            </button>
            <button
              onClick={() => setTypeFilter('expense')}
              className={`px-4 py-2.5 rounded-xl text-xs transition-all ${typeFilter === 'expense' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'glass text-white/40 hover:text-white'}`}
            >
              هزینه
            </button>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-right text-xs font-medium text-white/30 px-4 py-3">تاریخ</th>
                <th className="text-right text-xs font-medium text-white/30 px-4 py-3">نوع</th>
                <th className="text-right text-xs font-medium text-white/30 px-4 py-3">دسته‌بندی</th>
                <th className="text-right text-xs font-medium text-white/30 px-4 py-3">توضیحات</th>
                <th className="text-right text-xs font-medium text-white/30 px-4 py-3">مبلغ</th>
                <th className="text-right text-xs font-medium text-white/30 px-4 py-3">شماره مرجع</th>
                <th className="text-right text-xs font-medium text-white/30 px-4 py-3">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-white/3 hover:bg-white/3 transition-colors">
                  <td className="px-4 py-3 text-sm text-white/50">{transaction.date}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-lg ${
                      transaction.type === 'income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                    }`}>
                      {transaction.type === 'income' ? 'درآمد' : 'هزینه'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-white/60">{transaction.category}</td>
                  <td className="px-4 py-3 text-sm text-white/50">{transaction.description}</td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-bold ${transaction.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {transaction.type === 'income' ? '+' : '-'}{transaction.amount.toLocaleString('fa-IR')}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-white/40 font-mono text-xs">{transaction.referenceNumber || '-'}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setDeleteConfirm(transaction.id)}
                      className="w-7 h-7 rounded-lg hover:bg-white/5 flex items-center justify-center text-white/30 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Transaction Form */}
      {showForm && (
        <TransactionForm
          onClose={() => setShowForm(false)}
          onSave={handleSave}
        />
      )}

      {/* Delete Confirmation */}
      {deleteConfirm !== null && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-[#0f0f1a] border border-white/5 rounded-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-white">حذف تراکنش</h3>
            </div>
            <p className="text-sm text-white/50 mb-6">آیا از حذف این تراکنش اطمینان دارید؟</p>
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

function TransactionForm({ onClose, onSave }: { onClose: () => void; onSave: (data: any) => void }) {
  const [formData, setFormData] = useState({
    type: 'income',
    category: 'فروش',
    amount: 0,
    description: '',
    referenceNumber: '',
    date: new Date().toLocaleDateString('fa-IR'),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || !formData.description) {
      alert('لطفاً فیلدهای ضروری را پر کنید');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#0f0f1a] border border-white/5 rounded-2xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <div className="p-5 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">ثبت تراکنش جدید</h3>
          <button onClick={onClose} className="w-8 h-8 glass rounded-lg flex items-center justify-center text-white/40 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="text-xs text-white/40 mb-1.5 block">نوع تراکنش *</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#1a1a2e] border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30"
            >
              <option value="income">درآمد</option>
              <option value="expense">هزینه</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-white/40 mb-1.5 block">دسته‌بندی *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#1a1a2e] border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30"
            >
              {formData.type === 'income' ? (
                <>
                  <option value="فروش">فروش کتاب</option>
                  <option value="خدمات">خدمات</option>
                  <option value="سایر">سایر درآمدها</option>
                </>
              ) : (
                <>
                  <option value="خرید کتاب">خرید کتاب</option>
                  <option value="حقوق">حقوق پرسنل</option>
                  <option value="اجاره">اجاره</option>
                  <option value="قبوض">قبوض</option>
                  <option value="تبلیغات">تبلیغات</option>
                  <option value="سایر">سایر هزینه‌ها</option>
                </>
              )}
            </select>
          </div>
          <div>
            <label className="text-xs text-white/40 mb-1.5 block">مبلغ (تومان) *</label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30"
              placeholder="۰"
              required
            />
          </div>
          <div>
            <label className="text-xs text-white/40 mb-1.5 block">توضیحات *</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30 resize-none"
              placeholder="توضیحات تراکنش..."
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">تاریخ</label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30"
                placeholder="1403/03/15"
              />
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">شماره مرجع</label>
              <input
                type="text"
                value={formData.referenceNumber}
                onChange={(e) => setFormData({ ...formData, referenceNumber: e.target.value })}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30"
                placeholder="REF-12345"
              />
            </div>
          </div>
          <div className="flex gap-2 pt-4 border-t border-white/5">
            <button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-l from-gold-500 to-gold-600 text-brand-950 rounded-xl font-bold text-sm"
            >
              ثبت تراکنش
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
