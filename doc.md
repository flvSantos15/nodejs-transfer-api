SignUp => Guardar o usuário no banco de dados e enviar um email de boas vindas (Nao completo)

## Commands

To open an interactive shell in the transfer_api container, run the following command:
docker exec -it transfer_api /bin/sh or docker exec -it transfer_api sh

To run a specific command in the transfer_api container, run the following command:
docker exec -it transfer_api /bin/sh -c npm run dev

To open an interactive shell in the database container, run the following command:
docker exec -it transfer_db /bin/sh or docker exec -it transfer_db sh

To run a specific command in the database container, run the following command:
docker exec -it transfer_db /bin/sh -c psql -U postgres

## O que falta

- Envio de email para recuperacao de senha.
- Adicionar logs no sistema.
- Adicionar mais testes.
- Adicionar documentacao no swagger.

## Post Linkedin

🚀 Just finished my Node.js Project! 🎉

I recently built a Node.js API for transfer money between users. I wrapped up API documentation for it using Swagger UI!

✅ Features:

Authentication
User Management (CRUD)
Account Management (CRUD)
Transaction Management (CRUD)

📌 Tech stack:

Node.js
TypeScript
Express
Prisma
Jest
Dockers
PostgreSQL
JWT Authentication
Swagger/OpenAPI 3.0

Dica: Fazer um video em inglês explicando o projeto, posso mostrar a documentacao no swagger e explicar o que cada endpoint faz.
E mostrar o codigo fonte.
E mostrar um exemplo de chamada no postman ou no swagger.

