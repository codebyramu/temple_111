import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { MagneticCursor, ScrollToTop, ScrollProgressBar } from "./components/shared";
import Home from "./pages/Home";
import VillagePage from "./pages/VillagePage";
import SaintPage from "./pages/SaintPage";
import ShrinesPage from "./pages/ShrinesPage";
import RiversPage from "./pages/RiversPage";
import TempleDetail from "./pages/TempleDetail";
import SahasranamamPage from "./pages/SahasranamamPage";
import DivineStreetPage from "./pages/DivineStreetPage";
import TrustPage from "./pages/TrustPage";

export default function App() {
  const location = useLocation();

  return (
    <>
      <MagneticCursor />
      <ScrollProgressBar />
      <ScrollToTop />
      <Nav />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/village" element={<VillagePage />} />
          <Route path="/saint" element={<SaintPage />} />
          <Route path="/shrines" element={<ShrinesPage />} />
          <Route path="/rivers" element={<RiversPage />} />
          <Route path="/temple/:id" element={<TempleDetail />} />
          <Route path="/sahasranamam" element={<SahasranamamPage />} />
          <Route path="/divine-street" element={<DivineStreetPage />} />
          <Route path="/trust" element={<TrustPage />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}
