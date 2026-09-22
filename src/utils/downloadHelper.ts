/**
 * Utility to force automatic image download across browsers and cross-origin URLs.
 * Converts HTTP/HTTPS image URLs or Data URLs into binary Blobs to trigger native browser downloads
 * without redirecting or navigating the page.
 */
export const downloadImageFromUrl = async (
  imageUrl: string,
  fileName: string
): Promise<void> => {
  if (!imageUrl) return;

  try {
    // If Data URL (base64)
    if (imageUrl.startsWith('data:')) {
      const a = document.createElement('a');
      a.href = imageUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }

    // For HTTP/HTTPS remote URLs (Cloudinary, Unsplash, n8n, etc.)
    const response = await fetch(imageUrl, { mode: 'cors' });
    if (!response.ok) throw new Error(`HTTP fetch error ${response.status}`);

    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(() => {
      URL.revokeObjectURL(blobUrl);
    }, 2000);
  } catch (err) {
    console.warn('[Download Utility] Direct fetch failed, falling back to Canvas blob export:', err);

    // Canvas rendering fallback for CORS restricted images
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const format = fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') ? 'image/jpeg' : 'image/png';
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(() => URL.revokeObjectURL(url), 2000);
          } else {
            // Direct window fallback
            window.open(imageUrl, '_blank');
          }
        }, format);
      }
    };

    img.onerror = () => {
      // Last resort fallback
      const a = document.createElement('a');
      a.href = imageUrl;
      a.target = '_blank';
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };

    img.src = imageUrl;
  }
};
