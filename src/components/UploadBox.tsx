import React, { useState, useRef, DragEvent } from 'react';
import { UploadCloud, Image as ImageIcon, Sparkles, AlertCircle, FileType, Check } from 'lucide-react';
import { SAMPLE_IMAGES } from '../config/constants';
import { useToast } from '../context/ToastContext';

interface UploadBoxProps {
  onImageSelected: (fileOrUrl: File | string, title?: string) => void;
  isProcessing?: boolean;
  compact?: boolean;
}

export const UploadBox: React.FC<UploadBoxProps> = ({
  onImageSelected,
  isProcessing = false,
  compact = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedSample, setSelectedSample] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const validateAndProcessFile = (file: File) => {
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      showToast('Unsupported File Type', 'Please upload a PNG, JPG, JPEG, or WEBP image.', 'error');
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      showToast('File Too Large', 'Maximum image upload size is 25MB.', 'warning');
      return;
    }

    onImageSelected(file, file.name);
  };

  const handleSampleClick = (sample: typeof SAMPLE_IMAGES[0]) => {
    setSelectedSample(sample.id);
    onImageSelected(sample.original, sample.title);
  };

  return (
    <div className="w-full space-y-6">
      {/* Upload Drop Zone Card */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-3xl transition-all duration-300 cursor-pointer overflow-hidden group ${
          compact ? 'p-6' : 'p-8 sm:p-12'
        } ${
          isDragging
            ? 'border-[#22D3EE] bg-[#7C3AED]/10 shadow-[0_0_40px_rgba(34,211,238,0.25)] scale-[1.01]'
            : 'border-[#27272A] hover:border-[#7C3AED]/60 bg-[#18181B]/80 hover:bg-[#18181B] shadow-2xl'
        }`}
      >
        {/* Glow ambient background effect */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-[#7C3AED]/15 rounded-full blur-3xl pointer-events-none group-hover:bg-[#7C3AED]/25 transition-all" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-[#22D3EE]/15 rounded-full blur-3xl pointer-events-none group-hover:bg-[#22D3EE]/25 transition-all" />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/jpg, image/webp"
          onChange={handleFileChange}
          className="hidden"
          disabled={isProcessing}
        />

        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          {/* Upload Icon with Glowing Aura */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#09090B] border border-[#27272A] flex items-center justify-center mb-6 group-hover:border-[#7C3AED] group-hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] transition-all duration-300">
            <UploadCloud className="w-8 h-8 sm:w-10 sm:h-10 text-[#A78BFA] group-hover:text-[#22D3EE] transition-colors" />
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
            Drop your image here
          </h3>
          <p className="text-xs sm:text-sm text-[#A1A1AA] mb-6 max-w-sm">
            or <span className="text-[#A78BFA] font-semibold underline underline-offset-4">click to browse</span> from your device
          </p>

          {/* Formats pill tags */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#09090B]/80 border border-[#27272A] text-[11px] font-medium text-[#71717A]">
            <FileType className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span>PNG, JPG, JPEG, WEBP up to 25MB</span>
          </div>
        </div>
      </div>

      {/* Instant Demo Test Pickers */}
      <div className="bg-[#111113] border border-[#27272A] rounded-2xl p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#A1A1AA] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#A78BFA]" />
            No image? Try a sample:
          </span>
          <span className="text-[10px] text-[#71717A]">1-Click Live Test</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SAMPLE_IMAGES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => handleSampleClick(sample)}
              disabled={isProcessing}
              className={`group relative rounded-xl overflow-hidden border text-left transition-all duration-200 focus:outline-none ${
                selectedSample === sample.id
                  ? 'border-[#22D3EE] ring-2 ring-[#22D3EE]/30'
                  : 'border-[#27272A] hover:border-[#7C3AED]'
              }`}
            >
              <div className="aspect-video w-full relative bg-[#18181B] overflow-hidden">
                <img
                  src={sample.original}
                  alt={sample.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-white truncate">{sample.title}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#7C3AED]/60 text-white font-medium">
                    {sample.category}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
