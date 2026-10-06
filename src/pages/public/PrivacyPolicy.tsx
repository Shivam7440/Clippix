import React from 'react';
import { ShieldCheck, Lock, Eye, FileText, Database, Server } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="border-b border-[#27272A] pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/30 text-xs font-bold text-[#A78BFA]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#22D3EE]" />
          <span>Legal & Compliance</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">Privacy Policy</h1>
        <p className="text-xs text-[#A1A1AA]">
          Last Updated: September 23, 2026 | Trade Name: <strong className="text-white">Clippix AI Technologies</strong>
        </p>
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
        <section className="space-y-3 bg-[#18181B] p-6 rounded-2xl border border-[#27272A]">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#A78BFA]" />
            1. Introduction & Overview
          </h2>
          <p>
            Clippix AI Technologies ("Clippix", "We", "Us", or "Our") respects your privacy and is committed to protecting your personal data and uploaded image assets. This Privacy Policy outlines how we collect, process, store, and safeguard information when you use our website at <a href="https://clippix.ai" className="text-[#22D3EE] underline">https://clippix.ai</a> and our AI background removal SaaS platform.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-[#22D3EE]" />
            2. Information We Collect
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-white">Account & Contact Information:</strong> Name, email address, password hashes, and profile preferences collected during signup.
            </li>
            <li>
              <strong className="text-white">Uploaded Image Data:</strong> Image files (PNG, JPG, JPEG, WEBP) uploaded to our background removal workspace. Uploaded images are processed solely for edge detection and background removal.
            </li>
            <li>
              <strong className="text-white">Payment & Subscription Data:</strong> Payment details are processed securely through our payment gateway partner <strong className="text-white">Razorpay</strong>. We do not store raw credit card numbers or UPI PINs on our servers. Razorpay processes transactions in compliance with PCI-DSS standards.
            </li>
            <li>
              <strong className="text-white">Technical Log Data:</strong> IP addresses, browser types, device information, and usage metrics for performance monitoring and security auditing.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Server className="w-4 h-4 text-[#3B82F6]" />
            3. Image Asset Retention & Automatic Cleanup
          </h2>
          <p>
            Your uploaded photos and generated background cutouts are stored in encrypted cloud storage (Cloudinary & Supabase) for your convenience. Images are retained based on your active plan tier (7 days for Free tier, 30 days for Pro tier, unlimited for Business tier) after which they are permanently purged from server storage.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#A78BFA]" />
            4. Data Sharing & Third-Party Services
          </h2>
          <p>
            We do not sell, rent, or trade your personal information or uploaded images to third parties. We share data only with trusted service providers necessary to operate our platform:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong className="text-white">Razorpay Payments:</strong> For order creation, subscription processing, and billing verification.</li>
            <li><strong className="text-white">Cloudinary & Supabase:</strong> For secure CDN asset delivery and user session database storage.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#22D3EE]" />
            5. Contact Information for Privacy Inquiries
          </h2>
          <p>
            If you have questions regarding this Privacy Policy or wish to exercise your data deletion rights, please contact our Data Protection Officer at:
          </p>
          <div className="p-4 rounded-xl bg-[#09090B] border border-[#27272A] space-y-1 text-xs">
            <p><strong className="text-white">Trade Name:</strong> Clippix AI Technologies</p>
            <p><strong className="text-white">Email:</strong> privacy@clippix.ai / support@clippix.ai</p>
            <p><strong className="text-white">Address:</strong> Clippix AI Technologies Pvt Ltd, 4th Floor, Tech Hub Tower, Outer Ring Road, Bellandur, Bengaluru, Karnataka - 560103, India</p>
          </div>
        </section>
      </div>
    </div>
  );
};
