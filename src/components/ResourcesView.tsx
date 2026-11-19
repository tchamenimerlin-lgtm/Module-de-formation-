import React, { useEffect, useRef, useState } from 'react';
import {
  CheckCircle2,
  Download,
  FileArchive,
  FileText,
  Globe,
  Loader2,
  Printer,
  Search,
} from 'lucide-react';
import { CHAPTERS } from '../data/chapters';
import { GLOSSARY_TERMS } from '../data/glossary';
import { QUIZ_QUESTIONS } from '../data/quizzes';
import { ProgressState } from '../types/academy';
import { getUniqueModuleAssetIds } from '../utils/imageLoader';
import {
  downloadCompleteIllustratedPdfPackage,
  downloadCompleteZipModulePackage,
  downloadOfflineInteractiveHtmlPackage,
  downloadSinglePracticalSheetPackage,
  PackagingProgress,
  ReadyDownload,
} from '../utils/modulePackager';
import { PracticalSheetId } from '../utils/pdfGenerator';

interface ResourcesViewProps {
  progress: ProgressState;
}

type ActiveDownloadKind = 'zip' | 'pdf' | 'html' | PracticalSheetId | null;

const SHEETS: Array<{
  id: PracticalSheetId;
  code: string;
  title: string;
  desc: string;
  pagesNote: string;
}> = [
  {
    id: 'materiel',
    code: 'Fiche 01',
    title: 'Les 16 Outils & Protocole Entretien',
    desc: 'Comparatif Clipper / Trimmer / Shaver et fiches individuelles des 16 outils du poste.',
    pagesNote: 'Chapitre 2 · Prêt à imprimer',
  },
  {
    id: 'sabots',
    code: 'Fiche 02',
    title: 'Tableau Visuel des Sabots & Levier',
    desc: 'Échelle proportionnelle de 0 à #8 (mm fermé / ouvert), demi-sabots et règle du mouvement en C.',
    pagesNote: 'Chapitre 3 · Affiche d’atelier',
  },
  {
    id: 'fades',
    code: 'Fiche 03',
    title: 'Guide Illustré des 10 Types de Fade',
    desc: 'Photos studio dédiées, repères visuels clés, lignes directrices, sabots et effacement des lignes.',
    pagesNote: 'Chapitre 4 · Illustré avec photos',
  },
  {
    id: 'exercices',
    code: 'Cahier 04',
    title: 'Cahier des 9 Exercices Pratiques',
    desc: 'Protocoles d’ateliers pas-à-pas, matériel requis et grilles de validation par chapitre.',
    pagesNote: 'Niveaux 1 à 3 · Centre de formation',
  },
  {
    id: 'glossaire',
    code: 'Fiche 05',
    title: 'Glossaire Professionnel Français / Anglais',
    desc: 'Les 36 termes essentiels de l’Afro Barbering (C-Motion, Push Back, Parietal Ridge, Shrinkage...).',
    pagesNote: 'Lexique bilingue officiel',
  },
];

