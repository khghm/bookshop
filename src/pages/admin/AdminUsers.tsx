import { useState } from 'react';
import { Search, Eye, Edit, Ban, CheckCircle, AlertTriangle, X, ChevronDown, Download } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { User } from '../../data/books';
import { exportToPDF, exportToExcel } from '../../utils/exportUtils';

export default function AdminUsers() {
  const { users, updateUserStatus, deleteUser } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const filteredUsers = users.filter(u => {
    if (searchQuery && !u.name.includes(searchQuery) && !u.email.includes(searchQuery)) return false;
    if (statusFilter && u.status !== statusFilter) return false;
    return true;
  });

  const statusConfig = {
    active: { label: 'فعال', color: 'text-emerald-400 bg-emerald-500/10' },
    inactive: { label: 'غیرفعال', color: 'text-yellow-400 bg-yellow-500/10' },
    banned: { label: 'مسدود', color: 'text-red-400 bg-red-500/10' },
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleExportPDF = () => {
    const data = filteredUsers.map(u => [
      u.name,
      u.email,
      u.phone,
      u.joinDate,
      u.totalOrders.toString(),
      u.totalSpent.toLocaleString('fa-IR'),
      u.status === 'active' ? 'فعال' : u.status === 'inactive' ? 'غیرفعال' : 'مسدود',
    ]);
    exportToPDF('گزارش کاربران', ['نام', 'ایمیل', 'تلفن', 'تاریخ عضویت', 'سفارشات', 'مجموع خرید', 'وضعیت'], data, 'users-report');
  };

  const handleExportExcel = () => {
    const data = filteredUsers.map(u => ({
      'نام': u.name,
      'ایمیل': u.email,
      'تلفن': u.phone,
      'تاریخ عضویت': u.joinDate,
      'تعداد سفارشات': u.totalOrders,
      'مجموع خرید (تومان)': u.totalSpent,
      'وضعیت': u.status === 'active' ? 'فعال' : u.status === 'inactive' ? 'غیرفعال' : 'مسدود',
    }));
    exportToExcel(data, 'users-report', 'کاربران');
  };

  const handleStatusChange = (userId: number, newStatus: User['status']) => {
    updateUserStatus(userId, newStatus);
    showToast('وضعیت کاربر بروزرسانی شد');
    if (selectedUser?.id === userId) {
      setSelectedUser({ ...selectedUser, status: newStatus });
    }
  };

  const handleDelete = (id: number) => {
    deleteUser(id);
    setDeleteConfirm(null);
    showToast('کاربر حذف شد');
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
          <h1 className="text-2xl font-black text-white">مدیریت کاربران</h1>
          <p className="text-sm text-white/40 mt-1">{users.length} کاربر ثبت‌نام شده</p>
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
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-black text-emerald-400">{users.filter(u => u.status === 'active').length}</p>
          <p className="text-xs text-white/30 mt-1">کاربران فعال</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-black text-yellow-400">{users.filter(u => u.status === 'inactive').length}</p>
          <p className="text-xs text-white/30 mt-1">غیرفعال</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-black text-red-400">{users.filter(u => u.status === 'banned').length}</p>
          <p className="text-xs text-white/30 mt-1">مسدود</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <input
            type="text"
            placeholder="جستجوی نام یا ایمیل..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2.5 pr-10 pl-4 glass rounded-xl text-sm text-white placeholder-white/20 outline-none focus:border-gold-500/30"
          />
        </div>
        <div className="flex gap-2">
          {['', 'active', 'inactive', 'banned'].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-xl text-xs transition-all ${statusFilter === s ? 'bg-gold-500/20 text-gold-400 border border-gold-500/30' : 'glass text-white/40 hover:text-white'}`}
            >
              {s === '' ? 'همه' : statusConfig[s as keyof typeof statusConfig].label}
            </button>
          ))}
        </div>
      </div>

      {/* Users table */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-right text-xs font-medium text-white/30 px-4 py-3">کاربر</th>
                <th className="text-right text-xs font-medium text-white/30 px-4 py-3">ایمیل</th>
                <th className="text-right text-xs font-medium text-white/30 px-4 py-3">تلفن</th>
                <th className="text-right text-xs font-medium text-white/30 px-4 py-3">تاریخ عضویت</th>
                <th className="text-right text-xs font-medium text-white/30 px-4 py-3">سفارشات</th>
                <th className="text-right text-xs font-medium text-white/30 px-4 py-3">مجموع خرید</th>
                <th className="text-right text-xs font-medium text-white/30 px-4 py-3">وضعیت</th>
                <th className="text-right text-xs font-medium text-white/30 px-4 py-3">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => {
                const sc = statusConfig[user.status];
                return (
                  <tr key={user.id} className="border-b border-white/3 hover:bg-white/3 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                          {user.avatar}
                        </div>
                        <span className="text-sm font-medium text-white">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-white/50">{user.email}</td>
                    <td className="px-4 py-3 text-sm text-white/50">{user.phone}</td>
                    <td className="px-4 py-3 text-sm text-white/50">{user.joinDate}</td>
                    <td className="px-4 py-3 text-sm text-white/60">{user.totalOrders}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gold-400">{user.totalSpent.toLocaleString('fa-IR')} ت</td>
                    <td className="px-4 py-3">
                      <div className="relative">
                        <select
                          value={user.status}
                          onChange={(e) => handleStatusChange(user.id, e.target.value as User['status'])}
                          className={`appearance-none text-xs px-2 py-1 pr-2 pl-6 rounded-lg ${sc.color} outline-none cursor-pointer`}
                        >
                          <option value="active">فعال</option>
                          <option value="inactive">غیرفعال</option>
                          <option value="banned">مسدود</option>
                        </select>
                        <ChevronDown className="absolute left-1 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="w-7 h-7 rounded-lg hover:bg-white/5 flex items-center justify-center text-white/30 hover:text-blue-400 transition-colors"
                          title="مشاهده"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(user.id)}
                          className="w-7 h-7 rounded-lg hover:bg-white/5 flex items-center justify-center text-white/30 hover:text-red-400 transition-colors"
                          title="حذف"
                        >
                          <Ban className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* User details modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedUser(null)}>
          <div className="bg-[#0f0f1a] border border-white/5 rounded-2xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">پروفایل کاربر</h3>
              <button onClick={() => setSelectedUser(null)} className="w-8 h-8 glass rounded-lg flex items-center justify-center text-white/40 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                  {selectedUser.avatar}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">{selectedUser.name}</h4>
                  <p className="text-sm text-white/40">{selectedUser.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="glass rounded-xl p-3">
                  <p className="text-[10px] text-white/30">تلفن</p>
                  <p className="text-sm font-medium text-white">{selectedUser.phone}</p>
                </div>
                <div className="glass rounded-xl p-3">
                  <p className="text-[10px] text-white/30">تاریخ عضویت</p>
                  <p className="text-sm font-medium text-white">{selectedUser.joinDate}</p>
                </div>
                <div className="glass rounded-xl p-3">
                  <p className="text-[10px] text-white/30">تعداد سفارشات</p>
                  <p className="text-sm font-bold text-gold-400">{selectedUser.totalOrders}</p>
                </div>
                <div className="glass rounded-xl p-3">
                  <p className="text-[10px] text-white/30">مجموع خرید</p>
                  <p className="text-sm font-bold text-gold-400">{selectedUser.totalSpent.toLocaleString('fa-IR')} تومان</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-white/40 mb-2">وضعیت:</p>
                <select
                  value={selectedUser.status}
                  onChange={(e) => handleStatusChange(selectedUser.id, e.target.value as User['status'])}
                  className="w-full px-3 py-2 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none"
                >
                  <option value="active">فعال</option>
                  <option value="inactive">غیرفعال</option>
                  <option value="banned">مسدود</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteConfirm !== null && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-[#0f0f1a] border border-white/5 rounded-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-white">حذف کاربر</h3>
            </div>
            <p className="text-sm text-white/50 mb-6">آیا از حذف این کاربر اطمینان دارید؟</p>
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
