import React from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Download,
  Scissors,
} from 'lucide-react';
import { CHAPTERS } from '../data/chapters';
import { NavView, ProgressState } from '../types/academy';
import { computeAcademyProgress } from '../utils/academyLogic';
import { EditorialFigure } from './EditorialFigure';

interface HomeViewProps {
  progress: ProgressState;
  onNavigate: (view: NavView) => void;
  onOpenChapter: (chapterId: number) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  progress,
  onNavigate,
  onOpenChapter,
}) => {
  const overview = computeAcademyProgress(CHAPTERS, progress);

  const nextChapter =
    CHAPTERS.find((c) => !progress.completedChapters.includes(c.id)) ??
    CHAPTERS[0];

  return (
    <div className="space-y-20 pb-20 bg-white">
      {/* Hero Split Section */}
      <section className="border-b border-[#E2D8C8] bg-[#FAF8F4]">
        <div className="mx-auto max-w-[1360px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-8 lg:gap-10 lg:grid-cols-12 lg:items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6 lg:space-y-8">
              <div className="space-y-4 lg:space-y-5">
                <p className="text-xs font-mono-tabular font-medium text-[#7D6340] tracking-wide">
                  Programme officiel · Coiffure masculine afro · Du débutant au maître barbier
                </p>

                <h1 className="font-display text-3xl sm:text-5xl lg:text-[3.35rem] font-semibold leading-[1.1] tracking-tight text-[#111111]">
                  L’école de référence en Afro Barbering professionnel.
                </h1>

                <p className="max-w-xl text-sm sm:text-base leading-relaxed text-[#2E2A25]">
                  NOTORIOUS BARBER ACADEMY 💈 réunit un véritable cursus de formation
                  structuré en 9 chapitres illustrés : bases du métier, maîtrise des 16 outils,
                  science des sabots et du levier, 10 types de fade, 15 coupes masculines afro,
                  techniques étape par étape, contours, hygiène et relation client.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
                <button
                  type="button"
                  onClick={() => onOpenChapter(nextChapter.id)}
                  className="inline-flex items-center gap-2.5 rounded-md bg-[#111111] px-5 sm:px-6 py-3 sm:py-3.5 text-sm font-semibold text-white hover:bg-[#292622] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>
                    {overview.validatedChaptersCount > 0
                      ? `Reprendre : Chapitre ${nextChapter.id}`
                      : 'Commencer la formation'}
                  </span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('resources')}
                  className="inline-flex items-center gap-2 rounded-md border border-[#CFC2AE] bg-white px-5 py-3 sm:py-3.5 text-sm font-medium text-[#111111] hover:bg-[#F5EFE6] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Download className="h-4 w-4 text-[#7D6340]" aria-hidden="true" />
                  <span>Télécharger le module complet</span>
                </button>
              </div>

              {/* Learner live progression summary line (quiet editorial metadata) */}
              <div className="border-t border-[#E2D8C8] pt-4 sm:pt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#5C554B]">
                <span>
                  Statut actuel :{' '}
                  <strong className="font-semibold text-[#111111]">
                    {overview.currentRankLabel}
                  </strong>
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-tabular">
                  Avancement global :{' '}
                  <strong className="text-[#111111] font-semibold">
                    {overview.overallProgressPercentage} %
                  </strong>
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-tabular">
                  {overview.validatedChaptersCount} / {overview.totalChapters} chapitres validés
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 flex">
              <div className="relative w-full min-h-[280px] sm:min-h-[360px] lg:min-h-full overflow-hidden rounded-xl border border-[#E2D8C8] bg-[#F5EFE6]">
                <img
                  src="/src/assets/images/hero_atelier_barber_1795088726953.jpg"
                  alt="Atelier Notorious Barber Academy lumineux en pierre beige, fauteuil de barbier noir mat et maître barbier afro réalisant un dégradé de précision"
                  referrerPolicy="no-referrer"
                  loading="eager"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#111111]/95 via-[#111111]/65 to-transparent p-5 sm:p-6 pt-20">
                  <p className="font-mono-tabular text-[11px] font-medium text-[#F5EFE6]">
                    NOTORIOUS BARBER ACADEMY · MANUEL & PLATEFORME
                  </p>
                  <p className="mt-1 text-sm text-white max-w-md">
                    Supports photographiques réels, schémas techniques interactifs,
                    ateliers pratiques et module téléchargeable hors ligne.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Full-width 4-column quantitative strip below hero */}
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 border-t border-[#E2D8C8] pt-8">
            {[
              {
                value: '9 chapitres',
                label: 'Cursus complet du débutant au niveau avancé',
              },
              {
                value: '16 outils · 11 guides',
                label: 'Fiches pratiques du matériel et calculateur de sabots',
              },
              {
                value: '10 fades · 15 coupes',
                label: 'Schémas crâniens, réglages du levier et protocoles',
              },
              {
                value: 'Module téléchargeable',
                label: 'Pack complet ZIP, PDF illustré et version HTML hors ligne',
              },
            ].map((stat) => (
              <div key={stat.value} className="space-y-1">
                <p className="font-display text-xl sm:text-2xl font-semibold text-[#111111]">
                  {stat.value}
                </p>
                <p className="text-xs leading-relaxed text-[#5C554B]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three Progression Levels */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-8">
          <div>
            <p className="text-xs font-mono-tabular font-medium text-[#7D6340]">Architecture pédagogique</p>
            <h2 className="mt-1 font-display text-3xl font-semibold text-[#111111]">
              Trois niveaux de maîtrise progressive
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('program')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#111111] hover:text-[#7D6340] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Voir le programme complet</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              level: 'Débutant' as const,
              range: 'Chapitres 01 à 02',
              title: 'Fondamentaux du Métier & Matériel Pro',
              desc: 'Poste de travail, morphologie du visage, consultation client et maîtrise intégrale des 16 outils essentiels.',
              startChapter: 1,
            },
            {
              level: 'Intermédiaire' as const,
              range: 'Chapitres 03 à 06',
              title: 'Sabots, Levier, 10 Fades & 15 Coupes',
              desc: 'Mathématique des guides (0 à #8), mouvement en C, protocoles complets des 10 fades et chorégraphie de coupe en 13 étapes.',
              startChapter: 3,
            },
            {
              level: 'Avancé' as const,
              range: 'Chapitres 07 à 09',
              title: 'Contours Chirurgicaux, Hygiène & Carrière',
              desc: 'Line-up sans push back, rasoir à 30°, protocole sanitaire DASRI/PFB, portfolio photographique et rentabilité salon.',
              startChapter: 7,
            },
          ].map((tier, idx) => {
            const levelStat = overview.levels[idx];
            return (
              <div
                key={tier.level}
                className="flex flex-col justify-between rounded-xl border border-[#E2D8C8] bg-[#F5EFE6] p-6"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs font-mono-tabular text-[#5C554B]">
                    <span className="text-[#7D6340] font-semibold">{tier.range}</span>
                    <span>Niveau {tier.level}</span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-semibold text-[#111111]">
                    {tier.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#2E2A25]">
                    {tier.desc}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-[#E2D8C8] space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono-tabular">
                    <span className="text-[#5C554B]">
                      {levelStat.validatedChapters}/{levelStat.totalChapters} chapitres validés
                    </span>
                    <span className="text-[#111111] font-semibold">
                      {levelStat.completionPercentage} %
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded bg-[#E2D8C8] overflow-hidden">
                    <div
                      className="h-full bg-[#111111] transition-all duration-300"
                      style={{ width: `${levelStat.completionPercentage}%` }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenChapter(tier.startChapter)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#111111] hover:text-[#7D6340] transition-colors pt-1 cursor-pointer"
                  >
                    <span>Accéder au niveau {tier.level}</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Visual Curated Modules Showcase */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-mono-tabular font-medium text-[#7D6340]">Pédagogie visuelle et technique</p>
          <h2 className="mt-1 font-display text-3xl font-semibold text-[#111111]">
            Apprendre par l’image, le schéma et la pratique réelle
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              assetId: 'toolsKit',
              kicker: 'Chapitre 02 & Matériel',
              title: 'Encyclopédie des 16 outils',
              text: 'Fiches pratiques complètes, différence Clipper / Trimmer / Shaver et entretien.',
              action: () => onNavigate('tools'),
            },
            {
              assetId: 'fadeMidDrop',
              kicker: 'Chapitre 04',
              title: 'Plans des 10 types de Fade',
              text: 'Schémas des zones crâniennes, réglages du levier et ordre des passages.',
              action: () => onOpenChapter(4),
            },
            {
              assetId: 'techniqueLineup',
              kicker: 'Chapitre 07',
              title: 'Contours & Line-Up précis',
              text: 'Géométrie du Front Line, C-Cups, rasoir à 30° et prévention du push back.',
              action: () => onOpenChapter(7),
            },
            {
              assetId: 'beforeAfter',
              kicker: 'Galerie & Chapitre 09',
              title: '15 coiffures & Avant/Après',
              text: 'Protocoles pas-à-pas du Buzz Cut aux Sponge Twists, Locks Taper et portfolio.',
              action: () => onNavigate('gallery'),
            },
          ].map((card) => (
            <button
              key={card.title}
              type="button"
              onClick={card.action}
              className="group text-left rounded-xl border border-[#E2D8C8] bg-[#FAF8F4] overflow-hidden hover:border-[#111111] transition-colors flex flex-col cursor-pointer"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#F5EFE6]">
                <EditorialFigure assetId={card.assetId} aspectClass="aspect-[4/3]" hideCaption />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <p className="text-xs font-mono-tabular font-medium text-[#7D6340]">{card.kicker}</p>
                  <h3 className="mt-1 font-display text-lg font-semibold text-[#111111] group-hover:text-[#7D6340] transition-colors">
                    {card.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#5C554B]">{card.text}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#111111] group-hover:text-[#7D6340]">
                  <span>Ouvrir le module</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Final Objective & Quiz / Offline Manual Callout */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-[#E2D8C8] bg-[#F5EFE6] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs font-mono-tabular font-medium text-[#7D6340]">Objectif de certification interne</p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#111111]">
              Compétences opérationnelles à l’issue du programme
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {[
                'Organiser un poste et mener une consultation morphologique',
                'Maîtriser les 16 outils, sabots #0.5–#8 et le levier',
                'Exécuter proprement les 10 fades sans ligne visible',
                'Réaliser 15 coupes afro et des contours sans push back',
                'Appliquer les normes strictes d’hygiène et sécurité DASRI',
                'Conseiller, fidéliser et photographier un portfolio pro',
              ].map((obj) => (
                <div key={obj} className="flex items-start gap-2.5 text-sm text-[#2E2A25]">
                  <CheckCircle2 className="h-4 w-4 text-[#111111] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{obj}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-3 border-t lg:border-t-0 lg:border-l border-[#E2D8C8] pt-6 lg:pt-0 lg:pl-8">
            <button
              type="button"
              aria-label="Ouvrir le Centre de Quiz et Évaluations"
              onClick={() => onNavigate('quiz')}
              className="flex items-center justify-between rounded-lg border border-[#E2D8C8] bg-white px-5 py-4 text-left hover:border-[#111111] transition-colors cursor-pointer"
            >
              <div>
                <p className="text-sm font-semibold text-[#111111]">Centre de Quiz & Évaluations</p>
                <p className="text-xs text-[#5C554B] mt-0.5">
                  QCM, matériel, sabots, fades, hygiène et corrections détaillées
                </p>
              </div>
              <BookOpen className="h-5 w-5 text-[#7D6340] shrink-0" aria-hidden="true" />
            </button>

            <button
              type="button"
              aria-label="Télécharger le Module Complet hors ligne"
              onClick={() => onNavigate('resources')}
              className="flex items-center justify-between rounded-lg border border-[#111111] bg-[#111111] px-5 py-4 text-left hover:bg-[#292622] transition-colors cursor-pointer"
            >
              <div>
                <p className="text-sm font-semibold text-white">Télécharger le Module Complet</p>
                <p className="text-xs text-[#E8DEC8] mt-0.5">
                  Pack ZIP complet, Manuel PDF illustré et version HTML hors ligne
                </p>
              </div>
              <Download className="h-5 w-5 text-[#E8DEC8] shrink-0" aria-hidden="true" />
            </button>

            <button
              type="button"
              aria-label="Ouvrir le Suivi de Progression"
              onClick={() => onNavigate('progress')}
              className="flex items-center justify-between rounded-lg border border-[#E2D8C8] bg-white px-5 py-4 text-left hover:border-[#111111] transition-colors cursor-pointer"
            >
              <div>
                <p className="text-sm font-semibold text-[#111111]">Suivi de Progression</p>
                <p className="text-xs text-[#5C554B] mt-0.5">
                  Chapitres validés, pourcentages de réussite et niveaux acquis
                </p>
              </div>
              <Scissors className="h-5 w-5 text-[#7D6340] shrink-0" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
