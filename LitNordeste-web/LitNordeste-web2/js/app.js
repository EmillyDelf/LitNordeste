const estado = {
    secaoAtiva: 'visao-geral',
    tema: 'light',
    filtroCategoria: 'todos',
    filtroAno: 'todos',
    filtroEditora: 'todos',
    termoBusca: '',
    listaFiltrada: null,
    ordenacaoTabela: {
        coluna: null,
        direcao: 'asc'
    }
};
document.addEventListener('DOMContentLoaded', function () {
    inicializarApp();
});
function inicializarApp() {
    carregarTema();
    renderizarIndicadores();
    renderizarObras();
    renderizarTabela();
    renderizarTrajetoria();
    renderizarNovoLivro();
    configurarNavegacao();
    configurarBusca();
    configurarFiltros();
    configurarOrdenacaoTabela();
    configurarBotaoTema();
    inicializarGraficos();
    navegarPara('visao-geral');
}
function configurarNavegacao() {
    const linksNav = document.querySelectorAll('[data-secao]');

    linksNav.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const secao = this.getAttribute('data-secao');
            navegarPara(secao);
            const offcanvas = document.getElementById('sidebarMobile');
            if (offcanvas) {
                const instancia = bootstrap.Offcanvas.getInstance(offcanvas);
                if (instancia) instancia.hide();
            }
        });
    });
}
function navegarPara(secao) {
    document.querySelectorAll('.secao-conteudo').forEach(function (el) {
        el.classList.remove('ativa');
        el.style.display = 'none';
    });
    const secaoEl = document.getElementById('secao-' + secao);
    if (secaoEl) {
        secaoEl.style.display = 'block';
        setTimeout(() => secaoEl.classList.add('ativa'), 10);
    }
    document.querySelectorAll('[data-secao]').forEach(function (link) {
        link.classList.remove('ativo');
        if (link.getAttribute('data-secao') === secao) {
            link.classList.add('ativo');
        }
    });
    const titulos = {
        'visao-geral': 'Visão Geral',
        'obras': 'Obras',
        'novo-livro': 'Lançamentos',
        'impacto-cultural': 'Panorama do Catálogo',
        'trajetoria': 'Trajetória'
    };
    const headerTitulo = document.getElementById('headerTitulo');
    if (headerTitulo) {
        headerTitulo.textContent = titulos[secao] || secao;
    }
    estado.secaoAtiva = secao;
    if (secao === 'visao-geral' || secao === 'impacto-cultural') {
        setTimeout(() => inicializarGraficos(), 50);
    }
    const main = document.getElementById('conteudoPrincipal');
    if (main) main.scrollTop = 0;
}
function configurarBotaoTema() {
    const btnTema = document.getElementById('btnTema');
    if (!btnTema) return;

    btnTema.addEventListener('click', function () {
        alternarTema();
    });
}
function alternarTema() {
    const novoTema = estado.tema === 'light' ? 'dark' : 'light';
    aplicarTema(novoTema);
}
function aplicarTema(tema) {
    estado.tema = tema;
    document.documentElement.setAttribute('data-theme', tema);
    localStorage.setItem('litnordeste-tema', tema);
    const icone = document.getElementById('iconeTema');
    if (icone) {
        icone.className = tema === 'dark'
            ? 'bi bi-sun-fill'
            : 'bi bi-moon-fill';
    }
    const btnTema = document.getElementById('btnTema');
    if (btnTema) {
        btnTema.setAttribute('aria-label',
            tema === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro');
    }
    atualizarTemaGraficos();
}
function carregarTema() {
    const temaSalvo = localStorage.getItem('litnordeste-tema');
    if (temaSalvo) {
        aplicarTema(temaSalvo);
    } else {
        const prefereDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        aplicarTema(prefereDark ? 'dark' : 'light');
    }
}
function renderizarIndicadores() {
    const elObras = document.getElementById('indObrasCatalogadas');
    if (elObras) elObras.textContent = autora.indicadores.obrasCatalogadas;
    const elPremios = document.getElementById('indPremios');
    if (elPremios) elPremios.textContent = obras.filter(obra => obra.premios.length > 0).length;
    const elCategorias = document.getElementById('indCategorias');
    if (elCategorias) elCategorias.textContent = autora.indicadores.categorias.length;
    const elDebut = document.getElementById('indDebut');
    if (elDebut) elDebut.textContent = autora.indicadores.anoDebutRomance;
}
function renderizarObras(lista) {
    const container = document.getElementById('containerObras');
    if (!container) return;
    const obrasParaRenderizar = lista !== undefined ? lista : obras;
    if (obrasParaRenderizar.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <div class="empty-state">
                    <i class="bi bi-search fs-1 opacity-50"></i>
                    <p class="mt-3 text-muted">Nenhuma obra encontrada para os filtros selecionados.</p>
                    <button class="btn btn-outline-verde btn-sm mt-2" onclick="limparFiltros()">
                        Limpar filtros
                    </button>
                </div>
            </div>`;
        return;
    }
    container.innerHTML = obrasParaRenderizar.map(function (obra) {
        const resumo = obra.descricao.length > 120
            ? `${obra.descricao.substring(0, 120)}...`
            : obra.descricao;
        return `
        <div class="col-sm-6 col-lg-4 col-xl-3 mb-4">
            <div class="card card-obra h-100 ${obra.destaque ? 'card-destaque' : ''}"
                 role="article"
                 aria-label="Obra: ${obra.titulo}">

                <div class="card-capa-wrapper">
                    <img
                        src="${obra.capa}"
                        alt="${obra.capaAlt}"
                        class="card-img-top card-capa"
                        loading="lazy"
                        onerror="this.src='assets/placeholder-capa.svg'"
                    />
                    <span class="badge-genero badge bg-verde-escuro">${obra.genero}</span>
                    ${obra.destaque ? '<span class="badge-destaque badge">Destaque</span>' : ''}
                </div>

                <div class="card-body d-flex flex-column">
                    <h5 class="card-title obra-titulo">${obra.titulo}</h5>
                    <div class="obra-meta mb-2">
                        <span class="meta-item"><i class="bi bi-calendar3"></i> ${obra.ano}</span>
                        <span class="meta-item"><i class="bi bi-building"></i> ${obra.editora}</span>
                        <span class="meta-item"><i class="bi bi-file-text"></i> ${obra.paginas} pág.</span>
                    </div>
                    <p class="card-text text-muted small flex-grow-1">${resumo}</p>

                    <div class="mt-auto pt-2">
                        <small class="d-block fonte-tag">Fonte:
                            <a href="${obra.fonteUrl}" target="_blank" rel="noopener noreferrer">${obra.fonte}</a>
                        </small>

                        ${obra.premios.length > 0
                            ? `<div class="mt-2"><i class="bi bi-trophy-fill text-warning"></i>
                               <small>${obra.premios[0]}</small></div>`
                            : ''}
                    </div>
                </div>
            </div>
        </div>`;
    }).join('');
}
function configurarBusca() {
    const campoBusca = document.getElementById('campoBusca');
    if (!campoBusca) return;

    campoBusca.addEventListener('input', function () {
        estado.termoBusca = this.value.toLowerCase().trim();
        aplicarFiltros();
    });
    const campoBuscaHeader = document.getElementById('campoBuscaHeader');
    if (campoBuscaHeader) {
        campoBuscaHeader.addEventListener('input', function () {
            estado.termoBusca = this.value.toLowerCase().trim();
            if (estado.secaoAtiva !== 'obras') navegarPara('obras');
            aplicarFiltros();
            if (campoBusca) campoBusca.value = this.value;
        });
    }
}
function configurarFiltros() {
    const selectAno = document.getElementById('filtroAno');
    if (selectAno) {
        const anos = [...new Set(obras.map(o => o.ano))].sort();
        anos.forEach(ano => {
            const opt = document.createElement('option');
            opt.value = ano;
            opt.textContent = ano;
            selectAno.appendChild(opt);
        });
        selectAno.addEventListener('change', function () {
            estado.filtroAno = this.value;
            aplicarFiltros();
        });
    }
    const selectEditora = document.getElementById('filtroEditora');
    if (selectEditora) {
        const editoras = [...new Set(obras.map(o => o.editora))];
        editoras.forEach(ed => {
            const opt = document.createElement('option');
            opt.value = ed;
            opt.textContent = ed;
            selectEditora.appendChild(opt);
        });
        selectEditora.addEventListener('change', function () {
            estado.filtroEditora = this.value;
            aplicarFiltros();
        });
    }
    document.querySelectorAll('[data-filtro-categoria]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            document.querySelectorAll('[data-filtro-categoria]').forEach(b => b.classList.remove('ativo'));
            this.classList.add('ativo');
            estado.filtroCategoria = this.getAttribute('data-filtro-categoria');
            aplicarFiltros();
        });
    });
}
function aplicarFiltros() {
    let resultado = [...obras];
    if (estado.filtroCategoria !== 'todos') {
        resultado = resultado.filter(o =>
            o.genero.toLowerCase() === estado.filtroCategoria.toLowerCase()
        );
    }
    if (estado.filtroAno !== 'todos') {
        resultado = resultado.filter(o =>
            String(o.ano) === String(estado.filtroAno)
        );
    }
    if (estado.filtroEditora !== 'todos') {
        resultado = resultado.filter(o =>
            o.editora === estado.filtroEditora
        );
    }
    if (estado.termoBusca) {
        resultado = resultado.filter(o =>
            o.titulo.toLowerCase().includes(estado.termoBusca) ||
            o.descricao.toLowerCase().includes(estado.termoBusca) ||
            o.genero.toLowerCase().includes(estado.termoBusca) ||
            o.editora.toLowerCase().includes(estado.termoBusca)
        );
    }

    renderizarObras(resultado);
    estado.listaFiltrada = resultado;
    ordenarEAtualizarTabela();
    atualizarContadorResultados(resultado.length);
}
function limparFiltros() {
    estado.filtroCategoria = 'todos';
    estado.filtroAno = 'todos';
    estado.filtroEditora = 'todos';
    estado.termoBusca = '';
    const campoBusca = document.getElementById('campoBusca');
    if (campoBusca) campoBusca.value = '';

    const selectAno = document.getElementById('filtroAno');
    if (selectAno) selectAno.value = 'todos';

    const selectEditora = document.getElementById('filtroEditora');
    if (selectEditora) selectEditora.value = 'todos';

    document.querySelectorAll('[data-filtro-categoria]').forEach(b => {
        b.classList.remove('ativo');
        if (b.getAttribute('data-filtro-categoria') === 'todos') b.classList.add('ativo');
    });

    aplicarFiltros();
}
function atualizarContadorResultados(total) {
    const el = document.getElementById('contadorResultados');
    if (el) {
        el.textContent = `${total} obra${total !== 1 ? 's' : ''} encontrada${total !== 1 ? 's' : ''}`;
    }
}
function renderizarTabela(lista) {
    const tbody = document.getElementById('tabelaObrasBody');
    if (!tbody) return;

    const obrasParaExibir = lista !== undefined ? lista : obras;

    if (obrasParaExibir.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted">
            Nenhuma obra encontrada.</td></tr>`;
        return;
    }

    tbody.innerHTML = obrasParaExibir.map(function (obra) {
        return `
        <tr>
            <td class="fw-semibold">${obra.titulo}</td>
            <td>${obra.ano}</td>
            <td><span class="badge badge-genero-tabela">${obra.genero}</span></td>
            <td>${obra.editora}</td>
            <td>${obra.paginas}</td>
            <td><a class="fonte-tag" href="${obra.fonteUrl}" target="_blank" rel="noopener noreferrer">${obra.fonte}</a></td>
        </tr>`;
    }).join('');
}
function configurarOrdenacaoTabela() {
    document.querySelectorAll('[data-ordenar]').forEach(function (th) {
        th.style.cursor = 'pointer';
        th.addEventListener('click', function () {
            const coluna = this.getAttribute('data-ordenar');
            if (estado.ordenacaoTabela.coluna === coluna) {
                estado.ordenacaoTabela.direcao =
                    estado.ordenacaoTabela.direcao === 'asc' ? 'desc' : 'asc';
            } else {
                estado.ordenacaoTabela.coluna = coluna;
                estado.ordenacaoTabela.direcao = 'asc';
            }
            document.querySelectorAll('[data-ordenar]').forEach(el => {
                el.querySelector('.sort-icon').textContent = '↕';
            });
            const direcaoIcone = estado.ordenacaoTabela.direcao === 'asc' ? '↑' : '↓';
            this.querySelector('.sort-icon').textContent = direcaoIcone;

            ordenarEAtualizarTabela();
        });
    });
}
function ordenarEAtualizarTabela() {
    const { coluna, direcao } = estado.ordenacaoTabela;
    const obrasOrdenadas = [...(estado.listaFiltrada || obras)];
    if (coluna) obrasOrdenadas.sort(function (a, b) {
        let valA = a[coluna];
        let valB = b[coluna];
        if (typeof valA === 'number' && typeof valB === 'number') {
            return direcao === 'asc' ? valA - valB : valB - valA;
        }
        const strA = String(valA).toLowerCase();
        const strB = String(valB).toLowerCase();
        if (direcao === 'asc') return strA < strB ? -1 : strA > strB ? 1 : 0;
        return strA > strB ? -1 : strA < strB ? 1 : 0;
    });

    renderizarTabela(obrasOrdenadas);
}
function renderizarTrajetoria() {
    const container = document.getElementById('containerTrajetoria');
    if (!container) return;

    container.innerHTML = trajetoria.map(function (evento, index) {
        const lado = index % 2 === 0 ? 'esquerda' : 'direita';
        return `
        <div class="timeline-item timeline-${lado}" data-id="${evento.id}">
            <div class="timeline-conector">
                <div class="timeline-ponto tipo-${evento.tipo}" aria-hidden="true"></div>
            </div>
            <div class="timeline-card card" role="article" aria-label="${evento.titulo}, ${evento.ano}">
                <div class="card-body">
                    <div class="timeline-ano">${evento.ano}</div>
                    <h5 class="timeline-titulo">${evento.titulo}</h5>
                    <p class="timeline-descricao text-muted small">${evento.descricao}</p>
                    ${evento.tipo === 'premio'
                        ? '<span class="badge bg-warning text-dark"><i class="bi bi-trophy-fill me-1"></i>Premiação</span>'
                        : ''}
                    <small class="d-block mt-2 fonte-texto">Fonte:
                        <a href="${evento.fonteUrl}" target="_blank" rel="noopener noreferrer">${evento.fonte}</a>
                    </small>
                </div>
            </div>
        </div>`;
    }).join('');
    configurarAnimacaoTimeline();
}
function configurarAnimacaoTimeline() {
    const itens = document.querySelectorAll('.timeline-item');
    if (!('IntersectionObserver' in window)) {
        itens.forEach(item => item.classList.add('visivel'));
        return;
    }

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visivel');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    itens.forEach(item => observer.observe(item));
}
function renderizarNovoLivro() {
    const livro = obras.find(o => o.destaque === true);
    if (!livro) return;
    const elTitulo = document.getElementById('novoLivroTitulo');
    if (elTitulo) elTitulo.textContent = livro.titulo;
    const campos = {
        'novoLivroAno': livro.ano,
        'novoLivroGenero': livro.genero,
        'novoLivroEditora': livro.editora,
        'novoLivroPaginas': livro.paginas,
        'novoLivroDescricao': livro.descricao,
        'novoLivroIsbn': livro.isbn
    };
    Object.entries(campos).forEach(([id, valor]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = valor;
    });

    const fonte = document.getElementById('novoLivroFonte');
    if (fonte) {
        fonte.href = livro.fonteUrl;
        fonte.textContent = livro.fonte;
    }
}
