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

function esc(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function safeJsonForScript(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

function getImgSrc(assetId: string, images: Record<string, LoadedImage>): string {
  return images[assetId]?.dataUrl ?? ASSETS[assetId]?.src ?? '';
}

/**
 * Generates a 100% self-contained, single-file offline interactive HTML training module
 * styled in White, Warm Beige & Black with all photography embedded in Base64,
 * interactive side-by-side Fade & Hairstyle comparators, guard calculator, 31-question quiz,
 * saved personal notes, and searchable FR/EN glossary.
 */
export function buildOfflineHtmlModule(options: {
  personalNotes?: Record<number, string>;
  images?: Record<string, LoadedImage>;
}): string {
  const images = options.images ?? {};
  const personalNotes = options.personalNotes ?? {};
  const exportDate = new Date().toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const fadeComparatorData = FADE_TYPES.map((f) => ({
    id: f.id,
    number: f.number,
    name: f.name,
    frenchSubtitle: f.frenchSubtitle,
    difficulty: f.difficulty,
    heightZone: f.heightZone,
    visualCue: f.visualCue,
    firstLinePosition: f.firstLinePosition,
    guardsUsed: f.guardsUsed,
    leverSettings: f.leverSettings,
    lineRemovalMethod: f.lineRemovalMethod,
    imgSrc: getImgSrc(f.imageId, images),
    figureCode: ASSETS[f.imageId]?.figureCode ?? '',
  }));

  const styleComparatorData = AFRO_HAIRSTYLES.map((s) => ({
    id: s.id,
    number: s.number,
    name: s.name,
    category: s.category,
    difficulty: s.difficulty,
    visualCue: s.visualCue,
    description: s.description,
    suitableHairTypes: s.suitableHairTypes,
    materials: s.materials,
    steps: s.steps,
    hairProfileNote: s.hairProfileNote,
    imgSrc: getImgSrc(s.imageId, images),
    figureCode: ASSETS[s.imageId]?.figureCode ?? '',
  }));

  const quizData = QUIZ_QUESTIONS.map((q) => ({
    id: q.id,
    chapterId: q.chapterId,
    prompt: q.prompt,
    options: q.options,
    correctIndex: q.correctIndex,
    explanation: q.explanation,
  }));

  const guardData = GUARD_GUIDES.map((g) => ({
    code: g.code,
    label: g.label,
    mmClosed: g.mmClosed,
    mmOpen: g.mmOpen,
    primaryUse: g.primaryUse,
    fadeRole: g.fadeRole,
  }));

  const heroSrc = getImgSrc('heroStation', images);

  const chapterSectionsHtml = CHAPTERS.map((ch) => {
    const chHeroSrc = getImgSrc(ch.heroImageId, images);
    const chAsset = ASSETS[ch.heroImageId];
    const savedNote = personalNotes[ch.id]?.trim();

    const sectionsHtml = ch.sections
      .map(
        (sec) => `
        <div class="subblock">
          <h3>${esc(sec.title)}</h3>
          ${sec.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('')}
          ${
            sec.bulletPoints && sec.bulletPoints.length > 0
              ? `<ul>${sec.bulletPoints.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>`
              : ''
          }
        </div>`
      )
      .join('');

    const examplesHtml =
      ch.concreteExamples.length > 0
        ? `<div class="grid-2">
            ${ch.concreteExamples
              .map(
                (ex) => `
              <div class="card-soft">
                <p class="kicker">Cas pratique au fauteuil</p>
                <h4>${esc(ex.scenario)}</h4>
                <p><strong>Diagnostic :</strong> ${esc(ex.diagnosis)}</p>
                <p><strong>Action pro :</strong> ${esc(ex.action)}</p>
                <p><strong>Résultat :</strong> ${esc(ex.result)}</p>
              </div>`
              )
              .join('')}
          </div>`
        : '';

    return `
    <article id="chapitre-${ch.id}" class="chapter-card">
      <div class="chapter-header">
        <div class="chapter-meta">
          <span class="kicker">Chapitre ${String(ch.id).padStart(2, '0')} / ${String(CHAPTERS.length).padStart(2, '0')} · Niveau ${esc(ch.level)} · ${ch.durationMinutes} min</span>
        </div>
        <h2>${esc(ch.title)}</h2>
        <p class="lead">${esc(ch.summaryIntro)}</p>
        ${
          chHeroSrc
            ? `<figure class="editorial-fig">
                <img src="${chHeroSrc}" alt="${esc(chAsset?.alt ?? ch.shortTitle)}" />
                <figcaption><strong>${esc(chAsset?.figureCode ?? '')}</strong> — ${esc(chAsset?.caption ?? '')}</figcaption>
              </figure>`
            : ''
        }
      </div>

      <div class="callout">
        <p class="kicker">Objectifs pédagogiques</p>
        <ul>${ch.objectives.map((o) => `<li>${esc(o)}</li>`).join('')}</ul>
      </div>

      ${sectionsHtml}

      ${
        ch.id === 2
          ? `<div class="embedded-ref">
              <h3>Différence fondamentale : Clipper / Trimmer / Shaver</h3>
              <div class="grid-3">
                ${CLIPPER_VS_TRIMMER_VS_SHAVER.map(
                  (item) => `
                  <div class="card-white">
                    <p class="kicker">${esc(item.cutRange)}</p>
                    <h4>${esc(item.tool)}</h4>
                    <p><strong>Lame :</strong> ${esc(item.bladeDesign)}</p>
                    <p><strong>Usage :</strong> ${esc(item.primaryRole)}</p>
                    <p class="warn"><strong>À éviter :</strong> ${esc(item.neverUseFor)}</p>
                  </div>`
                ).join('')}
              </div>
              <p class="muted-note">Retrouvez les fiches complètes des 16 outils dans la section <a href="#materiel">Matériel (16 outils)</a> ci-dessous.</p>
            </div>`
          : ''
      }

      ${
        ch.id === 3
          ? `<div class="embedded-ref">
              <h3>Tableau visuel des 11 guides de tondeuse (0 à #8)</h3>
              <div class="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Sabot</th>
                      <th>Fermé / Ouvert</th>
                      <th>Échelle visuelle</th>
                      <th>Utilisation principale</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${GUARD_GUIDES.map((g) => {
                      const pct = Math.max(6, Math.round((g.mmClosed / 26) * 100));
                      return `<tr>
                        <td><strong>${esc(g.label)}</strong></td>
                        <td class="mono">${g.mmClosed} – ${g.mmOpen} mm</td>
                        <td><div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div></td>
                        <td>${esc(g.primaryUse)}</td>
                      </tr>`;
                    }).join('')}
                  </tbody>
                </table>
              </div>
            </div>`
          : ''
      }

      ${
        ch.id === 4
          ? `<div class="embedded-ref">
              <p class="muted-note">Comparez les 10 types de fade photo par photo dans la section <a href="#fades">Les 10 types de Fade & Comparateur</a> ci-dessous.</p>
            </div>`
          : ''
      }

      ${
        ch.id === 5
          ? `<div class="embedded-ref">
              <p class="muted-note">Comparez les 15 coiffures masculines afro en images dans la section <a href="#coiffures">Catalogue des 15 Coiffures & Comparateur</a> ci-dessous.</p>
            </div>`
          : ''
      }

      ${examplesHtml}

      <div class="grid-2">
        <div class="callout-beige">
          <p class="kicker">Conseils de professionnels</p>
          <ul>${ch.proTips.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
        </div>
        <div class="callout-warn">
          <p class="kicker">Erreurs à éviter</p>
          <ul>${ch.commonMistakes.map((m) => `<li>${esc(m)}</li>`).join('')}</ul>
        </div>
      </div>

      <div class="callout">
        <p class="kicker">Synthèse à retenir</p>
        <ul>${ch.keyTakeaways.map((k) => `<li>${esc(k)}</li>`).join('')}</ul>
      </div>

      <div class="workshop-box">
        <p class="kicker">Atelier pratique · ${esc(ch.exercise.duration)}</p>
        <h3>${esc(ch.exercise.title)}</h3>
        <p><strong>Objectif :</strong> ${esc(ch.exercise.objective)}</p>
        <p><strong>Matériel :</strong> ${esc(ch.exercise.equipment.join(' · '))}</p>
        <ol>${ch.exercise.steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>
        <p><strong>Critères de validation :</strong> ${esc(ch.exercise.validationCriteria.join(' · '))}</p>
      </div>

      ${
        savedNote
          ? `<div class="note-box">
              <p class="kicker">Votre note personnelle enregistrée</p>
              <p>${esc(savedNote)}</p>
            </div>`
          : ''
      }
    </article>`;
  }).join('');

  const toolsHtml = BARBER_TOOLS.map(
    (t) => `
    <div class="card-white tool-item" data-search="${esc(`${t.name} ${t.englishName} ${t.category} ${t.purpose}`.toLowerCase())}">
      <p class="kicker">Outil #${String(t.number).padStart(2, '0')} · ${esc(t.category)}</p>
      <h3>${esc(t.name)} <span class="muted">(${esc(t.englishName)})</span></h3>
      <p><strong>Utilité :</strong> ${esc(t.purpose)}</p>
      <p><strong>Tenue :</strong> ${esc(t.howToHold)}</p>
      <p><strong>Utilisation :</strong> ${esc(t.howToUse)}</p>
      <p class="warn"><strong>Erreurs à éviter :</strong> ${esc(t.mistakesToAvoid.join(' ; '))}</p>
      <p><strong>Entretien & désinfection :</strong> ${esc(t.maintenanceAndDisinfection)}</p>
    </div>`
  ).join('');

  const fadesGridHtml = FADE_TYPES.map((f) => {
    const src = getImgSrc(f.imageId, images);
    const asset = ASSETS[f.imageId];
    return `
    <div class="card-white media-card">
      ${src ? `<img class="photo-4-3" src="${src}" alt="${esc(asset?.alt ?? f.name)}" />` : ''}
      <div class="media-body">
        <p class="kicker">Fade #${String(f.number).padStart(2, '0')} · ${esc(f.difficulty)}</p>
        <h3>${esc(f.name)} <span class="muted">— ${esc(f.frenchSubtitle)}</span></h3>
        <div class="cue-box"><strong>Repère visuel clé :</strong> ${esc(f.visualCue)}</div>
        <p><strong>Hauteur :</strong> ${esc(f.heightZone)}</p>
        <p><strong>1re ligne :</strong> ${esc(f.firstLinePosition)}</p>
        <p><strong>Sabots :</strong> ${esc(f.guardsUsed.join(', '))}</p>
        <p><strong>Levier :</strong> ${esc(f.leverSettings)}</p>
        <p><strong>Effacement :</strong> ${esc(f.lineRemovalMethod)}</p>
      </div>
    </div>`;
  }).join('');

  const hairstylesGridHtml = AFRO_HAIRSTYLES.map((s) => {
    const src = getImgSrc(s.imageId, images);
    const asset = ASSETS[s.imageId];
    return `
    <div class="card-white media-card">
      ${src ? `<img class="photo-4-3" src="${src}" alt="${esc(asset?.alt ?? s.name)}" />` : ''}
      <div class="media-body">
        <p class="kicker">Coiffure #${String(s.number).padStart(2, '0')} · ${esc(s.category)} · ${esc(s.difficulty)}</p>
        <h3>${esc(s.name)}</h3>
        <div class="cue-box"><strong>Repère visuel clé :</strong> ${esc(s.visualCue)}</div>
        <p>${esc(s.description)}</p>
        <p><strong>Profils adaptés :</strong> ${esc(s.suitableHairTypes.join(', '))}</p>
        <p><strong>Matériel :</strong> ${esc(s.materials.join(', '))}</p>
        <ol class="compact-list">${s.steps.map((st) => `<li>${esc(st)}</li>`).join('')}</ol>
      </div>
    </div>`;
  }).join('');

  const glossaryHtml = GLOSSARY_TERMS.map(
    (g) => `
    <div class="card-white glossary-item" data-search="${esc(`${g.termFr} ${g.termEn} ${g.category} ${g.definition}`.toLowerCase())}">
      <div class="row-between">
        <strong>${esc(g.termFr)} <span class="accent">/ ${esc(g.termEn)}</span></strong>
        <span class="mono-sm">${esc(g.category)}</span>
      </div>
      <p class="small">${esc(g.definition)}</p>
    </div>`
  ).join('');

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>NOTORIOUS BARBER ACADEMY — Module Complet Hors Ligne</title>
  <style>
    :root {
      --white: #ffffff;
      --porcelain: #faf8f4;
      --beige: #f5efe6;
      --beige-deep: #ece3d5;
      --border: #e2d8c8;
      --border-strong: #cfc2ae;
      --black: #111111;
      --charcoal: #2e2a25;
      --muted: #5c554b;
      --accent: #7d6340;
      --ok: #166534;
      --ok-bg: #ecfdf5;
      --warn: #92400e;
      --warn-bg: #fffbeb;
      --err: #991b1b;
      --err-bg: #fef2f2;
    }
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body {
      margin: 0;
      background: var(--white);
      color: var(--black);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      font-size: 15px;
    }
    h1, h2, h3, h4 {
      font-family: Georgia, "Times New Roman", serif;
      color: var(--black);
      line-height: 1.2;
      margin: 0 0 0.6rem;
    }
    p { margin: 0 0 0.75rem; color: var(--charcoal); }
    ul, ol { margin: 0.4rem 0 0.9rem; padding-left: 1.25rem; color: var(--charcoal); }
    li { margin-bottom: 0.35rem; }
    a { color: var(--black); }

    .topbar {
      position: sticky;
      top: 0;
      z-index: 30;
      background: rgba(255,255,255,0.96);
      border-bottom: 1px solid var(--border);
      backdrop-filter: blur(8px);
    }
    .topbar-inner {
      max-width: 1240px;
      margin: 0 auto;
      padding: 0.75rem 1.25rem;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
    }
    .brand {
      font-family: Georgia, "Times New Roman", serif;
      font-weight: 700;
      font-size: 1rem;
      letter-spacing: 0.04em;
      text-decoration: none;
      white-space: nowrap;
    }
    .nav-links {
      display: flex;
      flex-wrap: wrap;
      gap: 0.9rem;
      font-size: 0.85rem;
    }
    .nav-links a {
      text-decoration: none;
      color: var(--muted);
      font-weight: 500;
    }
    .nav-links a:hover { color: var(--black); text-decoration: underline; }
    .btn-dark {
      background: var(--black);
      color: var(--white);
      border: 1px solid var(--black);
      border-radius: 6px;
      padding: 0.5rem 0.95rem;
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
    }
    .btn-dark:hover { background: #292622; }
    .btn-light {
      background: var(--white);
      color: var(--black);
      border: 1px solid var(--border-strong);
      border-radius: 6px;
      padding: 0.45rem 0.85rem;
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
    }
    .btn-light:hover, .btn-light.active {
      background: var(--black);
      color: var(--white);
      border-color: var(--black);
    }

    .container { max-width: 1240px; margin: 0 auto; padding: 2rem 1.25rem 4rem; }
    .hero {
      background: var(--porcelain);
      border-bottom: 1px solid var(--border);
      padding: 2.5rem 1.25rem;
    }
    .hero-grid {
      max-width: 1240px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: 2rem;
      align-items: center;
    }
    .hero h1 { font-size: clamp(1.9rem, 3.4vw, 2.9rem); }
    .hero-img {
      width: 100%;
      aspect-ratio: 4/3;
      object-fit: cover;
      border-radius: 12px;
      border: 1px solid var(--border);
      display: block;
    }
    .kicker {
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 0.74rem;
      color: var(--accent);
      font-weight: 600;
      letter-spacing: 0.03em;
      margin-bottom: 0.35rem;
    }
    .mono { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-variant-numeric: tabular-nums; }
    .mono-sm { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 0.75rem; color: var(--muted); }
    .accent { color: var(--accent); font-weight: 500; }
    .muted { color: var(--muted); font-weight: 400; font-size: 0.9em; }
    .small { font-size: 0.86rem; }
    .lead { font-size: 1.02rem; color: var(--charcoal); }
    .warn { color: var(--warn); }
    .muted-note { font-size: 0.86rem; color: var(--muted); }

    .toc-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 0.85rem;
      margin: 1.5rem 0 2.5rem;
    }
    .toc-link {
      display: block;
      text-decoration: none;
      background: var(--beige);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 0.9rem 1rem;
    }
    .toc-link:hover { border-color: var(--black); }

    .section-title {
      margin: 3rem 0 1.25rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid var(--border);
    }

    .chapter-card {
      background: var(--porcelain);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 1.75rem;
      margin-bottom: 2rem;
    }
    .editorial-fig { margin: 1.25rem 0; }
    .editorial-fig img {
      width: 100%;
      max-height: 440px;
      object-fit: cover;
      border-radius: 10px;
      border: 1px solid var(--border);
      display: block;
    }
    .editorial-fig figcaption {
      font-size: 0.8rem;
      color: var(--muted);
      margin-top: 0.45rem;
    }
    .subblock { margin: 1.25rem 0; }
    .callout, .callout-beige, .callout-warn, .workshop-box, .note-box {
      border-radius: 10px;
      padding: 1rem 1.2rem;
      margin: 1rem 0;
      border: 1px solid var(--border);
    }
    .callout { background: var(--white); }
    .callout-beige { background: var(--beige); }
    .callout-warn { background: var(--warn-bg); border-color: #fde68a; }
    .workshop-box { background: var(--beige-deep); border-color: var(--border-strong); }
    .note-box { background: var(--ok-bg); border-color: #bbf7d0; }

    .grid-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
    .grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; }
    .card-white {
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1.1rem;
    }
    .card-soft {
      background: var(--beige);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1.1rem;
    }
    .media-card { padding: 0; overflow: hidden; display: flex; flex-direction: column; }
    .photo-4-3 { width: 100%; aspect-ratio: 4/3; object-fit: cover; display: block; background: var(--beige); }
    .media-body { padding: 1.1rem; font-size: 0.9rem; }
    .cue-box {
      background: var(--beige);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 0.65rem 0.8rem;
      font-size: 0.84rem;
      margin: 0.65rem 0 0.85rem;
      color: var(--black);
    }
    .compact-list { font-size: 0.84rem; padding-left: 1.1rem; }

    .comparator-panel {
      background: var(--beige);
      border: 1px solid var(--border-strong);
      border-radius: 14px;
      padding: 1.25rem;
      margin-bottom: 1.5rem;
    }
    .preset-row { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 0.75rem 0 1rem; }
    select, input[type="search"] {
      width: 100%;
      padding: 0.55rem 0.75rem;
      border-radius: 8px;
      border: 1px solid var(--border-strong);
      background: var(--white);
      color: var(--black);
      font-size: 0.9rem;
    }
    .table-wrap { overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; font-size: 0.88rem; background: var(--white); }
    th, td { padding: 0.65rem 0.75rem; border-bottom: 1px solid var(--border); text-align: left; }
    th { background: var(--black); color: var(--white); font-size: 0.78rem; letter-spacing: 0.03em; }
    .bar-track { width: 120px; height: 8px; background: var(--beige-deep); border-radius: 4px; overflow: hidden; }
    .bar-fill { height: 100%; background: var(--black); }
    .row-between { display: flex; justify-content: space-between; align-items: baseline; gap: 0.5rem; flex-wrap: wrap; }

    .quiz-item {
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 1rem 1.15rem;
      margin-bottom: 0.85rem;
    }
    .quiz-opt {
      display: block;
      width: 100%;
      text-align: left;
      margin: 0.35rem 0;
      padding: 0.55rem 0.8rem;
      border-radius: 7px;
      border: 1px solid var(--border);
      background: var(--porcelain);
      color: var(--black);
      cursor: pointer;
      font-size: 0.88rem;
    }
    .quiz-opt.correct { background: var(--ok-bg); border-color: #86efac; color: var(--ok); font-weight: 600; }
    .quiz-opt.wrong { background: var(--err-bg); border-color: #fca5a5; color: var(--err); }
    .quiz-exp { font-size: 0.84rem; margin-top: 0.55rem; padding: 0.6rem 0.8rem; background: var(--beige); border-radius: 7px; display: none; }
    .quiz-exp.show { display: block; }

    footer {
      border-top: 1px solid var(--border);
      background: var(--porcelain);
      padding: 1.75rem 1.25rem;
      text-align: center;
      font-size: 0.82rem;
      color: var(--muted);
    }

    @media (max-width: 860px) {
      .hero-grid, .grid-2, .grid-3 { grid-template-columns: 1fr; }
      .chapter-card { padding: 1.15rem; }
    }
    @media print {
      .topbar, .no-print { display: none !important; }
      .chapter-card, .media-card { break-inside: avoid; }
    }
  </style>
</head>
<body>
  <header class="topbar no-print">
    <div class="topbar-inner">
      <a href="#top" class="brand">NOTORIOUS BARBER ACADEMY</a>
      <nav class="nav-links" aria-label="Sommaire hors ligne">
        <a href="#sommaire">9 Chapitres</a>
        <a href="#materiel">16 Outils</a>
        <a href="#sabots-calc">Sabots</a>
        <a href="#fades">10 Fades</a>
        <a href="#coiffures">15 Coiffures</a>
        <a href="#quiz">Quiz (31)</a>
        <a href="#glossaire">Glossaire</a>
      </nav>
      <button type="button" class="btn-dark" onclick="window.print()">Imprimer / PDF</button>
    </div>
  </header>

  <section id="top" class="hero">
    <div class="hero-grid">
      <div>
        <p class="kicker">MODULE COMPLET HORS LIGNE · ÉDITION DU ${esc(exportDate).toUpperCase()}</p>
        <h1>NOTORIOUS BARBER ACADEMY — Formation Coiffure Masculine Afro</h1>
        <p class="lead">
          Version intégrale autonome utilisable sans connexion Internet sur Android, iPhone, Windows et Mac.
          Inclut les 9 chapitres illustrés, les 16 outils, le calculateur de sabots, les 10 fades et 15 coiffures
          avec leurs photographies dédiées, les comparateurs côte à côte, le quiz interactif (31 questions) et le glossaire bilingue.
        </p>
      </div>
      ${heroSrc ? `<img class="hero-img" src="${heroSrc}" alt="Atelier Notorious Barber Academy" />` : ''}
    </div>
  </section>

  <main class="container">
    <section id="sommaire">
      <p class="kicker">Navigation directe</p>
      <h2>Sommaire des 9 Chapitres</h2>
      <div class="toc-grid">
        ${CHAPTERS.map(
          (c) => `
          <a class="toc-link" href="#chapitre-${c.id}">
            <div class="kicker">Chapitre ${String(c.id).padStart(2, '0')} · ${esc(c.level)} · ${c.durationMinutes} min</div>
            <strong>${esc(c.shortTitle)}</strong>
          </a>`
        ).join('')}
      </div>
    </section>

    <section id="cours">
      <div class="section-title">
        <p class="kicker">Programme officiel complet</p>
        <h2>Les 9 Chapitres de Formation</h2>
      </div>
      ${chapterSectionsHtml}
    </section>

    <section id="materiel">
      <div class="section-title">
        <div class="row-between">
          <div>
            <p class="kicker">Chapitre 02 · Encyclopédie technique</p>
            <h2>Les 16 Outils du Barbier Professionnel</h2>
          </div>
          <div style="min-width:240px" class="no-print">
            <input type="search" id="toolSearch" placeholder="Filtrer un outil (clipper, shaver...)" aria-label="Filtrer un outil" />
          </div>
        </div>
      </div>
      <div id="toolsGrid" class="grid-2">${toolsHtml}</div>
    </section>

    <section id="sabots-calc">
      <div class="section-title">
        <p class="kicker">Chapitre 03 · Calculateur hors ligne</p>
        <h2>Calculateur interactif de Sabots & Levier</h2>
      </div>
      <div class="comparator-panel">
        <div class="grid-2">
          <div>
            <label for="guardSelect" class="kicker" style="display:block">Choisir un sabot (0 à #8)</label>
            <select id="guardSelect"></select>
          </div>
          <div>
            <label for="leverSelect" class="kicker" style="display:block">Position du levier</label>
            <select id="leverSelect">
              <option value="closed">Levier fermé (en haut · +0,0 mm)</option>
              <option value="quarter">Quart ouvert (+0,25 mm)</option>
              <option value="half">Mi-ouvert (+0,5 mm)</option>
              <option value="open">Levier ouvert (en bas · +1,0 mm)</option>
            </select>
          </div>
        </div>
        <div id="guardOutput" class="card-white" style="margin-top:1rem"></div>
      </div>
    </section>

    <section id="fades">
      <div class="section-title">
        <p class="kicker">Chapitre 04 · 10 photographies dédiées</p>
        <h2>Les 10 Types de Fade & Comparateur Visuel</h2>
      </div>
      <div class="comparator-panel no-print">
        <p class="kicker">Comparateur côte à côte hors ligne</p>
        <h3>Observez la différence visuelle entre 2 Fades</h3>
        <div class="preset-row" id="fadePresets"></div>
        <div class="grid-2">
          <div>
            <label for="fadeSelectA" class="kicker" style="display:block">Fade A</label>
            <select id="fadeSelectA"></select>
          </div>
          <div>
            <label for="fadeSelectB" class="kicker" style="display:block">Fade B</label>
            <select id="fadeSelectB"></select>
          </div>
        </div>
        <div id="fadeCompareStage" class="grid-2" style="margin-top:1rem"></div>
      </div>
      <div class="grid-2">${fadesGridHtml}</div>
    </section>

    <section id="coiffures">
      <div class="section-title">
        <p class="kicker">Chapitre 05 · 15 photographies dédiées</p>
        <h2>Catalogue des 15 Coiffures Afro & Comparateur Visuel</h2>
      </div>
      <div class="comparator-panel no-print">
        <p class="kicker">Comparateur côte à côte hors ligne</p>
        <h3>Observez la différence visuelle entre 2 Coiffures</h3>
        <div class="preset-row" id="stylePresets"></div>
        <div class="grid-2">
          <div>
            <label for="styleSelectA" class="kicker" style="display:block">Modèle A</label>
            <select id="styleSelectA"></select>
          </div>
          <div>
            <label for="styleSelectB" class="kicker" style="display:block">Modèle B</label>
            <select id="styleSelectB"></select>
          </div>
        </div>
        <div id="styleCompareStage" class="grid-2" style="margin-top:1rem"></div>
      </div>
      <div class="grid-3">${hairstylesGridHtml}</div>
    </section>

    <section id="quiz">
      <div class="section-title">
        <div class="row-between">
          <div>
            <p class="kicker">Évaluation complète hors ligne</p>
            <h2>Quiz d’Auto-Évaluation (${QUIZ_QUESTIONS.length} questions avec corrections)</h2>
          </div>
          <div id="quizScoreBadge" class="mono" style="font-weight:700">Score : 0 / ${QUIZ_QUESTIONS.length}</div>
        </div>
      </div>
      <div id="quizContainer"></div>
    </section>

    <section id="glossaire">
      <div class="section-title">
        <div class="row-between">
          <div>
            <p class="kicker">Lexique bilingue officiel</p>
            <h2>Glossaire Français / Anglais (${GLOSSARY_TERMS.length} termes)</h2>
          </div>
          <div style="min-width:240px" class="no-print">
            <input type="search" id="glossarySearch" placeholder="Rechercher un terme..." aria-label="Rechercher un terme" />
          </div>
        </div>
      </div>
      <div id="glossaryGrid" class="grid-2">${glossaryHtml}</div>
    </section>
  </main>

  <footer>
    <strong>NOTORIOUS BARBER ACADEMY</strong> — Module complet d’apprentissage professionnel (Coiffure masculine afro). Document hors ligne généré le ${esc(exportDate)}.
  </footer>

  <script>
    (function() {
      const FADES = ${safeJsonForScript(fadeComparatorData)};
      const STYLES = ${safeJsonForScript(styleComparatorData)};
      const GUARDS = ${safeJsonForScript(guardData)};
      const QUIZ = ${safeJsonForScript(quizData)};

      function escHtml(s) {
        return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
      }

      // 1. Guard calculator
      const guardSel = document.getElementById('guardSelect');
      const leverSel = document.getElementById('leverSelect');
      const guardOut = document.getElementById('guardOutput');
      GUARDS.forEach(function(g, idx) {
        const opt = document.createElement('option');
        opt.value = String(idx);
        opt.textContent = g.label + ' (' + g.mmClosed + ' – ' + g.mmOpen + ' mm)';
        guardSel.appendChild(opt);
      });
      function renderGuard() {
        const g = GUARDS[Number(guardSel.value) || 0];
        const lv = leverSel.value;
        const delta = lv === 'closed' ? 0 : lv === 'quarter' ? 0.25 : lv === 'half' ? 0.5 : 1;
        const mm = +(g.mmClosed + delta * (g.mmOpen - g.mmClosed)).toFixed(2);
        guardOut.innerHTML =
          '<p class="kicker">' + escHtml(g.label) + '</p>' +
          '<h3 class="mono">' + mm + ' mm effectifs</h3>' +
          '<p><strong>Usage principal :</strong> ' + escHtml(g.primaryUse) + '</p>' +
          '<p class="small"><strong>Rôle dans le fade :</strong> ' + escHtml(g.fadeRole) + '</p>';
      }
      guardSel.addEventListener('change', renderGuard);
      leverSel.addEventListener('change', renderGuard);
      renderGuard();

      // 2. Fade comparator
      const fSelA = document.getElementById('fadeSelectA');
      const fSelB = document.getElementById('fadeSelectB');
      const fStage = document.getElementById('fadeCompareStage');
      const fPresets = document.getElementById('fadePresets');
      FADES.forEach(function(f) {
        [fSelA, fSelB].forEach(function(sel) {
          const o = document.createElement('option');
          o.value = f.id;
          o.textContent = '#' + String(f.number).padStart(2,'0') + ' — ' + f.name + ' (' + f.frenchSubtitle + ')';
          sel.appendChild(o);
        });
      });
      fSelA.value = 'low-fade';
      fSelB.value = 'mid-fade';
      function renderFadeCompare() {
        const a = FADES.find(function(x){ return x.id === fSelA.value; }) || FADES[0];
        const b = FADES.find(function(x){ return x.id === fSelB.value; }) || FADES[1];
        fStage.innerHTML = [a, b].map(function(f, idx) {
          return '<div class="card-white media-card">' +
            (f.imgSrc ? '<img class="photo-4-3" src="' + f.imgSrc + '" alt="' + escHtml(f.name) + '" />' : '') +
            '<div class="media-body">' +
              '<p class="kicker">Fade ' + (idx === 0 ? 'A' : 'B') + ' · ' + escHtml(f.figureCode) + '</p>' +
              '<h3>' + escHtml(f.name) + '</h3>' +
              '<div class="cue-box"><strong>Repère visuel :</strong> ' + escHtml(f.visualCue) + '</div>' +
              '<p><strong>Hauteur :</strong> ' + escHtml(f.heightZone) + '</p>' +
              '<p><strong>Sabots :</strong> ' + escHtml(f.guardsUsed.join(', ')) + '</p>' +
              '<p><strong>Effacement :</strong> ' + escHtml(f.lineRemovalMethod) + '</p>' +
            '</div></div>';
        }).join('');
      }
      [
        ['Low vs Mid Fade', 'low-fade', 'mid-fade'],
        ['Mid vs High Fade', 'mid-fade', 'high-fade'],
        ['Skin vs Shadow Fade', 'skin-fade', 'shadow-fade'],
        ['Taper vs Burst Fade', 'taper-fade', 'burst-fade'],
        ['Drop vs Temple Fade', 'drop-fade', 'temple-fade']
      ].forEach(function(p) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'btn-light';
        btn.textContent = p[0];
        btn.addEventListener('click', function() {
          fSelA.value = p[1];
          fSelB.value = p[2];
          renderFadeCompare();
        });
        fPresets.appendChild(btn);
      });
      fSelA.addEventListener('change', renderFadeCompare);
      fSelB.addEventListener('change', renderFadeCompare);
      renderFadeCompare();

      // 3. Hairstyle comparator
      const sSelA = document.getElementById('styleSelectA');
      const sSelB = document.getElementById('styleSelectB');
      const sStage = document.getElementById('styleCompareStage');
      const sPresets = document.getElementById('stylePresets');
      STYLES.forEach(function(s) {
        [sSelA, sSelB].forEach(function(sel) {
          const o = document.createElement('option');
          o.value = s.id;
          o.textContent = '#' + String(s.number).padStart(2,'0') + ' — ' + s.name;
          sel.appendChild(o);
        });
      });
      sSelA.value = 'buzz-cut';
      sSelB.value = 'caesar-cut';
      function renderStyleCompare() {
        const a = STYLES.find(function(x){ return x.id === sSelA.value; }) || STYLES[0];
        const b = STYLES.find(function(x){ return x.id === sSelB.value; }) || STYLES[1];
        sStage.innerHTML = [a, b].map(function(s, idx) {
          return '<div class="card-white media-card">' +
            (s.imgSrc ? '<img class="photo-4-3" src="' + s.imgSrc + '" alt="' + escHtml(s.name) + '" />' : '') +
            '<div class="media-body">' +
              '<p class="kicker">Modèle ' + (idx === 0 ? 'A' : 'B') + ' · ' + escHtml(s.figureCode) + '</p>' +
              '<h3>' + escHtml(s.name) + '</h3>' +
              '<div class="cue-box"><strong>Repère visuel :</strong> ' + escHtml(s.visualCue) + '</div>' +
              '<p>' + escHtml(s.description) + '</p>' +
              '<p><strong>Matériel :</strong> ' + escHtml(s.materials.join(', ')) + '</p>' +
            '</div></div>';
        }).join('');
      }
      [
        ['Afro naturel vs Afro court', 'afro-naturel', 'afro-court'],
        ['Buzz Cut vs Caesar Cut', 'buzz-cut', 'caesar-cut'],
        ['Waves 360 vs Buzz Cut', 'waves-360', 'buzz-cut'],
        ['Sponge Twists vs Twist Out', 'sponge-twists', 'twist-out'],
        ['Hard Part vs Motifs artistiques', 'coupe-raie-hard-part', 'degrade-motifs-artistiques']
      ].forEach(function(p) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'btn-light';
        btn.textContent = p[0];
        btn.addEventListener('click', function() {
          sSelA.value = p[1];
          sSelB.value = p[2];
          renderStyleCompare();
        });
        sPresets.appendChild(btn);
      });
      sSelA.addEventListener('change', renderStyleCompare);
      sSelB.addEventListener('change', renderStyleCompare);
      renderStyleCompare();

      // 4. Interactive Quiz
      const quizEl = document.getElementById('quizContainer');
      const scoreEl = document.getElementById('quizScoreBadge');
      const answered = {};
      function updateScore() {
        let ok = 0;
        Object.keys(answered).forEach(function(k) { if (answered[k]) ok++; });
        scoreEl.textContent = 'Score : ' + ok + ' / ' + QUIZ.length;
      }
      QUIZ.forEach(function(q, qIdx) {
        const card = document.createElement('div');
        card.className = 'quiz-item';
        const h = document.createElement('p');
        h.innerHTML = '<span class="kicker">Question ' + (qIdx + 1) + ' · Chapitre ' + q.chapterId + '</span><br/><strong>' + escHtml(q.prompt) + '</strong>';
        card.appendChild(h);
        const exp = document.createElement('div');
        exp.className = 'quiz-exp';
        exp.innerHTML = '<strong>Explication :</strong> ' + escHtml(q.explanation);
        const btns = [];
        q.options.forEach(function(opt, oIdx) {
          const b = document.createElement('button');
          b.type = 'button';
          b.className = 'quiz-opt';
          b.textContent = String.fromCharCode(65 + oIdx) + '. ' + opt;
          b.addEventListener('click', function() {
            if (q.id in answered) return;
            answered[q.id] = oIdx === q.correctIndex;
            btns.forEach(function(btnItem, idx2) {
              btnItem.disabled = true;
              if (idx2 === q.correctIndex) btnItem.classList.add('correct');
              else if (idx2 === oIdx) btnItem.classList.add('wrong');
            });
            exp.classList.add('show');
            updateScore();
          });
          btns.push(b);
          card.appendChild(b);
        });
        card.appendChild(exp);
        quizEl.appendChild(card);
      });

      // 5. Search filters (Tools & Glossary)
      function bindFilter(inputId, containerId, selector) {
        const inp = document.getElementById(inputId);
        const box = document.getElementById(containerId);
        if (!inp || !box) return;
        inp.addEventListener('input', function() {
          const q = inp.value.trim().toLowerCase();
          box.querySelectorAll(selector).forEach(function(el) {
            const hay = el.getAttribute('data-search') || '';
            el.style.display = !q || hay.indexOf(q) !== -1 ? '' : 'none';
          });
        });
      }
      bindFilter('toolSearch', 'toolsGrid', '.tool-item');
      bindFilter('glossarySearch', 'glossaryGrid', '.glossary-item');
    })();
  </script>
</body>
</html>`;
}
