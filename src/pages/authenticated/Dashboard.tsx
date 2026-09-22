import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Zap, Image as ImageIcon, CreditCard, ArrowRight, History } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCredits } from '../../context/CreditContext';
import { useImageJobs } from '../../context/ImageJobContext';
import { UploadBox } from '../../components/UploadBox';
import { ImageCard } from '../../components/ImageCard';
import { ImagePreviewModal } from '../../components/ImagePreviewModal';
import { ImageJob } from '../../services/supabase';
import { downloadImageFromUrl } from '../../utils/downloadHelper';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { creditsRemaining, creditsUsedTotal } = useCredits();
  const { jobs, createJob, deleteJob } = useImageJobs();
  const navigate = useNavigate();

  const [previewJob, setPreviewJob] = React.useState<ImageJob | null>(null);

  const handleUploadSelect = (fileOrUrl: File | string, title?: string) => {
    const fileName = typeof fileOrUrl === 'string' ? title || 'sample.png' : fileOrUrl.name;
    const newJob = createJob(fileName, typeof fileOrUrl === 'string' ? fileOrUrl : '');
    navigate('/remove-background', { state: { selectedFile: fileOrUrl, fileName, jobId: newJob.id } });
  };

  const handleDownload = async (job: ImageJob) => {
    const url = job.resultUrl || job.originalUrl;
    await downloadImageFromUrl(url, `clippix_${job.fileName}`);
  };

  const recentJobs = jobs.slice(0, 4);

  return (
    <div className="space-y-10 pb-16">
      {/* Welcome Banner */}
      <div className="rounded-3xl p-8 bg-gradient-to-r from-[#18181B] via-[#111113] to-[#18181B] border border-[#7C3AED]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
        <div className="space-y-2 z-10">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
            Welcome back, {user?.fullName.split(' ')[0]} 👋
          </h1>
          <p className="text-xs sm:text-sm text-[#A1A1AA]">
            Upload an image to isolate subjects and remove backgrounds instantly.
          </p>
        </div>

        <Link
          to="/remove-background"
          className="z-10 px-6 py-3.5 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:from-[#6D28D9] hover:to-[#2563EB] shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all transform hover:scale-105 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-white" />
          Launch Removal Workspace
        </Link>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-[#18181B] border border-[#27272A] flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#A1A1AA]">Credits Remaining</p>
            <p className="text-3xl font-extrabold text-white mt-1">{creditsRemaining}</p>
            <p className="text-[11px] text-[#A78BFA] mt-1 font-medium">1 credit = 1 background removal</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#7C3AED]/20 border border-[#7C3AED]/40 flex items-center justify-center text-[#A78BFA]">
            <Zap className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-[#18181B] border border-[#27272A] flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#A1A1AA]">Images Processed</p>
            <p className="text-3xl font-extrabold text-white mt-1">{creditsUsedTotal + jobs.length}</p>
            <p className="text-[11px] text-[#22D3EE] mt-1 font-medium">Total AI cutouts generated</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#22D3EE]/20 border border-[#22D3EE]/40 flex items-center justify-center text-[#22D3EE]">
            <ImageIcon className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-[#18181B] border border-[#27272A] flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#A1A1AA]">Current Plan</p>
            <p className="text-3xl font-extrabold text-white mt-1 capitalize">{user?.plan}</p>
            <Link to="/billing" className="text-[11px] text-[#3B82F6] hover:underline mt-1 font-semibold block">
              Manage Subscription →
            </Link>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#3B82F6]/20 border border-[#3B82F6]/40 flex items-center justify-center text-[#3B82F6]">
            <CreditCard className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Upload Workspace Banner */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#A78BFA]" />
          Remove a Background
        </h2>
        <UploadBox onImageSelected={handleUploadSelect} />
      </div>

      {/* Recent Images Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <History className="w-5 h-5 text-[#22D3EE]" />
            Recent Processed Images
          </h2>
          <Link
            to="/history"
            className="text-xs font-semibold text-[#A78BFA] hover:underline flex items-center gap-1"
          >
            View All History <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentJobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentJobs.map((job) => (
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
          <p className="text-xs text-[#71717A] bg-[#18181B] p-6 rounded-2xl border border-[#27272A] text-center">
            No recently processed images found. Upload an image above to start.
          </p>
        )}
      </div>

      {/* Preview Modal */}
      {previewJob && (
        <ImagePreviewModal job={previewJob} onClose={() => setPreviewJob(null)} />
      )}
    </div>
  );
};
