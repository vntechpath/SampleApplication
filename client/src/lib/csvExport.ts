export function exportToCSV(data: Record<string, any>, filename: string): void {
  // Prepare CSV headers
  const headers = Object.keys(data);
  
  // Prepare CSV values
  const values = headers.map(header => {
    const value = data[header];
    
    // Handle different data types
    if (value === null || value === undefined) {
      return '';
    }
    
    if (typeof value === 'object') {
      return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
    }
    
    // Escape quotes and wrap in quotes if contains comma or newline
    const stringValue = String(value);
    if (stringValue.includes(',') || stringValue.includes('\n') || stringValue.includes('"')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    
    return stringValue;
  });
  
  // Create CSV content
  const csvContent = [
    headers.join(','),
    values.join(',')
  ].join('\n');
  
  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up the URL object
  URL.revokeObjectURL(url);
}
