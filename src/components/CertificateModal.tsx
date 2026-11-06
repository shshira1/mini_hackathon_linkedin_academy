import React, { useState } from 'react';
import {
  X,
  Award,
  Download,
  Share2,
  Check,
  Copy,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  BookmarkCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/sound';

interface CertificateModalProps {
  onClose: () => void;
  studentName?: string;
  issueDate?: string;
  certificateId?: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  onClose,
  studentName = 'Alex Chen',
  issueDate = 'November 2026',
  certificateId = 'LIA-2026-89421',
}) => {
  const [copiedId, setCopiedId] = useState(false);
  const [addedToProfile, setAddedToProfile] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleCopyId = () => {
    sounds.playTap();
    navigator.clipboard.writeText(certificateId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleAddToLinkedIn = () => {
    sounds.playFanfare();
    confetti({
      particleCount: 80,
      spread: 65,
      origin: { y: 0.6 },
    });
    setAddedToProfile(true);
  };

  const handleDownload = () => {
    sounds.playTap();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full my-auto shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-[#0a66c2] text-white font-black px-1.5 py-0.5 rounded text-xs">
              in
            </span>
            <span className="font-extrabold text-sm tracking-tight">
              Official Credential Verification
            </span>
          </div>
          <button
            onClick={() => {
              sounds.playTap();
              onClose();
            }}
            className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Parchment Document */}
        <div className="p-5 sm:p-7 bg-slate-50">
          <div
            id="certificate-printable"
            className="bg-white rounded-2xl p-6 sm:p-8 border-4 border-double border-amber-200 shadow-lg relative overflow-hidden text-center"
          >
            {/* Watermark Crest */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
              <span className="text-[180px] font-black text-[#0a66c2]">in</span>
            </div>

            {/* Corner Decorative Ornaments */}
            <div className="absolute top-2 left-2 text-amber-400 text-xs">❖</div>
            <div className="absolute top-2 right-2 text-amber-400 text-xs">❖</div>
            <div className="absolute bottom-2 left-2 text-amber-400 text-xs">❖</div>
            <div className="absolute bottom-2 right-2 text-amber-400 text-xs">❖</div>

            {/* LinkedIn Academy Ribbon */}
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="bg-[#0a66c2] text-white font-black px-2 py-0.5 rounded text-xs tracking-tight">
                in
              </span>
              <span className="text-xs font-black uppercase tracking-widest text-[#004182]">
                LinkedIn Academy
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase">
              Certificate of Completion
            </h1>

            <p className="text-[11px] uppercase tracking-widest text-amber-600 font-extrabold mt-0.5">
              Collegiate Professional Career Readiness
            </p>

            <div className="w-24 h-0.5 bg-amber-300 mx-auto my-3" />

            <p className="text-xs text-slate-500 font-medium italic">
              This is to officially certify that
            </p>

            {/* Student Name */}
            <h2 className="text-2xl sm:text-3xl font-black text-[#004182] my-2 tracking-tight underline decoration-amber-400 decoration-2 underline-offset-4 font-serif">
              {studentName}
            </h2>

            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed font-medium">
              has successfully completed all 6 Core Curriculum micro-lessons, demonstrating proficiency in LinkedIn profile keyword strategy, alumni outreach, career fair follow-ups, and project storytelling.
            </p>

            {/* Skills Badges Grid */}
            <div className="flex flex-wrap justify-center gap-1.5 my-4">
              {[
                'Search-Optimized Headline',
                'About Narrative Hook',
                'Cold Alumni Outreach',
                'Booth Follow-Up Protocol',
                'High-ROI Commenting',
                'Class Project PAR Framework',
              ].map((skill, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-bold bg-blue-50 text-[#004182] border border-blue-200/80 px-2 py-0.5 rounded-full"
                >
                  ✓ {skill}
                </span>
              ))}
            </div>

            {/* Footer with Seal and Signatures */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-end justify-between px-2 text-left">
              {/* Date & ID */}
              <div className="text-[10px] text-slate-500 space-y-0.5">
                <p>
                  <strong className="text-slate-700">Issued:</strong> {issueDate}
                </p>
                <p>
                  <strong className="text-slate-700">Credential ID:</strong> {certificateId}
                </p>
                <div className="flex items-center gap-1 text-emerald-600 font-bold text-[10px]">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified by LinkedIn Academy
                </div>
              </div>

              {/* Gold Official Seal */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-linear-to-tr from-amber-400 via-amber-300 to-yellow-200 border-2 border-amber-500 flex flex-col items-center justify-center text-amber-950 shadow-md transform rotate-[-8deg] shrink-0">
                <span className="text-[16px]">★</span>
                <span className="text-[8px] font-black uppercase tracking-tight -mt-0.5">
                  OFFICIAL
                </span>
                <span className="text-[7px] font-bold">SEAL</span>
              </div>

              {/* Signature */}
              <div className="text-right text-[10px] text-slate-500">
                <div className="font-serif italic text-xs font-bold text-slate-800 -mb-0.5">
                  Sarah Jenkins
                </div>
                <div className="w-20 border-b border-slate-400 ml-auto mb-1" />
                <p className="font-bold text-slate-700">VP, Student Career Success</p>
                <p className="text-[9px]">LinkedIn Academy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="p-4 sm:p-5 bg-white border-t border-slate-200 space-y-3">
          {addedToProfile ? (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Credential added to your simulated LinkedIn Profile & Drafts!</span>
            </div>
          ) : (
            <button
              onClick={handleAddToLinkedIn}
              className="w-full py-3.5 rounded-2xl text-white font-extrabold text-sm btn-3d-blue flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <BookmarkCheck className="w-4 h-4" />
              <span>Add Credential to My LinkedIn Profile</span>
            </button>
          )}

          <div className="flex gap-2">
            <button
              onClick={handleCopyId}
              className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedId ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">ID Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Credential ID</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloadSuccess ? 'Preparing Print...' : 'Download / Print'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
