import React, { useState } from 'react';
import {
  Check,
  Lock,
  Sparkles,
  BookOpen,
  Send,
  MailCheck,
  MessageSquareText,
  Presentation,
  Gift,
  HelpCircle,
  Play,
  RotateCcw,
  Award,
  GraduationCap,
  ChevronRight,
} from 'lucide-react';
import { Lesson } from '../types';
import { sounds } from '../utils/sound';

interface HomePathProps {
  lessons: Lesson[];
  completedLessonIds: string[];
  currentLessonId: string;
  onSelectLesson: (lesson: Lesson) => void;
  onOpenChest: () => void;
  chestClaimed: boolean;
  onOpenCertificate: () => void;
}

const getLessonIcon = (iconName: string) => {
  switch (iconName) {
    case 'Sparkles':
      return Sparkles;
    case 'UserCheck':
      return BookOpen;
    case 'Send':
      return Send;
    case 'MailCheck':
      return MailCheck;
    case 'MessageSquareText':
      return MessageSquareText;
    case 'Presentation':
      return Presentation;
    default:
      return Sparkles;
  }
};

export const HomePath: React.FC<HomePathProps> = ({
  lessons,
  completedLessonIds,
  currentLessonId,
  onSelectLesson,
  onOpenChest,
  chestClaimed,
  onOpenCertificate,
}) => {
  const [selectedReviewLesson, setSelectedReviewLesson] = useState<Lesson | null>(null);

  const allBaseCompleted = completedLessonIds.length >= lessons.length;

  // Group lessons by unit
  const units = [
    {
      id: 1,
      title: 'Unit 1: Build Your Profile',
      subtitle: 'Stand out in recruiter searches & tell your story',
      color: 'bg-linear-to-r from-[#0a66c2] to-sky-600',
      badge: 'Foundation',
      lessons: lessons.filter((l) => l.unitId === 1),
    },
    {
      id: 2,
      title: 'Unit 2: Networking',
      subtitle: 'Alumni outreach & high-impact follow-ups',
      color: 'bg-linear-to-r from-indigo-600 to-[#0a66c2]',
      badge: 'High Response',
      lessons: lessons.filter((l) => l.unitId === 2),
    },
    {
      id: 3,
      title: 'Unit 3: Posting & Commenting',
      subtitle: 'Thought leadership & showcasing campus projects',
      color: 'bg-linear-to-r from-blue-700 to-cyan-700',
      badge: 'Visibility',
      lessons: lessons.filter((l) => l.unitId === 3),
    },
  ];

  // Alternating offsets for Duolingo snake effect: center -> right -> left -> center
  const getOffsetClass = (index: number) => {
    const mod = index % 4;
    if (mod === 0) return 'translate-x-0';
    if (mod === 1) return 'translate-x-12 sm:translate-x-16';
    if (mod === 2) return '-translate-x-12 sm:-translate-x-16';
    return 'translate-x-0';
  };

  return (
    <div className="pb-28 pt-2 max-w-md mx-auto px-4">
      {/* College Student Encouragement Banner */}
      <div className="mb-6 bg-linear-to-br from-blue-50 to-indigo-50 border border-blue-200/80 rounded-2xl p-4 shadow-xs relative overflow-hidden">
        <div className="flex items-start gap-3 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-[#0a66c2] text-white flex items-center justify-center font-black text-xl shadow-md shrink-0">
            🦉
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                Coach Inky says
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
            </div>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              &ldquo;Alumni love helping undergrads—they were once in your shoes! Complete Lesson 3 to master the 300-character cold note.&rdquo;
            </p>
          </div>
        </div>
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-blue-200/40 rounded-full blur-xl pointer-events-none" />
      </div>

      {/* Render Units and Lessons */}
      {units.map((unit, unitIdx) => {
        const completedCount = unit.lessons.filter((l) =>
          completedLessonIds.includes(l.id)
        ).length;
        const totalCount = unit.lessons.length;
        const isUnitCompleted = completedCount === totalCount;
        const isUnitActive =
          !isUnitCompleted &&
          unit.lessons.some((l) => l.id === currentLessonId || completedLessonIds.includes(l.id));

        return (
          <div key={unit.id} className="mb-10">
            {/* Unit Header Card */}
            <div
              className={`rounded-2xl p-4 mb-8 text-white shadow-md ${unit.color} relative overflow-hidden`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-xs">
                  {unit.badge}
                </span>
                <span className="text-xs font-bold text-white/90">
                  {completedCount}/{totalCount} Completed
                </span>
              </div>
              <h2 className="text-base font-extrabold tracking-tight">{unit.title}</h2>
              <p className="text-xs text-blue-100 font-medium mt-0.5">{unit.subtitle}</p>

              {/* Progress bar inside unit */}
              <div className="w-full bg-black/20 h-2 rounded-full mt-3 overflow-hidden">
                <div
                  className="bg-white h-full rounded-full transition-all duration-500"
                  style={{ width: `${(completedCount / totalCount) * 100}%` }}
                />
              </div>
            </div>

            {/* Path Nodes */}
            <div className="relative flex flex-col items-center space-y-7">
              {unit.lessons.map((lesson, lessonIdx) => {
                const isCompleted = completedLessonIds.includes(lesson.id);
                const isCurrent = lesson.id === currentLessonId;
                const isLocked = !isCompleted && !isCurrent;
                const IconComponent = getLessonIcon(lesson.icon);
                const offsetClass = getOffsetClass(lessonIdx);

                return (
                  <div
                    key={lesson.id}
                    className={`relative flex flex-col items-center transition-transform duration-200 ${offsetClass}`}
                  >
                    {/* Bouncing "START" speech bubble above current active lesson */}
                    {isCurrent && (
                      <div className="absolute -top-11 z-20 animate-bounce">
                        <div className="bg-[#0a66c2] text-white text-[11px] font-black px-3 py-1 rounded-full shadow-lg border-2 border-white flex items-center gap-1">
                          <Play className="w-3 h-3 fill-white" />
                          <span>START</span>
                        </div>
                        <div className="w-2.5 h-2.5 bg-[#0a66c2] rotate-45 mx-auto -mt-1.5 border-r border-b border-white" />
                      </div>
                    )}

                    {/* Lesson Button Bubble */}
                    <button
                      onClick={() => {
                        sounds.playTap();
                        if (isCurrent) {
                          onSelectLesson(lesson);
                        } else if (isCompleted) {
                          setSelectedReviewLesson(lesson);
                        }
                      }}
                      disabled={isLocked}
                      className={`group relative w-18 h-18 sm:w-20 sm:h-20 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                        isCompleted
                          ? 'bg-emerald-600 hover:bg-emerald-500 shadow-[0_6px_0_#047857] active:translate-y-1 active:shadow-[0_2px_0_#047857]'
                          : isCurrent
                          ? 'bg-[#0a66c2] hover:bg-[#0052a3] shadow-[0_6px_0_#004182] ring-4 ring-blue-300 ring-offset-2 active:translate-y-1 active:shadow-[0_2px_0_#004182]'
                          : 'bg-slate-200 text-slate-400 shadow-[0_5px_0_#cbd5e1] cursor-not-allowed opacity-80'
                      }`}
                    >
                      {/* Inside Icon */}
                      {isCompleted ? (
                        <div className="flex flex-col items-center">
                          <Check className="w-8 h-8 text-white stroke-[3.5]" />
                        </div>
                      ) : isCurrent ? (
                        <div className="flex flex-col items-center">
                          <IconComponent className="w-7 h-7 text-white stroke-[2.5] drop-shadow-sm group-hover:scale-110 transition-transform" />
                        </div>
                      ) : (
                        <Lock className="w-6 h-6 text-slate-400 stroke-[2.5]" />
                      )}

                      {/* Completed Star Crown */}
                      {isCompleted && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 border-2 border-white rounded-full flex items-center justify-center text-[10px] font-black text-amber-950 shadow-xs">
                          ★
                        </div>
                      )}
                    </button>

                    {/* Lesson Title label */}
                    <div className="mt-2 text-center max-w-[140px]">
                      <p
                        className={`text-xs font-extrabold tracking-tight leading-tight ${
                          isCurrent
                            ? 'text-[#0a66c2]'
                            : isCompleted
                            ? 'text-slate-800'
                            : 'text-slate-400'
                        }`}
                      >
                        {lesson.shortTitle}
                      </p>
                      <span className="text-[10px] text-slate-400 font-semibold">
                        +{lesson.xpReward} XP
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Treasure Chest between Unit 1 and Unit 2 */}
            {unit.id === 1 && (
              <div className="mt-8 mb-4 flex flex-col items-center">
                <button
                  onClick={() => {
                    sounds.playTap();
                    onOpenChest();
                  }}
                  className={`p-3.5 rounded-2xl flex items-center gap-3 transition-all cursor-pointer ${
                    chestClaimed
                      ? 'bg-slate-100 border border-slate-200 opacity-70'
                      : 'bg-amber-50 hover:bg-amber-100 border-2 border-amber-300 shadow-md active:scale-95 animate-pulse'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      chestClaimed ? 'bg-slate-300 text-slate-600' : 'bg-amber-400 text-amber-950'
                    }`}
                  >
                    <Gift className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-extrabold text-slate-800">
                      {chestClaimed ? 'Treasure Claimed!' : 'Campus Milestone Chest'}
                    </p>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {chestClaimed ? 'Claimed +15 XP bonus' : 'Tap to open +15 XP reward'}
                    </p>
                  </div>
                </button>
              </div>
            )}
          </div>
        );
      })}

      {/* CAPSTONE CERTIFICATE MILESTONE NODE */}
      <div className="mt-4 mb-10 text-center">
        <div className="relative inline-block">
          {allBaseCompleted && (
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-20 animate-bounce whitespace-nowrap">
              <div className="bg-amber-500 text-amber-950 text-[11px] font-black px-3.5 py-1 rounded-full shadow-lg border-2 border-white flex items-center gap-1">
                <span>🎓 CLAIM CERTIFICATE</span>
              </div>
              <div className="w-2.5 h-2.5 bg-amber-500 rotate-45 mx-auto -mt-1.5 border-r border-b border-white" />
            </div>
          )}

          <button
            onClick={() => {
              sounds.playTap();
              onOpenCertificate();
            }}
            className={`w-24 h-24 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all ${
              allBaseCompleted
                ? 'bg-linear-to-tr from-amber-400 via-amber-300 to-yellow-200 text-amber-950 shadow-[0_8px_0_#b45309] ring-4 ring-amber-300 ring-offset-2 active:translate-y-1 active:shadow-[0_2px_0_#b45309] animate-pulse'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-500 border-4 border-dashed border-amber-300 shadow-sm'
            }`}
          >
            <GraduationCap
              className={`w-10 h-10 ${allBaseCompleted ? 'text-amber-950' : 'text-amber-500'}`}
            />
            <span className="text-[10px] font-black mt-0.5">
              {allBaseCompleted ? 'VERIFIED' : 'CAPSTONE'}
            </span>
          </button>
        </div>

        <div className="mt-3 max-w-xs mx-auto">
          <h3 className="text-sm font-black text-slate-900 flex items-center justify-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500" />
            LinkedIn Academy Certification
          </h3>
          <p className="text-xs text-slate-600 mt-1 font-medium">
            {allBaseCompleted
              ? 'Congratulations! You unlocked the verified Certificate of Career Readiness.'
              : `Complete all 6 base lessons to unlock your official credential (${completedLessonIds.length}/6 completed).`}
          </p>
          <button
            onClick={() => {
              sounds.playTap();
              onOpenCertificate();
            }}
            className={`mt-2.5 px-4 py-1.5 rounded-full text-xs font-extrabold cursor-pointer transition-all ${
              allBaseCompleted
                ? 'btn-3d-amber text-amber-950 shadow-md'
                : 'bg-blue-50 text-[#0a66c2] hover:bg-blue-100 border border-blue-200'
            }`}
          >
            {allBaseCompleted ? 'View & Add to LinkedIn Profile' : 'Preview Credential Certificate'}
          </button>
        </div>
      </div>

      {/* UPCOMING ADVANCED LESSONS TEASER */}
      <div className="mt-8 pt-6 border-t border-slate-200">
        <div className="bg-linear-to-r from-slate-800 to-slate-900 rounded-3xl p-5 text-white shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded-full text-sky-300 border border-white/10">
              Further Lessons
            </span>
            <span className="text-[11px] font-semibold text-slate-400">
              Unlocks After Base Certificate
            </span>
          </div>

          <h3 className="text-base font-extrabold tracking-tight">Advanced Career Honors</h3>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed font-medium">
            Additional specialized units unlock after completing the core certification. Focus on mastering the base curriculum!
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex items-center gap-2">
              <Lock className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <span className="font-bold block text-white text-[11px]">Unit 4: Recruiter DMs</span>
                <span className="text-[10px] text-slate-400">Interview conversions</span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex items-center gap-2">
              <Lock className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <span className="font-bold block text-white text-[11px]">Unit 5: Viral Carousels</span>
                <span className="text-[10px] text-slate-400">Thought leadership</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal for already completed lessons */}
      {selectedReviewLesson && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mb-3 mx-auto">
              <Check className="w-7 h-7 stroke-[3]" />
            </div>
            <span className="block text-center text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
              Lesson Completed
            </span>
            <h3 className="text-lg font-black text-center text-slate-800 mb-2">
              {selectedReviewLesson.title}
            </h3>
            <p className="text-xs text-slate-600 text-center mb-5 leading-relaxed">
              {selectedReviewLesson.tip.summary}
            </p>

            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 mb-5 text-xs text-slate-700">
              <span className="font-bold text-slate-900 block mb-1">Pro Tip Formula:</span>
              {selectedReviewLesson.tip.proTip}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedReviewLesson(null)}
                className="flex-1 py-2.5 rounded-xl font-bold border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const target = selectedReviewLesson;
                  setSelectedReviewLesson(null);
                  onSelectLesson(target);
                }}
                className="flex-1 py-2.5 rounded-xl font-bold text-white btn-3d-blue text-xs flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Practice Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
