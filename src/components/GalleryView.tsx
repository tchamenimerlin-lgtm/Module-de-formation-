import React, { useState } from 'react';
import { Columns2, LayoutGrid, Search, X } from 'lucide-react';
import { AFRO_HAIRSTYLES } from '../data/fadesAndStyles';
import { AfroHairstyle, HairTextureCode, SkillLevel } from '../types/academy';
import { filterHairstyles } from '../utils/academyLogic';
import { EditorialFigure } from './EditorialFigure';

const LEVELS: Array<SkillLevel | 'Tous'> = ['Tous', 'Débutant', 'Intermédiaire', 'Avancé'];
const TEXTURES: Array<HairTextureCode | 'Tous'> = ['Tous', '3A', '3B', '3C', '4A', '4B', '4C'];

const COMPARE_PRESETS: Array<{ label: string; leftId: string; rightId: string }> = [
  { label: 'Afro naturel vs Afro court', leftId: 'afro-naturel', rightId: 'afro-court' },
  { label: 'Low Fade vs Mid Fade', leftId: 'afro-low-fade', rightId: 'afro-mid-fade' },
  { label: 'Mid Fade vs High Fade', leftId: 'afro-mid-fade', rightId: 'afro-high-fade' },
  { label: 'Buzz Cut vs Caesar Cut', leftId: 'buzz-cut', rightId: 'caesar-cut' },
  { label: 'Waves 360 vs Buzz Cut', leftId: 'waves-360', rightId: 'buzz-cut' },
  { label: 'Sponge Twists vs Twist Out', leftId: 'sponge-twists', rightId: 'twist-out' },
  { label: 'Hard Part vs Motifs artistiques', leftId: 'hard-part', rightId: 'motifs-artistiques' },
];

