const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Carregamos os emojis
const emojis = [];
fetch("emojis.json")
  .then(response => response.json())
  .then(data => emojis.push(...data))
  .catch(error => console.error(error));

// Criamos a grade de cartas
const grid = [];
for (let i = 0; i < 4; i++) {
  const row = [];
  for (let j = 0; j < 4; j++) {
    const card = {
      x: i * 100,
      y: j * 100,
      width: 100,
      height: 100,
      emoji: null,
      flipped: false
    };
    row.push(card);
  }
  grid.push(row);
}

// Embaralhamos a grade de cartas
grid.sort(() => Math.random() - 0.5);

// Criamos o loop do jogo
let gameLoop = setInterval(update, 1000 / 60);

// Função de atualização
function update() {
  // Limpamos a tela
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenhamos a grade de cartas
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const card = grid[i][j];
      ctx.fillStyle = "white";
      ctx.fillRect(card.x, card.y, card.width, card.height);

      if (card.flipped) {
        // Desenhamos o emoji
        const emoji = emojis[card.emoji];
        ctx.drawImage(emoji, card.x, card.y, card.width, card.height);
      }
    }
  }
}

// Função de tratamento de eventos
canvas.addEventListener("click", event => {
  // Verificamos se o jogador clicou em alguma carta
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const card = grid[i][j];
      if (event.clientX >= card.x && event.clientX <= card.x + card.width &&
          event.clientY >= card.y && event.clientY <= card.y + card.height) {
        // Viramos a carta
        card.flipped = !card.flipped;
      }
    }
  }
});