export const ResourcesView: React.FC<ResourcesViewProps> = ({ progress }) => {
  const [activeKind, setActiveKind] = useState<ActiveDownloadKind>(null);
  const [packProgress, setPackProgress] = useState<PackagingProgress | null>(null);
  const [readyDownload, setReadyDownload] = useState<ReadyDownload | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [glossaryQuery, setGlossaryQuery] = useState('');

  const lastBlobUrlRef = useRef<string | null>(null);
  const photoCount = getUniqueModuleAssetIds().length;

  useEffect(() => {
    return () => {
      if (lastBlobUrlRef.current) {
        URL.revokeObjectURL(lastBlobUrlRef.current);
      }
    };
  }, []);

  const registerReadyDownload = (result: ReadyDownload) => {
    if (lastBlobUrlRef.current && lastBlobUrlRef.current !== result.blobUrl) {
      URL.revokeObjectURL(lastBlobUrlRef.current);
    }
    lastBlobUrlRef.current = result.blobUrl;
    setReadyDownload(result);
  };

  const runDownloadTask = async (
    kind: ActiveDownloadKind,
    task: () => Promise<ReadyDownload>
  ) => {
    if (activeKind !== null) return;
    setActiveKind(kind);
    setErrorMessage(null);
    setPackProgress({ percent: 4, label: 'Initialisation du téléchargement...' });
    try {
      const result = await task();
      registerReadyDownload(result);
    } catch {
      setErrorMessage(
        'Une erreur est survenue lors de la préparation du fichier. Réessayez ou utilisez un autre format.'
      );
    } finally {
      setActiveKind(null);
      setPackProgress(null);
    }
  };

  const handleDownloadZip = () =>
    runDownloadTask('zip', () =>
      downloadCompleteZipModulePackage(progress, (p) => setPackProgress(p))
    );

  const handleDownloadPdf = () =>
    runDownloadTask('pdf', () =>
      downloadCompleteIllustratedPdfPackage(progress, (p) => setPackProgress(p))
    );

  const handleDownloadHtml = () =>
    runDownloadTask('html', () =>
      downloadOfflineInteractiveHtmlPackage(progress, (p) => setPackProgress(p))
    );

  const handleDownloadSheet = (sheetId: PracticalSheetId) =>
    runDownloadTask(sheetId, () => downloadSinglePracticalSheetPackage(sheetId));

  const filteredGlossary = GLOSSARY_TERMS.filter((g) => {
    const q = glossaryQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      g.termFr.toLowerCase().includes(q) ||
      g.termEn.toLowerCase().includes(q) ||
      g.definition.toLowerCase().includes(q) ||
      g.category.toLowerCase().includes(q)
    );
  });

  const isBusy = activeKind !== null;

  return (
    <div className="mx-auto max-w-[1360px] px-4 py-12 sm:px-6 lg:px-8 space-y-14">
      {/* Header */}
      <div className="space-y-3 border-b border-[#E2D8C8] pb-8">
        <p className="text-xs font-mono-tabular text-[#7D6340]">
          Téléchargement complet hors ligne · Android, iPhone, Windows & Mac
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#111111]">
          Télécharger le Module Complet de Formation
        </h1>
        <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-[#5C554B]">
          Téléchargez l’intégralité de la formation NOTORIOUS BARBER ACADEMY 💈 sur votre
          appareil avec toutes les photographies studio intégrées : en Pack Complet (.zip),
          en Manuel Illustré imprimable (.pdf) ou en Module Web Interactif hors ligne (.html).
        </p>
      </div>

      {/* Live Generation Progress */}
      {packProgress && (
        <div
          role="status"
          aria-live="polite"
          className="rounded-xl border border-[#CFC2AE] bg-[#FAF8F4] p-5 space-y-3"
        >
          <div className="flex items-center justify-between gap-4 text-xs sm:text-sm">
            <span className="inline-flex items-center gap-2 font-medium text-[#111111]">
              <Loader2 className="h-4 w-4 animate-spin text-[#7D6340]" aria-hidden="true" />
              <span>{packProgress.label}</span>
            </span>
            <span className="font-mono-tabular font-semibold text-[#111111]">
              {packProgress.percent} %
            </span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={packProgress.percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progression de préparation du module téléchargeable"
            className="h-2 w-full overflow-hidden rounded bg-[#E2D8C8]"
          >
            <div
              className="h-full bg-[#111111] transition-all duration-200"
              style={{ width: `${packProgress.percent}%` }}
            />
          </div>
        </div>
      )}

      {/* Error State */}
      {errorMessage && (
        <div
          role="alert"
          className="rounded-lg border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-xs sm:text-sm text-[#991B1B]"
        >
          {errorMessage}
        </div>
      )}

      {/* Ready-to-Save Confirmation Banner with Native Direct Download Fallback */}
      {readyDownload && !isBusy && (
        <div
          role="status"
          data-testid="download-ready-banner"
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-[#BBF7D0] bg-[#ECFDF5] px-5 py-4"
        >
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-[#166534] mt-0.5" aria-hidden="true" />
            <div className="space-y-0.5">
              <p className="text-sm font-semibold text-[#166534]">
                Fichier prêt et téléchargé : {readyDownload.filename}
              </p>
              <p className="text-xs text-[#166534]/90 font-mono-tabular">
                {readyDownload.summary} · Taille : {readyDownload.sizeLabel}
              </p>
            </div>
          </div>

          <a
            href={readyDownload.blobUrl}
            download={readyDownload.filename}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[#166534] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#14532D] transition-colors whitespace-nowrap shrink-0"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Enregistrer le fichier</span>
          </a>
        </div>
      )}

      {/* Flagship Complete Module Download Center */}
      <section className="rounded-xl border border-[#CFC2AE] bg-[#F5EFE6] p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-5">
          <p className="text-xs font-mono-tabular font-semibold text-[#7D6340]">
            Archive Intégrale · 100 % Hors Ligne · Photos Studio Intégrées
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#111111]">
            Module Complet — NOTORIOUS BARBER ACADEMY 💈
          </h2>
          <p className="text-sm leading-relaxed text-[#2E2A25]">
            Choisissez le <strong>Pack Complet (.zip)</strong> pour obtenir d’un seul clic
            tous les formats réunis, ou téléchargez directement le{' '}
            <strong>Manuel Illustré (.pdf)</strong> ou le{' '}
            <strong>Module Web Interactif hors ligne (.html)</strong>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs text-[#2E2A25]">
            {[
              `Intégralité des ${CHAPTERS.length} chapitres illustrés (Débutant à Avancé)`,
              `${photoCount} photographies studio dédiées (10 fades + 15 coiffures)`,
              'Encyclopédie complète des 16 outils + tableau des sabots (0 à #8)',
              `Banque complète de ${QUIZ_QUESTIONS.length} questions QCM avec corrigé détaillé`,
              '9 ateliers pratiques + vos notes personnelles enregistrées',
              `Glossaire bilingue officiel Français / Anglais (${GLOSSARY_TERMS.length} termes)`,
            ].map((item) => (
              <div key={item} className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#111111] shrink-0 mt-0.5" aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-[#E2D8C8] pt-4 text-xs text-[#5C554B] space-y-1">
            <p className="font-semibold text-[#111111]">Quel format choisir ?</p>
            <p>
              <strong>Pack Complet (.zip)</strong> : réunit le manuel PDF illustré, le module HTML interactif hors ligne, les 5 fiches atelier PDF et un guide de démarrage.
            </p>
            <p>
              <strong>Module Interactif (.html)</strong> : s’ouvre sans Internet dans Chrome ou Safari avec les comparateurs visuels côte à côte, le calculateur de sabots et le quiz corrigé en direct.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-3">
          {/* Primary Dominant CTA: Full ZIP Package */}
          <button
            type="button"
            disabled={isBusy}
            onClick={handleDownloadZip}
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-md bg-[#111111] px-6 py-4 text-sm font-semibold text-white hover:bg-[#292622] disabled:opacity-60 disabled:cursor-wait transition-colors cursor-pointer"
          >
            {activeKind === 'zip' ? (
              <Loader2 className="h-4 w-4 animate-spin text-[#E8DEC8]" aria-hidden="true" />
            ) : (
              <FileArchive className="h-4 w-4 text-[#E8DEC8]" aria-hidden="true" />
            )}
            <span>Télécharger le Pack Complet (.zip)</span>
          </button>

          {/* Direct Illustrated PDF */}
          <button
            type="button"
            disabled={isBusy}
            onClick={handleDownloadPdf}
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-md border border-[#111111] bg-white px-5 py-3.5 text-sm font-semibold text-[#111111] hover:bg-[#FAF8F4] disabled:opacity-60 disabled:cursor-wait transition-colors cursor-pointer"
          >
            {activeKind === 'pdf' ? (
              <Loader2 className="h-4 w-4 animate-spin text-[#7D6340]" aria-hidden="true" />
            ) : (
              <Download className="h-4 w-4 text-[#7D6340]" aria-hidden="true" />
            )}
            <span>Télécharger le Manuel Complet Illustré (.pdf)</span>
          </button>

          {/* Direct Standalone Offline Interactive HTML */}
          <button
            type="button"
            disabled={isBusy}
            onClick={handleDownloadHtml}
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-md border border-[#CFC2AE] bg-white px-5 py-3.5 text-sm font-medium text-[#111111] hover:border-[#111111] hover:bg-[#FAF8F4] disabled:opacity-60 disabled:cursor-wait transition-colors cursor-pointer"
          >
            {activeKind === 'html' ? (
              <Loader2 className="h-4 w-4 animate-spin text-[#7D6340]" aria-hidden="true" />
            ) : (
              <Globe className="h-4 w-4 text-[#7D6340]" aria-hidden="true" />
            )}
            <span>Télécharger le Module Interactif Hors Ligne (.html)</span>
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-[#E2D8C8] bg-[#FAF8F4] px-5 py-2.5 text-xs font-medium text-[#5C554B] hover:text-[#111111] hover:border-[#CFC2AE] transition-colors cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5 text-[#7D6340]" aria-hidden="true" />
            <span>Imprimer la page courante</span>
          </button>

          <p className="text-center text-[11px] text-[#5C554B] pt-1">
            Génération locale instantanée sur votre appareil · Aucun compte requis.
          </p>
        </div>
      </section>

      {/* Separate Downloadable Practical Sheets & Exercises */}
      <section className="space-y-5">
        <div>
          <p className="text-xs font-mono-tabular text-[#7D6340]">Téléchargements individuels</p>
          <h2 className="mt-1 font-display text-2xl font-semibold text-[#111111]">
            Fiches pratiques & cahier d’exercices séparés (PDF)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SHEETS.map((sheet) => (
            <div
              key={sheet.id}
              className="flex flex-col justify-between rounded-xl border border-[#E2D8C8] bg-[#FAF8F4] p-5 space-y-5"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono-tabular text-[#5C554B]">
                  <span className="text-[#7D6340] font-semibold">{sheet.code}</span>
                  <span>{sheet.pagesNote}</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-[#111111]">
                  {sheet.title}
                </h3>
                <p className="text-xs leading-relaxed text-[#5C554B]">{sheet.desc}</p>
              </div>

              <button
                type="button"
                disabled={isBusy}
                onClick={() => handleDownloadSheet(sheet.id)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-[#CFC2AE] bg-white px-4 py-2.5 text-xs font-semibold text-[#111111] hover:border-[#111111] hover:bg-[#111111] hover:text-white disabled:opacity-60 transition-colors cursor-pointer"
              >
                {activeKind === sheet.id ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                ) : (
                  <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                )}
                <span>Télécharger en PDF</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Bilingual FR / EN Barbering Glossary */}
      <section className="space-y-5 border-t border-[#E2D8C8] pt-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-mono-tabular text-[#7D6340]">
              Lexique officiel inclus dans le module téléchargé
            </p>
            <h2 className="mt-1 font-display text-2xl font-semibold text-[#111111]">
              Glossaire Français / Anglais du Barbering ({GLOSSARY_TERMS.length} termes)
            </h2>
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5C554B]"
              aria-hidden="true"
            />
            <input
              type="search"
              aria-label="Rechercher dans le glossaire"
              value={glossaryQuery}
              onChange={(e) => setGlossaryQuery(e.target.value)}
              placeholder="Filtrer un terme (Fade, Push Back...)"
              className="w-full min-h-[40px] rounded-lg border border-[#CFC2AE] bg-white pl-9 pr-3 py-2 text-xs text-[#111111] placeholder:text-[#78716C]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredGlossary.map((entry) => (
            <div
              key={entry.termEn}
              className="rounded-xl border border-[#E2D8C8] bg-[#FAF8F4] p-4 space-y-1.5"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-sm font-semibold text-[#111111]">
                  {entry.termFr}{' '}
                  <span className="font-mono-tabular text-xs font-normal text-[#7D6340]">
                    / {entry.termEn}
                  </span>
                </p>
                <span className="text-[11px] font-mono-tabular text-[#5C554B]">
                  {entry.category}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-[#5C554B]">{entry.definition}</p>
            </div>
          ))}
        </div>

        {filteredGlossary.length === 0 && (
          <p className="text-sm text-[#5C554B] py-4">
            Aucun terme trouvé pour « {glossaryQuery} ».
          </p>
        )}
      </section>
    </div>
  );
};
