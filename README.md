# Boas vindas à aplicação desenvolvida para o PSel XP - Trybe

Essa aplicação foi desenvolvida por [Gustavo Ferrari](https://www.linkedin.com/in/gustavodferrari/) 🧑‍💻

Esse projeto foi construído com base no pensamento Mobile First, então as telas ficam ~~ainda~~ mais bonitas quando em resolução que simulam um celular 📱

## Para acessar a aplicação, simplesmente clique [AQUI](https://psel-xp.vercel.app/) !! 😄

<details>
  <summary><strong>Caso queira baixar o repositório em sua máquina local e iniciá-la localmente, siga os passos abaixo:</strong></summary><br />

  ➡️ Clone esse repositório:
    `git clone git@github.com:Gustavo-Ferrari/psel_xp.git`

  ➡️ Entre no diretório destino do repositório:
    `cd psel_xp`
  
  ➡️ Instale a dependências necessárias:
    `npm install`

  ➡️ Execute a aplicação:
    `npm start`

</details>

## Decisões durante o desenvolvimento

As decisões de lógica de programação tomadas para realização deste projeto foram feitas com base nos métodos que considero ter mais domínio.

<details>
  <summary><strong>Uso do LINT padrão AirBnB</strong></summary><br />

  ➡️ Para a verificação da qualidade do código elaborado, utilizei o lint com as regras padronizadas pelo [AirBnB](https://www.npmjs.com/package/eslint-config-airbnb), amplamente utilizadas e aceitas pela comunidade; ✏️

</details>

<details>
  <summary><strong>Estilização</strong></summary><br />

  ➡️ A estilização deste projeto foi feita com CSS puro; 🎨

  ➡️ As cores e padrões utilizados foram retirados do material de referência enviado pela XP;

  ➡️ Pequenas alterações foram feitas para que o contraste ficasse adequado para visualização;


</details>

<details>
  <summary><strong>Uso do localStorage</strong></summary><br />
  
   - O <strong>Local Storage</strong> para salvamento de dados e manipulação posterior 💾

    ➡️ Salvamento do email utilizado para logar;

    ➡️ Data e hora do último login realizado;

    ➡️ Array de objetos contendo as ações disponíveis para compra ;

    ➡️ Array de objetos contendo as ações do cliente;

    ➡️ Saldo do cliente disponível em conta;
     
</details>

<details>
  <summary><strong>Validação de login</strong></summary><br />
  
  - Para acessar o applicativo, o usuário deve informar um e-mail em formato válido e uma senha com, no mínimo, 8 dígitos: 📧🔑

  - Para fins de teste da aplicação, pode-se inserir qualquer email e senha com formato válido.

  - Essa aplicação simula a interação de apenas um usuário com o applicativo.

  ➡️ Para validar o formato do e-mail e o tamanho mínimo da senha, utilizei da biblioteca [YUP](https://www.npmjs.com/package/yup);

</details>

<details>
  <summary><strong>Criação de um array de objetos com as ações disponíveis</strong></summary><br />
  
   ➡️ Uma vez decidido que iria usar o *Local Storage* e o *Estado Centralizadodo* do [REACT](https://pt-br.reactjs.org/)
  para poder trabalhar com as ações disponíveis para compra, busquei por ações recomendadas no período de
  construção desta aplicação [neste link](https://investnews.com.br/financas/melhores-acoes-de-2022-acumulado-junho/)

   ➡️ Criei um array de objetos contendo essas ações. 
  Após fazer o login, os dados desse array são enviados para o localStorage e para o estado centralizado, 
  para futuras manipulações. 📂

</details>

<details>
  <summary><strong>Verificações extras</strong></summary><br />
  
   - Validações extras foram inseridas para que o funcionamento da aplicação se aproxima-se um pouco da usabilidade real:

    ➡️ Não é possível comprar ações	se o saldo em conta for insuficiente 🚫

    ➡️ Não é possível comprar um número maior de ações do que disponível na corretora 🚫

    ➡️ Não é possível vender um número maior de ações do que o cliente possui 🚫

    ➡️ Os botões de compra e venda de ações são habilitados de forma dinâmica, de acordo
        com a possibilidade do cliente de realizar cada transação ✔️❌

    ➡️ Ao tentar realiar uma transação não permitida, o cliente recebe uma mensagem na tela informando 
        a impossibilidade de proseguir 🛑

</details>

<details>
  <summary><strong>Testes unitários e de integração</strong></summary><br />
   - A fim de monitorar o funcionamento correto do código, testes unitários e de integração foram realizados. 🩺

   - Ferramentas utilizadas para testes:

  ➡️ Crianção de um renderWithRouter para renderizar os componetes em ambiente de testes.

  ➡️ Biblioteca de testes [React Testting Library](https://testing-library.com/) 🦑

  ➡️ Framework de testes [JEST](https://jestjs.io/pt-BR/) 🃏

</details>


<details>
  <summary><strong>Deploy</strong></summary><br />
  
   - Para maior facilidade de acesso à aplicação, utilizei o [VERCEL](https://vercel.com/) para dara deploy 🚀

</details>

