import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home';
import Analytics from '@/pages/Analytics';
import Prediction from '@/pages/Prediction';
import About from '@/pages/About';

function App() {
  const location = useLocation();

  return (
    <MainLayout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </AnimatePresence>
    </MainLayout>
  );
}

export default App;