export const GalleryView: React.FC = () => {
  const [viewMode, setViewMode] = useState<'catalog' | 'compare'>('catalog');
  const [query, setQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<SkillLevel | 'Tous'>('Tous');
  const [hairFilter, setHairFilter] = useState<HairTextureCode | 'Tous'>('Tous');
  const [selectedStyle, setSelectedStyle] = useState<AfroHairstyle | null>(null);

  const [leftCompareId, setLeftCompareId] = useState<string>('afro-low-fade');
  const [rightCompareId, setRightCompareId] = useState<string>('afro-mid-fade');

  const filtered = filterHairstyles(AFRO_HAIRSTYLES, query, levelFilter, hairFilter);
  const leftStyle = AFRO_HAIRSTYLES.find((s) => s.id === leftCompareId) ?? AFRO_HAIRSTYLES[2];
  const rightStyle = AFRO_HAIRSTYLES.find((s) => s.id === rightCompareId) ?? AFRO_HAIRSTYLES[3];

  const handleOpenCompareWith = (styleId: string) => {
    setLeftCompareId(styleId);
    const other = AFRO_HAIRSTYLES.find((s) => s.id !== styleId);
    if (other && rightCompareId === styleId) {
      setRightCompareId(other.id);
    }
    setSelectedStyle(null);
    setViewMode('compare');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mx-auto max-w-[1360px] px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      {/* Header + Mode Switch */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between border-b border-[#E2D8C8] pb-8">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs font-mono-tabular font-medium text-[#7D6340]">
            Chapitre 05 · Catalogue photographique de précision · 15 coupes masculines afro distinctes
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#111111]">
            Galerie & Comparateur visuel des coiffures afro
          </h1>
          <p className="text-sm sm:text-base leading-relaxed text-[#5C554B]">
            Chaque coiffure dispose de sa photographie studio dédiée et d’un repère visuel précis.
            Utilisez le comparateur côte à côte pour observer immédiatement la différence entre deux
            coupes en images.
          </p>
        </div>

        {/* Segmented Mode Control */}
        <div
          role="tablist"
          aria-label="Mode d’affichage de la galerie"
          className="inline-flex items-center gap-1 rounded-lg bg-[#F5EFE6] p-1 border border-[#E2D8C8] self-start lg:self-auto"
        >
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === 'catalog'}
            onClick={() => setViewMode('catalog')}
            className={`inline-flex items-center gap-2 rounded-md px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              viewMode === 'catalog'
                ? 'bg-[#111111] text-white font-semibold'
                : 'text-[#5C554B] hover:text-[#111111]'
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Catalogue ({AFRO_HAIRSTYLES.length})</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === 'compare'}
            onClick={() => setViewMode('compare')}
            className={`inline-flex items-center gap-2 rounded-md px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              viewMode === 'compare'
                ? 'bg-[#111111] text-white font-semibold'
                : 'text-[#5C554B] hover:text-[#111111]'
            }`}
          >
            <Columns2 className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Comparer 2 coiffures</span>
          </button>
        </div>
      </div>

      {viewMode === 'compare' ? (
        /* SIDE-BY-SIDE VISUAL COMPARISON WORKSPACE */
        <section
          aria-label="Comparateur visuel de deux coiffures"
          className="space-y-8"
        >
          {/* Quick Educational Presets */}
          <div className="space-y-2.5">
            <p className="text-xs font-mono-tabular text-[#7D6340]">
              Comparaisons pédagogiques recommandées
            </p>
            <div className="flex flex-wrap gap-2">
              {COMPARE_PRESETS.map((preset) => {
                const isActive =
                  leftCompareId === preset.leftId && rightCompareId === preset.rightId;
                return (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      setLeftCompareId(preset.leftId);
                      setRightCompareId(preset.rightId);
                    }}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-[#111111] text-white font-semibold'
                        : 'border border-[#E2D8C8] bg-[#FAF8F4] text-[#2E2A25] hover:border-[#111111] hover:text-[#111111]'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Side-by-Side 2-Column Visual Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {[
              {
                slot: 'Modèle A',
                selectId: 'compare-style-left',
                value: leftCompareId,
                onChange: setLeftCompareId,
                style: leftStyle,
              },
              {
                slot: 'Modèle B',
                selectId: 'compare-style-right',
                value: rightCompareId,
                onChange: setRightCompareId,
                style: rightStyle,
              },
            ].map((pane) => (
              <div
                key={pane.slot}
                className="rounded-xl border border-[#E2D8C8] bg-[#FAF8F4] p-5 sm:p-6 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  {/* Selector Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <label
                      htmlFor={pane.selectId}
                      className="text-xs font-mono-tabular font-semibold text-[#7D6340]"
                    >
                      {pane.slot} · #{String(pane.style.number).padStart(2, '0')}
                    </label>
                    <select
                      id={pane.selectId}
                      value={pane.value}
                      onChange={(e) => pane.onChange(e.target.value)}
                      className="min-h-[40px] rounded-md border border-[#CFC2AE] bg-white px-3 py-1.5 text-xs font-semibold text-[#111111]"
                    >
                      {AFRO_HAIRSTYLES.map((s) => (
                        <option key={s.id} value={s.id}>
                          #{String(s.number).padStart(2, '0')} — {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Large Studio Reference Portrait */}
                  <EditorialFigure
                    assetId={pane.style.imageId}
                    captionOverride={pane.style.caption}
                    aspectClass="aspect-[4/3]"
                  />

                  <div>
                    <p className="text-xs font-mono-tabular text-[#5C554B]">
                      {pane.style.category} · Niveau {pane.style.difficulty}
                    </p>
                    <h2 className="mt-1 font-display text-2xl font-semibold text-[#111111]">
                      {pane.style.name}
                    </h2>
                  </div>

                  {/* Key Visual Differentiator Box */}
                  <div className="rounded-lg border border-[#CFC2AE] bg-[#F5EFE6] p-4 space-y-1">
                    <p className="text-[11px] font-mono-tabular font-semibold text-[#7D6340]">
                      Ce qu’il faut observer sur la photo
                    </p>
                    <p className="text-sm font-medium leading-relaxed text-[#111111]">
                      {pane.style.visualCue}
                    </p>
                  </div>

                  {/* Structured Specs for Direct Side-by-Side Reading */}
                  <dl className="space-y-3 border-t border-[#E2D8C8] pt-4 text-xs leading-relaxed">
                    <div>
                      <dt className="text-[#5C554B] font-medium">Profils capillaires adaptés</dt>
                      <dd className="mt-0.5 font-mono-tabular font-semibold text-[#111111]">
                        {pane.style.suitableHairTypes.join(' · ')}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[#5C554B] font-medium">Outils principaux</dt>
                      <dd className="mt-0.5 text-[#2E2A25]">{pane.style.materials.join(' · ')}</dd>
                    </div>
                    <div>
                      <dt className="text-[#5C554B] font-medium">Point technique clé</dt>
                      <dd className="mt-0.5 text-[#2E2A25]">{pane.style.hairProfileNote}</dd>
                    </div>
                  </dl>
                </div>

                <div className="border-t border-[#E2D8C8] pt-4">
                  <button
                    type="button"
                    onClick={() => setSelectedStyle(pane.style)}
                    className="w-full rounded-md border border-[#111111] bg-white px-4 py-2.5 text-xs font-semibold text-[#111111] hover:bg-[#111111] hover:text-white transition-colors cursor-pointer"
                  >
                    Ouvrir le protocole complet ({pane.style.steps.length} étapes)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        /* FULL 15-STYLE VISUAL CATALOG */
        <>
          {/* Filters Toolbar */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-sm">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7D6340]"
                aria-hidden="true"
              />
              <input
                type="search"
                aria-label="Rechercher un modèle de coupe"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher (Waves, Taper, Sponge Twists, Crop...)"
                className="w-full min-h-[42px] rounded-lg border border-[#E2D8C8] bg-[#FAF8F4] pl-10 pr-4 py-2 text-sm text-[#111111] placeholder:text-[#787066]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 rounded-lg bg-[#F5EFE6] p-1 border border-[#E2D8C8]">
                {LEVELS.map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setLevelFilter(lvl)}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      levelFilter === lvl
                        ? 'bg-[#111111] text-white font-semibold'
                        : 'text-[#5C554B] hover:text-[#111111]'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-1 rounded-lg bg-[#F5EFE6] p-1 border border-[#E2D8C8]">
                {TEXTURES.map((tex) => (
                  <button
                    key={tex}
                    type="button"
                    onClick={() => setHairFilter(tex)}
                    className={`rounded-md px-2.5 py-1.5 text-xs font-mono-tabular font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      hairFilter === tex
                        ? 'bg-[#111111] text-white font-semibold'
                        : 'text-[#5C554B] hover:text-[#111111]'
                    }`}
                  >
                    {tex}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-xs font-mono-tabular text-[#5C554B]">
            {filtered.length} modèle{filtered.length > 1 ? 's' : ''} affiché{filtered.length > 1 ? 's' : ''} sur {AFRO_HAIRSTYLES.length} · 15 photographies distinctes
          </p>

          {/* Catalog Grid */}
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-[#E2D8C8] bg-[#FAF8F4] p-10 text-center space-y-3">
              <p className="text-sm text-[#2E2A25]">
                Aucun modèle ne correspond à cette combinaison de filtres.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setLevelFilter('Tous');
                  setHairFilter('Tous');
                }}
                className="rounded-md bg-[#111111] px-4 py-2 text-xs font-semibold text-white hover:bg-[#292622] cursor-pointer"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((style) => (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => setSelectedStyle(style)}
                  className="group text-left rounded-xl border border-[#E2D8C8] bg-[#FAF8F4] overflow-hidden hover:border-[#111111] transition-colors flex flex-col cursor-pointer"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[#F5EFE6]">
                    <EditorialFigure assetId={style.imageId} aspectClass="aspect-[4/3]" hideCaption />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#5C554B]">
                        <span className="text-[#7D6340] font-semibold">
                          #{String(style.number).padStart(2, '0')}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{style.difficulty}</span>
                        <span aria-hidden="true">·</span>
                        <span>{style.category}</span>
                      </div>
                      <h2 className="font-display text-xl font-semibold text-[#111111] group-hover:text-[#7D6340] transition-colors">
                        {style.name}
                      </h2>
                      <p className="text-xs leading-relaxed text-[#2E2A25]">
                        <span className="font-semibold text-[#7D6340]">Repère visuel : </span>
                        {style.visualCue}
                      </p>
                    </div>

                    <div className="border-t border-[#E2D8C8] pt-3 flex items-center justify-between text-xs">
                      <span className="font-mono-tabular text-[#5C554B]">
                        Profils : {style.suitableHairTypes.join(', ')}
                      </span>
                      <span className="font-semibold text-[#111111] group-hover:text-[#7D6340]">
                        Voir la fiche →
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {/* Detail Modal */}
      {selectedStyle && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="style-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#111111]/60 p-4 backdrop-blur-sm"
          onClick={() => setSelectedStyle(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl border border-[#E2D8C8] bg-white p-6 sm:p-8 space-y-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#E2D8C8] pb-4">
              <div>
                <p className="text-xs font-mono-tabular font-medium text-[#7D6340]">
                  Modèle #{String(selectedStyle.number).padStart(2, '0')} · {selectedStyle.category} · Niveau {selectedStyle.difficulty}
                </p>
                <h2
                  id="style-modal-title"
                  className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-[#111111]"
                >
                  {selectedStyle.name}
                </h2>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleOpenCompareWith(selectedStyle.id)}
                  className="inline-flex items-center gap-1.5 rounded-md border border-[#111111] bg-white px-3 py-2 text-xs font-semibold text-[#111111] hover:bg-[#111111] hover:text-white transition-colors whitespace-nowrap cursor-pointer"
                >
                  <Columns2 className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Comparer</span>
                </button>
                <button
                  type="button"
                  aria-label="Fermer la fiche coiffure"
                  onClick={() => setSelectedStyle(null)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#E2D8C8] bg-[#FAF8F4] text-[#111111] hover:bg-[#F5EFE6] cursor-pointer shrink-0"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <EditorialFigure
              assetId={selectedStyle.imageId}
              captionOverride={selectedStyle.caption}
              aspectClass="aspect-[4/3]"
            />

            <div className="rounded-lg border border-[#CFC2AE] bg-[#F5EFE6] p-4 space-y-1">
              <p className="text-[11px] font-mono-tabular font-semibold text-[#7D6340]">
                Repère visuel clé sur la photo
              </p>
              <p className="text-sm font-medium text-[#111111] leading-relaxed">
                {selectedStyle.visualCue}
              </p>
            </div>

            <p className="text-sm leading-relaxed text-[#2E2A25]">
              {selectedStyle.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-[#E2D8C8] pt-5">
              <div className="space-y-2">
                <h3 className="text-xs font-mono-tabular text-[#7D6340] font-semibold">
                  Matériel nécessaire
                </h3>
                <ul className="space-y-1.5 text-sm text-[#2E2A25]">
                  {selectedStyle.materials.map((m) => (
                    <li key={m} className="flex items-start gap-2">
                      <span aria-hidden="true" className="text-[#7D6340] font-bold">·</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-mono-tabular text-[#7D6340] font-semibold">
                  Profil de cheveux adapté
                </h3>
                <p className="font-mono-tabular text-sm font-medium text-[#111111]">
                  Types recommandés : {selectedStyle.suitableHairTypes.join(' · ')}
                </p>
                <p className="text-xs leading-relaxed text-[#5C554B]">
                  {selectedStyle.hairProfileNote}
                </p>
              </div>
            </div>

            <div className="border-t border-[#E2D8C8] pt-5 space-y-2.5">
              <h3 className="text-xs font-mono-tabular text-[#7D6340] font-semibold">
                Protocole de réalisation étape par étape
              </h3>
              <ol className="space-y-2 text-sm text-[#2E2A25] list-decimal list-inside">
                {selectedStyle.steps.map((step, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
