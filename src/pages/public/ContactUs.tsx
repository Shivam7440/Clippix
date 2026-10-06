import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Building2, Send, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const ContactUs: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Message Sent', 'Thank you for reaching out. Our support team will respond within 24 hours.', 'success');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/30 text-xs font-bold text-[#A78BFA]">
          <Building2 className="w-3.5 h-3.5 text-[#22D3EE]" />
          <span>Razorpay Merchant Contact Info</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">Contact Us</h1>
        <p className="text-xs sm:text-sm text-[#A1A1AA]">
          Have questions about Clippix subscriptions, billing, or technical features? We are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Official Business Details */}
        <div className="lg:col-span-5 rounded-3xl p-6 sm:p-8 bg-[#18181B] border border-[#27272A] space-y-6 shadow-2xl">
          <h2 className="text-lg font-bold text-white border-b border-[#27272A] pb-3">
            Business Details
          </h2>

          <div className="space-y-5 text-xs sm:text-sm">
            <div className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-[#A78BFA] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-[#71717A] uppercase font-bold block">Trade Name</span>
                <span className="text-white font-bold">Clippix AI Technologies</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-[#22D3EE] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-[#71717A] uppercase font-bold block">Email Us</span>
                <a href="mailto:support@clippix.ai" className="text-white font-semibold hover:underline block">
                  support@clippix.ai
                </a>
                <a href="mailto:contact@clippix.ai" className="text-[#A1A1AA] hover:underline block text-xs">
                  contact@clippix.ai
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-[#3B82F6] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-[#71717A] uppercase font-bold block">Phone Number</span>
                <span className="text-white font-bold">+91 98765 43210</span>
                <span className="text-[#A1A1AA] block text-xs">+91 80 4567 8900</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-[#71717A] uppercase font-bold block">Registered Office Address</span>
                <p className="text-[#F4F4F5] leading-relaxed">
                  Clippix AI Technologies Pvt Ltd,<br />
                  4th Floor, Tech Hub Tower, Outer Ring Road,<br />
                  Bellandur, Bengaluru, Karnataka - 560103, India
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-[#71717A] uppercase font-bold block">Operating Hours</span>
                <span className="text-white font-semibold">Monday – Friday: 9:00 AM – 6:00 PM IST</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 rounded-3xl p-6 sm:p-8 bg-[#18181B] border border-[#27272A] space-y-6 shadow-2xl">
          <h2 className="text-lg font-bold text-white border-b border-[#27272A] pb-3">
            Send Us a Message
          </h2>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-[#09090B] border border-emerald-500/40 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-bold text-white">Message Received!</h3>
              <p className="text-xs text-[#A1A1AA] max-w-sm mx-auto">
                Thank you for contacting Clippix AI Technologies. Our support team will review your message and reply via email within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#27272A] hover:bg-[#3F3F46]"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#A1A1AA]">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Rahul Sharma"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#09090B] border border-[#27272A] text-white text-xs focus:border-[#7C3AED]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#A1A1AA]">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rahul@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#09090B] border border-[#27272A] text-white text-xs focus:border-[#7C3AED]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#A1A1AA]">Subject</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Subscription query / Technical support"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#09090B] border border-[#27272A] text-white text-xs focus:border-[#7C3AED]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#A1A1AA]">Message</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you?"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#09090B] border border-[#27272A] text-white text-xs focus:border-[#7C3AED]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:from-[#6D28D9] hover:to-[#2563EB] shadow-[0_0_20px_rgba(124,58,237,0.35)] transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Submit Inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
