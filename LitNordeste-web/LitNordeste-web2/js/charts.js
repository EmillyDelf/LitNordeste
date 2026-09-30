// Gráficos derivados do catálogo de obras.
let graficos = [];

function obterCoresDoTema() {
    const escuro = document.documentElement.getAttribute('data-theme') === 'dark';
    return {
        texto: escuro ? '#e2e8f0' : '#1a202c',
        grade: escuro ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
        fundo: escuro ? '#1e3328' : '#ffffff',
        barras: ['#1E5D3B', '#3F8060', '#A8C9B5', '#5a9e78', '#c8a96e']
    };
}

function contarPor(campo) {
    return obras.reduce((contagem, obra) => {
        contagem[obra[campo]] = (contagem[obra[campo]] || 0) + 1;
        return contagem;
    }, {});
}

function opcoesCartesianas(titulo, cores) {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            title: {
                display: true, text: titulo, color: cores.texto,
                font: { size: 13, weight: '600' }, padding: { bottom: 12 }
            },
            tooltip: {
                backgroundColor: cores.fundo, titleColor: cores.texto,
                bodyColor: cores.texto, borderColor: cores.barras[2],
                borderWidth: 1, padding: 10
            }
        },
        scales: {
            x: { grid: { color: cores.grade }, ticks: { color: cores.texto } },
            y: { grid: { color: cores.grade }, ticks: { color: cores.texto } }
        }
    };
}

function inicializarGraficos() {
    graficos.forEach(grafico => grafico.destroy());
    graficos = [];
    if (typeof Chart === 'undefined') return;

    const cores = obterCoresDoTema();
    Chart.defaults.color = cores.texto;
    Chart.defaults.borderColor = cores.grade;
    Chart.defaults.font.family = "'Inter', 'Helvetica Neue', sans-serif";
    Chart.defaults.font.size = 12;

    const anos = obras.map(obra => obra.ano);
    const contagemAnos = contarPor('ano');
    const anosExibidos = Array.from(
        { length: Math.max(...anos) - Math.min(...anos) + 1 },
        (_, indice) => String(Math.min(...anos) + indice)
    );
    const evolucao = document.getElementById('graficoEvolucao');
    if (evolucao) {
        const opcoes = opcoesCartesianas('Publicações catalogadas por ano', cores);
        opcoes.plugins.legend.display = true;
        opcoes.plugins.legend.labels = { color: cores.texto, usePointStyle: true };
        opcoes.scales.y.beginAtZero = true;
        opcoes.scales.y.ticks.stepSize = 1;
        graficos.push(new Chart(evolucao, {
            type: 'line',
            data: {
                labels: anosExibidos,
                datasets: [{
                    label: 'Obras', data: anosExibidos.map(ano => contagemAnos[ano] || 0),
                    borderColor: cores.barras[0], backgroundColor: 'rgba(30, 93, 59, 0.12)',
                    borderWidth: 2.5, pointBackgroundColor: cores.barras[0],
                    pointBorderColor: cores.fundo, pointBorderWidth: 2,
                    pointRadius: 5, fill: true, tension: 0.4
                }]
            },
            options: opcoes
        }));
    }

    const generos = contarPor('genero');
    const categorias = document.getElementById('graficoCategorias');
    if (categorias) {
        graficos.push(new Chart(categorias, {
            type: 'doughnut',
            data: {
                labels: Object.keys(generos),
                datasets: [{
                    data: Object.values(generos),
                    backgroundColor: cores.barras, borderColor: cores.fundo,
                    borderWidth: 3, hoverOffset: 6
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false, cutout: '68%',
                plugins: {
                    legend: {
                        display: true, position: 'bottom',
                        labels: { color: cores.texto, usePointStyle: true, padding: 12 }
                    },
                    title: {
                        display: true, text: 'Distribuição por gênero', color: cores.texto,
                        font: { size: 13, weight: '600' }, padding: { bottom: 12 }
                    }
                }
            }
        }));
    }

    const comparativo = document.getElementById('graficoComparativo');
    if (comparativo) {
        const opcoes = opcoesCartesianas('Comparativo de obras (páginas)', cores);
        opcoes.indexAxis = 'y';
        opcoes.scales.x.beginAtZero = true;
        opcoes.scales.y.ticks.font = { size: 11 };
        opcoes.plugins.tooltip.callbacks = {
            label: contexto => ` ${contexto.parsed.x} páginas`,
            afterLabel: contexto => `Fonte: ${obras[contexto.dataIndex].fonte}`
        };
        graficos.push(new Chart(comparativo, {
            type: 'bar',
            data: {
                labels: obras.map(obra => obra.titulo),
                datasets: [{
                    label: 'Páginas', data: obras.map(obra => obra.paginas),
                    backgroundColor: cores.barras, borderColor: cores.barras,
                    borderWidth: 1.5, borderRadius: 4
                }]
            },
            options: opcoes
        }));
    }

    const editoras = contarPor('editora');
    const graficoEditoras = document.getElementById('graficoEditoras');
    if (graficoEditoras) {
        const opcoes = opcoesCartesianas('Obras por editora', cores);
        opcoes.scales.y.beginAtZero = true;
        opcoes.scales.y.ticks.stepSize = 1;
        graficos.push(new Chart(graficoEditoras, {
            type: 'bar',
            data: {
                labels: Object.keys(editoras),
                datasets: [{
                    label: 'Obras', data: Object.values(editoras),
                    backgroundColor: cores.barras, borderColor: cores.barras,
                    borderWidth: 1.5, borderRadius: 6
                }]
            },
            options: opcoes
        }));
    }

    const paginasPorGenero = obras.reduce((totais, obra) => {
        totais[obra.genero] = (totais[obra.genero] || 0) + obra.paginas;
        return totais;
    }, {});
    const panorama = document.getElementById('graficoPanorama');
    if (panorama) {
        const opcoes = opcoesCartesianas('Páginas catalogadas por gênero', cores);
        opcoes.scales.y.beginAtZero = true;
        opcoes.plugins.tooltip.callbacks = {
            label: contexto => ` ${contexto.parsed.y} páginas nas edições físicas catalogadas`
        };
        graficos.push(new Chart(panorama, {
            type: 'bar',
            data: {
                labels: Object.keys(paginasPorGenero),
                datasets: [{
                    label: 'Páginas', data: Object.values(paginasPorGenero),
                    backgroundColor: cores.barras, borderColor: cores.barras,
                    borderWidth: 1.5, borderRadius: 6
                }]
            },
            options: opcoes
        }));
    }
}

function atualizarTemaGraficos() {
    setTimeout(inicializarGraficos, 100);
}
