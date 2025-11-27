# 🐾 API Pets

Uma API RESTful desenvolvida com **Node.js**, **Express** e **TypeScript** para o gerenciamento de um sistema de adoção de animais de estimação. O projeto utiliza **MongoDB** para persistência de dados e autenticação via **JWT** (JSON Web Token).

## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias e bibliotecas:

-   **[Node.js](https://nodejs.org/)** - Ambiente de execução JavaScript.
-   **[Express](https://expressjs.com/)** - Framework web rápido e minimalista.
-   **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática.
-   **[Mongoose](https://mongoosejs.com/)** - ODM (Object Data Modeling) para MongoDB.
-   **[JSON Web Token (JWT)](https://jwt.io/)** - Padrão para autenticação segura entre as partes.
-   **[Bcrypt](https://www.npmjs.com/package/bcrypt)** - Biblioteca para hashing de senhas.
-   **[Cors](https://www.npmjs.com/package/cors)** - Middleware para habilitar CORS (Cross-Origin Resource Sharing).

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

-   [Node.js](https://nodejs.org/en/download/) (versão 14 ou superior)
-   [MongoDB](https://www.mongodb.com/try/download/community) (rodando localmente ou via MongoDB Atlas)
-   Gerenciador de pacotes (NPM ou Yarn)

## 🔧 Instalação e Configuração

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/thalesgranja/api-pets.git
    cd api-pets
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Configuração de Variáveis de Ambiente:**

    Crie um arquivo `.env` na raiz do projeto. Você pode usar o exemplo abaixo como base:

    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/api_pets
    JWT_SECRET=sua_chave_super_secreta
    ```

    *Nota: Certifique-se de que seu MongoDB está rodando e que a string de conexão (`MONGO_URI`) está correta.*

## ⚡ Como Rodar

### Modo de Desenvolvimento
Para iniciar o servidor com auto-reload (utilizando `ts-node-dev`):

```bash
npm run dev
````

O servidor iniciará em: `http://localhost:5000`

## 📍 Endpoints da API

Abaixo estão listadas as principais rotas da aplicação.

### 👤 Usuários (`/users`)

| Método  | Rota               | Descrição                                  | Autenticação |
| ------- | ------------------ | ------------------------------------------ | ------------ |
| `POST`  | `/users/register`  | Registra um novo usuário                   | ❌ Não        |
| `POST`  | `/users/login`     | Realiza login e retorna o Token            | ❌ Não        |
| `GET`   | `/users/checkuser` | Verifica o usuário atual baseado no token  | ❌ Não        |
| `GET`   | `/users/:id`       | Busca informações de um usuário específico | ❌ Não        |
| `PATCH` | `/users/edit/:id`  | Atualiza dados do usuário                  | ✅ Sim        |

### 🐶 Pets (`/pets`)

| Método   | Rota                 | Descrição                                     | Autenticação |
| -------- | -------------------- | --------------------------------------------- | ------------ |
| `POST`   | `/pets/create`       | Cadastra um novo pet para adoção              | ✅ Sim        |
| `GET`    | `/pets`              | Lista todos os pets disponíveis para adoção   | ❌ Não        |
| `GET`    | `/pets/mypets`       | Lista os pets cadastrados pelo usuário logado | ✅ Sim        |
| `GET`    | `/pets/myadoptions`  | Lista as adoções que o usuário agendou        | ✅ Sim        |
| `GET`    | `/pets/:id`          | Exibe detalhes de um pet específico           | ❌ Não        |
| `DELETE` | `/pets/:id`          | Remove um pet do sistema                      | ✅ Sim        |
| `PATCH`  | `/pets/:id`          | Atualiza informações de um pet                | ✅ Sim        |
| `PATCH`  | `/pets/schedule/:id` | Agenda uma visita para adoção                 | ✅ Sim        |
| `PATCH`  | `/pets/conclude/:id` | Conclui o processo de adoção                  | ✅ Sim        |

## 📂 Estrutura do Projeto

```
src/
├── controllers/    # Lógica de controle das rotas (Pet e User)
├── db/             # Configuração e conexão com o banco de dados
├── helpers/        # Funções auxiliares (Validação de token, Upload de imagens, etc.)
├── models/         # Interfaces e Schemas do Mongoose (IPet, IUser)
├── routes/         # Definição das rotas da API
└── server.ts       # Ponto de entrada da aplicação
```

---

<p align="center"> Desenvolvido por <strong>Thales Granja</strong> </p>