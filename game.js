// Phaser 3 Neon Tetris - Fixed Version
const config = {
    type: Phaser.AUTO,
    width: 320,
    height: 640,
    parent: 'game-container',
    backgroundColor: '#000000',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 32;

// Tetromino definitions
const SHAPES = {
    'I': [[0,0,0,0], [1,1,1,1], [0,0,0,0], [0,0,0,0]],
    'J': [[1,0,0], [1,1,1], [0,0,0]],
    'L': [[0,0,1], [1,1,1], [0,0,0]],
    'O': [[1,1], [1,1]],
    'S': [[0,1,1], [1,1,0], [0,0,0]],
    'T': [[0,1,0], [1,1,1], [0,0,0]],
    'Z': [[1,1,0], [0,1,1], [0,0,0]]
};

const COLORS = {
    'I': 0x00f3ff,
    'J': 0x0055ff,
    'L': 0xff8c00,
    'O': 0xffff00,
    'S': 0x00ff00,
    'T': 0xbc13fe,
    'Z': 0xff3131
};

let board = [];
let activePiece = null;
let score = 0;
let level = 1;
let dropCounter = 0;
let dropInterval = 1000;
let softDropCounter = 0;
let softDropInterval = 50; // Speed of soft drop in ms
let gameState = 'INTRO'; // INTRO, PLAYING, GAMEOVER

let cursors;
let graphics;
let emitters = {};

// DOM Elements
const overlay = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlay-title');
const startBtn = document.getElementById('start-btn');
const scoreUI = document.getElementById('score-value');
const levelUI = document.getElementById('level-value');

function preload() {}

function create() {
    graphics = this.add.graphics();
    cursors = this.input.keyboard.createCursorKeys();
    
    // Create board
    initBoard();

    // Start Button Event
    startBtn.onclick = () => {
        startGame.call(this);
    };

    // Keyboard inputs
    this.input.keyboard.on('keydown-UP', () => {
        if (gameState !== 'PLAYING') return;
        rotatePiece();
    });

    this.input.keyboard.on('keydown-SPACE', () => {
        if (gameState !== 'PLAYING') return;
        hardDrop.call(this);
    });

    // Particle Emitters
    Object.keys(COLORS).forEach(key => {
        emitters[key] = this.add.particles(0, 0, createParticleTexture(this, COLORS[key]), {
            lifespan: 800,
            speed: { min: 150, max: 250 },
            scale: { start: 1, end: 0 },
            alpha: { start: 1, end: 0 },
            blendMode: 'ADD',
            emitting: false
        });
    });
}

function initBoard() {
    board = [];
    for (let r = 0; r < ROWS; r++) {
        board[r] = new Array(COLS).fill(0);
    }
}

function startGame() {
    initBoard();
    score = 0;
    level = 1;
    dropInterval = 1000;
    updateScoreUI();
    levelUI.innerText = level;
    
    overlay.classList.add('hidden');
    gameState = 'PLAYING';
    resetPiece.call(this);
}

function update(time, delta) {
    if (gameState !== 'PLAYING') {
        draw.call(this); // Keep drawing the board/intro state
        return;
    }

    // Normal Drop
    dropCounter += delta;
    if (dropCounter > dropInterval) {
        dropPiece.call(this);
        dropCounter = 0;
    }

    // Horizontal movement
    if (Phaser.Input.Keyboard.JustDown(cursors.left)) {
        movePiece(-1, 0);
    } else if (Phaser.Input.Keyboard.JustDown(cursors.right)) {
        movePiece(1, 0);
    }

    // Soft Drop - Fixed with its own interval to prevent freeze
    if (cursors.down.isDown) {
        softDropCounter += delta;
        if (softDropCounter > softDropInterval) {
            dropPiece.call(this);
            softDropCounter = 0;
        }
    } else {
        softDropCounter = 0;
    }

    draw.call(this);
}

function createParticleTexture(scene, color) {
    const key = 'particle_' + color;
    if (scene.textures.exists(key)) return key;
    
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });
    graphics.fillStyle(color, 1);
    graphics.fillCircle(4, 4, 4);
    graphics.generateTexture(key, 8, 8);
    return key;
}

