import { QuizQuestion } from '../types/academy';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // CHAPITRE 1 — BASES DU BARBERING (qcm-general / comprehension)
  {
    id: 'q1-1',
    chapterId: 1,
    category: 'qcm-general',
    prompt: 'Quelle coupe est généralement recommandée pour équilibrer un visage rond ?',
    options: [
      'Un Afro très large sur les côtés avec un Low Taper',
      'Un High Fade ou Mid Skin Fade avec du volume vertical sur le dessus',
      'Une coupe rasée à zéro partout sans contours',
      'Des côtés très longs et un sommet totalement aplati',
    ],
    correctIndex: 1,
    explanation:
      'Affiner les côtés avec un High ou Mid Fade tout en conservant du volume vertical sur le dessus allonge visuellement un visage rond.',
  },
  {
    id: 'q1-2',
    chapterId: 1,
    category: 'comprehension',
    prompt: 'Un client s’assoit et demande simplement « fais-moi un dégradé propre ». Quelle est la première action professionnelle ?',
    options: [
      'Commencer immédiatement un High Skin Fade car c’est la coupe la plus populaire',
      'Passer le sabot #1 sur toute la tête pour gagner du temps',
      'Mener une consultation de 2–3 minutes : montrer les hauteurs (bas/moyen/haut), vérifier s’il veut voir la peau à blanc et diagnostiquer sa texture',
      'Lui demander de revenir avec une photo imprimée',
    ],
    correctIndex: 2,
    explanation:
      'Une consultation structurée élimine les malentendus sur la hauteur du fade, l’exposition de la peau et la longueur du dessus avant d’allumer la tondeuse.',
  },
  {
    id: 'q1-3',
    chapterId: 1,
    category: 'pratique',
    prompt: 'Pourquoi place-t-on obligatoirement une bande de cou papier extensible sous la cape de coiffure ?',
    options: [
      'Uniquement pour absorber la transpiration estivale',
      'Pour empêcher tout contact direct entre la cape et la peau du client et prévenir les contaminations croisées',
      'Pour éviter que la cape ne glisse vers les pieds',
      'Pour rendre la coupe plus rapide au niveau de la nuque',
    ],
    correctIndex: 1,
    explanation:
      'La bande de cou papier à usage unique crée une barrière hygiénique indispensable entre le cou du client et le col de la cape.',
  },

  // CHAPITRE 2 — MATÉRIEL (qcm-general / pratique)
  {
    id: 'q2-1',
    chapterId: 2,
    category: 'qcm-general',
    prompt: 'Quel trio décrit exactement les rôles complémentaires du Clipper, du Trimmer et du Shaver ?',
    imageId: 'toolsKit',
    options: [
      'Clipper pour raser à blanc, Trimmer pour les sabots #4, Shaver pour les contours',
      'Clipper pour la masse et les dégradés avec levier/sabots, Trimmer pour les contours et la ligne zéro, Shaver pour le rasage à blanc 0,0 mm',
      'Les trois machines ont le même rôle mais des tailles de batterie différentes',
      'Trimmer pour le dessus afro, Shaver pour les tempes, Clipper uniquement pour la barbe',
    ],
    correctIndex: 1,
    explanation:
      'Chaque machine a sa plage mécanique dédiée : Clipper (0,5–25 mm), Trimmer (0,1–0,4 mm) et Shaver (0,0 mm après le trimmer).',
  },
  {
    id: 'q2-2',
    chapterId: 2,
    category: 'pratique',
    prompt: 'Avant d’utiliser un rasoir électrique à grilles (Shaver) sur le bas d’un Skin Fade, quelle condition est impérative ?',
    options: [
      'Appliquer une épaisse couche d’huile de ricin sur la zone',
      'Avoir préalablement raccourci les cheveux sous 0,5 mm au Trimmer',
      'Passer directement le Shaver sur une repousse de 4 mm',
      'Appuyer très fort pour enfoncer les grilles dans la peau',
    ],
    correctIndex: 1,
    explanation:
      'Le Shaver ne coupe efficacement que des poils très courts (< 0,5 mm) préparés au Trimmer ; sur poils longs il arrache et s’abîme.',
  },
  {
    id: 'q2-3',
    chapterId: 2,
    category: 'qcm-general',
    prompt: 'À quoi sert principalement la brosse de dégradé (Fade Brush) pendant la réalisation d’un fade ?',
    options: [
      'Uniquement à nettoyer le comptoir après la coupe',
      'À démêler un afro long de 10 cm',
      'À chasser les cheveux coupés en continu et plaquer la fibre dans son sens de pousse pour lire les vraies zones sombres',
      'À appliquer le gel de rasage sur le front',
    ],
    correctIndex: 2,
    explanation:
      'Brosser toutes les 3 à 4 passes dégage les cheveux coupés qui créent de fausses ombres et permet de fondre les lignes avec exactitude.',
  },

  // CHAPITRE 3 — GUIDES & CODES (sabots)
  {
    id: 'q3-1',
    chapterId: 3,
    category: 'sabots',
    prompt: 'Quelle est la longueur approximative de coupe du sabot #1 (levier fermé) ?',
    options: ['1,5 mm', '3 mm', '6 mm', '10 mm'],
    correctIndex: 1,
    explanation:
      'Le sabot #1 correspond à 1/8 de pouce, soit environ 3 mm levier fermé (et environ 4 mm levier ouvert).',
  },
  {
    id: 'q3-2',
    chapterId: 3,
    category: 'sabots',
    prompt: 'Quel sabot correspond à une longueur approximative de 4,5 mm (3/16 de pouce) ?',
    options: ['Sabot 0.5', 'Sabot #1', 'Demi-sabot 1.5', 'Sabot #2'],
    correctIndex: 2,
    explanation:
      'Le demi-sabot 1.5 coupe à environ 4,5 mm fermé ; il est indispensable pour effacer la ligne entre le #1 ouvert et le #2, ainsi que pour couper des Waves 360.',
  },
  {
    id: 'q3-3',
    chapterId: 3,
    category: 'sabots',
    prompt: 'À quelle longueur correspond approximativement le sabot #4 (1/2 pouce) ?',
    options: ['6 mm', '10 mm', '13 mm', '19 mm'],
    correctIndex: 2,
    explanation:
      'Le sabot #4 laisse environ 13 mm (1,3 cm), une longueur très appréciée pour les afros courts uniformes.',
  },
  {
    id: 'q3-4',
    chapterId: 3,
    category: 'sabots',
    prompt: 'Sur une Clipper standard, quel réglage de levier donne la coupe la PLUS COURTE avec un sabot donné ?',
    options: [
      'Levier abaissé (ouvert)',
      'Levier à mi-course (intermédiaire)',
      'Levier relevé vers le haut (fermé)',
      'Le levier ne change pas la longueur lorsqu’un sabot est clipsé',
    ],
    correctIndex: 2,
    explanation:
      'Levier fermé = lame mobile avancée au maximum = coupe la plus courte. Ouvrir le levier recule la lame d’environ +1 mm, même avec un sabot monté.',
  },
  {
    id: 'q3-5',
    chapterId: 3,
    category: 'sabots',
    prompt: 'Quel outil permet le mieux d’effacer une ligne persistante entre le « 0 ouvert » (~1,5 mm) et le « #1 fermé » (3 mm) ?',
    options: [
      'Le sabot #3 fermé',
      'Le demi-sabot #0.5 en variant le levier d’ouvert vers fermé avec le coin de la lame',
      'Le Shaver électrique',
      'Des ciseaux sculpteurs près de la racine',
    ],
    correctIndex: 1,
    explanation:
      'Le demi-sabot #0.5 couvre exactement la zone charnière de 1,5 à 2,5 mm entre le 0 ouvert et le #1 fermé.',
  },
  {
    id: 'q3-6',
    chapterId: 3,
    category: 'sabots',
    prompt: 'Quel est le rôle du mouvement en C (C-motion) lors d’un passage de tondeuse ?',
    options: [
      'Creuser une ligne repère très nette et profonde',
      'Dégager progressivement la lame en arc vers l’extérieur afin de ne pas créer de démarcation dure',
      'Couper plus vite en appuyant toute la lame à plat',
      'Remplacer totalement l’usage des demi-sabots',
    ],
    correctIndex: 1,
    explanation:
      'Le mouvement en C adoucit naturellement la sortie de lame, évitant de créer une nouvelle ligne difficile à fondre.',
  },

  // CHAPITRE 4 — TYPES DE FADE (fades)
  {
    id: 'q4-1',
    chapterId: 4,
    category: 'fades',
    prompt: 'Quel type de fade se limite uniquement aux tempes (pattes) et à la base de la nuque tout en conservant la masse complète autour des oreilles ?',
    imageId: 'fadeLowTaper',
    options: ['High Skin Fade', 'Drop Fade', 'Taper Fade', 'Burst Fade'],
    correctIndex: 2,
    explanation:
      'Le Taper Fade ne dégrade que les pattes (tempes) et la nuque, préservant la densité sombre sur l’ensemble des côtés.',
  },
  {
    id: 'q4-2',
    chapterId: 4,
    category: 'fades',
    prompt: 'Quel fade se reconnaît à sa courbe qui descend nettement derrière l’oreille pour épouser la base de l’os occipital ?',
    imageId: 'fadeMidDrop',
    options: ['Drop Fade', 'High Fade', 'Temple Fade', 'Shadow Fade'],
    correctIndex: 0,
    explanation:
      'Le Drop Fade « plonge » (drops) en arc derrière l’oreille vers la nuque, ce qui conserve un arrondi naturel et fourni à l’arrière du crâne.',
  },
  {
    id: 'q4-3',
    chapterId: 4,
    category: 'fades',
    prompt: 'Quel fade forme un dégradé semi-circulaire rayonnant autour de l’oreille tout en laissant la nuque longue et fournie ?',
    imageId: 'fadeBurstEar',
    options: ['Bald Fade', 'Burst Fade', 'Low Shadow Fade', 'Temple Fade'],
    correctIndex: 1,
    explanation:
      'Le Burst Fade rayonne en demi-cercle concentrique autour de l’oreille sans traverser la masse centrale de la nuque.',
  },
  {
    id: 'q4-4',
    chapterId: 4,
    category: 'fades',
    prompt: 'Quelle est la particularité majeure d’un Shadow Fade par rapport à un Skin Fade ?',
    imageId: 'fadeShadowSoft',
    options: [
      'Il se fait uniquement sur cheveux bouclés souples',
      'Il commence à 0,5 ou 1,5 mm sans jamais exposer la peau nue au shaver, laissant un léger voile ombré',
      'Il ne nécessite aucun sabot intermédiaire',
      'Il monte obligatoirement au-dessus de la crête pariétale',
    ],
    correctIndex: 1,
    explanation:
      'Le Shadow Fade offre un dégradé doux et fondu sans rasage à blanc, idéal pour un style sobre ou pour les peaux sensibles aux poils incarnés.',
  },
  {
    id: 'q4-5',
    chapterId: 4,
    category: 'fades',
    prompt: 'Dans un Skin Fade, où doit s’arrêter le passage du Shaver par rapport à la ligne initiale tracée au Trimmer ?',
    imageId: 'fadeSkinZero',
    options: [
      '1 cm au-dessus de la ligne du Trimmer',
      'Exactement sur la ligne du Trimmer en appuyant fort',
      'Environ 5 à 8 mm en dessous de la ligne du Trimmer, avec une sortie très légère',
      'Uniquement sur la nuque, jamais sur les côtés',
    ],
    correctIndex: 2,
    explanation:
      'S’arrêter 5 à 8 mm sous la ligne du Trimmer laisse un espace tampon qui évite de créer une barre blanche impossible à effacer.',
  },

  // CHAPITRE 5 — MODÈLES DE COIFFURE AFRO (qcm-general / comprehension)
  {
    id: 'q5-1',
    chapterId: 5,
    category: 'comprehension',
    prompt: 'Quelle règle technique absolue faut-il respecter lors de la coupe d’un client portant des Waves 360 ?',
    imageId: 'styleWaves360',
    options: [
      'Couper à contre-sens (against the grain) au sabot #1 fermé pour accentuer les vagues',
      'Couper toujours dans le sens de pousse (with the grain) au #1.5 ou #2 en gardant le tourbillon (crown) légèrement plus long',
      'Détremper les cheveux avant de passer le sabot #0.5',
      'Effiler le dessus aux ciseaux crantés',
    ],
    correctIndex: 1,
    explanation:
      'Couper dans le sens de pousse préserve la longueur nécessaire au dessin ondulé des vagues ; couper à contre-sens les détruit immédiatement.',
  },
  {
    id: 'q5-2',
    chapterId: 5,
    category: 'qcm-general',
    prompt: 'Lors de la réalisation de Sponge Twists sur le dessus, comment faut-il utiliser l’éponge à alvéoles ?',
    imageId: 'fadeMidDrop',
    options: [
      'En alternant sens horaire et antihoraire toutes les 5 secondes',
      'En effectuant des mouvements circulaires doux et réguliers toujours dans le même sens sur cheveux légèrement hydratés (≥ 2,5 cm)',
      'En appuyant très fortement sur cheveux secs de 1 cm',
      'En l’utilisant avant de faire le dégradé des côtés',
    ],
    correctIndex: 1,
    explanation:
      'Tourner constamment dans le même sens enroule progressivement les spires en twists définis sans les défaire.',
  },
  {
    id: 'q5-3',
    chapterId: 5,
    category: 'comprehension',
    prompt: 'Quelle est la précaution numéro 1 lors d’un Taper Fade sur un client portant des dreadlocks ?',
    imageId: 'styleLocsTwists',
    options: [
      'Couper 2 cm de la base des dreadlocks frontales pour aligner le front',
      'Attacher solidement toutes les dreadlocks à l’écart et ne jamais entamer leurs racines lors du taper et du line-up',
      'Passer le sabot #4 par-dessus les dreadlocks',
      'Appliquer du talc directement sur les racines des locks',
    ],
    correctIndex: 1,
    explanation:
      'Protéger et isoler chaque racine de lock évite d’amincir définitivement la base frontale ou de casser des locks anciennes.',
  },

  // CHAPITRE 6 — TECHNIQUES DE COUPE (pratique / qcm-general)
  {
    id: 'q6-1',
    chapterId: 6,
    category: 'pratique',
    prompt: 'Quel est l’ordre logique recommandé pour structurer une coupe afro complète avec fade ?',
    options: [
      'Rasoir → Contours → Fade → Préparation → Dessus',
      'Préparation → Repérage/Debulking → Fade & transitions → Dessus/Connexion → Contours → Rasoir → Nettoyage final',
      'Contours frontaux → Shaver → Peignage du dessus → Consultation',
      'Nettoyage → Sabot #0.5 → Sabot #4 → Trimmer',
    ],
    correctIndex: 1,
    explanation:
      'Terminer par les contours, le rasoir et le nettoyage garantit une ligne nette qui n’est pas perturbée par le travail de masse ou de fade.',
  },
  {
    id: 'q6-2',
    chapterId: 6,
    category: 'qcm-general',
    prompt: 'À quoi sert la technique « Clipper Over Comb » (tondeuse sur peigne) dans une coupe afro ?',
    options: [
      'À raser le cou à blanc',
      'À connecter harmonieusement le dégradé des côtés à un volume supérieur plus long au niveau de la crête pariétale',
      'À nettoyer les dents de la tondeuse',
      'À dessiner des motifs artistiques',
    ],
    correctIndex: 1,
    explanation:
      'Le peigne sert de guide ajustable qui permet de fondre la zone de poids de la crête pariétale sans créer d’encoche.',
  },

  // CHAPITRE 7 — CONTOURS ET FINITIONS (pratique / comprehension)
  {
    id: 'q7-1',
    chapterId: 7,
    category: 'pratique',
    prompt: 'Par quel point commence-t-on toujours le tracé du Front Line (ligne frontale) ?',
    imageId: 'techniqueLineup',
    options: [
      'Par la tempe gauche puis en traversant tout le front d’un seul trait',
      'Par le centre exact du front (aligné sur l’arête nasale), puis en symétrisant progressivement vers la gauche et la droite',
      'Par la nuque en remontant vers le front',
      'Directement au rasoir sans passer le Trimmer',
    ],
    correctIndex: 1,
    explanation:
      'Démarrer au centre crée un repère horizontal fiable qui empêche de faire pencher la ligne d’un côté.',
  },
  {
    id: 'q7-2',
    chapterId: 7,
    category: 'comprehension',
    prompt: 'Qu’appelle-t-on le « Push Back » et pourquoi est-ce une erreur majeure ?',
    options: [
      'Le fait d’incliner le fauteuil en arrière pour le rasage',
      'Le recul artificiel de la ligne frontale dans les cheveux sains, provoquant une repousse grise inesthétique en quelques jours',
      'Le brossage des cheveux vers l’arrière sur un French Crop',
      'La position ouverte du levier de la clipper',
    ],
    correctIndex: 1,
    explanation:
      'Un line-up professionnel nettoie la bordure naturelle (1–2 mm de duvet) sans jamais reculer la ligne dans le cuir chevelu dense.',
  },
  {
    id: 'q7-3',
    chapterId: 7,
    category: 'pratique',
    prompt: 'Quel angle maximal doit former la lame du rasoir (shavette) par rapport à la peau lors des finitions ?',
    options: ['Environ 30 degrés (lame couchée sur peau tendue et lubrifiée)', '75 degrés', '90 degrés perpendiculaire', 'L’angle n’a aucune importance si le gel est posé'],
    correctIndex: 0,
    explanation:
      'Un angle plat de ~30° associé à une peau bien tendue et un gel transparent coupe le poil au ras sans entailler ni irriter l’épiderme.',
  },

  // CHAPITRE 8 — HYGIÈNE, SÉCURITÉ ET ENTRETIEN (pratique)
  {
    id: 'q8-1',
    chapterId: 8,
    category: 'pratique',
    prompt: 'Que doit-on impérativement faire d’une demi-lame de rasoir immédiatement après avoir terminé les contours d’un client ?',
    options: [
      'La pulvériser d’alcool à 70° et la garder pour le client suivant',
      'La plonger 5 minutes dans le Barbicide puis la réutiliser',
      'La jeter immédiatement dans un collecteur rigide sécurisé (boîte DASRI) car elle est strictement à usage unique',
      'La jeter directement dans la poubelle classique du salon',
    ],
    correctIndex: 2,
    explanation:
      'Une lame de rasoir est strictement à usage unique et doit être éliminée dans une boîte rigide anti-perforation DASRI pour éviter tout risque infectieux ou de coupure.',
  },
  {
    id: 'q8-2',
    chapterId: 8,
    category: 'pratique',
    prompt: 'Avant d’immerger un peigne ou un sabot dans le bocal désinfectant (Barbicide), quelle étape préalable est obligatoire ?',
    options: [
      'Le huiler légèrement',
      'Retirer tous les cheveux et le laver à l’eau chaude savonneuse puis rincer',
      'Le passer au sèche-cheveux brûlant',
      'Aucune étape préalable n’est nécessaire',
    ],
    correctIndex: 1,
    explanation:
      'Les matières organiques (cheveux, sébum, cire) inactivent la solution désinfectante : on nettoie toujours mécaniquement avant de désinfecter.',
  },
  {
    id: 'q8-3',
    chapterId: 8,
    category: 'comprehension',
    prompt: 'Comment prévenir efficacement les boutons de rasage / poils incarnés (pseudofolliculite) sur la nuque d’un client aux cheveux crépus sensibles ?',
    options: [
      'Raser très fort à rebrousse-poil avec une double lame sèche',
      'Éviter le rasage agressif à blanc, privilégier un Shadow Fade ou trimmer doux sans pression excessive et apaiser la peau après la coupe',
      'Frotter vigoureusement la nuque avec une brosse dure',
      'Appliquer beaucoup de talc avant de passer le shaver',
    ],
    correctIndex: 1,
    explanation:
      'Laisser un micro-voile ou éviter de couper le poil crépu sous la surface cutanée empêche le cheveu recourbé de pénétrer à nouveau dans le derme.',
  },

  // CHAPITRE 9 — PRATIQUE PROFESSIONNELLE ET RELATION CLIENT (comprehension / qcm-general)
  {
    id: 'q9-1',
    chapterId: 9,
    category: 'comprehension',
    prompt: 'Un client vous signale poliment devant le miroir final qu’il trouve un côté légèrement plus sombre que l’autre. Quelle est la meilleure réaction ?',
    options: [
      'Lui expliquer que c’est simplement l’éclairage du salon et retirer la cape',
      'Le remercier pour sa remarque, réorienter le fauteuil vers la lumière, vérifier objectivement et corriger sereinement la zone en 2 minutes',
      'Lui dire qu’un perfectionnisme excessif demande un supplément tarifaire',
      'Refaire toute la coupe plus courte sans lui demander',
    ],
    correctIndex: 1,
    explanation:
      'Accueillir sereinement un ajustement avec professionnalisme transforme une hésitation en confiance durable et fidélise le client.',
  },
  {
    id: 'q9-2',
    chapterId: 9,
    category: 'qcm-general',
    prompt: 'Quels critères garantissent une photo de portfolio de niveau professionnel ?',
    imageId: 'beforeAfter',
    options: [
      'Un filtre noir et blanc très saturé pour cacher les défauts du fade',
      'Un éclairage neutre bien orienté (45°), un fond sobre et dégagé, zéro cheveu résiduel sur le visage et l’accord explicite du client',
      'Une photo prise à la va-vite de loin avec le poste en désordre derrière',
      'Ne montrer uniquement que le sommet de la tête sans voir le dégradé',
    ],
    correctIndex: 1,
    explanation:
      'La crédibilité d’un portfolio repose sur la propreté du sujet, la qualité de la lumière, un fond soigné et le respect du consentement client.',
  },
  {
    id: 'q9-3',
    chapterId: 9,
    category: 'qcm-general',
    prompt: 'Sur quels éléments doit-on baser le calcul de ses tarifs de barbier ?',
    options: [
      'Uniquement sur le prix le plus bas pratiqué dans le quartier',
      'Les coûts fixes, les consommables par client, le temps réel par prestation, les charges et le niveau d’expertise proposé',
      'Un prix choisi au hasard selon la tête du client',
      'Le prix d’achat d’une seule tondeuse',
    ],
    correctIndex: 1,
    explanation:
      'Une tarification rentable intègre l’ensemble des coûts réels et du temps consacré afin de maintenir un service hygiénique, soigné et durable.',
  },
];

