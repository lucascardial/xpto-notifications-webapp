# Documentação do Aplicativo Frontend - Next.js

Este documento fornece uma visão geral e instruções para o desenvolvimento, execução e manutenção do aplicativo frontend construído com Next.js.

[wiki](https://github.com/lucascardial/xpto-notifications-webapp/wiki/1.-Home)

## Executando a Aplicação
Por favor, para executar este projeto em conjunto com o projeto de api, siga as instruções [ESSAS INSTRUÇÕES](https://github.com/lucascardial/xpto-notifications-docker). Neste repositório você encontrará as instruções para executar o projeto em um ambiente dockerizado.

## Visão Geral

Este aplicativo frontend de estudo é construído usando Next.js, um framework React de código aberto que facilita a construção de aplicativos da web com React. Ele fornece funcionalidades como renderização do lado do servidor, geração estática e dinâmica de páginas, roteamento automático e muito mais.

## Pré-requisitos

Antes de iniciar o desenvolvimento ou execução do aplicativo frontend, verifique se o seguinte software está instalado em sua máquina:

- Node.js (v20.x ou superior)
- npm (gerenciador de pacotes do Node.js)
- yarn

## Instalação

1. Clone o repositório do aplicativo:

```bash
git clone https://github.com/lucascardial/xpto-notifications-webapp.git
cd xpto-notifications-webapp
```

2. Instale as dependências do projeto:

```bash
yarn
```

## Execução Local

Para executar o aplicativo frontend em seu ambiente local, utilize o seguinte comando:

```bash
yarn dev
```

Isso iniciará o servidor de desenvolvimento do Next.js e você poderá acessar o aplicativo em seu navegador através do endereço `http://localhost:3000`.

## Estrutura do Projeto

A estrutura do projeto segue as convenções padrão do Next.js, com os principais diretórios e arquivos sendo:

- `app/`: Contém as páginas do aplicativo, cada arquivo `.page.tsx` neste diretório corresponde a uma rota no aplicativo.
- `hooks`: Contém os hooks personalizados que podem ser utilizados em diferentes partes do aplicativo.
- `http-clients`: Contém os clientes HTTP personalizados que podem ser utilizados para fazer chamadas de API.
- `providers`: Contém os provedores de contexto personalizados que podem ser utilizados para compartilhar dados entre componentes.
- `theme.ts`: Arquivo que contém as [customizações de tema](https://mui.com/material-ui/customization/theming/) do [Material MUI](https://mui.com/material-ui/).


## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request para melhorar o aplicativo frontend.

## Licença

Este aplicativo frontend é licenciado sob a [Licença MIT](https://pt.wikipedia.org/wiki/Licen%C3%A7a_MIT).
