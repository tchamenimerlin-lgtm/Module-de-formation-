import React, { useState } from 'react';
import { Award, CheckCircle2, Circle, RotateCcw } from 'lucide-react';
import { CHAPTERS } from '../data/chapters';
import { QUIZ_MODE_META } from '../data/quizzes';
import { NavView, ProgressState } from '../types/academy';
import { computeAcademyProgress } from '../utils/academyLogic';

interface ProgressViewProps {
  progress: ProgressState;
  onOpenChapter: (chapterId: number) => void;
  onNavigate: (view: NavView) => void;
  onResetProgress: () => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  progress,
  onOpenChapter,
  onNavigate,
  onResetProgress,
}) => {
  const [confirmReset, setConfirmReset] = useState(false);
  const overview = computeAcademyProgress(CHAPTERS, progress);

  return (
    <div className="mx-auto max-w-[1360px] px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      {/* Header & Rank */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-[#E2D8C8] pb-8">
        <div className="space-y-3">
          <p className="text-xs font-mono-tabular text-[#7D6340]">
            Tableau de bord apprenti · Sauvegarde locale automatique hors ligne
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#111111]">
            Progression & Validation des compétences
          </h1>
          <p className="text-sm text-[#5C554B]">
            Grade actuel :{' '}
            <strong className="font-semibold text-[#111111]">{overview.currentRankLabel}</strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {!confirmReset ? (
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className="inline-flex items-center gap-2 rounded-md border border-[#CFC2AE] bg-white px-4 py-2 text-xs font-medium text-[#5C554B] hover:text-[#111111] hover:bg-[#F5EFE6] transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Réinitialiser ma progression</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 rounded-md border border-[#FECACA] bg-[#FEF2F2] px-3 py-2 text-xs">
              <span className="text-[#991B1B] font-medium">Confirmer l’effacement ?</span>
              <button
                type="button"
                onClick={() => {
                  onResetProgress();
                  setConfirmReset(false);
                }}
                className="rounded bg-[#991B1B] px-2.5 py-1 font-semibold text-white hover:bg-[#7F1D1D] cursor-pointer"
              >
                Oui, réinitialiser
              </button>
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="rounded border border-[#CFC2AE] bg-white px-2.5 py-1 text-[#111111] hover:bg-[#F5EFE6] cursor-pointer"
              >
                Annuler
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 4 Key KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Avancement global',
            value: `${overview.overallProgressPercentage} %`,
            sub: 'Cours 40 % · Pratique 30 % · Quiz 30 %',
          },
          {
            label: 'Chapitres validés',
            value: `${overview.validatedChaptersCount} / ${overview.totalChapters}`,
            sub: 'Sur l’ensemble du cursus',
          },
          {
            label: 'Ateliers pratiques validés',
            value: `${overview.completedExercisesCount} / ${overview.totalChapters}`,
            sub: 'Mises en situation réalisées',
          },
          {
            label: 'Moyenne des quiz',
            value: overview.averageQuizScore !== null ? `${overview.averageQuizScore} %` : '—',
            sub:
              overview.passedChapterQuizzesCount > 0
                ? `${overview.passedChapterQuizzesCount} quiz chapitres réussis (≥ 70 %)`
                : 'Passez votre premier quiz',
          },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-xl border border-[#E2D8C8] bg-[#FAF8F4] p-5 space-y-1.5"
          >
            <p className="text-xs text-[#5C554B]">{kpi.label}</p>
            <p className="font-mono-tabular text-2xl sm:text-3xl font-semibold text-[#111111]">
              {kpi.value}
            </p>
            <p className="text-[11px] text-[#5C554B]">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* 3 Levels Competency Validation */}
      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold text-[#111111]">
          Validation par niveau pédagogique
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {overview.levels.map((lvl) => (
            <div
              key={lvl.level}
              className={`rounded-xl border p-6 space-y-4 ${
                lvl.isValidated
                  ? 'border-[#111111] bg-[#F5EFE6]'
                  : 'border-[#E2D8C8] bg-[#FAF8F4]'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-display text-xl font-semibold text-[#111111]">
                  Niveau {lvl.level}
                </h3>
                <span
                  className={`inline-flex items-center gap-1 text-xs font-mono-tabular ${
                    lvl.isValidated ? 'text-[#166534] font-semibold' : 'text-[#5C554B]'
                  }`}
                >
                  <Award className="h-4 w-4" aria-hidden="true" />
                  <span>{lvl.isValidated ? 'Validé' : 'En cours'}</span>
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono-tabular">
                  <span className="text-[#5C554B]">Progression niveau</span>
                  <span className="text-[#111111] font-semibold">{lvl.completionPercentage} %</span>
                </div>
                <div className="h-2 w-full rounded bg-[#E2D8C8] overflow-hidden">
                  <div
                    className="h-full bg-[#111111] transition-all duration-300"
                    style={{ width: `${lvl.completionPercentage}%` }}
                  />
                </div>
              </div>

              <dl className="grid grid-cols-3 gap-2 border-t border-[#E2D8C8] pt-3 text-xs font-mono-tabular">
                <div>
                  <dt className="text-[#5C554B]">Chapitres</dt>
                  <dd className="text-[#111111] font-semibold mt-0.5">
                    {lvl.validatedChapters}/{lvl.totalChapters}
                  </dd>
                </div>
                <div>
                  <dt className="text-[#5C554B]">Ateliers</dt>
                  <dd className="text-[#111111] font-semibold mt-0.5">
                    {lvl.completedExercises}/{lvl.totalChapters}
                  </dd>
                </div>
                <div>
                  <dt className="text-[#5C554B]">Quiz ≥70%</dt>
                  <dd className="text-[#111111] font-semibold mt-0.5">
                    {lvl.passedQuizzes}/{lvl.totalChapters}
                  </dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </section>

      {/* 9 Chapters Detailed Matrix */}
      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold text-[#111111]">
          Suivi détaillé des {CHAPTERS.length} chapitres
        </h2>
        <div className="overflow-x-auto rounded-xl border border-[#E2D8C8] bg-white">
          <table className="w-full min-w-[680px] text-left text-xs">
            <thead>
              <tr className="border-b border-[#E2D8C8] bg-[#F5EFE6] font-mono-tabular text-[#111111]">
                <th className="px-4 py-3.5 font-semibold">Chapitre</th>
                <th className="px-4 py-3.5 font-semibold">Niveau</th>
                <th className="px-4 py-3.5 font-semibold">Cours</th>
                <th className="px-4 py-3.5 font-semibold">Exercice pratique</th>
                <th className="px-4 py-3.5 font-semibold">Score Quiz</th>
                <th className="px-4 py-3.5 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2D8C8]">
              {CHAPTERS.map((ch) => {
                const lessonDone = progress.completedChapters.includes(ch.id);
                const exDone = progress.completedExercises.includes(ch.id);
                const qRec = progress.chapterQuizScores[ch.id];

                return (
                  <tr key={ch.id} className="hover:bg-[#FAF8F4]">
                    <td className="px-4 py-3.5 font-medium text-[#111111]">
                      <span className="font-mono-tabular text-[#7D6340] mr-2">
                        {String(ch.id).padStart(2, '0')}.
                      </span>
                      {ch.shortTitle}
                    </td>
                    <td className="px-4 py-3.5 text-[#5C554B]">{ch.level}</td>
                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center gap-1.5 text-[#2E2A25]">
                        {lessonDone ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#166534]" aria-hidden="true" />
                        ) : (
                          <Circle className="h-3.5 w-3.5 text-[#CFC2AE]" aria-hidden="true" />
                        )}
                        {lessonDone ? 'Validé' : 'À lire'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center gap-1.5 text-[#2E2A25]">
                        {exDone ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#166534]" aria-hidden="true" />
                        ) : (
                          <Circle className="h-3.5 w-3.5 text-[#CFC2AE]" aria-hidden="true" />
                        )}
                        {exDone ? 'Réalisé' : 'À pratiquer'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-mono-tabular">
                      {qRec ? (
                        <span className={qRec.passed ? 'text-[#166534] font-semibold' : 'text-[#92400E] font-semibold'}>
                          {qRec.percentage} % ({qRec.score}/{qRec.total})
                        </span>
                      ) : (
                        <span className="text-[#5C554B]">Non évalué</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => onOpenChapter(ch.id)}
                        className="text-xs font-semibold text-[#111111] underline decoration-[#CFC2AE] underline-offset-4 hover:decoration-[#111111] cursor-pointer"
                      >
                        Ouvrir →
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Thematic Quizzes Summary */}
      <section className="space-y-4">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="font-display text-2xl font-semibold text-[#111111]">
            Résultats des ateliers thématiques
          </h2>
          <button
            type="button"
            onClick={() => onNavigate('quiz')}
            className="text-xs font-semibold text-[#7D6340] hover:text-[#111111] cursor-pointer"
          >
            Aller au centre de Quiz →
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {QUIZ_MODE_META.map((m) => {
            const rec = progress.categoryQuizScores[m.id];
            return (
              <div
                key={m.id}
                className="rounded-xl border border-[#E2D8C8] bg-[#FAF8F4] p-4 flex items-center justify-between gap-4"
              >
                <div>
                  <p className="text-sm font-semibold text-[#111111]">{m.title}</p>
                  <p className="text-xs text-[#5C554B] mt-0.5">{m.subtitle}</p>
                </div>
                <span
                  className={`font-mono-tabular text-sm font-semibold shrink-0 ${
                    rec
                      ? rec.passed
                        ? 'text-[#166534]'
                        : 'text-[#92400E]'
                      : 'text-[#5C554B]'
                  }`}
                >
                  {rec ? `${rec.percentage} %` : '—'}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
