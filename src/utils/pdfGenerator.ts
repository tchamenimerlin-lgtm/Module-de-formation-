import { jsPDF } from 'jspdf';
import { ASSETS } from '../data/assets';
import { CHAPTERS } from '../data/chapters';
import { AFRO_HAIRSTYLES, FADE_TYPES } from '../data/fadesAndStyles';
import { GLOSSARY_TERMS } from '../data/glossary';
import {
  BARBER_TOOLS,
  CLIPPER_VS_TRIMMER_VS_SHAVER,
  GUARD_GUIDES,
} from '../data/hairAndTools';
import { QUIZ_QUESTIONS } from '../data/quizzes';
import { LoadedImage } from './imageLoader';

export type PracticalSheetId =
  | 'materiel'
  | 'sabots'
  | 'fades'
  | 'exercices'
  | 'glossaire';

export interface GeneratedPdfResult {
  bytes: Uint8Array;
  filename: string;
  pageCount: number;
  embeddedImagesCount: number;
}

/**
 * Sanitizes Unicode punctuation outside jsPDF's standard WinAnsi Helvetica range
 * so French accents render cleanly with zero corrupted glyphs.
 */
function cleanPdfText(input: string): string {
  return input
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u2014|\u2013/g, '-')
    .replace(/\u2026/g, '...')
    .replace(/\u0153/g, 'oe')
    .replace(/\u0152/g, 'OE')
    .replace(/\u2192/g, '->')
    .replace(/\u2194/g, '<->')
    .replace(/\u2265/g, '>=')
    .replace(/\u2264/g, '<=')
    .replace(/\u2248/g, '~')
    .replace(/\u00B0/g, ' deg')
    .replace(/\u00A0|\u202F/g, ' ')
    .replace(/💈/g, '')
    .trim();
}

const COLORS = {
  black: [17, 17, 17] as [number, number, number],
  charcoal: [46, 42, 37] as [number, number, number],
  beigeAccent: [125, 99, 64] as [number, number, number],
  beigeMid: [181, 152, 113] as [number, number, number],
  beigeCard: [245, 239, 230] as [number, number, number],
  beigeTint: [236, 227, 213] as [number, number, number],
  ink: [17, 17, 17] as [number, number, number],
  muted: [92, 85, 75] as [number, number, number],
  border: [226, 216, 200] as [number, number, number],
  softBg: [250, 248, 244] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
};

class PdfBuilder {
  doc: jsPDF;
  y: number;
  pageWidth: number;
  pageHeight: number;
  marginX: number;
  contentWidth: number;
  tocEntries: Array<{ title: string; subtitle?: string; page: number }> = [];
  embeddedImagesCount = 0;

