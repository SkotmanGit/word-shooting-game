//Canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
//Objects
let player = [{ x: canvas.width / 2 - 7, y: canvas.height - 35, r: 14, hp: 100 }]; //x, y, hp
let normalEnemies = []; //x, y, word
let bullets = []; //x, y
let particles = []; //x, y, color
//Other
let hp = player.hp;
let enemySelected = false;
let lowestEnemyIndex;
let words = [
  "nejneobhospodářovávatelnějšími",
  "životopis",
  "frekvence",
  "dveře",
  "papírnictví",
  "dřevotříska",
  "hodinky",
  "remíza",
  "nástupiště",
  "svatba",
  "krok",
  "hrách",
  "soudnost",
  "moc",
  "mix",
  "nevolnost",
  "včelka",
  "lahvička",
  "šíp",
  "kopeček",
  "stůl",
  "objektiv",
  "plazma",
  "bodlina",
  "trhavina",
  "ještěrka",
  "plevel",
  "upozornění",
  "kuna",
  "společenství",
  "lednice",
  "cihla",
  "obraz",
  "křivka",
  "topol",
  "balík",
  "šváb",
  "pytel",
  "antilopa",
  "pomazánka",
  "dědeček",
  "pás",
  "okap",
  "civilista",
  "chlad",
  "květák",
  "lepidlo",
  "absence",
  "mince",
  "investice",
  "knot",
  "budíček",
  "stolička",
  "sídlo",
  "kvintet",
  "zlomenina",
  "vojsko",
  "poklad",
  "rampouch",
  "krychle",
  "zemina",
  "jablko",
  "plenka",
  "vesta",
  "hostina",
  "nářek",
  "kreativita",
  "neznalost",
  "řasa",
  "křičet",
  "učitel",
  "rytmus",
  "mouka",
  "kornout",
  "styl",
  "plyš",
  "těsto",
  "ryba",
  "pavel",
  "mechanik",
  "žebřík",
  "pendrek",
  "loučení",
  "lékařka",
  "nouze",
  "lupič",
  "živobytí",
  "potlesk",
  "vápenec",
  "ticho",
  "výmol",
  "ponožky",
  "bublina",
  "orangutan",
  "parašutista",
  "úpal",
  "slanina",
  "stěna",
  "tělo",
  "třída",
  "citoslovce",
  "pokladnička",
  "šachy",
  "profil",
  "kopr",
  "rybička",
  "švestka",
  "avatar",
  "radio",
  "traktorista",
  "kapr",
  "kroužek",
  "ústav",
  "žebřík",
  "býk",
  "sépie",
  "strojek",
  "papírnictví",
  "vlajka",
  "osel",
  "občanka",
  "hudebník",
  "cibule",
  "párek",
  "poskok",
  "sklář",
  "tenis",
  "alarm",
  "principál",
  "soudkyně",
  "kašpárek",
  "princ",
  "tříkolka",
  "známka",
  "poštovné",
  "čtyřkolka",
  "element",
  "jednatel",
  "čudlík",
  "palice",
  "molo",
  "nevědomost",
  "havránek",
  "sníh",
  "galerie",
  "nábytek",
  "cizinec",
  "džungle",
  "rande",
  "jistota",
  "datum",
  "štěrk",
  "výtok",
  "zmrzlina",
  "sušenky",
  "křída",
  "koření",
  "trhák",
  "šáteček",
  "hvězda",
  "plavidlo",
  "šedá",
  "poloostrov",
  "vybavení",
  "plech",
  "zubař",
  "frekvence",
  "moped",
  "hruška",
  "sklárna",
  "stav",
  "kružnice",
  "bůh",
  "goliáš",
  "konflikt",
  "filtr",
  "chlívek",
  "jasan",
  "nosorožec",
  "osvoboditelé",
  "zedník",
  "klávesnice",
  "brokovnice",
  "náplast",
  "otrava",
  "holinky",
  "romantika",
  "sekunda",
  "kravín",
  "sraz",
  "nádhera",
  "konev",
  "kytka",
  "ochota",
  "sprcha",
  "buk",
  "len",
  "hrošice",
  "brouček",
  "obr",
  "přání",
  "prodavačka",
  "vyzvánění",
  "růst",
  "záchod",
  "proces",
  "čaroděj",
  "kukačka",
  "zámečník",
  "experiment",
  "žula",
  "elektrárna",
  "vzduch",
  "spínač",
  "mast",
  "bohyně",
  "výuka",
  "kolibřík",
  "světlo",
  "podpaží",
  "figurka",
  "výpočet",
  "machr",
  "hodina",
  "vlasy",
  "herečka",
  "citoslovce",
  "sopka",
  "svoboda",
  "čmelák",
  "vysílač",
  "katapult",
  "párátko",
  "stan",
  "horolezec",
  "typ",
  "prášek",
  "tykev",
  "kamení",
  "oliva",
  "silikon",
  "horda",
  "hlad",
  "lano",
  "chameleon",
  "slámka",
  "kuš",
  "dárek",
  "modelína",
  "elita",
  "zástrčka",
  "sborník",
  "čekárna",
  "úplet",
  "desky",
  "panda",
  "rosnička",
  "krasavec",
  "běh",
  "láhev",
  "jádro",
  "zmije",
  "dráp",
  "koblížek",
  "srst",
  "vata",
  "končetina",
  "sedák",
];
let lifes = 100;
let score = 0;
//Editable variable
let scoreForLetter;
let scoreForWord;
//Stats
let lettersTyped = 0;
let mistakes = 0;
let accuracy;
//Intervals
let spawning;
let ticking;

