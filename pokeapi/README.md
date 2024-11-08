# Pokédex

## Funcionalidades

- **Exibição de Pokémon**: Lista de Pokémons carregada da [PokeAPI](https://pokeapi.co/), usando o componente [Data Grid](https://mui.com/x/react-data-grid/) do MUI.
- **Busca por Pokémon**: Permite buscar um Pokémon específico (por ID, nome ou tipos) e exibir suas informações.
- **Detalhes do Pokémon**: Ao clicar em um Pokémon da lista, são exibidos detalhes como tipo, habilidades, e estatísticas (altura, peso e experiência base), utilizando o componente [Drawer](https://mui.com/material-ui/react-drawer/) do MUI.
- **Design Responsivo**: Interface adaptável para diferentes tamanhos de tela, através do MUI.

## Tecnologias utilizadas
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material-UI (MUI)](https://mui.com/material-ui/)
- [Axios](https://axios-http.com/ptbr/)
- [JSON Server](https://www.npmjs.com/package/json-server)
- [Vite](https://vite.dev/)

## Instalação do projeto

### 1. Clone este repositório
```bash
git clone https://github.com/rauancamozzi/TesteDesenvolvedorFront.git
```

## 2. Entre na pasta do projeto
```bash
cd TesteDesenvolvedorFront/pokeapi
```

## 3. Instale as depêndencias
```bash
npm install
```

## 4. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

## 5. Inicie o servidor da API (JSON Server)
```bash
npm run server
```