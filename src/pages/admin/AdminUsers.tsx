import { useState } from 'react';
import { Search, Eye, Edit, Ban, CheckCircle, Mail, Phone, Calendar, DollarSign, ShoppingBag } from 'lucide-react';
import { users, User } from '../../data/books';

export default function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">مدیریت کاربران</h1>
          <p className="text-sm text-white/40 mt-1">{users.length} کاربر ثبت‌نام شده</p>
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
                      <span className={`text-xs px-2 py-1 rounded-lg ${sc.color}`}>{sc.label}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button className="w-7 h-7 rounded-lg hover:bg-white/5 flex items-center justify-center text-white/30 hover:text-blue-400 transition-colors">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button className="w-7 h-7 rounded-lg hover:bg-white/5 flex items-center justify-center text-white/30 hover:text-gold-400 transition-colors">
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button className="w-7 h-7 rounded-lg hover:bg-white/5 flex items-center justify-center text-white/30 hover:text-red-400 transition-colors">
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
    </div>
  );
}
