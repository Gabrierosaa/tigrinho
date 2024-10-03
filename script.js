const imagens = ['imgs/img1.png', 'imgs/img2.png', 'imgs/img3.png'];
let dinheiro = localStorage.getItem('dinheiro') ? parseInt(localStorage.getItem('dinheiro')) : 10;

function atualizarDinheiro() {
    document.getElementById('dinheiro').innerText = `Dinheiro: ${dinheiro}`;
    localStorage.setItem('dinheiro', dinheiro); // Salva o saldo no localStorage
}

function escolherImagemAleatoria() {
    const indiceAleatorio = Math.floor(Math.random() * imagens.length);
    return imagens[indiceAleatorio];
}

function piscar(tela, cor) {
    tela.classList.add(cor);
    setTimeout(() => {
        tela.classList.remove(cor);
    }, 1500);
}

document.getElementById('jogarBtn').addEventListener('click', () => {
    if (dinheiro <= 0) {
        alert("Você não tem mais dinheiro para jogar!");
        return;
    }

    const fileiras = document.querySelectorAll('.aposta .fileira');

    fileiras.forEach((fileira) => {
        const imagensFileira = fileira.querySelectorAll('img');
        imagensFileira.forEach((img) => {
            img.src = escolherImagemAleatoria();
        });
    });

    const fileiraDoMeio = document.querySelectorAll('#fileira2 img');
    const primeiraImagem = fileiraDoMeio[0].src;
    const todasIguais = Array.from(fileiraDoMeio).every(img => img.src === primeiraImagem);

    let ganho = 0;
    if (todasIguais) {
        if (primeiraImagem.includes('img3.png')) {
            ganho = 3;
        } else if (primeiraImagem.includes('img2.png')) {
            ganho = 2;
        } else if (primeiraImagem.includes('img1.png')) {
            ganho = 1;
        }
    }

    dinheiro = Math.max(dinheiro - 1 + ganho, 0);
    atualizarDinheiro();

    const resultadoTexto = document.getElementById('resultado');
    resultadoTexto.innerText = todasIguais ? `Você ganhou ${ganho}x!` : "Você perdeu!";
    setTimeout(() => {
        resultadoTexto.innerText = '';
    }, 3000);

    const apostaContainer = document.getElementById('apostaContainer');
    if (todasIguais) {
        piscar(apostaContainer, 'pisca-verde');
    } else {
        piscar(apostaContainer, 'pisca-vermelho');
    }
});

// Adiciona dinheiro ao clicar na nova área
document.getElementById('adicionarDinheiro').addEventListener('click', () => {
    dinheiro++;
    atualizarDinheiro();
});

// Atualiza o dinheiro na inicialização
atualizarDinheiro();