//Classes
//---enemy---
class Enemy {
  constructor(canvas, words) {
    this.x = Math.round(Math.random() * canvas.width);
    this.y = Math.round((Math.random() * canvas.height) / -2) - 15;
    this.velocity = (Math.ceil(Math.random() * 10) + 5) / 50;
    this.word = words[Math.floor(Math.random() * words.length)];
    this.textWidth = ctx.measureText(this.word).width;
    this.select = false;
    this.explosionPower = 8;
  }
  update() {
    this.movementEnemies();
    this.drawEnemies();
  }
  updateWord(newWord) {
    this.word = newWord;
  }
  killEnemy() {
    if (this.word == "") {
      enemySelected = false;
      normalEnemies.splice(lowestEnemyIndex, 1);
      createExplosion(this.x, this.y, this.explosionPower);
    }
  }
  drawEnemies() {
    ctx.fillStyle = "rgb(50, 50, 50)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
    ctx.fill();
    this.select ? (ctx.fillStyle = "White") : (ctx.fillStyle = "rgb(180, 180, 180)");
    ctx.font = "18px Arial";
    ctx.textAlign = "right";
    ctx.fillText(`${this.word}`, this.x, this.y + 10);
  }
  movementEnemies() {
    let angle = Math.atan2(player[0].x - this.x, player[0].y - this.y);
    let velocity = 0.5;
    this.x += this.velocity * Math.sin(angle);
    this.y += this.velocity * 2 * Math.cos(angle);
  }
  isLastBullet() {
    if (this.word == "") {
      return true;
    }
    return false;
  }
}
//---bullet---
class Bullet {
  constructor(enemyX, enemyY, lowestEnemyIndex) {
    this.x = player[0].x;
    this.y = player[0].y;
    this.velocity = 10;
    this.enemyX = enemyX;
    this.enemyY = enemyY;
    this.enemyIndex = lowestEnemyIndex;
    this.isLast = normalEnemies[lowestEnemyIndex].isLastBullet();
  }
  update() {
    this.bulletDraw();
    this.bulletMove();
    if (this.y < normalEnemies[this.enemyIndex].y) this.bulletDestroy();
  }
  bulletDraw() {
    ctx.fillStyle = "Yellow";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }
  bulletMove() {
    let angle = Math.atan2(this.enemyX - this.x, this.enemyY - this.y);
    this.x += this.velocity * Math.sin(angle);
    this.y += this.velocity * Math.cos(angle);
  }
  bulletDestroy() {
    bullets.filter((bullet) => {
      if (this.x == bullet.x && this.y == bullet.y) {
        bullets.splice(bullets.indexOf(bullet), 1);
        if (this.isLast == true) normalEnemies.forEach((enemy) => enemy.killEnemy());
      }
    });
  }
}
// Particles functions