  constructor() {
    this.doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true });
    this.pageWidth = this.doc.internal.pageSize.getWidth();
    this.pageHeight = this.doc.internal.pageSize.getHeight();
    this.marginX = 16;
    this.contentWidth = this.pageWidth - this.marginX * 2;
    this.y = 22;
  }

  ensureSpace(neededMm: number) {
    if (this.y + neededMm > this.pageHeight - 18) {
      this.doc.addPage();
      this.y = 22;
    }
  }

  addNewPage() {
    this.doc.addPage();
    this.y = 22;
  }

  recordToc(title: string, subtitle?: string) {
    this.tocEntries.push({
      title: cleanPdfText(title),
      subtitle: subtitle ? cleanPdfText(subtitle) : undefined,
      page: this.doc.getNumberOfPages(),
    });
  }

  private safeAddImage(img: LoadedImage | undefined, x: number, y: number, w: number, h: number): boolean {
    if (!img || !img.dataUrl) return false;
    try {
      this.doc.addImage(img.dataUrl, 'JPEG', x, y, w, h, img.id, 'FAST');
      this.embeddedImagesCount += 1;
      return true;
    } catch {
      return false;
    }
  }

  drawCoverPage(
    title: string,
    subtitle: string,
    editionLine: string,
    highlights: string[],
    coverHero?: LoadedImage
  ) {
    const { doc, pageWidth, pageHeight } = this;
    doc.setFillColor(...COLORS.white);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Warm beige top architectural band
    doc.setFillColor(...COLORS.beigeCard);
    doc.rect(0, 0, pageWidth, 88, 'F');

    // Double architectural black & beige frame
    doc.setDrawColor(...COLORS.black);
    doc.setLineWidth(0.7);
    doc.rect(12, 12, pageWidth - 24, pageHeight - 24);
    doc.setDrawColor(...COLORS.beigeMid);
    doc.setLineWidth(0.3);
    doc.rect(15, 15, pageWidth - 30, pageHeight - 30);

    const cx = pageWidth / 2;
    doc.setDrawColor(...COLORS.black);
    doc.setLineWidth(0.7);
    doc.line(cx - 22, 30, cx + 22, 30);
    doc.setFillColor(...COLORS.black);
    doc.rect(cx - 3, 21, 6, 6, 'F');

    doc.setTextColor(...COLORS.beigeAccent);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('FORMATION PROFESSIONNELLE OFFICIELLE', cx, 39, { align: 'center' });

    doc.setTextColor(...COLORS.black);
    doc.setFont('times', 'bold');
    doc.setFontSize(26);
    doc.text('NOTORIOUS', cx, 55, { align: 'center' });
    doc.setFontSize(22);
    doc.text('BARBER ACADEMY', cx, 65, { align: 'center' });

    doc.setDrawColor(...COLORS.black);
    doc.setLineWidth(0.8);
    doc.line(cx - 30, 74, cx + 30, 74);

    doc.setTextColor(...COLORS.black);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13.5);
    const titleLines = doc.splitTextToSize(cleanPdfText(title), this.contentWidth - 18);
    doc.text(titleLines, cx, 98, { align: 'center' });

    doc.setTextColor(...COLORS.muted);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    const subLines = doc.splitTextToSize(cleanPdfText(subtitle), this.contentWidth - 24);
    doc.text(subLines, cx, 111, { align: 'center' });

    let nextY = 128;
    if (coverHero) {
      const imgW = 124;
      const imgH = Math.min(72, imgW * (coverHero.height / Math.max(1, coverHero.width)));
      const imgX = cx - imgW / 2;
      doc.setDrawColor(...COLORS.border);
      doc.setLineWidth(0.4);
      doc.rect(imgX - 1.5, nextY - 1.5, imgW + 3, imgH + 3);
      this.safeAddImage(coverHero, imgX, nextY, imgW, imgH);
      nextY += imgH + 8;
    }

    // Structured warm beige highlight box
    const boxHeight = 14 + highlights.length * 7.2;
    doc.setFillColor(...COLORS.beigeCard);
    doc.setDrawColor(...COLORS.border);
    doc.setLineWidth(0.35);
    doc.rect(24, nextY, pageWidth - 48, boxHeight, 'FD');

    doc.setTextColor(...COLORS.beigeAccent);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('CONTENU DU MODULE COMPLET', 31, nextY + 8.5);

    doc.setTextColor(...COLORS.charcoal);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.1);
    let hy = nextY + 16;
    for (const item of highlights) {
      doc.setFillColor(...COLORS.black);
      doc.circle(32.5, hy - 1.1, 0.8, 'F');
      doc.text(cleanPdfText(item), 36.5, hy);
      hy += 7.2;
    }

    // Footer metadata
    doc.setTextColor(...COLORS.black);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.8);
    doc.text(cleanPdfText(editionLine), cx, pageHeight - 28, { align: 'center' });

    doc.setTextColor(...COLORS.muted);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.text('Niveaux Debutant  |  Intermediaire  |  Avance  -  Manuel illustre pret a imprimer', cx, pageHeight - 21.5, {
      align: 'center',
    });
  }

  drawChapterHeroPhoto(img: LoadedImage | undefined, figureCode: string, caption: string) {
    if (!img) return;
    const targetW = 104;
    const ratio = img.height / Math.max(1, img.width);
    const targetH = Math.min(62, Math.max(44, targetW * ratio));
    this.ensureSpace(targetH + 14);

    const x = this.marginX;
    this.doc.setFillColor(...COLORS.beigeCard);
    this.doc.setDrawColor(...COLORS.border);
    this.doc.setLineWidth(0.25);
    this.doc.rect(x, this.y, this.contentWidth, targetH + 4, 'FD');

    this.safeAddImage(img, x + 2, this.y + 2, targetW, targetH);

    // Caption column on right of photo
    const textX = x + targetW + 6;
    const textW = this.contentWidth - targetW - 9;
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(8.2);
    this.doc.setTextColor(...COLORS.beigeAccent);
    this.doc.text(cleanPdfText(figureCode), textX, this.y + 8);

    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(8.3);
    this.doc.setTextColor(...COLORS.charcoal);
    const capLines = this.doc.splitTextToSize(cleanPdfText(caption), textW);
    this.doc.text(capLines, textX, this.y + 14);

    this.y += targetH + 9;
  }

  drawIllustratedCard(
    title: string,
    visualCue: string,
    details: string[],
    img: LoadedImage | undefined,
    figureCode?: string
  ) {
    const hasImg = Boolean(img && img.dataUrl);
    const imgW = hasImg ? 54 : 0;
    const imgH = hasImg ? 40.5 : 0;
    const textX = hasImg ? this.marginX + imgW + 6 : this.marginX + 4.5;
    const textW = hasImg ? this.contentWidth - imgW - 10 : this.contentWidth - 9;

    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(9.2);
    const titleLines = this.doc.splitTextToSize(cleanPdfText(title), textW);

    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(8.2);
    const cueLines = this.doc.splitTextToSize(`Repere visuel : ${cleanPdfText(visualCue)}`, textW);

    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(8.1);
    const detailLineGroups = details.map((d) =>
      this.doc.splitTextToSize(`- ${cleanPdfText(d)}`, textW)
    );
    const detailLineCount = detailLineGroups.reduce((acc, g) => acc + g.length, 0);

    const textHeight =
      titleLines.length * 4.2 +
      cueLines.length * 3.8 +
      detailLineCount * 3.7 +
      detailLineGroups.length * 0.9 +
      10;
    const cardHeight = Math.max(hasImg ? imgH + 10 : 18, textHeight + 4);

    this.ensureSpace(cardHeight + 4);

    this.doc.setFillColor(...COLORS.beigeCard);
    this.doc.setDrawColor(...COLORS.border);
    this.doc.setLineWidth(0.25);
    this.doc.rect(this.marginX, this.y, this.contentWidth, cardHeight, 'FD');

    if (hasImg && img) {
      this.safeAddImage(img, this.marginX + 3, this.y + 3, imgW, imgH);
      if (figureCode) {
        this.doc.setFont('helvetica', 'bold');
        this.doc.setFontSize(7.2);
        this.doc.setTextColor(...COLORS.muted);
        this.doc.text(cleanPdfText(figureCode), this.marginX + 3, this.y + imgH + 7);
      }
    }

    let cy = this.y + 6.2;
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(9.2);
    this.doc.setTextColor(...COLORS.ink);
    this.doc.text(titleLines, textX, cy);
    cy += titleLines.length * 4.2 + 1.2;

    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(8.2);
    this.doc.setTextColor(...COLORS.beigeAccent);
    this.doc.text(cueLines, textX, cy);
    cy += cueLines.length * 3.8 + 1.5;

    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(8.1);
    this.doc.setTextColor(...COLORS.charcoal);
    for (const group of detailLineGroups) {
      this.doc.text(group, textX, cy);
      cy += group.length * 3.7 + 0.9;
    }

    this.y += cardHeight + 4;
  }

  drawSectionBanner(kicker: string, title: string, levelLabel?: string) {
    this.ensureSpace(26);
    const { doc, marginX, contentWidth } = this;
    doc.setFillColor(...COLORS.black);
    doc.rect(marginX, this.y, contentWidth, 18, 'F');
    doc.setFillColor(...COLORS.beigeMid);
    doc.rect(marginX, this.y, 2.5, 18, 'F');

    doc.setTextColor(...COLORS.beigeTint);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text(cleanPdfText(kicker.toUpperCase()), marginX + 6, this.y + 6);

    if (levelLabel) {
      doc.setTextColor(218, 210, 198);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.text(cleanPdfText(levelLabel), marginX + contentWidth - 5, this.y + 6, { align: 'right' });
    }

    doc.setTextColor(...COLORS.white);
    doc.setFont('times', 'bold');
    doc.setFontSize(13.5);
    doc.text(cleanPdfText(title), marginX + 6, this.y + 13.5);

    this.y += 23;
  }

  drawSubheading(text: string) {
    this.ensureSpace(12);
    this.doc.setTextColor(...COLORS.ink);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(10.5);
    this.doc.text(cleanPdfText(text), this.marginX, this.y);
    this.doc.setDrawColor(...COLORS.beigeMid);
    this.doc.setLineWidth(0.4);
    this.doc.line(this.marginX, this.y + 1.5, this.marginX + 26, this.y + 1.5);
    this.y += 6.5;
  }

  drawParagraph(text: string, muted = false) {
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(9.2);
    this.doc.setTextColor(...(muted ? COLORS.muted : COLORS.charcoal));
    const lines = this.doc.splitTextToSize(cleanPdfText(text), this.contentWidth);
    this.ensureSpace(lines.length * 4.4 + 3);
    this.doc.text(lines, this.marginX, this.y);
    this.y += lines.length * 4.4 + 2.5;
  }

  drawBullets(items: string[], indent = 4) {
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(9);
    this.doc.setTextColor(...COLORS.charcoal);
    for (const item of items) {
      const lines = this.doc.splitTextToSize(cleanPdfText(item), this.contentWidth - indent - 4);
      this.ensureSpace(lines.length * 4.2 + 2);
      this.doc.setFillColor(...COLORS.beigeAccent);
      this.doc.circle(this.marginX + indent - 1.5, this.y - 1.1, 0.7, 'F');
      this.doc.text(lines, this.marginX + indent + 2, this.y);
      this.y += lines.length * 4.2 + 1.6;
    }
    this.y += 1.5;
  }

  drawCalloutBox(title: string, items: string[], accentBg = false) {
    const cleanItems = items.map((i) => cleanPdfText(i));
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(8.8);
    let totalLines = 0;
    const wrapped = cleanItems.map((item) => {
      const lines = this.doc.splitTextToSize(`- ${item}`, this.contentWidth - 10);
      totalLines += lines.length;
      return lines;
    });
    const boxHeight = 10 + totalLines * 4.1 + wrapped.length * 1.1;
    this.ensureSpace(boxHeight + 4);

    this.doc.setFillColor(...(accentBg ? COLORS.beigeTint : COLORS.beigeCard));
    this.doc.setDrawColor(...COLORS.border);
    this.doc.setLineWidth(0.25);
    this.doc.rect(this.marginX, this.y, this.contentWidth, boxHeight, 'FD');

    this.doc.setTextColor(...COLORS.ink);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(9);
    this.doc.text(cleanPdfText(title), this.marginX + 4.5, this.y + 6);

    let cy = this.y + 11.5;
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(8.7);
    for (const lines of wrapped) {
      this.doc.text(lines, this.marginX + 4.5, cy);
      cy += lines.length * 4.1 + 1.1;
    }

    this.y += boxHeight + 4;
  }

  drawGuardVisualTable() {
    this.ensureSpace(90);
    const { doc, marginX, contentWidth } = this;

    doc.setFillColor(...COLORS.black);
    doc.rect(marginX, this.y, contentWidth, 7.5, 'F');
    doc.setTextColor(...COLORS.beigeTint);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('SABOT', marginX + 3, this.y + 5);
    doc.text('FERME / OUVERT', marginX + 30, this.y + 5);
    doc.text('ECHELLE VISUELLE', marginX + 66, this.y + 5);
    doc.text('UTILISATION PRINCIPALE', marginX + 110, this.y + 5);
    this.y += 7.5;

    for (let i = 0; i < GUARD_GUIDES.length; i++) {
      const g = GUARD_GUIDES[i];
      this.ensureSpace(8.5);
      if (i % 2 === 0) {
        doc.setFillColor(...COLORS.beigeCard);
        doc.rect(marginX, this.y, contentWidth, 8, 'F');
      }
      doc.setDrawColor(...COLORS.border);
      doc.setLineWidth(0.15);
      doc.line(marginX, this.y + 8, marginX + contentWidth, this.y + 8);

      doc.setTextColor(...COLORS.ink);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.text(cleanPdfText(g.label), marginX + 3, this.y + 5.2);

      doc.setFont('helvetica', 'normal');
      doc.text(`${g.mmClosed} - ${g.mmOpen} mm`, marginX + 30, this.y + 5.2);

      const barW = Math.max(2, (g.mmClosed / 26) * 36);
      doc.setFillColor(...COLORS.beigeTint);
      doc.rect(marginX + 66, this.y + 2.8, 36, 2.6, 'F');
      doc.setFillColor(...COLORS.black);
      doc.rect(marginX + 66, this.y + 2.8, barW, 2.6, 'F');

      const useShort = doc.splitTextToSize(cleanPdfText(g.primaryUse), contentWidth - 112)[0];
      doc.setFontSize(7.6);
      doc.text(useShort, marginX + 110, this.y + 5.2);

      this.y += 8;
    }
    this.y += 4;
  }

  drawQuizBankSection() {
    this.addNewPage();
    this.recordToc(
      `Banque de Quiz & Corrige (${QUIZ_QUESTIONS.length} questions)`,
      'Evaluation complete des 9 chapitres avec explications detaillees'
    );
    this.drawSectionBanner(
      'AUTO-EVALUATION COMPLETE',
      `Quiz Officiel (${QUIZ_QUESTIONS.length} Questions) & Corrige`,
      'Seuil de reussite : 70 %'
    );
    this.drawParagraph(
      'Testez vos connaissances hors ligne. Repondez d\'abord aux questions puis verifiez vos resultats dans le corrige detaille a la suite de cette section.',
      true
    );

    const letters = ['A', 'B', 'C', 'D'];
    for (let i = 0; i < QUIZ_QUESTIONS.length; i++) {
      const q = QUIZ_QUESTIONS[i];
      const optionLines = q.options.map((opt, idx) => `${letters[idx]}. ${opt}`);
      this.drawCalloutBox(
        `Q${String(i + 1).padStart(2, '0')} (Chapitre ${q.chapterId}) - ${q.prompt}`,
        optionLines
      );
    }

    this.addNewPage();
    this.drawSectionBanner(
      'CORRIGE OFFICIEL',
      `Reponses & Explications Pedagogiques (${QUIZ_QUESTIONS.length} QCM)`
    );

    for (let i = 0; i < QUIZ_QUESTIONS.length; i++) {
      const q = QUIZ_QUESTIONS[i];
      const ansLetter = letters[q.correctIndex] ?? 'A';
      const ansText = q.options[q.correctIndex] ?? '';
      this.drawCalloutBox(
        `Q${String(i + 1).padStart(2, '0')} -> Reponse ${ansLetter} : ${ansText}`,
        [q.explanation],
        i % 2 === 1
      );
    }
  }

  drawLinedNotesPage(personalNotes?: Record<number, string>) {
    this.addNewPage();
    this.recordToc('Espace de Prise de Notes', "Fiches personnelles d'atelier et observations salon");
    this.drawSectionBanner("CARNET D'APPRENTI", 'Espace de Prise de Notes & Suivi Pratique');
    this.drawParagraph(
      'Utilisez ces pages lignees pour noter vos reglages de machines, observations sur vos modeles, temps de coupe et retours de votre formateur.',
      true
    );

    const savedNoteEntries = personalNotes
      ? Object.entries(personalNotes).filter(([, txt]) => txt && txt.trim().length > 0)
      : [];

    if (savedNoteEntries.length > 0) {
      this.drawSubheading('Vos notes enregistrees sur la plateforme');
      for (const [chId, txt] of savedNoteEntries) {
        const ch = CHAPTERS.find((c) => c.id === Number(chId));
        this.drawCalloutBox(`Chapitre ${chId}${ch ? ` - ${ch.shortTitle}` : ''}`, [txt]);
      }
    }

    this.doc.setDrawColor(205, 203, 198);
    this.doc.setLineWidth(0.2);
    while (this.y < this.pageHeight - 24) {
      this.doc.line(this.marginX, this.y, this.marginX + this.contentWidth, this.y);
      this.y += 8.5;
    }
  }

  renderClickableTocOnPage(tocPageNumber: number) {
    const { doc, marginX, contentWidth } = this;
    doc.setPage(tocPageNumber);
    this.y = 22;

    this.drawSectionBanner('NAVIGATION DU MANUEL', 'Sommaire Cliquable');
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(...COLORS.muted);
    doc.text(
      'Cliquez sur une ligne dans votre lecteur PDF pour acceder directement au chapitre correspondant.',
      marginX,
      this.y
    );
    this.y += 7;

    for (const entry of this.tocEntries) {
      if (this.y > this.pageHeight - 22) break;
      const rowY = this.y;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.2);
      doc.setTextColor(...COLORS.ink);
      doc.text(entry.title, marginX, rowY);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...COLORS.beigeAccent);
      doc.text(`p. ${entry.page}`, marginX + contentWidth, rowY, { align: 'right' });

      if (entry.subtitle) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.6);
        doc.setTextColor(...COLORS.muted);
        doc.text(entry.subtitle, marginX + 2, rowY + 3.8);
      }

      doc.setDrawColor(...COLORS.border);
      doc.setLineWidth(0.15);
      const lineY = entry.subtitle ? rowY + 5.8 : rowY + 2.4;
      doc.line(marginX, lineY, marginX + contentWidth, lineY);

      doc.link(marginX, rowY - 3.5, contentWidth, entry.subtitle ? 8.6 : 5.2, {
        pageNumber: entry.page,
      });

      this.y = lineY + 4.4;
    }
  }

  applyHeadersAndPagination(skipFirstPage = true) {
    const totalPages = this.doc.getNumberOfPages();
    for (let p = 1; p <= totalPages; p++) {
      if (skipFirstPage && p === 1) continue;
      this.doc.setPage(p);

      this.doc.setFont('helvetica', 'bold');
      this.doc.setFontSize(7.5);
      this.doc.setTextColor(...COLORS.muted);
      this.doc.text('NOTORIOUS BARBER ACADEMY', this.marginX, 11);
      this.doc.setFont('helvetica', 'normal');
      this.doc.text('Module Complet - Coiffure Masculine Afro', this.marginX + this.contentWidth, 11, {
        align: 'right',
      });
      this.doc.setDrawColor(...COLORS.border);
      this.doc.setLineWidth(0.2);
      this.doc.line(this.marginX, 13.5, this.marginX + this.contentWidth, 13.5);

      const footY = this.pageHeight - 10;
      this.doc.line(this.marginX, footY - 4, this.marginX + this.contentWidth, footY - 4);
      this.doc.setFontSize(7.5);
      this.doc.setTextColor(...COLORS.muted);
      this.doc.text('Support pedagogique officiel - Utilisation hors ligne autorisee', this.marginX, footY);
      this.doc.setFont('helvetica', 'bold');
      this.doc.setTextColor(...COLORS.ink);
      this.doc.text(`Page ${p} / ${totalPages}`, this.marginX + this.contentWidth, footY, { align: 'right' });
    }
  }

  toUint8Array(): Uint8Array {
    const arrayBuffer = this.doc.output('arraybuffer');
    return new Uint8Array(arrayBuffer);
  }
}

