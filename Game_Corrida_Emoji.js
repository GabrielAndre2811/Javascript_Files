let corredores = [
  { emoji: "🤖", x: 0 },
  { emoji: "👽", x: 0 },
  { emoji: "👻", x: 0 },
  { emoji: "😾", x: 0 },
  { emoji: "🐸", x: 0 },
];
let ordemChegada = [];
let apostas = [];
let pontos = 0;
let corridasRestantes = 5;
let tela = "menu";
let botaoIniciar, botaoSair, botaoRefazer;
let botaoProximaCorrida;
let botoesEmoji = [];
let contagem = 3;
let tempoContagem = 0;
let pontuacaoUltimaCorrida = [];

function setup() {
  createCanvas(900, 600);
  textAlign(CENTER, CENTER);
  criarBotoesMenu();
}

function draw() {
  background(220);
  if (tela === "menu") {
    mostrarMenu();
  } else if (tela === "contagem") {
    mostrarContagem();
  } else if (tela === "corrida") {
    mostrarCorrida();
  } else if (tela === "ranking") {
    mostrarRanking();
  }
}

function criarBotoesMenu() {
  botaoIniciar = createButton("🎮 Iniciar Corrida");
  botaoIniciar.position(100, 200);
  botaoIniciar.mousePressed(() => {
    if (apostas.length === corredores.length) {
      tela = "contagem";
      contagem = 3;
      tempoContagem = millis();
      esconderBotoesMenu();
    }
  });

  botaoSair = createButton("🚪 Sair do Jogo");
  botaoSair.position(100, 250);
  botaoSair.mousePressed(() => {
    window.location.reload();
  });

  botaoRefazer = createButton("🔄 Refazer Ordem");
  botaoRefazer.position(100, 300);
  botaoRefazer.mousePressed(() => {
    apostas = [];
    botoesEmoji.forEach(btn => btn.remove());
    botoesEmoji = [];
    criarBotoesEmoji();
  });

  criarBotoesEmoji();
  estilizarBotoes();
}

function criarBotoesEmoji() {
  corredores.forEach((corr, i) => {
    let btn = createButton(corr.emoji);
    btn.position(400 + (i * 60), 200);
    btn.mousePressed(() => {
      if (!apostas.includes(corr.emoji) && apostas.length < corredores.length) {
        apostas.push(corr.emoji);
        btn.attribute("disabled", "");
      }
    });
    botoesEmoji.push(btn);
  });
}

function esconderBotoesMenu() {
  botaoIniciar.hide();
  botaoSair.hide();
  botaoRefazer.hide();
  botoesEmoji.forEach(btn => btn.hide());
}

function estilizarBotoes() {
  let botoes = [botaoIniciar, botaoSair, botaoRefazer, ...botoesEmoji];
  botoes.forEach(botao => {
    botao.style("padding", "10px 15px");
    botao.style("font-size", "18px");
    botao.style("border-radius", "10px");
    botao.style("margin", "5px");
    botao.style("background-color", "#3b82f6");
    botao.style("border", "none");
    botao.style("color", "white");
    botao.style("font-weight", "bold");
    botao.style("cursor", "pointer");
  });
}

function mostrarMenu() {
  fill(0);
  textSize(32);
  text("\uD83C\uDFC1 Jogo de Corrida Emoji \uD83C\uDFC1", width / 2, 100);
  textSize(18);
  text("Aposte na ordem dos corredores clicando nos emojis abaixo:", width / 2, 160);
  
  for (let i = 0; i < apostas.length; i++) {
   let emoji = apostas[i];
   let pontosGanho = pontuacaoUltimaCorrida[i] !== undefined ? `(${pontuacaoUltimaCorrida[i]} pts na ultima corrida)` : "";
    text(`${i + 1}º: ${emoji} ${pontosGanho}`, 550, 300 + i * 30);
  }
   const pontuacoes = [50, 30, 20, 10, 5];
  let textoPontuacoes = pontuacoes.map((p, i) => `${i + 1}º: ${p} pts`).join("   ");
   textSize(20);

  text(textoPontuacoes, width / 2, height - 25);
  textSize(20);
  text(`\uD83C\uDFAF Pontuação atual: ${pontos} pontos`, width / 2, 500);
}

function mostrarContagem() {
  background(220);
  strokeWeight(4);
  stroke("green");
  line(5, 70, 5, height);
  stroke("red");
  line(800, 70, 800, height);
  noStroke();

  for (let i = 0; i < corredores.length; i++) {
    let c = corredores[i];
    textSize(30);
    text(c.emoji, 0, 100 + i * 100);
  }

  textSize(50);
  fill(0);
  text(`Preparar... ${contagem}`, width / 2, 40);

  if (millis() - tempoContagem > 1000) {
    contagem--;
    tempoContagem = millis();
  }

  if (contagem < 0) {
    tela = "corrida";
    resetCorrida();
  }
}

