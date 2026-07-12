// Flux RSS/Atom agrégés pour l'onglet « Nouveautés » des Médias.
// Récupérés via la fonction Netlify /.netlify/functions/feed (proxy CORS).
// URLs vérifiées (juillet 2026). Pour en ajouter :
//   • France Culture : chaque podcast expose un flux radiofrance-podcast.net
//     (annuaire : atlasflux.saynete.com).
//   • YouTube : https://www.youtube.com/feeds/videos.xml?channel_id=<UC…>
//   • Audiomeans/Acast : flux exposé sur la page du podcast (à ajouter à
//     l'ALLOWLIST de la fonction si nouvel hôte).

export interface FluxSource {
  id: string;
  titre: string;
  source: string;
  type: 'podcast' | 'video';
  url: string;
}

export const FLUX: FluxSource[] = [
  // ─── France Culture (podcasts audio) ───
  { id: 'fc-theatre-cie', titre: 'Théâtre & Cie', source: 'France Culture', type: 'podcast',
    url: 'https://radiofrance-podcast.net/podcast09/podcast_a8716277-4c15-4f87-a1cd-fe2b38f6dfed.xml' },
  { id: 'fc-nuits', titre: 'Les Nuits de France Culture', source: 'France Culture', type: 'podcast',
    url: 'https://radiofrance-podcast.net/podcast09/podcast_4ff3693f-6e66-11e5-8e9e-005056a87c89.xml' },
  { id: 'fc-bookclub', titre: 'Le Book Club', source: 'France Culture', type: 'podcast',
    url: 'https://radiofrance-podcast.net/podcast09/podcast_fb95d7ee-4349-4489-8ab4-184962d098ca.xml' },
  { id: 'fc-litterature', titre: 'Littérature', source: 'France Culture', type: 'podcast',
    url: 'https://radiofrance-podcast.net/podcast09/podcast_9381f6a5-7774-44a1-86a5-fd3b5c2c14d8.xml' },
  { id: 'fc-feuilleton', titre: 'Le Feuilleton', source: 'France Culture', type: 'podcast',
    url: 'https://radiofrance-podcast.net/podcast09/podcast_3c1c2e55-41a0-11e5-9fe0-005056a87c89.xml' },

  // ─── Comédie-Française ───
  { id: 'cf-quelle-comedie', titre: 'Quelle Comédie !', source: 'Comédie-Française', type: 'podcast',
    url: 'https://feeds.audiomeans.fr/feed/03dab4f8-0af9-4ce3-b6bd-bc1997108b65.xml' },
  { id: 'yt-comedie-francaise', titre: 'Comédie-Française (vidéos)', source: 'Comédie-Française', type: 'video',
    url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCiO6XES6COOJYcp8aBv-NpQ' },

  // ─── ARTE ───
  { id: 'yt-arte-concert', titre: 'ARTE Concert', source: 'ARTE', type: 'video',
    url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UC-smeLB9AnOTeypr1YyjJ3A' },
];