function createExplosion(x, y, speed) {
  for (let i = 0; i < 100; i++) {
    let particle = {
      x: x,
      y: y,
      size: Math.random() * 3 + 2, // Random size between 2 and 7
      color1: "yellow",
      color2: "red",
      deltaX: (Math.random() - 0.5) * speed, // Random horizontal speed
      deltaY: (Math.random() - 0.5) * speed, // Random vertical speed
    };
    particles.push(particle);
  }
  animateExplosion();
}

function animateExplosion() {
  if (particles.length > 0) {
    requestAnimationFrame(animateExplosion);

    for (var i = 0; i < particles.length; i++) {
      var particle = particles[i];
      particle.x += particle.deltaX;
      particle.y += particle.deltaY;
      particle.size = Math.max(0, particle.size - 0.15); // Ensure particle size is always >= 0

      ctx.fillStyle = Math.round(Math.random()) ? particle.color1 : particle.color2;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, Math.max(0, particle.size), 0, Math.PI * 2); // Ensure radius is always >= 0
      ctx.fill();

      if (particle.size <= 0) {
        particles.splice(i, 1);
        i--;
      }
    }
  }
}

//Functions
start();
function start() {
  spawning = setInterval(() => {
    spawnEnemies(); //Spustit na zacatku kazdeho levelu
  }, 2000);
  ticking = setInterval(() => {
    tick();
  }, 10);
}
function tick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bullets.forEach((bullet) => bullet.update());
  normalEnemies.forEach((enemy) => enemy.update());
  animateExplosion;
  drawPlayer();
  takeDamagePlayer();
  checkDeathPlayer();
}
function spawnEnemies() {
  //let numberOfEnemies = Math.round(Math.random()) * 3 + 4; //For level design
  normalEnemies.push(new Enemy(canvas, words));
}
function fireBullet(lowestEnemyIndex) {
  bullets.push(new Bullet(normalEnemies[lowestEnemyIndex].x, normalEnemies[lowestEnemyIndex].y, lowestEnemyIndex));
}
function drawPlayer() {
  ctx.fillStyle = "Wheat";
  ctx.beginPath();
  ctx.arc(player[0].x, player[0].y, player[0].r, 0, 2 * Math.PI);
  ctx.fill();
}
function takeDamagePlayer() {}
function checkDeathPlayer() {
  normalEnemies.forEach((enemy) => {
    if (enemy.y > player[0].y - 10) {
      resetGame();
    }
  });
}
function resetGame() {
  console.log("resetGame");
  clearInterval(spawning);
  clearInterval(ticking);
  normalEnemies = [];
}

//Player input
function selectEnemy(e) {
  if (!enemySelected) {
    let lowestEnemyY = 0;
    for (i = 0; i < normalEnemies.length; i++) {
      if (e.key == normalEnemies[i].word[0]) {
        if (lowestEnemyY < normalEnemies[i].y) {
          lowestEnemyY = normalEnemies[i].y;
          lowestEnemyIndex = i;
          enemySelected = true;
        }
      }
    }
    if (enemySelected) normalEnemies[lowestEnemyIndex].select = true;
  }
  if (enemySelected) {
    if (e.key == normalEnemies[lowestEnemyIndex].word[0]) {
      normalEnemies[lowestEnemyIndex].updateWord(normalEnemies[lowestEnemyIndex].word.slice(1));
      fireBullet(lowestEnemyIndex);
      score += 10;
      document.getElementById("scoreText").textContent = `Skóre: ${score}`;
    }
  }
}

window.addEventListener("keypress", (e) => {
  selectEnemy(e);
});

//Particles
