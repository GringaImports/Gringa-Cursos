const aulas = [
    { id: "dQw4w9WgXcQ", title: "01 - Bem-vindo ao Treinamento", thumb: "https://picsum.photos/seed/v1/120/68" },
    { id: "jNQXAC9IVRw", title: "02 - Configuração Inicial", thumb: "https://picsum.photos/seed/v2/120/68" },
    { id: "9bZkp7q19f0", title: "03 - Estratégia de Vendas", thumb: "https://picsum.photos/seed/v3/120/68" },
    { id: "L_LUpnjgPso", title: "04 - Finalização e Suporte", thumb: "https://picsum.photos/seed/v4/120/68" }
];

const playlistContainer = document.getElementById('playlist');
const player = document.getElementById('mainPlayer');
const titleDisplay = document.getElementById('videoTitle');

function sair() {
    localStorage.clear(); // Limpa todos os dados de acesso
    window.location.replace("login.html");
}

function carregarPlaylist() {
    // Verificação extra dentro do JS
    if (localStorage.getItem('logado') !== 'true') return;

    if (!playlistContainer) return;

    // Carrega o primeiro vídeo automaticamente
    player.src = `https://www.youtube.com/embed/${aulas[0].id}`;
    titleDisplay.innerText = aulas[0].title;

    aulas.forEach((aula, index) => {
        const item = document.createElement('div');
        item.classList.add('video-item');
        if(index === 0) item.classList.add('active');

        item.innerHTML = `
            <img src="${aula.thumb}" alt="Miniatura">
            <div class="video-info">
                <h4>${aula.title}</h4>
            </div>
        `;

        item.onclick = () => {
            player.src = `https://www.youtube.com/embed/${aula.id}?autoplay=1`;
            titleDisplay.innerText = aula.title;
            document.querySelectorAll('.video-item').forEach(el => el.classList.remove('active'));
            item.classList.add('active');
            if(window.innerWidth <= 1024) window.scrollTo({top: 0, behavior: 'smooth'});
        };

        playlistContainer.appendChild(item);
    });
}

document.addEventListener('DOMContentLoaded', carregarPlaylist);