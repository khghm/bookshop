import { useState, useRef } from 'react';
import { Package, Plus, Edit, Trash2, Search, AlertTriangle, Check, Download, Upload, MapPin, Box, X, Image as ImageIcon } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { exportToPDF, exportToExcel } from '../../utils/exportUtils';

export default function AdminWarehouse() {
  const { warehouse, books, addWarehouseItem, updateWarehouseItem, deleteWarehouseItem } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const filteredItems = warehouse.filter(item => {
    const book = books.find(b => b.id === item.bookId);
    if (!book) return false;
    if (searchQuery && !book.title.includes(searchQuery) && !item.location.includes(searchQuery)) return false;
    return true;
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = (id: number) => {
    deleteWarehouseItem(id);
    setDeleteConfirm(null);
    showToast('آیتم از انبار حذف شد');
  };

  const handleSave = (itemData: any) => {
    if (editingItem) {
      updateWarehouseItem(editingItem.id, itemData);
      showToast('اطلاعات انبار بروزرسانی شد');
    } else {
      addWarehouseItem(itemData);
      showToast('آیتم جدید به انبار اضافه شد');
    }
    setShowForm(false);
    setEditingItem(null);
  };

  const handleExportPDF = () => {
    const data = filteredItems.map(item => {
      const book = books.find(b => b.id === item.bookId);
      return [
        book?.title || '-',
        item.location,
        item.shelf,
        item.quantity.toString(),
        item.lastUpdated,
        item.notes || '-',
      ];
    });
    exportToPDF('گزارش انبار فیزیکی', ['کتاب', 'محل نگهداری', 'قفسه', 'تعداد', 'آخرین بروزرسانی', 'یادداشت'], data, 'warehouse-report');
  };

  const handleExportExcel = () => {
    const data = filteredItems.map(item => {
      const book = books.find(b => b.id === item.bookId);
      return {
        'کتاب': book?.title || '-',
        'محل نگهداری': item.location,
        'قفسه': item.shelf,
        'تعداد': item.quantity,
        'آخرین بروزرسانی': item.lastUpdated,
        'یادداشت': item.notes || '-',
      };
    });
    exportToExcel(data, 'warehouse-report', 'انبار');
  };

  const totalItems = warehouse.reduce((sum, item) => sum + item.quantity, 0);
  const lowStockItems = warehouse.filter(item => item.quantity < 20);

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
          <h1 className="text-2xl font-black text-white">مدیریت انبار فیزیکی</h1>
          <p className="text-sm text-white/40 mt-1">مدیریت موجودی و محل نگهداری کتاب‌ها</p>
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
            onClick={() => { setEditingItem(null); setShowForm(true); }}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-l from-gold-500 to-gold-600 text-brand-950 rounded-xl text-sm font-bold shadow-lg shadow-gold-500/20"
          >
            <Plus className="w-4 h-4" />
            افزودن به انبار
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-black text-white">{warehouse.length}</p>
              <p className="text-xs text-white/30">آیتم در انبار</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center">
              <Box className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-black text-white">{totalItems.toLocaleString('fa-IR')}</p>
              <p className="text-xs text-white/30">مجموع موجودی</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-black text-yellow-400">{lowStockItems.length}</p>
              <p className="text-xs text-white/30">موجودی کم</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-black text-white">{new Set(warehouse.map(w => w.location)).size}</p>
              <p className="text-xs text-white/30">محل نگهداری</p>
            </div>
          </div>
        </div>
      </div>

      {/* Low stock alert */}
      {lowStockItems.length > 0 && (
        <div className="glass rounded-xl p-4 border-r-4 border-yellow-500">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            <h3 className="text-sm font-bold text-yellow-400">هشدار موجودی کم</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {lowStockItems.map(item => {
              const book = books.find(b => b.id === item.bookId);
              return (
                <span key={item.id} className="text-xs px-2 py-1 bg-yellow-500/10 text-yellow-400 rounded-lg">
                  {book?.title} ({item.quantity} عدد)
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
        <input
          type="text"
          placeholder="جستجوی کتاب یا محل نگهداری..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-2.5 pr-10 pl-4 glass rounded-xl text-sm text-white placeholder-white/20 outline-none focus:border-gold-500/30"
        />
      </div>

      {/* Warehouse items */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-right text-xs font-medium text-white/30 px-4 py-3">کتاب</th>
                <th className="text-right text-xs font-medium text-white/30 px-4 py-3">محل نگهداری</th>
                <th className="text-right text-xs font-medium text-white/30 px-4 py-3">قفسه</th>
                <th className="text-right text-xs font-medium text-white/30 px-4 py-3">تعداد</th>
                <th className="text-right text-xs font-medium text-white/30 px-4 py-3">آخرین بروزرسانی</th>
                <th className="text-right text-xs font-medium text-white/30 px-4 py-3">یادداشت</th>
                <th className="text-right text-xs font-medium text-white/30 px-4 py-3">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => {
                const book = books.find(b => b.id === item.bookId);
                return (
                  <tr key={item.id} className="border-b border-white/3 hover:bg-white/3 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={book?.cover} alt={book?.title} className="w-10 h-12 object-cover rounded-lg" />
                        <span className="text-sm font-medium text-white">{book?.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-white/50">{item.location}</td>
                    <td className="px-4 py-3 text-sm text-white/50">{item.shelf}</td>
                    <td className="px-4 py-3">
                      <span className={`text-sm font-bold ${item.quantity < 20 ? 'text-yellow-400' : item.quantity < 50 ? 'text-blue-400' : 'text-emerald-400'}`}>
                        {item.quantity} عدد
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-white/50">{item.lastUpdated}</td>
                    <td className="px-4 py-3 text-sm text-white/50">{item.notes || '-'}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => { setEditingItem(item); setShowForm(true); }}
                          className="w-7 h-7 rounded-lg hover:bg-white/5 flex items-center justify-center text-white/30 hover:text-gold-400 transition-colors"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(item.id)}
                          className="w-7 h-7 rounded-lg hover:bg-white/5 flex items-center justify-center text-white/30 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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

      {/* Add/Edit form */}
      {showForm && (
        <WarehouseForm
          item={editingItem}
          books={books}
          onClose={() => { setShowForm(false); setEditingItem(null); }}
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
              <h3 className="text-lg font-bold text-white">حذف از انبار</h3>
            </div>
            <p className="text-sm text-white/50 mb-6">آیا از حذف این آیتم از انبار اطمینان دارید؟</p>
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

function WarehouseForm({ item, books, onClose, onSave }: { item: any; books: any[]; onClose: () => void; onSave: (data: any) => void }) {
  const [formData, setFormData] = useState(item || {
    bookId: books[0]?.id || 0,
    location: 'انبار اصلی',
    shelf: '',
    quantity: 0,
    lastUpdated: new Date().toLocaleDateString('fa-IR'),
    notes: '',
    imageUrl: '',
  });
  const [uploadedImage, setUploadedImage] = useState<string | null>(item?.imageUrl || null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setUploadedImage(base64);
        setFormData({ ...formData, imageUrl: base64 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#0f0f1a] border border-white/5 rounded-2xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <div className="p-5 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">{item ? 'ویرایش آیتم انبار' : 'افزودن به انبار'}</h3>
          <button onClick={onClose} className="w-8 h-8 glass rounded-lg flex items-center justify-center text-white/40 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="text-xs text-white/40 mb-1.5 block">کتاب</label>
            <select
              value={formData.bookId}
              onChange={(e) => setFormData({ ...formData, bookId: Number(e.target.value) })}
              className="w-full px-4 py-2.5 bg-[#1a1a2e] border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30"
            >
              {books.map(book => (
                <option key={book.id} value={book.id}>{book.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-white/40 mb-1.5 block">تصویر محصول</label>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div
              onClick={() => imageInputRef.current?.click()}
              className="w-full p-4 bg-white/5 border-2 border-dashed border-white/10 rounded-xl text-center cursor-pointer hover:border-gold-500/30 transition-colors"
            >
              {uploadedImage ? (
                <div className="space-y-2">
                  <img src={uploadedImage} alt="preview" className="w-20 h-20 object-cover rounded-lg mx-auto" />
                  <p className="text-xs text-gold-400">کلیک کنید برای تغییر تصویر</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <ImageIcon className="w-8 h-8 text-white/30 mx-auto" />
                  <p className="text-sm text-white/50">کلیک کنید برای آپلود تصویر</p>
                  <p className="text-xs text-white/30">فرمت‌های مجاز: JPG, PNG, WebP</p>
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">محل نگهداری</label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#1a1a2e] border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30"
              >
                <option value="انبار اصلی">انبار اصلی</option>
                <option value="انبار مرکزی">انبار مرکزی</option>
                <option value="انبار شعبه">انبار شعبه</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">شماره قفسه</label>
              <input
                type="text"
                value={formData.shelf}
                onChange={(e) => setFormData({ ...formData, shelf: e.target.value })}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30"
                placeholder="A-01"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-white/40 mb-1.5 block">تعداد</label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30"
            />
          </div>
          <div>
            <label className="text-xs text-white/40 mb-1.5 block">یادداشت</label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30 resize-none"
              placeholder="توضیحات اضافی..."
            />
          </div>
          <div className="flex gap-2 pt-4 border-t border-white/5">
            <button type="submit" className="flex-1 py-3 bg-gradient-to-l from-gold-500 to-gold-600 text-brand-950 rounded-xl font-bold text-sm">
              {item ? 'ذخیره تغییرات' : 'افزودن به انبار'}
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
