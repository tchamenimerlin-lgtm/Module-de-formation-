import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Circle, Clock } from 'lucide-react';
import { CHAPTERS } from '../data/chapters';
import { ProgressState, SkillLevel } from '../types/academy';

interface ProgramViewProps {
  progress: ProgressState;
  onOpenChapter: (chapterId: number) => void;
}

const LEVELS: Array<SkillLevel | 'Tous'> = ['Tous', 'Débutant', 'Intermédiaire', 'Avancé'];

export const ProgramView: React.FC<ProgramViewProps> = ({
  progress,
  onOpenChapter,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<SkillLevel | 'Tous'>('Tous');

  const visibleChapters =
    selectedLevel === 'Tous'
      ? CHAPTERS
      : CHAPTERS.filter((c) => c.level === selectedLevel);

  const groupedLevels: SkillLevel[] =
    selectedLevel === 'Tous'
      ? ['Débutant', 'Intermédiaire', 'Avancé']
      : [selectedLevel];

  return (
    <div className="mx-auto max-w-[1360px] px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-[#E2D8C8] pb-8">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs font-mono-tabular font-medium text-[#7D6340]">
            Cursus complet · {CHAPTERS.length} chapitres · Méthode structurée en 9 blocs par module
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#111111]">
            Programme de formation Afro Barbering
          </h1>
          <p className="text-sm sm:text-base leading-relaxed text-[#5C554B]">
            Chaque chapitre inclut un cours théorique accessible, des photographies commentées,
            un schéma technique interactif, des exemples concrets, les conseils de professionnels,
            les erreurs à éviter, un résumé, un atelier pratique et un quiz d’évaluation.
          </p>
        </div>

        {/* Interactive Level Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filtrer par niveau"
          className="inline-flex items-center gap-1 rounded-lg bg-[#F5EFE6] p-1 border border-[#E2D8C8] self-start lg:self-auto"
        >
          {LEVELS.map((lvl) => (
            <button
              key={lvl}
              type="button"
              role="tab"
              aria-selected={selectedLevel === lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`rounded-md px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedLevel === lvl
                  ? 'bg-[#111111] text-white font-semibold'
                  : 'text-[#5C554B] hover:text-[#111111]'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Grouped Syllabus */}
      <div className="space-y-14">
        {groupedLevels.map((lvl) => {
          const chaptersForLevel = visibleChapters.filter((c) => c.level === lvl);
          return (
            <section key={lvl} className="space-y-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#E2D8C8] pb-3">
                <h2 className="font-display text-2xl font-semibold text-[#111111]">
                  Niveau {lvl}
                </h2>
                <p className="text-xs font-mono-tabular text-[#5C554B]">
                  {chaptersForLevel.length} chapitres ·{' '}
                  {chaptersForLevel.reduce((acc, c) => acc + c.durationMinutes, 0)} min d’étude estimée
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {chaptersForLevel.map((ch) => {
                  const lessonDone = progress.completedChapters.includes(ch.id);
                  const exDone = progress.completedExercises.includes(ch.id);
                  const quizRec = progress.chapterQuizScores[ch.id];

                  return (
                    <div
                      key={ch.id}
                      className="rounded-xl border border-[#E2D8C8] bg-[#FAF8F4] p-5 sm:p-6 hover:border-[#111111] transition-colors"
                    >
                      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div className="space-y-2.5 max-w-3xl">
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono-tabular text-[#5C554B]">
                            <span className="text-[#7D6340] font-semibold">
                              Chapitre {String(ch.id).padStart(2, '0')}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="inline-flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                              {ch.durationMinutes} min
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>
                              {lessonDone ? 'Cours lu' : 'À étudier'}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>
                              {exDone ? 'Exercice validé' : 'Exercice à réaliser'}
                            </span>
                            {quizRec && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span className={quizRec.passed ? 'text-[#166534] font-semibold' : 'text-[#92400E] font-semibold'}>
                                  Quiz : {quizRec.percentage} %
                                </span>
                              </>
                            )}
                          </div>

                          <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#111111]">
                            {ch.shortTitle}
                          </h3>
                          <p className="text-sm leading-relaxed text-[#2E2A25]">
                            {ch.summaryIntro}
                          </p>

                          <div className="pt-1 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-[#5C554B]">
                            {ch.objectives.slice(0, 3).map((obj) => (
                              <span key={obj} className="inline-flex items-center gap-1.5">
                                {lessonDone ? (
                                  <CheckCircle2 className="h-3.5 w-3.5 text-[#166534] shrink-0" aria-hidden="true" />
                                ) : (
                                  <Circle className="h-3 w-3 text-[#B59871] shrink-0" aria-hidden="true" />
                                )}
                                <span>{obj}</span>
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="shrink-0">
                          <button
                            type="button"
                            onClick={() => onOpenChapter(ch.id)}
                            className="inline-flex items-center gap-2 rounded-md bg-[#111111] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#292622] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            <span>{lessonDone ? 'Revoir le chapitre' : 'Étudier ce chapitre'}</span>
                            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
