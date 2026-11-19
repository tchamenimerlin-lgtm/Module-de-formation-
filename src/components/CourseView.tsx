import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookmarkCheck,
  CheckCircle2,
  ClipboardCheck,
  Lightbulb,
  Wrench,
} from 'lucide-react';
import { CHAPTERS } from '../data/chapters';
import { AFRO_HAIRSTYLES, FADE_TYPES } from '../data/fadesAndStyles';
import {
  BARBER_TOOLS,
  CLIPPER_VS_TRIMMER_VS_SHAVER,
  GUARD_GUIDES,
} from '../data/hairAndTools';
import { QUIZ_QUESTIONS } from '../data/quizzes';
import { NavView, ProgressState, QuizResultRecord } from '../types/academy';
import { evaluateQuizAnswers } from '../utils/academyLogic';
import { EditorialFigure } from './EditorialFigure';
import { TechnicalDiagram } from './TechnicalDiagrams';

interface CourseViewProps {
  activeChapterId: number;
  progress: ProgressState;
  onSelectChapter: (chapterId: number) => void;
  onToggleChapterComplete: (chapterId: number) => void;
  onToggleExerciseComplete: (chapterId: number) => void;
  onSaveChapterQuiz: (chapterId: number, record: QuizResultRecord) => void;
  onSaveNote: (chapterId: number, note: string) => void;
  onNavigate: (view: NavView) => void;
}