export const QUIZ_MODE_META = [
  {
    id: 'qcm-general',
    title: 'QCM Fondamentaux & Théorie',
    subtitle: 'Culture métier, matériel, coiffures et pratique professionnelle',
    description: 'Questions à choix multiples pour valider vos bases théoriques globales de l’Afro Barbering.',
  },
  {
    id: 'sabots',
    title: 'Reconnaissance des Sabots & Levier',
    subtitle: 'Correspondances numéros ↔ mm et transitions',
    description: 'Testez votre réflexe sur les codes de sabots, les demi-sabots, le levier et le mouvement en C.',
  },
  {
    id: 'fades',
    title: 'Identification des Types de Fade',
    subtitle: 'Low, Mid, High, Skin, Taper, Drop, Burst, Shadow',
    description: 'Reconnaissez chaque dégradé, sa hauteur exacte, sa géométrie et son protocole d’exécution.',
  },
  {
    id: 'comprehension',
    title: 'Cas Clients & Compréhension',
    subtitle: 'Mises en situation réelles au fauteuil',
    description: 'Analysez des demandes clients concrètes pour prescrire la bonne coupe et prévenir les erreurs.',
  },
  {
    id: 'pratique',
    title: 'Évaluation Pratique, Contours & Hygiène',
    subtitle: 'Protocoles salon, sécurité rasoir et désinfection',
    description: 'Validez vos réflexes d’hygiène sanitaire, de précision au rasoir et d’enchaînement de coupe.',
  },
] as const;
