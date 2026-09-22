/**
 * Client-Side Smart Background Removal Engine for Clippix
 * Performs edge analysis, color distance keying, and alpha matte generation
 * on an HTML Canvas so any uploaded image works live in the browser!
 */

export interface ProcessingOptions {
  threshold?: number;
  edgeSmoothing?: boolean;
  targetBgColor?: { r: number; g: number; b: number };
}

export const processImageCanvas = (
  imageElement: HTMLImageElement,
  options: ProcessingOptions = {}
): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        return reject(new Error('Canvas 2D context unavailable'));
      }

      canvas.width = imageElement.naturalWidth || imageElement.width;
      canvas.height = imageElement.naturalHeight || imageElement.height;

      // Draw original image onto canvas
      ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Sample background color from 4 corners
      const corners = [
        [0, 0],
        [canvas.width - 1, 0],
        [0, canvas.height - 1],
        [canvas.width - 1, canvas.height - 1],
      ];

      let bgR = 0, bgG = 0, bgB = 0;
      corners.forEach(([x, y]) => {
        const idx = (y * canvas.width + x) * 4;
        bgR += data[idx];
        bgG += data[idx + 1];
        bgB += data[idx + 2];
      });
      bgR = Math.round(bgR / 4);
      bgG = Math.round(bgG / 4);
      bgB = Math.round(bgB / 4);

      if (options.targetBgColor) {
        bgR = options.targetBgColor.r;
        bgG = options.targetBgColor.g;
        bgB = options.targetBgColor.b;
      }

      const threshold = options.threshold ?? 48;

      // Process pixel array
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Color distance formula (Euclidean distance in RGB space)
        const dist = Math.sqrt(
          (r - bgR) * (r - bgR) +
          (g - bgG) * (g - bgG) +
          (b - bgB) * (b - bgB)
        );

        if (dist < threshold) {
          // Pure background -> make transparent
          data[i + 3] = 0;
        } else if (dist < threshold + 25) {
          // Soft edge blending / feathering
          const alpha = ((dist - threshold) / 25) * 255;
          data[i + 3] = Math.min(data[i + 3], alpha);
        }
      }

      ctx.putImageData(imageData, 0, 0);

      // Return PNG data URL with full alpha transparency
      const transparentDataUrl = canvas.toDataURL('image/png');
      resolve(transparentDataUrl);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Composite cutout image over custom background (solid, gradient, studio blur)
 */
export const compositeWithBackground = (
  cutoutDataUrl: string,
  bgType: 'transparent' | 'color' | 'gradient' | 'blur',
  bgValue?: string,
  originalUrl?: string
): Promise<string> => {
  return new Promise((resolve) => {
    if (bgType === 'transparent') {
      return resolve(cutoutDataUrl);
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return resolve(cutoutDataUrl);

      canvas.width = img.width;
      canvas.height = img.height;

      if (bgType === 'color' && bgValue) {
        ctx.fillStyle = bgValue;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      } else if (bgType === 'gradient') {
        const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        if (bgValue === 'purple-blue') {
          grad.addColorStop(0, '#7C3AED');
          grad.addColorStop(1, '#3B82F6');
        } else if (bgValue === 'cyan-blue') {
          grad.addColorStop(0, '#22D3EE');
          grad.addColorStop(1, '#1E3A8A');
        } else {
          grad.addColorStop(0, '#18181B');
          grad.addColorStop(1, '#312E81');
        }
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      } else if (bgType === 'blur' && originalUrl) {
        const origImg = new Image();
        origImg.crossOrigin = 'anonymous';
        origImg.onload = () => {
          ctx.filter = 'blur(20px) brightness(0.6)';
          ctx.drawImage(origImg, -20, -20, canvas.width + 40, canvas.height + 40);
          ctx.filter = 'none';
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/png'));
        };
        origImg.onerror = () => {
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/png'));
        };
        origImg.src = originalUrl;
      } else {
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      }
    };
    img.onerror = () => resolve(cutoutDataUrl);
    img.src = cutoutDataUrl;
  });
};
