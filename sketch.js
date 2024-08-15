//Variáveis da bolinha
let xBolinha = 100;
let yBolinha = 200;
let diametro = 22;
let raio = diametro / 2;

//Variáveis do oponente
let xRaqueteOponente = 735;
let yRaqueteOponente = 200;

//Velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//Variáveis da raquete
let xRaquete = 5;
let yRaquete = 200;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//Placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//Sons do jogo
let raquetada;
let ponto;
let trilha;

let colidiu = false;

function preload() {
  trilha = loadSound("Bonetrousle.mp3");
  ponto = loadSound("Coin.mp3");
  raquetada = loadSound("Metal pipe.mp3");
}

function setup() {
  createCanvas(750, 500);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  incluiPlacar();
  marcaPontos();
}
function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
  if (keyIsDown(87)) {
    yRaquete -= 10;
  }
  if (keyIsDown(83)) {
    yRaquete += 10;
  }
}

function verificaColisaoRaquete() {
  if (
    xBolinha - raio < xRaquete + raqueteComprimento &&
    yBolinha - raio < yRaquete + raqueteAltura &&
    yBolinha + raio > yRaquete
  ) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaquete(x, y) {
  colidiu = collideRectCircle(
    x,
    y,
    raqueteComprimento,
    raqueteAltura,
    xBolinha,
    yBolinha,
    raio
  );
  if (colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente() {
  if (keyIsDown(UP_ARROW)) {
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaqueteOponente += 10;
  }
}

function incluiPlacar() {
  textAlign(CENTER);
  textSize(30);
  fill(255);
  text(meusPontos, 200, 30);
  text(pontosOponente, 550, 30);
}

function marcaPontos() {
  if (xBolinha > 740) {
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 15) {
    pontosOponente += 1;
    ponto.play();
  }
}