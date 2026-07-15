# Vocabulaire contrôlé : 207 thèmes bruts → 48 thèmes canoniques.
THEMES = {
    "Amour": ["Amour", "Amour impossible", "Sentiments"],
    "Passion": ["Passion", "Désir", "Sexualité", "Libertinage"],
    "Séduction": ["Séduction", "Ruse", "Provocation"],
    "Couple": ["Couple", "Mariage", "Adultère", "Rupture", "Jalousie", "Fidélité"],
    "Famille": ["Famille", "Fraternité", "Héritage"],
    "Enfance": ["Enfance", "Jeunesse", "Innocence"],
    "Pouvoir": ["Pouvoir", "Autorité", "Tyrannie", "Dictature", "Oppression", "Répression", "Contrôle"],
    "Politique": ["Politique", "Propagande", "Engagement", "Administration", "Médias"],
    "Révolte": ["Révolte", "Révolution", "Résistance", "Désobéissance", "Anarchie", "Colère"],
    "Justice": ["Justice", "Inégalité", "Égalité", "Racisme", "Préjugé", "Préjugés"],
    "Liberté": ["Liberté", "Émancipation"],
    "Féminisme": ["Féminisme", "Condition féminine", "Corps"],
    "Société": ["Société", "Classe sociale", "Critique sociale", "Conformisme", "Tradition",
                "Communauté", "Consommation", "Modernité", "Culture"],
    "Argent": ["Argent", "Avarice", "Pauvreté", "Corruption", "Ascension sociale"],
    "Travail": ["Travail", "Aliénation"],
    "Guerre": ["Guerre", "Paix", "Patriotisme"],
    "Colonisation": ["Colonisation", "Colonialisme"],
    "Exil": ["Exil", "Marginalité", "Exclusion", "Différence", "Isolement", "Prison"],
    "Violence": ["Violence", "Cruauté", "Destruction", "Souffrance"],
    "Vengeance": ["Vengeance", "Trahison"],
    "Mort": ["Mort", "Deuil", "Survie", "Apocalypse"],
    "Destin": ["Destin", "Fatalité", "Épreuve", "Tragédie"],
    "Identité": ["Identité", "Beauté", "Apparence", "Vanité", "Orgueil", "Fierté", "Dignité"],
    "Mémoire": ["Mémoire", "Souvenir", "Nostalgie", "Regret", "Histoire"],
    "Vérité": ["Vérité", "Sincérité", "Doute", "Hésitation", "Relativité", "Réalité",
               "Perception", "Compréhension", "Regard"],
    "Mensonge": ["Mensonge", "Secret", "Non-dit", "Silence", "Hypocrisie", "Tromperie",
                 "Manipulation", "Méfiance"],
    "Illusion": ["Illusion", "Fantaisie", "Fantastique", "Imaginaire", "Mystère", "Superstition"],
    "Folie": ["Folie", "Angoisse", "Peur", "Désespoir", "Mélancolie", "Déni", "Psychologie",
              "Hypocondrie", "Impuissance"],
    "Solitude": ["Solitude", "Communication", "Dépendance", "Conflit", "Intimité"],
    "Existence": ["Existence", "Absurde", "Sens de la vie", "Habitude", "Quête"],
    "Morale": ["Morale", "Responsabilité", "Choix", "Sagesse", "Clémence"],
    "Culpabilité": ["Culpabilité", "Rédemption", "Pardon", "Renoncement"],
    "Espoir": ["Espoir", "Espérance", "Bonheur", "Vie"],
    "Humanité": ["Humanité", "Humanisme", "Solidarité", "Tolérance", "Amitié"],
    "Foi": ["Foi", "Religion", "Spiritualité", "Fanatisme", "Mal", "Tentation"],
    "Honneur": ["Honneur", "Gloire"],
    "Devoir": ["Devoir", "Sacrifice"],
    "Courage": ["Courage", "Héroïsme", "Résilience"],
    "Connaissance": ["Connaissance", "Science", "Savoir", "Éducation", "Clonage"],
    "Théâtre": ["Théâtre", "Représentation", "Avant-garde"],
    "Art": ["Art", "Création", "Poésie"],
    "Langage": ["Langage"],
    "Mythe": ["Mythe", "Conte", "Transformation"],
    "Comédie": ["Comédie", "Comique", "Humour", "Satire", "Burlesque", "Ridicule", "Quiproquo", "Jeu"],
    "Temps": ["Temps", "Changement", "Vieillesse"],
    "Idéal": ["Idéal", "Utopie", "Désillusion"],
    "Ambition": ["Ambition"],
}

# ─── Corrections d'attribution et entrées à écarter ───

# Œuvres qui ne sont pas du théâtre → retirées de la base.
EXCLURE = {
    ("aristote", "poetique"),                      # traité, pas une pièce
    ("beckett", "murphy"),                         # roman
    ("beckett", "mercier et camier"),              # roman
    ("beckett", "innommable"),                     # roman
    ("beckett", "malone meurt"),                   # roman
    ("char", "marteau sans maitre"),               # recueil de poésie
    ("almodovar", "tout sur ma mere"),             # film
    ("mamet", "verre d'eau"),                      # de Scribe, pas de Mamet
    ("albee", "maison de sable et de brume"),      # ni pièce d'Albee
}

# Auteur erroné dans la base → auteur réel. Clé = (auteur normalisé, titre normalisé).
REATTRIBUER = {
    ("vilar", "meurtre dans la cathedrale"): "T.S. Eliot",       # 0286 : Vilar l'a montée, Eliot l'a écrite
    ("brook", "mahabharata"): "Jean-Claude Carrière",            # 0641 : Brook = metteur en scène
    ("keene", "une chambre en inde"): "Ariane Mnouchkine",       # 0711 : création du Théâtre du Soleil
}

# Titres à unifier (le même texte listé sous deux titres). Clé = (auteur, titre) → titre retenu.
RETITRER = {
    ("osborne", "paix du dimanche"): "Look Back in Anger",       # 0911/0912 = même pièce
}
