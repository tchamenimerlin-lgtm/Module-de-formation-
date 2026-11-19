import test from 'node:test';
import assert from 'node:assert/strict';
import { ASSETS } from '../data/assets';
import { CHAPTERS } from '../data/chapters';
import { AFRO_HAIRSTYLES, FADE_TYPES } from '../data/fadesAndStyles';
import { BARBER_TOOLS, GUARD_GUIDES } from '../data/hairAndTools';
import { QUIZ_QUESTIONS } from '../data/quizzes';
import {
  computeAcademyProgress,
  computeEffectiveCutLengthMm,
  EMPTY_PROGRESS,
  evaluateQuizAnswers,
  filterHairstyles,
  filterTools,
  normalizeProgressState,
} from './academyLogic';
import { getUniqueModuleAssetIds } from './imageLoader';
import { buildOfflineHtmlModule } from './offlineModuleGenerator';
import { buildCompleteAcademyManualPdf } from './pdfGenerator';
import { crc32, createZipArchive, formatFileSize } from './zipBuilder';

test('computeEffectiveCutLengthMm calculates closed, half, and open lever cut lengths accurately', () => {
  const guardZero = GUARD_GUIDES.find((g) => g.code === '0')!;
  const guardOne = GUARD_GUIDES.find((g) => g.code === '1')!;
  const guardFour = GUARD_GUIDES.find((g) => g.code === '4')!;

  assert.equal(computeEffectiveCutLengthMm(guardZero, 'closed'), 0.5);
  assert.equal(computeEffectiveCutLengthMm(guardZero, 'half'), 1.0);
  assert.equal(computeEffectiveCutLengthMm(guardZero, 'open'), 1.5);

  assert.equal(computeEffectiveCutLengthMm(guardOne, 'closed'), 3.0);
  assert.equal(computeEffectiveCutLengthMm(guardOne, 'quarter'), 3.25);
  assert.equal(computeEffectiveCutLengthMm(guardOne, 'open'), 4.0);

  assert.equal(computeEffectiveCutLengthMm(guardFour, 'closed'), 13.0);
  assert.equal(computeEffectiveCutLengthMm(guardFour, 'open'), 14.0);
});

test('evaluateQuizAnswers grades answers and applies 70% passing threshold', () => {
  const sampleQuestions = QUIZ_QUESTIONS.slice(0, 4);

  const allCorrect: Record<string, number> = {};
  for (const q of sampleQuestions) {
    allCorrect[q.id] = q.correctIndex;
  }
  const perfectRes = evaluateQuizAnswers(sampleQuestions, allCorrect);
  assert.equal(perfectRes.score, 4);
  assert.equal(perfectRes.percentage, 100);
  assert.equal(perfectRes.passed, true);

  const partialAnswers: Record<string, number> = {
    [sampleQuestions[0].id]: sampleQuestions[0].correctIndex,
    [sampleQuestions[1].id]: sampleQuestions[1].correctIndex,
    [sampleQuestions[2].id]: (sampleQuestions[2].correctIndex + 1) % 4,
    [sampleQuestions[3].id]: (sampleQuestions[3].correctIndex + 1) % 4,
  };
  const failRes = evaluateQuizAnswers(sampleQuestions, partialAnswers);
  assert.equal(failRes.score, 2);
  assert.equal(failRes.percentage, 50);
  assert.equal(failRes.passed, false);
});

test('computeAcademyProgress validates Débutant level when chapters 1–2 and their quizzes are completed', () => {
  const initialOverview = computeAcademyProgress(CHAPTERS, EMPTY_PROGRESS);
  assert.equal(initialOverview.totalChapters, 9);
  assert.deepEqual(
    CHAPTERS.map((c) => c.id),
    [1, 2, 3, 4, 5, 6, 7, 8, 9]
  );
  assert.equal(
    CHAPTERS.some((c) => c.slug === 'comprendre-cheveux-afro'),
    false
  );
  assert.equal(initialOverview.overallProgressPercentage, 0);
  assert.equal(initialOverview.currentRankLabel, 'Apprenti Débutant');

  const beginnerDone = computeAcademyProgress(CHAPTERS, {
    ...EMPTY_PROGRESS,
    completedChapters: [1, 2],
    completedExercises: [1, 2],
    chapterQuizScores: {
      1: { score: 3, total: 3, percentage: 100, passed: true, completedAt: '2026-11-18' },
      2: { score: 4, total: 5, percentage: 80, passed: true, completedAt: '2026-11-18' },
    },
  });

  assert.equal(beginnerDone.levels[0].level, 'Débutant');
  assert.equal(beginnerDone.levels[0].totalChapters, 2);
  assert.equal(beginnerDone.levels[0].isValidated, true);
  assert.equal(beginnerDone.levels[0].completionPercentage, 100);
  assert.equal(beginnerDone.levels[1].isValidated, false);
  assert.equal(beginnerDone.currentRankLabel, 'Barber Junior (Niveau Intermédiaire)');
  assert.equal(beginnerDone.averageQuizScore, 90);
});

test('filterHairstyles and filterTools return accurate filtered subsets', () => {
  assert.equal(AFRO_HAIRSTYLES.length, 15);
  assert.equal(BARBER_TOOLS.length, 16);

  const wavesResults = filterHairstyles(AFRO_HAIRSTYLES, 'waves', 'Tous', 'Tous');
  assert.equal(wavesResults.length, 1);
  assert.equal(wavesResults[0].id, 'waves-360');

  const advanced4C = filterHairstyles(AFRO_HAIRSTYLES, '', 'Avancé', '4C');
  assert.ok(advanced4C.length >= 3);
  assert.ok(advanced4C.every((s) => s.difficulty === 'Avancé' && s.suitableHairTypes.includes('4C')));

  const machines = filterTools(BARBER_TOOLS, '', 'Machines');
  assert.equal(machines.length, 3);

  const trimmerSearch = filterTools(BARBER_TOOLS, 'trimmer', 'Tous');
  assert.ok(trimmerSearch.some((t) => t.id === 'trimmer'));

  const pickSearch = filterTools(BARBER_TOOLS, 'afro pick', 'Tous');
  assert.equal(pickSearch.length, 1);
  assert.equal(pickSearch[0].id, 'afro-pick');
});

