import React from 'react';
import { Download, Trash2, Eye, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { ImageJob } from '../services/supabase';
import { formatDate } from '../utils/formatters';

interface ImageCardProps {
  job: ImageJob;
  onPreview: (job: ImageJob) => void;
  onDelete: (id: string) => void;
  onDownload: (job: ImageJob) => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  job,
  onPreview,
  onDelete,
  onDownload,
}) => {
  return (
    <div className="group rounded-2xl overflow-hidden bg-[#18181B] border border-[#27272A] hover:border-[#7C3AED]/50 transition-all duration-300 flex flex-col justify-between shadow-lg">
      {/* Thumbnail View Container */}
      <div className="relative aspect-video w-full bg-checkerboard overflow-hidden flex items-center justify-center p-2">
        <img
          src={job.resultUrl || job.originalUrl}
          alt={job.fileName}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />

        {/* Hover Overlay Controls */}
        <div className="absolute inset-0 bg-[#09090B]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3 backdrop-blur-xs">
          <button
            onClick={() => onPreview(job)}
            title="Preview Image"
            className="p-2.5 rounded-full bg-[#18181B] border border-[#27272A] text-white hover:text-[#22D3EE] hover:border-[#22D3EE] transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDownload(job)}
            title="Download PNG"
            className="p-2.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] text-white shadow-lg transition-transform transform hover:scale-110"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>

        {/* Status Pill Badge */}
        <div className="absolute top-2.5 left-2.5 z-10">
          {job.status === 'completed' && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Completed
            </span>
          )}
          {job.status === 'processing' && (
            <span className="px-2 py-0.5 rounded-full bg-[#7C3AED]/20 text-[#A78BFA] border border-[#7C3AED]/30 text-[10px] font-semibold flex items-center gap-1">
              <Clock className="w-3 h-3 animate-spin" />
              Processing
            </span>
          )}
          {job.status === 'failed' && (
            <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[10px] font-semibold flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              Failed
            </span>
          )}
        </div>
      </div>

      {/* Info Footer */}
      <div className="p-4 border-t border-[#27272A] flex items-center justify-between">
        <div className="min-w-0 flex-1 pr-2">
          <h4 className="text-xs font-bold text-white truncate" title={job.fileName}>
            {job.fileName}
          </h4>
          <p className="text-[10px] text-[#71717A] mt-0.5">{formatDate(job.createdAt)}</p>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onDownload(job)}
            title="Download PNG"
            className="p-1.5 text-[#A1A1AA] hover:text-[#22D3EE] transition-colors"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(job.id)}
            title="Delete Image"
            className="p-1.5 text-[#71717A] hover:text-rose-400 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
