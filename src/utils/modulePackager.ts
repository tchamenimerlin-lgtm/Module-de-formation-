import { ProgressState } from '../types/academy';
import { getUniqueModuleAssetIds, loadModuleImagesAsDataUrls } from './imageLoader';
import { buildOfflineHtmlModule } from './offlineModuleGenerator';
import {
  buildCompleteAcademyManualPdf,
  buildPracticalSheetPdfBytes,
  PracticalSheetId,
  triggerBlobDownload,
} from './pdfGenerator';
import { createZipArchive, formatFileSize } from './zipBuilder';

export interface ReadyDownload {
  blobUrl: string;
  filename: string;
  sizeBytes: number;
  sizeLabel: string;
  summary: string;
}

export interface PackagingProgress {
  percent: number;
  label: string;
}

const README_TXT = `NOTORIOUS BARBER ACADEMY — PACK COMPLET DE FORMATION HORS LIGNE
===============================================================

Contenu de ce dossier :
1. 01-Notorious-Barber-Academy-Module-Complet-Illustre.pdf
   Manuel complet A4 imprimable avec les 9 chapitres, les 16 outils,
   le tableau des sabots (0 a #8), les 10 fades et 15 coiffures afro
   illustres par leurs photographies studio, le quiz (31 questions + corrige),
   vos notes personnelles et le glossaire bilingue FR/EN.

2. 02-Notorious-Barber-Academy-Module-Interactif-Hors-Ligne.html
   Version web interactive 100 % autonome (sans Internet requis).
   Ouvrez ce fichier directement dans Chrome, Safari, Edge ou Firefox
   sur Android, iPhone, Windows ou Mac pour profiter :
   - Des 9 chapitres complets et de toutes les photographies integrees
   - Du calculateur interactif de sabots & levier
   - Des comparateurs visuels cote a cote (10 Fades & 15 Coiffures)
   - Du quiz interactif corrige en direct (31 questions)
   - De la recherche instantanee dans les 16 outils et le glossaire FR/EN

3. 03-Fiches-Pratiques/
   Les 5 fiches PDF separees pretes a imprimer pour l'atelier :
   - Fiche 01 : Les 16 outils & protocole d'entretien
   - Fiche 02 : Tableau des sabots (0 a #8) & reglage du levier
   - Fiche 03 : Guide illustre des 10 types de fade
   - Fiche 04 : Cahier des 9 exercices pratiques
   - Fiche 05 : Glossaire professionnel FR/EN (36 termes)

Bonne formation !
NOTORIOUS BARBER ACADEMY — Afro Barbering Professionnel
`;

const ALL_SHEETS: PracticalSheetId[] = ['materiel', 'sabots', 'fades', 'exercices', 'glossaire'];

export async function downloadCompleteIllustratedPdfPackage(
  progress: ProgressState,
  onProgress?: (state: PackagingProgress) => void
): Promise<ReadyDownload> {
  const assetIds = getUniqueModuleAssetIds();
  onProgress?.({ percent: 8, label: `Préparation des ${assetIds.length} photographies studio...` });

  const images = await loadModuleImagesAsDataUrls(assetIds, {
    maxWidth: 640,
    jpegQuality: 0.8,
    onProgress: (loaded, total) => {
      const pct = Math.round(10 + (loaded / Math.max(1, total)) * 62);
      onProgress?.({
        percent: pct,
        label: `Intégration des photographies (${loaded} / ${total})...`,
      });
    },
  });

  onProgress?.({ percent: 82, label: 'Mise en page du manuel A4, sommaire cliquable et quiz...' });
  // Yield one frame so the UI renders progress smoothly
  await new Promise((r) => window.setTimeout(r, 20));

  const pdfResult = buildCompleteAcademyManualPdf({
    personalNotes: progress.personalNotes,
    images,
  });

  const blob = new Blob([pdfResult.bytes.slice()], { type: 'application/pdf' });
  const blobUrl = triggerBlobDownload(blob, pdfResult.filename);

  onProgress?.({ percent: 100, label: 'Manuel complet illustré prêt.' });

  return {
    blobUrl,
    filename: pdfResult.filename,
    sizeBytes: blob.size,
    sizeLabel: formatFileSize(blob.size),
    summary: `PDF A4 illustré · ${pdfResult.pageCount} pages · ${pdfResult.embeddedImagesCount} photographies intégrées`,
  };
}

