import { Link } from "react-router-dom";

export default function PedidoList({ pedidos }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm md:text-base bg-white shadow-lg rounded-xl border border-gray-200">
        <thead className="bg-gray-100">
          <tr className="text-left">
            <th className="px-6 py-4 font-semibold text-gray-700">Código do Pedido</th>
            <th className="px-6 py-4 font-semibold text-gray-700">Nome do Cliente</th>
            <th className="px-6 py-4 font-semibold text-gray-700">Data do Pedido</th>
            <th className="px-6 py-4 font-semibold text-gray-700">Valor Total</th>
            <th className="px-6 py-4 font-semibold text-gray-700">Detalhes</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((p, index) => (
            <tr key={index} className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition">
              <td className="px-6 py-5 whitespace-nowrap text-gray-800 font-medium">#{p.id}</td>
              <td className="px-6 py-5 whitespace-nowrap text-gray-700">{p.cliente}</td>
              <td className="px-6 py-5 whitespace-nowrap text-gray-600">{p.data}</td>
              <td className="px-6 py-5 whitespace-nowrap text-gray-900 font-semibold">
                R$ {p.total.toFixed(2)}
              </td>
              <td className="px-6 py-5">
                <Link
                  to={`/pedido/${p.id}`}
                  className="inline-block px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition font-medium"
                >
                  Ver detalhes
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
