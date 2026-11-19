import { AssetItem } from '../types/academy';

export const ASSETS: Record<string, AssetItem> = {
  heroStation: {
    id: 'heroStation',
    src: '/src/assets/images/hero_atelier_barber_1795088726953.jpg',
    alt: 'Maître barbier afro réalisant un dégradé de précision dans un studio lumineux blanc, beige et noir, avec fauteuil noir, serviettes blanches et console en travertin',
    caption: 'Atelier professionnel de l’académie : lumière naturelle, fauteuil noir ergonomique, outils alignés sur pierre beige et serviettes blanches immédiatement accessibles.',
    figureCode: 'Fig. 1.1',
  },
  toolsKit: {
    id: 'toolsKit',
    src: '/src/assets/images/tools_clippers_kit_1795060414369.jpg',
    alt: 'Kit complet de matériel de barbier afro posé sur ardoise noire : clipper, trimmer, shaver, ciseaux, peignes, brosses et sabots',
    caption: 'Panier technique complet du barbier afro : clipper à levier, trimmer squelette T-Blade, shaver double grille, rasoir, ciseaux, peignes et jeu de sabots numérotés.',
    figureCode: 'Fig. 2.1',
  },

  // --- 10 DISTINCT FADE TYPES (Chapter 4) ---
  styleAfroLowFade: {
    id: 'styleAfroLowFade',
    src: '/src/assets/images/style_afro_low_fade_1795089732514.jpg',
    alt: 'Portrait trois-quarts d’un homme noir portant un Afro avec Low Fade : dégradé placé très bas à 1 cm autour de l’oreille et de la nuque',
    caption: 'Low Fade / Afro avec Low Fade : ligne de fondu placée très bas autour de l’oreille et de la nuque, préservant la densité noire sur les flancs.',
    figureCode: 'Fig. 4.1',
  },
  styleAfroMidFade: {
    id: 'styleAfroMidFade',
    src: '/src/assets/images/style_afro_mid_fade_1795089733228.jpg',
    alt: 'Portrait profil trois-quarts d’un homme noir portant un Afro avec Mid Fade : transition horizontale à mi-hauteur de la tempe jusqu’au milieu de l’occiput',
    caption: 'Mid Fade / Afro avec Mid Fade : ligne directrice à mi-hauteur du crâne offrant une progression équilibrée entre clair, gris et sombre.',
    figureCode: 'Fig. 4.2',
  },
  fadeHighSkin: {
    id: 'fadeHighSkin',
    src: '/src/assets/images/fade_high_skin_1795060414407.jpg',
    alt: 'Portrait d’un homme noir avec un High Fade net remontant jusqu’à la crête pariétale et un plateau afro structuré',
    caption: 'High Fade / Afro avec High Fade : contraste élevé remontant jusqu’à la crête pariétale et mettant en valeur la géométrie du dessus.',
    figureCode: 'Fig. 4.3',
  },
  fadeSkinZero: {
    id: 'fadeSkinZero',
    src: '/src/assets/images/fade_skin_zero_1795089732785.jpg',
    alt: 'Profil rapproché d’un homme noir portant un Skin Fade (dégradé à blanc) avec dégradé continu depuis la peau lisse 0,0 mm jusqu’au dessus afro',
    caption: 'Skin Fade (Dégradé à blanc) : fondu continu en quatre nuances depuis la peau nue rasée au shaver (0,0 mm) jusqu’à la couronne noire.',
    figureCode: 'Fig. 4.4',
  },
  fadeBaldHigh: {
    id: 'fadeBaldHigh',
    src: '/src/assets/images/fade_bald_high_1795089731841.jpg',
    alt: 'Profil d’un homme noir portant un Bald Fade avec une large plage de peau entièrement rasée à nu remontant haut sur les côtés',
    caption: 'Bald Fade (Dégradé jusqu’à la peau) : large zone basse et médiane totalement rasée à nu (0,0 mm) avec transition serrée vers le sommet.',
    figureCode: 'Fig. 4.5',
  },
  fadeLowTaper: {
    id: 'fadeLowTaper',
    src: '/src/assets/images/fade_low_taper_1795060414496.jpg',
    alt: 'Profil d’un modèle masculin afro présentant un Taper Fade propre au niveau des tempes et de la nuque tout en gardant les cheveux pleins derrière l’oreille',
    caption: 'Taper Fade : fondu progressif localisé uniquement aux tempes (pattes) et à la nuque, préservant la masse pleine autour de l’oreille.',
    figureCode: 'Fig. 4.6',
  },
  fadeMidDrop: {
    id: 'fadeMidDrop',
    src: '/src/assets/images/fade_mid_drop_1795060414810.jpg',
    alt: 'Portrait trois-quarts d’un modèle masculin afro avec un Drop Fade plongeant derrière l’oreille et des Sponge Twists sur le dessus',
    caption: 'Drop Fade & Sponge Twists : la courbe du dégradé plonge derrière l’oreille sous l’os occipital pour garder du volume à l’arrière.',
    figureCode: 'Fig. 4.7',
  },
  fadeBurstEar: {
    id: 'fadeBurstEar',
    src: '/src/assets/images/fade_burst_ear_1795089732728.jpg',
    alt: 'Profil trois-quarts arrière d’un homme noir portant un Burst Fade en demi-cercle autour de l’oreille avec la nuque longue et bouclée conservée',
    caption: 'Burst Fade : dégradé radial en demi-cercle autour de l’oreille préservant toute la longueur bouclée à l’arrière de la nuque.',
    figureCode: 'Fig. 4.8',
  },
  fadeTempleBrooklyn: {
    id: 'fadeTempleBrooklyn',
    src: '/src/assets/images/fade_temple_brooklyn_1795089732380.jpg',
    alt: 'Portrait trois-quarts d’un homme noir portant un Temple Fade (Brooklyn Fade) focalisé sur la patte et le C-cup avec cheveux afro pleins derrière l’oreille',
    caption: 'Temple Fade (Brooklyn Fade) : micro-dégradé chirurgical concentré sur la tempe et le C-cup, laissant la masse intacte au-dessus et derrière l’oreille.',
    figureCode: 'Fig. 4.9',
  },
  fadeShadowSoft: {
    id: 'fadeShadowSoft',
    src: '/src/assets/images/fade_shadow_soft_1795089732516.jpg',
    alt: 'Profil d’un homme noir portant un Shadow Fade doux et velouté sans rasage à blanc, conservant un léger voile capillaire foncé à la base',
    caption: 'Shadow Fade : fondu progressif velouté démarrant à 0,5–1,5 mm sans jamais exposer la peau nue à blanc.',
    figureCode: 'Fig. 4.10',
  },

  // --- DISTINCT HAIRSTYLE PORTRAITS (Chapter 5 & Gallery) ---
  hair4c: {
    id: 'hair4c',
    src: '/src/assets/images/hair_type_4c_1795060413041.jpg',
    alt: 'Portrait d’un homme noir portant un Afro naturel dense et parfaitement arrondi avec volume intégral',
    caption: 'Afro naturel : volume plein sculpté en sphère harmonieuse sans dégradé sur les côtés.',
    figureCode: 'Fig. 5.1',
  },
  styleAfroCourt: {
    id: 'styleAfroCourt',
    src: '/src/assets/images/style_afro_court_1795089732981.jpg',
    alt: 'Portrait d’un homme noir portant un Afro court (Mini Fro) uniforme de 1,5 cm avec contour propre et côtés pleins',
    caption: 'Afro court (Mini Fro) : longueur régulière de 1 à 2 cm (#4–#5) sur toute la tête avec contours nets.',
    figureCode: 'Fig. 5.2',
  },
  styleWaves360: {
    id: 'styleWaves360',
    src: '/src/assets/images/style_waves_360_1795060414010.jpg',
    alt: 'Portrait studio d’un homme noir portant des Waves 360 brillantes à ondes concentriques avec contours nets',
    caption: 'Waves 360 : vagues concentriques disciplinées par brossage et coupées dans le sens de pousse.',
    figureCode: 'Fig. 5.6',
  },
  styleBuzzCut: {
    id: 'styleBuzzCut',
    src: '/src/assets/images/style_buzz_cut_1795089732523.jpg',
    alt: 'Portrait d’un homme noir portant un Buzz Cut très court uniforme (3 mm, sans vagues) avec ligne frontale ultra-précise',
    caption: 'Buzz Cut : coupe uniforme très courte (3 mm / #1) à texture mate régulière sans motifs ondulés, sublimée par des contours chirurgicaux.',
    figureCode: 'Fig. 5.7',
  },
  styleCaesarCut: {
    id: 'styleCaesarCut',
    src: '/src/assets/images/style_caesar_cut_1795089733482.jpg',
    alt: 'Portrait face trois-quarts d’un homme noir portant un Caesar Cut court brossé vers l’avant avec ligne frontale droite et côtés dégradés',
    caption: 'Caesar Cut : dessus court uniforme (#2) brossé à plat vers l’avant avec ligne frontale horizontale droite et dégradé latéral.',
    figureCode: 'Fig. 5.8',
  },
  styleFrenchCrop: {
    id: 'styleFrenchCrop',
    src: '/src/assets/images/style_french_crop_1795089733678.jpg',
    alt: 'Portrait trois-quarts d’un homme noir portant un French Crop afro-bouclé avec frange texturée rabattue sur le front et mid fade net',
    caption: 'French Crop texturisé : boucles définies sur le dessus (3–4 cm) rabattues vers l’avant en frange courte au-dessus d’un mid fade net.',
    figureCode: 'Fig. 5.9',
  },
  styleTwistOut: {
    id: 'styleTwistOut',
    src: '/src/assets/images/style_twist_out_1795089732282.jpg',
    alt: 'Portrait d’un homme noir portant un Twist Out aux boucles mi-longues souples, aérées et bien séparées avec low taper',
    caption: 'Twist Out : mèches bouclées mi-longues (8–10 cm) souples et séparées après démontage de vanilles, associées à un taper discret.',
    figureCode: 'Fig. 5.11',
  },
  styleLocsTwists: {
    id: 'styleLocsTwists',
    src: '/src/assets/images/style_locs_twists_1795060412910.jpg',
    alt: 'Portrait d’un homme noir portant des dreadlocks soignées avec un taper fade net sur les tempes',
    caption: 'Dreadlocks avec Taper : dégagement précis de la zone temporale et frontale sans fragiliser les racines des locks.',
    figureCode: 'Fig. 5.12',
  },
  styleContoursDessines: {
    id: 'styleContoursDessines',
    src: '/src/assets/images/style_contours_dessines_1795089731750.jpg',
    alt: 'Portrait rapproché d’un homme noir mettant en évidence des contours dessinés géométriques : front line droit, vertical bars nets, C-cup arrondi et barbe alignée',
    caption: 'Coiffure avec contours dessinés : architecture faciale haute précision (Front Line droit, Vertical Bars à 90°, C-Cup net et ligne de barbe).',
    figureCode: 'Fig. 5.13',
  },
  styleHardPart: {
    id: 'styleHardPart',
    src: '/src/assets/images/style_hard_part_1795089732831.jpg',
    alt: 'Portrait trois-quarts d’un homme noir portant une coupe afro avec raie rasée fine (Hard Part) séparant le dessus du dégradé latéral',
    caption: 'Coupe avec raie (Hard Part) : sillon fin de 2 à 3 mm rasé avec précision le long de la crête pariétale.',
    figureCode: 'Fig. 5.14',
  },
  styleFreestyleDesign: {
    id: 'styleFreestyleDesign',
    src: '/src/assets/images/style_freestyle_design_1795089731393.jpg',
    alt: 'Portrait de profil d’un homme noir portant un dégradé afro avec motifs artistiques géométriques gravés au trimmer et rasoir au-dessus de l’oreille',
    caption: 'Dégradé avec motifs artistiques (Freestyle Design) : lignes géométriques nettes gravées dans la zone d’ombre au-dessus et derrière l’oreille.',
    figureCode: 'Fig. 5.15',
  },

  // --- TECHNICAL & CONSULTATION ASSETS ---
  techniqueLineup: {
    id: 'techniqueLineup',
    src: '/src/assets/images/technique_lineup_razor_1795060413738.jpg',
    alt: 'Gros plan d’un barbier ganté réalisant une ligne frontale au trimmer T-Blade',
    caption: 'Travail de précision du Front Line : appui stable des doigts, angle léger de la lame T-Blade et respect strict de l’implantation naturelle.',
    figureCode: 'Fig. 7.1',
  },
  beforeAfter: {
    id: 'beforeAfter',
    src: '/src/assets/images/consultation_before_after_1795060413765.jpg',
    alt: 'Comparaison avant et après une coupe afro professionnelle avec mid skin fade et contours nets',
    caption: 'Étude Avant / Après : rééquilibrage des volumes, ouverture du regard par un mid fade progressif et alignement symétrique de la ligne frontale et de la barbe.',
    figureCode: 'Fig. 9.1',
  },

  // Legacy texture references retained for backward asset resolution if referenced
  hair3a3b: {
    id: 'hair3a3b',
    src: '/src/assets/images/hair_type_3a_3b_1795060413254.jpg',
    alt: 'Portrait rapproché d’un homme noir aux cheveux bouclés souples bien définis',
    caption: 'Modèle masculin aux boucles souples bien dessinées.',
    figureCode: 'Fig. 5.9b',
  },
  hair3c: {
    id: 'hair3c',
    src: '/src/assets/images/hair_type_3c_1795060414269.jpg',
    alt: 'Portrait rapproché d’un homme noir aux boucles serrées à forte densité',
    caption: 'Modèle masculin aux boucles serrées et volume naturel.',
    figureCode: 'Fig. 5.11b',
  },
  hair4a: {
    id: 'hair4a',
    src: '/src/assets/images/hair_type_4a_1795060414065.jpg',
    alt: 'Portrait rapproché d’un homme noir aux cheveux crépus définis',
    caption: 'Modèle masculin aux cheveux crépus définis.',
    figureCode: 'Fig. 5.1b',
  },
  hair4b: {
    id: 'hair4b',
    src: '/src/assets/images/hair_type_4b_1795060413733.jpg',
    alt: 'Portrait rapproché d’un homme noir aux cheveux crépus volumineux',
    caption: 'Modèle masculin aux cheveux crépus volumineux.',
    figureCode: 'Fig. 5.2b',
  },
};

export function getAsset(id: string): AssetItem {
  return ASSETS[id] ?? ASSETS.heroStation;
}
