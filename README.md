# Desafio iClinic NodeJs
[Link para o repositório oficial](https://github.com/iclinic/iclinic-node-challenge)
## Como rodar o projeto
1. Crie 2 bancos de dados postgres, um para os testes e um para a aplicação
2. Instale o knex como dependencia global no seu node utilizando o comando **npm install knex -g**
3. Faça download do projeto ou um clone dele  em sua maquina
4. Vá na pasta do projeto e faça uma copia dos 2 arquivos .env.example, removendo o example e atualizando as credenciais dos bancos de dados, *as credenciais das apis de dependentes são fornecidas pela propria iclinic no post deles então já estão corretas nos examples*
5. Rode o comando para instalar as dependências do node, **yarn install**
6. Rode o comando **knex migrate:latest**
7. Rode os testes **yarn test**
8. Por fim rode a aplicação **yarn dev**

## Projeto rodando, e agora?
Após seguir o passo a passo para iniciar o projeto, basta usar um gerenciador REST para fazer a requisição POST para a rota: http://localhost:3000/v2/prescriptions utilize a estrutura abaixo para o envio do objeto JSON


    {
      "clinic": {
        "id": 1
        },
      "physician": {
        "id": 1
        },
      "patient": {
        "id": 1
        },
      "text": "Dipirona 1x ao dia"
    }

