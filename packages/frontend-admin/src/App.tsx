import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Projets from './pages/Projets';
import Dons from './pages/Dons';
import Benevoles from './pages/Benevoles';
import Besoins from './pages/Besoins';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/projets" element={<Projets />} />
        <Route path="/dons" element={<Dons />} />
        <Route path="/benevoles" element={<Benevoles />} />
        <Route path="/besoins" element={<Besoins />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;