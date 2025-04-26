# Projeto de Front-end - Catálogo de Filmes

Este é um projeto de front-end desenvolvido com Angular 17, utilizando SSR (Server-Side Rendering), arquitetura hexagonal e seguindo as práticas de Clean Code e boas práticas de SCSS.

## Tecnologias Utilizadas:
- **Angular 17** (com SSR)
- **Typescript**
- **HTML e CSS** (com ênfase em boas práticas de SCSS)
- **RxJS** (para gerenciamento assíncrono)
- **APIs de terceiros** (The Movie Database API)
- **Arquitetura Hexagonal**
- **Clean Code** (estruturação do código)

## Funcionalidades:
- **Página de listagem de filmes**: Exibe uma lista de filmes com a possibilidade de realizar buscas.
- **Página de detalhes do filme**: Exibe informações detalhadas sobre um filme selecionado.
- **API do The Movie Database (TMDb)**: Utilizada para popular os dados dos filmes.

## Requisitos para Rodar o Projeto:

### 1. Pré-requisitos:
- **Node.js** (recomenda-se a versão LTS mais recente)
- **npm** (gerenciador de pacotes do Node.js)
- **Angular CLI** (Globalmente instalado via npm)

### 2. Instalação:
1. Clone este repositório:
    ```bash
    git clone https://github.com/matheushsouto/JactoTmdbHex.git
    cd repository
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Configurar a chave de API do The Movie Database (TMDb):
    - Crie uma conta no [TMDb](https://www.themoviedb.org/).
    - Obtenha sua chave de API na seção de configurações da sua conta.
    - Crie um arquivo `.env` na raiz do projeto e adicione sua chave API:
      ```
      TMDB_API_KEY=SuaChaveDeAPI
      ```

4. Rode a aplicação em modo de desenvolvimento:
    ```bash
    ng serve
    ```

5. Acesse a aplicação no seu navegador em: `http://localhost:4200`.
