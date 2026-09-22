/**
 * n8n Workflow Automation Integration Service for Clippix
 * Sends binary image payload directly to n8n webhook for background removal.
 */

export const N8N_WEBHOOK_URL =
  import.meta.env.VITE_N8N_WEBHOOK_URL ||
  'https://shivam30.app.n8n.cloud/webhook/remove-background';

export interface N8nWebhookResponse {
  success: boolean;
  jobId?: string;
  resultUrl?: string;
  error?: string;
}

/**
 * Sends image in binary format (Multipart FormData + Blob) to the n8n webhook endpoint
 * Parses JSON output format: { "url": "http://res.cloudinary.com/..." } or array [{ "url": "..." }]
 */
export const sendImageToN8nWebhook = async (
  fileOrUrl: File | string,
  jobId: string,
  userId: string,
  fileName: string
): Promise<N8nWebhookResponse> => {
  const webhookUrl = N8N_WEBHOOK_URL;
  console.log(`[n8n Webhook] Sending binary image payload to: ${webhookUrl}`);

  try {
    let blob: Blob;
    let name = fileName;

    if (fileOrUrl instanceof File) {
      blob = fileOrUrl;
      name = fileOrUrl.name;
    } else {
      // Fetch remote URL or DataURL to convert to binary Blob
      const res = await fetch(fileOrUrl);
      blob = await res.blob();
    }

    // Build FormData binary payload
    const formData = new FormData();
    formData.append('file', blob, name);
    formData.append('data', blob, name);
    formData.append('image', blob, name);
    formData.append('jobId', jobId);
    formData.append('userId', userId);
    formData.append('fileName', name);

    const response = await fetch(webhookUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      console.warn(`[n8n Webhook] Server returned status ${response.status} ${response.statusText}`);
      return {
        success: false,
        jobId,
        error: `n8n Webhook returned ${response.status}`,
      };
    }

    // Read response text first to handle JSON, array, text, or binary content
    const responseText = await response.text();

    // Try parsing as JSON first (handles { "url": "http://res.cloudinary.com/..." } and [{ "url": "..." }])
    try {
      const parsed = JSON.parse(responseText);
      const jsonObj = Array.isArray(parsed) ? parsed[0] : parsed;

      const extractedUrl =
        jsonObj?.url ||
        jsonObj?.resultUrl ||
        jsonObj?.image_url ||
        jsonObj?.result ||
        jsonObj?.data;

      if (extractedUrl && typeof extractedUrl === 'string') {
        console.log(`[n8n Webhook] Successfully extracted result URL from n8n JSON response:`, extractedUrl);
        return {
          success: true,
          jobId,
          resultUrl: extractedUrl,
        };
      }
    } catch (_e) {
      // Response text is not JSON, check binary or data URL format
    }

    // If response was binary image Blob (PNG / JPG)
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('image/') || contentType.includes('application/octet-stream')) {
      // Re-fetch as Blob if text wasn't JSON
      const resultBlob = await (await fetch(webhookUrl, { method: 'POST', body: formData })).blob();
      const resultUrl = URL.createObjectURL(resultBlob);
      console.log('[n8n Webhook] Received binary image response Blob from n8n');
      return { success: true, jobId, resultUrl };
    }

    if (responseText.startsWith('data:image') || responseText.startsWith('http://') || responseText.startsWith('https://')) {
      return { success: true, jobId, resultUrl: responseText.trim() };
    }

    return { success: true, jobId };
  } catch (err: any) {
    console.error('[n8n Webhook] Binary upload request failed:', err);
    return {
      success: false,
      jobId,
      error: err?.message || 'Failed to send image binary to n8n webhook',
    };
  }
};
