import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ImageJob, INITIAL_MOCK_JOBS } from '../services/supabase';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

interface ImageJobContextType {
  jobs: ImageJob[];
  activeJob: ImageJob | null;
  setActiveJob: (job: ImageJob | null) => void;
  createJob: (fileName: string, originalUrl: string) => ImageJob;
  updateJob: (id: string, updates: Partial<ImageJob>) => void;
  deleteJob: (id: string) => void;
  getJobById: (id: string) => ImageJob | undefined;
}

const ImageJobContext = createContext<ImageJobContextType | undefined>(undefined);

const JOBS_STORAGE_KEY = 'clippix_image_jobs';

export const ImageJobProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [jobs, setJobs] = useState<ImageJob[]>(() => {
    try {
      const saved = localStorage.getItem(JOBS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse saved jobs from localStorage:', e);
    }
    return INITIAL_MOCK_JOBS;
  });

  const [activeJob, setActiveJob] = useState<ImageJob | null>(null);

  // Sync jobs state to localStorage whenever jobs change
  useEffect(() => {
    try {
      localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(jobs));
    } catch (e) {
      console.warn('Failed to save jobs to localStorage:', e);
    }
  }, [jobs]);

  const createJob = (fileName: string, originalUrl: string): ImageJob => {
    const newJob: ImageJob = {
      id: `job_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      userId: user?.id || 'usr_demo',
      fileName,
      originalUrl,
      status: 'pending',
      creditsUsed: 1,
      createdAt: new Date().toISOString(),
    };

    setJobs((prev) => {
      const updated = [newJob, ...prev];
      localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });

    setActiveJob(newJob);
    return newJob;
  };

  const updateJob = (id: string, updates: Partial<ImageJob>) => {
    setJobs((prev) => {
      const updated = prev.map((job) => (job.id === id ? { ...job, ...updates } : job));
      localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });

    if (activeJob?.id === id) {
      setActiveJob((prev) => (prev ? { ...prev, ...updates } : null));
    }
  };

  const deleteJob = (id: string) => {
    setJobs((prev) => {
      const updated = prev.filter((j) => j.id !== id);
      localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });

    if (activeJob?.id === id) {
      setActiveJob(null);
    }
    showToast('Image Deleted', 'The image record has been removed.', 'info');
  };

  const getJobById = (id: string) => jobs.find((j) => j.id === id);

  return (
    <ImageJobContext.Provider
      value={{
        jobs,
        activeJob,
        setActiveJob,
        createJob,
        updateJob,
        deleteJob,
        getJobById,
      }}
    >
      {children}
    </ImageJobContext.Provider>
  );
};

export const useImageJobs = () => {
  const context = useContext(ImageJobContext);
  if (!context) throw new Error('useImageJobs must be used within ImageJobProvider');
  return context;
};
