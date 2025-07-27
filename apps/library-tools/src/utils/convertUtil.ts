export function base64ToPdfObjectUrl(base64: string) {
  const decodedArray = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  const pdfBlob = new Blob([decodedArray], { type: 'application/pdf' });
  const url = URL.createObjectURL(pdfBlob);
  return url;
}
