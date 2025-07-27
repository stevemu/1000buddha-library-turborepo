export function createCsvBlob(content: string) {
  // Add a BOM to ensure correct UTF-8 encoding
  const bom = '\uFEFF'; // UTF-8 BOM character
  const blob = new Blob([bom + content], { type: 'text/csv;charset=utf-8;' });
  return blob;
}

export function downloadBlob(blob: Blob, filename: string) {
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}
