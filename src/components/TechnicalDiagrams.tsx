import React, { useState } from 'react';
import { FADE_TYPES } from '../data/fadesAndStyles';
import { GUARD_GUIDES } from '../data/hairAndTools';
import { DiagramKind, FadeType, LeverPosition } from '../types/academy';
import {
  computeEffectiveCutLengthMm,
  LEVER_LABELS_FR,
} from '../utils/academyLogic';

interface TechnicalDiagramProps {
  kind: DiagramKind;
  selectedFadeId?: string;
  onSelectFade?: (id: string) => void;
}

const FACE_SHAPES = [
  {
    id: 'ovale',
    label: 'Ovale',
    advice: 'Proportions idéales : tous les fades (Low, Mid, High, Taper) et toutes les hauteurs de dessus fonctionnent.',
    avoid: 'Rien de rédhibitoire ; veiller simplement à garder une ligne frontale naturelle.',
    rx: 46,
    ry: 62,
    jawWidth: 34,
  },
  {
    id: 'rond',
    label: 'Rond',
    advice: 'Privilégier un High Fade ou Mid Skin Fade avec du volume vertical (Afro structuré, Sponge Twists) pour allonger le visage.',
    avoid: 'Éviter un Afro très large sur les côtés qui accentuerait la rondeur.',
    rx: 56,
    ry: 56,
    jawWidth: 46,
  },
  {
    id: 'carre',
    label: 'Carré',
    advice: 'Mid Fade ou Low Taper bien fondu pour harmoniser la mâchoire forte tout en valorisant des contours nets.',
    avoid: 'Éviter les côtés trop épais qui élargissent encore l’angle mandibulaire.',
    rx: 50,
    ry: 58,
    jawWidth: 48,
  },
  {
    id: 'allonge',
    label: 'Allongé',
    advice: 'Low Fade, Taper Fade, Caesar Cut ou Waves 360 : conserver du volume latéral et limiter la hauteur excessive au sommet.',
    avoid: 'Éviter un High Skin Fade associé à un très haut plateau vertical.',
    rx: 40,
    ry: 68,
    jawWidth: 34,
  },
  {
    id: 'losange',
    label: 'Losange',
    advice: 'Low Fade ou Mid Drop Fade conservant de la densité au niveau des tempes pour équilibrer les pommettes saillantes.',
    avoid: 'Éviter de trop dégarnir la zone temporale haute.',
    rx: 52,
    ry: 62,
    jawWidth: 28,
  },
] as const;

