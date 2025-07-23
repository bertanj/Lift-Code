import axios from 'axios';

const API_URL = 'http://localhost:8080/api/pedidos';

export const getPedidos = () => axios.get(API_URL);
export const getPedidoById = (id) => axios.get(`${API_URL}/${id}`);
export const getPedidoDetalhado = (id) => axios.get(`${API_URL}/${id}/detalhes`);
