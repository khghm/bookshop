import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// Helper function to create RTL HTML table and convert to PDF
export const exportToPDF = async (
  title: string,
  headers: string[],
  data: any[][],
  fileName: string
) => {
  // Create a temporary container for the table
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.direction = 'rtl';
  container.style.fontFamily = 'Vazirmatn, Tahoma, Arial, sans-serif';
  container.style.padding = '20px';
  container.style.backgroundColor = '#ffffff';
  
  // Create table HTML
  const tableHTML = `
    <div style="width: 800px; padding: 20px; font-family: Vazirmatn, Tahoma, Arial, sans-serif; direction: rtl;">
      <h1 style="text-align: center; color: #1a1a2e; margin-bottom: 10px; font-size: 24px;">${title}</h1>
      <p style="text-align: center; color: #666; margin-bottom: 30px; font-size: 12px;">تاریخ: ${new Date().toLocaleDateString('fa-IR')}</p>
      <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
        <thead>
          <tr style="background-color: #7c3aed; color: white;">
            ${headers.map(h => `<th style="padding: 10px; border: 1px solid #ddd; text-align: right; font-weight: bold;">${h}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${data.map((row, i) => `
            <tr style="background-color: ${i % 2 === 0 ? '#f9f9f9' : '#ffffff'};">
              ${row.map(cell => `<td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${cell}</td>`).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
      <p style="text-align: center; color: #999; margin-top: 20px; font-size: 10px;">صفحه 1 از 1</p>
    </div>
  `;
  
  container.innerHTML = tableHTML;
  document.body.appendChild(container);
  
  try {
    // Convert HTML to canvas
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });
    
    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${fileName}.pdf`);
  } finally {
    // Clean up
    document.body.removeChild(container);
  }
};

export const exportToExcel = (data: any[], fileName: string, sheetName: string = 'Sheet1') => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  
  // Convert to buffer
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  
  // Save file
  const blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  saveAs(blob, `${fileName}.xlsx`);
};

export const exportToCSV = (data: any[], fileName: string) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const csv = XLSX.utils.sheet_to_csv(ws);
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `${fileName}.csv`);
};

// Import data from Excel/CSV file
export const importFromExcel = (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);
        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};