export const FaceShapeDiagram: React.FC = () => {
  const [shapeId, setShapeId] = useState<(typeof FACE_SHAPES)[number]['id']>('ovale');
  const active = FACE_SHAPES.find((s) => s.id === shapeId) ?? FACE_SHAPES[0];

  return (
    <div className="rounded-xl border border-[#E2D8C8] bg-[#FAF8F4] p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[#E2D8C8] pb-4">
        <div>
          <p className="text-xs font-mono-tabular text-[#7D6340]">Schéma interactif 1.1</p>
          <h4 className="font-display text-lg font-semibold text-[#111111]">
            Analyse morphologique du visage et choix de coupe
          </h4>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {FACE_SHAPES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setShapeId(s.id)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                shapeId === s.id
                  ? 'bg-[#111111] text-white font-semibold'
                  : 'border border-[#E2D8C8] bg-white text-[#2E2A25] hover:border-[#111111] hover:text-[#111111]'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-12 items-center">
        <div className="md:col-span-5 flex justify-center rounded-lg bg-white border border-[#E2D8C8] p-4">
          <svg viewBox="0 0 220 200" className="w-full max-w-[230px]" role="img" aria-label={`Schéma visage ${active.label}`}>
            {/* Reference axes */}
            <line x1="110" y1="16" x2="110" y2="182" stroke="#B09876" strokeOpacity="0.6" strokeDasharray="3 3" />
            <line x1="34" y1="100" x2="186" y2="100" stroke="#B09876" strokeOpacity="0.6" strokeDasharray="3 3" />

            {/* Stylized hair silhouette guide */}
            <path
              d={`M ${110 - active.rx} 88 Q ${110 - active.rx - 4} 30 110 ${shapeId === 'rond' ? 22 : shapeId === 'allonge' ? 38 : 30} Q ${110 + active.rx + 4} 30 ${110 + active.rx} 88`}
              fill="#E8DEC8"
              fillOpacity="0.85"
              stroke="#7D6340"
              strokeWidth="1.6"
            />

            {/* Face contour */}
            {shapeId === 'carre' ? (
              <rect
                x={110 - active.rx}
                y={46}
                width={active.rx * 2}
                height={118}
                rx="18"
                fill="#FAF8F4"
                stroke="#111111"
                strokeWidth="1.8"
              />
            ) : shapeId === 'losange' ? (
              <polygon
                points="110,40 162,100 132,160 110,170 88,160 58,100"
                fill="#FAF8F4"
                stroke="#111111"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            ) : (
              <ellipse
                cx="110"
                cy="106"
                rx={active.rx}
                ry={active.ry}
                fill="#FAF8F4"
                stroke="#111111"
                strokeWidth="1.8"
              />
            )}

            {/* Facial horizontal proportion lines */}
            <line x1={110 - active.rx + 8} y1="90" x2={110 + active.rx - 8} y2="90" stroke="#7D6340" strokeWidth="1" strokeOpacity="0.8" />
            <line x1={110 - active.jawWidth} y1="142" x2={110 + active.jawWidth} y2="142" stroke="#7D6340" strokeWidth="1" strokeOpacity="0.8" />

            <text x="110" y="194" textAnchor="middle" fill="#111111" fontSize="10" fontWeight="600" fontFamily="IBM Plex Mono, monospace">
              Morphologie : {active.label}
            </text>
          </svg>
        </div>

        <div className="md:col-span-7 space-y-4">
          <div>
            <p className="text-xs font-semibold text-[#7D6340]">Recommandation de coupe</p>
            <p className="mt-1 text-sm leading-relaxed text-[#111111]">{active.advice}</p>
          </div>
          <div className="border-t border-[#E2D8C8] pt-3">
            <p className="text-xs font-semibold text-[#5C554B]">Point de vigilance</p>
            <p className="mt-1 text-sm leading-relaxed text-[#2E2A25]">{active.avoid}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ClipperLeverSimulator: React.FC = () => {
  const [guardIndex, setGuardIndex] = useState(2); // #1 default
  const [lever, setLever] = useState<LeverPosition>('closed');

  const activeGuard = GUARD_GUIDES[guardIndex];
  const effectiveMm = computeEffectiveCutLengthMm(activeGuard, lever);

  const leverPositions: LeverPosition[] = [
    'closed',
    'quarter',
    'half',
    'three-quarter',
    'open',
  ];

  const leverOffsetPx: Record<LeverPosition, number> = {
    closed: 0,
    quarter: 4,
    half: 8,
    'three-quarter': 12,
    open: 16,
  };

  return (
    <div className="rounded-xl border border-[#E2D8C8] bg-[#FAF8F4] p-5 sm:p-6">
      <div className="border-b border-[#E2D8C8] pb-4">
        <p className="text-xs font-mono-tabular text-[#7D6340]">Simulateur interactif 3.1</p>
        <h4 className="font-display text-xl font-semibold text-[#111111]">
          Calculateur de Sabots, Levier & Mouvement en C (C-Motion)
        </h4>
        <p className="mt-1 text-sm text-[#5C554B]">
          Sélectionnez un sabot et actionnez le levier pour visualiser la longueur exacte de coupe en millimètres et le recul de la lame mobile.
        </p>
      </div>

      {/* Guard selector */}
      <div className="mt-5">
        <p className="text-xs font-medium text-[#5C554B] mb-2">
          1. Choisissez un guide de tondeuse (Sabot) :
        </p>
        <div className="flex flex-wrap gap-1.5">
          {GUARD_GUIDES.map((g, idx) => (
            <button
              key={g.code}
              type="button"
              onClick={() => setGuardIndex(idx)}
              className={`rounded-md px-3 py-2 text-xs font-mono-tabular font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                idx === guardIndex
                  ? 'bg-[#111111] text-white'
                  : 'border border-[#E2D8C8] bg-white text-[#2E2A25] hover:border-[#111111] hover:text-[#111111]'
              }`}
            >
              {g.code === '0' ? '0 (Sans sabot)' : `#${g.code}`}
            </button>
          ))}
        </div>
      </div>

      {/* Lever selector */}
      <div className="mt-5">
        <p className="text-xs font-medium text-[#5C554B] mb-2">
          2. Réglez la position du levier latéral :
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
          {leverPositions.map((pos) => (
            <button
              key={pos}
              type="button"
              onClick={() => setLever(pos)}
              className={`rounded-md px-2.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                lever === pos
                  ? 'bg-[#111111] text-white font-semibold'
                  : 'border border-[#E2D8C8] bg-white text-[#2E2A25] hover:border-[#111111] hover:text-[#111111]'
              }`}
            >
              {LEVER_LABELS_FR[pos]}
            </button>
          ))}
        </div>
      </div>

      {/* Live readout + Blade & C-Motion SVG */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-6 rounded-lg bg-white border border-[#E2D8C8] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <p className="text-xs text-[#5C554B]">Longueur résultante estimée</p>
                <p
                  data-testid="effective-cut-mm"
                  className="mt-1 font-mono-tabular text-3xl sm:text-4xl font-semibold text-[#111111]"
                >
                  {effectiveMm.toFixed(2).replace('.', ',')} mm
                </p>
              </div>
              <div className="text-right font-mono-tabular text-xs text-[#5C554B]">
                <p>{activeGuard.label}</p>
                <p className="text-[#7D6340] font-semibold mt-0.5">{activeGuard.inches}</p>
              </div>
            </div>

            {/* Proportional hair length ruler */}
            <div className="mt-5">
              <div className="flex justify-between text-[11px] font-mono-tabular text-[#5C554B] mb-1">
                <span>0 mm (Peau)</span>
                <span>13 mm (#4)</span>
                <span>26 mm (#8+)</span>
              </div>
              <div className="h-3 w-full rounded bg-[#ECE3D5] overflow-hidden">
                <div
                  className="h-full bg-[#111111] transition-all duration-200"
                  style={{ width: `${Math.min(100, (effectiveMm / 26) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-2 border-t border-[#E2D8C8] pt-4 text-sm">
            <p className="text-[#111111]">
              <span className="text-[#7D6340] font-semibold">Rôle dans le fade : </span>
              {activeGuard.fadeRole}
            </p>
            <p className="text-[#5C554B]">
              <span className="text-[#111111] font-semibold">Usage principal : </span>
              {activeGuard.primaryUse}
            </p>
          </div>
        </div>

        {/* SVG Blade mechanics + C-Motion */}
        <div className="lg:col-span-6 rounded-lg bg-white border border-[#E2D8C8] p-5 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div>
            <p className="text-xs font-mono-tabular font-semibold text-[#7D6340] mb-3">
              Mécanique de la lame
            </p>
            <svg viewBox="0 0 220 140" className="w-full" role="img" aria-label="Position de la lame selon le levier">
              <text x="14" y="22" fill="#5C554B" fontSize="10">
                {lever === 'closed'
                  ? 'Levier en haut (fermé)'
                  : lever === 'open'
                    ? 'Levier en bas (ouvert)'
                    : 'Position intermédiaire'}
              </text>
              <text x="14" y="40" fill="#7D6340" fontSize="10.5" fontWeight="600" fontFamily="IBM Plex Mono, monospace">
                Recul lame : +{(effectiveMm - activeGuard.mmClosed).toFixed(2)} mm
              </text>

              {/* Moving top cutter blade shifting back when lever opens */}
              <rect
                x={34 + leverOffsetPx[lever] * 1.4}
                y="68"
                width="116"
                height="13"
                rx="2"
                fill="#111111"
              />
              {/* Fixed bottom blade */}
              <path d="M 24 85 L 154 85 L 168 96 L 24 96 Z" fill="#9E825C" />
              {/* Guard comb silhouette if guard > 0 */}
              {activeGuard.numericValue > 0 && (
                <path
                  d="M 18 98 L 176 98 L 176 91 L 34 91 L 22 98 Z"
                  fill="none"
                  stroke="#111111"
                  strokeWidth="1.4"
                  strokeDasharray="4 2"
                />
              )}

              {/* Scalp skin surface */}
              <rect x="12" y="106" width="196" height="18" rx="3" fill="#F5EFE6" stroke="#CFC2AE" />
              <text x="110" y="118" textAnchor="middle" fill="#111111" fontSize="9.5" fontFamily="IBM Plex Mono, monospace">
                Cuir chevelu
              </text>
            </svg>
          </div>

          <div>
            <p className="text-xs font-mono-tabular font-semibold text-[#7D6340] mb-3">
              Trajectoire C-Motion
            </p>
            <svg viewBox="0 0 220 140" className="w-full" role="img" aria-label="Schéma du mouvement en C et du flick-out">
              {/* Head vertical profile */}
              <path d="M 48 128 C 48 86, 52 50, 82 22" fill="none" stroke="#5C554B" strokeWidth="2.2" />
              <text x="14" y="118" fill="#5C554B" fontSize="9.5">Crâne</text>

              {/* Flat trap warning dashed line */}
              <line x1="62" y1="62" x2="62" y2="18" stroke="#B91C1C" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="72" y="20" fill="#991B1B" fontSize="9.5" fontWeight="600">À plat = ligne dure</text>

              {/* C-Motion scoop arc */}
              <path
                d="M 70 112 Q 52 84 62 62 Q 78 44 128 34"
                fill="none"
                stroke="#111111"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <polygon points="134,33 121,29 124,40" fill="#111111" />

              <text x="108" y="62" fill="#111111" fontSize="10" fontWeight="600" fontFamily="IBM Plex Mono, monospace">
                Sortie en C
              </text>
              <text x="108" y="76" fill="#5C554B" fontSize="9">
                (Flick-out doux)
              </text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FadeZonesBlueprint: React.FC<{
  selectedFadeId?: string;
  onSelectFade?: (id: string) => void;
}> = ({ selectedFadeId, onSelectFade }) => {
  const [internalId, setInternalId] = useState(FADE_TYPES[1].id); // Mid fade default
  const activeId = selectedFadeId ?? internalId;
  const activeFade: FadeType = FADE_TYPES.find((f) => f.id === activeId) ?? FADE_TYPES[0];

  const handleChoose = (id: string) => {
    setInternalId(id);
    onSelectFade?.(id);
  };

  // Profile line coordinates for SVG head side view (280x235)
  const getFadeCurves = (profile: FadeType['svgProfile']) => {
    switch (profile) {
      case 'low':
        return {
          base: 'M 72 152 Q 112 150 144 156 Q 178 164 214 176',
          mid: 'M 68 134 Q 112 132 146 138 Q 182 146 218 160',
          label: 'Base basse (1 cm au-dessus de l’oreille)',
          hasSkin: false,
        };
      case 'mid':
        return {
          base: 'M 68 122 Q 116 122 154 126 Q 190 132 222 140',
          mid: 'M 66 98 Q 116 98 158 104 Q 194 110 225 120',
          label: 'Base médiane (milieu tempe → milieu occiput)',
          hasSkin: false,
        };
      case 'high':
        return {
          base: 'M 68 92 Q 118 92 162 96 Q 196 100 226 108',
          mid: 'M 70 72 Q 120 72 164 76 Q 198 80 224 90',
          label: 'Base haute (sous la crête pariétale)',
          hasSkin: true,
        };
      case 'skin':
        return {
          base: 'M 68 124 Q 116 124 156 128 Q 192 134 222 144',
          mid: 'M 66 96 Q 116 96 158 102 Q 194 108 225 120',
          label: 'Base Shaver 0,0 mm (5–8 mm sous ligne Trimmer)',
          hasSkin: true,
        };
      case 'bald':
        return {
          base: 'M 68 102 Q 118 102 160 106 Q 196 112 226 122',
          mid: 'M 70 78 Q 120 78 164 82 Q 198 88 225 100',
          label: 'Large zone rasée à nu (peau lisse 0,0 mm)',
          hasSkin: true,
        };
      case 'taper':
        return {
          base: 'M 66 136 L 94 136 M 184 182 L 214 182',
          mid: 'M 66 116 L 98 118 M 176 164 L 216 164',
          label: 'Zones isolées : tempe (patte) + base de nuque uniquement',
          hasSkin: false,
        };
      case 'drop':
        return {
          base: 'M 68 118 Q 118 118 150 138 Q 182 164 214 186',
          mid: 'M 66 96 Q 120 96 156 116 Q 190 142 220 166',
          label: 'Courbe plongeante sous la bosse occipitale',
          hasSkin: true,
        };
      case 'burst':
        return {
          base: 'M 86 154 C 86 106, 152 106, 152 168',
          mid: 'M 72 152 C 72 86, 170 86, 170 174',
          label: 'Arc concentrique autour de l’oreille (nuque longue préservée)',
          hasSkin: true,
        };
      case 'temple':
        return {
          base: 'M 66 134 L 96 134',
          mid: 'M 66 112 L 102 114',
          label: 'Micro-dégradé focalisé sur la tempe et le C-Cup',
          hasSkin: false,
        };
      case 'shadow':
        return {
          base: 'M 68 130 Q 116 130 154 134 Q 190 140 222 150',
          mid: 'M 66 104 Q 116 104 158 110 Q 194 116 225 128',
          label: 'Ombre douce 0,5–1,5 mm (jamais de peau à blanc)',
          hasSkin: false,
        };
    }
  };

  const curves = getFadeCurves(activeFade.svgProfile);

  return (
    <div className="rounded-xl border border-[#E2D8C8] bg-[#FAF8F4] p-5 sm:p-6">
      <div className="border-b border-[#E2D8C8] pb-4">
        <p className="text-xs font-mono-tabular text-[#7D6340]">Plan technique interactif 4.1</p>
        <h4 className="font-display text-xl font-semibold text-[#111111]">
          Schéma des zones crâniennes des 10 types de Fade
        </h4>
      </div>

      {/* Fade Selector Tabs */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {FADE_TYPES.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => handleChoose(f.id)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              f.id === activeFade.id
                ? 'bg-[#111111] text-white font-semibold'
                : 'border border-[#E2D8C8] bg-white text-[#2E2A25] hover:border-[#111111] hover:text-[#111111]'
            }`}
          >
            {f.number}. {f.name}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Profile Head SVG */}
        <div className="lg:col-span-5 rounded-lg bg-white border border-[#E2D8C8] p-4">
          <svg
            viewBox="0 0 280 235"
            className="w-full max-w-[300px] mx-auto"
            role="img"
            aria-label={`Schéma des zones de coupe pour ${activeFade.name}`}
          >
            {/* Anatomical reference dotted lines */}
            <line x1="30" y1="74" x2="250" y2="74" stroke="#B09876" strokeWidth="0.9" strokeDasharray="2 3" />
            <text x="252" y="71" fill="#5C554B" fontSize="7.5" textAnchor="end">Crête pariétale</text>

            <line x1="30" y1="146" x2="250" y2="146" stroke="#B09876" strokeWidth="0.9" strokeDasharray="2 3" />
            <text x="252" y="143" fill="#5C554B" fontSize="7.5" textAnchor="end">Os occipital</text>

            {/* Head side silhouette (facing left) */}
            <path
              d="M 74 52 C 95 26, 175 24, 212 58 C 234 80, 236 122, 222 154 C 214 172, 212 188, 214 206 L 146 212 L 138 192 C 110 198, 76 196, 68 176 L 62 158 L 52 146 L 63 134 L 62 116 L 66 86 Z"
              fill="#FAF8F4"
              stroke="#111111"
              strokeWidth="1.6"
            />

            {/* Afro hair crown volume */}
            <path
              d="M 67 84 C 66 48, 96 22, 148 22 C 194 22, 228 48, 230 96 C 230 124, 222 154, 214 184 L 144 160 C 122 140, 108 134, 96 142 L 70 132 Z"
              fill="#E8DEC8"
              fillOpacity="0.9"
            />

            {/* Ear outline */}
            <path
              d="M 118 134 C 128 124, 140 132, 136 148 C 134 158, 124 162, 118 154"
              fill="#FAF8F4"
              stroke="#5C554B"
              strokeWidth="1.4"
            />

            {/* Transition upper guideline */}
            <path
              d={curves.mid}
              fill="none"
              stroke="#7D6340"
              strokeWidth="1.9"
              strokeDasharray="4 3"
              strokeLinecap="round"
            />

            {/* Base guideline (0 / Trimmer) */}
            <path
              d={curves.base}
              fill="none"
              stroke="#111111"
              strokeWidth="2.8"
              strokeLinecap="round"
            />

            {/* Legend at bottom */}
            <line x1="20" y1="222" x2="36" y2="222" stroke="#111111" strokeWidth="2.8" />
            <text x="41" y="225" fill="#111111" fontSize="8" fontWeight="600">1re ligne (Base 0)</text>

            <line x1="138" y1="222" x2="154" y2="222" stroke="#7D6340" strokeWidth="1.9" strokeDasharray="4 3" />
            <text x="159" y="225" fill="#5C554B" fontSize="8">Zone de transition</text>
          </svg>
        </div>

        {/* Technical specs for selected fade */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <h5 className="font-display text-2xl font-semibold text-[#111111]">
                {activeFade.name}
              </h5>
              <p className="text-xs font-medium text-[#7D6340] mt-0.5">
                {activeFade.frenchSubtitle} · Niveau {activeFade.difficulty}
              </p>
            </div>
            <span className="font-mono-tabular text-xs text-[#5C554B]">
              {curves.hasSkin ? 'Finition peau à blanc possible' : 'Finition ombrée ou progressive'}
            </span>
          </div>

          <p className="text-sm leading-relaxed text-[#2E2A25]">{activeFade.principle}</p>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs border-t border-[#E2D8C8] pt-3">
            <div>
              <dt className="text-[#5C554B] font-medium">Position de la 1re ligne</dt>
              <dd className="mt-1 text-[#111111] leading-relaxed">{activeFade.firstLinePosition}</dd>
            </div>
            <div>
              <dt className="text-[#5C554B] font-medium">Sabots recommandés</dt>
              <dd className="mt-1 font-mono-tabular font-semibold text-[#7D6340]">{activeFade.guardsUsed.join(' · ')}</dd>
            </div>
            <div>
              <dt className="text-[#5C554B] font-medium">Réglage du levier</dt>
              <dd className="mt-1 text-[#2E2A25] leading-relaxed">{activeFade.leverSettings}</dd>
            </div>
            <div>
              <dt className="text-[#5C554B] font-medium">Élimination des lignes</dt>
              <dd className="mt-1 text-[#2E2A25] leading-relaxed">{activeFade.lineRemovalMethod}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export const LineUpGeometryDiagram: React.FC = () => {
  const [showPushBack, setShowPushBack] = useState(false);

  return (
    <div className="rounded-xl border border-[#E2D8C8] bg-[#FAF8F4] p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[#E2D8C8] pb-4">
        <div>
          <p className="text-xs font-mono-tabular text-[#7D6340]">Schéma géométrique 7.1</p>
          <h4 className="font-display text-lg font-semibold text-[#111111]">
            Architecture du Line-Up : Contours naturels vs erreur du Push Back
          </h4>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setShowPushBack(false)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              !showPushBack
                ? 'bg-[#111111] text-white font-semibold'
                : 'border border-[#E2D8C8] bg-white text-[#2E2A25] hover:border-[#111111]'
            }`}
          >
            Tracé naturel correct
          </button>
          <button
            type="button"
            onClick={() => setShowPushBack(true)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              showPushBack
                ? 'bg-[#991B1B] text-white font-semibold'
                : 'border border-[#E2D8C8] bg-white text-[#2E2A25] hover:border-[#991B1B]'
            }`}
          >
            Erreur : Push Back
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-6 rounded-lg bg-white border border-[#E2D8C8] p-4">
          <svg viewBox="0 0 260 190" className="w-full" role="img" aria-label="Schéma des zones du Line-Up frontal">
            {/* Forehead & temple front view */}
            <path
              d="M 54 176 L 54 74 C 54 34, 86 18, 130 18 C 174 18, 206 34, 206 74 L 206 176"
              fill="#FAF8F4"
              stroke="#5C554B"
              strokeWidth="1.5"
            />
            {/* Hair region */}
            <path
              d={
                showPushBack
                  ? 'M 54 118 L 62 118 C 66 96, 70 84, 72 68 L 72 52 L 188 52 L 188 68 C 190 84, 194 96, 198 118 L 206 118 L 206 74 C 206 34, 174 18, 130 18 C 86 18, 54 34, 54 74 Z'
                  : 'M 54 118 L 62 118 C 68 96, 72 88, 72 74 L 188 74 C 188 88, 192 96, 198 118 L 206 118 L 206 74 C 206 34, 174 18, 130 18 C 86 18, 54 34, 54 74 Z'
              }
              fill="#E8DEC8"
            />

            {/* Natural hairline reference dashed */}
            <line x1="72" y1="74" x2="188" y2="74" stroke="#7D6340" strokeWidth="1.3" strokeDasharray="3 3" />

            {/* Active Front Line + Vertical Bars + C-Cups */}
            <path
              d={
                showPushBack
                  ? 'M 62 118 C 68 96, 72 84, 72 52 L 188 52 C 188 84, 192 96, 198 118'
                  : 'M 62 118 C 68 96, 72 88, 72 74 L 188 74 C 188 88, 192 96, 198 118'
              }
              fill="none"
              stroke={showPushBack ? '#B91C1C' : '#111111'}
              strokeWidth="2.8"
              strokeLinecap="round"
            />

            {/* Center nose axis */}
            <line x1="130" y1="64" x2="130" y2="165" stroke="#9E825C" strokeWidth="1" strokeDasharray="2 3" />
            <circle cx="130" cy={showPushBack ? 52 : 74} r="3.5" fill={showPushBack ? '#B91C1C' : '#111111'} />

            {/* Labels */}
            <text
              x="130"
              y="39"
              textAnchor="middle"
              fill={showPushBack ? '#991B1B' : '#111111'}
              fontSize="8.5"
              fontWeight="600"
              fontFamily="IBM Plex Mono, monospace"
            >
              {showPushBack ? 'ERREUR : Reculé de 12 mm !' : '1. Centre du Front Line'}
            </text>
            <text x="48" y="88" textAnchor="end" fill="#2E2A25" fontSize="7.5">Vertical Bar</text>
            <text x="212" y="108" textAnchor="start" fill="#2E2A25" fontSize="7.5">C-Cup</text>
            <text x="130" y="176" textAnchor="middle" fill="#5C554B" fontSize="8">
              Axe nasal (repère de symétrie)
            </text>
          </svg>
        </div>

        <div className="md:col-span-6 space-y-3 text-sm">
          {!showPushBack ? (
            <>
              <p className="font-semibold text-[#111111]">Protocole conforme Académie</p>
              <p className="text-[#2E2A25] leading-relaxed">
                Le tracé débute au point central aligné sur l’arête du nez et s’appuie strictement sur l’implantation naturelle (1 à 2 mm de duvet nettoyé maximum). Les Vertical Bars restent droites et les C-Cups épousent la courbe naturelle de la tempe.
              </p>
              <p className="text-xs text-[#5C554B]">
                Résultat : repousse discrète et élégante pendant 10 à 14 jours sans ombre grise sur le front.
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold text-[#991B1B]">Danger critique : le Push Back</p>
              <p className="text-[#2E2A25] leading-relaxed">
                Remonter la ligne frontale de 10 à 15 mm dans les cheveux denses élargit artificiellement le front. Dès 72 heures, une bande de repousse foncée apparaît sous la ligne, obligeant le client à reculer sa ligne indéfiniment.
              </p>
              <p className="text-xs font-medium text-[#991B1B]">
                Règle absolue : si un angle temporal est naturellement plus haut, adoucir l’angle sans jamais remonter le centre du front.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const GenericTechnicalBlueprint: React.FC<{ kind: DiagramKind }> = ({ kind }) => {
  if (kind === 'tool-comparison') {
    return (
      <div className="rounded-xl border border-[#E2D8C8] bg-[#FAF8F4] p-5 sm:p-6">
        <p className="text-xs font-mono-tabular text-[#7D6340]">Schéma technique 2.1</p>
        <h4 className="font-display text-lg font-semibold text-[#111111] mb-4">
          Plages de coupe comparées : Shaver · Trimmer · Clipper
        </h4>
        <div className="space-y-4">
          {[
            { name: 'Shaver (Grilles)', range: '0,0 mm', pct: 4, note: 'Peau totalement lisse (fin Skin/Bald Fade)' },
            { name: 'Trimmer (T-Blade)', range: '0,1 – 0,4 mm', pct: 12, note: 'Ligne zéro initiale, contours, nuque et barbe' },
            { name: 'Clipper sans sabot', range: '0,5 – 1,5 mm', pct: 24, note: 'Première bande du dégradé (levier fermé → ouvert)' },
            { name: 'Clipper + sabots #0.5 à #8', range: '1,5 – 25 mm', pct: 100, note: 'Transitions de fade, Waves, Caesar et Afro court' },
          ].map((row) => (
            <div key={row.name}>
              <div className="flex flex-wrap justify-between gap-2 text-xs">
                <span className="font-semibold text-[#111111]">{row.name}</span>
                <span className="font-mono-tabular font-semibold text-[#7D6340]">{row.range}</span>
              </div>
              <div className="mt-1.5 h-2.5 w-full rounded bg-[#ECE3D5] overflow-hidden">
                <div className="h-full bg-[#111111]" style={{ width: `${row.pct}%` }} />
              </div>
              <p className="mt-1 text-xs text-[#5C554B]">{row.note}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (kind === 'head-sectioning') {
    return (
      <div className="rounded-xl border border-[#E2D8C8] bg-[#FAF8F4] p-5 sm:p-6">
        <p className="text-xs font-mono-tabular text-[#7D6340]">Schéma anatomique 6.1</p>
        <h4 className="font-display text-lg font-semibold text-[#111111] mb-4">
          Cartographie des 5 zones crâniennes de coupe
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {[
            { num: 'Z1', name: 'Plateau supérieur', detail: 'Longueur principale (Afro, Twists, Waves, Crop).' },
            { num: 'Z2', name: 'Crête pariétale', detail: 'Charnière critique de connexion (Clipper Over Comb).' },
            { num: 'Z3', name: 'Tempes & C-Cup', detail: 'Symétrie frontale et départ des lignes du fade.' },
            { num: 'Z4', name: 'Os occipital', detail: 'Bosse arrière guidant la hauteur Mid / Drop.' },
            { num: 'Z5', name: 'Nuque basse', detail: 'Zone sensible à pousse souvent inversée (taper / finition).' },
          ].map((z) => (
            <div key={z.num} className="rounded-lg bg-white border border-[#E2D8C8] p-3.5">
              <p className="font-mono-tabular text-xs font-semibold text-[#7D6340]">{z.num}</p>
              <p className="mt-1 text-sm font-semibold text-[#111111]">{z.name}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-[#5C554B]">{z.detail}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (kind === 'hygiene-cycle') {
    return (
      <div className="rounded-xl border border-[#E2D8C8] bg-[#FAF8F4] p-5 sm:p-6">
        <p className="text-xs font-mono-tabular text-[#7D6340]">Protocole sanitaire 8.1</p>
        <h4 className="font-display text-lg font-semibold text-[#111111] mb-4">
          Cycle obligatoire des 5 étapes entre deux clients (≤ 3 min)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {[
            { step: '01', title: 'Lame → DASRI', text: 'Éjection immédiate de la demi-lame dans le collecteur rigide.' },
            { step: '02', title: 'Nettoyage à sec', text: 'Brossage complet des dents de tondeuses et lavage savonneux des peignes.' },
            { step: '03', title: 'Désinfection', text: 'Spray 5-en-1 sur machines + immersion 10 min Barbicide pour peignes/sabots.' },
            { step: '04', title: 'Lubrification', text: 'Essuyage propre puis 3 gouttes d’huile sur les lames en fonctionnement.' },
            { step: '05', title: 'Poste vierge', text: 'Balayage sol, désinfection fauteuil, serviette propre et bande de cou neuve.' },
          ].map((s) => (
            <div key={s.step} className="rounded-lg bg-white border border-[#E2D8C8] p-3.5">
              <p className="font-mono-tabular text-xs font-semibold text-[#7D6340]">Étape {s.step}</p>
              <p className="mt-1 text-sm font-semibold text-[#111111]">{s.title}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-[#5C554B]">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (kind === 'style-proportions') {
    return (
      <div className="rounded-xl border border-[#E2D8C8] bg-[#FAF8F4] p-5 sm:p-6">
        <p className="text-xs font-mono-tabular text-[#7D6340]">Repères de proportions 5.1</p>
        <h4 className="font-display text-lg font-semibold text-[#111111] mb-4">
          Correspondance rapide Longueur sur le dessus ↔ Modèle afro
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {[
            { range: '3 – 6 mm (#1 – #2)', styles: 'Buzz Cut, Waves 360, Caesar court', focus: 'Sens de pousse strict + Line-Up' },
            { range: '10 – 19 mm (#3 – #6)', styles: 'Afro court, Afro Low/Mid/High Fade', focus: 'Peignage afro + équilibre côtés' },
            { range: '25 – 50 mm (Freehand)', styles: 'Sponge Twists, French Crop, Afro structuré', focus: 'Hydratation + sculpture à main levée' },
            { range: '50 mm et +', styles: 'Afro naturel, Twist Out, Dreadlocks Taper', focus: 'Protection racines + isolation pinces' },
          ].map((item) => (
            <div key={item.range} className="rounded-lg bg-white border border-[#E2D8C8] p-3.5">
              <p className="font-mono-tabular text-xs font-semibold text-[#7D6340]">{item.range}</p>
              <p className="mt-1.5 text-sm font-medium text-[#111111]">{item.styles}</p>
              <p className="mt-1.5 text-xs text-[#5C554B]">{item.focus}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // client-journey (Chapter 9)
  return (
    <div className="rounded-xl border border-[#E2D8C8] bg-[#FAF8F4] p-5 sm:p-6">
      <p className="text-xs font-mono-tabular text-[#7D6340]">Parcours professionnel 9.1</p>
      <h4 className="font-display text-lg font-semibold text-[#111111] mb-4">
        Les 5 piliers d’une prestation salon haut de gamme
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {[
          { step: '01', title: 'Accueil', text: 'Ponctualité, regard, installation soignée et poste impeccable.' },
          { step: '02', title: 'Consultation', text: 'Écoute active, diagnostic texture/morphologie et reformulation claire.' },
          { step: '03', title: 'Exécution', text: 'Gestes précis, hygiène visible et contrôle régulier au miroir.' },
          { step: '04', title: 'Validation 360°', text: 'Miroir arrière, ajustement serein si besoin et finition propre.' },
          { step: '05', title: 'Fidélisation', text: 'Conseils entretien, photo portfolio (avec accord) et prochain RDV.' },
        ].map((p) => (
          <div key={p.step} className="rounded-lg bg-white border border-[#E2D8C8] p-3.5">
            <p className="font-mono-tabular text-xs font-semibold text-[#7D6340]">{p.step}</p>
            <p className="mt-1 text-sm font-semibold text-[#111111]">{p.title}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-[#5C554B]">{p.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const TechnicalDiagram: React.FC<TechnicalDiagramProps> = ({
  kind,
  selectedFadeId,
  onSelectFade,
}) => {
  switch (kind) {
    case 'face-shapes':
      return <FaceShapeDiagram />;
    case 'clipper-simulator':
      return <ClipperLeverSimulator />;
    case 'fade-blueprint':
      return <FadeZonesBlueprint selectedFadeId={selectedFadeId} onSelectFade={onSelectFade} />;
    case 'lineup-geometry':
      return <LineUpGeometryDiagram />;
    default:
      return <GenericTechnicalBlueprint kind={kind} />;
  }
};
