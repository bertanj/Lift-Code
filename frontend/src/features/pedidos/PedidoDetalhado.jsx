import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPedidoDetalhado } from "../../api/pedidos";

function PedidoDetalhadoPage() {
  const { id } = useParams();
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    getPedidoDetalhado(id)
      .then((res) => setDados(res.data))
      .catch(() => setErro("❌ Erro ao carregar os dados do pedido."));
  }, [id]);

  if (erro) return <p className="text-red-600 p-6">{erro}</p>;
  if (!dados) return <p className="p-6">🔄 Carregando...</p>;

  const { cliente, pedido, itens, total } = dados;

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-10 border border-gray-200">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📦 Pedido #{pedido?.id}</h1>
          <p className="text-gray-600 text-lg">📅 <strong>Data do Pedido:</strong> {pedido?.data}</p>
        </div>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">👤 Informações do Cliente</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 text-gray-700">
            <p>📝 <strong>Nome:</strong> {cliente?.nome}</p>
            <p>🆔 <strong>CPF:</strong> {cliente?.cpf}</p>
            <p>📧 <strong>Email:</strong> {cliente?.email}</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">📋 Itens do Pedido</h2>
          <table className="w-full table-auto border border-gray-300 rounded-lg overflow-hidden text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-6 py-4 font-semibold">🔢 Código</th>
                <th className="px-6 py-4 font-semibold">📦 Produto</th>
                <th className="px-6 py-4 font-semibold">🔢 Quantidade</th>
                <th className="px-6 py-4 font-semibold">💰 Valor Total</th>
              </tr>
            </thead>
            <tbody>
              {itens.map((itemObj, index) => (
                <tr key={index} className="even:bg-gray-50 hover:bg-blue-50 transition">
                  <td className="px-6 py-4">{itemObj.produto?.id}</td>
                  <td className="px-6 py-4">{itemObj.produto?.nome}</td>
                  <td className="px-6 py-4">{itemObj.item?.quantidade}</td>
                  <td className="px-6 py-4">
                    R$ {(itemObj.produto?.valor * itemObj.item?.quantidade).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <div className="text-right text-xl font-semibold text-gray-800 mt-8">
          💵 Total do Pedido: R$ {total?.toFixed(2)}
        </div>
      </div>
    </div>
  );
}

export default PedidoDetalhadoPage;
