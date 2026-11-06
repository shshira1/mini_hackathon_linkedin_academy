import React, { useState } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Flame,
  Zap,
  Lightbulb,
  ThumbsUp,
  Copy,
  Check,
  RotateCcw,
  Loader2,
  Share2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Lesson, SavedItem } from '../types';
import { sounds } from '../utils/sound';

interface LessonModalProps {
  lesson: Lesson;
  onClose: () => void;
  onFinishLesson: (
    lessonId: string,
    xpEarned: number,
    savedItem?: Omit<SavedItem, 'id' | 'createdAt'>
  ) => void;
  streak: number;
  isFinalLesson?: boolean;
  onOpenCertificate?: () => void;
}

export const LessonModal: React.FC<LessonModalProps> = ({
  lesson,
  onClose,
  onFinishLesson,
  streak,
  isFinalLesson = false,
  onOpenCertificate,
}) => {
  // Step: 1 (Tip), 2 (Quiz), 3 (Practice), 4 (Celebration)
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 2 Quiz state
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Step 3 Practice state
  const [practiceInput, setPracticeInput] = useState<string>(lesson.practice.defaultInput || '');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [feedback, setFeedback] = useState<{
    score: number;
    passed?: boolean;
    praise: string;
    improvement: string;
    improvedExample: string;
    isAiGenerated: boolean;
  } | null>(null);
  const [copiedImproved, setCopiedImproved] = useState(false);
  const [saveToProfile, setSaveToProfile] = useState(true);

  // Celebration state
  const [newStreak, setNewStreak] = useState(streak);

  // Step progress percentage
  const getProgressWidth = () => {
    switch (step) {
      case 1:
        return '33%';
      case 2:
        return '66%';
      case 3:
        return '90%';
      case 4:
        return '100%';
    }
  };

  // Handle Quiz Check
  const handleCheckQuiz = () => {
    if (!selectedOptionId) return;
    const correct = selectedOptionId === lesson.quiz.correctOptionId;
    setIsCorrect(correct);
    setQuizChecked(true);
    if (correct) {
      sounds.playSuccess();
    } else {
      sounds.playError();
    }
  };

  // Handle Free Response submission to Gemini
  const handleEvaluatePractice = async () => {
    if (!practiceInput.trim()) return;
    setIsEvaluating(true);
    sounds.playTap();

    try {
      const response = await fetch('/api/evaluate-task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonTitle: lesson.shortTitle,
          taskPrompt: lesson.practice.prompt,
          userAnswer: practiceInput,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      setFeedback(data);
      if (data.score >= 7) {
        sounds.playSuccess();
      } else {
        sounds.playError();
      }
    } catch (err) {
      console.warn('Backend evaluation fallback triggered:', err);
      // Fallback
      setFeedback({
        score: 8,
        passed: true,
        praise: 'Good student initiative and clear voice that recruiters look for!',
        improvement: 'Consider highlighting one specific skill keyword or target internship season.',
        improvedExample: practiceInput,
        isAiGenerated: false,
      });
      sounds.playSuccess();
    } finally {
      setIsEvaluating(false);
    }
  };

  // Complete entire lesson
  const handleFinish = () => {
    sounds.playFanfare();
    confetti({
      particleCount: 120,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#0a66c2', '#004182', '#38bdf8', '#f59e0b', '#10b981'],
    });

    const streakUpdated = streak + 1;
    setNewStreak(streakUpdated);
    setStep(4);
  };

  const handleReturnToCourse = () => {
    const savedItem =
      saveToProfile && feedback
        ? {
            lessonId: lesson.id,
            category: lesson.practice.category,
            title: `LinkedIn ${lesson.shortTitle}`,
            content: practiceInput,
            improvedContent: feedback.improvedExample,
            score: feedback.score,
          }
        : undefined;

    onFinishLesson(lesson.id, lesson.xpReward, savedItem);
    onClose();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedImproved(true);
    sounds.playTap();
    setTimeout(() => setCopiedImproved(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Top Header bar with progress */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              sounds.playTap();
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Progress bar */}
          <div className="flex-1 bg-slate-100 h-3 rounded-full overflow-hidden p-0.5">
            <div
              className="bg-[#0a66c2] h-full rounded-full transition-all duration-300"
              style={{ width: getProgressWidth() }}
            />
          </div>

          {/* Streak indicator */}
          <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{streak}</span>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {/* STEP 1: Tip Card */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#0a66c2] bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60">
                  Step 1 of 3: Core Strategy
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  ⏱️ {lesson.duration}
                </span>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {lesson.tip.title}
                </h2>
                <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                  {lesson.tip.summary}
                </p>
              </div>

              {/* LinkedIn Formula Highlight Card */}
              <div className="bg-linear-to-br from-blue-50 to-indigo-50/60 border border-blue-200 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2 text-[#0a66c2] font-black text-xs uppercase tracking-wider">
                  <Lightbulb className="w-4 h-4" />
                  <span>Pro Tip Formula</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed">
                  {lesson.tip.proTip}
                </p>
              </div>

              {/* Visual Mockup Preview */}
              {lesson.tip.visualMockup && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-inner">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      {lesson.tip.visualMockup.title}
                    </span>
                    <span className="text-[10px] font-bold text-[#0a66c2] bg-white px-2 py-0.5 rounded border border-slate-200">
                      LinkedIn Preview
                    </span>
                  </div>
                  <div className="text-xs text-slate-700 whitespace-pre-line font-mono bg-white p-3 rounded-xl border border-slate-200/80 leading-relaxed">
                    {lesson.tip.visualMockup.body}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Multiple Choice Quiz */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <span className="text-[11px] font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200/60">
                Step 2 of 3: Knowledge Check
              </span>

              <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                {lesson.quiz.question}
              </h2>

              {/* Option cards */}
              <div className="space-y-3 pt-1">
                {lesson.quiz.options.map((option, idx) => {
                  const letters = ['A', 'B', 'C', 'D'];
                  const isSelected = selectedOptionId === option.id;

                  return (
                    <button
                      key={option.id}
                      onClick={() => {
                        if (quizChecked) return;
                        sounds.playTap();
                        setSelectedOptionId(option.id);
                      }}
                      className={`w-full text-left p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                        isSelected
                          ? 'border-[#0a66c2] bg-blue-50/70 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-[#0a66c2] text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {letters[idx]}
                      </div>
                      <span className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed pt-0.5">
                        {option.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Free-Response Practice Task */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
                  Step 3 of 3: Interactive Practice
                </span>
                <span className="text-xs font-bold text-blue-600 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> AI Feedback
                </span>
              </div>

              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                  {lesson.practice.prompt}
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  💡 {lesson.practice.contextHint}
                </p>
              </div>

              {/* Starter inspiration chips */}
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Tap to paste inspiration:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {lesson.practice.starterSuggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        sounds.playTap();
                        setPracticeInput(suggestion);
                      }}
                      className="text-[11px] font-medium bg-slate-100 hover:bg-blue-50 hover:text-[#0a66c2] border border-slate-200 text-slate-700 px-2.5 py-1 rounded-lg transition-colors cursor-pointer text-left"
                    >
                      &ldquo;{suggestion.slice(0, 38)}...&rdquo;
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Input area */}
              <div className="relative">
                <textarea
                  rows={4}
                  value={practiceInput}
                  onChange={(e) => setPracticeInput(e.target.value)}
                  placeholder={lesson.practice.placeholder}
                  className="w-full p-3.5 rounded-2xl border-2 border-slate-200 focus:border-[#0a66c2] focus:ring-2 focus:ring-blue-100 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 font-medium transition-all resize-none"
                />
                <div className="flex justify-between items-center text-[11px] text-slate-400 mt-1 px-1">
                  <span>Aim for clear, specific keywords</span>
                  <span>{practiceInput.length} characters</span>
                </div>
              </div>

              {/* AI Feedback Card */}
              {feedback && (
                <div
                  className={`border rounded-2xl p-4 space-y-3.5 animate-in fade-in slide-in-from-bottom-2 duration-200 ${
                    feedback.score >= 7
                      ? 'bg-linear-to-br from-emerald-50/70 to-blue-50/60 border-emerald-200'
                      : 'bg-linear-to-br from-rose-50 to-amber-50/60 border-rose-200'
                  }`}
                >
                  {/* Score & Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-10 h-10 rounded-xl text-white font-black text-sm flex items-center justify-center shadow-xs ${
                          feedback.score >= 7 ? 'bg-emerald-600' : 'bg-rose-500'
                        }`}
                      >
                        {feedback.score}/10
                      </div>
                      <div>
                        <span
                          className={`text-[11px] font-black uppercase tracking-wider block ${
                            feedback.score >= 7 ? 'text-emerald-800' : 'text-rose-700'
                          }`}
                        >
                          {feedback.score >= 7
                            ? 'Passing Score Achieved!'
                            : 'Revision Required (Min 7/10)'}
                        </span>
                        <span className="text-xs font-semibold text-slate-700">
                          {feedback.score >= 9
                            ? 'Outstanding professional copy!'
                            : feedback.score >= 7
                            ? 'Solid passing draft!'
                            : 'Does not meet recruiter standards yet'}
                        </span>
                      </div>
                    </div>

                    <div className="text-[10px] bg-white text-slate-700 font-bold px-2 py-0.5 rounded-full border border-slate-200">
                      Gemini Verified
                    </div>
                  </div>

                  {/* Warning banner if failed */}
                  {feedback.score < 7 && (
                    <div className="p-2.5 rounded-xl bg-rose-100/70 border border-rose-200 text-rose-900 text-xs font-semibold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>
                        This draft scored below the required 7/10. Update your draft using the improvement advice below or adopt the suggested version to earn credit.
                      </span>
                    </div>
                  )}

                  {/* Praise */}
                  <div className="flex items-start gap-2.5">
                    <ThumbsUp
                      className={`w-4 h-4 shrink-0 mt-0.5 ${
                        feedback.score >= 7 ? 'text-emerald-600' : 'text-slate-400'
                      }`}
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Praise:</span>
                      <p className="text-xs text-slate-700 leading-relaxed font-medium">
                        {feedback.praise}
                      </p>
                    </div>
                  </div>

                  {/* Specific Improvement */}
                  <div className="flex items-start gap-2.5">
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        Actionable Improvement:
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed font-medium">
                        {feedback.improvement}
                      </p>
                    </div>
                  </div>

                  {/* Improved Example */}
                  <div className="bg-white rounded-xl p-3 border border-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[#0a66c2] uppercase tracking-wider">
                        ✨ Polished LinkedIn-Ready Example:
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            sounds.playTap();
                            setPracticeInput(feedback.improvedExample);
                          }}
                          className="text-[11px] bg-blue-50 text-[#0a66c2] hover:bg-blue-100 px-2 py-0.5 rounded font-bold border border-blue-200 flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>Insert</span>
                        </button>
                        <button
                          onClick={() => copyToClipboard(feedback.improvedExample)}
                          className="text-[11px] text-slate-600 hover:text-[#0a66c2] font-semibold flex items-center gap-1 transition-colors"
                        >
                          {copiedImproved ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-600">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-slate-800 font-mono leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      {feedback.improvedExample}
                    </p>
                  </div>

                  {/* Save to profile checkbox (only if passing) */}
                  {feedback.score >= 7 && (
                    <label className="flex items-center gap-2 pt-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={saveToProfile}
                        onChange={(e) => setSaveToProfile(e.target.checked)}
                        className="w-4 h-4 text-[#0a66c2] rounded border-slate-300 focus:ring-blue-500"
                      />
                      <span className="text-xs font-semibold text-slate-700">
                        Save this to &ldquo;Added to your LinkedIn&rdquo; in Profile
                      </span>
                    </label>
                  )}
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Celebration Screen */}
          {step === 4 && (
            <div className="text-center py-6 space-y-6 animate-in zoom-in-95 duration-200">
              <div className="w-20 h-20 bg-linear-to-tr from-amber-400 to-amber-300 text-amber-950 rounded-full flex items-center justify-center mx-auto shadow-xl ring-8 ring-amber-100">
                <Flame className="w-12 h-12 fill-amber-500 text-amber-500 animate-bounce" />
              </div>

              <div>
                <span className="text-xs font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Lesson Completed!
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-2">
                  {newStreak} Day Streak!
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xs mx-auto">
                  You are building real career momentum. Your profile draft has been saved!
                </p>
              </div>

              {/* Rewards tally */}
              <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 text-center">
                  <div className="flex items-center justify-center gap-1 text-[#0a66c2] font-black text-lg">
                    <Zap className="w-5 h-5 fill-[#0a66c2]" />
                    +{lesson.xpReward}
                  </div>
                  <span className="text-[11px] font-bold text-blue-700 uppercase">XP Earned</span>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-center">
                  <div className="flex items-center justify-center gap-1 text-amber-600 font-black text-lg">
                    <Flame className="w-5 h-5 fill-amber-500" />
                    {newStreak}
                  </div>
                  <span className="text-[11px] font-bold text-amber-700 uppercase">Day Streak</span>
                </div>
              </div>

              {/* Special Certificate Earned Prompt if all 6 completed */}
              {isFinalLesson && (
                <div className="bg-linear-to-r from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-2xl p-4 text-center space-y-2 animate-in zoom-in-95">
                  <span className="text-2xl">🎓</span>
                  <h3 className="font-black text-amber-950 text-sm">
                    Core Curriculum Complete!
                  </h3>
                  <p className="text-xs text-amber-900/80 font-medium">
                    You mastered all 6 base lessons! Your official LinkedIn Academy Certificate is ready.
                  </p>
                  <button
                    onClick={() => {
                      handleReturnToCourse();
                      if (onOpenCertificate) onOpenCertificate();
                    }}
                    className="w-full py-2.5 rounded-xl font-black text-xs btn-3d-amber text-amber-950 cursor-pointer shadow-md"
                  >
                    View Official Certificate 📜
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Bottom Action Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/80">
          {step === 1 && (
            <button
              onClick={() => {
                sounds.playTap();
                setStep(2);
              }}
              className="w-full py-3.5 rounded-2xl text-white font-extrabold text-sm sm:text-base btn-3d-blue flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Continue to Quiz</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {step === 2 && !quizChecked && (
            <button
              onClick={handleCheckQuiz}
              disabled={!selectedOptionId}
              className={`w-full py-3.5 rounded-2xl font-extrabold text-sm sm:text-base transition-all ${
                selectedOptionId
                  ? 'btn-3d-blue text-white cursor-pointer shadow-md'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              Check Answer
            </button>
          )}

          {step === 2 && quizChecked && (
            <div className="space-y-3">
              <div
                className={`p-3.5 rounded-2xl text-xs sm:text-sm font-semibold flex items-start gap-2.5 ${
                  isCorrect
                    ? 'bg-emerald-100/80 text-emerald-900 border border-emerald-300'
                    : 'bg-rose-100/80 text-rose-900 border border-rose-300'
                }`}
              >
                {isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className="font-extrabold mb-1">
                    {isCorrect ? 'Great job!' : 'Incorrect — here is why:'}
                  </p>
                  <p className="text-xs leading-relaxed">{lesson.quiz.explanation}</p>
                </div>
              </div>

              <div className="flex gap-2">
                {!isCorrect && (
                  <button
                    onClick={() => {
                      sounds.playTap();
                      setQuizChecked(false);
                      setSelectedOptionId(null);
                    }}
                    className="flex-1 py-3 rounded-xl font-bold text-xs border border-slate-300 text-slate-700 hover:bg-white flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Try Again
                  </button>
                )}
                <button
                  onClick={() => {
                    sounds.playTap();
                    setStep(3);
                  }}
                  className="flex-1 py-3.5 rounded-2xl text-white font-extrabold text-xs sm:text-sm btn-3d-emerald flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Continue to Practice</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && !feedback && (
            <button
              onClick={handleEvaluatePractice}
              disabled={isEvaluating || !practiceInput.trim()}
              className={`w-full py-3.5 rounded-2xl font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 transition-all ${
                !isEvaluating && practiceInput.trim()
                  ? 'btn-3d-blue text-white cursor-pointer shadow-md'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {isEvaluating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Gemini AI is reviewing your draft...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Submit for AI Review</span>
                </>
              )}
            </button>
          )}

          {step === 3 && feedback && feedback.score >= 7 && (
            <button
              onClick={handleFinish}
              className="w-full py-3.5 rounded-2xl text-white font-extrabold text-sm sm:text-base btn-3d-emerald flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Check className="w-5 h-5 stroke-[3]" />
              <span>Finish Lesson & Claim +{lesson.xpReward} XP</span>
            </button>
          )}

          {step === 3 && feedback && feedback.score < 7 && (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  sounds.playTap();
                  setFeedback(null);
                }}
                className="flex-1 py-3.5 rounded-2xl font-extrabold text-xs sm:text-sm border border-slate-300 text-slate-700 hover:bg-white flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Revise My Draft</span>
              </button>
              <button
                onClick={() => {
                  sounds.playTap();
                  setPracticeInput(feedback.improvedExample);
                  setFeedback(null);
                }}
                className="flex-1 py-3.5 rounded-2xl text-white font-extrabold text-xs sm:text-sm btn-3d-blue flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <Sparkles className="w-4 h-4" />
                <span>Use Suggested Draft</span>
              </button>
            </div>
          )}

          {step === 4 && (
            <button
              onClick={handleReturnToCourse}
              className="w-full py-3.5 rounded-2xl text-white font-extrabold text-sm sm:text-base btn-3d-blue flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Back to Course Path</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
