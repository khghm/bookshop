import { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, Filter, Download, Upload, BookOpen, Star } from 'lucide-react';
import { books, categories, Book } from '../../data/books';

export default function AdminBooks() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredBooks = books.filter(b => {
    if (searchQuery && !b.title.includes(searchQuery) && !b.author.includes(searchQuery)) return false;
    if (selectedCategory && b.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">مدیریت کتاب‌ها</h1>
          <p className="text-sm text-white/40 mt-1">{books.length} عنوان کتاب ثبت شده</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl text-sm text-white/60 hover:text-white">
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">ورود دسته‌ای</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl text-sm text-white/60 hover:text-white">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">خروجی</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-l from-gold-500 to-gold-600 text-brand-950 rounded-xl text-sm font-bold shadow-lg shadow-gold-500/20"
          >
            <Plus className="w-4 h-4" />
            افزودن کتاب
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="glass rounded-2xl p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input
              type="text"
              placeholder="جستجوی عنوان یا نویسنده..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2.5 pr-10 pl-4 bg-white/5 rounded-xl text-sm text-white placeholder-white/20 outline-none focus:border-gold-500/30 border border-white/5"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2.5 bg-white/5 rounded-xl text-sm text-white/60 outline-none border border-white/5"
          >
            <option value="">همه دسته‌بندی‌ها</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-right text-xs font-medium text-white/30 px-4 py-3">کتاب</th>
                <th className="text-right text-xs font-medium text-white/30 px-4 py-3">دسته‌بندی</th>
                <th className="text-right text-xs font-medium text-white/30 px-4 py-3">قیمت</th>
                <th className="text-right text-xs font-medium text-white/30 px-4 py-3">موجودی</th>
                <th className="text-right text-xs font-medium text-white/30 px-4 py-3">فروش</th>
                <th className="text-right text-xs font-medium text-white/30 px-4 py-3">امتیاز</th>
                <th className="text-right text-xs font-medium text-white/30 px-4 py-3">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book) => (
                <tr key={book.id} className="border-b border-white/3 hover:bg-white/3 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={book.cover} alt={book.title} className="w-10 h-12 object-cover rounded-lg" />
                      <div>
                        <p className="text-sm font-medium text-white">{book.title}</p>
                        <p className="text-[10px] text-white/30">{book.author}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-white/50 bg-white/5 px-2 py-1 rounded-lg">
                      {categories.find(c => c.id === book.category)?.name}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-gold-400">{book.price.toLocaleString('fa-IR')}</span>
                    <span className="text-[10px] text-white/20 mr-0.5">ت</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-lg ${book.stock > 50 ? 'bg-emerald-500/10 text-emerald-400' : book.stock > 10 ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'}`}>
                      {book.stock} عدد
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-white/60">{book.salesCount.toLocaleString('fa-IR')}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-gold-400 text-gold-400" />
                      <span className="text-sm text-white/60">{book.rating}</span>
                    </div>
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
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowAddModal(false)}>
          <div className="bg-[#0f0f1a] border border-white/5 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-white">افزودن کتاب جدید</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-white/40 mb-1 block">عنوان کتاب</label>
                <input type="text" className="w-full px-3 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30" placeholder="عنوان کتاب" />
              </div>
              <div>
                <label className="text-xs text-white/40 mb-1 block">نویسنده</label>
                <input type="text" className="w-full px-3 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30" placeholder="نام نویسنده" />
              </div>
              <div>
                <label className="text-xs text-white/40 mb-1 block">قیمت (تومان)</label>
                <input type="number" className="w-full px-3 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30" placeholder="۰" />
              </div>
              <div>
                <label className="text-xs text-white/40 mb-1 block">دسته‌بندی</label>
                <select className="w-full px-3 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white/60 outline-none">
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-white/40 mb-1 block">ناشر</label>
                <input type="text" className="w-full px-3 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30" placeholder="نام ناشر" />
              </div>
              <div>
                <label className="text-xs text-white/40 mb-1 block">تعداد صفحات</label>
                <input type="number" className="w-full px-3 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30" placeholder="۰" />
              </div>
              <div>
                <label className="text-xs text-white/40 mb-1 block">نوع</label>
                <select className="w-full px-3 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white/60 outline-none">
                  <option value="paper">کاغذی</option>
                  <option value="digital">دیجیتال</option>
                  <option value="both">هر دو</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-white/40 mb-1 block">موجودی</label>
                <input type="number" className="w-full px-3 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30" placeholder="۰" />
              </div>
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1 block">توضیحات</label>
              <textarea rows={3} className="w-full px-3 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30 resize-none" placeholder="توضیحات کتاب..." />
            </div>
            <div className="flex gap-2 pt-4">
              <button className="flex-1 py-3 bg-gradient-to-l from-gold-500 to-gold-600 text-brand-950 rounded-xl font-bold text-sm">ذخیره کتاب</button>
              <button onClick={() => setShowAddModal(false)} className="px-6 py-3 glass rounded-xl text-sm text-white/60">انصراف</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
