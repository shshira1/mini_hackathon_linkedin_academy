import React, { useState } from 'react';
import {
  Flame,
  Zap,
  Award,
  Check,
  Copy,
  ExternalLink,
  BookOpen,
  Sparkles,
  Share2,
  CheckCircle2,
  Building,
  GraduationCap,
  MapPin,
} from 'lucide-react';
import { SavedItem, Badge } from '../types';
import { sounds } from '../utils/sound';

interface ProfileViewProps {
  streak: number;
  xp: number;
  completedLessonsCount: number;
  totalLessonsCount: number;
  savedItems: SavedItem[];
  badges: Badge[];
  onOpenCertificate: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  streak,
  xp,
  completedLessonsCount,
  totalLessonsCount,
  savedItems,
  badges,
  onOpenCertificate,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedItemTab, setSelectedItemTab] = useState<'all' | 'profile' | 'messages'>('all');

  const handleUseOnProfile = (item: SavedItem) => {
    sounds.playTap();
    const textToCopy = item.improvedContent || item.content;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(item.id);
    setToastMessage(`Copied "${item.title}" to clipboard! Paste it into LinkedIn.`);

    setTimeout(() => {
      setCopiedId(null);
      setToastMessage(null);
    }, 3000);
  };

  const filteredItems = savedItems.filter((item) => {
    if (selectedItemTab === 'profile') {
      return item.category === 'headline' || item.category === 'about';
    }
    if (selectedItemTab === 'messages') {
      return (
        item.category === 'connection' ||
        item.category === 'followup' ||
        item.category === 'comment' ||
        item.category === 'project'
      );
    }
    return true;
  });

  const activeHeadline = savedItems.find((i) => i.category === 'headline');
  const activeAbout = savedItems.find((i) => i.category === 'about');

  return (
    <div className="pb-28 pt-2 max-w-md mx-auto px-4">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-top-2 border border-slate-700 max-w-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Simulated LinkedIn Profile Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-6">
        {/* Banner image */}
        <div className="h-20 bg-linear-to-r from-[#004182] via-[#0a66c2] to-sky-600 relative">
          <div className="absolute top-2 right-2 bg-black/30 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <span>Student Profile</span>
          </div>
        </div>

        {/* Profile Info */}
        <div className="px-5 pb-5 pt-0 relative">
          {/* Avatar with #OpenToWork ring */}
          <div className="relative -mt-10 mb-3 flex items-end justify-between">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80"
                alt="Alex Chen"
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md ring-3 ring-emerald-500"
              />
              <span className="absolute bottom-0 right-0 bg-emerald-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full border border-white">
                OPEN
              </span>
            </div>

            <div className="flex gap-1.5">
              <span className="text-[11px] font-bold bg-blue-50 text-[#0a66c2] px-2.5 py-1 rounded-full border border-blue-200">
                Class of 2027
              </span>
            </div>
          </div>

          <h1 className="text-xl font-black text-slate-900">Alex Chen</h1>
          <p className="text-xs text-slate-700 font-semibold leading-relaxed mt-1">
            {activeHeadline
              ? activeHeadline.improvedContent || activeHeadline.content
              : 'Sophomore Business & Communications Major | Digital Marketing & Project Management | Seeking Summer 2027 Internships'}
          </p>

          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 font-medium mt-2 pt-2 border-t border-slate-100">
            <span className="flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-slate-400" /> State University
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" /> Greater Metro Area
            </span>
            <span className="text-[#0a66c2] font-bold">500+ Connections</span>
          </div>
        </div>
      </div>

      {/* Gamification Stats Grid */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        <div className="bg-white p-3 rounded-2xl border border-slate-200 text-center shadow-xs">
          <div className="flex items-center justify-center text-amber-500 mb-1">
            <Flame className="w-4 h-4 fill-amber-500" />
          </div>
          <p className="text-base font-black text-slate-800">{streak}d</p>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">
            Streak
          </span>
        </div>

        <div className="bg-white p-3 rounded-2xl border border-slate-200 text-center shadow-xs">
          <div className="flex items-center justify-center text-[#0a66c2] mb-1">
            <Zap className="w-4 h-4 fill-[#0a66c2]" />
          </div>
          <p className="text-base font-black text-slate-800">{xp}</p>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">
            Total XP
          </span>
        </div>

        <div className="bg-white p-3 rounded-2xl border border-slate-200 text-center shadow-xs">
          <div className="flex items-center justify-center text-emerald-600 mb-1">
            <BookOpen className="w-4 h-4" />
          </div>
          <p className="text-base font-black text-slate-800">
            {completedLessonsCount}/{totalLessonsCount}
          </p>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">
            Lessons
          </span>
        </div>

        <div className="bg-white p-3 rounded-2xl border border-slate-200 text-center shadow-xs">
          <div className="flex items-center justify-center text-purple-600 mb-1">
            <Award className="w-4 h-4" />
          </div>
          <p className="text-base font-black text-slate-800">
            {badges.filter((b) => b.earned).length}/{badges.length}
          </p>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">
            Badges
          </span>
        </div>
      </div>

      {/* LICENSES & CERTIFICATIONS SECTION */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500" />
            Licenses & Certifications
          </h2>
          <span className="text-[11px] font-bold text-slate-500">
            {completedLessonsCount >= totalLessonsCount ? '1 Credential' : '1 Pending'}
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:border-blue-300 transition-all">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl bg-linear-to-tr from-amber-400 to-amber-300 text-amber-950 flex items-center justify-center font-black text-lg shadow-xs shrink-0">
              🎓
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <h3 className="text-xs sm:text-sm font-black text-slate-900 truncate">
                  Collegiate Career Readiness Certificate
                </h3>
                {completedLessonsCount >= totalLessonsCount ? (
                  <span className="text-[10px] font-black bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                    Verified
                  </span>
                ) : (
                  <span className="text-[10px] font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200 shrink-0">
                    {completedLessonsCount}/6 Lessons
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 font-semibold mt-0.5">
                LinkedIn Academy • Issued Nov 2026
              </p>
              <p className="text-[11px] text-slate-400 font-medium">
                Credential ID: LIA-2026-89421
              </p>

              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={() => {
                    sounds.playTap();
                    onOpenCertificate();
                  }}
                  className="py-1.5 px-3.5 rounded-xl font-bold text-xs bg-blue-50 text-[#0a66c2] hover:bg-blue-100 border border-blue-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>
                    {completedLessonsCount >= totalLessonsCount
                      ? 'Show Credential'
                      : 'Preview Certificate'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* "ADDED TO YOUR LINKEDIN" Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-1.5">
              <span className="bg-[#0a66c2] text-white p-1 rounded-lg text-xs font-black">in</span>
              Added to your LinkedIn
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Drafts and copy generated during your practice sessions.
            </p>
          </div>
          <span className="text-xs font-bold bg-blue-50 text-[#0a66c2] px-2 py-0.5 rounded-full border border-blue-200">
            {savedItems.length} Saved
          </span>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1.5 mb-3.5 bg-slate-200/70 p-1 rounded-xl">
          <button
            onClick={() => {
              sounds.playTap();
              setSelectedItemTab('all');
            }}
            className={`flex-1 py-1 rounded-lg text-xs font-bold transition-all ${
              selectedItemTab === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            All Items
          </button>
          <button
            onClick={() => {
              sounds.playTap();
              setSelectedItemTab('profile');
            }}
            className={`flex-1 py-1 rounded-lg text-xs font-bold transition-all ${
              selectedItemTab === 'profile' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            Headline & About
          </button>
          <button
            onClick={() => {
              sounds.playTap();
              setSelectedItemTab('messages');
            }}
            className={`flex-1 py-1 rounded-lg text-xs font-bold transition-all ${
              selectedItemTab === 'messages' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            Notes & Posts
          </button>
        </div>

        {/* Saved Cards List */}
        <div className="space-y-3.5">
          {filteredItems.map((item) => {
            const isCopied = copiedId === item.id;

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:border-blue-200 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-slate-900">{item.title}</span>
                    <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                      Score: {item.score}/10
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold">{item.createdAt}</span>
                </div>

                {/* Draft Content Preview */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-xs text-slate-800 font-medium whitespace-pre-line leading-relaxed">
                  {item.improvedContent || item.content}
                </div>

                {/* Action button: "Use on my profile" */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => handleUseOnProfile(item)}
                    className="flex-1 py-2.5 px-4 rounded-xl font-extrabold text-xs text-white btn-3d-blue flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xs"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Use on my profile</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}

          {filteredItems.length === 0 && (
            <div className="bg-slate-50 rounded-2xl p-6 text-center border border-dashed border-slate-200">
              <p className="text-xs text-slate-500 font-semibold">
                No items in this category yet. Complete more lessons on your course path to add them!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Badges Earned Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-1.5">
            <Award className="w-4 h-4 text-purple-600" />
            Badges Earned
          </h2>
          <span className="text-xs font-bold text-slate-400">
            {badges.filter((b) => b.earned).length} of {badges.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-3.5 rounded-2xl border transition-all ${
                badge.earned
                  ? 'bg-white border-slate-200 shadow-xs'
                  : 'bg-slate-100/60 border-dashed border-slate-300 opacity-60'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs ${
                    badge.earned
                      ? 'bg-purple-100 text-purple-700 font-black'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  {badge.earned ? '🏆' : '🔒'}
                </div>
                <h4 className="text-xs font-black text-slate-800 truncate">{badge.name}</h4>
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-tight">
                {badge.description}
              </p>
              {badge.earned && badge.unlockedAt && (
                <span className="inline-block mt-2 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                  Unlocked {badge.unlockedAt}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
