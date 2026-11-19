import { ChapterData } from '../types/academy';

export const CHAPTERS: ChapterData[] = [
  {
    id: 1,
    slug: 'bases-du-barbering',
    title: 'Chapitre 1 – Les bases du barbering',
    shortTitle: 'Les bases du barbering',
    level: 'Débutant',
    durationMinutes: 45,
    summaryIntro:
      'Maîtrisez l’héritage culturel du barbering afro, les standards d’un poste irréprochable, l’analyse morphologique du visage et les fondamentaux de la consultation client.',
    objectives: [
      'Comprendre l’histoire, la culture et le rôle social du barbier professionnel.',
      'Organiser un poste de travail ergonomique, propre et prêt avant chaque client.',
      'Conduire une consultation structurée en analysant la forme du visage et la texture.',
      'Éviter les erreurs classiques du débutant dès les premières coupes.',
    ],
    heroImageId: 'heroStation',
    heroCaption:
      'Fig. 1.1 — Poste de travail d’académie : ergonomie, éclairage sans ombre portée, alignement des tondeuses et accès direct aux désinfectants.',
    diagramKind: 'face-shapes',
    sections: [
      {
        title: '1. Histoire et évolution du métier de barbier afro',
        paragraphs: [
          'Le métier de barbier figure parmi les plus anciens artisanats au monde. Dès l’Antiquité africaine, notamment en Égypte antique et dans les royaumes d’Afrique de l’Ouest, la coiffure masculine portait un statut social, spirituel et identitaire fort : tresses structurées, motifs rasés et soins aux huiles végétales étaient confiés à des maîtres artisans respectés.',
          'Au XXe siècle, le barbershop afro est devenu un véritable centre communautaire et culturel, des salons pionniers de Harlem et d’Atlanta jusqu’aux capitales européennes et africaines modernes. Aujourd’hui, l’Afro Barbering allie héritage, précision architecturale (fades millimétrés, contours géométriques) et standards d’hygiène de niveau clinique.',
        ],
        bulletPoints: [
          'De l’artisanat traditionnel à la discipline technique codifiée (système de sabots, levier, géométrie crânienne).',
          'Émergence du barbier-conseil : expert en morphologie, en soin du cuir chevelu et en image masculine.',
          'Rayonnement international grâce à l’exigence visuelle des portfolios et des académies spécialisées.',
        ],
      },
      {
        title: '2. Rôle, responsabilités et hygiène personnelle du barber',
        paragraphs: [
          'Un barber professionnel n’est pas un simple exécutant qui « passe la tondeuse ». Il est responsable de la santé cutanée de son client, de la justesse esthétique de sa coupe et de l’expérience vécue au fauteuil.',
          'Votre crédibilité commence avant même d’allumer une machine : tenue propre et soignée (tablier de travail impeccable), mains lavées et ongles courts, haleine fraîche, posture droite et ponctualité irréprochable.',
        ],
        bulletPoints: [
          'Hygiène personnelle : lavage des mains avant et après chaque client, port de gants en nitrile noir lors du rasage ou en cas de peau sensible.',
          'Posture ergonomique : ajuster la hauteur hydraulique du fauteuil pour garder les coudes souples et le dos droit (ne jamais se courber au-dessus du client).',
          'Responsabilité éthique : refuser une pratique dangereuse (rasage sur infection cutanée active) et conseiller avec honnêteté.',
        ],
      },
      {
        title: '3. Installation et organisation du poste de travail',
        paragraphs: [
          'Un poste désordonné génère des gestes hésitants, des pertes de temps et un manque de confiance immédiat chez le client. Chaque outil possède une place fixe afin que votre main le trouve par réflexe sans quitter le crâne des yeux.',
        ],
        bulletPoints: [
          'Zone Machines (côté main dominante) : Clipper, Trimmer et Shaver alignés sur un tapis antidérapant propre, batteries chargées à 100 %.',
          'Zone Accessoires : sabots rangés par ordre croissant (#0.5 à #8), peigne de coupe, peigne afro, brosse de dégradé et vaporisateur.',
          'Zone Hygiène (visible par le client) : bocal désinfectant limpide (Barbicide), spray désinfectant 5-en-1, bandes de cou papier, gants, boîte rigide DASRI pour lames usagées.',
          'Éclairage : lumière blanche neutre (4500K–5500K) placée au-dessus et de face afin de révéler fidèlement les zones d’ombre d’un dégradé.',
        ],
      },
      {
        title: '4. Accueil, consultation et analyse de la forme du visage',
        paragraphs: [
          'Une coupe réussie se gagne à 70 % durant les 3 minutes de consultation avant le premier coup de tondeuse. Installez le client, regardez-le à hauteur d’yeux dans le miroir, puis touchez délicatement les cheveux et le cuir chevelu pour diagnostiquer texture, densité, épis et cicatrices éventuelles.',
          'L’objectif de l’analyse morphologique est de rééquilibrer les proportions vers l’harmonie naturelle du visage ovale grâce au choix de la hauteur du fade et du volume supérieur.',
        ],
        bulletPoints: [
          'Visage ovale : proportions équilibrées — toutes les coupes conviennent (Low, Mid ou High Fade, Waves, Afro).',
          'Visage rond : manque d’angles — privilégier un High Fade ou Mid Skin Fade avec du volume vertical sur le dessus pour allonger la silhouette.',
          'Visage carré : mâchoire forte — adoucir avec un Mid Fade ou Low Taper équilibré, éviter d’élargir encore les côtés.',
          'Visage allongé / rectangle : éviter trop de hauteur au sommet ; préférer un Low Fade, Taper Fade ou Caesar Cut qui conserve de la matière latérale.',
          'Visage losange / triangulaire : pommettes marquées ou front étroit — garder un peu de volume aux tempes (Low Fade / Taper) pour équilibrer la mâchoire.',
        ],
        figureId: 'beforeAfter',
        figureCaption: 'Fig. 1.2 — Impact direct d’une consultation réussie : rééquilibrage des proportions du visage grâce à un Mid Fade propre et des contours naturels.',
      },
      {
        title: '5. Les erreurs fréquentes des débutants et le vocabulaire essentiel',
        paragraphs: [
          'Tout grand barbier a commencé en apprenant à ralentir. La précipitation, l’oubli du brossage entre les passes et la mauvaise communication sont responsables de la majorité des coupes ratées chez les apprentis.',
          'Maîtriser le vocabulaire franco-anglais du métier (Clipper, Trimmer, Taper, Line-Up, C-Motion, Parietal Ridge, Shrinkage) vous permet de comprendre immédiatement les fiches techniques, les clients internationaux et les formateurs.',
        ],
        bulletPoints: [
          'Commencer à couper avant d’avoir vérifié la hauteur exacte souhaitée avec le client devant le miroir.',
          'Monter involontairement un Low Fade en High Fade à force de vouloir effacer une ligne.',
          'Couper sans nettoyer régulièrement les cheveux coupés avec la fade brush.',
          'Reculer artificiellement la ligne frontale (push back) pour tenter de corriger une asymétrie.',
        ],
      },
    ],
    concreteExamples: [
      {
        scenario: 'Un client au visage rond arrive avec une photo d’Afro naturel très large sur les côtés et demande « exactement pareil ».',
        diagnosis: 'Un volume excessif sur les tempes accentuerait la rondeur du visage et déséquilibrerait son profil.',
        action: 'Proposer un Afro structuré avec un Mid ou High Drop Fade qui affine les côtés tout en gardant un beau volume naturel sur le dessus.',
        result: 'Le client retrouve l’esprit afro qu’il aimait, mais avec une silhouette affinée et beaucoup plus flatteuse.',
      },
      {
        scenario: 'Un client s’assoit et dit simplement « fais-moi un dégradé propre ».',
        diagnosis: 'Demande trop vague : « dégradé » peut signifier Low Taper, Mid Shadow ou High Skin Fade selon le client.',
        action: 'Montrer concrètement avec les doigts trois repères sur la tempe (bas / moyen / haut), demander s’il veut voir la peau à blanc ou garder une ombre, et valider la longueur du dessus.',
        result: 'Zéro malentendu : le client se sent écouté par un professionnel et valide le plan avant la coupe.',
      },
    ],
    proTips: [
      'Regardez toujours votre coupe à travers le miroir plutôt que uniquement à 20 cm de la tête : le recul du miroir révèle instantanément les asymétries.',
      'Faites tourner le fauteuil vers la lumière plutôt que de tordre votre poignet dans un angle inconfortable.',
      'Notez mentalement 3 éléments dès la consultation : implantation et densité, hauteur du fade demandée, et sensibilité de la peau.',
    ],
    commonMistakes: [
      'Oublier de palper le crâne avant de démarrer : une bosse occipitale ou un grain de beauté caché peut surprendre la lame.',
      'Poser la cape sans bande de cou papier jetable.',
      'Parler avec un jargon trop technique au client au lieu de montrer visuellement les longueurs.',
    ],
    keyTakeaways: [
      'Un poste rangé, propre et bien éclairé conditionne la régularité technique de chaque coupe.',
      'La consultation de 3 minutes valide la morphologie, la texture, la hauteur du fade et l’entretien quotidien.',
      'Adapter la coupe à la forme du visage consiste à équilibrer volume supérieur et largeur latérale.',
      'Le professionnalisme se voit dans l’hygiène, la posture et la clarté du diagnostic.',
    ],
    exercise: {
      title: 'Atelier pratique 1 : Installation du poste et simulation de consultation',
      duration: '20 min',
      objective: 'Préparer un poste complet en moins de 5 minutes et conduire un diagnostic morphologique structuré sur un modèle ou un proche.',
      equipment: ['Cape + bande de cou', 'Miroir', 'Peigne afro', 'Brosse', 'Carnet de notes'],
      steps: [
        'Disposez vos outils en 3 zones distinctes : Machines, Peignes/Sabots par ordre croissant, et Hygiène.',
        'Installez votre modèle avec la bande de cou papier bien rabattue par-dessus le col de la cape.',
        'Examinez la forme du visage de face et classez-la (ovale, rond, carré, allongé, losange).',
        'Palpez la couronne (tourbillon), l’os occipital et la crête pariétale pour localiser les repères crâniens.',
        'Formulez à voix haute une proposition de coupe argumentée et faites-la valider par le modèle.',
      ],
      validationCriteria: [
        'Tous les outils sont accessibles sans croiser les bras inutilement.',
        'La bande de cou empêche tout contact entre la cape et la peau.',
        'Les trois questions clés (hauteur du fade, peau à blanc ou ombre, longueur dessus) ont été posées.',
      ],
    },
  },
  {
    id: 2,
    slug: 'connaitre-son-materiel',
    title: 'Chapitre 2 – Connaître son matériel',
    shortTitle: 'Connaître son matériel',
    level: 'Débutant',
    durationMinutes: 60,
    summaryIntro:
      'Maîtrise intégrale des 16 outils professionnels du barbier afro : rôle précis, différence entre Clipper, Trimmer et Shaver, prise en main ergonomique, erreurs à proscrire et désinfection.',
    objectives: [
      'Distinguer sans hésitation les fonctions exactes du Clipper, du Trimmer et du Shaver.',
      'Connaître la tenue ergonomique et le geste juste de chacun des 16 outils professionnels.',
      'Appliquer un protocole d’entretien, de lubrification et de désinfection après chaque client.',
    ],
    heroImageId: 'toolsKit',
    heroCaption:
      'Fig. 2.1 — Arsenal complet du barbier afro : machines complémentaires, lames, ciseaux, peignes, brosses et jeu complet de sabots numérotés.',
    diagramKind: 'tool-comparison',
    sections: [
      {
        title: '1. Comprendre la différence entre Clipper, Trimmer et Shaver',
        paragraphs: [
          'C’est l’une des premières confusions des débutants : vouloir tout faire avec une seule machine. En Afro Barbering professionnel, trois machines travaillent en relais millimétré, chacune conçue pour une plage de longueur et un niveau de finesse spécifique.',
          'Le tableau comparatif interactif et les 16 fiches outils ci-dessous constituent votre référence quotidienne d’atelier.',
        ],
        bulletPoints: [
          'Clipper (0,5 à 25 mm) : puissance, levier réglable et sabots pour structurer et dégrader.',
          'Trimmer (0,1 à 0,4 mm) : lame en T fine et visible pour tracer la ligne zéro et les contours (line-up).',
          'Shaver (0,0 mm) : grilles hypoallergéniques pour lisser la peau à blanc après le trimmer.',
        ],
      },
      {
        title: '2. Ergonomie et tenue des outils : protéger ses poignets',
        paragraphs: [
          'Un barbier réalise des milliers de mouvements de poignet par semaine. Tenir ses ciseaux avec le pouce enfoncé ou crisper sa main sur la clipper provoque à la fois des lignes imprécises et des tendinites.',
          'Privilégiez toujours la légèreté de prise : c’est l’affûtage de la lame et la vitesse du moteur qui coupent le cheveu afro, jamais la force brute de votre bras.',
        ],
        bulletPoints: [
          'Clipper : pouce libre sur le levier pour modifier la longueur en un mouvement continu.',
          'Trimmer : appui de l’auriculaire sur la peau du client pour stabiliser la lame au millimètre.',
          'Ciseaux : seul le pouce actionne la lame mobile ; la lame fixe repose sur l’annulaire.',
          'Rasoir shavette : peau tendue par la main libre et angle constant de 30°.',
        ],
      },
      {
        title: '3. Fiches pratiques des 16 outils indispensables',
        paragraphs: [
          'Consultez ci-dessous la fiche technique complète de chaque outil (ou ouvrez la section dédiée « Matériel » pour filtrer et imprimer vos fiches). Chaque outil est détaillé selon 7 critères professionnels : nom, photo, utilité, tenue, utilisation, erreurs à éviter et entretien.',
        ],
      },
    ],
    concreteExamples: [
      {
        scenario: 'En plein Skin Fade, l’apprenti passe directement le Shaver sur une repousse de 3 mm sans passer le Trimmer au préalable.',
        diagnosis: 'Les grilles d’un shaver ne peuvent capturer que des poils de moins de 0,5 mm ; un poil long se plie, tire douloureusement et peut déchirer la grille dorée.',
        action: 'Dégrossir au clipper 0 fermé, nettoyer la zone basse au trimmer, puis seulement passer le shaver par effleurements doux.',
        result: 'Peau parfaitement lisse en 20 secondes, zéro douleur et longévité préservée des grilles.',
      },
      {
        scenario: 'La tondeuse de coupe commence à chauffer et accrocher dans un afro 4C dense au bout de 15 minutes.',
        diagnosis: 'Manque de lubrification et accumulation de micro-cheveux secs entre les deux lames créant une friction excessive.',
        action: 'Éteindre la machine, brosser les dents, vaporiser un spray refroidissant/désinfectant, essuyer puis appliquer 3 gouttes d’huile sur la lame en fonctionnement.',
        result: 'La température retombe immédiatement et la coupe redevient fluide et silencieuse.',
      },
    ],
    proTips: [
      'Vérifiez toujours l’alignement des lames (blade alignment) sur une surface plane après tout démontage : la lame mobile ne doit JAMAIS dépasser la lame fixe.',
      'Ayez toujours un peigne de couleur claire (blanc/ivoire ou jaune) pour travailler les cheveux noirs afro en clipper-over-comb : le contraste visuel double votre précision.',
      'Remplacez les grilles et couteaux du shaver tous les 4 à 6 mois en usage intensif.',
    ],
    commonMistakes: [
      'Laisser une tondeuse allumée posée sur le comptoir (vibrations, chauffe inutile et risque de chute).',
      'Plonger une machine électrique dans du liquide au lieu d’utiliser un spray adapté aux lames.',
      'Travailler avec des sabots génériques qui ont du jeu sur la lame.',
    ],
    keyTakeaways: [
      'Clipper, Trimmer et Shaver forment un trio complémentaire : jamais interchangeables.',
      'La précision vient de la détente de la main et d’un appui stable, jamais de la pression sur le crâne.',
      'Chaque outil doit être brossé, désinfecté et lubrifié selon son protocole spécifique après chaque client.',
    ],
    exercise: {
      title: 'Atelier pratique 2 : Contrôle, tenue et entretien complet du kit',
      duration: '30 min',
      objective: 'Savoir vérifier l’alignement des lames, exécuter la tenue correcte des 4 outils majeurs et réaliser un cycle complet d’entretien.',
      equipment: ['Clipper', 'Trimmer', 'Shaver', 'Ciseaux droits', 'Huile de lame', 'Spray désinfectant', 'Brossette'],
      steps: [
        'Inspectez visuellement l’alignement de la lame mobile par rapport à la lame fixe sur votre clipper et votre trimmer.',
        'Exercez-vous 2 minutes à manipuler le levier latéral de la clipper uniquement avec le pouce sans changer la prise de main.',
        'Entraînez-vous à ouvrir et fermer vos ciseaux en ne bougeant que le pouce (lame supérieure parfaitement immobile).',
        'Exécutez le rituel fin-de-client : brossage des dents → pulvérisation désinfectante → temps de pose → essuyage → 3 gouttes d’huile.',
      ],
      validationCriteria: [
        'Aucune lame mobile ne dépasse les dents de la lame fixe.',
        'Le changement de position du levier est fluide d’une seule main.',
        'L’huile est déposée en 3 points (gauche, centre, droite) puis répartie machine allumée.',
      ],
    },
  },
  {
    id: 3,
    slug: 'guides-de-tondeuse-et-codes',
    title: 'Chapitre 3 – Les guides de tondeuse et les codes',
    shortTitle: 'Guides de tondeuse & codes',
    level: 'Intermédiaire',
    durationMinutes: 55,
    summaryIntro:
      'Décryptez le système universel des sabots (0 à #8), la mécanique exacte du levier (fermé, intermédiaires, ouvert), les demi-sabots et les gestes fondamentaux (C-motion, flick-out, cornering).',
    objectives: [
      'Associer instantanément chaque numéro de sabot (0 à #8) à sa longueur approximative en millimètres.',
      'Maîtriser les 5 positions du levier et calculer la continuité exacte entre deux sabots.',
      'Exécuter correctement le mouvement en C (C-motion), le flick-out et le travail sur les coins.',
      'Créer une ligne directrice propre puis l’effacer complètement sans monter trop haut.',
    ],
    heroImageId: 'toolsKit',
    heroCaption:
      'Fig. 3.1 — Jeu ordonné des guides de coupe : la maîtrise des sabots et des demi-sabots est le langage mathématique du dégradé.',
    diagramKind: 'clipper-simulator',
    sections: [
      {
        title: '1. Comprendre les numéros de sabots et leurs longueurs',
        paragraphs: [
          'Les sabots standards internationaux (système impérial américain adopté par Wahl, Andis, BaBylissPRO, Gamma+/StyleCraft, JRL) progressent par multiples d’un huitième de pouce (environ 3 mm par numéro entier). Toutefois, les longueurs exactes peuvent légèrement varier de ±0,5 mm selon les marques, l’épaisseur de la lame (Fade Blade plate vs Taper Blade striée) et le réglage interne du zéro.',
          'Utilisez le simulateur interactif et le tableau visuel ci-dessous pour expérimenter immédiatement chaque combinaison Sabot + Levier.',
        ],
        bulletPoints: [
          'Sans sabot (0) : ~0,5 mm fermé à ~1,5 mm ouvert (équivalent du #0.5 fermé).',
          'Demi-sabots (#0.5 = 1,5 mm et #1.5 = 4,5 mm) : ponts cruciaux pour effacer les démarcations sur cheveux afro.',
          'Sabots entiers (#1 = 3 mm, #2 = 6 mm, #3 = 10 mm, #4 = 13 mm, #5 = 16 mm, #6 = 19 mm, #7 = 22 mm, #8 = 25 mm).',
          'Attention aux variations constructeurs : vérifiez toujours la gravure en millimètres inscrite sur vos propres sabots.',
        ],
      },
      {
        title: '2. La mécanique du levier : fermé, intermédiaires et ouvert',
        paragraphs: [
          'Le levier latéral de votre clipper est ce qui transforme une coupe brute en un fondu artistique. Il déplace la lame mobile vers l’avant ou vers l’arrière sur une course d’environ 1 mm (parfois jusqu’à 1,5 mm sur certaines clippers à crans).',
        ],
        bulletPoints: [
          'Levier fermé (poussé vers le haut / fermé au maximum) : coupe la plus courte du sabot en place (ex. #1 fermé = 3,0 mm).',
          'Positions intermédiaires (quart-ouvert 25 %, demi-ouvert 50 %, trois-quarts 75 %) : permettent d’effacer progressivement une ligne sans créer de seconde marche.',
          'Levier ouvert (abaissé vers le bas) : ajoute environ +1,0 mm à la longueur du sabot (ex. #1 ouvert ≈ 4,0 mm, quasiment au niveau du #1.5 fermé).',
          'Principe de chevauchement : 0 ouvert ≈ #0.5 fermé ; #0.5 ouvert ≈ #1 fermé ; #1 ouvert ≈ #1.5 fermé.',
        ],
      },
      {
        title: '3. Gestes maîtres : C-Motion, Flick-Out, à plat et sur les angles',
        paragraphs: [
          'Deux barbiers utilisant exactement le même sabot n’obtiendront pas le même résultat : tout dépend de la trajectoire de la lame contre le crâne.',
        ],
        bulletPoints: [
          'Travail à plat : toute la semelle de la lame reste plaquée contre le cuir chevelu. Idéal pour dégrossir (debulking) ou poser une longueur uniforme (Buzz Cut), mais laisse une ligne nette si l’on s’arrête brusquement.',
          'Mouvement en C (C-motion) : la lame entre doucement en contact avec le cuir chevelu puis décrit un arc vers l’extérieur en quittant la tête. Empêche la formation de lignes dures.',
          'Flick-out : geste vif et contrôlé du poignet vers l’extérieur exactement au moment où la lame franchit une ligne de démarcation, afin de couper uniquement les cheveux qui dépassent de la transition.',
          'Travail sur les angles (Cornering) : incliner légèrement la tondeuse pour n’utiliser que les 2 ou 3 dents externes de la lame afin de gommer une petite zone sombre sans élargir le fade.',
        ],
      },
      {
        title: '4. Création et suppression méthodique des lignes de démarcation',
        paragraphs: [
          'La méthode la plus fiable pour les apprentis consiste à poser des lignes repères (guidelines) propres, régulières et parallèles, puis à les effacer dans un ordre discipliné du haut vers le bas ou du bas vers le haut.',
        ],
        bulletPoints: [
          'Règle des 3 étapes sur une ligne : commencer levier ouvert juste au-dessus de la ligne, refermer à mi-course sur la ligne, puis fermer presque entièrement uniquement sur le trait résiduel.',
          'Toujours brosser vers le bas avec la fade brush après chaque série de 3 coups pour évaluer le vrai résultat.',
          'Ne jamais poursuivre une ligne vers le haut : si un point résiste, baisser d’un demi-cran le levier et travailler uniquement avec le coin de la lame.',
        ],
      },
    ],
    concreteExamples: [
      {
        scenario: 'Une ligne sombre persiste entre la bande 0 ouvert et la bande #1 fermé sur un cheveu 4C.',
        diagnosis: 'Il existe un écart de 1,5 mm entre 0 ouvert (~1,5 mm) et #1 fermé (3,0 mm), très visible sur cheveux noirs denses.',
        action: 'Clipser le demi-sabot #0.5 : passer d’abord levier ouvert en flick-out, puis levier demi-ouvert, puis levier fermé uniquement sur les points sombres avec le coin de la lame.',
        result: 'La barre disparaît instantanément en un dégradé gris velouté.',
      },
      {
        scenario: 'En voulant connecter le côté (#1 ouvert) au dessus (#2 fermé), l’apprenti passe le #2 fermé trop vite et laisse une bordure sombre.',
        diagnosis: 'Transition incomplète entre 4 mm (#1 ouvert) et 6 mm (#2 fermé).',
        action: 'Utiliser le demi-sabot #1.5 levier ouvert (5,5 mm) puis fermé (4,5 mm) en mouvement en C vers l’extérieur.',
        result: 'Connexion invisible sans toucher à la hauteur du dessus.',
      },
    ],
    proTips: [
      'Écoutez votre tondeuse : le son de coupe (« crsssh ») vous indique immédiatement si la lame coupe encore la ligne ; quand le son disparaît, arrêtez de repasser au même endroit !',
      'Sur cheveux afro 4B/4C, les demi-sabots #0.5 et #1.5 ne sont pas des options — ce sont vos deux meilleurs alliés pour des fades de niveau master.',
      'Vérifiez toujours visuellement la position de votre levier avant de reposer la lame sur la tête.',
    ],
    commonMistakes: [
      'Passer du sabot #1 fermé directement au sabot #2 fermé sans ouvrir le levier ni utiliser le #1.5.',
      'Écraser la lame à plat en haut d’une bande au lieu de sortir en C-motion, créant une nouvelle ligne encore plus haute.',
      'Oublier que « levier en haut = fermé (court) » et « levier en bas = ouvert (long) ».',
    ],
    keyTakeaways: [
      'Chaque numéro de sabot entier ajoute environ 3 mm ; le levier ouvert ajoute environ +1 mm.',
      '0 ouvert rejoint #0.5 fermé ; #0.5 ouvert rejoint #1 fermé ; #1 ouvert rejoint #1.5 fermé.',
      'C-motion évite les lignes dures, Flick-out les gomme, Cornering corrige les détails localisés.',
    ],
    exercise: {
      title: 'Atelier pratique 3 : Gamme de sabots et contrôle du levier',
      duration: '25 min',
      objective: 'Automatiser le réflexe numéro ↔ millimètres et exécuter un geste en C fluide sur tête malléable ou à vide.',
      equipment: ['Clipper sans sabot', 'Jeu de sabots #0.5 à #8', 'Brosse de dégradé'],
      steps: [
        'Alignez vos sabots face cachée puis piochez-en un au hasard : annoncez son numéro, sa longueur en mm fermé/ouvert et son rôle.',
        'Sur le simulateur ci-dessus, testez les transitions 0 ouvert → #0.5 fermé → #0.5 ouvert → #1 fermé → #1.5 fermé.',
        'Entraînez votre poignet devant un miroir à réaliser 20 mouvements en C réguliers suivis de 20 flick-outs sur les 3 dents d’angle.',
        'Chronométrez un cycle complet : ouverture levier 100 % → 75 % → 50 % → 25 % → 0 % uniquement avec le pouce.',
      ],
      validationCriteria: [
        'Taux de réussite ≥ 90 % sur la reconnaissance des sabots #0.5 à #8.',
        'Le poignet décrit une courbe souple sans lever l’épaule.',
        'La correspondance entre levier ouvert et demi-sabot suivant est parfaitement comprise.',
      ],
    },
  },
  {
    id: 4,
    slug: 'maitriser-les-types-de-fade',
    title: 'Chapitre 4 – Maîtriser les différents types de fade',
    shortTitle: 'Les 10 types de fade',
    level: 'Intermédiaire',
    durationMinutes: 75,
    summaryIntro:
      'Formation complète sur les 10 dégradés fondamentaux de l’Afro Barbering : schéma interactif des zones crâniennes, hauteur, position des lignes, ordre des passages et finitions.',
    objectives: [
      'Distinguer visuellement et techniquement les 10 types de fade (Low, Mid, High, Skin, Bald, Taper, Drop, Burst, Temple, Shadow).',
      'Placer la première ligne directrice avec exactitude selon la morphologie crânienne.',
      'Suivre un protocole reproductible étape par étape pour éliminer toutes les démarcations.',
      'Contrôler la symétrie et la fluidité optique d’un dégradé avant la finition.',
    ],
    heroImageId: 'fadeMidDrop',
    heroCaption:
      'Fig. 4.0 — Anatomie d’un Mid Drop Fade maîtrisé : trois zones de valeur optique (peau/clair, gris moyen, masse sombre) sans cassure horizontale.',
    diagramKind: 'fade-blueprint',
    sections: [
      {
        title: '1. La logique universelle des 3 zones d’un dégradé',
        paragraphs: [
          'Quel que soit le type de fade parmi les 10 présentés dans ce chapitre, l’œil humain perçoit un dégradé réussi comme la fusion fluide de trois valeurs tonales : la zone claire (base 0 / peau / ombre claire), la zone grise de transition (0 ouvert à #1), et la zone sombre de poids (#1.5 à #2+ connectée au dessus).',
          'Ce qui distingue un Low Fade d’un Drop Fade ou d’un Burst Fade, c’est la géométrie et la hauteur de la première ligne directrice, ainsi que la largeur accordée à chaque bande de transition.',
        ],
        bulletPoints: [
          'Plus le fade est bas (Low / Taper / Temple), plus les bandes de transition doivent être étroites (0,5 à 1 cm) pour éviter de « manger » la masse.',
          'Plus le fade est haut (Mid / High / Bald), plus la rigueur verticale à la crête pariétale est capitale pour ne pas arrondir la tête.',
          'Un Drop Fade ou Burst Fade impose de suivre l’inclinaison courbe de la première ligne sur TOUS les sabots suivants.',
        ],
      },
      {
        title: '2. Explorateur interactif et fiches techniques des 10 Fades',
        paragraphs: [
          'Sélectionnez n’importe lequel des 10 dégradés dans le plan technique interactif ci-dessous pour visualiser instantanément le schéma des zones crâniennes, la photo du résultat final, les outils requis, le réglage du levier, l’ordre exact des passages et la technique de contrôle final.',
        ],
      },
    ],
    concreteExamples: [
      {
        scenario: 'Un client à la bosse occipitale très prononcée demande un Mid Skin Fade.',
        diagnosis: 'Si la ligne horizontale coupe droit à travers le haut de la bosse occipitale, l’arrière du crâne paraîtra plat et disproportionné.',
        action: 'Suggérer et appliquer un léger Drop derrière les oreilles pour faire passer la zone claire juste sous la bosse occipitale, conservant ainsi un profil arrière harmonieux.',
        result: 'Un profil équilibré et beaucoup plus naturel tout en respectant l’allure d’un Mid Skin Fade de face.',
      },
      {
        scenario: 'Un client sujet aux poils incarnés sur la nuque réclame un Skin Fade très propre.',
        diagnosis: 'Un passage agressif au shaver à blanc sur sa nuque risque de déclencher une poussée inflammatoire en 48 heures.',
        action: 'Proposer un Shadow Fade ou un Skin Fade limité au clipper 0 fermé / trimmer doux sans shaver sur la zone sensible de la nuque.',
        result: 'Rendu net, propre et élégant, sans aucune irritation post-coupe.',
      },
    ],
    proTips: [
      'Reculez d’un pas et plissez légèrement les yeux (technique du squint test) : les micro-taches sombres ou lignes mal fondues sautent immédiatement aux yeux.',
      'Travaillez les deux côtés de la tête en miroir étape par étape (ex. pose de la ligne 0 à gauche puis à droite) plutôt que de terminer entièrement un côté avant d’attaquer l’autre.',
      'Ne créez jamais la ligne de base au trimmer en enfonçant la lame à 90° : inversez la lame ou effleurez doucement pour faciliter son effacement.',
    ],
    commonMistakes: [
      'Élargir involontairement les bandes sur l’arrière, transformant un Low Fade en Mid Fade asymétrique.',
      'Passer le shaver jusqu’au trait exact du trimmer au lieu de s’arrêter 5 à 8 mm en dessous.',
      'Oublier de baisser l’oreille doucement avec la main libre pour dégrader proprement l’angle rétro-auriculaire.',
    ],
    keyTakeaways: [
      'Low, Mid et High définissent la HAUTEUR ; Skin, Bald et Shadow définissent la FINITION DE BASE ; Taper, Drop, Burst et Temple définissent la FORME GÉOMÉTRIQUE.',
      'La symétrie se contrôle en parallèle gauche/droite dès la première ligne directrice.',
      'Chaque fade repose sur la constance de largeur de bande, le C-motion et le brossage régulier.',
    ],
    exercise: {
      title: 'Atelier pratique 4 : Protocole complet d’un Mid Shadow Fade',
      duration: '45 min',
      objective: 'Exécuter un Mid Shadow Fade propre et symétrique en suivant les 6 étapes sans sauter de demi-sabot.',
      equipment: ['Clipper à levier', 'Trimmer', 'Sabots #0.5, #1, #1.5, #2', 'Brosse de dégradé', 'Peigne de coupe'],
      steps: [
        'Dégrossissez les côtés uniformément au sabot #2 fermé jusqu’à la crête pariétale.',
        'Tracez la ligne directrice médiane au clipper 0 fermé des deux côtés et vérifiez l’alignement dans le miroir.',
        'Ouvrez une bande régulière de 1,5 cm au 0 ouvert en C-motion, puis fondez la ligne basse au 0 demi-ouvert.',
        'Montez une bande de 1,5 cm au #1 ouvert, puis effacez la démarcation centrale avec le #0.5 (ouvert → demi → fermé).',
        'Connectez la zone supérieure au #1.5 puis au clipper-over-comb, brossez et passez le squint test dans le miroir.',
      ],
      validationCriteria: [
        'Hauteur parfaitement symétrique entre la tempe gauche et la tempe droite.',
        'Aucune ligne horizontale nette visible à 1 mètre dans le miroir.',
        'Transition fluide vers le volume du dessus sans entaille dans la crête pariétale.',
      ],
    },
  },
  {
    id: 5,
    slug: 'modeles-de-coiffure-afro',
    title: 'Chapitre 5 – Les différents modèles de coiffure afro',
    shortTitle: 'Modèles de coiffure afro',
    level: 'Intermédiaire',
    durationMinutes: 60,
    summaryIntro:
      'Explorez le catalogue complet des 15 coupes masculines afro incontournables : des classiques intemporels (Afro, Caesar, Buzz, Waves 360) aux textures modernes (Sponge Twists, Twist Out, Locks Taper) et finitions artistiques.',
    objectives: [
      'Reconnaître et nommer avec précision les 15 modèles majeurs de coiffure masculine afro.',
      'Associer chaque coiffure au profil capillaire adapté et au matériel exact nécessaire.',
      'Maîtriser les étapes clés de réalisation et le niveau de difficulté de chaque coupe.',
    ],
    heroImageId: 'styleWaves360',
    heroCaption:
      'Fig. 5.0 — Diversité des styles afro modernes : maîtrise du sens de pousse pour les Waves 360, volume sculpté pour les Afros, précision géométrique pour les finitions.',
    diagramKind: 'style-proportions',
    sections: [
      {
        title: '1. Quatre grandes familles de coiffures masculines afro',
        paragraphs: [
          'En salon professionnel, les demandes des clients se regroupent en quatre grandes familles stylistiques. Connaître les exigences techniques de chacune vous permet de proposer instantanément des variantes personnalisées selon l’âge, le métier, la morphologie et la routine d’entretien du client.',
        ],
        bulletPoints: [
          'Afro & Volume : Afro naturel, Afro court, Afro Low / Mid / High Fade — reposent sur le peignage afro, la sculpture freehand et l’équilibre de silhouette.',
          'Dégradés & Courts : Waves 360, Buzz Cut, Caesar Cut, French Crop — exigent une discipline stricte du sens de pousse et des contours impeccables.',
          'Textures & Twists : Sponge Twists, Twist Out, Dreadlocks avec Taper — demandent maîtrise des produits hydratants et protection absolue des racines.',
          'Artistique & Contours : Coiffure contours dessinés, Hard Part, Freestyle Design — valorisent la maîtrise millimétrée du trimmer et du rasoir.',
        ],
      },
      {
        title: '2. Catalogue pédagogique complet des 15 modèles',
        paragraphs: [
          'Chaque modèle ci-dessous dispose de sa photo de référence, sa description, son matériel exact, ses étapes détaillées, son niveau de difficulté et son profil de cheveux recommandé. Vous pouvez également parcourir et filtrer l’intégralité du catalogue depuis l’onglet « Galerie ».',
        ],
      },
    ],
    concreteExamples: [
      {
        scenario: 'Un client avec 1,5 cm de cheveux 4B demande des Sponge Twists immédiats.',
        diagnosis: 'La longueur (1,5 cm) est insuffisante pour former des spirales nettes à l’éponge : les cheveux risquent simplement de frisotter sans se torsader.',
        action: 'Conseiller un Afro court + Mid Fade aujourd’hui tout en laissant pousser le dessus 3 à 4 semaines pour atteindre 3 cm, moment idéal pour démarrer les Sponge Twists.',
        result: 'Le client apprécie votre franchise experte et reprend déjà rendez-vous pour le mois suivant.',
      },
      {
        scenario: 'Un client portant des dreadlocks depuis 3 ans veut un contour « bien propre devant ».',
        diagnosis: 'Zone frontale sensible : couper dans les repousses rattachées aux locks affinerait dangereusement la base des dreadlocks frontales.',
        action: 'Séparer méticuleusement chaque lock avec des pinces, ne nettoyer que les vrais baby hairs indépendants et réaliser un Taper propre sur les tempes.',
        result: 'Look frais et net qui préserve la santé à long terme des locks.',
      },
    ],
    proTips: [
      'Pour les Waves 360, gardez toujours un sabot d’un demi-cran plus long sur le tourbillon (crown) afin qu’il ne paraisse jamais clairsemé.',
      'Sur un Afro naturel ou High Top, utilisez un éclairage arrière ou un fond uni pour inspecter la régularité de la silhouette en freehand.',
      'Pour un Hard Part, ne dépassez jamais 2 à 3 mm de largeur : un trait fin fait toujours plus haut de gamme et vieillit mieux à la repousse.',
    ],
    commonMistakes: [
      'Couper des Waves 360 à contre-sens (against the grain) : détruit des mois de brossage en 10 secondes.',
      'Tourner l’éponge à twists tantôt dans le sens horaire, tantôt dans le sens antihoraire (défait les spires).',
      'Travailler un motif artistique sur des cheveux trop longs (> #2) où le dessin perd toute netteté.',
    ],
    keyTakeaways: [
      'Le choix d’un modèle réussit quand il respecte simultanément la texture, la longueur actuelle et le temps d’entretien du client.',
      'Chaque famille de coupe a sa règle d’or : sens de pousse pour les Waves, séchage complet pour le Twist Out, protection des racines pour les Locks.',
      'Les 15 fiches du catalogue servent de guide pas-à-pas directement applicable au fauteuil.',
    ],
    exercise: {
      title: 'Atelier pratique 5 : Prescription stylistique et protocole de coupe',
      duration: '25 min',
      objective: 'Sélectionner le modèle optimal pour 3 profils clients différents et rédiger la liste exacte du matériel et des sabots à préparer.',
      equipment: ['Catalogue des 15 modèles', 'Fiche sabots', 'Carnet'],
      steps: [
        'Profil A : cheveux très crépus, 4 cm sur le dessus, visage rond, style urbain moderne → sélectionnez la coupe et le fade adaptés.',
        'Profil B : cheveux crépus courts (1 cm), cadre en entreprise cherchant une coupe sobre facile à entretenir → sélectionnez coupe, sabot et finition.',
        'Profil C : cheveux bouclés, 6 cm sur le dessus, souhaite mettre ses boucles en valeur → sélectionnez coupe, outils et conseil soin.',
        'Vérifiez vos choix dans les fiches détaillées de la Galerie.',
      ],
      validationCriteria: [
        'La texture du profil correspond à la plage recommandée du modèle choisi.',
        'La hauteur du fade équilibre la forme du visage décrite.',
        'La liste d’outils est complète (machines + peignes/brosses + finition).',
      ],
    },
  },
  {
    id: 6,
    slug: 'techniques-de-coupe',
    title: 'Chapitre 6 – Les techniques de coupe étape par étape',
    shortTitle: 'Techniques de coupe',
    level: 'Intermédiaire',
    durationMinutes: 65,
    summaryIntro:
      'La chorégraphie complète d’une coupe afro professionnelle de A à Z : préparation, sectionnement crânien, lignes de base, dégradé, coupe du dessus, uniformisation, tempes, nuque, rasoir et nettoyage final.',
    objectives: [
      'Maîtriser les 13 étapes chronologiques d’une coupe masculine afro complète.',
      'Séparer proprement les zones crâniennes (plateau supérieur, crête pariétale, tempes, occiput, nuque).',
      'Combiner dégradé avec sabot, sans sabot, freehand et clipper-over-comb.',
      'Conclure par un contrôle miroir et un nettoyage final irréprochable.',
    ],
    heroImageId: 'beforeAfter',
    heroCaption:
      'Fig. 6.1 — Transformation complète réalisée selon la méthodologie en 13 étapes : structure du dessus, dégradé progressif, contours et nettoyage final.',
    diagramKind: 'head-sectioning',
    sections: [
      {
        title: 'Étapes 1 à 4 : Préparation, séparation, hauteur et lignes de base',
        paragraphs: [
          'Une coupe rapide et irréprochable ne vient pas de la vitesse de la main, mais de l’ordre logique des opérations. Chaque étape prépare la suivante sans jamais revenir en arrière inutilement.',
        ],
        bulletPoints: [
          '1. Préparation des cheveux : inspecter le cuir chevelu, nettoyer les résidus si besoin, démêler au peigne afro (volume) ou brosser dans le sens de pousse (court).',
          '2. Séparation des zones : repérer visuellement et au toucher la crête pariétale (séparant le dessus des côtés) et l’os occipital à l’arrière.',
          '3. Détermination de la hauteur du fade : marquer mentalement ou par trois petits points repères (tempe gauche, milieu nuque, tempe droite) la hauteur exacte convenue.',
          '4. Création des lignes de base : dégrossir d’abord les côtés au #2 ou #3 (debulking), puis tracer une première ligne directrice nette et symétrique.',
        ],
      },
      {
        title: 'Étapes 5 à 8 : Dégradé, transitions, coupe du dessus et uniformisation',
        paragraphs: [
          'Une fois la fondation posée, vous construisez le fondu puis la silhouette supérieure avec méthode.',
        ],
        bulletPoints: [
          '5. Dégradé sans sabot et avec sabot : ouvrir la bande 0 ouvert (C-motion), puis les bandes #1 et #1.5 selon le fade choisi.',
          '6. Travail des transitions : effacer les lignes dans l’ordre (0 demi/fermé, #0.5, #1.5) en brossant toutes les 3 passes et en utilisant les coins de la lame.',
          '7. Coupe du dessus : au sabot dans le sens ou contre-sens pour les coupes courtes ; au peigne afro + freehand ou aux ciseaux pour les afros et textures bouclées.',
          '8. Uniformisation des longueurs : connecter la crête pariétale en clipper-over-comb (tondeuse sur peigne) ou freehand pour éliminer tout effet « champignon ».',
        ],
      },
      {
        title: 'Étapes 9 à 13 : Contours, tempes, nuque, rasoir et nettoyage final',
        paragraphs: [
          'Les cinq dernières minutes font passer une bonne coupe au rang de coupe signature. C’est à ce stade que le client juge immédiatement la qualité de votre travail dans le miroir.',
        ],
        bulletPoints: [
          '9. Réalisation des contours : commencer par le centre du Front Line puis symétriser les angles extérieurs au trimmer.',
          '10. Travail des tempes : dessiner des Vertical Bars droites et des C-cups nets sans creuser.',
          '11. Finition de la nuque : nettoyer la base naturelle (carrée, arrondie ou fondue en taper) et retirer tout le duvet du cou.',
          '12. Utilisation du rasoir : appliquer un fin film de gel transparent, tendre la peau, passer la lame neuve à 30° en gestes courts et contrôlés.',
          '13. Nettoyage final : dépoussiérer visage/nuque au blaireau ou serviette propre, appliquer une lotion apaisante sans alcool agressif, présenter le résultat au miroir arrière à 360°.',
        ],
        figureId: 'techniqueLineup',
        figureCaption: 'Fig. 6.2 — Étapes 9 et 10 en action : stabilité de l’appui digital pour des contours frontaux et temporaux d’une précision millimétrée.',
      },
    ],
    concreteExamples: [
      {
        scenario: 'Après avoir terminé le dégradé des côtés, la transition entre le côté (#2) et un afro de 3 cm sur le dessus forme une marche visuelle.',
        diagnosis: 'Ligne de poids non connectée sur la crête pariétale.',
        action: 'Placer un peigne de coupe clair à la verticale contre le côté du crâne (sans suivre l’arrondi du sommet) et couper uniquement les pointes qui dépassent des dents avec la clipper.',
        result: 'Silhouette masculine droite et connexion parfaitement naturelle.',
      },
    ],
    proTips: [
      'Chronométrez vos blocs : 3 min consultation, 10 min préparation + dessus + debulking, 18 min fade et transitions, 8 min contours + rasoir, 3 min finition et nettoyage = 42 min maîtrisées.',
      'Prenez l’habitude de présenter le miroir à main en faisant pivoter le fauteuil lentement afin que le client voie ses deux profils et sa nuque.',
      'Une touche de lotion tonique ou d’après-rasage apaisant en fin de prestation laisse une signature sensorielle mémorable.',
    ],
    commonMistakes: [
      'Réaliser les contours frontaux AVANT d’avoir fini le dessus ou le fade (les cheveux coupés brouillent la ligne et vous devrez recommencer).',
      'Oublier de vérifier la symétrie derrière les oreilles (zone que le client verra chez lui ou sur les photos).',
      'Laisser des cheveux collés sur le cou ou les oreilles au moment de retirer la cape.',
    ],
    keyTakeaways: [
      'Suivre l’ordre strict Préparation → Dessus/Debulking → Fade → Connexion → Contours → Rasoir → Nettoyage supprime les oublis.',
      'La crête pariétale et l’os occipital sont vos deux boussoles anatomiques.',
      'La présentation finale au miroir 360° et le nettoyage impeccable clôturent l’expérience professionnelle.',
    ],
    exercise: {
      title: 'Atelier pratique 6 : Exécution chronométrée du protocole en 13 étapes',
      duration: '50 min',
      objective: 'Réaliser une coupe complète en cochant mentalement et dans l’ordre chacune des 13 étapes techniques.',
      equipment: ['Kit complet de coupe', 'Chronomètre', 'Miroir de contrôle arrière'],
      steps: [
        'Exécutez les étapes 1 à 4 (préparation, repères, debulking, ligne zéro) en visant moins de 12 minutes.',
        'Réalisez le dégradé et la connexion pariétale (étapes 5 à 8) en alternant brossage et contrôle miroir.',
        'Finalisez contours, tempes, nuque et rasoir sur gel transparent (étapes 9 à 12).',
        'Effectuez le nettoyage final, retirez la bande de cou et présentez le résultat à 360° (étape 13).',
      ],
      validationCriteria: [
        'Aucune étape n’a été inversée ou sautée.',
        'La connexion dessus/côtés est homogène des deux côtés.',
        'Cou, oreilles et front sont parfaitement propres au retrait de la cape.',
      ],
    },
  },
  {
    id: 7,
    slug: 'contours-et-finitions',
    title: 'Chapitre 7 – Les contours et les finitions',
    shortTitle: 'Contours & finitions',
    level: 'Avancé',
    durationMinutes: 55,
    summaryIntro:
      'L’art de la géométrie faciale afro : maîtrisez Line Up, Shape Up, Front Line, Temple Line (C-Cup), Neck Line, finitions à la lame et protection absolue de la ligne frontale naturelle.',
    objectives: [
      'Identifier et tracer les 5 zones clés des contours : Front Line, Vertical Bars, Temple Line (C-Cup), Tour d’oreille et Neck Line.',
      'Choisir entre contours naturels et contours géométriques selon le style et la densité du client.',
      'Obtenir un trait chirurgical au trimmer et au rasoir sans irritation ni recul artificiel (push back).',
    ],
    heroImageId: 'techniqueLineup',
    heroCaption:
      'Fig. 7.1 — Précision absolue du Line-Up : appui digital stable, lame T-Blade affleurante et respect intégral de la ligne naturelle du client.',
    diagramKind: 'lineup-geometry',
    sections: [
      {
        title: '1. Comprendre Line Up, Shape Up et les 5 zones de contours',
        paragraphs: [
          'En Afro Barbering, les contours (Line Up / Shape Up / Edge Up) constituent le cadre du tableau : même un dégradé parfait paraîtra inachevé si la bordure frontale est floue ou asymétrique. À l’inverse, un contour naturel et net illumine immédiatement le regard.',
        ],
        bulletPoints: [
          'Front Line (Ligne frontale) : ligne horizontale au sommet du front. On commence toujours par le centre (aligné sur l’arête du nez) puis on progresse symétriquement vers la gauche et la droite.',
          'Vertical Bars (Barres verticales) : deux segments verticaux courts reliant les extrémités du Front Line aux tempes, formant un angle propre à ~90°.',
          'Temple Line / C-Cup : courbe harmonieuse en croissant qui descend de la barre verticale jusqu’à la pointe du favori devant l’oreille.',
          'Tour d’oreille : dégagement délicat aux 2 dents d’angle du trimmer en maintenant l’oreille légèrement pliée.',
          'Neck Line (Ligne de nuque) : finition carrée, arrondie ou fondue en taper à la base de la nuque, toujours centrée sur la colonne cervicale.',
        ],
      },
      {
        title: '2. Contours naturels vs contours géométriques',
        paragraphs: [
          'Tous les clients ne souhaitent pas la même intensité de contour. Un maître barbier adapte son trait à la personnalité, au métier et surtout à l’implantation capillaire réelle.',
        ],
        bulletPoints: [
          'Contours naturels : nettoyent uniquement les petits cheveux qui dépassent de la bordure naturelle, avec des angles légèrement adoucis. Repousse très discrète et entretien minimal.',
          'Contours géométriques : lignes ultra-nettes, angles francs et C-cups prononcés, particulièrement spectaculaires sur textures 4A–4C denses associées à un Fade ou des Waves 360.',
        ],
      },
      {
        title: '3. Prévenir le « Push Back » (recul artificiel de la ligne frontale)',
        paragraphs: [
          'Le push back est l’erreur la plus redoutée et la plus impardonnable en barbering afro. Elle consiste à remonter la ligne frontale de 5 à 15 mm dans les cheveux sains pour tenter de la rendre parfaitement droite ou pour masquer un golfe temporal dégarni.',
          'Conséquence catastrophique : dès le troisième jour de repousse, une ombre grise disgracieuse réapparaît sur le front, forçant le client à reculer sa ligne à chaque visite.',
        ],
        bulletPoints: [
          'Règle absolue : toujours positionner le Front Line sur les cheveux les plus bas et denses de la bordure naturelle, en ne retirant que 1 à 2 mm de duvet irrégulier.',
          'Si un coin temporal est naturellement légèrement plus clairsemé, NE JAMAIS remonter toute la ligne pour l’aligner : adoucir délicatement l’angle et conserver l’implantation réelle.',
          'Avant de tracer, brosser vers le bas et couper à ras (sabot #1 ou #1.5 dans le sens de pousse) les longs cheveux qui retombent sur le front afin de voir la VRAIE racine.',
        ],
      },
      {
        title: '4. Finitions à la lame (Shavette) sans irritation',
        paragraphs: [
          'Le passage du rasoir après le trimmer retire les micro-poils invisibles et crée cet effet de contraste propre qui dure plusieurs jours — à condition de respecter une mécanique douce.',
        ],
        bulletPoints: [
          'Préparer la zone avec une fine couche de gel de rasage transparent (vous devez voir parfaitement la ligne à travers le gel).',
          'Tendre la peau fermement mais sans douleur vers le haut/l’extérieur avec deux doigts de la main libre.',
          'Poser la lame neuve à un angle plat de 30° maximum et effectuer de petits gestes glissés courts (1 à 2 cm), jamais d’appui sec vertical.',
          'Essuyer immédiatement avec une serviette propre et appliquer une lotion apaisante/astringente (hamamélis ou pierre d’alun) pour refermer les pores.',
        ],
      },
    ],
    concreteExamples: [
      {
        scenario: 'Un client présente un golfe temporal droit légèrement plus haut de 4 mm que le gauche.',
        diagnosis: 'Asymétrie naturelle très fréquente ; aligner le côté gauche sur le droit reculerait inutilement sa ligne frontale.',
        action: 'Aligner le Front Line sur la ligne centrale naturelle, garder le coin gauche intact et effleurer très subtilement le duvet du coin droit pour un équilibre optique sans push back.',
        result: 'Ligne naturelle, repousse propre et client reconnaissant de ne pas avoir été « reculé ».',
      },
    ],
    proTips: [
      'Un voile léger de spray fixant (holding spray) séché 10 secondes à l’air froid fige les micro-cheveux sur le front avant le trimmer : la coupe est deux fois plus nette dès le premier passage.',
      'Tapotez (tapping) le Front Line au lieu de frotter la lame de gauche à droite : zéro trace rouge sur le front.',
      'Contrôlez systématiquement l’horizontalité du Front Line dans le miroir face au client (la tête parfaitement droite, menton à niveau).',
    ],
    commonMistakes: [
      'Appuyer la lame T-Blade sur le front comme un tampon encreur (brûlure cutanée et croûtes en 24h).',
      'Raser à sec sans gel ni préparation cutanée.',
      'Incliner la tête du client sur le côté pendant le tracé du Front Line (résultat garanti de travers).',
    ],
    keyTakeaways: [
      'Toujours démarrer le Front Line au centre du front et travailler en symétrie vers les extrémités.',
      'Respecter l’implantation naturelle est sacré : jamais de push back.',
      'Trimmer léger par tapotements + gel transparent + lame neuve à 30° + peau tendue = précision sans irritation.',
    ],
    exercise: {
      title: 'Atelier pratique 7 : Maîtrise de l’angle 30° et symétrie du Line-Up',
      duration: '30 min',
      objective: 'Développer la légèreté de pression au rasoir (exercice du ballon) et le tracé symétrique du Front Line et des C-Cups.',
      equipment: ['Ballon de baudruche gonflé', 'Mousse ou gel de rasage', 'Rasoir shavette + demi-lame neuve', 'Trimmer (sur tête malléable ou modèle)'],
      steps: [
        'Recouvrez un ballon gonflé d’une fine couche de mousse à raser.',
        'Rasez intégralement la mousse avec votre shavette tenue à 30° en gestes courts et souples SANS éclater le ballon (test ultime de légèreté et d’angle).',
        'Sur tête malléable ou modèle, identifiez le centre exact du front aligné avec l’arête nasale.',
        'Tracez le Front Line du centre vers les bords par légers tapotements, puis les Vertical Bars et les C-cups.',
      ],
      validationCriteria: [
        'Le ballon reste intact sur toute la surface rasée.',
        'La ligne frontale reste alignée à moins de 1–2 mm de l’implantation naturelle.',
        'Aucune rougeur ni irritation sur le front ou les tempes.',
      ],
    },
  },
  {
    id: 8,
    slug: 'hygiene-securite-entretien',
    title: 'Chapitre 8 – Hygiène, sécurité et entretien',
    shortTitle: 'Hygiène, sécurité & entretien',
    level: 'Avancé',
    durationMinutes: 50,
    summaryIntro:
      'Standards sanitaires professionnels du salon : désinfection rigoureuse des tondeuses et lames, gestion sécurisée des lames DASRI, prévention des infections croisées et des irritations (PFB).',
    objectives: [
      'Appliquer un protocole irréprochable de désinfection des tondeuses, peignes, sabots et surfaces entre chaque client.',
      'Gérer en toute sécurité les lames de rasoir à usage unique et les incidents éventuels (micro-coupure).',
      'Prévenir efficacement les infections croisées (teigne, folliculite, virus transmissibles par le sang) et les poils incarnés.',
    ],
    heroImageId: 'heroStation',
    heroCaption:
      'Fig. 8.1 — L’hygiène visible rassure immédiatement : bocal désinfectant limpide, lames propres, serviettes fraîches et comptoir assaini entre chaque client.',
    diagramKind: 'hygiene-cycle',
    sections: [
      {
        title: '1. Comprendre les 3 niveaux d’hygiène : Nettoyage, Désinfection, Stérilisation',
        paragraphs: [
          'En salon de coiffure afro, la rigueur sanitaire protège autant votre clientèle que votre propre santé et votre réputation. Une seule contamination fongique (teigne du cuir chevelu) ou bactérienne (staphylocoque, folliculite) suffit à ruiner durablement la confiance d’un quartier entier.',
        ],
        bulletPoints: [
          'Nettoyage (étape 1 obligatoire) : élimination mécanique des cheveux, poussières, sébum et produits à la brossette et à l’eau savonneuse. On ne peut jamais désinfecter un outil sale.',
          'Désinfection (étape 2 systématique entre chaque client) : destruction des bactéries, champignons et virus sur les surfaces non poreuses grâce à un produit homologué (normes EN 14476 / bactéricide, fongicide, virucide) en respectant le temps de pose.',
          'Usage unique (étape 3 incontournable) : les demi-lames de rasoir, bandes de cou papier et gants sont strictement à USAGE UNIQUE et jetés immédiatement après un client.',
        ],
      },
      {
        title: '2. Protocole de désinfection des tondeuses, lames et accessoires',
        paragraphs: [
          'Entre deux clients, un rituel rodé de 3 minutes garantit un matériel sain, frais et performant toute la journée.',
        ],
        bulletPoints: [
          'Tondeuses (Clipper / Trimmer) : brosser vigoureusement les dents → pulvériser le spray désinfectant 5-en-1 sur toute la tête de coupe → laisser agir le temps indiqué (généralement 3 à 5 min) → essuyer sur papier propre → lubrifier avec 3 gouttes d’huile.',
          'Shaver : retirer la tête à grilles, tapoter et brosser les résidus, vaporiser du désinfectant sur la grille et les couteaux, laisser sécher complètement à l’air libre.',
          'Peignes, sabots et porte-lames : laver à l’eau chaude savonneuse → rincer → immerger 10 minutes dans le bocal Barbicide (renouvelé chaque matin) → rincer si nécessaire et sécher sur serviette propre.',
          'Démontage hebdomadaire : une fois par semaine, dévisser les têtes de coupe de vos clippers et trimmers pour éliminer les amas de cheveux cachés sous le guide-lame, puis réaligner avec précision.',
        ],
      },
      {
        title: '3. Gestion des lames jetables et sécurité au rasoir',
        paragraphs: [
          'Une lame de rasoir utilisée peut contenir des traces microscopiques de sang même en l’absence de coupure visible. Elle constitue un déchet à risque infectieux (DASRI).',
        ],
        bulletPoints: [
          'Toujours ouvrir l’enveloppe papier d’une lame neuve DEVANT le client pour lui montrer concrètement votre exigence sanitaire.',
          'Ne jamais casser ou manipuler une lame à mains nues sans protection papier : plier la double lame dans son emballage papier d’origine avant de l’insérer dans la shavette.',
          'Jeter immédiatement la lame usagée dans un collecteur jaune rigide anti-perforation (boîte DASRI) — JAMAIS dans la poubelle classique.',
          'En cas de micro-coupure accidentelle : garder son calme, enfiler des gants si ce n’est déjà fait, tamponner avec une compresse propre et un produit hémostatique/antiseptique (jamais de bâton d’alun réutilisé directement sur une plaie sanglante — utiliser de la poudre ou un tampon à usage unique), puis désinfecter immédiatement l’outil.',
        ],
      },
      {
        title: '4. Prévention des irritations, poils incarnés (PFB) et nettoyage du poste',
        paragraphs: [
          'Les peaux noires et cheveux très crépus présentent une prédisposition anatomique à la pseudofolliculite de la barbe et de la nuque (boutons de rasage / razor bumps) lorsque le poil recourbé est coupé sous le niveau de l’épiderme.',
        ],
        bulletPoints: [
          'Adapter l’outil à la peau : privilégier un Shadow Fade ou un trimmer doux plutôt que le shaver ou la lame à rebrousse-poil chez les clients ayant des boutons sur la nuque.',
          'Réduire la pression mécanique et éviter de repasser 10 fois sur la même zone de peau sèche.',
          'Nettoyage du poste après chaque client : balayer immédiatement les cheveux au sol, désinfecter les accoudoirs et l’appuie-tête du fauteuil, essuyer le plan de travail, changer la serviette et la cape.',
        ],
      },
    ],
    concreteExamples: [
      {
        scenario: 'Lors de la consultation, vous observez de petites plaques squameuses circulaires avec perte de cheveux localisée sur le cuir chevelu d’un enfant.',
        diagnosis: 'Suspicion sérieuse de mycose / teigne du cuir chevelu (très contagieuse par les tondeuses et peignes).',
        action: 'Avec tact, discrétion et bienveillance, expliquer aux parents que la coupe ne peut pas être réalisée avant avis médical/dermatologique pour la sécurité de l’enfant et des autres clients, et se laver soigneusement les mains.',
        result: 'Protection sanitaire complète du salon et posture de professionnel responsable.',
      },
    ],
    proTips: [
      'Ayez deux jeux complets de peignes et de sabots : pendant qu’un jeu trempe 10 minutes dans le bocal désinfectant, le second jeu propre et sec est prêt à l’emploi.',
      'Ouvrez et chargez toujours la lame neuve de votre shavette dans le champ de vision du client : ce geste silencieux crée une confiance immense.',
      'Appliquez toujours un soin apaisant sans alcool fort (ou à base d’hamamélis / aloe vera) après un rasage sur peau sensible.',
    ],
    commonMistakes: [
      'Réutiliser une demi-lame en la passant simplement sous un spray désinfectant (STRICTEMENT INTERDIT).',
      'Utiliser un bocal de Barbicide trouble, rempli de cheveux au fond et vieux de plusieurs jours.',
      'Essuyer le front de deux clients différents avec la même serviette.',
    ],
    keyTakeaways: [
      'Nettoyer d’abord, désinfecter ensuite, respecter le temps de contact.',
      'Une lame de rasoir = un seul client → collecteur rigide DASRI.',
      'La prévention des poils incarnés (PFB) passe par la douceur, la tension cutanée et le refus du rasage agressif sur peau irritée.',
      'Le nettoyage visible du fauteuil et du poste fait partie intégrante de la qualité perçue.',
    ],
    exercise: {
      title: 'Atelier pratique 8 : Audit sanitaire complet d’un poste de travail',
      duration: '20 min',
      objective: 'Exécuter sans faute le cycle complet de désinfection inter-clients en moins de 3 minutes.',
      equipment: ['Spray désinfectant', 'Bocal Barbicide', 'Brossette', 'Huile', 'Lingettes surfaces', 'Boîte DASRI'],
      steps: [
        'Simulez la fin d’une prestation complète (clipper, trimmer, shaver, shavette, 2 peignes, 3 sabots).',
        'Éjectez en toute sécurité la lame fictive/usagée vers la boîte rigide sans toucher le tranchant.',
        'Nettoyez mécaniquement puis désinfectez machines, peignes et sabots en vérifiant les temps de contact.',
        'Désinfectez l’appuie-tête, les accoudoirs du fauteuil et le comptoir, puis préparez un poste vierge pour le client suivant.',
      ],
      validationCriteria: [
        'Aucun cheveu résiduel sur les lames, peignes, accoudoirs ou sol.',
        'Manipulation sécurisée à 100 % de la shavette et du collecteur DASRI.',
        'Temps total du cycle maîtrisé sous les 3 minutes.',
      ],
    },
  },
  {
    id: 9,
    slug: 'pratique-professionnelle-relation-client',
    title: 'Chapitre 9 – Pratique professionnelle et relation client',
    shortTitle: 'Pratique pro & relation client',
    level: 'Avancé',
    durationMinutes: 55,
    summaryIntro:
      'Transformez votre maîtrise technique en carrière florissante : accueil premium, écoute et conseil, gestion des attentes, fidélisation, photographie de portfolio, tarification rentable et développement d’activité.',
    objectives: [
      'Structurer une expérience client fluide qui transforme un visiteur de passage en client fidèle.',
      'Gérer calmement les attentes irréalistes et les retours clients avec diplomatie.',
      'Photographier proprement vos coupes et construire un portfolio cohérent et crédible.',
      'Calculer des tarifs rentables et développer durablement votre réputation de barber.',
    ],
    heroImageId: 'beforeAfter',
    heroCaption:
      'Fig. 9.1 — Documentation Avant / Après de qualité portfolio : éclairage constant, cadrage propre, fond neutre et mise en valeur honnête du travail technique.',
    diagramKind: 'client-journey',
    sections: [
      {
        title: '1. Recevoir, comprendre la demande et conseiller avec autorité',
        paragraphs: [
          'La technique attire un client une première fois ; la qualité de la relation humaine et la constance du résultat le font revenir toutes les deux semaines pendant des années.',
          'Dès son entrée, saluez le client par son nom s’il a réservé, regardez-le dans les yeux, proposez-lui de s’installer et consacrez-lui une écoute totale sans consulter votre téléphone.',
        ],
        bulletPoints: [
          'Poser des questions ouvertes : « Qu’avez-vous aimé ou moins aimé sur votre dernière coupe ? », « Combien de temps passez-vous le matin à vous coiffer ? ».',
          'Reformuler clairement avant de démarrer : « On part donc sur un Mid Drop Fade à blanc, on égalise le dessus sans trop réduire vos twists, et on garde un contour naturel ? ».',
          'Gérer les attentes réalistes : si un client montre une photo d’un modèle à texture 3B alors qu’il a un cheveu 4C ou des tempes clairsemées, expliquez avec tact ce qui rendra le mieux sur SA texture sans jamais dévaloriser son cheveu.',
        ],
      },
      {
        title: '2. Fidéliser les clients et garantir la régularité',
        paragraphs: [
          'Les meilleurs barbiers remplissent 80 % de leur agenda grâce aux clients réguliers. La fidélisation ne repose pas sur des rabais permanents, mais sur la fiabilité et l’attention aux détails.',
        ],
        bulletPoints: [
          'Tenir une fiche client (numérique ou carnet) notant ses sabots habituels, son type de fade, ses épis et sa sensibilité cutanée.',
          'Respecter strictement les horaires de rendez-vous : la ponctualité est un signe majeur de respect.',
          'Proposer le prochain rendez-vous au moment du règlement (« Pour garder ce fondu impeccable, on se revoit dans 2 ou 3 semaines ? »).',
          'Offrir une petite valeur ajoutée constante : serviette chaude rapide, conseil produit honnête, finition impeccable des oreilles et des sourcils si demandé.',
        ],
      },
      {
        title: '3. Photographier son travail et constituer un portfolio professionnel',
        paragraphs: [
          'Votre portfolio est votre CV visuel permanent. Inutile d’avoir un appareil photo coûteux : un smartphone moderne bien maîtrisé avec un bon éclairage suffit pour produire des clichés de niveau académie.',
        ],
        bulletPoints: [
          'Toujours demander l’accord explicite du client avant de prendre ou publier une photo ou vidéo.',
          'Lumière : placer une source LED douce (ring light ou panneau neutre 5000K) à 45° du visage pour révéler les transitions du dégradé sans écraser les reliefs.',
          'Arrière-plan propre : fond sombre ou neutre dégagé (éviter les poubelles, câbles ou serviettes froissées derrière le client).',
          'Cadrage et honnêteté : nettoyer chaque miette de cheveu sur le visage et les épaules, photographier en 3/4 profil et de face, et éviter les filtres excessifs ou retouches mensongères.',
          'Variété du portfolio : présenter au moins 12 coupes diversifiées (Low, Mid, High, Taper, Waves, Afro, Locks, Avant/Après).',
        ],
      },
      {
        title: '4. Fixer ses prix et développer son activité de barber',
        paragraphs: [
          'Fixer un prix trop bas par peur de manquer de clients est un piège classique : vous travaillez dans l’urgence, vos coupes perdent en qualité et vous vous épuisez sans pouvoir investir dans votre matériel ni votre formation.',
        ],
        bulletPoints: [
          'Calculer ses coûts réels : loyer/commission fauteuil, consommables (lames, bandes de cou, désinfectants, gels, gants), entretien des machines, charges sociales, temps passé (ex. 45 min) et rémunération cible.',
          'Structurer une carte claire : Coupe simple / Dégradé, Coupe + Barbe, Entretien Contours (Line-Up), Pack Premium (Coupe + Barbe + Serviette chaude & soin).',
          'Augmenter ses tarifs par paliers quand votre agenda dépasse 85 % de remplissage constant, en prévenant vos clients 30 jours à l’avance.',
          'Développer sa visibilité : fiche Google Business avec vrais avis clients, publications régulières (2 à 3 photos/vidéos pédagogiques par semaine), système de réservation en ligne simple et bouche-à-oreille irréprochable.',
        ],
      },
    ],
    concreteExamples: [
      {
        scenario: 'Un client semble hésitant devant le miroir final et dit : « C’est bien, mais je trouve le côté droit un poil plus foncé ».',
        diagnosis: 'Moment de vérité de la relation client : se vexer ou contester détruit la confiance.',
        action: 'Remercier le client pour son œil attentif, réorienter le fauteuil vers la lumière, vérifier objectivement, affiner la zone en 2 minutes au #0.5 sur le coin de lame, puis revalider.',
        result: 'Le client repart rassuré, impressionné par votre humilité professionnelle, et devient un ambassadeur fidèle.',
      },
    ],
    proTips: [
      'Un client satisfait à qui vous demandez gentiment un avis Google juste après son sourire devant le miroir vous apporte en moyenne 3 à 5 nouveaux clients dans l’année.',
      'Comparez vos propres photos d’il y a 3 mois avec celles d’aujourd’hui : le portfolio est aussi votre meilleur outil d’auto-évaluation.',
      'Continuez à vous former chaque année (nouvelles lames, textures, soins du cuir chevelu) : la maîtrise n’a jamais de plafond.',
    ],
    commonMistakes: [
      'Regarder son téléphone ou discuter longuement avec des collègues en oubliant le client assis au fauteuil.',
      'Publier des photos floues, mal éclairées ou avec des cheveux coupés sur le front du client.',
      'Copier les tarifs du salon le moins cher de la rue sans calculer sa propre rentabilité horaire.',
    ],
    keyTakeaways: [
      'Accueil, écoute active, reformulation et ponctualité créent une fidélité durable.',
      'Un portfolio réussi combine éclairage propre, fond neutre, diversité de coupes et honnêteté technique.',
      'Des tarifs calculés sur vos coûts réels et votre temps garantissent une qualité constante et une carrière pérenne.',
    ],
    exercise: {
      title: 'Atelier pratique 9 : Grille tarifaire et plan de portfolio',
      duration: '30 min',
      objective: 'Concevoir votre première carte de prestations chiffrée et planifier vos 10 premières photos de portfolio.',
      equipment: ['Calculatrice', 'Smartphone', 'Carnet professionnel'],
      steps: [
        'Définissez 4 prestations claires (Coupe Fade, Coupe + Barbe, Line-Up, Formule Premium) avec leur durée exacte en minutes.',
        'Calculez le coût des consommables par client (lame, bande de cou, gants, désinfectant, produits) et fixez un tarif horaire cohérent.',
        'Listez les 10 coupes représentatives que vous souhaitez photographier (dont 2 Avant/Après) avec les 3 angles à capturer (face, 3/4 profil, nuque).',
        'Rédigez votre script d’accueil et de consultation en 4 phrases simples.',
      ],
      validationCriteria: [
        'Chaque prestation associe une durée réaliste et un tarif couvrant les frais + la rémunération.',
        'Le plan de portfolio couvre plusieurs hauteurs de fade et textures afro.',
        'Le script d’accueil inclut la validation explicite avant le premier coup de tondeuse.',
      ],
    },
  },
];
