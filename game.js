// Phaser 3 Neon Tetris
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
let nextPiece = null;
let score = 0;
let level = 1;
let dropCounter = 0;
let dropInterval = 1000;
let gameOver = false;

let cursors;
let graphics;
let emitters = {};

function preload() {}

function create() {
    graphics = this.add.graphics();
    cursors = this.input.keyboard.createCursorKeys();
    
    // UI References
    this.scoreText = document.getElementById('score-value');
    this.levelText = document.getElementById('level-value');

    // Create board
    for (let r = 0; r < ROWS; r++) {
        board[r] = new Array(COLS).fill(0);
    }

    resetPiece.call(this);

    // Keyboard inputs
    this.input.keyboard.on('keydown-UP', () => {
        if (gameOver) return;
        rotatePiece();
    });

    this.input.keyboard.on('keydown-SPACE', () => {
        if (gameOver) return;
        hardDrop.call(this);
    });

    // Particle Emitters for each color
    Object.keys(COLORS).forEach(key => {
        emitters[key] = this.add.particles(0, 0, createParticleTexture(this, COLORS[key]), {
            lifespan: 1000,
            speed: { min: 100, max: 200 },
            scale: { start: 1, end: 0 },
            alpha: { start: 1, end: 0 },
            blendMode: 'ADD',
            emitting: false
        });
    });
}

function update(time, delta) {
    if (gameOver) return;

    dropCounter += delta;
    if (dropCounter > dropInterval) {
        dropPiece.call(this);
        dropCounter = 0;
    }

    // Horizontal movement with small delay
    if (Phaser.Input.Keyboard.JustDown(cursors.left)) {
        movePiece(-1, 0);
    } else if (Phaser.Input.Keyboard.JustDown(cursors.right)) {
        movePiece(1, 0);
    }

    if (cursors.down.isDown) {
        dropPiece.call(this);
    }

    draw.call(this);
}

function createParticleTexture(scene, color) {
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });
    graphics.fillStyle(color, 1);
    graphics.fillCircle(4, 4, 4);
    graphics.generateTexture('particle_' + color, 8, 8);
    return 'particle_' + color;
}

function draw() {
    graphics.clear();

    // Draw board
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (board[r][c]) {
                const color = COLORS[board[r][c]];
                drawBlock(c, r, color);
            }
        }
    }

    // Draw active piece
    if (activePiece) {
        const color = COLORS[activePiece.type];
        activePiece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    drawBlock(activePiece.x + x, activePiece.y + y, color);
                }
            });
        });
    }

    // Draw grid lines
    graphics.lineStyle(1, 0x333333, 0.5);
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
    // Main block
    graphics.fillStyle(color, 0.8);
    graphics.fillRect(x * BLOCK_SIZE + 1, y * BLOCK_SIZE + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2);
    
    // Neon glow
    graphics.lineStyle(2, color, 1);
    graphics.strokeRect(x * BLOCK_SIZE + 2, y * BLOCK_SIZE + 2, BLOCK_SIZE - 4, BLOCK_SIZE - 4);
    
    // Inner shimmer
    graphics.fillStyle(0xffffff, 0.3);
    graphics.fillRect(x * BLOCK_SIZE + 4, y * BLOCK_SIZE + 4, BLOCK_SIZE / 4, BLOCK_SIZE / 4);
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
        gameOver = true;
        alert("Game Over! Score: " + score);
        location.reload();
    }
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
    if (collide()) {
        activePiece.shape = prevShape;
    }
}

function dropPiece() {
    if (!movePiece(0, 1)) {
        lockPiece.call(this);
    }
}

function hardDrop() {
    while (movePiece(0, 1)) {
        // Just move down until collision
    }
    lockPiece.call(this);
}

function lockPiece() {
    activePiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                if (activePiece.y + y >= 0) {
                    board[activePiece.y + y][activePiece.x + x] = activePiece.type;
                }
            }
        });
    });

    // Score for placement
    updateScore(10);
    
    clearLines.call(this);
    resetPiece.call(this);
}

function clearLines() {
    let linesCleared = 0;
    for (let r = ROWS - 1; r >= 0; r--) {
        if (board[r].every(value => value !== 0)) {
            // Trigger Particles for this row
            for (let c = 0; c < COLS; c++) {
                const type = board[r][c];
                emitters[type].explode(10, c * BLOCK_SIZE + BLOCK_SIZE/2, r * BLOCK_SIZE + BLOCK_SIZE/2);
            }
            
            board.splice(r, 1);
            board.unshift(new Array(COLS).fill(0));
            linesCleared++;
            r++; // Check same row index again
        }
    }

    if (linesCleared > 0) {
        const rewards = [0, 100, 300, 500, 800];
        updateScore(rewards[linesCleared] * level);
        
        // Speed up
        if (score > level * 1000) {
            level++;
            dropInterval = Math.max(100, 1000 - (level - 1) * 100);
            this.levelText.innerText = level;
        }
    }
}

function updateScore(points) {
    score += points;
    this.scoreText.innerText = score;
}