function mostrarCorrida() {
  background(220);

  textSize(12);
  fill(0);
  for (let i = 0; i <= 100; i += 10) {
    let x = map(i, 0, 100, 0, 800);
    stroke(0);
    line(x, 50, x, 60);
    noStroke();
    text(i, x, 40);
  }

  fill(240);
  for (let i = 0; i < corredores.length; i++) {
    rect(0, 100 + i * 100 - 30, width, 60);
  }

  strokeWeight(4);
  stroke("green");
  line(5, 70, 5, height);
  stroke("red");
  line(800, 70, 800, height);
  noStroke();

  textSize(30);
  for (let i = 0; i < corredores.length; i++) {
    let c = corredores[i];
    if (!ordemChegada.includes(c.emoji)) c.x += random(5);
    text(c.emoji, c.x, 100 + i * 100);
  }

  for (let i = 0; i < corredores.length; i++) {
    let c = corredores[i];
    if (c.x >= 800 && !ordemChegada.includes(c.emoji)) {
      ordemChegada.push(c.emoji);
    }
  }

  mostrarRankingParcial();

  if (ordemChegada.length === corredores.length) {
    avaliarPontuacao();
    tela = "ranking";
  }
}

function mostrarRanking() {
  background(240);
  fill(0);
  textSize(28);
  text("\uD83C\uDFC1 Ranking da Corrida \uD83C\uDFC1", width / 2, 60);
  textSize(20);

  for (let i = 0; i < ordemChegada.length; i++) {
    let emoji = ordemChegada[i];
    let acertou = apostas[i] === emoji ? "✔️" : "❌";
    text(`${i + 1}º lugar: ${emoji} ${acertou}`, width / 2, 120 + i * 40);
  }

  textSize(22);
  text(`\uD83C\uDFAF Pontuação Atual: ${pontos} pontos`, width / 2, 400);

  if (corridasRestantes > 0) {
    textSize(18);
    text(`Corridas restantes: ${corridasRestantes}`, width / 2, 440);
    if (!botaoProximaCorrida) {
      criarBotaoProximaCorrida();
    }
  } else {
    textSize(24);
    text("\uD83C\uDFC6 Fim do jogo! Pontuação final: " + pontos, width / 2, 500);
  }
}

function criarBotaoProximaCorrida() {
  botaoProximaCorrida = createButton("➡️ Próxima Corrida");
  botaoProximaCorrida.position(width / 2 - 80, 530);
  botaoProximaCorrida.mousePressed(() => {
    corridasRestantes--;
    tela = "menu";
    apostas = [];
    ordemChegada = [];
    botaoProximaCorrida.remove();
    botaoProximaCorrida = null;
    botoesEmoji.forEach(btn => btn.remove());
    botoesEmoji = [];
    criarBotoesMenu();
  });
  estilizarBotao(botaoProximaCorrida);
}

function estilizarBotao(botao) {
  botao.style("padding", "10px 15px");
  botao.style("font-size", "18px");
  botao.style("border-radius", "10px");
  botao.style("margin", "5px");
  botao.style("background-color", "#10b981");
  botao.style("border", "none");
  botao.style("color", "white");
  botao.style("font-weight", "bold");
  botao.style("cursor", "pointer");
}

function mostrarRankingParcial() {
  let copia = [...corredores];
  copia.sort((a, b) => b.x - a.x);

  textSize(16);
  fill(50);
  text("📊 Ranking Parcial:", width / 2, height - 60);

  for (let i = 0; i < copia.length; i++) {
    text(`${i + 1}º ${copia[i].emoji}`, width / 2 - 100 + i * 70, height - 40);
  }

  // Tabelinha de pontos por colocação

  const pontuacoes = [50, 30, 20, 10, 5];
  let textoPontuacoes = pontuacoes.map((p, i) => `${i + 1}º: ${p} pts`).join("   ");
   textSize(18);

  text(textoPontuacoes, width / 2, height - 18);
}

function avaliarPontuacao() {
  const pontuacoes = [50, 30, 20, 10, 5];
  pontuacaoUltimaCorrida = []; // limpa os dados anteriores
  for (let i = 0; i < ordemChegada.length; i++) {
    if (ordemChegada[i] === apostas[i]) {
      pontos += pontuacoes[i];
      pontuacaoUltimaCorrida.push(pontuacoes[i]);
     } else {
      pontuacaoUltimaCorrida.push(0);
    }
  }
}

function keyPressed() {
  // Desativado - agora usamos botão
}

function resetCorrida() {
  corredores.forEach(c => c.x = 0);
  ordemChegada = [];
  loop();
}
