import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PedidoDetalhadoPage from './features/pedidos/PedidoDetalhado';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pedido/:id" element={<PedidoDetalhadoPage />} />
      </Routes>
    </Router>
  );
}

export default App;