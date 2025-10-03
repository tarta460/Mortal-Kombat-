const characters = {
  Pyro: { hp: 100, attack: 25, img: "assets/pyro.png" },
  Volt: { hp: 100, attack: 22, img: "assets/volt.png" },
  Aqua: { hp: 100, attack: 20, img: "assets/aqua.png" },
  Shade: { hp: 100, attack: 28, img: "assets/shade.png" },
};

let player = {};
let enemy = {};

function selectCharacter(name) {
  player = { ...characters[name], name };
  const enemyNames = Object.keys(characters).filter(c => c !== name);
  const randomEnemyName = enemyNames[Math.floor(Math.random() * enemyNames.length)];
  enemy = { ...characters[randomEnemyName], name: randomEnemyName };

  document.getElementById("selection-screen").classList.add("hidden");
  document.getElementById("battle-screen").classList.remove("hidden");

  document.getElementById("player-name").textContent = player.name;
  document.getElementById("player-hp").textContent = player.hp;
  document.getElementById("player-img").src = player.img;

  document.getElementById("enemy-name").textContent = enemy.name;
  document.getElementById("enemy-hp").textContent = enemy.hp;
  document.getElementById("enemy-img").src = enemy.img;

  log(`¡Comienza la batalla entre ${player.name} y ${enemy.name}!`);
}

function attack() {
  const playerHit = Math.floor(Math.random() * player.attack);
  const enemyHit = Math.floor(Math.random() * enemy.attack);

  enemy.hp -= playerHit;
  player.hp -= enemyHit;

  if (enemy.hp < 0) enemy.hp = 0;
  if (player.hp < 0) player.hp = 0;

  document.getElementById("enemy-hp").textContent = enemy.hp;
  document.getElementById("player-hp").textContent = player.hp;

  log(`${player.name} hace ${playerHit} de daño a ${enemy.name}`);
  log(`${enemy.name} contraataca con ${enemyHit} de daño`);

  if (enemy.hp === 0 || player.hp === 0) {
    document.getElementById("attack-btn").disabled = true;
    if (enemy.hp === 0 && player.hp === 0) {
      log("¡Empate!");
    } else if (enemy.hp === 0) {
      log(`¡${player.name} gana!`);
    } else {
      log(`¡${enemy.name} gana!`);
    }
  }
}

function log(msg) {
  const box = document.getElementById("log");
  box.innerHTML += `<p>${msg}</p>`;
  box.scrollTop = box.scrollHeight;
}