export function triggerBlobDownload(blob: Blob, filename: string): string {
  const blobUrl = URL.createObjectURL(blob);
  if (typeof document !== 'undefined') {
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    link.rel = 'noopener';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    window.setTimeout(() => {
      link.remove();
    }, 250);
  }
  return blobUrl;
}

export function buildCompleteAcademyManualPdf(options?: {
  personalNotes?: Record<number, string>;
  images?: Record<string, LoadedImage>;
}): GeneratedPdfResult {
  const images = options?.images ?? {};
  const pdf = new PdfBuilder();

  // Page 1: Illustrated Cover
  pdf.drawCoverPage(
    "MODULE COMPLET D'APPRENTISSAGE - COIFFURE MASCULINE AFRO",
    'Du niveau debutant au niveau avance : 9 chapitres illustres, 16 outils pro, sabots et levier, 10 types de fade et 15 coiffures avec photos dediees, quiz corrige et glossaire.',
    'EDITION ACADEMIE OFFICIELLE - MODULE COMPLET ILLUSTRE',
    [
      '9 chapitres complets structures du niveau Debutant au niveau Avance',
      'Fiches completes des 16 outils professionnels et comparatif machines',
      'Tableau visuel des sabots (0 a #8) et mecanique du levier',
      '10 types de fade & 15 coiffures afro avec photos studio et reperes visuels',
      `9 ateliers pratiques + banque de ${QUIZ_QUESTIONS.length} quiz avec corrige detaille`,
      'Pages de prise de notes personnelles + glossaire bilingue FR/EN (36 termes)',
    ],
    images.heroStation
  );

  // Page 2: Reserved for clickable TOC
  pdf.addNewPage();
  const tocPage = pdf.doc.getNumberOfPages();

  // Chapters 1 to 9
  for (const chapter of CHAPTERS) {
    pdf.addNewPage();
    pdf.recordToc(chapter.title, `Niveau ${chapter.level} - ${chapter.durationMinutes} min`);
    pdf.drawSectionBanner(
      `CHAPITRE ${String(chapter.id).padStart(2, '0')} / ${String(CHAPTERS.length).padStart(2, '0')}`,
      chapter.shortTitle,
      `Niveau ${chapter.level} - ${chapter.durationMinutes} min`
    );

    const chAsset = ASSETS[chapter.heroImageId];
    pdf.drawChapterHeroPhoto(
      images[chapter.heroImageId],
      chAsset?.figureCode ?? `Fig. ${chapter.id}.1`,
      chAsset?.caption ?? chapter.shortTitle
    );

    pdf.drawParagraph(chapter.summaryIntro);
    pdf.drawCalloutBox('Objectifs pedagogiques', chapter.objectives);

    for (const section of chapter.sections) {
      pdf.drawSubheading(section.title);
      for (const p of section.paragraphs) {
        pdf.drawParagraph(p);
      }
      if (section.bulletPoints && section.bulletPoints.length > 0) {
        pdf.drawBullets(section.bulletPoints);
      }
    }

    // Chapter-specific structured encyclopedic reference blocks
    if (chapter.id === 2) {
      pdf.drawSubheading('Difference Clipper / Trimmer / Shaver');
      for (const item of CLIPPER_VS_TRIMMER_VS_SHAVER) {
        pdf.drawCalloutBox(`${item.tool} (${item.cutRange})`, [
          `Lame : ${item.bladeDesign}`,
          `Role : ${item.primaryRole}`,
          `A eviter : ${item.neverUseFor}`,
        ]);
      }
      pdf.drawSubheading('Encyclopedie complete des 16 outils professionnels');
      for (const tool of BARBER_TOOLS) {
        pdf.drawCalloutBox(`${tool.number}. ${tool.name} (${tool.englishName}) - ${tool.category}`, [
          `Utilite : ${tool.purpose}`,
          `Tenue : ${tool.howToHold}`,
          `Utilisation : ${tool.howToUse}`,
          `Entretien : ${tool.maintenanceAndDisinfection}`,
        ]);
      }
    }

    if (chapter.id === 3) {
      pdf.drawSubheading('Tableau visuel des sabots standards (0 a #8)');
      pdf.drawGuardVisualTable();
    }

    if (chapter.id === 4) {
      pdf.drawSubheading('Repertoire illustre des 10 types de Fade (photos et reperes visuels)');
      for (const fade of FADE_TYPES) {
        const asset = ASSETS[fade.imageId];
        pdf.drawIllustratedCard(
          `${fade.number}. ${fade.name} (${fade.frenchSubtitle}) - ${fade.difficulty}`,
          fade.visualCue,
          [
            `Hauteur : ${fade.heightZone}`,
            `1re ligne : ${fade.firstLinePosition}`,
            `Sabots : ${fade.guardsUsed.join(', ')} | Levier : ${fade.leverSettings}`,
            `Elimination des lignes : ${fade.lineRemovalMethod}`,
          ],
          images[fade.imageId],
          asset?.figureCode
        );
      }
    }

    if (chapter.id === 5) {
      pdf.drawSubheading('Catalogue illustre des 15 coiffures masculines afro (photos dediees)');
      for (const style of AFRO_HAIRSTYLES) {
        const asset = ASSETS[style.imageId];
        pdf.drawIllustratedCard(
          `${style.number}. ${style.name} [${style.difficulty} - Profils ${style.suitableHairTypes.join('/')}]`,
          style.visualCue,
          [
            style.description,
            `Materiel : ${style.materials.join(', ')}`,
            `Etapes cles : ${style.steps[0]} -> ${style.steps[style.steps.length - 1]}`,
            `Profil capillaire : ${style.hairProfileNote}`,
          ],
          images[style.imageId],
          asset?.figureCode
        );
      }
    }

    if (chapter.concreteExamples.length > 0) {
      pdf.drawSubheading('Exemples concrets de salon');
      for (const ex of chapter.concreteExamples) {
        pdf.drawCalloutBox(`Cas pratique : ${ex.scenario}`, [
          `Diagnostic : ${ex.diagnosis}`,
          `Action pro : ${ex.action}`,
          `Resultat : ${ex.result}`,
        ]);
      }
    }

    pdf.drawCalloutBox('Conseils de professionnels', chapter.proTips, true);
    pdf.drawCalloutBox('Erreurs a eviter', chapter.commonMistakes);
    pdf.drawCalloutBox('Resume des notions essentielles', chapter.keyTakeaways);
    pdf.drawCalloutBox(`Exercice pratique (${chapter.exercise.duration}) - ${chapter.exercise.title}`, [
      `Objectif : ${chapter.exercise.objective}`,
      ...chapter.exercise.steps.map((s, idx) => `Etape ${idx + 1} : ${s}`),
      `Critere de validation : ${chapter.exercise.validationCriteria[0]}`,
    ]);
  }

  // Full Quiz & Answer Key
  pdf.drawQuizBankSection();

  // Notes Page
  pdf.drawLinedNotesPage(options?.personalNotes);

  // Glossary
  pdf.addNewPage();
  pdf.recordToc('Glossaire Francais / Anglais du Barbering', "36 termes essentiels de l'Afro Barbering");
  pdf.drawSectionBanner('REFERENCE LEXICALE', 'Glossaire Professionnel Francais / Anglais');
  for (const entry of GLOSSARY_TERMS) {
    pdf.ensureSpace(13);
    pdf.doc.setFont('helvetica', 'bold');
    pdf.doc.setFontSize(9.2);
    pdf.doc.setTextColor(...COLORS.ink);
    pdf.doc.text(cleanPdfText(`${entry.termFr}  /  ${entry.termEn}`), pdf.marginX, pdf.y);
    pdf.doc.setFont('helvetica', 'normal');
    pdf.doc.setFontSize(7.8);
    pdf.doc.setTextColor(...COLORS.beigeAccent);
    pdf.doc.text(cleanPdfText(entry.category), pdf.marginX + pdf.contentWidth, pdf.y, { align: 'right' });

    pdf.y += 4;
    pdf.drawParagraph(entry.definition, true);
  }

  pdf.renderClickableTocOnPage(tocPage);
  pdf.applyHeadersAndPagination(true);

  return {
    bytes: pdf.toUint8Array(),
    filename: 'Notorious-Barber-Academy-Module-Complet-Illustre.pdf',
    pageCount: pdf.doc.getNumberOfPages(),
    embeddedImagesCount: pdf.embeddedImagesCount,
  };
}

