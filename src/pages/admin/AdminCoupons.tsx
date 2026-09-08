import { useState } from 'react';
import { Tag, Plus, Edit, Trash2, Copy, Check, Percent, Calendar } from 'lucide-react';

interface Coupon {
  id: number;
  code: string;
  discount: number;
  type: 'percent' | 'fixed';
  usageLimit: number;
  usedCount: number;
  expiryDate: string;
  status: 'active' | 'expired' | 'disabled';
}

const coupons: Coupon[] = [
  { id: 1, code: 'BOOK20', discount: 10, type: 'percent', usageLimit: 100, usedCount: 45, expiryDate: '۱۴۰۳/۰۶/۳۱', status: 'active' },
  { id: 2, code: 'WELCOME50', discount: 50000, type: 'fixed', usageLimit: 50, usedCount: 32, expiryDate: '۱۴۰۳/۰۴/۳۱', status: 'active' },
  { id: 3, code: 'SUMMER30', discount: 30, type: 'percent', usageLimit: 200, usedCount: 200, expiryDate: '۱۴۰۳/۰۵/۳۱', status: 'expired' },
  { id: 4, code: 'VIP25', discount: 25, type: 'percent', usageLimit: 30, usedCount: 8, expiryDate: '۱۴۰۳/۱۲/۲۹', status: 'active' },
  { id: 5, code: 'OFF100', discount: 100000, type: 'fixed', usageLimit: 500, usedCount: 120, expiryDate: '۱۴۰۳/۰۸/۳۰', status: 'disabled' },
];

export default function AdminCoupons() {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const copyCode = (code: string, id: number) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">کدهای تخفیف</h1>
          <p className="text-sm text-white/40 mt-1">مدیریت کدهای تخفیف فروشگاه</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-l from-gold-500 to-gold-600 text-brand-950 rounded-xl text-sm font-bold shadow-lg shadow-gold-500/20">
          <Plus className="w-4 h-4" />
          ایجاد کد تخفیف
        </button>
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
                  <button className="w-7 h-7 rounded-lg hover:bg-white/5 flex items-center justify-center text-white/30 hover:text-gold-400 transition-colors">
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button className="w-7 h-7 rounded-lg hover:bg-white/5 flex items-center justify-center text-white/30 hover:text-red-400 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
