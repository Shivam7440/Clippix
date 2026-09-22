import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, History as HistoryIcon, Sparkles } from 'lucide-react';
import { useImageJobs } from '../../context/ImageJobContext';
import { ImageCard } from '../../components/ImageCard';
import { ImagePreviewModal } from '../../components/ImagePreviewModal';
import { EmptyState } from '../../components/EmptyState';
import { ImageJob } from '../../services/supabase';
import { downloadImageFromUrl } from '../../utils/downloadHelper';

export const History: React.FC = () => {
  const { jobs, deleteJob } = useImageJobs();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'processing'>('all');
  const [previewJob, setPreviewJob] = useState<ImageJob | null>(null);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.fileName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDownload = async (job: ImageJob) => {
    const url = job.resultUrl || job.originalUrl;
    await downloadImageFromUrl(url, `clippix_${job.fileName}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#27272A] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-xs font-bold text-[#22D3EE] mb-2">
            <HistoryIcon className="w-3.5 h-3.5" />
            Asset History Vault
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">Processed Images History</h1>
        </div>

        <Link
          to="/remove-background"
          className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:from-[#6D28D9] hover:to-[#2563EB] shadow-[0_0_20px_rgba(124,58,237,0.35)] transition-all flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Remove New Background
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#71717A] absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search images by name..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#18181B] border border-[#27272A] text-white text-xs focus:outline-none focus:border-[#7C3AED]"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-[#71717A]" />
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              statusFilter === 'all'
                ? 'bg-[#7C3AED] text-white'
                : 'bg-[#18181B] border border-[#27272A] text-[#A1A1AA]'
            }`}
          >
            All ({jobs.length})
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              statusFilter === 'completed'
                ? 'bg-[#7C3AED] text-white'
                : 'bg-[#18181B] border border-[#27272A] text-[#A1A1AA]'
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Image Grid */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredJobs.map((job) => (
            <ImageCard
              key={job.id}
              job={job}
              onPreview={(j) => setPreviewJob(j)}
              onDelete={(id) => deleteJob(id)}
              onDownload={handleDownload}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No processed images yet"
          description="Upload your first photo to automatically detect subjects and remove backgrounds."
          actionText="Remove your first background"
          onAction={() => (window.location.href = '/remove-background')}
        />
      )}

      {/* Preview Modal */}
      {previewJob && (
        <ImagePreviewModal job={previewJob} onClose={() => setPreviewJob(null)} />
      )}
    </div>
  );
};
