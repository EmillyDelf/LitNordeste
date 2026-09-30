// Catálogo das edições físicas exibidas no dashboard.
// Fontes e diferenças entre edições estão documentadas no README.
const obras = [
    {
        id: 1, titulo: "A Cabeça do Santo", ano: 2014, genero: "Romance",
        editora: "Companhia das Letras", paginas: 176, isbn: "978-85-359-2369-8",
        capa: "assets/a-cabeca-do-santo-livro.jpg", capaAlt: "Capa do livro A Cabeça do Santo",
        descricao: "Samuel viaja a Candeia para cumprir o último pedido da mãe. Ali descobre que consegue ouvir as preces dirigidas a santo Antônio.",
        premios: [], fonte: "Companhia das Letras",
        fonteUrl: "https://n.companhiadasletras.com.br/livro/9788535923698/a-cabeca-do-santo"
    },
    {
        id: 2, titulo: "Oração para Desaparecer", ano: 2023, genero: "Romance",
        editora: "Companhia das Letras", paginas: 208, isbn: "978-65-592-1570-6",
        capa: "assets/oracao-pra-desaparecer-livro.jpg", capaAlt: "Capa do livro Oração para Desaparecer",
        descricao: "Sem memória de seu passado, Cida precisa reconstruir a vida em um lugar desconhecido. A narrativa entrelaça amor, ancestralidade e pertencimento.",
        premios: [], fonte: "Companhia das Letras",
        fonteUrl: "https://n.companhiadasletras.com.br/livro/9786559215706/oracao-para-desaparecer"
    },
    {
        id: 3, titulo: "A Bailarina Fantasma", ano: 2015, genero: "Infantojuvenil",
        editora: "Seguinte", paginas: 192, isbn: "978-85-65765-86-2",
        capa: "assets/a-bailarina-fantasma-livro.jpg", capaAlt: "Capa do livro A Bailarina Fantasma",
        descricao: "Anabela investiga o mistério de uma bailarina fantasma que aparece no Theatro José de Alencar, em Fortaleza.",
        premios: [], fonte: "Seguinte",
        fonteUrl: "https://n.companhiadasletras.com.br/livro/9788565765862/a-bailarina-fantasma"
    },
    {
        id: 4, titulo: "Ela Tem Olhos de Céu", ano: 2012, genero: "Infantil (cordel)",
        editora: "Gaivota", paginas: 36, isbn: "978-85-64816-22-0",
        capa: "assets/ela-tem-olhos-de-ceu-livro.jpg", capaAlt: "Capa do livro Ela Tem Olhos de Céu",
        descricao: "Em versos de cordel ilustrados por Mateus Rios, a chegada de Sebastiana transforma a vida de Santa Rita do Norte.",
        premios: ["Prêmio Jabuti 2013 — Infantil (1º lugar)"], fonte: "Editora Gaivota",
        fonteUrl: "https://www.editorabiruta.com.br/collections/livros-premiados-1/products/ela-tem-olhos-de-ceu"
    },
    {
        id: 5, titulo: "Amar é Inadiável", ano: 2026, genero: "Crônicas",
        editora: "Planeta", paginas: 224, isbn: "978-85-422-4314-7",
        capa: "assets/amar-e-inadiavel-livro.jpg", capaAlt: "Capa do livro Amar é Inadiável",
        descricao: "Reunião de mais de sessenta crônicas de Socorro Acioli sobre a escrita, os encontros e o cotidiano.",
        premios: [], fonte: "Planeta / Paulus",
        fonteUrl: "https://loja.paulus.com.br/amar-e-inadiavel/p", destaque: true
    }
];

const autora = {
    indicadores: {
        obrasCatalogadas: obras.length,
        categorias: [...new Set(obras.map(obra => obra.genero))],
        anoDebutRomance: 2014
    }
};

// Marcos com fonte editorial ou institucional identificada.
const trajetoria = [
    {
        id: 1, ano: "1975", titulo: "Nascimento em Fortaleza",
        descricao: "Socorro Acioli nasce em Fortaleza, no Ceará.", tipo: "origem",
        fonte: "Editora Biruta", fonteUrl: "https://www.editorabiruta.com.br/products/kit-socorro-acioli"
    },
    {
        id: 2, ano: "2012", titulo: "Ela Tem Olhos de Céu",
        descricao: "A Editora Gaivota publica o livro infantil em versos de cordel.", tipo: "obra",
        fonte: "Editora Gaivota", fonteUrl: obras[3].fonteUrl
    },
    {
        id: 3, ano: "2013", titulo: "Prêmio Jabuti",
        descricao: "Ela Tem Olhos de Céu recebe o primeiro lugar na categoria Infantil.", tipo: "premio",
        fonte: "Prêmio Jabuti", fonteUrl: "https://www.premiojabuti.com.br/jabuti/premiados-por-edicao/premiacao/?ano=2013"
    },
    {
        id: 4, ano: "2014", titulo: "A Cabeça do Santo",
        descricao: "A Companhia das Letras publica o primeiro romance da autora.", tipo: "obra",
        fonte: "Companhia das Letras", fonteUrl: obras[0].fonteUrl
    },
    {
        id: 5, ano: "2015", titulo: "A Bailarina Fantasma",
        descricao: "O selo Seguinte publica a história infantojuvenil ambientada no Theatro José de Alencar.", tipo: "obra",
        fonte: "Seguinte", fonteUrl: obras[2].fonteUrl
    },
    {
        id: 6, ano: "2023", titulo: "Oração para Desaparecer",
        descricao: "A Companhia das Letras publica o segundo romance da autora.", tipo: "obra",
        fonte: "Companhia das Letras", fonteUrl: obras[1].fonteUrl
    },
    {
        id: 7, ano: "2026", titulo: "Amar é Inadiável",
        descricao: "A Planeta lança a reunião de crônicas da autora.", tipo: "obra",
        fonte: "Planeta / Paulus", fonteUrl: obras[4].fonteUrl
    }
];
