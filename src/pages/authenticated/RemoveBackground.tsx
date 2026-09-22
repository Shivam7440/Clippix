import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Sparkles, Download, RefreshCw, Layers, CheckCircle2, AlertCircle, Wand2, Image as ImageIcon } from 'lucide-react';
import { UploadBox } from '../../components/UploadBox';
import { LoadingState } from '../../components/LoadingState';
import { BeforeAfterSlider } from '../../components/BeforeAfterSlider';
import { executeBackgroundRemoval } from '../../services/imageProcessing';
import { compositeWithBackground } from '../../utils/canvasProcessor';
import { useCredits } from '../../context/CreditContext';
import { useImageJobs } from '../../context/ImageJobContext';
import { useToast } from '../../context/ToastContext';
import { downloadImageFromUrl } from '../../utils/downloadHelper';

export const RemoveBackground: React.FC = () => {
  const location = useLocation();
  const { deductCredit, hasEnoughCredits } = useCredits();
  const { createJob, updateJob } = useImageJobs();
  const { showToast } = useToast();

  const [state, setState] = useState<'empty' | 'uploading' | 'processing' | 'completed' | 'error'>('empty');
  const [loadingMessage, setLoadingMessage] = useState<string>('AI is removing the background...');
  const [progress, setProgress] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Selected file and job details
  const [selectedFile, setSelectedFile] = useState<File | string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [originalUrl, setOriginalUrl] = useState<string>('');
  const [resultUrl, setResultUrl] = useState<string>('');
  const [compositedUrl, setCompositedUrl] = useState<string>('');
  const [currentJobId, setCurrentJobId] = useState<string>('');

  // Background replacements in workspace
  const [bgStyle, setBgStyle] = useState<'transparent' | 'color' | 'gradient' | 'blur'>('transparent');
  const [bgVal, setBgVal] = useState<string>('#ffffff');

  // Check if passed from hero upload
  useEffect(() => {
    if (location.state && (location.state as any).selectedFile) {
      const locState = location.state as any;
      startRemovalFlow(locState.selectedFile, locState.fileName, locState.jobId);
    }
  }, [location.state]);

  const startRemovalFlow = async (fileOrUrl: File | string, name: string, existingJobId?: string) => {
    if (!hasEnoughCredits) {
      showToast('No Credits Remaining', 'Please upgrade your plan to continue removing backgrounds.', 'warning');
      setState('empty');
      return;
    }

    // Deduct credit securely
    const success = deductCredit(name);
    if (!success) {
      setState('empty');
      return;
    }

    setSelectedFile(fileOrUrl);
    setFileName(name);
    setState('uploading');
    setProgress(15);

    const jobId = existingJobId || createJob(name, typeof fileOrUrl === 'string' ? fileOrUrl : '').id;
    setCurrentJobId(jobId);

    try {
      // Step 2: Processing
      setState('processing');
      const processRes = await executeBackgroundRemoval({
        file: fileOrUrl,
        jobId,
        userId: 'usr_demo',
        onProgress: (msg, pct) => {
          setLoadingMessage(msg);
          setProgress(pct);
        },
      });

      setOriginalUrl(processRes.originalUrl);
      setResultUrl(processRes.resultUrl);
      setCompositedUrl(processRes.resultUrl);

      // Update database job record
      updateJob(jobId, {
        originalUrl: processRes.originalUrl,
        resultUrl: processRes.resultUrl,
        status: 'completed',
        processingTimeMs: processRes.processingTimeMs,
        width: processRes.width,
        height: processRes.height,
      });

      setState('completed');
      showToast('Processing Completed!', 'Background removed successfully.', 'success');
    } catch (err: any) {
      console.error(err);
      setErrorMessage('Failed to process image. Please check format or try another photo.');
      updateJob(jobId, { status: 'failed' });
      setState('error');
    }
  };

  const handleBgStyleChange = async (style: 'transparent' | 'color' | 'gradient' | 'blur', val?: string) => {
    setBgStyle(style);
    if (val) setBgVal(val);
    const composited = await compositeWithBackground(resultUrl, style, val, originalUrl);
    setCompositedUrl(composited);
  };

  const handleDownload = async (format: 'png' | 'jpg') => {
    const downloadName = `clippix_${fileName.replace(/\.[^/.]+$/, '')}.${format}`;
    showToast('Preparing Download', `Fetching image binary for .${format.toUpperCase()} export...`, 'info');
    await downloadImageFromUrl(compositedUrl, downloadName);
    showToast('Download Completed', `Saved ${downloadName}`, 'success');
  };

  const resetWorkspace = () => {
    setState('empty');
    setSelectedFile(null);
    setOriginalUrl('');
    setResultUrl('');
    setCompositedUrl('');
    setBgStyle('transparent');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Workspace Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#27272A] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/30 text-xs font-bold text-[#A78BFA] mb-2">
            <Wand2 className="w-3.5 h-3.5" />
            AI Background Remover Studio
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">Background Removal Workspace</h1>
        </div>

        {state === 'completed' && (
          <button
            onClick={resetWorkspace}
            className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-[#18181B] border border-[#27272A] hover:bg-[#27272A] transition-all flex items-center gap-2 shadow-lg"
          >
            <RefreshCw className="w-4 h-4 text-[#22D3EE]" />
            Process Another Image
          </button>
        )}
      </div>

      {/* WORKSPACE CONTENT STATES */}

      {/* STATE 1: EMPTY */}
      {state === 'empty' && (
        <div className="max-w-4xl mx-auto space-y-6">
          <UploadBox
            onImageSelected={(file, title) => startRemovalFlow(file, title || 'image.png')}
          />
        </div>
      )}

      {/* STATE 2 & 3: UPLOADING / PROCESSING */}
      {(state === 'uploading' || state === 'processing') && (
        <div className="max-w-xl mx-auto py-12">
          <LoadingState message={loadingMessage} progress={progress} />
        </div>
      )}

      {/* STATE 4: COMPLETED */}
      {state === 'completed' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Canvas & Before/After Slider */}
          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-3xl p-4 bg-[#18181B] border border-[#27272A] space-y-4">
              <BeforeAfterSlider originalImage={originalUrl} resultImage={compositedUrl} />
            </div>

            {/* Background Style Selectors */}
            <div className="rounded-3xl p-6 bg-[#18181B] border border-[#27272A] space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#A1A1AA] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#A78BFA]" />
                Replace Background Studio
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  onClick={() => handleBgStyleChange('transparent')}
                  className={`p-3 rounded-2xl border text-xs font-bold flex items-center gap-2 transition-all ${
                    bgStyle === 'transparent'
                      ? 'border-[#22D3EE] bg-[#22D3EE]/10 text-white ring-2 ring-[#22D3EE]/20'
                      : 'border-[#27272A] bg-[#09090B] text-[#A1A1AA]'
                  }`}
                >
                  <span className="w-5 h-5 rounded-md bg-checkerboard-sm border border-[#27272A]" />
                  Transparent
                </button>

                <button
                  onClick={() => handleBgStyleChange('color', '#FFFFFF')}
                  className={`p-3 rounded-2xl border text-xs font-bold flex items-center gap-2 transition-all ${
                    bgStyle === 'color' && bgVal === '#FFFFFF'
                      ? 'border-[#7C3AED] bg-[#7C3AED]/10 text-white ring-2 ring-[#7C3AED]/20'
                      : 'border-[#27272A] bg-[#09090B] text-[#A1A1AA]'
                  }`}
                >
                  <span className="w-5 h-5 rounded-md bg-white border border-[#27272A]" />
                  Solid White
                </button>

                <button
                  onClick={() => handleBgStyleChange('gradient', 'purple-blue')}
                  className={`p-3 rounded-2xl border text-xs font-bold flex items-center gap-2 transition-all ${
                    bgStyle === 'gradient' && bgVal === 'purple-blue'
                      ? 'border-[#7C3AED] bg-[#7C3AED]/10 text-white ring-2 ring-[#7C3AED]/20'
                      : 'border-[#27272A] bg-[#09090B] text-[#A1A1AA]'
                  }`}
                >
                  <span className="w-5 h-5 rounded-md bg-gradient-to-r from-[#7C3AED] to-[#3B82F6]" />
                  Neon Studio
                </button>

                <button
                  onClick={() => handleBgStyleChange('blur')}
                  className={`p-3 rounded-2xl border text-xs font-bold flex items-center gap-2 transition-all ${
                    bgStyle === 'blur'
                      ? 'border-[#3B82F6] bg-[#3B82F6]/10 text-white ring-2 ring-[#3B82F6]/20'
                      : 'border-[#27272A] bg-[#09090B] text-[#A1A1AA]'
                  }`}
                >
                  <span className="w-5 h-5 rounded-md bg-[#3B82F6]/40 border border-[#3B82F6]" />
                  Portrait Blur
                </button>
              </div>
            </div>
          </div>

          {/* Right: Export & Download Action Panel */}
          <div className="lg:col-span-4 rounded-3xl p-6 bg-[#18181B] border border-[#27272A] space-y-6">
            <div className="space-y-1 border-b border-[#27272A] pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                Background Removed!
              </h3>
              <p className="text-xs text-[#A1A1AA] truncate">{fileName}</p>
            </div>

            {/* Quick Export CTAs */}
            <div className="space-y-3">
              <button
                onClick={() => handleDownload('png')}
                className="w-full py-4 rounded-2xl font-bold text-xs text-white bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:from-[#6D28D9] hover:to-[#2563EB] shadow-[0_0_25px_rgba(124,58,237,0.4)] transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Transparent PNG
              </button>

              <button
                onClick={() => handleDownload('jpg')}
                className="w-full py-3 rounded-2xl font-semibold text-xs text-white bg-[#09090B] border border-[#27272A] hover:bg-[#27272A] transition-colors flex items-center justify-center gap-2"
              >
                Download Standard JPG
              </button>
            </div>

            {/* Job Metadata details */}
            <div className="p-4 rounded-2xl bg-[#09090B] border border-[#27272A] space-y-2 text-xs">
              <div className="flex justify-between text-[#A1A1AA]">
                <span>Credits Used</span>
                <span className="text-[#A78BFA] font-bold">1 Credit</span>
              </div>
              <div className="flex justify-between text-[#A1A1AA]">
                <span>AI Alpha Mask</span>
                <span className="text-emerald-400 font-semibold">Clean Edge</span>
              </div>
              <div className="flex justify-between text-[#A1A1AA]">
                <span>Format</span>
                <span className="text-white uppercase font-bold">PNG / JPG</span>
              </div>
            </div>

            <button
              onClick={resetWorkspace}
              className="w-full py-3 rounded-2xl border border-[#27272A] text-xs font-semibold text-[#A1A1AA] hover:text-white transition-colors"
            >
              Process Another Image
            </button>
          </div>
        </div>
      )}

      {/* STATE 5: ERROR */}
      {state === 'error' && (
        <div className="max-w-md mx-auto p-8 rounded-3xl bg-[#18181B] border border-rose-500/40 text-center space-y-4 shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Processing Error</h3>
          <p className="text-xs text-[#A1A1AA]">{errorMessage || 'An error occurred while removing the background.'}</p>
          <button
            onClick={resetWorkspace}
            className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:scale-105 transition-transform"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};
