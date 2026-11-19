import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, RotateCcw, XCircle } from 'lucide-react';
import { CHAPTERS } from '../data/chapters';
import { QUIZ_MODE_META, QUIZ_QUESTIONS } from '../data/quizzes';
import { ProgressState, QuizQuestion, QuizResultRecord } from '../types/academy';
import { evaluateQuizAnswers } from '../utils/academyLogic';
import { EditorialFigure } from './EditorialFigure';

interface QuizViewProps {
  progress: ProgressState;
  onSaveCategoryQuiz: (categoryId: string, record: QuizResultRecord) => void;
  onSaveChapterQuiz: (chapterId: number, record: QuizResultRecord) => void;
}

interface ActiveQuizSession {
  key: string;
  title: string;
  subtitle: string;
  isChapter: boolean;
  chapterId?: number;
  questions: QuizQuestion[];
}

export const QuizView: React.FC<QuizViewProps> = ({
  progress,
  onSaveCategoryQuiz,
  onSaveChapterQuiz,
}) => {
  const [session, setSession] = useState<ActiveQuizSession | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const startCategoryQuiz = (catId: string, title: string, subtitle: string) => {
    const questions =
      catId === 'examen-complet'
        ? QUIZ_QUESTIONS
        : QUIZ_QUESTIONS.filter((q) => q.category === catId);
    setSession({
      key: catId,
      title,
      subtitle,
      isChapter: false,
      questions,
    });
    setAnswers({});
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startChapterQuiz = (chapterId: number) => {
    const ch = CHAPTERS.find((c) => c.id === chapterId);
    const questions = QUIZ_QUESTIONS.filter((q) => q.chapterId === chapterId);
    if (!ch || questions.length === 0) return;
    setSession({
      key: `chapter-${chapterId}`,
      title: `Évaluation — ${ch.title}`,
      subtitle: `Niveau ${ch.level} · ${questions.length} questions`,
      isChapter: true,
      chapterId,
      questions,
    });
    setAnswers({});
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = () => {
    if (!session) return;
    const evaluation = evaluateQuizAnswers(session.questions, answers);
    setSubmitted(true);

    const record: QuizResultRecord = {
      score: evaluation.score,
      total: evaluation.total,
      percentage: evaluation.percentage,
      passed: evaluation.passed,
      completedAt: new Date().toISOString(),
    };

    if (session.isChapter && session.chapterId) {
      onSaveChapterQuiz(session.chapterId, record);
    } else {
      onSaveCategoryQuiz(session.key, record);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Active Quiz Session Runner
  if (session) {
    const answeredCount = Object.keys(answers).length;
    const evaluation = submitted
      ? evaluateQuizAnswers(session.questions, answers)
      : null;

    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E2D8C8] pb-6">
          <div>
            <button
              type="button"
              onClick={() => setSession(null)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#7D6340] hover:text-[#111111] mb-2 cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Retour au centre d’évaluations</span>
            </button>
            <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[#111111]">
              {session.title}
            </h1>
            <p className="text-xs text-[#5C554B] mt-1">{session.subtitle}</p>
          </div>
          <p className="font-mono-tabular text-xs font-semibold text-[#111111]">
            Réponses : {answeredCount} / {session.questions.length}
          </p>
        </div>

        {/* Evaluation Result Banner */}
        {submitted && evaluation && (
          <div
            data-testid="quiz-result-banner"
            className={`rounded-xl border p-6 space-y-3 ${
              evaluation.passed
                ? 'border-[#BBF7D0] bg-[#ECFDF5]'
                : 'border-[#FDE68A] bg-[#FFFBEB]'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p
                  className={`text-xs font-mono-tabular uppercase tracking-wider font-semibold ${
                    evaluation.passed ? 'text-[#166534]' : 'text-[#92400E]'
                  }`}
                >
                  {evaluation.passed
                    ? 'Évaluation validée (seuil ≥ 70 %)'
                    : 'Seuil de validation non atteint (< 70 %)'}
                </p>
                <p className="mt-1 font-display text-3xl font-semibold text-[#111111] tabular-nums">
                  {evaluation.percentage} % — {evaluation.score} / {evaluation.total} bonnes réponses
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setAnswers({});
                    setSubmitted(false);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-md border border-[#CFC2AE] bg-white px-4 py-2 text-xs font-semibold text-[#111111] hover:bg-[#F5EFE6] cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Refaire ce test</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSession(null)}
                  className="rounded-md bg-[#111111] px-4 py-2 text-xs font-semibold text-white hover:bg-[#292622] cursor-pointer"
                >
                  Autres évaluations
                </button>
              </div>
            </div>
            <p className="text-xs text-[#2E2A25]">
              Consultez ci-dessous chaque correction détaillée et l’explication pédagogique associée.
            </p>
          </div>
        )}

        {/* Questions List */}
        <div className="space-y-6">
          {session.questions.map((q, idx) => {
            const selectedIdx = answers[q.id];
            const evalItem = evaluation?.items.find((i) => i.questionId === q.id);

            return (
              <div
                key={q.id}
                className="rounded-xl border border-[#E2D8C8] bg-[#FAF8F4] p-5 sm:p-6 space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-base font-semibold text-[#111111] leading-snug">
                    <span className="font-mono-tabular text-sm text-[#7D6340] mr-2">
                      {String(idx + 1).padStart(2, '0')}.
                    </span>
                    {q.prompt}
                  </p>
                  <span className="font-mono-tabular text-[11px] text-[#5C554B] shrink-0">
                    Ch. {q.chapterId}
                  </span>
                </div>

                {q.imageId && (
                  <div className="max-w-sm">
                    <EditorialFigure assetId={q.imageId} aspectClass="aspect-[4/3]" hideCaption />
                  </div>
                )}

                <div className="grid grid-cols-1 gap-2.5">
                  {q.options.map((option, optIdx) => {
                    const isSelected = selectedIdx === optIdx;
                    const isCorrectOpt = q.correctIndex === optIdx;

                    let style =
                      'border-[#E2D8C8] bg-white text-[#2E2A25] hover:border-[#111111]';
                    if (submitted) {
                      if (isCorrectOpt) {
                        style = 'border-[#86EFAC] bg-[#ECFDF5] text-[#166534] font-medium';
                      } else if (isSelected && !isCorrectOpt) {
                        style = 'border-[#FCA5A5] bg-[#FEF2F2] text-[#991B1B] font-medium';
                      }
                    } else if (isSelected) {
                      style = 'border-[#111111] bg-[#F5EFE6] text-[#111111] font-medium';
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        disabled={submitted}
                        onClick={() =>
                          setAnswers((prev) => ({ ...prev, [q.id]: optIdx }))
                        }
                        className={`flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors cursor-pointer disabled:cursor-default ${style}`}
                      >
                        <span>
                          <span className="font-mono-tabular text-xs mr-2.5 opacity-75">
                            {String.fromCharCode(65 + optIdx)}.
                          </span>
                          {option}
                        </span>
                        {submitted && isCorrectOpt && (
                          <CheckCircle2 className="h-4 w-4 text-[#166534] shrink-0" aria-hidden="true" />
                        )}
                        {submitted && isSelected && !isCorrectOpt && (
                          <XCircle className="h-4 w-4 text-[#991B1B] shrink-0" aria-hidden="true" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {submitted && evalItem && (
                  <div className="rounded-lg border border-[#E2D8C8] bg-white p-4 text-xs leading-relaxed">
                    <p
                      className={`font-semibold mb-1 ${
                        evalItem.isCorrect ? 'text-[#166534]' : 'text-[#991B1B]'
                      }`}
                    >
                      {evalItem.isCorrect
                        ? 'Exact — Bonne maîtrise'
                        : `Correction : Réponse ${String.fromCharCode(65 + q.correctIndex)}`}
                    </p>
                    <p className="text-[#2E2A25]">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit Bar */}
        {!submitted && (
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#E2D8C8] pt-6">
            <p className="text-xs text-[#5C554B]">
              {answeredCount < session.questions.length
                ? `Répondez encore à ${session.questions.length - answeredCount} question(s) pour valider l’évaluation.`
                : 'Toutes les questions sont complétées : vous pouvez afficher la correction.'}
            </p>
            <button
              type="button"
              disabled={answeredCount < session.questions.length}
              onClick={handleSubmit}
              className="rounded-md bg-[#111111] px-6 py-3 text-sm font-semibold text-white hover:bg-[#292622] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Valider et voir les corrections
            </button>
          </div>
        )}
      </div>
    );
  }

  // Quiz Center Selection Menu
  const fullExamRecord = progress.categoryQuizScores['examen-complet'];

  return (
    <div className="mx-auto max-w-[1360px] px-4 py-12 sm:px-6 lg:px-8 space-y-14">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between border-b border-[#E2D8C8] pb-8">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs font-mono-tabular text-[#7D6340]">
            Évaluations interactives · Corrections immédiates · Seuil de réussite 70 %
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#111111]">
            Quiz & Évaluations de compétences
          </h1>
          <p className="text-sm sm:text-base leading-relaxed text-[#5C554B]">
            Testez vos réflexes sur le matériel professionnel, les longueurs de sabots,
            les 10 types de fade, l’hygiène et les cas clients réels. Chaque score s’enregistre
            automatiquement dans votre progression.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            startCategoryQuiz(
              'examen-complet',
              'Examen Blanc Complet — Afro Barbering',
              `${QUIZ_QUESTIONS.length} questions couvrant l’ensemble des ${CHAPTERS.length} chapitres`
            )
          }
          className="inline-flex items-center gap-2 rounded-md bg-[#111111] px-5 py-3 text-xs font-semibold text-white hover:bg-[#292622] transition-colors whitespace-nowrap shrink-0 self-start lg:self-auto cursor-pointer"
        >
          <span>
            Lancer l’Examen Blanc ({QUIZ_QUESTIONS.length} questions)
            {fullExamRecord ? ` · Meilleur : ${fullExamRecord.percentage} %` : ''}
          </span>
        </button>
      </div>

      {/* 5 Specialized Assessment Modes */}
      <section className="space-y-5">
        <h2 className="font-display text-2xl font-semibold text-[#111111]">
          Ateliers de reconnaissance & tests thématiques
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {QUIZ_MODE_META.map((mode) => {
            const count = QUIZ_QUESTIONS.filter((q) => q.category === mode.id).length;
            const rec = progress.categoryQuizScores[mode.id];
            return (
              <div
                key={mode.id}
                className="flex flex-col justify-between rounded-xl border border-[#E2D8C8] bg-[#FAF8F4] p-6 space-y-5"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2 text-xs font-mono-tabular">
                    <span className="text-[#7D6340] font-semibold">{count} questions</span>
                    {rec ? (
                      <span className={rec.passed ? 'text-[#166534] font-semibold' : 'text-[#92400E] font-semibold'}>
                        Score : {rec.percentage} %
                      </span>
                    ) : (
                      <span className="text-[#5C554B]">Non passé</span>
                    )}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-[#111111]">
                    {mode.title}
                  </h3>
                  <p className="text-xs font-medium text-[#7D6340]">{mode.subtitle}</p>
                  <p className="text-sm leading-relaxed text-[#5C554B]">{mode.description}</p>
                </div>

                <button
                  type="button"
                  onClick={() => startCategoryQuiz(mode.id, mode.title, mode.subtitle)}
                  className="w-full rounded-md border border-[#111111] bg-white px-4 py-2.5 text-xs font-semibold text-[#111111] hover:bg-[#111111] hover:text-white transition-colors cursor-pointer"
                >
                  {rec ? 'Repasser cette évaluation' : 'Démarrer le quiz'}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Per-Chapter Quizzes (9 chapters in balanced 3x3 grid) */}
      <section className="space-y-5">
        <h2 className="font-display text-2xl font-semibold text-[#111111]">
          Évaluations par chapitre (Chapitres 01 à {String(CHAPTERS.length).padStart(2, '0')})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CHAPTERS.map((ch) => {
            const count = QUIZ_QUESTIONS.filter((q) => q.chapterId === ch.id).length;
            const rec = progress.chapterQuizScores[ch.id];
            return (
              <button
                key={ch.id}
                type="button"
                onClick={() => startChapterQuiz(ch.id)}
                className="rounded-xl border border-[#E2D8C8] bg-[#FAF8F4] p-4 text-left hover:border-[#111111] hover:bg-[#F5EFE6] transition-colors flex flex-col justify-between gap-3 cursor-pointer"
              >
                <div>
                  <p className="font-mono-tabular text-[11px] text-[#7D6340]">
                    Ch. {String(ch.id).padStart(2, '0')} · {ch.level}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#111111] leading-snug">
                    {ch.shortTitle}
                  </p>
                </div>
                <div className="border-t border-[#E2D8C8] pt-2.5 flex items-center justify-between text-[11px] font-mono-tabular">
                  <span className="text-[#5C554B]">{count} Q.</span>
                  <span
                    className={
                      rec
                        ? rec.passed
                          ? 'text-[#166534] font-semibold'
                          : 'text-[#92400E] font-semibold'
                        : 'text-[#111111] font-medium'
                    }
                  >
                    {rec ? `${rec.percentage} %` : 'Évaluer →'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};
