import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { LESSONS } from './data/lessons';
import { INITIAL_SAVED_ITEMS, ALL_BADGES } from './data/mockData';
import { Lesson, SavedItem, Badge } from './types';
import { TopNav } from './components/TopNav';
import { BottomTabs } from './components/BottomTabs';
import { HomePath } from './components/HomePath';
import { LessonModal } from './components/LessonModal';
import { ProfileView } from './components/ProfileView';
import { CertificateModal } from './components/CertificateModal';
import { sounds } from './utils/sound';
import { Smartphone, Monitor, Award } from 'lucide-react';

export default function App() {
  // Gamification state (in-memory)
  // Demo requirement: Start user with 4-day streak and 2 lessons completed
  const [streak, setStreak] = useState<number>(4);
  const [xp, setXp] = useState<number>(240);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([
    'headline',
    'about',
  ]);
  const [currentLessonId, setCurrentLessonId] = useState<string>('connection-alum');
  const [savedItems, setSavedItems] = useState<SavedItem[]>(INITIAL_SAVED_ITEMS);
  const [badges, setBadges] = useState<Badge[]>(ALL_BADGES);
  const [chestClaimed, setChestClaimed] = useState<boolean>(false);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<'path' | 'profile'>('path');

  // Currently active lesson modal
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  // Official Certificate Modal state
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);

  // Desktop simulator layout toggle
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(false);

  // Handle lesson completion
  const handleFinishLesson = (
    lessonId: string,
    xpEarned: number,
    newSavedItem?: Omit<SavedItem, 'id' | 'createdAt'>
  ) => {
    // 1. Mark lesson as completed
    const updatedCompleted = completedLessonIds.includes(lessonId)
      ? completedLessonIds
      : [...completedLessonIds, lessonId];
    setCompletedLessonIds(updatedCompleted);

    // 2. Increment XP and streak
    setXp((prev) => prev + xpEarned);
    setStreak((prev) => prev + 1);

    // 3. Save draft to Profile if provided
    if (newSavedItem) {
      const createdItem: SavedItem = {
        ...newSavedItem,
        id: `saved-${Date.now()}`,
        createdAt: 'Just now',
      };
      setSavedItems((prev) => [createdItem, ...prev]);
    }

    // 4. Unlock next lesson in order
    const currentIndex = LESSONS.findIndex((l) => l.id === lessonId);
    if (currentIndex >= 0 && currentIndex < LESSONS.length - 1) {
      setCurrentLessonId(LESSONS[currentIndex + 1].id);
    }

    // 5. Check and unlock relevant badges
    setBadges((prevBadges) =>
      prevBadges.map((badge) => {
        if (lessonId === 'connection-alum' && badge.id === 'badge-alum') {
          return { ...badge, earned: true, unlockedAt: 'Today' };
        }
        if (lessonId === 'follow-up-fair' && badge.id === 'badge-fair') {
          return { ...badge, earned: true, unlockedAt: 'Today' };
        }
        if (lessonId === 'commenting' && badge.id === 'badge-comment') {
          return { ...badge, earned: true, unlockedAt: 'Today' };
        }
        if (lessonId === 'class-project' && badge.id === 'badge-project') {
          return { ...badge, earned: true, unlockedAt: 'Today' };
        }
        return badge;
      })
    );
  };

  // Milestone treasure chest bonus
  const handleOpenChest = () => {
    if (chestClaimed) return;
    setChestClaimed(true);
    setXp((prev) => prev + 15);
    sounds.playFanfare();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#f59e0b', '#fbbf24', '#0a66c2', '#10b981'],
    });
  };

  // Reset to initial demo state
  const handleResetDemo = () => {
    setStreak(4);
    setXp(240);
    setCompletedLessonIds(['headline', 'about']);
    setCurrentLessonId('connection-alum');
    setSavedItems(INITIAL_SAVED_ITEMS);
    setBadges(ALL_BADGES);
    setChestClaimed(false);
    setActiveTab('path');
    sounds.playTap();
  };

  // Instant test helper: Complete all 6 base lessons to test certificate flow
  const handleCompleteAllForDemo = () => {
    setCompletedLessonIds(LESSONS.map((l) => l.id));
    setXp((prev) => Math.max(prev, 420));
    setStreak(6);
    sounds.playFanfare();
    confetti({
      particleCount: 110,
      spread: 75,
      origin: { y: 0.5 },
    });
    setShowCertificateModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-start text-slate-900">
      {/* Optional Top Device Frame Toggle for Desktop Viewers */}
      <div className="hidden lg:flex w-full max-w-4xl justify-between items-center px-4 pt-2 pb-1 text-xs text-slate-500 font-semibold">
        <div className="flex items-center gap-2">
          <button
            onClick={handleCompleteAllForDemo}
            className="px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 cursor-pointer"
            title="Instant test: Complete all 6 base lessons and open certificate"
          >
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>⚡ Complete All 6 Base Lessons (Demo Test)</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span>View mode:</span>
          <button
            onClick={() => setIsPhoneFrame(false)}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors ${
              !isPhoneFrame
                ? 'bg-white text-[#0a66c2] shadow-xs font-bold border border-slate-200'
                : 'hover:text-slate-800'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            Full Width
          </button>
          <button
            onClick={() => setIsPhoneFrame(true)}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors ${
              isPhoneFrame
                ? 'bg-white text-[#0a66c2] shadow-xs font-bold border border-slate-200'
                : 'hover:text-slate-800'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Mobile Frame
          </button>
        </div>
      </div>

      {/* Main Container: Mobile phone mockup or responsive container */}
      <div
        className={`w-full min-h-screen bg-white transition-all duration-300 relative ${
          isPhoneFrame
            ? 'max-w-md my-4 rounded-[40px] border-8 border-slate-800 shadow-2xl min-h-[850px] overflow-hidden'
            : 'max-w-md md:max-w-lg shadow-sm border-x border-slate-200'
        }`}
      >
        {/* Top Gamification Bar */}
        <TopNav
          streak={streak}
          xp={xp}
          onReset={handleResetDemo}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Screen 1: Path View */}
        {activeTab === 'path' && (
          <HomePath
            lessons={LESSONS}
            completedLessonIds={completedLessonIds}
            currentLessonId={currentLessonId}
            onSelectLesson={(lesson) => setActiveLesson(lesson)}
            onOpenChest={handleOpenChest}
            chestClaimed={chestClaimed}
            onOpenCertificate={() => setShowCertificateModal(true)}
          />
        )}

        {/* Screen 2: Profile & Added to LinkedIn View */}
        {activeTab === 'profile' && (
          <ProfileView
            streak={streak}
            xp={xp}
            completedLessonsCount={completedLessonIds.length}
            totalLessonsCount={LESSONS.length}
            savedItems={savedItems}
            badges={badges}
            onOpenCertificate={() => setShowCertificateModal(true)}
          />
        )}

        {/* Bottom Tab Navigation */}
        <BottomTabs
          activeTab={activeTab}
          onChangeTab={(tab) => setActiveTab(tab)}
          savedCount={savedItems.length}
        />

        {/* Interactive 3-Step Lesson Modal with Gemini AI Evaluation */}
        {activeLesson && (
          <LessonModal
            lesson={activeLesson}
            onClose={() => setActiveLesson(null)}
            onFinishLesson={handleFinishLesson}
            streak={streak}
            isFinalLesson={
              completedLessonIds.length === LESSONS.length - 1 &&
              !completedLessonIds.includes(activeLesson.id)
            }
            onOpenCertificate={() => setShowCertificateModal(true)}
          />
        )}

        {/* Official Certificate of Completion Modal */}
        {showCertificateModal && (
          <CertificateModal
            onClose={() => setShowCertificateModal(false)}
            studentName="Alex Chen"
            issueDate="November 2026"
            certificateId="LIA-2026-89421"
          />
        )}
      </div>
    </div>
  );
}
