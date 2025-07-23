import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function PedidoDetalhado() {
  const { id } = useParams();
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function fetchPedido() {
      try {
        const response = await axios.get(`http://localhost:8080/pedido/${id}/detalhes`);
        setPedido(response.data);
      } catch (error) {
        setErro("Erro ao carregar detalhes do pedido.");
      } finally {
        setLoading(false);
      }
    }

    fetchPedido();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (erro) return <p>{erro}</p>;
  if (!pedido) return <p>Pedido não encontrado</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Pedido #{id}</h1>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Cliente</h2>
        <p><strong>Nome:</strong> {pedido.cliente.nome}</p>
        <p><strong>CPF:</strong> {pedido.cliente.cpf}</p>
        <p><strong>Email:</strong> {pedido.cliente.email}</p>
        <p><strong>Data:</strong> {pedido.data}</p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Itens do Pedido</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={th}>Código</th>
              <th style={th}>Produto</th>
              <th style={th}>Quantidade</th>
              <th style={th}>Valor</th>
            </tr>
          </thead>
          <tbody>
            {pedido.itens.map((item, i) => (
              <tr key={i}>
                <td style={td}>{item.produto.codigo}</td>
                <td style={td}>{item.produto.nome}</td>
                <td style={td}>{item.quantidade}</td>
                <td style={td}>R$ {item.valorTotalProduto?.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <h3>Total: R$ {pedido.valorTotal?.toFixed(2)}</h3>
    </div>
  );
}

const th = { textAlign: "left", padding: "8px", borderBottom: "1px solid #ccc" };
const td = { padding: "8px", borderBottom: "1px solid #eee" };

export default PedidoDetalhado;

//não está sendo usado, mas pode ser útil para o futuro