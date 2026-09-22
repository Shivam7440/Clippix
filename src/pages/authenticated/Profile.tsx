import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/Modal';
import { User, Mail, Shield, AlertTriangle, Key, LogOut, Check } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

export const Profile: React.FC = () => {
  const { user, updateProfile, logout } = useAuth();
  const { showToast } = useToast();

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ fullName, avatarUrl });
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPass || !newPass) {
      showToast('Validation Error', 'Please fill out password fields.', 'warning');
      return;
    }
    showToast('Password Updated', 'Your password has been changed successfully.', 'success');
    setCurrentPass('');
    setNewPass('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-20">
      {/* Header */}
      <div className="border-b border-[#27272A] pb-6">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">Profile & Account Settings</h1>
        <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1">
          Manage your personal details, subscription plan, and security credentials.
        </p>
      </div>

      {/* Section 1: Personal Information */}
      <div className="rounded-3xl p-6 sm:p-8 bg-[#18181B] border border-[#27272A] space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <User className="w-5 h-5 text-[#A78BFA]" />
          Personal Information
        </h2>

        <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-xl">
          <div className="flex items-center gap-4">
            <img
              src={avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
              alt={user?.fullName}
              className="w-16 h-16 rounded-full object-cover ring-4 ring-[#7C3AED]/30"
            />
            <div className="space-y-1 flex-1">
              <label className="text-xs font-semibold text-[#A1A1AA]">Avatar Image URL</label>
              <input
                type="text"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#09090B] border border-[#27272A] text-white text-xs focus:border-[#7C3AED]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#A1A1AA]">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#09090B] border border-[#27272A] text-white text-xs focus:border-[#7C3AED]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#A1A1AA]">Email Address</label>
            <input
              type="email"
              disabled
              value={user?.email || ''}
              className="w-full px-4 py-2.5 rounded-xl bg-[#09090B] border border-[#27272A] text-[#71717A] text-xs cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:scale-105 transition-transform"
          >
            Save Personal Info
          </button>
        </form>
      </div>

      {/* Section 2: Account Overview */}
      <div className="rounded-3xl p-6 sm:p-8 bg-[#18181B] border border-[#27272A] space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#22D3EE]" />
          Account & Subscription Overview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#09090B] border border-[#27272A]">
            <span className="text-[#A1A1AA]">Current Plan</span>
            <p className="text-sm font-bold text-white uppercase mt-1">{user?.plan}</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#09090B] border border-[#27272A]">
            <span className="text-[#A1A1AA]">Credits Remaining</span>
            <p className="text-sm font-bold text-[#A78BFA] mt-1">{user?.credits} Credits</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#09090B] border border-[#27272A]">
            <span className="text-[#A1A1AA]">Member Since</span>
            <p className="text-sm font-bold text-white mt-1">
              {user?.createdAt ? formatDate(user.createdAt) : '2026'}
            </p>
          </div>
        </div>
      </div>

      {/* Section 3: Security */}
      <div className="rounded-3xl p-6 sm:p-8 bg-[#18181B] border border-[#27272A] space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Key className="w-5 h-5 text-[#3B82F6]" />
          Security Credentials
        </h2>

        <form onSubmit={handleChangePassword} className="space-y-4 max-w-xl">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#A1A1AA]">Current Password</label>
            <input
              type="password"
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl bg-[#09090B] border border-[#27272A] text-white text-xs focus:border-[#7C3AED]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#A1A1AA]">New Password</label>
            <input
              type="password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl bg-[#09090B] border border-[#27272A] text-white text-xs focus:border-[#7C3AED]"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl font-semibold text-xs text-white bg-[#09090B] border border-[#27272A] hover:bg-[#27272A] transition-colors"
          >
            Update Password
          </button>
        </form>
      </div>

      {/* Danger Zone */}
      <div className="rounded-3xl p-6 sm:p-8 bg-[#18181B] border border-rose-500/40 space-y-4">
        <h2 className="text-lg font-bold text-rose-400 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Danger Zone
        </h2>
        <p className="text-xs text-[#A1A1AA]">
          Permanently delete your account, saved images, and credit balance. This action cannot be undone.
        </p>
        <button
          onClick={() => setDeleteModalOpen(true)}
          className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-rose-600 hover:bg-rose-700 transition-colors"
        >
          Delete Account
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Confirm Account Deletion">
        <div className="space-y-4">
          <p className="text-xs text-[#A1A1AA] leading-relaxed">
            Are you sure you want to delete your Clippix account? All your background removal history, remaining credits, and saved files will be permanently erased.
          </p>
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#27272A]">
            <button
              onClick={() => setDeleteModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#A1A1AA] hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setDeleteModalOpen(false);
                logout();
                showToast('Account Deleted', 'Your account has been deleted.', 'info');
              }}
              className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-rose-600 hover:bg-rose-700"
            >
              Permanently Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