export function buildPracticalSheetPdfBytes(
  sheetId: PracticalSheetId,
  images?: Record<string, LoadedImage>
): GeneratedPdfResult {
  const pdf = new PdfBuilder();
  let filename = 'Notorious-Barber-Academy-Fiche.pdf';

  if (sheetId === 'materiel') {
    pdf.drawSectionBanner('FICHE PRATIQUE #01', 'Les 16 Outils du Barbier & Protocole Entretien', 'Chapitre 2');
    pdf.drawSubheading('Clipper vs Trimmer vs Shaver');
    for (const item of CLIPPER_VS_TRIMMER_VS_SHAVER) {
      pdf.drawCalloutBox(`${item.tool} (${item.cutRange})`, [
        `Lame : ${item.bladeDesign}`,
        `Usage : ${item.primaryRole}`,
        `A ne jamais faire : ${item.neverUseFor}`,
      ]);
    }
    pdf.drawSubheading('Fiches individuelles des 16 outils');
    for (const tool of BARBER_TOOLS) {
      pdf.drawCalloutBox(`${tool.number}. ${tool.name} (${tool.englishName})`, [
        `Utilite : ${tool.purpose}`,
        `Tenue : ${tool.howToHold}`,
        `Utilisation : ${tool.howToUse}`,
        `Entretien & desinfection : ${tool.maintenanceAndDisinfection}`,
      ]);
    }
    filename = 'NBA-Fiche-01-Materiel-16-Outils.pdf';
  } else if (sheetId === 'sabots') {
    pdf.drawSectionBanner('FICHE PRATIQUE #02', 'Tableau des Sabots (0 a #8) & Reglage du Levier', 'Chapitre 3');
    pdf.drawParagraph(
      'Note technique : les longueurs en millimetres varient legerement selon les constructeurs (Wahl, Andis, BaBylissPRO, JRL). Verifiez toujours la gravure de vos sabots.'
    );
    pdf.drawGuardVisualTable();
    pdf.drawCalloutBox("Regles d'or du levier et du passage de tondeuse", [
      'Levier ferme (en haut) = coupe la plus courte ; levier ouvert (en bas) = environ +1 mm.',
      'Chevauchement cle : 0 ouvert ~ #0.5 ferme ; #0.5 ouvert ~ #1 ferme ; #1 ouvert ~ #1.5 ferme.',
      "Mouvement en C (C-Motion) : entre en contact puis sort en arc vers l'exterieur sans marquer.",
      "Flick-Out & Cornering : utiliser les 2-3 dents d'angle pour effacer les micro-taches sombres.",
    ], true);
    filename = 'NBA-Fiche-02-Sabots-et-Levier.pdf';
  } else if (sheetId === 'fades') {
    pdf.drawSectionBanner('FICHE PRATIQUE #03', 'Guide Technique Illustre des 10 Types de Fade', 'Chapitre 4');
    for (const fade of FADE_TYPES) {
      const asset = ASSETS[fade.imageId];
      pdf.drawIllustratedCard(
        `${fade.number}. ${fade.name} (${fade.frenchSubtitle}) - ${fade.difficulty}`,
        fade.visualCue,
        [
          `Hauteur : ${fade.heightZone}`,
          `Premiere ligne : ${fade.firstLinePosition}`,
          `Sabots : ${fade.guardsUsed.join(', ')} | Levier : ${fade.leverSettings}`,
          `Effacement des lignes : ${fade.lineRemovalMethod}`,
          `Controle final : ${fade.finishingCheck}`,
        ],
        images?.[fade.imageId],
        asset?.figureCode
      );
    }
    filename = 'NBA-Fiche-03-10-Types-de-Fade.pdf';
  } else if (sheetId === 'exercices') {
    pdf.drawSectionBanner("CAHIER D'EXERCICES PRATIQUES", 'Les 9 Ateliers & Grilles de Validation', 'Niveaux 1 a 3');
    pdf.drawParagraph(
      'Imprimez ce cahier pour valider vos competences pratiques au centre de formation ou en atelier autonome.'
    );
    for (const ch of CHAPTERS) {
      pdf.drawCalloutBox(`Chapitre ${ch.id} (${ch.level}) - ${ch.exercise.title} [${ch.exercise.duration}]`, [
        `Objectif : ${ch.exercise.objective}`,
        `Materiel : ${ch.exercise.equipment.join(', ')}`,
        ...ch.exercise.steps.map((s, idx) => `${idx + 1}. ${s}`),
        `Criteres de validation : ${ch.exercise.validationCriteria.join(' | ')}`,
      ]);
    }
    filename = 'NBA-Fiche-04-Cahier-9-Exercices-Pratiques.pdf';
  } else {
    pdf.drawSectionBanner('FICHE LEXICALE', 'Glossaire Francais / Anglais du Barbering', '36 Termes');
    for (const entry of GLOSSARY_TERMS) {
      pdf.ensureSpace(13);
      pdf.doc.setFont('helvetica', 'bold');
      pdf.doc.setFontSize(9.2);
      pdf.doc.setTextColor(...COLORS.ink);
      pdf.doc.text(cleanPdfText(`${entry.termFr}  /  ${entry.termEn}`), pdf.marginX, pdf.y);
      pdf.doc.setFont('helvetica', 'normal');
      pdf.doc.setFontSize(7.8);
      pdf.doc.setTextColor(...COLORS.beigeAccent);
      pdf.doc.text(cleanPdfText(entry.category), pdf.marginX + pdf.contentWidth, pdf.y, { align: 'right' });
      pdf.y += 4;
      pdf.drawParagraph(entry.definition, true);
    }
    filename = 'NBA-Fiche-05-Glossaire-FR-EN.pdf';
  }

  pdf.applyHeadersAndPagination(false);

  return {
    bytes: pdf.toUint8Array(),
    filename,
    pageCount: pdf.doc.getNumberOfPages(),
    embeddedImagesCount: pdf.embeddedImagesCount,
  };
}

export function downloadCompleteAcademyManualPdf(personalNotes?: Record<number, string>): string {
  const result = buildCompleteAcademyManualPdf({ personalNotes });
  const blob = new Blob([result.bytes.slice()], { type: 'application/pdf' });
  triggerBlobDownload(blob, result.filename);
  return result.filename;
}

export function downloadPracticalSheetPdf(sheetId: PracticalSheetId): string {
  const result = buildPracticalSheetPdfBytes(sheetId);
  const blob = new Blob([result.bytes.slice()], { type: 'application/pdf' });
  triggerBlobDownload(blob, result.filename);
  return result.filename;
}
