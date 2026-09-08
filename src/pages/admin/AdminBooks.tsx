import { useState, useRef } from 'react';
import { Search, Plus, Edit, Trash2, Eye, Download, Upload, X, Save, Image as ImageIcon, Star, AlertTriangle, Check, FileSpreadsheet } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { categories, Book } from '../../data/books';
import { exportToPDF, exportToExcel, importFromExcel } from '../../utils/exportUtils';

export default function AdminBooks() {
  const { books, addBook, updateBook, deleteBook } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importing, setImporting] = useState(false);

  const filteredBooks = books.filter(b => {
    if (searchQuery && !b.title.includes(searchQuery) && !b.author.includes(searchQuery)) return false;
    if (selectedCategory && b.category !== selectedCategory) return false;
    return true;
  });

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleExportPDF = () => {
    const data = filteredBooks.map(b => [
      b.title,
      b.author,
      categories.find(c => c.id === b.category)?.name || '-',
      b.price.toLocaleString('fa-IR'),
      b.stock.toString(),
      b.salesCount.toLocaleString('fa-IR'),
      b.rating.toString(),
    ]);
    exportToPDF('گزارش کتاب‌ها', ['عنوان', 'نویسنده', 'دسته‌بندی', 'قیمت', 'موجودی', 'فروش', 'امتیاز'], data, 'books-report');
  };

  const handleExportExcel = () => {
    const data = filteredBooks.map(b => ({
      'عنوان': b.title,
      'نویسنده': b.author,
      'دسته‌بندی': categories.find(c => c.id === b.category)?.name || '-',
      'قیمت (تومان)': b.price,
      'موجودی': b.stock,
      'تعداد فروش': b.salesCount,
      'امتیاز': b.rating,
    }));
    exportToExcel(data, 'books-report', 'کتاب‌ها');
  };

  const handleDelete = (id: number) => {
    deleteBook(id);
    setDeleteConfirm(null);
    showToast('کتاب با موفقیت حذف شد');
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    try {
      const data = await importFromExcel(file);
      let importedCount = 0;

      for (const row of data) {
        const bookData = {
          title: row['عنوان'] || row['title'] || '',
          author: row['نویسنده'] || row['author'] || '',
          price: Number(row['قیمت'] || row['price'] || 0),
          originalPrice: Number(row['قیمت اصلی'] || row['originalPrice'] || 0),
          cover: row['تصویر'] || row['cover'] || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
          category: row['دسته‌بندی'] || row['category'] || 'fiction',
          format: (row['نوع'] || row['format'] || 'paper') as 'paper' | 'digital' | 'both',
          rating: Number(row['امتیاز'] || row['rating'] || 4.5),
          reviewCount: Number(row['تعداد نظر'] || row['reviewCount'] || 0),
          description: row['توضیحات'] || row['description'] || '',
          pages: Number(row['صفحات'] || row['pages'] || 0),
          publisher: row['ناشر'] || row['publisher'] || '',
          publishYear: Number(row['سال انتشار'] || row['publishYear'] || 1403),
          isbn: row['شابک'] || row['isbn'] || '',
          language: row['زبان'] || row['language'] || 'فارسی',
          stock: Number(row['موجودی'] || row['stock'] || 100),
          bestseller: row['پرفروش'] === 'بله' || row['bestseller'] === true,
          newArrival: row['جدید'] === 'بله' || row['newArrival'] === true,
          discount: Number(row['تخفیف'] || row['discount'] || 0),
        };

        if (bookData.title && bookData.author) {
          addBook(bookData);
          importedCount++;
        }
      }

      showToast(`${importedCount} کتاب با موفقیت وارد شد`);
      setShowImportModal(false);
    } catch (error) {
      showToast('خطا در خواندن فایل', 'error');
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-[100] px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-fade-in-up ${
          toast.type === 'success' ? 'bg-emerald-500/90 text-white' : 'bg-red-500/90 text-white'
        }`}>
          <Check className="w-4 h-4" />
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowImportModal(false)}>
          <div className="bg-[#0f0f1a] border border-white/5 rounded-2xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center">
                  <FileSpreadsheet className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">ورود دسته‌ای کتاب‌ها</h3>
              </div>
              <button onClick={() => setShowImportModal(false)} className="w-8 h-8 glass rounded-lg flex items-center justify-center text-white/40 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="glass rounded-xl p-4">
                <p className="text-sm text-white/60 mb-3">فایل Excel یا CSV خود را آپلود کنید. فایل باید شامل ستون‌های زیر باشد:</p>
                <div className="grid grid-cols-2 gap-2 text-xs text-white/40">
                  <div>عنوان، نویسنده، قیمت</div>
                  <div>دسته‌بندی، ناشر، صفحات</div>
                  <div>سال انتشار، شابک، زبان</div>
                  <div>موجودی، توضیحات</div>
                </div>
              </div>
              <div>
                <label className="text-xs text-white/40 mb-2 block">انتخاب فایل</label>
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleImport}
                  disabled={importing}
                  className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-sm text-white/60 file:ml-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gold-500/20 file:text-gold-400 file:font-medium file:cursor-pointer disabled:opacity-50"
                />
              </div>
              {importing && (
                <div className="flex items-center gap-2 text-sm text-gold-400">
                  <div className="w-4 h-4 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
                  <span>در حال پردازش فایل...</span>
                </div>
              )}
              <div className="flex gap-2 pt-4 border-t border-white/5">
                <button
                  onClick={() => setShowImportModal(false)}
                  className="flex-1 py-3 glass rounded-xl text-sm text-white/60 hover:text-white"
                >
                  بستن
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">مدیریت کتاب‌ها</h1>
          <p className="text-sm text-white/40 mt-1">{books.length} عنوان کتاب ثبت شده</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowImportModal(true)} className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl text-sm text-white/60 hover:text-white transition-colors">
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">ورود دسته‌ای</span>
          </button>
          <button onClick={handleExportPDF} className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl text-sm text-white/60 hover:text-white transition-colors">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">PDF</span>
          </button>
          <button onClick={handleExportExcel} className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl text-sm text-white/60 hover:text-white transition-colors">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Excel</span>
          </button>
          <button
            onClick={() => { setEditingBook(null); setShowForm(true); }}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-l from-gold-500 to-gold-600 text-brand-950 rounded-xl text-sm font-bold shadow-lg shadow-gold-500/20 hover:scale-[1.02] transition-transform"
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
                      <button
                        onClick={() => { setEditingBook(book); setShowForm(true); }}
                        className="w-7 h-7 rounded-lg hover:bg-white/5 flex items-center justify-center text-white/30 hover:text-gold-400 transition-colors"
                        title="ویرایش"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(book.id)}
                        className="w-7 h-7 rounded-lg hover:bg-white/5 flex items-center justify-center text-white/30 hover:text-red-400 transition-colors"
                        title="حذف"
                      >
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

      {/* Delete confirmation */}
      {deleteConfirm !== null && (
        <ConfirmDialog
          title="حذف کتاب"
          message="آیا از حذف این کتاب اطمینان دارید؟ این عملیات قابل بازگشت نیست."
          onConfirm={() => handleDelete(deleteConfirm)}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}

      {/* Add/Edit form */}
      {showForm && (
        <BookForm
          book={editingBook}
          onClose={() => { setShowForm(false); setEditingBook(null); }}
          onSave={(bookData) => {
            if (editingBook) {
              updateBook(editingBook.id, bookData);
              showToast('کتاب با موفقیت ویرایش شد');
            } else {
              addBook(bookData as Omit<Book, 'id' | 'salesCount'>);
              showToast('کتاب جدید با موفقیت اضافه شد');
            }
            setShowForm(false);
            setEditingBook(null);
          }}
        />
      )}
    </div>
  );
}

// Book form component with image upload
function BookForm({ book, onClose, onSave }: { book: Book | null; onClose: () => void; onSave: (book: Partial<Book>) => void }) {
  const [formData, setFormData] = useState<Partial<Book>>(book || {
    title: '',
    author: '',
    price: 0,
    originalPrice: 0,
    cover: '',
    category: 'fiction',
    format: 'paper',
    rating: 4.5,
    reviewCount: 0,
    description: '',
    pages: 0,
    publisher: '',
    publishYear: 1403,
    isbn: '',
    language: 'فارسی',
    stock: 100,
    bestseller: false,
    newArrival: false,
  });
  const [imagePreview, setImagePreview] = useState<string>(book?.cover || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('لطفاً یک فایل تصویری انتخاب کنید');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('حجم تصویر نباید بیشتر از ۵ مگابایت باشد');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData(prev => ({ ...prev, cover: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.author || !formData.cover) {
      alert('لطفاً فیلدهای ضروری را پر کنید');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#0f0f1a] border border-white/5 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-[#0f0f1a] border-b border-white/5 p-5 flex items-center justify-between z-10">
          <h3 className="text-lg font-bold text-white">{book ? 'ویرایش کتاب' : 'افزودن کتاب جدید'}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-lg glass flex items-center justify-center text-white/40 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Image upload */}
          <div>
            <label className="text-xs text-white/40 mb-2 block">تصویر جلد کتاب</label>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-40 h-52 bg-white/5 rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden relative group">
                {imagePreview ? (
                  <>
                    <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 bg-white/20 rounded-lg text-xs text-white hover:bg-white/30"
                      >
                        تغییر تصویر
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors"
                  >
                    <ImageIcon className="w-8 h-8" />
                    <span className="text-xs">آپلود تصویر</span>
                  </button>
                )}
              </div>
              <div className="flex-1 space-y-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white/60 hover:bg-white/10 hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  انتخاب از کامپیوتر
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <input
                  type="text"
                  placeholder="یا آدرس URL تصویر را وارد کنید"
                  value={imagePreview.startsWith('data:') ? '' : imagePreview}
                  onChange={(e) => {
                    setImagePreview(e.target.value);
                    setFormData(prev => ({ ...prev, cover: e.target.value }));
                  }}
                  className="w-full px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30"
                />
                <p className="text-[10px] text-white/30">فرمت‌های مجاز: JPG, PNG, WebP - حداکثر ۵ مگابایت</p>
              </div>
            </div>
          </div>

          {/* Basic info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">عنوان کتاب *</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30"
                placeholder="عنوان کتاب"
                required
              />
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">نویسنده *</label>
              <input
                type="text"
                value={formData.author || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30"
                placeholder="نام نویسنده"
                required
              />
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">قیمت (تومان) *</label>
              <input
                type="number"
                value={formData.price || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30"
                placeholder="۰"
                required
              />
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">قیمت اصلی (تومان)</label>
              <input
                type="number"
                value={formData.originalPrice || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: Number(e.target.value) }))}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30"
                placeholder="۰"
              />
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">دسته‌بندی</label>
              <select
                value={formData.category || 'fiction'}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white/60 outline-none"
              >
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">نوع کتاب</label>
              <select
                value={formData.format || 'paper'}
                onChange={(e) => setFormData(prev => ({ ...prev, format: e.target.value as Book['format'] }))}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white/60 outline-none"
              >
                <option value="paper">کاغذی</option>
                <option value="digital">دیجیتال</option>
                <option value="both">هر دو</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">ناشر</label>
              <input
                type="text"
                value={formData.publisher || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, publisher: e.target.value }))}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30"
                placeholder="نام ناشر"
              />
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">سال انتشار</label>
              <input
                type="number"
                value={formData.publishYear || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, publishYear: Number(e.target.value) }))}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30"
                placeholder="۱۴۰۳"
              />
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">تعداد صفحات</label>
              <input
                type="number"
                value={formData.pages || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, pages: Number(e.target.value) }))}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30"
                placeholder="۰"
              />
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">شابک (ISBN)</label>
              <input
                type="text"
                value={formData.isbn || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, isbn: e.target.value }))}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30"
                placeholder="978-..."
              />
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">زبان</label>
              <input
                type="text"
                value={formData.language || 'فارسی'}
                onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30"
              />
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">موجودی</label>
              <input
                type="number"
                value={(formData as any).stock || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, stock: Number(e.target.value) } as any))}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30"
                placeholder="۰"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs text-white/40 mb-1.5 block">توضیحات</label>
            <textarea
              rows={4}
              value={formData.description || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30 resize-none"
              placeholder="توضیحات کتاب..."
            />
          </div>

          {/* Flags */}
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.bestseller || false}
                onChange={(e) => setFormData(prev => ({ ...prev, bestseller: e.target.checked }))}
                className="w-4 h-4 accent-gold-500"
              />
              <span className="text-sm text-white/60">پرفروش</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.newArrival || false}
                onChange={(e) => setFormData(prev => ({ ...prev, newArrival: e.target.checked }))}
                className="w-4 h-4 accent-gold-500"
              />
              <span className="text-sm text-white/60">تازه منتشر شده</span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t border-white/5">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-l from-gold-500 to-gold-600 text-brand-950 rounded-xl font-bold text-sm shadow-lg shadow-gold-500/20"
            >
              <Save className="w-4 h-4" />
              {book ? 'ذخیره تغییرات' : 'افزودن کتاب'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 glass rounded-xl text-sm text-white/60 hover:text-white"
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ConfirmDialog({ title, message, onConfirm, onCancel }: { title: string; message: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onCancel}>
      <div className="bg-[#0f0f1a] border border-white/5 rounded-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>
        <p className="text-sm text-white/50 mb-6">{message}</p>
        <div className="flex gap-2">
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium text-sm transition-colors"
          >
            تایید حذف
          </button>
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 glass rounded-xl text-sm text-white/60 hover:text-white"
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
}
