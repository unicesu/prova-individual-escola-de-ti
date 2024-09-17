import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ViagemForm from './components/ViagemForm';
import ViagemList from './components/ViagemList';


function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          {/* Rota para listar todas as viagens */}
          <Route path="/" element={<ViagemList />} />

          {/* Rota para criar uma nova viagem */}
          <Route path="/nova-viagem" element={<ViagemForm />} />

          {/* Rota para editar uma viagem existente, com base no ID da viagem */}
          <Route path="/viagem/editar/:id" element={<ViagemForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
