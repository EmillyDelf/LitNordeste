# LitNordeste

> Dashboard literário sobre a produção de **Socorro Acioli**, desenvolvido para análise visual de uma seleção de obras da autora.

O **LitNordeste** é uma aplicação web acadêmica que reúne informações sobre cinco obras de Socorro Acioli e transforma esses dados em uma experiência visual de consulta e análise.

O dashboard apresenta **indicadores, gráficos, filtros, tabela de obras e linha do tempo**, permitindo visualizar informações editoriais e aspectos da trajetória da autora de forma organizada e responsiva.

---

## 📚 Sobre o projeto

O projeto foi desenvolvido com foco em **visualização e organização de dados literários**.

A aplicação utiliza uma seleção de cinco obras para apresentar informações como:

* título;
* ano de publicação;
* categoria;
* editora;
* quantidade de páginas;
* indicadores estatísticos;
* comparação entre obras;
* trajetória da autora;
* fontes utilizadas na pesquisa.

> **Importante:** a seleção apresentada no dashboard não representa toda a bibliografia de Socorro Acioli.

---

## ✨ Funcionalidades

* 📊 **Indicadores gerais** sobre as obras cadastradas;
* 📈 **Gráficos comparativos**;
* 📚 **Catálogo de obras**;
* 🔎 **Busca e filtros**;
* 📋 **Tabela detalhada**;
* 🕐 **Linha do tempo da trajetória da autora**;
* 🌙 **Tema claro e escuro**;
* 📱 **Layout responsivo**;
* 🧭 **Navegação por seções**;
* 🖼️ **Apresentação visual das obras**;
* 🔗 **Indicação das fontes utilizadas nos dados**.

---

## 🛠️ Tecnologias

| Tecnologia          | Utilização                           |
| ------------------- | ------------------------------------ |
| **HTML5**           | Estrutura semântica da aplicação     |
| **CSS3**            | Estilização, temas e personalizações |
| **Bootstrap 5**     | Grid, componentes e responsividade   |
| **JavaScript**      | Interações e renderização dinâmica   |
| **Chart.js**        | Criação dos gráficos                 |
| **Bootstrap Icons** | Ícones da interface                  |
| **Google Fonts**    | Tipografia                           |

---

## 📁 Estrutura do projeto

```text
LitNordeste/
│
├── assets/
│   ├── capas/
│   └── imagens/
│
├── css/
│   └── style.css
│
├── icons/
│
├── js/
│   ├── app.js
│   ├── charts.js
│   └── data.js
│
├── index.html
└── README.md
```

### Principais arquivos

| Arquivo         | Responsabilidade                                |
| --------------- | ----------------------------------------------- |
| `index.html`    | Estrutura principal da aplicação                |
| `css/style.css` | Estilos, temas e responsividade                 |
| `js/data.js`    | Dados das obras e trajetória                    |
| `js/charts.js`  | Criação e atualização dos gráficos              |
| `js/app.js`     | Navegação, filtros, tabela, tema e renderização |
| `assets/`       | Capas e imagens utilizadas no projeto           |

---

## 📖 Obras analisadas

Os gráficos e indicadores utilizam as cinco edições cadastradas no arquivo `js/data.js`.

| Obra                        | Edição utilizada                              |  Ano | Páginas |
| --------------------------- | --------------------------------------------- | ---: | ------: |
| **A Cabeça do Santo**       | Companhia das Letras — ISBN 978-85-359-2369-8 | 2014 |     176 |
| **Oração para Desaparecer** | Companhia das Letras — ISBN 978-65-592-1570-6 | 2023 |     208 |
| **A Bailarina Fantasma**    | Seguinte — ISBN 978-85-65765-86-2             | 2015 |     192 |
| **Ela Tem Olhos de Céu**    | Gaivota — ISBN 978-85-64816-22-0              | 2012 |      36 |
| **Amar é Inadiável**        | Planeta — ISBN 978-85-422-4314-7              | 2026 |     224 |

---

## 🔎 Fontes dos dados

Para manter a consistência das informações apresentadas no dashboard, os dados quantitativos foram associados a edições específicas das obras.

### Fontes principais

