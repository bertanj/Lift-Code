# 🚀 Lift App

Este é um projeto fullstack construído com **Spring Boot** no backend e **React + Vite** no frontend.

---

## 📁 Estrutura do Projeto

Lift-Code/ ├── backend/ # API REST em Spring Boot ├── frontend/ # Interface em React com Vite


---

## 🔧 Requisitos

Certifique-se de ter os seguintes recursos instalados em sua máquina:

- **Java JDK** (versão 17 ou superior)
- **Node.js** (versão 18 ou superior)
- **Maven**
---
Execute o projeto:

bash
./mvnw spring-boot:run
A API ficará disponível em: http://localhost:8080

💻 Frontend — React + Vite
Acesse a pasta frontend/

Instale as dependências:

bash
npm install
Execute o frontend:

bash
npm run dev
O app estará disponível em: http://localhost:5173

🔌 Endpoints Principais
GET /api/pedidos — Lista de pedidos

GET /api/pedidos/{id}/detalhes — Detalhes completos de um pedido

GET /api/clientes — Lista de clientes
