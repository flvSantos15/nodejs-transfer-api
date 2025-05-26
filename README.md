# 💸 FastPay API

Uma API simples de transferência bancária entre contas com autenticação JWT e validações de segurança básica. Ideal para estudo e experimentação em Node.js.

## 🚀 Funcionalidades

- Cadastro de usuário com hash de senha
- Login com geração de token JWT
- Consulta de saldo do usuário autenticado
- Transferência entre contas
- Validações: saldo suficiente e existência de conta destino

---

## 🧰 Tecnologias

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- bcrypt
- jsonwebtoken
- Jest
- Docker

---

## 📦 Instalação

```bash
git clone https://github.com/flvsantos/nodejs-transfer-api.git
cd nodejs-transfer-api
docker compose up -d
```

