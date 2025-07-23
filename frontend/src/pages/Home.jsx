import { useEffect, useState } from "react";
import axios from "axios";
import PedidoList from "../features/pedidos/PedidoList";

function Home() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [view, setView] = useState("pedidos");

  useEffect(() => {
    async function fetchPedidosCompletos() {
      try {
        const response = await axios.get("http://localhost:8080/api/pedidos");
        const pedidosBasicos = response.data;

        const pedidosDetalhados = await Promise.all(
          pedidosBasicos.map(async (pedido) => {
            const res = await axios.get(
              `http://localhost:8080/api/pedidos/${pedido.id}/detalhes`
            );
            return {
              id: pedido.id,
              data: pedido.data,
              cliente: res.data.cliente.nome,
              total: res.data.total,
            };
          })
        );

        setPedidos(pedidosDetalhados);
      } catch (error) {
        console.error(error);
        setErro("❌ Erro ao carregar pedidos.");
      } finally {
        setLoading(false);
      }
    }

    fetchPedidosCompletos();
  }, []);

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#f4f6fb",
      fontFamily: "Segoe UI, sans-serif",
      color: "#2f3640"
    }}>
      {/* Sidebar */}
      <aside style={{
        width: 240,
        backgroundColor: "#2f3640",
        color: "#ecf0f1",
        padding: "2rem 1rem",
        boxShadow: "2px 0 10px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
      }}>
        <h2 style={{
          fontSize: "1.8rem",
          fontWeight: "bold",
          marginBottom: "2rem",
          textAlign: "center"
        }}>🚚 Lift App</h2>

        <nav>
          <button
            onClick={() => setView("pedidos")}
            style={{
              background: view === "pedidos" ? "#40739e" : "transparent",
              border: "none",
              color: "#ecf0f1",
              padding: "0.85rem 1rem",
              width: "100%",
              textAlign: "left",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "background 0.3s ease"
            }}
          >
            📋 Lista de Pedidos
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main style={{
        flex: 1,
        padding: "3rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem"
      }}>
        {view === "pedidos" && (
          <section style={{
            backgroundColor: "#ffffff",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.05)"
          }}>
            <h1 style={{
              fontSize: "2rem",
              marginBottom: "1.5rem",
              borderBottom: "2px solid #dcdde1",
              paddingBottom: "0.5rem",
              color: "#2c3e50",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}>
              📦 Lista de Pedidos
            </h1>

            {loading && <p className="text-lg">🔄 Carregando pedidos...</p>}
            {erro && <p style={{ color: "red", fontWeight: "500" }}>{erro}</p>}
            {!loading && !erro && <PedidoList pedidos={pedidos} />}
          </section>
        )}
      </main>
    </div>
  );
}

export default Home;
