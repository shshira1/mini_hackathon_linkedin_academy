import React, { useState } from 'react';
import { Flame, Zap, Volume2, VolumeX, Sparkles, RotateCcw, Check, Calendar } from 'lucide-react';
import { sounds } from '../utils/sound';

interface TopNavProps {
  streak: number;
  xp: number;
  onReset: () => void;
  activeTab: 'path' | 'profile';
  setActiveTab: (tab: 'path' | 'profile') => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  streak,
  xp,
  onReset,
  activeTab,
  setActiveTab,
}) => {
  const [soundOn, setSoundOn] = useState(true);
  const [showStreakModal, setShowStreakModal] = useState(false);
  const [showXpModal, setShowXpModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const toggleSound = () => {
    sounds.enabled = !soundOn;
    setSoundOn(!soundOn);
    if (!soundOn) {
      sounds.playTap();
    }
  };

  const daysOfWeek = [
    { day: 'M', completed: true },
    { day: 'T', completed: true },
    { day: 'W', completed: true },
    { day: 'Th', completed: true },
    { day: 'F', completed: streak >= 5, current: true },
    { day: 'Sa', completed: false },
    { day: 'Su', completed: false },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        {/* Top LinkedIn simulated mini-bar */}
        <div className="bg-[#004182] text-white px-4 py-1.5 text-xs flex items-center justify-between font-medium">
          <div className="flex items-center space-x-2">
            <span className="bg-white text-[#0a66c2] font-black px-1.5 py-0.5 rounded text-[11px] tracking-tight">
              in
            </span>
            <span className="font-bold tracking-tight text-slate-100 flex items-center gap-1">
              LinkedIn <span className="text-sky-300 font-extrabold">Academy</span>
            </span>
            <span className="hidden sm:inline-block bg-sky-500/20 text-sky-200 text-[10px] px-1.5 py-0.5 rounded-full font-semibold border border-sky-400/30">
              College Edition
            </span>
          </div>

          <div className="flex items-center space-x-3 text-slate-200">
            <button
              onClick={() => setShowResetConfirm(true)}
              className="text-[11px] text-sky-200 hover:text-white flex items-center gap-1 transition-colors"
              title="Reset initial demo state"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Reset Demo</span>
            </button>
            <div className="h-3 w-px bg-blue-400/40" />
            <button
              onClick={toggleSound}
              className="p-1 hover:text-white rounded transition-colors"
              title={soundOn ? 'Mute Sound Effects' : 'Enable Sound Effects'}
            >
              {soundOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
            </button>
          </div>
        </div>

        {/* Gamification stats bar */}
        <div className="max-w-md mx-auto px-4 py-2.5 flex items-center justify-between">
          {/* Streak button */}
          <button
            onClick={() => {
              sounds.playTap();
              setShowStreakModal(!showStreakModal);
            }}
            className="group flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100/80 border border-amber-200 transition-all cursor-pointer active:scale-95"
          >
            <div className="relative">
              <Flame className="w-5 h-5 text-amber-500 fill-amber-500 animate-pulse drop-shadow-sm" />
            </div>
            <span className="font-black text-amber-700 text-sm tracking-tight">{streak}</span>
            <span className="text-xs font-semibold text-amber-600/90 hidden sm:inline">Days</span>
          </button>

          {/* XP total pill */}
          <button
            onClick={() => {
              sounds.playTap();
              setShowXpModal(true);
            }}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100/80 border border-blue-200 transition-all cursor-pointer active:scale-95"
          >
            <Zap className="w-5 h-5 text-[#0a66c2] fill-[#0a66c2]" />
            <span className="font-black text-[#004182] text-sm tracking-tight">{xp}</span>
            <span className="text-xs font-semibold text-blue-600/90">XP</span>
          </button>

          {/* Daily Goal badge */}
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>3 Min/Day</span>
          </div>
        </div>
      </header>

      {/* Streak Details Modal */}
      {showStreakModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mx-auto mb-3">
              <Flame className="w-10 h-10 text-amber-500 fill-amber-500" />
            </div>
            <h3 className="text-xl font-black text-center text-slate-800">
              {streak} Day Streak!
            </h3>
            <p className="text-sm text-slate-600 text-center mt-1 mb-5">
              Practice 1 quick LinkedIn skill every day to build career momentum before graduation.
            </p>

            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 mb-5">
              <div className="flex justify-between items-center mb-2 px-1">
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> This Week
                </span>
                <span className="text-xs font-semibold text-emerald-600">
                  {streak >= 5 ? '5/7 Days' : '4/7 Days Active'}
                </span>
              </div>
              <div className="grid grid-cols-7 gap-1.5 text-center">
                {daysOfWeek.map((d, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <span className="text-[11px] font-bold text-slate-400 mb-1">{d.day}</span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        d.completed
                          ? 'bg-amber-500 text-white shadow-xs'
                          : d.current
                          ? 'border-2 border-dashed border-amber-400 bg-amber-50 text-amber-600'
                          : 'bg-slate-200 text-slate-400'
                      }`}
                    >
                      {d.completed ? <Check className="w-4 h-4 stroke-[3]" /> : ''}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowStreakModal(false)}
              className="w-full py-3 rounded-xl font-bold text-white btn-3d-blue text-sm"
            >
              Keep Learning
            </button>
          </div>
        </div>
      )}

      {/* XP Level & Skill Status Modal */}
      {showXpModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-3">
              <Zap className="w-9 h-9 text-[#0a66c2] fill-[#0a66c2]" />
            </div>
            <h3 className="text-xl font-black text-center text-slate-800">
              {xp} Total XP Earned!
            </h3>
            <p className="text-xs text-slate-600 text-center mt-1 mb-4 font-medium">
              Every 3-minute lesson, quiz question, and AI practice task earns you career experience points.
            </p>

            <div className="bg-blue-50/60 rounded-xl p-3.5 border border-blue-100 mb-4 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">Career Level:</span>
                <span className="font-extrabold text-[#0a66c2] bg-white px-2 py-0.5 rounded-full border border-blue-200">
                  Level {Math.floor(xp / 100) + 1} • Rising Builder
                </span>
              </div>
              <div className="w-full bg-blue-200/50 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#0a66c2] h-full rounded-full transition-all"
                  style={{ width: `${(xp % 100)}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 text-right">
                {100 - (xp % 100)} XP to Level {Math.floor(xp / 100) + 2}
              </p>
            </div>

            <div className="space-y-2 mb-5 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-700">Unit 1: Profile Polish</span>
                <span className="font-black text-emerald-600">+60 XP</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-700">Unit 2: Networking Outreach</span>
                <span className="font-black text-blue-600">+70 XP</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-700">Unit 3: Posting & Visibility</span>
                <span className="font-black text-purple-600">+80 XP</span>
              </div>
            </div>

            <button
              onClick={() => setShowXpModal(false)}
              className="w-full py-3 rounded-xl font-bold text-white btn-3d-blue text-sm cursor-pointer"
            >
              Got It
            </button>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Reset Demo Progress?</h3>
            <p className="text-sm text-slate-600 mb-5">
              This will return your account to the initial demo state: 4-day streak, 2 lessons completed, and 240 XP.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 rounded-xl font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onReset();
                  setShowResetConfirm(false);
                }}
                className="flex-1 py-2.5 rounded-xl font-bold bg-rose-600 text-white hover:bg-rose-700 text-sm"
              >
                Reset Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