export const CourseView: React.FC<CourseViewProps> = ({
  activeChapterId,
  progress,
  onSelectChapter,
  onToggleChapterComplete,
  onToggleExerciseComplete,
  onSaveChapterQuiz,
  onSaveNote,
  onNavigate,
}) => {
  const chapter = CHAPTERS.find((c) => c.id === activeChapterId) ?? CHAPTERS[0];
  const chapterIndex = CHAPTERS.findIndex((c) => c.id === chapter.id);
  const prevChapter = chapterIndex > 0 ? CHAPTERS[chapterIndex - 1] : null;
  const nextChapter =
    chapterIndex < CHAPTERS.length - 1 ? CHAPTERS[chapterIndex + 1] : null;

  const [selectedFadeId, setSelectedFadeId] = useState(FADE_TYPES[1].id);
  const [compareFadeLeftId, setCompareFadeLeftId] = useState(FADE_TYPES[0].id); // Low Fade
  const [compareFadeRightId, setCompareFadeRightId] = useState(FADE_TYPES[1].id); // Mid Fade
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmittedForChapter, setQuizSubmittedForChapter] = useState<number | null>(null);

  const chapterQuestions = QUIZ_QUESTIONS.filter((q) => q.chapterId === chapter.id);
  const isChapterDone = progress.completedChapters.includes(chapter.id);
  const isExerciseDone = progress.completedExercises.includes(chapter.id);
  const savedQuiz = progress.chapterQuizScores[chapter.id];
  const isQuizEvaluated = quizSubmittedForChapter === chapter.id;

  const currentEval = isQuizEvaluated
    ? evaluateQuizAnswers(chapterQuestions, quizAnswers)
    : null;

  const handleSelectChapter = (id: number) => {
    setQuizAnswers({});
    setQuizSubmittedForChapter(null);
    onSelectChapter(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitMiniQuiz = () => {
    const result = evaluateQuizAnswers(chapterQuestions, quizAnswers);
    setQuizSubmittedForChapter(chapter.id);
    onSaveChapterQuiz(chapter.id, {
      score: result.score,
      total: result.total,
      percentage: result.percentage,
      passed: result.passed,
      completedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="mx-auto max-w-[1360px] px-4 py-8 sm:px-6 lg:px-8">
      {/* Mobile / Tablet Chapter Selector */}
      <div className="lg:hidden mb-6">
        <label
          htmlFor="mobile-chapter-select"
          className="block text-xs font-mono-tabular text-[#7D6340] mb-2"
        >
          Sélectionner un chapitre du cours
        </label>
        <select
          id="mobile-chapter-select"
          value={chapter.id}
          onChange={(e) => handleSelectChapter(Number(e.target.value))}
          className="w-full min-h-[44px] rounded-lg border border-[#CFC2AE] bg-white px-3.5 py-2.5 text-sm text-[#111111]"
        >
          {CHAPTERS.map((c) => (
            <option key={c.id} value={c.id}>
              Ch. {String(c.id).padStart(2, '0')} — {c.shortTitle} ({c.level})
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Sticky Chapter Index Rail */}
        <aside
          aria-label="Sommaire des chapitres"
          className="hidden lg:block lg:col-span-3 lg:sticky lg:top-24 rounded-xl border border-[#E2D8C8] bg-[#FAF8F4] p-4"
        >
          <div className="border-b border-[#E2D8C8] pb-3 mb-3">
            <p className="text-xs font-mono-tabular text-[#7D6340]">Manuel interactif</p>
            <p className="text-sm font-semibold text-[#111111] mt-0.5">
              Les {CHAPTERS.length} Chapitres
            </p>
          </div>

          <nav className="space-y-1">
            {CHAPTERS.map((c) => {
              const active = c.id === chapter.id;
              const done = progress.completedChapters.includes(c.id);
              const qRec = progress.chapterQuizScores[c.id];
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => handleSelectChapter(c.id)}
                  aria-current={active ? 'page' : undefined}
                  className={`w-full rounded-lg px-3 py-2.5 text-left transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#111111] text-white border border-[#111111]'
                      : 'text-[#2E2A25] hover:bg-[#F5EFE6] hover:text-[#111111] border border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-[11px] font-mono-tabular">
                    <span className={active ? 'text-[#E8DEC8]' : 'text-[#5C554B]'}>
                      {String(c.id).padStart(2, '0')} · {c.level}
                    </span>
                    {done && (
                      <CheckCircle2
                        className={`h-3.5 w-3.5 shrink-0 ${active ? 'text-[#E8DEC8]' : 'text-[#166534]'}`}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <p className="mt-0.5 text-xs font-medium leading-snug">{c.shortTitle}</p>
                  {qRec && (
                    <p
                      className={`mt-1 text-[10px] font-mono-tabular ${
                        active ? 'text-[#D6C9B4]' : 'text-[#5C554B]'
                      }`}
                    >
                      Quiz : {qRec.percentage} %
                    </p>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Editorial Chapter Content */}
        <article className="lg:col-span-9 space-y-12 pb-16">
          {/* Chapter Header */}
          <header className="space-y-5 border-b border-[#E2D8C8] pb-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular text-[#5C554B]">
                <span className="text-[#7D6340] font-semibold">
                  Chapitre {String(chapter.id).padStart(2, '0')} / {String(CHAPTERS.length).padStart(2, '0')}
                </span>
                <span aria-hidden="true">·</span>
                <span>Niveau {chapter.level}</span>
                <span aria-hidden="true">·</span>
                <span>Durée estimée : {chapter.durationMinutes} min</span>
              </div>

              <button
                type="button"
                onClick={() => onToggleChapterComplete(chapter.id)}
                className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isChapterDone
                    ? 'bg-[#ECFDF5] text-[#166534] border border-[#BBF7D0] hover:bg-[#DCFCE7]'
                    : 'bg-white text-[#111111] border border-[#CFC2AE] hover:bg-[#F5EFE6] hover:border-[#111111]'
                }`}
              >
                <BookmarkCheck className="h-4 w-4" aria-hidden="true" />
                <span>{isChapterDone ? 'Chapitre validé' : 'Marquer le chapitre comme lu'}</span>
              </button>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#111111]">
              {chapter.title}
            </h1>

            <p className="max-w-3xl text-base leading-relaxed text-[#2E2A25]">
              {chapter.summaryIntro}
            </p>

            {/* Objectives Strip */}
            <div className="rounded-xl border border-[#E2D8C8] bg-[#FAF8F4] p-5">
              <p className="text-xs font-mono-tabular text-[#7D6340] mb-3">
                Objectifs d’apprentissage du chapitre
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {chapter.objectives.map((obj) => (
                  <li key={obj} className="flex items-start gap-2 text-sm text-[#2E2A25]">
                    <CheckCircle2 className="h-4 w-4 text-[#111111] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hero Pedagogical Photo */}
            <EditorialFigure
              assetId={chapter.heroImageId}
              captionOverride={chapter.heroCaption}
              aspectClass="aspect-[16/9]"
              priority
            />
          </header>

          {/* 1. Cours théorique détaillé */}
          <section className="space-y-10">
            {chapter.sections.map((sec) => (
              <div key={sec.title} className="space-y-4">
                <h2 className="font-display text-2xl font-semibold text-[#111111]">
                  {sec.title}
                </h2>
                <div className="space-y-3.5 max-w-3xl">
                  {sec.paragraphs.map((p, i) => (
                    <p key={i} className="text-[15px] leading-[1.75] text-[#2E2A25]">
                      {p}
                    </p>
                  ))}
                </div>
                {sec.bulletPoints && sec.bulletPoints.length > 0 && (
                  <ul className="space-y-2.5 max-w-3xl pt-1">
                    {sec.bulletPoints.map((bp, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-[#2E2A25]">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 rounded-full bg-[#7D6340] shrink-0"
                        />
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {sec.figureId && (
                  <div className="pt-2">
                    <EditorialFigure
                      assetId={sec.figureId}
                      captionOverride={sec.figureCaption}
                      aspectClass="aspect-[16/9]"
                    />
                  </div>
                )}
              </div>
            ))}
          </section>

          {/* 2. Interactive Technical Diagram / Simulator */}
          <section aria-label="Schéma technique interactif">
            <TechnicalDiagram
              kind={chapter.diagramKind}
              selectedFadeId={selectedFadeId}
              onSelectFade={setSelectedFadeId}
            />
          </section>

          {/* Chapter-specific Deep Encyclopedic Modules */}
          {chapter.id === 2 && (
            <section className="space-y-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-mono-tabular text-[#7D6340]">Comparatif essentiel</p>
                  <h2 className="mt-1 font-display text-2xl font-semibold text-[#111111]">
                    Clipper vs Trimmer vs Shaver
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('tools')}
                  className="inline-flex items-center gap-2 rounded-md border border-[#111111] bg-white px-4 py-2 text-xs font-semibold text-[#111111] hover:bg-[#111111] hover:text-white transition-colors cursor-pointer"
                >
                  <Wrench className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Ouvrir les 16 fiches outils complètes</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {CLIPPER_VS_TRIMMER_VS_SHAVER.map((m) => (
                  <div
                    key={m.tool}
                    className="rounded-xl border border-[#E2D8C8] bg-[#FAF8F4] p-5 space-y-3"
                  >
                    <h3 className="font-display text-lg font-semibold text-[#111111]">{m.tool}</h3>
                    <p className="font-mono-tabular text-xs font-semibold text-[#7D6340]">{m.cutRange}</p>
                    <p className="text-xs leading-relaxed text-[#2E2A25]">{m.primaryRole}</p>
                    <p className="text-xs leading-relaxed text-[#5C554B] border-t border-[#E2D8C8] pt-2">
                      <strong className="text-[#991B1B]">À ne jamais faire :</strong> {m.neverUseFor}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-[#E2D8C8] bg-[#FAF8F4] p-5">
                <p className="text-xs font-mono-tabular text-[#7D6340] mb-3">
                  Inventaire des 16 outils étudiés dans ce chapitre
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {BARBER_TOOLS.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => onNavigate('tools')}
                      className="rounded-lg border border-[#E2D8C8] bg-white p-3 text-left hover:border-[#111111] transition-colors cursor-pointer"
                    >
                      <p className="font-mono-tabular text-[11px] text-[#7D6340]">
                        Outil #{String(t.number).padStart(2, '0')}
                      </p>
                      <p className="mt-1 text-xs font-semibold text-[#111111]">{t.name}</p>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          )}

          {chapter.id === 3 && (
            <section className="space-y-4">
              <div>
                <p className="text-xs font-mono-tabular text-[#7D6340]">Tableau de référence</p>
                <h2 className="mt-1 font-display text-2xl font-semibold text-[#111111]">
                  Tableau visuel des sabots standards (0 à #8)
                </h2>
                <p className="mt-1 text-xs text-[#5C554B]">
                  Précision importante : les longueurs approximatives peuvent varier légèrement (±0,5 mm) selon les marques (Wahl, Andis, BaBylissPRO, JRL) et le réglage de la lame.
                </p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-[#E2D8C8] bg-white">
                <table className="w-full min-w-[680px] text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E2D8C8] bg-[#F5EFE6] text-[#111111] font-mono-tabular">
                      <th className="px-4 py-3.5 font-semibold">Guide / Sabot</th>
                      <th className="px-4 py-3.5 font-semibold">Fermé → Ouvert</th>
                      <th className="px-4 py-3.5 font-semibold">Échelle visuelle</th>
                      <th className="px-4 py-3.5 font-semibold">Rôle technique & usage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2D8C8]">
                    {GUARD_GUIDES.map((g) => (
                      <tr key={g.code} className="hover:bg-[#FAF8F4]">
                        <td className="px-4 py-3 font-semibold text-[#111111] whitespace-nowrap">
                          {g.label}
                        </td>
                        <td className="px-4 py-3 font-mono-tabular font-semibold text-[#7D6340] whitespace-nowrap">
                          {g.mmClosed} mm → {g.mmOpen} mm
                        </td>
                        <td className="px-4 py-3 w-44">
                          <div className="h-2.5 w-full rounded bg-[#ECE3D5] overflow-hidden">
                            <div
                              className="h-full bg-[#111111]"
                              style={{ width: `${Math.max(4, (g.mmClosed / 25) * 100)}%` }}
                            />
                          </div>
                        </td>
                        <td className="px-4 py-3 text-[#2E2A25] leading-relaxed">
                          {g.primaryUse}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {chapter.id === 4 && (
            <section className="space-y-8">
              {/* Side-by-Side Visual Fade Comparator */}
              <div className="rounded-xl border border-[#CFC2AE] bg-[#F5EFE6] p-5 sm:p-6 space-y-5">
                <div className="space-y-1.5 border-b border-[#E2D8C8] pb-4">
                  <p className="text-xs font-mono-tabular font-semibold text-[#7D6340]">
                    Comparateur visuel en images · Chapitre 04
                  </p>
                  <h2 className="font-display text-2xl font-semibold text-[#111111]">
                    Comparer deux types de Fade côte à côte
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5C554B]">
                    Placez deux dégradés en vis-à-vis pour observer immédiatement la différence de hauteur, de forme derrière l’oreille et de finition de peau.
                  </p>
                </div>

                {/* Preset Fade Pairs */}
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: 'Low vs Mid Fade', l: 'low-fade', r: 'mid-fade' },
                    { label: 'Mid vs High Fade', l: 'mid-fade', r: 'high-fade' },
                    { label: 'Skin vs Shadow Fade', l: 'skin-fade', r: 'shadow-fade' },
                    { label: 'Skin vs Bald Fade', l: 'skin-fade', r: 'bald-fade' },
                    { label: 'Taper vs Burst Fade', l: 'taper-fade', r: 'burst-fade' },
                    { label: 'Drop vs Temple Fade', l: 'drop-fade', r: 'temple-fade' },
                  ].map((pair) => {
                    const active = compareFadeLeftId === pair.l && compareFadeRightId === pair.r;
                    return (
                      <button
                        key={pair.label}
                        type="button"
                        onClick={() => {
                          setCompareFadeLeftId(pair.l);
                          setCompareFadeRightId(pair.r);
                        }}
                        className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          active
                            ? 'bg-[#111111] text-white font-semibold'
                            : 'border border-[#E2D8C8] bg-white text-[#2E2A25] hover:border-[#111111]'
                        }`}
                      >
                        {pair.label}
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    {
                      label: 'Dégradé A',
                      id: 'fade-cmp-left',
                      selectedId: compareFadeLeftId,
                      onChange: setCompareFadeLeftId,
                    },
                    {
                      label: 'Dégradé B',
                      id: 'fade-cmp-right',
                      selectedId: compareFadeRightId,
                      onChange: setCompareFadeRightId,
                    },
                  ].map((slot) => {
                    const f = FADE_TYPES.find((item) => item.id === slot.selectedId) ?? FADE_TYPES[0];
                    return (
                      <div
                        key={slot.label}
                        className="rounded-lg border border-[#E2D8C8] bg-white p-4 space-y-3"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <label
                            htmlFor={slot.id}
                            className="text-xs font-mono-tabular font-semibold text-[#7D6340]"
                          >
                            {slot.label}
                          </label>
                          <select
                            id={slot.id}
                            value={slot.selectedId}
                            onChange={(e) => slot.onChange(e.target.value)}
                            className="min-h-[36px] rounded-md border border-[#CFC2AE] bg-[#FAF8F4] px-2.5 py-1 text-xs font-semibold text-[#111111]"
                          >
                            {FADE_TYPES.map((opt) => (
                              <option key={opt.id} value={opt.id}>
                                {opt.number}. {opt.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <EditorialFigure
                          assetId={f.imageId}
                          captionOverride={f.caption}
                          aspectClass="aspect-[4/3]"
                        />

                        <div className="space-y-1.5 text-xs">
                          <p className="font-semibold text-[#111111]">
                            {f.name} — {f.frenchSubtitle}
                          </p>
                          <p className="text-[#2E2A25] leading-relaxed">
                            <span className="font-semibold text-[#7D6340]">Différence visible : </span>
                            {f.visualCue}
                          </p>
                          <p className="text-[#5C554B]">
                            <strong className="text-[#111111]">Hauteur :</strong> {f.heightZone}
                          </p>
                          <p className="text-[#5C554B]">
                            <strong className="text-[#111111]">Sabots :</strong>{' '}
                            <span className="font-mono-tabular text-[#7D6340]">{f.guardsUsed.join(' · ')}</span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-xs font-mono-tabular text-[#7D6340]">Fiches détaillées des 10 dégradés (10 photos distinctes)</p>
                <h2 className="mt-1 font-display text-2xl font-semibold text-[#111111]">
                  Protocoles complets étape par étape des 10 types de Fade
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {FADE_TYPES.map((fade) => (
                  <div
                    key={fade.id}
                    className={`rounded-xl border p-5 space-y-4 transition-colors ${
                      selectedFadeId === fade.id
                        ? 'border-[#111111] bg-[#F5EFE6]'
                        : 'border-[#E2D8C8] bg-[#FAF8F4]'
                    }`}
                  >
                    <EditorialFigure
                      assetId={fade.imageId}
                      captionOverride={fade.caption}
                      aspectClass="aspect-[4/3]"
                    />
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-mono-tabular text-xs text-[#7D6340]">
                          Fade #{String(fade.number).padStart(2, '0')} · {fade.difficulty}
                        </p>
                        <h3 className="font-display text-xl font-semibold text-[#111111]">
                          {fade.name} — {fade.frenchSubtitle}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedFadeId(fade.id)}
                        className="rounded-md border border-[#CFC2AE] bg-white px-2.5 py-1 text-[11px] font-medium text-[#111111] hover:bg-[#111111] hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Voir sur schéma
                      </button>
                    </div>

                    <p className="rounded-lg border border-[#E2D8C8] bg-white px-3.5 py-2.5 text-xs leading-relaxed text-[#111111]">
                      <span className="font-semibold text-[#7D6340]">Repère visuel : </span>
                      {fade.visualCue}
                    </p>

                    <p className="text-sm leading-relaxed text-[#2E2A25]">{fade.principle}</p>

                    <div className="space-y-2 border-t border-[#E2D8C8] pt-3 text-xs leading-relaxed">
                      <p className="text-[#5C554B]">
                        <strong className="text-[#111111]">Hauteur :</strong> {fade.heightZone}
                      </p>
                      <p className="text-[#5C554B]">
                        <strong className="text-[#111111]">Outils :</strong> {fade.requiredTools.join(', ')}
                      </p>
                      <p className="text-[#5C554B]">
                        <strong className="text-[#111111]">1re ligne :</strong> {fade.firstLinePosition}
                      </p>
                      <p className="text-[#5C554B]">
                        <strong className="text-[#7D6340]">Sabots :</strong> {fade.guardsUsed.join(' · ')}
                      </p>
                    </div>

                    <div className="border-t border-[#E2D8C8] pt-3">
                      <p className="text-xs font-semibold text-[#111111] mb-1.5">
                        Ordre des passages :
                      </p>
                      <ol className="space-y-1 text-xs text-[#2E2A25] list-decimal list-inside">
                        {fade.passOrder.map((st, i) => (
                          <li key={i}>{st}</li>
                        ))}
                      </ol>
                      <p className="mt-2.5 text-xs text-[#5C554B]">
                        <strong className="text-[#111111]">Finition & contrôle :</strong>{' '}
                        {fade.finishingCheck}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {chapter.id === 5 && (
            <section className="space-y-5">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-mono-tabular text-[#7D6340]">Catalogue illustré · 15 photographies uniques</p>
                  <h2 className="mt-1 font-display text-2xl font-semibold text-[#111111]">
                    Visualiser la différence entre les 15 modèles de coiffure afro
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('gallery')}
                  className="inline-flex items-center gap-2 rounded-md bg-[#111111] px-4 py-2 text-xs font-semibold text-white hover:bg-[#292622] transition-colors cursor-pointer"
                >
                  <span>Ouvrir la Galerie & le Comparateur côte à côte</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {AFRO_HAIRSTYLES.map((style) => (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => onNavigate('gallery')}
                    className="group rounded-xl border border-[#E2D8C8] bg-[#FAF8F4] overflow-hidden text-left hover:border-[#111111] transition-colors flex flex-col cursor-pointer"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-[#F5EFE6]">
                      <EditorialFigure assetId={style.imageId} aspectClass="aspect-[4/3]" hideCaption />
                    </div>
                    <div className="p-4 space-y-2 flex-1">
                      <p className="font-mono-tabular text-[11px] text-[#7D6340]">
                        #{String(style.number).padStart(2, '0')} · {style.difficulty} · {style.suitableHairTypes.join('/')}
                      </p>
                      <h3 className="font-display text-base font-semibold text-[#111111] group-hover:text-[#7D6340] transition-colors">
                        {style.name}
                      </h3>
                      <p className="text-xs leading-relaxed text-[#5C554B]">
                        {style.visualCue}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* 4. Exemples concrets */}
          {chapter.concreteExamples.length > 0 && (
            <section className="space-y-4">
              <p className="text-xs font-mono-tabular text-[#7D6340]">Mises en situation réelles</p>
              <h2 className="font-display text-2xl font-semibold text-[#111111]">
                Exemples concrets au fauteuil
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {chapter.concreteExamples.map((ex, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-[#E2D8C8] bg-[#FAF8F4] p-5 space-y-3"
                  >
                    <p className="text-xs font-mono-tabular text-[#7D6340]">
                      Cas client #{i + 1}
                    </p>
                    <p className="text-sm font-semibold text-[#111111] leading-snug">
                      {ex.scenario}
                    </p>
                    <dl className="space-y-2 border-t border-[#E2D8C8] pt-3 text-xs leading-relaxed">
                      <div>
                        <dt className="text-[#5C554B] font-medium">Diagnostic</dt>
                        <dd className="text-[#2E2A25]">{ex.diagnosis}</dd>
                      </div>
                      <div>
                        <dt className="text-[#7D6340] font-semibold">Décision professionnelle</dt>
                        <dd className="text-[#111111]">{ex.action}</dd>
                      </div>
                      <div>
                        <dt className="text-[#166534] font-semibold">Résultat obtenu</dt>
                        <dd className="text-[#2E2A25]">{ex.result}</dd>
                      </div>
                    </dl>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 5 & 6. Conseils de professionnels + Erreurs à éviter */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-[#CFC2AE] bg-[#F5EFE6] p-6 space-y-3">
              <div className="flex items-center gap-2 text-[#111111]">
                <Lightbulb className="h-4 w-4 text-[#7D6340] shrink-0" aria-hidden="true" />
                <h3 className="font-display text-lg font-semibold">Conseils de professionnels</h3>
              </div>
              <ul className="space-y-2.5 text-sm leading-relaxed text-[#2E2A25]">
                {chapter.proTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span aria-hidden="true" className="font-mono-tabular text-xs font-semibold text-[#7D6340] mt-0.5">
                      0{i + 1}.
                    </span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-[#E2D8C8] bg-[#FAF8F4] p-6 space-y-3">
              <div className="flex items-center gap-2 text-[#111111]">
                <AlertTriangle className="h-4 w-4 text-[#991B1B] shrink-0" aria-hidden="true" />
                <h3 className="font-display text-lg font-semibold text-[#111111]">
                  Erreurs fréquentes à éviter
                </h3>
              </div>
              <ul className="space-y-2.5 text-sm leading-relaxed text-[#2E2A25]">
                {chapter.commonMistakes.map((err, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span aria-hidden="true" className="text-[#991B1B] font-bold">×</span>
                    <span>{err}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 7. Résumé des notions importantes */}
          <section className="rounded-xl border border-[#E2D8C8] bg-[#FAF8F4] p-6 space-y-3">
            <p className="text-xs font-mono-tabular text-[#7D6340]">Synthèse à retenir</p>
            <h3 className="font-display text-xl font-semibold text-[#111111]">
              Résumé des notions importantes
            </h3>
            <ul className="space-y-2 pt-1">
              {chapter.keyTakeaways.map((kt, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-[#2E2A25]">
                  <CheckCircle2 className="h-4 w-4 text-[#111111] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{kt}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 8. Exercice pratique + Notes personnelles */}
          <section className="rounded-xl border border-[#E2D8C8] bg-[#FAF8F4] p-6 space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[#E2D8C8] pb-4">
              <div>
                <p className="text-xs font-mono-tabular text-[#7D6340]">
                  Mise en pratique · {chapter.exercise.duration}
                </p>
                <h3 className="font-display text-xl font-semibold text-[#111111] mt-0.5">
                  {chapter.exercise.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onToggleExerciseComplete(chapter.id)}
                className={`inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isExerciseDone
                    ? 'bg-[#ECFDF5] text-[#166534] border border-[#BBF7D0]'
                    : 'bg-[#111111] text-white hover:bg-[#292622]'
                }`}
              >
                <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
                <span>
                  {isExerciseDone ? 'Atelier pratique validé' : 'Valider l’exercice pratique'}
                </span>
              </button>
            </div>

            <p className="text-sm text-[#2E2A25]">
              <strong className="text-[#111111]">Objectif :</strong> {chapter.exercise.objective}
            </p>
            <p className="text-xs text-[#5C554B]">
              <strong className="text-[#111111]">Matériel requis :</strong>{' '}
              {chapter.exercise.equipment.join(' · ')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
              <div>
                <p className="text-xs font-semibold text-[#7D6340] mb-2">Étapes de l’exercice</p>
                <ol className="space-y-2 text-sm text-[#2E2A25] list-decimal list-inside">
                  {chapter.exercise.steps.map((s, idx) => (
                    <li key={idx} className="leading-relaxed">{s}</li>
                  ))}
                </ol>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#7D6340] mb-2">Critères de validation</p>
                <ul className="space-y-2 text-sm text-[#2E2A25]">
                  {chapter.exercise.validationCriteria.map((c, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#111111] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Personal Notebook synced to localStorage + PDF manual */}
            <div className="border-t border-[#E2D8C8] pt-4">
              <label
                htmlFor={`chapter-note-${chapter.id}`}
                className="block text-xs font-medium text-[#7D6340] mb-1.5"
              >
                Vos notes personnelles sur ce chapitre (incluses dans votre Manuel PDF)
              </label>
              <textarea
                id={`chapter-note-${chapter.id}`}
                rows={3}
                value={progress.personalNotes[chapter.id] ?? ''}
                onChange={(e) => onSaveNote(chapter.id, e.target.value)}
                placeholder="Notez ici vos réglages de machines, observations sur un modèle ou points à retravailler..."
                className="w-full rounded-lg border border-[#CFC2AE] bg-white px-3.5 py-2.5 text-sm text-[#111111] placeholder:text-[#78716C]"
              />
            </div>
          </section>

          {/* 9. Mini Questionnaire d'évaluation du chapitre */}
          {chapterQuestions.length > 0 && (
            <section className="rounded-xl border border-[#E2D8C8] bg-[#FAF8F4] p-6 space-y-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#E2D8C8] pb-4">
                <div>
                  <p className="text-xs font-mono-tabular text-[#7D6340]">
                    Évaluation de fin de chapitre
                  </p>
                  <h3 className="font-display text-xl font-semibold text-[#111111]">
                    Validation des acquis — Chapitre {chapter.id}
                  </h3>
                </div>
                {savedQuiz && (
                  <p className="text-xs font-mono-tabular text-[#5C554B]">
                    Dernier score :{' '}
                    <span className={savedQuiz.passed ? 'text-[#166534] font-semibold' : 'text-[#92400E] font-semibold'}>
                      {savedQuiz.percentage} % ({savedQuiz.score}/{savedQuiz.total})
                    </span>
                  </p>
                )}
              </div>

              <div className="space-y-6">
                {chapterQuestions.map((q, qIdx) => {
                  const chosen = quizAnswers[q.id];
                  const evalItem = currentEval?.items.find((it) => it.questionId === q.id);

                  return (
                    <div key={q.id} className="space-y-3 border-b border-[#E2D8C8] pb-5 last:border-b-0 last:pb-0">
                      <p className="text-sm font-semibold text-[#111111]">
                        <span className="font-mono-tabular text-[#7D6340] mr-2">Q{qIdx + 1}.</span>
                        {q.prompt}
                      </p>
                      <div className="grid grid-cols-1 gap-2">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = chosen === optIdx;
                          const isRightOpt = q.correctIndex === optIdx;

                          let btnStyle =
                            'border-[#E2D8C8] bg-white text-[#2E2A25] hover:border-[#111111]';
                          if (isQuizEvaluated) {
                            if (isRightOpt) {
                              btnStyle =
                                'border-[#86EFAC] bg-[#ECFDF5] text-[#166534] font-medium';
                            } else if (isSelected && !isRightOpt) {
                              btnStyle = 'border-[#FCA5A5] bg-[#FEF2F2] text-[#991B1B] font-medium';
                            }
                          } else if (isSelected) {
                            btnStyle = 'border-[#111111] bg-[#F5EFE6] text-[#111111] font-medium';
                          }

                          return (
                            <button
                              key={optIdx}
                              type="button"
                              disabled={isQuizEvaluated}
                              onClick={() =>
                                setQuizAnswers((prev) => ({ ...prev, [q.id]: optIdx }))
                              }
                              className={`rounded-lg border px-4 py-3 text-left text-sm transition-colors cursor-pointer disabled:cursor-default ${btnStyle}`}
                            >
                              <span className="font-mono-tabular text-xs mr-2 opacity-75">
                                {String.fromCharCode(65 + optIdx)}.
                              </span>
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {isQuizEvaluated && evalItem && (
                        <div className="rounded-lg bg-white border border-[#E2D8C8] p-3.5 text-xs leading-relaxed">
                          <p
                            className={`font-semibold mb-1 ${
                              evalItem.isCorrect ? 'text-[#166534]' : 'text-[#991B1B]'
                            }`}
                          >
                            {evalItem.isCorrect
                              ? 'Bonne réponse'
                              : 'Correction attendue'}
                          </p>
                          <p className="text-[#2E2A25]">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                {!isQuizEvaluated ? (
                  <button
                    type="button"
                    disabled={Object.keys(quizAnswers).length < chapterQuestions.length}
                    onClick={handleSubmitMiniQuiz}
                    className="rounded-md bg-[#111111] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#292622] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    Corriger mes réponses ({Object.keys(quizAnswers).length}/{chapterQuestions.length})
                  </button>
                ) : (
                  <div className="flex flex-wrap items-center gap-4 w-full justify-between">
                    <p className="text-sm font-medium text-[#111111]">
                      Résultat :{' '}
                      <span
                        className={`font-mono-tabular font-semibold ${
                          currentEval?.passed ? 'text-[#166534]' : 'text-[#92400E]'
                        }`}
                      >
                        {currentEval?.percentage} % ({currentEval?.score}/{currentEval?.total})
                      </span>{' '}
                      —{' '}
                      {currentEval?.passed
                        ? 'Chapitre évalué avec succès !'
                        : 'Seuil recommandé : 70 %. Relisez les explications et réessayez.'}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setQuizAnswers({});
                        setQuizSubmittedForChapter(null);
                      }}
                      className="rounded-md border border-[#CFC2AE] bg-white px-4 py-2 text-xs font-medium text-[#111111] hover:bg-[#F5EFE6] cursor-pointer"
                    >
                      Recommencer le quiz
                    </button>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Previous / Next Chapter Footer Navigation */}
          <nav
            aria-label="Navigation entre chapitres"
            className="flex flex-wrap items-center justify-between gap-4 border-t border-[#E2D8C8] pt-8"
          >
            {prevChapter ? (
              <button
                type="button"
                onClick={() => handleSelectChapter(prevChapter.id)}
                className="inline-flex items-center gap-2 rounded-md border border-[#CFC2AE] bg-white px-4 py-2.5 text-xs font-medium text-[#111111] hover:bg-[#F5EFE6] transition-colors cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                <span>Ch. {prevChapter.id} : {prevChapter.shortTitle}</span>
              </button>
            ) : (
              <span />
            )}

            {nextChapter && (
              <button
                type="button"
                onClick={() => handleSelectChapter(nextChapter.id)}
                className="inline-flex items-center gap-2 rounded-md bg-[#111111] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#292622] transition-colors cursor-pointer"
              >
                <span>Suivant — Ch. {nextChapter.id} : {nextChapter.shortTitle}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </nav>
        </article>
      </div>
    </div>
  );
};
