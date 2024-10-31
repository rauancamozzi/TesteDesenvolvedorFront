# Teste Prático de Frontend - Integração com PokeAPI, TypeScript e Material UI

Bem-vindo ao repositório de teste prático para a posição de Desenvolvedor Frontend. Este teste avalia habilidades em TypeScript, integração com APIs REST, e uso do Material Design (MUI). Abaixo, você encontrará uma descrição detalhada dos requisitos do projeto, as expectativas para implementação e os critérios de avaliação.

## Objetivo do Projeto
Desenvolver uma aplicação frontend com uma interface intuitiva e responsiva, que permita listar e detalhar informações de Pokémon usando a [PokeAPI](https://pokeapi.co/docs/v2). Ao concluir, a aplicação deverá demonstrar habilidades de integração com API, manipulação de dados e interações de usuário.

## Estrutura e Requisitos do Projeto

### 1. Listagem de Pokémon
- **Objetivo**: Obter e exibir uma lista de Pokémon através de uma requisição GET na PokeAPI.
- **Detalhes da Implementação**:
  - Utilize a **PokeAPI** para recuperar dados básicos dos Pokémon e exiba-os em uma interface organizada e responsiva, utilizando componentes do Material Design (MUI).
  - Cada item da lista de Pokémon deve apresentar:
    - Nome do Pokémon
    - Imagem representativa
  - Cada item deve ser clicável, abrindo um Drawer com informações adicionais do Pokémon.

### 2. Drawer com Detalhes do Pokémon
- **Objetivo**: Mostrar informações detalhadas de um Pokémon em um Drawer lateral, permitindo interações adicionais do usuário.
- **Detalhes da Implementação**:
  - Ao clicar em um Pokémon da lista, abra um Drawer (usando o componente MUI) que exiba informações detalhadas, incluindo:
    - Nome
    - Imagem
    - Habilidades
    - Tipo(s)
    - Altura e peso
    - Experiência base
  - Adicione no Drawer:
    - **Opção de Like/Dislike**: permitindo que o usuário registre sua preferência pelo Pokémon.
    - **Campo de Comentário**: para que o usuário insira uma observação pessoal sobre o Pokémon.

### 3. Envio de Comentário e Preferência
- **Objetivo**: Registrar a interação do usuário (comentário e like/dislike) com o Pokémon selecionado através de uma API mock.
- **Detalhes da Implementação**:
  - Após o preenchimento do campo de comentário e a seleção de like/dislike, envie as informações do Pokémon e do usuário usando a API mock:
    ```bash
    curl --location 'https://6723fb74493fac3cf24cd48c.mockapi.io/api/v1/pokemon' \
    --header 'Content-Type: application/json' \
    --data '{
        "nomePokemon": "nomePokemon",
        "idPokemon": "idPokemon",
        "comentarioPokemon": "comentarioPokemon",
        "likeDislike": true/false,
        "gitHubId": "seuGitHubId",
        "id": "id"
    }'
    ```
  - As informações que devem ser enviadas incluem:
    - Nome do Pokémon
    - ID do Pokémon
    - Comentário do usuário
    - Estado de like/dislike (true/false)
  - Exiba feedback ao usuário informando o sucesso ou a falha da operação POST.

## Tecnologias Requeridas
- **TypeScript**: para tipagem estática e boas práticas de código.
- **React** (ou framework frontend de sua escolha): para criação dos componentes e estrutura da interface.
- **Material Design (MUI)**: para construção de componentes responsivos e visualmente atraentes.
- **PokeAPI**: API pública usada para obter as informações dos Pokémon.
- **API Mock**: fornecida para simular o envio de comentários e interações.

## Guia de Implementação

1. **Clonando o Repositório**
   Clone este repositório em seu ambiente local:
   ```bash
   git clone https://github.com/seu-usuario/frontend-pokemon-test.git
