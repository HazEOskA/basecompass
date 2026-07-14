import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Apps from './pages/Apps';
import RoadmapPage from './pages/RoadmapPage';
import QuizPage from './pages/QuizPage';
import BuildersPage from './pages/BuildersPage';
import SafetyPage from './pages/SafetyPage';
import BuilderCodeQaPage from './pages/BuilderCodeQaPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/"                element={<Home />} />
          <Route path="/apps"            element={<Apps />} />
          <Route path="/roadmap"         element={<RoadmapPage />} />
          <Route path="/quiz"            element={<QuizPage />} />
          <Route path="/builders"        element={<BuildersPage />} />
          <Route path="/safety"          element={<SafetyPage />} />
          <Route path="/builder-code-qa" element={<BuilderCodeQaPage />} />
          {/* Fallback — redirect any unknown route to home */}
          <Route path="*"                element={<Home />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
