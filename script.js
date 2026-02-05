const aulas = [
    { id: "64r4wCYbTsA", title: "01 - Bem-vindo(a) a introdução do Curso!", thumb: "https://picsum.photos/seed/v1/120/68" },
    { id: "jNQXAC9IVRw", title: "02 - Configuração Inicial", thumb: "https://picsum.photos/seed/v2/120/68" },
    { id: "9bZkp7q19f0", title: "03 - Estratégia de Vendas", thumb: "https://picsum.photos/seed/v3/120/68" },
    { id: "L_LUpnjgPso", title: "04 - Finalização e Suporte", thumb: "https://picsum.photos/seed/v4/120/68" }
];

const playlistContainer = document.getElementById('playlist');
const player = document.getElementById('mainPlayer');
const titleDisplay = document.getElementById('videoTitle');
let assistidas = new Set();

function fecharModal() { document.getElementById('modalCertificado').style.display = 'none'; }
function sair() { localStorage.clear(); window.location.replace("login.html"); }

function carregarPlaylist() {
    if (localStorage.getItem('logado') !== 'true' || !playlistContainer) return;
    player.src = `https://www.youtube.com/embed/${aulas[0].id}`;
    titleDisplay.innerText = aulas[0].title;
    assistidas.add(aulas[0].id);

    aulas.forEach((aula, index) => {
        const item = document.createElement('div');
        item.className = `video-item ${index === 0 ? 'active' : ''}`;
        item.innerHTML = `<img src="${aula.thumb}"> <div class="video-info"><h4>${aula.title}</h4></div>`;
        item.onclick = () => {
            player.src = `https://www.youtube.com/embed/${aula.id}?autoplay=1`;
            titleDisplay.innerText = aula.title;
            document.querySelectorAll('.video-item').forEach(el => el.classList.remove('active'));
            item.classList.add('active');
            assistidas.add(aula.id);
        };
        playlistContainer.appendChild(item);
    });

    const cardCert = document.createElement('div');
    cardCert.className = 'video-item certificado-item';
    cardCert.innerHTML = `<div class="icon-cert">🎓</div> <div class="video-info"><h4>OBTER CERTIFICADO</h4><small>Clique aqui após concluir</small></div>`;
    cardCert.onclick = () => {
        if (assistidas.size === aulas.length) { document.getElementById('modalCertificado').style.display = 'flex'; }
        else { alert("Finalize todas as aulas primeiro!"); }
    };
    playlistContainer.appendChild(cardCert);
}

async function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: "landscape" });
    const nome = document.getElementById('nomeAluno').value;
    if (!nome) return alert("Por favor, digite seu nome!");

    // Fundo Elegante
    doc.setFillColor(20, 20, 20);
    doc.rect(0, 0, 297, 210, 'F');
    
    // Moldura Dupla (Dourado e Azul)
    doc.setDrawColor(184, 134, 11); // Gold
    doc.setLineWidth(2);
    doc.rect(10, 10, 277, 190);
    doc.setDrawColor(62, 166, 255); // Blue
    doc.setLineWidth(1);
    doc.rect(13, 13, 271, 184);

    // Texto
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(45);
    doc.text("CERTIFICADO", 148.5, 55, { align: "center" });
    
    doc.setFontSize(18);
    doc.setTextColor(200, 200, 200);
    doc.text("Certificamos que para os devidos fins", 148.5, 80, { align: "center" });

    doc.setTextColor(62, 166, 255);
    doc.setFontSize(35);
    doc.text(nome.toUpperCase(), 148.5, 105, { align: "center" });

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text("concluiu com sucesso o curso de", 148.5, 130, { align: "center" });
    
    doc.setTextColor(218, 165, 32); // Goldenrod
    doc.setFontSize(26);
    doc.text("SOCIAL MEDIA DA GRINGA TOP 10/99", 148.5, 145, { align: "center" });

    doc.setTextColor(150, 150, 150);
    doc.setFontSize(14);
    doc.text(`Emitido em: ${new Date().toLocaleDateString('pt-BR')} | GRINGA IMPORTS`, 148.5, 180, { align: "center" });

    doc.save(`Certificado_SocialMedia_Gringa.pdf`);
}
document.addEventListener('DOMContentLoaded', carregarPlaylist);