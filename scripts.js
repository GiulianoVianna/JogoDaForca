const palavras = [
    "banana",
    "cachorro",
    "elefante",
    "girafa",
    "hipopótamo",
    "lagarto",
    "macaco",
    "navio",
    "ovelha",
    "tartaruga"
];

let palavraEscolhida = "";
let estadoPalavra = [];
let tentativasRestantes = 6;

const exibicaoPalavra = document.querySelector(".word-display");
const elementoTentativasRestantes = document.querySelector(".remaining-guesses");
const entradaPalpite = document.querySelector(".guess-input");
const botaoPalpite = document.querySelector(".guess-button");

function escolherPalavraAleatoria() {
    const indiceAleatorio = Math.floor(Math.random() * palavras.length);
    return palavras[indiceAleatorio];
}

function atualizarExibicaoPalavra() {
    exibicaoPalavra.textContent = estadoPalavra.join(" ");
}

function atualizarTentativasRestantes() {
    elementoTentativasRestantes.textContent = `Tentativas restantes: ${tentativasRestantes}`;
}

function reiniciarJogo() {
    palavraEscolhida = escolherPalavraAleatoria();
    estadoPalavra = Array(palavraEscolhida.length).fill("_");
    tentativasRestantes = 6;
    atualizarExibicaoPalavra();
    atualizarTentativasRestantes();
    entradaPalpite.value = "";
}

function tratarPalpite() {
    const letraPalpite = entradaPalpite.value.toLowerCase();
    entradaPalpite.value = "";

    if (letraPalpite.length !== 1 || !/^[a-zà-ú]$/.test(letraPalpite)) {
        alert("Digite apenas uma letra de 'a' a 'z' ou 'A' a 'Z'.");
        return;
    }

    let acertou = false;

    for (let i = 0; i < palavraEscolhida.length; i++) {
        if (palavraEscolhida[i] === letraPalpite) {
            estadoPalavra[i] = letraPalpite;
            acertou = true;
        }
    }

    if (acertou) {
        atualizarExibicaoPalavra();

        if (!estadoPalavra.includes("_")) {
            setTimeout(() => {
                alert("Parabéns! Você adivinhou a palavra!");
                reiniciarJogo();
            }, 100);
        }
    } else {
        tentativasRestantes--;
        atualizarTentativasRestantes();

        if (tentativasRestantes === 0) {
            setTimeout(() => {
                alert(`Fim de jogo! A palavra era: ${palavraEscolhida}`);
                reiniciarJogo();
            }, 100);
        }
    }
}

botaoPalpite.addEventListener("click", tratarPalpite);

reiniciarJogo();
