SignUp => Guardar o usuário no banco de dados e enviar um email de boas vindas (Nao completo)

SignIn => Gerar um token JWT e retornar para o usuário (Completo)

Transfer => Realizar uma transferência entre dois usuários

Balance => Retornar o saldo do usuário

Transactions => Retornar as transações do usuário

Users => Retornar todos os usuários

Accounts => Retornar todas as contas do usuário

Account => Retornar uma conta do usuário

## Commands

To open an interactive shell in the transfer_api container, run the following command:
docker exec -it transfer_api /bin/sh or docker exec -it transfer_api sh

To run a specific command in the transfer_api container, run the following command:
docker exec -it transfer_api /bin/sh -c npm run dev

To open an interactive shell in the database container, run the following command:
docker exec -it transfer_db /bin/sh or docker exec -it transfer_db sh

To run a specific command in the database container, run the following command:
docker exec -it transfer_db /bin/sh -c psql -U postgres