function draw() {
    graphics.clear();

    // Draw board
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (board[r][c]) {
                drawBlock(c, r, COLORS[board[r][c]]);
            }
        }
    }

    // Draw active piece
    if (activePiece && gameState === 'PLAYING') {
        const color = COLORS[activePiece.type];
        activePiece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    drawBlock(activePiece.x + x, activePiece.y + y, color);
                }
            });
        });
    }

    // Grid lines
    graphics.lineStyle(1, 0x333333, 0.3);
    for (let x = 0; x <= COLS; x++) {
        graphics.moveTo(x * BLOCK_SIZE, 0);
        graphics.lineTo(x * BLOCK_SIZE, ROWS * BLOCK_SIZE);
    }
    for (let y = 0; y <= ROWS; y++) {
        graphics.moveTo(0, y * BLOCK_SIZE);
        graphics.lineTo(COLS * BLOCK_SIZE, y * BLOCK_SIZE);
    }
    graphics.strokePath();
}

function drawBlock(x, y, color) {
    graphics.fillStyle(color, 0.8);
    graphics.fillRect(x * BLOCK_SIZE + 1, y * BLOCK_SIZE + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2);
    graphics.lineStyle(2, color, 1);
    graphics.strokeRect(x * BLOCK_SIZE + 2, y * BLOCK_SIZE + 2, BLOCK_SIZE - 4, BLOCK_SIZE - 4);
}

function resetPiece() {
    const types = 'IJLOSTZ';
    const type = types[Math.floor(Math.random() * types.length)];
    activePiece = {
        type: type,
        shape: SHAPES[type],
        x: Math.floor(COLS / 2) - Math.floor(SHAPES[type][0].length / 2),
        y: 0
    };

    if (collide()) {
        triggerGameOver();
    }
}

function triggerGameOver() {
    gameState = 'GAMEOVER';
    overlayTitle.innerHTML = "GAME OVER<br><span style='font-size:24px'>Score: " + score + "</span>";
    startBtn.innerText = "Try Again";
    overlay.classList.remove('hidden');
}

function collide(newX = activePiece.x, newY = activePiece.y, newShape = activePiece.shape) {
    for (let y = 0; y < newShape.length; y++) {
        for (let x = 0; x < newShape[y].length; x++) {
            if (newShape[y][x]) {
                let boardX = newX + x;
                let boardY = newY + y;
                if (boardX < 0 || boardX >= COLS || boardY >= ROWS) return true;
                if (boardY >= 0 && board[boardY][boardX]) return true;
            }
        }
    }
    return false;
}

function movePiece(dx, dy) {
    if (!activePiece) return false;
    activePiece.x += dx;
    activePiece.y += dy;
    if (collide()) {
        activePiece.x -= dx;
        activePiece.y -= dy;
        return false;
    }
    return true;
}

function rotatePiece() {
    const rotated = activePiece.shape[0].map((_, i) =>
        activePiece.shape.map(row => row[i]).reverse()
    );
    const prevShape = activePiece.shape;
    activePiece.shape = rotated;
    if (collide()) activePiece.shape = prevShape;
}

function dropPiece() {
    if (!movePiece(0, 1)) {
        lockPiece.call(this);
    }
}

function hardDrop() {
    while (movePiece(0, 1)) {}
    lockPiece.call(this);
}

function lockPiece() {
    activePiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value && activePiece.y + y >= 0) {
                board[activePiece.y + y][activePiece.x + x] = activePiece.type;
            }
        });
    });

    updateScore.call(this, 10);
    clearLines.call(this);
    resetPiece.call(this);
}

function clearLines() {
    let linesCleared = 0;
    for (let r = ROWS - 1; r >= 0; r--) {
        if (board[r].every(value => value !== 0)) {
            for (let c = 0; c < COLS; c++) {
                const type = board[r][c];
                emitters[type].explode(12, c * BLOCK_SIZE + 16, r * BLOCK_SIZE + 16);
            }
            board.splice(r, 1);
            board.unshift(new Array(COLS).fill(0));
            linesCleared++;
            r++;
        }
    }

    if (linesCleared > 0) {
        const rewards = [0, 100, 300, 500, 800];
        updateScore.call(this, rewards[linesCleared] * level);
        if (score > level * 1000) {
            level++;
            dropInterval = Math.max(100, 1000 - (level - 1) * 100);
            levelUI.innerText = level;
        }
    }
}

function updateScore(points) {
    score += points;
    updateScoreUI();
}

function updateScoreUI() {
    if (scoreUI) scoreUI.innerText = score;
}
