import React, { useState } from 'react';
import { Download, Sparkles, X, Check, Copy } from 'lucide-react';
import { ImageJob } from '../services/supabase';
import { compositeWithBackground } from '../utils/canvasProcessor';
import { useToast } from '../context/ToastContext';
import { downloadImageFromUrl } from '../utils/downloadHelper';
import { Modal } from './Modal';

interface ImagePreviewModalProps {
  job: ImageJob;
  onClose: () => void;
}

export const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({ job, onClose }) => {
  const [bgType, setBgType] = useState<'transparent' | 'color' | 'gradient' | 'blur'>('transparent');
  const [bgValue, setBgValue] = useState<string>('#ffffff');
  const [currentResultUrl, setCurrentResultUrl] = useState<string>(job.resultUrl || job.originalUrl);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const { showToast } = useToast();

  const handleBgChange = async (
    type: 'transparent' | 'color' | 'gradient' | 'blur',
    val?: string
  ) => {
    setBgType(type);
    if (val) setBgValue(val);
    const cutoutUrl = job.resultUrl || job.originalUrl;
    const composited = await compositeWithBackground(cutoutUrl, type, val, job.originalUrl);
    setCurrentResultUrl(composited);
  };

  const handleDownload = async (format: 'png' | 'jpg') => {
    const downloadName = `clippix_${job.fileName.replace(/\.[^/.]+$/, '')}.${format}`;
    showToast('Preparing Download', `Fetching image binary for .${format.toUpperCase()} export...`, 'info');
    await downloadImageFromUrl(currentResultUrl, downloadName);
    showToast('Download Completed', `Saved ${downloadName}`, 'success');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentResultUrl);
    showToast('Link Copied', 'Image result URL copied to clipboard', 'info');
  };

  return (
    <Modal isOpen={true} onClose={onClose} title={`Preview: ${job.fileName}`} maxWidth="4xl">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Image Canvas Display */}
        <div className="md:col-span-8 space-y-4">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-checkerboard border border-[#27272A] flex items-center justify-center p-4">
            <img
              src={currentResultUrl}
              alt={job.fileName}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-[#71717A]">
            <span>Resolution: {job.width || 1920} × {job.height || 1080} px</span>
            <span>Processing speed: {job.processingTimeMs || 1200} ms</span>
          </div>
        </div>

        {/* Right Column: Background Replacement Options & Exports */}
        <div className="md:col-span-4 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#A1A1AA]">
              Background Replacements
            </h4>

            {/* Replacement preset buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleBgChange('transparent')}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
                  bgType === 'transparent'
                    ? 'border-[#22D3EE] bg-[#22D3EE]/10 text-white'
                    : 'border-[#27272A] bg-[#09090B] text-[#A1A1AA]'
                }`}
              >
                <span className="w-4 h-4 rounded bg-checkerboard-sm border border-[#27272A]" />
                Transparent
              </button>

              <button
                onClick={() => handleBgChange('color', '#FFFFFF')}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
                  bgType === 'color' && bgValue === '#FFFFFF'
                    ? 'border-[#7C3AED] bg-[#7C3AED]/10 text-white'
                    : 'border-[#27272A] bg-[#09090B] text-[#A1A1AA]'
                }`}
              >
                <span className="w-4 h-4 rounded bg-white border border-[#27272A]" />
                Solid White
              </button>

              <button
                onClick={() => handleBgChange('gradient', 'purple-blue')}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
                  bgType === 'gradient' && bgValue === 'purple-blue'
                    ? 'border-[#7C3AED] bg-[#7C3AED]/10 text-white'
                    : 'border-[#27272A] bg-[#09090B] text-[#A1A1AA]'
                }`}
              >
                <span className="w-4 h-4 rounded bg-gradient-to-r from-[#7C3AED] to-[#3B82F6]" />
                Studio Purple
              </button>

              <button
                onClick={() => handleBgChange('blur')}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
                  bgType === 'blur'
                    ? 'border-[#3B82F6] bg-[#3B82F6]/10 text-white'
                    : 'border-[#27272A] bg-[#09090B] text-[#A1A1AA]'
                }`}
              >
                <span className="w-4 h-4 rounded bg-[#3B82F6]/40 border border-[#3B82F6]" />
                Portrait Blur
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-[#27272A]">
            <button
              onClick={() => handleDownload('png')}
              className="w-full py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:from-[#6D28D9] hover:to-[#2563EB] shadow-[0_0_20px_rgba(124,58,237,0.35)] transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download High-Res PNG
            </button>

            <button
              onClick={() => handleDownload('jpg')}
              className="w-full py-2.5 rounded-xl font-semibold text-xs text-[#F4F4F5] bg-[#09090B] border border-[#27272A] hover:bg-[#27272A] transition-colors flex items-center justify-center gap-2"
            >
              Download Standard JPG
            </button>

            <button
              onClick={handleCopyLink}
              className="w-full text-center text-xs text-[#71717A] hover:text-[#A1A1AA] flex items-center justify-center gap-1.5 pt-1"
            >
              <Copy className="w-3.5 h-3.5" />
              Copy Image Data URL
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