* [Companhia das Letras — A Cabeça do Santo](https://www.companhiadasletras.com.br/livro/9788535923698/a-cabeca-do-santo)
* [Companhia das Letras — Oração para Desaparecer](https://www.companhiadasletras.com.br/livro/9786559215706/oracao-para-desaparecer)
* [Companhia das Letras — A Bailarina Fantasma](https://www.companhiadasletras.com.br/livro/9788565765862/a-bailarina-fantasma)
* [Editora Biruta — Ela Tem Olhos de Céu](https://www.editorabiruta.com.br/collections/livros-premiados-1/products/ela-tem-olhos-de-ceu)
* [Paulus — Amar é Inadiável](https://loja.paulus.com.br/amar-e-inadiavel/p)

### Fontes complementares

* [Biblioteca Nacional — Ela Tem Olhos de Céu](https://acervo.bn.gov.br/sophia_web/acervo/detalhe/329733?i=4)
* [Planeta — Amar é Inadiável — e-book](https://lojadigital.planetadelivros.com.br/library/publication/amar-e-inadiavel)
* [Prêmio Jabuti — Premiados de 2013](https://www.premiojabuti.com.br/jabuti/premiados-por-edicao/premiacao/?ano=2013)
* [Editora Biruta — Socorro Acioli](https://www.editorabiruta.com.br/products/kit-socorro-acioli)

---

## 📝 Observações sobre os dados

Algumas obras possuem diferentes edições e formatos, que podem apresentar quantidades de páginas distintas.

Por esse motivo, o projeto utiliza **uma edição específica de cada obra** como referência para os gráficos e indicadores.

### Ela Tem Olhos de Céu

A **Biblioteca Nacional** registra um exemplar com **31 páginas**, enquanto a ficha editorial utilizada no projeto informa **36 páginas**.

O dashboard utiliza o valor de **36 páginas**, correspondente à edição selecionada para a análise.

### Amar é Inadiável

A edição física utilizada no projeto possui **224 páginas**, enquanto a versão digital disponibilizada pela Planeta registra **138 páginas**.

O dashboard utiliza o valor referente à **edição física selecionada**.

### Prêmio Jabuti

*Ela Tem Olhos de Céu* recebeu o **Prêmio Jabuti de 2013**, na categoria Infantil.

---

## 📊 Política de dados

O projeto segue algumas diretrizes para evitar a apresentação de informações sem comprovação:

* Não são inventados dados estatísticos.
* Informações quantitativas devem possuir fonte confiável.
* Dados sem confirmação são identificados como **"N/D"**.
* Informações ainda em pesquisa são identificadas como **"Em atualização"**.
* Sempre que possível, as fontes consultadas são documentadas.
* Avaliações numéricas de leitores sem fonte verificável foram removidas.

---

## 📱 Responsividade

O LitNordeste utiliza o sistema de **grid e componentes responsivos do Bootstrap 5**, complementados por estilos personalizados em `css/style.css`.

A interface foi planejada para diferentes tamanhos de tela:

* 📱 Celulares;
* 📱 Tablets;
* 💻 Notebooks;
* 🖥️ Monitores maiores.

Os componentes devem se adaptar à largura disponível, mantendo a navegação e a leitura dos dados.

---

## ♿ Acessibilidade

O projeto busca seguir boas práticas básicas de acessibilidade e usabilidade.

Entre as práticas adotadas estão:

* utilização de **HTML semântico**;
* textos alternativos para imagens;
* contraste adequado entre texto e fundo;
* hierarquia organizada de títulos;
* identificação visual de elementos interativos;
* navegação compreensível;
* adaptação para diferentes tamanhos de tela;
* utilização de ícones acompanhados de contexto textual quando necessário.

---

## 🎨 Identidade visual

A identidade visual do LitNordeste utiliza uma paleta baseada em tons de **verde**, buscando transmitir uma estética editorial relacionada à temática nordestina.

A cor principal utilizada no projeto é:

```text
#1E5D3B
```

A interface também utiliza tons complementares de verde para componentes, destaques, estados e elementos gráficos.

---

## 🚀 Como executar

Como o projeto utiliza **HTML, CSS e JavaScript**, não é necessário instalar dependências ou configurar um servidor backend.

### 1. Clone o repositório

```bash
git clone https://github.com/EmillyDelf/LitNordeste
```

### 2. Acesse a pasta

```bash
cd LitNordeste
```

### 3. Execute o projeto

Abra o arquivo:

```text
index.html
```

Também é possível utilizar uma extensão como **Live Server** no Visual Studio Code para executar a aplicação durante o desenvolvimento.

---

## 🎓 Contexto acadêmico

O **LitNordeste** foi desenvolvido como projeto acadêmico para a atividade:

**Dashboard de Estatísticas — Emilly e John**

O projeto tem como objetivo aplicar conceitos de:

* HTML semântico;
* CSS;
* Bootstrap;
* JavaScript;
* manipulação do DOM;
* visualização de dados;
* criação de gráficos;
* responsividade;
* organização de projetos web.

---

## 👩‍💻 Créditos

Projeto acadêmico desenvolvido por:

**@emilly.dev**
**@meunomeejohn_bungas**

---

## 📄 Licença

Este projeto foi desenvolvido para fins **acadêmicos e educacionais**.

As imagens, textos, capas de livros e demais materiais relacionados à autora e às suas obras podem estar protegidos por direitos autorais.

Antes de reutilizar qualquer material, consulte os respectivos **direitos autorais e condições de uso**.

---

