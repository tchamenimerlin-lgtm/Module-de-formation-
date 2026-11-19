import React, { useState } from 'react';
import { Download, Search, ShieldCheck } from 'lucide-react';
import {
  BARBER_TOOLS,
  CLIPPER_VS_TRIMMER_VS_SHAVER,
} from '../data/hairAndTools';
import { BarberTool, ToolCategory } from '../types/academy';
import { filterTools } from '../utils/academyLogic';
import { downloadPracticalSheetPdf } from '../utils/pdfGenerator';
import { EditorialFigure } from './EditorialFigure';

const CATEGORIES: Array<ToolCategory | 'Tous'> = [
  'Tous',
  'Machines',
  'Lames & Ciseaux',
  'Peignes & Brosses',
  'Accessoires & Hygiène',
];

export const ToolsView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ToolCategory | 'Tous'>('Tous');
  const [selectedToolId, setSelectedToolId] = useState<string>(BARBER_TOOLS[0].id);

  const filtered = filterTools(BARBER_TOOLS, query, category);
  const activeTool: BarberTool =
    filtered.find((t) => t.id === selectedToolId) ?? filtered[0] ?? BARBER_TOOLS[0];

  return (
    <div className="mx-auto max-w-[1360px] px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between border-b border-[#E2D8C8] pb-8">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs font-mono-tabular font-medium text-[#7D6340]">
            Chapitre 02 · Encyclopédie du matériel professionnel · 16 fiches pratiques
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#111111]">
            Connaître et entretenir son matériel de barbier
          </h1>
          <p className="text-sm sm:text-base leading-relaxed text-[#5C554B]">
            Chaque outil possède sa fiche complète : rôle exact, prise en main ergonomique,
            geste technique, erreurs à éviter et protocole de désinfection.
          </p>
        </div>

        <button
          type="button"
          onClick={() => downloadPracticalSheetPdf('materiel')}
          className="inline-flex items-center gap-2 rounded-md bg-[#111111] px-5 py-3 text-xs font-semibold text-white hover:bg-[#292622] transition-colors whitespace-nowrap shrink-0 self-start lg:self-auto cursor-pointer"
        >
          <Download className="h-4 w-4 text-[#E8DEC8]" aria-hidden="true" />
          <span>Télécharger la fiche Matériel (PDF)</span>
        </button>
      </div>

      {/* Clipper vs Trimmer vs Shaver Essential Comparison */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-2xl font-semibold text-[#111111]">
            Différence fondamentale : Clipper, Trimmer et Shaver
          </h2>
          <span className="text-xs font-mono-tabular font-medium text-[#7D6340]">
            Les 3 machines complémentaires
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#E2D8C8] bg-white">
          <table className="w-full min-w-[720px] text-left text-xs">
            <thead>
              <tr className="border-b border-[#E2D8C8] bg-[#F5EFE6] font-mono-tabular text-[#111111]">
                <th className="px-4 py-3.5 font-semibold">Machine</th>
                <th className="px-4 py-3.5 font-semibold">Conception de lame</th>
                <th className="px-4 py-3.5 font-semibold">Plage de coupe</th>
                <th className="px-4 py-3.5 font-semibold">Rôle principal</th>
                <th className="px-4 py-3.5 font-semibold">À ne jamais faire</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2D8C8]">
              {CLIPPER_VS_TRIMMER_VS_SHAVER.map((item) => (
                <tr key={item.tool} className="align-top hover:bg-[#FAF8F4]">
                  <td className="px-4 py-3.5 font-semibold text-[#111111] whitespace-nowrap">
                    {item.tool}
                  </td>
                  <td className="px-4 py-3.5 text-[#2E2A25] leading-relaxed">{item.bladeDesign}</td>
                  <td className="px-4 py-3.5 font-mono-tabular font-medium text-[#7D6340] whitespace-nowrap">
                    {item.cutRange}
                  </td>
                  <td className="px-4 py-3.5 text-[#2E2A25] leading-relaxed">{item.primaryRole}</td>
                  <td className="px-4 py-3.5 text-[#991B1B] leading-relaxed">{item.neverUseFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Search & Category Filter */}
      <section className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7D6340]"
              aria-hidden="true"
            />
            <input
              type="search"
              aria-label="Rechercher un outil"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un outil (Clipper, Peigne afro, Shaver...)"
              className="w-full min-h-[42px] rounded-lg border border-[#E2D8C8] bg-[#FAF8F4] pl-10 pr-4 py-2 text-sm text-[#111111] placeholder:text-[#787066]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1 rounded-lg bg-[#F5EFE6] p-1 border border-[#E2D8C8]">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  category === cat
                    ? 'bg-[#111111] text-white font-semibold'
                    : 'text-[#5C554B] hover:text-[#111111]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Two-Zone Tool Selector + Detailed Practical Sheet */}
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-[#E2D8C8] bg-[#FAF8F4] p-10 text-center space-y-3">
            <p className="text-sm text-[#2E2A25]">Aucun outil trouvé pour cette recherche.</p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setCategory('Tous');
              }}
              className="rounded-md bg-[#111111] px-4 py-2 text-xs font-semibold text-white hover:bg-[#292622] cursor-pointer"
            >
              Afficher les 16 outils
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Index List of 16 Tools */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
              {filtered.map((tool) => {
                const isSelected = tool.id === activeTool.id;
                return (
                  <button
                    key={tool.id}
                    type="button"
                    onClick={() => setSelectedToolId(tool.id)}
                    aria-pressed={isSelected}
                    className={`rounded-lg border px-4 py-3 text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-[#111111] bg-[#111111] text-white'
                        : 'border-[#E2D8C8] bg-[#FAF8F4] text-[#111111] hover:border-[#CFC2AE] hover:bg-[#F5EFE6]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 text-[11px] font-mono-tabular">
                      <span className={isSelected ? 'text-[#E8DEC8]' : 'text-[#7D6340]'}>
                        #{String(tool.number).padStart(2, '0')} · {tool.category}
                      </span>
                      <span className={isSelected ? 'text-[#D6CBB8]' : 'text-[#5C554B]'}>
                        {tool.englishName}
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-semibold">{tool.name}</p>
                  </button>
                );
              })}
            </div>

            {/* Right Active Practical Sheet */}
            <div className="lg:col-span-7 lg:sticky lg:top-24 rounded-xl border border-[#E2D8C8] bg-[#FAF8F4] p-6 sm:p-7 space-y-6">
              <div className="border-b border-[#E2D8C8] pb-4">
                <p className="text-xs font-mono-tabular font-medium text-[#7D6340]">
                  Fiche pratique outil #{String(activeTool.number).padStart(2, '0')} · {activeTool.category} · EN : {activeTool.englishName}
                </p>
                <h3 className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-[#111111]">
                  {activeTool.name}
                </h3>
              </div>

              <EditorialFigure
                assetId={activeTool.imageId}
                captionOverride={activeTool.caption}
                aspectClass="aspect-[16/9]"
              />

              <dl className="space-y-5 text-sm leading-relaxed">
                <div>
                  <dt className="text-xs font-mono-tabular text-[#7D6340] font-semibold">
                    Utilité professionnelle
                  </dt>
                  <dd className="mt-1 text-[#2E2A25]">{activeTool.purpose}</dd>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 border-t border-[#E2D8C8] pt-4">
                  <div>
                    <dt className="text-xs font-mono-tabular text-[#7D6340] font-semibold">
                      Comment le tenir
                    </dt>
                    <dd className="mt-1 text-[#2E2A25]">{activeTool.howToHold}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-mono-tabular text-[#7D6340] font-semibold">
                      Comment l’utiliser
                    </dt>
                    <dd className="mt-1 text-[#2E2A25]">{activeTool.howToUse}</dd>
                  </div>
                </div>

                <div className="border-t border-[#E2D8C8] pt-4">
                  <dt className="text-xs font-mono-tabular text-[#991B1B] font-semibold">
                    Erreurs à éviter
                  </dt>
                  <dd className="mt-2 space-y-1.5 text-[#2E2A25]">
                    {activeTool.mistakesToAvoid.map((m, idx) => (
                      <p key={idx} className="flex items-start gap-2">
                        <span aria-hidden="true" className="text-[#991B1B] font-bold">×</span>
                        <span>{m}</span>
                      </p>
                    ))}
                  </dd>
                </div>

                <div className="rounded-lg border border-[#BBF7D0] bg-[#ECFDF5] p-4">
                  <dt className="flex items-center gap-2 text-xs font-mono-tabular text-[#166534] font-semibold">
                    <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                    <span>Entretien et désinfection obligatoire</span>
                  </dt>
                  <dd className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#14532D]">
                    {activeTool.maintenanceAndDisinfection}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
