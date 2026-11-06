import React from 'react';
import { Compass, Trophy, UserCheck } from 'lucide-react';
import { sounds } from '../utils/sound';

interface BottomTabsProps {
  activeTab: 'path' | 'profile';
  onChangeTab: (tab: 'path' | 'profile') => void;
  savedCount: number;
}

export const BottomTabs: React.FC<BottomTabsProps> = ({
  activeTab,
  onChangeTab,
  savedCount,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200">
      <div className="max-w-md mx-auto grid grid-cols-2 py-2 px-6 gap-3">
        {/* Path tab */}
        <button
          onClick={() => {
            sounds.playTap();
            onChangeTab('path');
          }}
          className={`flex items-center justify-center gap-2 py-2 rounded-2xl transition-all cursor-pointer ${
            activeTab === 'path'
              ? 'bg-blue-50 text-[#0a66c2] font-black border border-blue-200 shadow-xs'
              : 'text-slate-500 hover:text-slate-800 font-bold hover:bg-slate-50'
          }`}
        >
          <div
            className={`p-1 rounded-xl transition-all ${
              activeTab === 'path' ? 'text-[#0a66c2]' : ''
            }`}
          >
            <Compass className="w-5 h-5 stroke-[2.5]" />
          </div>
          <span className="text-xs tracking-tight">Course Path</span>
        </button>

        {/* Profile tab */}
        <button
          onClick={() => {
            sounds.playTap();
            onChangeTab('profile');
          }}
          className={`relative flex items-center justify-center gap-2 py-2 rounded-2xl transition-all cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-blue-50 text-[#0a66c2] font-black border border-blue-200 shadow-xs'
              : 'text-slate-500 hover:text-slate-800 font-bold hover:bg-slate-50'
          }`}
        >
          <div className="relative p-1 rounded-xl transition-all">
            <UserCheck className="w-5 h-5 stroke-[2.5]" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#0a66c2] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {savedCount}
              </span>
            )}
          </div>
          <span className="text-xs tracking-tight">Profile & Drafts</span>
        </button>
      </div>
    </nav>
  );
};

