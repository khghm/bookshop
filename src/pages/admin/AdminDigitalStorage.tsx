import { useState, useRef } from 'react';
import { FileText, Plus, Edit, Trash2, Search, AlertTriangle, Check, Download, Upload, HardDrive, Eye, X } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { exportToPDF, exportToExcel } from '../../utils/exportUtils';

export default function AdminDigitalStorage() {
  const { digitalStorage, books, addDigitalFile, updateDigitalFile, deleteDigitalFile } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [editingFile, setEditingFile] = useState<any>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredFiles = digitalStorage.filter(file => {
    const book = books.find(b => b.id === file.bookId);
    if (!book) return false;
    if (searchQuery && !book.title.includes(searchQuery)) return false;
    return true;
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = (id: number) => {
    deleteDigitalFile(id);
    setDeleteConfirm(null);
    showToast('فایل دیجیتال حذف شد');
  };

  const handleSave = (fileData: any) => {
    if (editingFile) {
      updateDigitalFile(editingFile.id, fileData);
      showToast('اطلاعات فایل بروزرسانی شد');
    } else {
      addDigitalFile(fileData);
      showToast('فایل دیجیتال جدید اضافه شد');
    }
    setShowForm(false);
    setEditingFile(null);
  };

  const handleExportPDF = () => {
    const data = filteredFiles.map(file => {
      const book = books.find(b => b.id === file.bookId);
      return [
        book?.title || '-',
        file.format,
        file.fileSize,
        file.filePath,
        file.uploadDate,
        file.downloadCount.toString(),
      ];
    });
    exportToPDF('گزارش انبار دیجیتال', ['کتاب', 'فرمت', 'حجم', 'مسیر فایل', 'تاریخ آپلود', 'تعداد دانلود'], data, 'digital-storage-report');
  };

  const handleExportExcel = () => {
    const data = filteredFiles.map(file => {
      const book = books.find(b => b.id === file.bookId);
      return {
        'کتاب': book?.title || '-',
        'فرمت': file.format,
        'حجم': file.fileSize,
        'مسیر فایل': file.filePath,
        'تاریخ آپلود': file.uploadDate,
        'تعداد دانلود': file.downloadCount,
      };
    });
    exportToExcel(data, 'digital-storage-report', 'انبار دیجیتال');
  };

  const totalSize = digitalStorage.reduce((sum, file) => {
    const size = parseFloat(file.fileSize);
    return sum + size;
  }, 0);

  const totalDownloads = digitalStorage.reduce((sum, file) => sum + file.downloadCount, 0);

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
          <h1 className="text-2xl font-black text-white">مدیریت انبار دیجیتال</h1>
          <p className="text-sm text-white/40 mt-1">مدیریت فایل‌های PDF و EPUB کتاب‌ها</p>
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
            onClick={() => { setEditingFile(null); setShowForm(true); }}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-l from-gold-500 to-gold-600 text-brand-950 rounded-xl text-sm font-bold shadow-lg shadow-gold-500/20"
          >
            <Plus className="w-4 h-4" />
            آپلود فایل جدید
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-black text-white">{digitalStorage.length}</p>
              <p className="text-xs text-white/30">فایل دیجیتال</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
              <HardDrive className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-black text-white">{totalSize.toFixed(1)} MB</p>
              <p className="text-xs text-white/30">حجم کل</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center">
              <Download className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-black text-white">{totalDownloads.toLocaleString('fa-IR')}</p>
              <p className="text-xs text-white/30">کل دانلودها</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gold-500 to-gold-700 rounded-xl flex items-center justify-center">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-black text-white">{(totalDownloads / digitalStorage.length).toFixed(0)}</p>
              <p className="text-xs text-white/30">میانگین دانلود</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
        <input
          type="text"
          placeholder="جستجوی کتاب..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-2.5 pr-10 pl-4 glass rounded-xl text-sm text-white placeholder-white/20 outline-none focus:border-gold-500/30"
        />
      </div>

      {/* Digital files */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-right text-xs font-medium text-white/30 px-4 py-3">کتاب</th>
                <th className="text-right text-xs font-medium text-white/30 px-4 py-3">فرمت</th>
                <th className="text-right text-xs font-medium text-white/30 px-4 py-3">حجم</th>
                <th className="text-right text-xs font-medium text-white/30 px-4 py-3">مسیر فایل</th>
                <th className="text-right text-xs font-medium text-white/30 px-4 py-3">تاریخ آپلود</th>
                <th className="text-right text-xs font-medium text-white/30 px-4 py-3">دانلودها</th>
                <th className="text-right text-xs font-medium text-white/30 px-4 py-3">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.map((file) => {
                const book = books.find(b => b.id === file.bookId);
                return (
                  <tr key={file.id} className="border-b border-white/3 hover:bg-white/3 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={book?.cover} alt={book?.title} className="w-10 h-12 object-cover rounded-lg" />
                        <span className="text-sm font-medium text-white">{book?.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-lg ${
                        file.format === 'PDF' ? 'bg-red-500/10 text-red-400' : 'bg-blue-500/10 text-blue-400'
                      }`}>
                        {file.format}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-white/50">{file.fileSize}</td>
                    <td className="px-4 py-3 text-sm text-white/50 font-mono text-xs">{file.filePath}</td>
                    <td className="px-4 py-3 text-sm text-white/50">{file.uploadDate}</td>
                    <td className="px-4 py-3 text-sm font-bold text-emerald-400">{file.downloadCount.toLocaleString('fa-IR')}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => { setEditingFile(file); setShowForm(true); }}
                          className="w-7 h-7 rounded-lg hover:bg-white/5 flex items-center justify-center text-white/30 hover:text-gold-400 transition-colors"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(file.id)}
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
        <DigitalFileForm
          file={editingFile}
          books={books}
          onClose={() => { setShowForm(false); setEditingFile(null); }}
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
              <h3 className="text-lg font-bold text-white">حذف فایل دیجیتال</h3>
            </div>
            <p className="text-sm text-white/50 mb-6">آیا از حذف این فایل دیجیتال اطمینان دارید؟</p>
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

function DigitalFileForm({ file, books, onClose, onSave }: { file: any; books: any[]; onClose: () => void; onSave: (data: any) => void }) {
  const [formData, setFormData] = useState(file || {
    bookId: books[0]?.id || 0,
    filePath: '',
    fileSize: '0 MB',
    format: 'PDF',
    uploadDate: new Date().toLocaleDateString('fa-IR'),
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      setFormData({
        ...formData,
        filePath: `/books/${file.name}`,
        fileSize: `${sizeMB} MB`,
        format: file.name.endsWith('.pdf') ? 'PDF' : file.name.endsWith('.epub') ? 'EPUB' : 'PDF',
      });
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
          <h3 className="text-lg font-bold text-white">{file ? 'ویرایش فایل دیجیتال' : 'آپلود فایل دیجیتال جدید'}</h3>
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
            <label className="text-xs text-white/40 mb-1.5 block">فایل دیجیتال</label>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.epub,.mobi"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full p-6 bg-white/5 border-2 border-dashed border-white/10 rounded-xl text-center cursor-pointer hover:border-gold-500/30 transition-colors"
            >
              {uploadedFile ? (
                <div className="space-y-2">
                  <FileText className="w-8 h-8 text-gold-400 mx-auto" />
                  <p className="text-sm text-white font-medium">{uploadedFile.name}</p>
                  <p className="text-xs text-white/40">{(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                  <p className="text-xs text-gold-400">کلیک کنید برای تغییر فایل</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="w-8 h-8 text-white/30 mx-auto" />
                  <p className="text-sm text-white/50">فایل را اینجا رها کنید یا کلیک کنید</p>
                  <p className="text-xs text-white/30">فرمت‌های مجاز: PDF, EPUB, MOBI - حداکثر ۵۰ مگابایت</p>
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">فرمت</label>
              <select
                value={formData.format}
                onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#1a1a2e] border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30"
              >
                <option value="PDF">PDF</option>
                <option value="EPUB">EPUB</option>
                <option value="MOBI">MOBI</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">حجم فایل</label>
              <input
                type="text"
                value={formData.fileSize}
                onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30"
                placeholder="12.5 MB"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-white/40 mb-1.5 block">مسیر فایل</label>
            <input
              type="text"
              value={formData.filePath}
              onChange={(e) => setFormData({ ...formData, filePath: e.target.value })}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white outline-none focus:border-gold-500/30 font-mono"
              placeholder="/books/filename.pdf"
            />
          </div>
          <div className="flex gap-2 pt-4 border-t border-white/5">
            <button type="submit" className="flex-1 py-3 bg-gradient-to-l from-gold-500 to-gold-600 text-brand-950 rounded-xl font-bold text-sm">
              {file ? 'ذخیره تغییرات' : 'آپلود فایل'}
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
