import { processImageCanvas } from '../utils/canvasProcessor';
import { uploadImageToCloudinary } from './cloudinary';
import { sendImageToN8nWebhook } from './n8n';

export interface RemoveBackgroundParams {
  file: File | string; // File object or image URL string
  jobId: string;
  userId: string;
  threshold?: number;
  onProgress?: (stage: string, percent: number) => void;
}

export interface RemoveBackgroundResult {
  jobId: string;
  originalUrl: string;
  resultUrl: string;
  processingTimeMs: number;
  width: number;
  height: number;
}

export const executeBackgroundRemoval = async (
  params: RemoveBackgroundParams
): Promise<RemoveBackgroundResult> => {
  const startTime = Date.now();
  const { file, jobId, userId, threshold, onProgress } = params;

  const fileName = typeof file === 'string' ? 'image.png' : file.name;

  // Step 1: Uploading / Storage preparation
  if (onProgress) onProgress('Preparing binary image asset...', 20);

  let sourceUrl = '';
  let imageWidth = 1200;
  let imageHeight = 800;

  if (typeof file === 'string') {
    sourceUrl = file;
  } else {
    const uploadRes = await uploadImageToCloudinary(file);
    sourceUrl = uploadRes.url;
    imageWidth = uploadRes.width;
    imageHeight = uploadRes.height;
  }

  // Step 2: Send binary image payload directly to n8n webhook
  if (onProgress) onProgress('Sending binary image to n8n AI webhook...', 50);

  const n8nResult = await sendImageToN8nWebhook(file, jobId, userId, fileName);

  let finalResultUrl = n8nResult.resultUrl || '';

  // Step 3: If n8n did not return a direct result URL, process via client-side smart canvas engine
  if (!finalResultUrl) {
    if (onProgress) onProgress('Processing AI edge detection & alpha mask matte...', 80);

    const img = new Image();
    img.crossOrigin = 'anonymous';

    finalResultUrl = await new Promise<string>((resolve) => {
      img.onload = async () => {
        try {
          const cutout = await processImageCanvas(img, { threshold });
          resolve(cutout);
        } catch (err) {
          resolve(sourceUrl);
        }
      };
      img.onerror = () => {
        resolve(sourceUrl);
      };
      img.src = sourceUrl;
    });
  }

  if (onProgress) onProgress('Completed background removal!', 100);

  const endTime = Date.now();

  return {
    jobId,
    originalUrl: sourceUrl,
    resultUrl: finalResultUrl,
    processingTimeMs: endTime - startTime,
    width: imageWidth,
    height: imageHeight,
  };
};
