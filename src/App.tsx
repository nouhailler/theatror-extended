import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store';
import TopBar from './components/shell/TopBar';
import BottomNav from './components/shell/BottomNav';
import Drawer from './components/shell/Drawer';
import Onboarding from './components/Onboarding';
import GuidedTour from './components/GuidedTour';
import HelpSheet from './components/HelpSheet';
import ScreenTip from './components/ScreenTip';

import Accueil from './screens/Accueil';
import MaCollection from './screens/MaCollection';
import Pieces from './screens/Pieces';
import FichePiece from './screens/FichePiece';
import LecturePiece from './screens/LecturePiece';
import Explorer from './screens/Explorer';
import Encyclopedie from './screens/Encyclopedie';
import FicheArticle from './screens/FicheArticle';
import FicheDramaturge from './screens/FicheDramaturge';
import Personnages from './screens/Personnages';
import FichePersonnage from './screens/FichePersonnage';
import Quiz from './screens/Quiz';
import ModeIA from './screens/ModeIA';
import Frise from './screens/Frise';
import Carte from './screens/Carte';
import Collections from './screens/Collections';
import CollectionDetail from './screens/CollectionDetail';
import Exercices from './screens/Exercices';
import Voix from './screens/Voix';
import MiseEnScene from './screens/MiseEnScene';
import Costumes from './screens/Costumes';
import Decors from './screens/Decors';
import Accessoires from './screens/Accessoires';
import Festivals from './screens/Festivals';
import Medias from './screens/Medias';
import Parcours from './screens/Parcours';
import Repetition from './screens/rehearsal/Repetition';
import RepImport from './screens/rehearsal/RepImport';
import RepConfig from './screens/rehearsal/RepConfig';
import RepPlayer from './screens/rehearsal/RepPlayer';
import Scene from './screens/Scene';
import Journal from './screens/Journal';
import Reglages from './screens/Reglages';

export default function App() {
  const hydrate = useStore((s) => s.hydrate);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  return (
    <div className="app-frame">
      <TopBar />
      <main style={{ flex: 1, minHeight: 0, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/collection" element={<MaCollection />} />
          <Route path="/pieces" element={<Pieces />} />
          <Route path="/pieces/:id" element={<FichePiece />} />
          <Route path="/pieces/:id/texte" element={<LecturePiece />} />
          <Route path="/explorer" element={<Explorer />} />
          <Route path="/explorer/encyclopedie" element={<Encyclopedie />} />
          <Route path="/explorer/article/:id" element={<FicheArticle />} />
          <Route path="/explorer/dramaturge/:id" element={<FicheDramaturge />} />
          <Route path="/explorer/personnages" element={<Personnages />} />
          <Route path="/explorer/personnage/:id" element={<FichePersonnage />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/ia" element={<ModeIA />} />
          <Route path="/explorer/frise" element={<Frise />} />
          <Route path="/explorer/carte" element={<Carte />} />
          <Route path="/explorer/collections" element={<Collections />} />
          <Route path="/explorer/collections/:id" element={<CollectionDetail />} />
          <Route path="/exercices" element={<Exercices />} />
          <Route path="/voix" element={<Voix />} />
          <Route path="/mise-en-scene" element={<MiseEnScene />} />
          <Route path="/costumes" element={<Costumes />} />
          <Route path="/decors" element={<Decors />} />
          <Route path="/accessoires" element={<Accessoires />} />
          <Route path="/festivals" element={<Festivals />} />
          <Route path="/medias" element={<Medias />} />
          <Route path="/parcours" element={<Parcours />} />
          <Route path="/repetition" element={<Repetition />} />
          <Route path="/repetition/nouveau" element={<RepImport />} />
          <Route path="/repetition/:id/config" element={<RepConfig />} />
          <Route path="/repetition/:id/jouer" element={<RepPlayer />} />
          <Route path="/scene" element={<Scene />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/reglages" element={<Reglages />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <BottomNav />

      <ScreenTip />
      <Drawer />
      <HelpSheet />
      <GuidedTour />
      <Onboarding />
    </div>
  );
}