export async function downloadOfflineInteractiveHtmlPackage(
  progress: ProgressState,
  onProgress?: (state: PackagingProgress) => void
): Promise<ReadyDownload> {
  const assetIds = getUniqueModuleAssetIds();
  onProgress?.({ percent: 8, label: `Préparation des ${assetIds.length} photographies hors ligne...` });

  const images = await loadModuleImagesAsDataUrls(assetIds, {
    maxWidth: 720,
    jpegQuality: 0.82,
    onProgress: (loaded, total) => {
      const pct = Math.round(10 + (loaded / Math.max(1, total)) * 68);
      onProgress?.({
        percent: pct,
        label: `Encodage hors ligne des photos (${loaded} / ${total})...`,
      });
    },
  });

  onProgress?.({ percent: 86, label: 'Assemblage du module HTML interactif autonome...' });
  await new Promise((r) => window.setTimeout(r, 20));

  const html = buildOfflineHtmlModule({
    personalNotes: progress.personalNotes,
    images,
  });

  const filename = 'Notorious-Barber-Academy-Module-Complet-Hors-Ligne.html';
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const blobUrl = triggerBlobDownload(blob, filename);

  onProgress?.({ percent: 100, label: 'Module interactif hors ligne prêt.' });

  return {
    blobUrl,
    filename,
    sizeBytes: blob.size,
    sizeLabel: formatFileSize(blob.size),
    summary: `Fichier autonome HTML5 · 9 chapitres, comparateurs visuels, quiz (31) et ${Object.keys(images).length} photos intégrées`,
  };
}

export async function downloadCompleteZipModulePackage(
  progress: ProgressState,
  onProgress?: (state: PackagingProgress) => void
): Promise<ReadyDownload> {
  const assetIds = getUniqueModuleAssetIds();
  onProgress?.({ percent: 5, label: `Chargement des ${assetIds.length} photographies studio...` });

  const images = await loadModuleImagesAsDataUrls(assetIds, {
    maxWidth: 640,
    jpegQuality: 0.8,
    onProgress: (loaded, total) => {
      const pct = Math.round(5 + (loaded / Math.max(1, total)) * 45);
      onProgress?.({
        percent: pct,
        label: `Préparation des visuels studio (${loaded} / ${total})...`,
      });
    },
  });

  onProgress?.({ percent: 58, label: 'Génération du Manuel Complet Illustré (PDF)...' });
  await new Promise((r) => window.setTimeout(r, 20));
  const fullPdf = buildCompleteAcademyManualPdf({
    personalNotes: progress.personalNotes,
    images,
  });

  onProgress?.({ percent: 72, label: 'Génération du Module Interactif Hors Ligne (HTML)...' });
  await new Promise((r) => window.setTimeout(r, 20));
  const offlineHtml = buildOfflineHtmlModule({
    personalNotes: progress.personalNotes,
    images,
  });

  onProgress?.({ percent: 84, label: 'Génération des 5 fiches pratiques PDF...' });
  await new Promise((r) => window.setTimeout(r, 20));
  const sheetEntries = ALL_SHEETS.map((sheetId) => {
    const res = buildPracticalSheetPdfBytes(sheetId, images);
    return {
      name: `Notorious-Barber-Academy/03-Fiches-Pratiques/${res.filename}`,
      data: res.bytes,
    };
  });

  onProgress?.({ percent: 94, label: 'Création de l’archive complète (.zip)...' });
  await new Promise((r) => window.setTimeout(r, 20));

  const zipBytes = createZipArchive([
    {
      name: 'Notorious-Barber-Academy/LISEZ-MOI.txt',
      data: README_TXT,
    },
    {
      name: `Notorious-Barber-Academy/01-${fullPdf.filename}`,
      data: fullPdf.bytes,
    },
    {
      name: 'Notorious-Barber-Academy/02-Notorious-Barber-Academy-Module-Complet-Hors-Ligne.html',
      data: offlineHtml,
    },
    ...sheetEntries,
  ]);

  const filename = 'Notorious-Barber-Academy-Module-Complet.zip';
  const blob = new Blob([zipBytes.slice()], { type: 'application/zip' });
  const blobUrl = triggerBlobDownload(blob, filename);

  onProgress?.({ percent: 100, label: 'Pack complet (.zip) généré et prêt.' });

  return {
    blobUrl,
    filename,
    sizeBytes: blob.size,
    sizeLabel: formatFileSize(blob.size),
    summary: `Archive ZIP complète · 8 fichiers (Manuel PDF ${fullPdf.pageCount} p. + Module HTML hors ligne + 5 fiches PDF + Guide)`,
  };
}

export async function downloadSinglePracticalSheetPackage(
  sheetId: PracticalSheetId
): Promise<ReadyDownload> {
  const images =
    sheetId === 'fades'
      ? await loadModuleImagesAsDataUrls(
          getUniqueModuleAssetIds(),
          { maxWidth: 560, jpegQuality: 0.78 }
        )
      : undefined;

  const res = buildPracticalSheetPdfBytes(sheetId, images);
  const blob = new Blob([res.bytes.slice()], { type: 'application/pdf' });
  const blobUrl = triggerBlobDownload(blob, res.filename);

  return {
    blobUrl,
    filename: res.filename,
    sizeBytes: blob.size,
    sizeLabel: formatFileSize(blob.size),
    summary: `Fiche PDF prête à imprimer · ${res.pageCount} page${res.pageCount > 1 ? 's' : ''}`,
  };
}
