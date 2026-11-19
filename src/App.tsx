/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { BrandMark } from './components/BrandMark';
import { CourseView } from './components/CourseView';
import { GalleryView } from './components/GalleryView';
import { HomeView } from './components/HomeView';
import { ProgramView } from './components/ProgramView';
import { ProgressView } from './components/ProgressView';
import { QuizView } from './components/QuizView';
import { ResourcesView } from './components/ResourcesView';
import { ToolsView } from './components/ToolsView';
import { TopNav } from './components/TopNav';
import { NavView, ProgressState, QuizResultRecord } from './types/academy';
import { EMPTY_PROGRESS, normalizeProgressState } from './utils/academyLogic';

const STORAGE_KEY = 'notorious_barber_academy_progress_v1';

function loadSavedProgress(): ProgressState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...EMPTY_PROGRESS };
    return normalizeProgressState(JSON.parse(raw));
  } catch {
    return { ...EMPTY_PROGRESS };
  }
}

export default function App() {
  const [activeView, setActiveView] = useState<NavView>('home');
  const [activeChapterId, setActiveChapterId] = useState<number>(1);
  const [progress, setProgress] = useState<ProgressState>(() => loadSavedProgress());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage quota issues in private browsing
    }
  }, [progress]);

  const handleOpenChapter = (chapterId: number) => {
    setActiveChapterId(chapterId);
    setActiveView('course');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleChapterComplete = (chapterId: number) => {
    setProgress((prev) => {
      const exists = prev.completedChapters.includes(chapterId);
      return {
        ...prev,
        completedChapters: exists
          ? prev.completedChapters.filter((id) => id !== chapterId)
          : [...prev.completedChapters, chapterId],
      };
    });
  };

  const handleToggleExerciseComplete = (chapterId: number) => {
    setProgress((prev) => {
      const exists = prev.completedExercises.includes(chapterId);
      return {
        ...prev,
        completedExercises: exists
          ? prev.completedExercises.filter((id) => id !== chapterId)
          : [...prev.completedExercises, chapterId],
      };
    });
  };

  const handleSaveChapterQuiz = (chapterId: number, record: QuizResultRecord) => {
    setProgress((prev) => ({
      ...prev,
      chapterQuizScores: {
        ...prev.chapterQuizScores,
        [chapterId]: record,
      },
      completedChapters:
        record.passed && !prev.completedChapters.includes(chapterId)
          ? [...prev.completedChapters, chapterId]
          : prev.completedChapters,
    }));
  };

  const handleSaveCategoryQuiz = (categoryId: string, record: QuizResultRecord) => {
    setProgress((prev) => ({
      ...prev,
      categoryQuizScores: {
        ...prev.categoryQuizScores,
        [categoryId]: record,
      },
    }));
  };

  const handleSaveNote = (chapterId: number, note: string) => {
    setProgress((prev) => ({
      ...prev,
      personalNotes: {
        ...prev.personalNotes,
        [chapterId]: note,
      },
    }));
  };

  const handleResetProgress = () => {
    setProgress({ ...EMPTY_PROGRESS });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111111]">
      <TopNav activeView={activeView} onNavigate={setActiveView} />

      <main className="flex-1">
        {activeView === 'home' && (
          <HomeView
            progress={progress}
            onNavigate={setActiveView}
            onOpenChapter={handleOpenChapter}
          />
        )}

        {activeView === 'program' && (
          <ProgramView
            progress={progress}
            onOpenChapter={handleOpenChapter}
          />
        )}

        {activeView === 'course' && (
          <CourseView
            activeChapterId={activeChapterId}
            progress={progress}
            onSelectChapter={setActiveChapterId}
            onToggleChapterComplete={handleToggleChapterComplete}
            onToggleExerciseComplete={handleToggleExerciseComplete}
            onSaveChapterQuiz={handleSaveChapterQuiz}
            onSaveNote={handleSaveNote}
            onNavigate={setActiveView}
          />
        )}

        {activeView === 'gallery' && <GalleryView />}

        {activeView === 'tools' && <ToolsView />}

        {activeView === 'quiz' && (
          <QuizView
            progress={progress}
            onSaveCategoryQuiz={handleSaveCategoryQuiz}
            onSaveChapterQuiz={handleSaveChapterQuiz}
          />
        )}

        {activeView === 'progress' && (
          <ProgressView
            progress={progress}
            onOpenChapter={handleOpenChapter}
            onNavigate={setActiveView}
            onResetProgress={handleResetProgress}
          />
        )}

        {activeView === 'resources' && <ResourcesView progress={progress} />}
      </main>

      <footer className="border-t border-[#E2D8C8] bg-[#FAF8F4] no-print">
        <div className="mx-auto max-w-[1360px] px-4 py-10 sm:px-6 lg:px-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1.5">
            <BrandMark compact />
            <p className="text-xs text-[#5C554B]">
              Module complet d’apprentissage professionnel — Coiffure masculine afro (Afro Barbering).
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#5C554B]">
            {(
              [
                ['program', 'Programme'],
                ['course', 'Cours'],
                ['gallery', 'Galerie des coiffures'],
                ['tools', 'Matériel'],
                ['quiz', 'Quiz'],
                ['progress', 'Progression'],
                ['resources', 'Télécharger le module'],
              ] as Array<[NavView, string]>
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setActiveView(id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="font-medium hover:text-[#111111] transition-colors cursor-pointer"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
