# API Gerenciador de Tarefas

Projeto de uma API de um gerenciador de tarefas criada para fins acadêmicos de estudo sobre API REST, testes automatizados e documentação Swagger.

## Tecnologias

- JavaScript
- Node.js
- MySQL
- [mysql2](https://www.npmjs.com/package/mysql2) para a conexão com o banco
- [dotenv](https://www.npmjs.com/package/dotenv) para as variáveis de ambiente
- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express) para a interface da documentação
- [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc) para gerar a documentação Swagger a partir dos comentários
- [Jest](https://www.npmjs.com/package/jest) para os testes
- [Babel](https://www.npmjs.com/package/@babel/core) para a transpilação do código

## Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- MySQL em execução
- Um banco de dados criado para o projeto

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone <url-do-repositorio>
cd gerenciador-de-tarefas
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto com as variáveis de conexão com o banco:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
```

## Execução

```bash
node <arquivo-principal>.js
```

## Estrutura do projeto

```
src/
├── connect.js        # Criação do pool de conexões com o MySQL
└── ...               # Rotas, controllers e demais módulos
```

## Status

Projeto em desenvolvimento. Funcionalidades, rotas e a estrutura podem mudar.