test('normalizeProgressState safely handles corrupted or malformed payloads', () => {
  const fromNull = normalizeProgressState(null);
  assert.deepEqual(fromNull, EMPTY_PROGRESS);

  const deduped = normalizeProgressState({
    completedChapters: [1, 1, 2, 'bad'],
    completedExercises: [3, 3],
  });
  assert.deepEqual(deduped.completedChapters, [1, 2]);
  assert.deepEqual(deduped.completedExercises, [3]);
});

test('all 15 hairstyles and 10 fades have unique registered photography and non-empty visualCue annotations', () => {
  assert.equal(AFRO_HAIRSTYLES.length, 15);
  const hairstyleImageIds = AFRO_HAIRSTYLES.map((style) => style.imageId);
  assert.equal(new Set(hairstyleImageIds).size, 15, 'Each of the 15 hairstyles must have its own distinct imageId');
  for (const style of AFRO_HAIRSTYLES) {
    assert.ok(style.imageId in ASSETS, `Missing asset for hairstyle ${style.id}: ${style.imageId}`);
    assert.ok(style.visualCue.trim().length > 10, `Missing visualCue for hairstyle ${style.id}`);
  }

  assert.equal(FADE_TYPES.length, 10);
  const fadeImageIds = FADE_TYPES.map((fade) => fade.imageId);
  assert.equal(new Set(fadeImageIds).size, 10, 'Each of the 10 fades must have its own distinct imageId');
  for (const fade of FADE_TYPES) {
    assert.ok(fade.imageId in ASSETS, `Missing asset for fade ${fade.id}: ${fade.imageId}`);
    assert.ok(fade.visualCue.trim().length > 10, `Missing visualCue for fade ${fade.id}`);
  }

  const validChapterIds = new Set(CHAPTERS.map((c) => c.id));
  for (const q of QUIZ_QUESTIONS) {
    assert.ok(validChapterIds.has(q.chapterId), `Quiz question ${q.id} references invalid chapterId ${q.chapterId}`);
    if (q.imageId) {
      assert.ok(q.imageId in ASSETS, `Quiz question ${q.id} references missing asset ${q.imageId}`);
    }
  }
});

test('crc32 and createZipArchive produce valid standard PKZIP archives', () => {
  const vector = new TextEncoder().encode('123456789');
  assert.equal(crc32(vector), 0xcbf43926);

  const zipBytes = createZipArchive([
    { name: 'Notorious-Barber-Academy/LISEZ-MOI.txt', data: 'Formation Afro Barbering' },
    { name: 'Notorious-Barber-Academy/test.bin', data: new Uint8Array([1, 2, 3, 4, 5]) },
  ]);

  const view = new DataView(zipBytes.buffer, zipBytes.byteOffset, zipBytes.byteLength);
  // Local file header signature PK\x03\x04
  assert.equal(view.getUint32(0, true), 0x04034b50);
  // End of central directory signature PK\x05\x06 at tail - 22
  const eocdOffset = zipBytes.length - 22;
  assert.equal(view.getUint32(eocdOffset, true), 0x06054b50);
  assert.equal(view.getUint16(eocdOffset + 8, true), 2);
  assert.equal(view.getUint16(eocdOffset + 10, true), 2);

  assert.equal(formatFileSize(512), '512 o');
  assert.equal(formatFileSize(2048), '2 Ko');
  assert.equal(formatFileSize(2.5 * 1024 * 1024), '2,50 Mo');
});

test('buildOfflineHtmlModule and buildCompleteAcademyManualPdf package the complete 9-chapter training module', () => {
  const uniqueAssetIds = getUniqueModuleAssetIds();
  assert.ok(uniqueAssetIds.length >= 22, `Expected at least 22 unique studio assets, got ${uniqueAssetIds.length}`);

  const html = buildOfflineHtmlModule({
    personalNotes: { 1: 'Note atelier test verification' },
    images: {
      heroStation: { id: 'heroStation', dataUrl: 'data:image/jpeg;base64,/9j/4AAQ', width: 640, height: 480 },
    },
  });

  assert.ok(html.startsWith('<!DOCTYPE html>'));
  assert.ok(html.includes('Chapitre 01'));
  assert.ok(html.includes('Chapitre 09'));
  assert.ok(html.includes('Note atelier test verification'));
  assert.ok(html.includes('data:image/jpeg;base64,/9j/4AAQ'));
  assert.ok(html.includes('fadeCompareStage'));
  assert.ok(html.includes('styleCompareStage'));
  assert.ok(html.includes('quizContainer'));
  assert.ok(html.includes('Burst Fade'));
  assert.ok(html.includes('Caesar Cut'));

  const pdfRes = buildCompleteAcademyManualPdf({
    personalNotes: { 1: 'Note PDF test' },
  });
  const pdfHeader = new TextDecoder().decode(pdfRes.bytes.slice(0, 5));
  assert.equal(pdfHeader, '%PDF-');
  assert.ok(pdfRes.pageCount >= 20, `Complete manual should span at least 20 pages, got ${pdfRes.pageCount}`);
  assert.equal(pdfRes.filename, 'Notorious-Barber-Academy-Module-Complet-Illustre.pdf');
});


