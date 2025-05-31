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

