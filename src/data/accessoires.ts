// Accessoires — priorité 19. Catalogue (armes, mobilier, objets anciens).
// Vignette colorée par catégorie (initiale), pas d'image externe (offline/CSP).

export type AccessoireCategorie = 'Armes' | 'Mobilier' | 'Objets anciens';

export interface Accessoire {
  id: string;
  nom: string;
  categorie: AccessoireCategorie;
  initiale: string;
  description: string;
  epoque?: string;
  pieces?: string; // pièces / usages emblématiques
}

export const ACCESSOIRE_COULEUR: Record<AccessoireCategorie, string> = {
  'Armes': '#9e2b3a',
  'Mobilier': '#b0784a',
  'Objets anciens': '#7a6fae',
};

export const ACCESSOIRES: Accessoire[] = [
  // ─── Armes ───
  { id: 'epee', nom: 'Épée', categorie: 'Armes', initiale: 'É', epoque: 'XVIe–XVIIe',
    description: "L'arme noble du gentilhomme, portée au côté. Symbole d'honneur, elle tranche les querelles autant que les cœurs.", pieces: 'Le Cid, Hernani' },
  { id: 'rapiere', nom: 'Rapière', categorie: 'Armes', initiale: 'R', epoque: 'XVIIe',
    description: "Longue épée fine à garde ouvragée, arme des duellistes et des bretteurs virtuoses.", pieces: 'Cyrano de Bergerac' },
  { id: 'poignard', nom: 'Poignard / Dague', categorie: 'Armes', initiale: 'P',
    description: "Lame courte de l'assassinat et de la trahison, dissimulée sous les manteaux ; arme intime du crime.", pieces: 'Macbeth, Lorenzaccio, Jules César' },
  { id: 'fleuret', nom: "Fleuret d'escrime", categorie: 'Armes', initiale: 'F',
    description: "Épée mouchetée à lame souple, pour l'assaut et l'entraînement — le duel réglé et sportif sur scène.", pieces: 'Hamlet (le duel final)' },
  { id: 'pistolet', nom: 'Pistolet à silex', categorie: 'Armes', initiale: 'P', epoque: 'XVIIIe–XIXe',
    description: "Arme à feu de poing, chargée par le canon. Objet fatal des drames bourgeois et des dénouements tragiques.", pieces: 'Hedda Gabler (les pistolets du général)' },
  { id: 'mousquet', nom: 'Mousquet / Arquebuse', categorie: 'Armes', initiale: 'M', epoque: 'XVIe–XVIIe',
    description: "Longue arme à feu des soldats et des gardes, lourde et spectaculaire, qui gronde dans les scènes de guerre.", pieces: 'Drames historiques' },
  { id: 'hallebarde', nom: 'Hallebarde', categorie: 'Armes', initiale: 'H',
    description: "Arme d'hast des gardes et des sentinelles ; sa seule présence dit l'autorité et la menace.", pieces: 'Gardes de tragédie' },
  { id: 'lance', nom: 'Lance / Pique', categorie: 'Armes', initiale: 'L', epoque: 'Antiquité–Moyen Âge',
    description: "Arme d'hast des guerriers antiques et des piquiers, dressée en forêt pour les armées.", pieces: 'Tragédies antiques, épopées' },
  { id: 'bouclier', nom: 'Bouclier', categorie: 'Armes', initiale: 'B', epoque: 'Antiquité',
    description: "Protection du combattant, souvent orné d'emblèmes ; attribut des héros grecs et romains.", pieces: 'Tragédies grecques et romaines' },
  { id: 'sabre', nom: 'Sabre / Cimeterre', categorie: 'Armes', initiale: 'S',
    description: "Lame courbe de l'Orient, évoquant sérails et sultans dans le théâtre à sujet oriental.", pieces: 'Bajazet, Mahomet' },
  { id: 'baton', nom: 'Bâton / Gourdin', categorie: 'Armes', initiale: 'B',
    description: "L'arme de la farce et de la bastonnade, ressort comique par excellence des valets et des trompeurs.", pieces: 'Les Fourberies de Scapin (le sac)' },
  { id: 'hache', nom: 'Hache / Coutelas', categorie: 'Armes', initiale: 'H',
    description: "Arme brutale du bourreau et des massacres, chargée d'effroi tragique.", pieces: 'Macbeth, drames sanglants' },
  { id: 'arc', nom: 'Arc et flèches', categorie: 'Armes', initiale: 'A', epoque: 'Antiquité',
    description: "Arme des chasseurs et des dieux (Apollon, Cupidon) ; entre légende et amour, la flèche qui frappe.", pieces: 'Mythologie, pastorales' },

  // ─── Mobilier ───
  { id: 'trone', nom: 'Trône', categorie: 'Mobilier', initiale: 'T',
    description: "Siège du pouvoir, souvent surélevé, autour duquel gravitent complots et ambitions. Le meuble-symbole de la tragédie royale.", pieces: 'Britannicus, Macbeth, Ruy Blas' },
  { id: 'fauteuil', nom: 'Fauteuil / Bergère', categorie: 'Mobilier', initiale: 'F',
    description: "Siège confortable à accoudoirs, refuge des maîtres de maison. Le fauteuil d'Argan est presque un personnage.", pieces: 'Le Malade imaginaire' },
  { id: 'table', nom: 'Table', categorie: 'Mobilier', initiale: 'T',
    description: "Autour d'elle on soupe, on complote, on signe. La grande table de festin ou la table qui cache un espion.", pieces: 'Tartuffe (la scène de la table), Dom Juan' },
  { id: 'lit', nom: 'Lit à baldaquin', categorie: 'Mobilier', initiale: 'L',
    description: "Meuble de l'intimité et de la maladie, des naissances et des morts ; cadre des confidences et des scènes de nuit.", pieces: 'Une maison de poupée' },
  { id: 'coffre', nom: 'Coffre', categorie: 'Mobilier', initiale: 'C',
    description: "Grande caisse de rangement… et cachette idéale : on s'y dissimule pour surprendre ou pour fuir.", pieces: 'Hernani (le placard) ' },
  { id: 'paravent', nom: 'Paravent', categorie: 'Mobilier', initiale: 'P',
    description: "Cloison mobile derrière laquelle on se cache, on écoute, on se déshabille : ressort inépuisable de la comédie de quiproquos.", pieces: 'Vaudevilles, comédies' },
  { id: 'cassette', nom: 'Cassette', categorie: 'Mobilier', initiale: 'C',
    description: "Petit coffre fermé à clé où l'on serre son or et ses secrets. La cassette d'Harpagon est le cœur de sa folie.", pieces: "L'Avare (« Ma cassette ! »)" },
  { id: 'prie-dieu', nom: 'Prie-Dieu', categorie: 'Mobilier', initiale: 'P',
    description: "Meuble de dévotion à genoux, attribut des dévots — vrais ou faux, comme l'hypocrite Tartuffe.", pieces: 'Tartuffe' },
  { id: 'gueridon', nom: 'Guéridon', categorie: 'Mobilier', initiale: 'G',
    description: "Petite table ronde des salons, où l'on pose bougeoir, lettres et tasses ; discret mais omniprésent.", pieces: 'Comédies de salon' },
  { id: 'banc', nom: 'Banc / Escabeau', categorie: 'Mobilier', initiale: 'B',
    description: "Siège simple des scènes populaires et champêtres, ou marchepied pratique pour les valets.", pieces: 'Scènes rustiques, farces' },
  { id: 'secretaire', nom: 'Secrétaire / Bureau', categorie: 'Mobilier', initiale: 'S',
    description: "Meuble d'écriture à tiroirs et cachettes, où se rédigent et se dissimulent lettres compromettantes et testaments.", pieces: 'Drames bourgeois, intrigues épistolaires' },
  { id: 'berceau', nom: 'Berceau', categorie: 'Mobilier', initiale: 'B',
    description: "Objet des reconnaissances : l'enfant échangé ou retrouvé, ressort classique du dénouement de comédie.", pieces: 'Comédies à reconnaissance' },
  { id: 'buffet', nom: 'Buffet / Console', categorie: 'Mobilier', initiale: 'B',
    description: "Meuble d'apparat contre le mur, garni de vaisselle et d'argenterie ; il pose le rang de la maison.", pieces: 'Intérieurs bourgeois' },

  // ─── Objets anciens ───
  { id: 'chandelier', nom: 'Chandelier / Bougeoir', categorie: 'Objets anciens', initiale: 'C',
    description: "La lumière tremblante des scènes nocturnes ; on souffle la bougie pour changer d'acte ou masquer un crime.", pieces: 'Le Chandelier (Musset), Macbeth' },
  { id: 'eventail', nom: 'Éventail', categorie: 'Objets anciens', initiale: 'É',
    description: "Accessoire de la coquette et de la précieuse : il cache un sourire, souligne un dépit, envoie un signal.", pieces: "Le Misanthrope, comédies galantes" },
  { id: 'lettre', nom: 'Lettre / Billet', categorie: 'Objets anciens', initiale: 'L',
    description: "Le moteur d'innombrables intrigues : billet doux, aveu, faux, lettre interceptée qui scelle un destin.", pieces: 'Le Mariage de Figaro, Bérénice' },
  { id: 'bourse', nom: 'Bourse', categorie: 'Objets anciens', initiale: 'B',
    description: "Petit sac d'argent que l'on convoite, dérobe ou jette avec dédain ; nerf de bien des comédies.", pieces: "L'Avare, comédies d'intrigue" },
  { id: 'miroir', nom: 'Miroir à main', categorie: 'Objets anciens', initiale: 'M',
    description: "Objet de la vanité et de la lucidité : on s'y admire, on s'y découvre, on y affronte le temps.", pieces: 'Comédies de mœurs' },
  { id: 'crane', nom: 'Crâne', categorie: 'Objets anciens', initiale: 'C',
    description: "Le memento mori du théâtre : Hamlet médite sur le crâne de Yorick, image de la vanité de toute chose.", pieces: 'Hamlet (« Hélas, pauvre Yorick »)' },
  { id: 'plume', nom: 'Plume et encrier', categorie: 'Objets anciens', initiale: 'P',
    description: "Les outils de l'écriture : on signe un contrat, un testament, un aveu — geste souvent décisif de l'intrigue.", pieces: 'Comédies notariales, testaments' },
  { id: 'mouchoir', nom: 'Mouchoir', categorie: 'Objets anciens', initiale: 'M',
    description: "Un simple carré de tissu qui, égaré, déclenche jalousie et catastrophe. L'accessoire fatal par excellence.", pieces: 'Othello (le mouchoir de Desdémone)' },
  { id: 'masque', nom: 'Masque', categorie: 'Objets anciens', initiale: 'M',
    description: "Du masque tragique grec au loup du bal : il transforme, dissimule, autorise toutes les audaces.", pieces: 'Roméo et Juliette (le bal), commedia' },
  { id: 'coupe', nom: 'Coupe / Hanap', categorie: 'Objets anciens', initiale: 'C',
    description: "Le vase du banquet et du toast… ou du poison versé en secret. On y boit l'amitié ou la mort.", pieces: 'Hamlet (la coupe empoisonnée)' },
  { id: 'anneau', nom: 'Anneau / Bague', categorie: 'Objets anciens', initiale: 'A',
    description: "Gage d'amour et de serment, preuve des reconnaissances : la bague reconnue dénoue bien des intrigues.", pieces: 'Comédies à reconnaissance' },
  { id: 'fiole', nom: 'Fiole / Potion', categorie: 'Objets anciens', initiale: 'F',
    description: "Le flacon du poison, du philtre ou du narcotique : quelques gouttes suffisent à précipiter le tragique.", pieces: 'Roméo et Juliette (le poison et le narcotique)' },
  { id: 'sablier', nom: 'Sablier / Horloge', categorie: 'Objets anciens', initiale: 'S',
    description: "Le temps qui s'écoule, rappel du délai et de la mort ; objet symbolique des méditations et des ultimatums.", pieces: 'Drames du destin' },
  { id: 'lanterne', nom: 'Lanterne', categorie: 'Objets anciens', initiale: 'L',
    description: "La lumière que l'on porte dans la nuit : veilles, rondes de guet, rencontres clandestines.", pieces: 'Scènes nocturnes' },
  { id: 'tabatiere', nom: 'Tabatière / Pipe', categorie: 'Objets anciens', initiale: 'T', epoque: 'XVIIe–XIXe',
    description: "Le tabac, plaisir mondain que Sganarelle porte aux nues dans l'éloge qui ouvre Dom Juan.", pieces: "Dom Juan (« Il n'est rien d'égal au tabac »)" },
  { id: 'perruque', nom: 'Perruque', categorie: 'Objets anciens', initiale: 'P', epoque: 'XVIIe–XVIIIe',
    description: "Attribut du rang et de la vanité, ressort comique quand elle glisse ou se perd au mauvais moment.", pieces: 'Le Bourgeois gentilhomme, comédies' },
];
