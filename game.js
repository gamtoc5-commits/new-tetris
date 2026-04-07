// Phaser 3 Tactile Playroom - Cute Tetris
const config = {
    type: Phaser.AUTO,
    width: 320,
    height: 640,
    parent: 'game-container',
    transparent: true,
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

// Piece Definitions
const SHAPES = {
    'I': [[0,0,0,0], [1,1,1,1], [0,0,0,0], [0,0,0,0]],
    'J': [[1,0,0], [1,1,1], [0,0,0]],
    'L': [[0,0,1], [1,1,1], [0,0,0]],
    'O': [[1,1], [1,1]],
    'S': [[0,1,1], [1,1,0], [0,0,0]],
    'T': [[0,1,0], [1,1,1], [0,0,0]],
    'Z': [[1,1,0], [0,1,1], [0,0,0]]
};

// Pastel Palette from Tailwind Config
const COLORS = {
    'I': 0xb8dffd, // secondary-container (Blue)
    'J': 0xaad1ee, // secondary-fixed-dim (Light Blue)
    'L': 0xfdb5d3, // primary-container (Pink)
    'O': 0xbdfac4, // tertiary-container (Green)
    'S': 0xeda7c5, // primary-fixed-dim (Light Pink)
    'T': 0xe1dbde, // surface-container-highest (Gray-Lavender)
    'Z': 0xf74b6d  // error-container (Soft Red)
};

const FACES = {
    'I': ':)', 
    'J': ':/', 
    'L': ';)', 
    'O': ':o', 
    'S': 'o_o', 
    'T': '^w^', 
    'Z': ':('
};

let board = [];
let activePiece = null;
let nextPiece = null;
let holdPiece = null;
let canHold = true;
let score = 0;
let level = 1;
let lines = 0;
let dropCounter = 0;
let dropInterval = 1000;
let softDropCounter = 0;
let softDropInterval = 50;
let gameState = 'INTRO'; // INTRO, PLAYING, GAMEOVER, PAUSED

let cursors;
let graphics;
let emitters = {};

// DOM Elements
const overlay = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlay-title');
const startBtn = document.getElementById('start-btn');
const uiScore = document.getElementById('score-value-ui');
const uiLevel = document.getElementById('level-value-ui');
const uiLines = document.getElementById('lines-value-ui');
const nextContainer = document.getElementById('next-piece-container');
const holdContainer = document.getElementById('hold-piece-container');

function preload() {}

function create() {
    graphics = this.add.graphics();
    cursors = this.input.keyboard.createCursorKeys();
    
    initBoard();

    // UI Buttons
    startBtn.onclick = () => startGame.call(this);
    
    // D-Pad UI 연동
    document.getElementById('btn-left').onclick = () => { if(gameState==='PLAYING') movePiece(-1, 0); };
    document.getElementById('btn-right').onclick = () => { if(gameState==='PLAYING') movePiece(1, 0); };
    document.getElementById('btn-rotate').onclick = () => { if(gameState==='PLAYING') rotatePiece(); };
    document.getElementById('btn-down').onclick = () => { if(gameState==='PLAYING') dropPiece.call(this); };
    document.getElementById('btn-drop').onclick = () => { if(gameState==='PLAYING') hardDrop.call(this); };
    document.getElementById('btn-hold').onclick = () => { if(gameState==='PLAYING') hold.call(this); };

    // Keyboard Listeners
    this.input.keyboard.on('keydown-UP', () => { if(gameState==='PLAYING') rotatePiece(); });
    this.input.keyboard.on('keydown-SPACE', () => { if(gameState==='PLAYING') hardDrop.call(this); });
    this.input.keyboard.on('keydown-C', () => { if(gameState==='PLAYING') hold.call(this); });
    this.input.keyboard.on('keydown-P', () => togglePause.call(this));

    // Particles (Pastel color burst)
    Object.keys(COLORS).forEach(key => {
        emitters[key] = this.add.particles(0, 0, createParticleTexture(this, COLORS[key]), {
            lifespan: 600,
            speed: { min: 100, max: 200 },
            scale: { start: 1, end: 0 },
            alpha: { start: 0.8, end: 0 },
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
    lines = 0;
    dropInterval = 1000;
    holdPiece = null;
    canHold = true;
    gameState = 'PLAYING';
    
    updateUI();
    overlay.classList.add('hidden');
    
    // Initial Spawn
    nextPiece = generateRandomPiece();
    spawnPiece.call(this);
}

function togglePause() {
    if (gameState === 'PLAYING') {
        gameState = 'PAUSED';
        overlayTitle.innerText = "Paused";
        startBtn.querySelector('.font-headline').innerText = "Resume";
        overlay.classList.remove('hidden');
    } else if (gameState === 'PAUSED') {
        gameState = 'PLAYING';
        overlay.classList.add('hidden');
    }
}

function update(time, delta) {
    if (gameState !== 'PLAYING') {
        draw.call(this);
        return;
    }

    // Normal Drop
    dropCounter += delta;
    if (dropCounter > dropInterval) {
        dropPiece.call(this);
        dropCounter = 0;
    }

    // Keyboard Inputs (JustDown)
    if (Phaser.Input.Keyboard.JustDown(cursors.left)) movePiece(-1, 0);
    if (Phaser.Input.Keyboard.JustDown(cursors.right)) movePiece(1, 0);

    // Soft Drop
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

function draw() {
    graphics.clear();

    // Board Blocks
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (board[r][c]) {
                drawBlock(c, r, board[r][c]);
            }
        }
    }

    // Active Piece
    if (activePiece && gameState === 'PLAYING') {
        activePiece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    drawBlock(activePiece.x + x, activePiece.y + y, activePiece.type);
                }
            });
        });
    }
}

function drawBlock(x, y, type) {
    const color = COLORS[type];
    const face = FACES[type];
    
    // Main Block (Rounded feel via shadow or just rectangle for now, Phaser has limited rounding in Graphics)
    graphics.fillStyle(color, 1);
    // Mimic rounded-md (approx 4-8px)
    graphics.fillRoundedRect(x * BLOCK_SIZE + 2, y * BLOCK_SIZE + 2, BLOCK_SIZE - 4, BLOCK_SIZE - 4, 6);
    
    // Subtle border/highlight
    graphics.lineStyle(1, 0xffffff, 0.4);
    graphics.strokeRoundedRect(x * BLOCK_SIZE + 3, y * BLOCK_SIZE + 3, BLOCK_SIZE - 6, BLOCK_SIZE - 6, 4);

    // Note: To draw the Face text, we'd normally use this.add.text, but for efficiency in draw loop,
    // we could use a texture. For now, I'll skip text in the raw graphics draw or add them as sprites.
    // Actually, I'll add text objects for faces to keep the "Cute" vibe!
}

// Optimized block face rendering:
// In a real Phaser game, we'd spawning sprites, but since we are using Graphics for the grid,
// we could use a Bitmapfont or simple Text. Let's stick to the current logic but add a "block visual" function.

function spawnPiece() {
    activePiece = nextPiece;
    nextPiece = generateRandomPiece();
    canHold = true;
    
    activePiece.x = Math.floor(COLS / 2) - Math.floor(activePiece.shape[0].length / 2);
    activePiece.y = 0;

    renderPreviews();

    if (collide()) {
        gameState = 'GAMEOVER';
        overlayTitle.innerHTML = "GAME OVER<br><span style='font-size:20px; color:#824a64; font-variant:normal;'>Score: " + score + "</span>";
        startBtn.querySelector('.font-headline').innerText = "Retry";
        overlay.classList.remove('hidden');
    }
}

function generateRandomPiece() {
    const types = 'IJLOSTZ';
    const type = types[Math.floor(Math.random() * types.length)];
    return {
        type: type,
        shape: SHAPES[type],
        x: 0,
        y: 0
    };
}

function hold() {
    if (!canHold) return;
    
    if (holdPiece === null) {
        holdPiece = { type: activePiece.type, shape: SHAPES[activePiece.type] };
        spawnPiece.call(this);
    } else {
        const temp = { type: activePiece.type, shape: SHAPES[activePiece.type] };
        activePiece = { type: holdPiece.type, shape: SHAPES[holdPiece.type], x: Math.floor(COLS/2)-2, y: 0 };
        holdPiece = temp;
        // Collision check after swap
        if (collide()) {
            // Swap back if collision
            holdPiece = activePiece;
            activePiece = temp;
        }
    }
    canHold = false;
    renderPreviews();
}

function renderPreviews() {
    // Next Piece HTML
    nextContainer.innerHTML = '';
    const nextGrid = document.createElement('div');
    nextGrid.className = 'grid grid-cols-4 gap-1';
    nextPiece.shape.forEach(row => {
        row.forEach(val => {
            const b = document.createElement('div');
            b.className = 'w-4 h-4 rounded-sm border border-white/20';
            if (val) {
                b.style.backgroundColor = '#' + COLORS[nextPiece.type].toString(16).padStart(6, '0');
            }
            nextGrid.appendChild(b);
        });
    });
    nextContainer.appendChild(nextGrid);

    // Hold Piece HTML
    holdContainer.innerHTML = '';
    if (holdPiece) {
        const holdGrid = document.createElement('div');
        holdGrid.className = 'grid grid-cols-4 gap-1';
        holdPiece.shape.forEach(row => {
            row.forEach(val => {
                const b = document.createElement('div');
                b.className = 'w-4 h-4 rounded-sm border border-white/20';
                if (val) b.style.backgroundColor = '#' + COLORS[holdPiece.type].toString(16).padStart(6, '0');
                holdGrid.appendChild(b);
            });
        });
        holdContainer.appendChild(holdGrid);
    } else {
        const icon = document.createElement('span');
        icon.className = 'material-symbols-outlined text-outline-variant text-4xl';
        icon.innerText = 'back_hand';
        holdContainer.appendChild(icon);
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

    addScore.call(this, 10);
    clearLines.call(this);
    spawnPiece.call(this);
}

function clearLines() {
    let linesInFrame = 0;
    for (let r = ROWS - 1; r >= 0; r--) {
        if (board[r].every(v => v !== 0)) {
            for (let c = 0; c < COLS; c++) {
                const type = board[r][c];
                emitters[type].explode(10, c * BLOCK_SIZE + 16, r * BLOCK_SIZE + 16);
            }
            board.splice(r, 1);
            board.unshift(new Array(COLS).fill(0));
            linesInFrame++;
            r++;
        }
    }

    if (linesInFrame > 0) {
        lines += linesInFrame;
        const pts = [0, 100, 300, 500, 800];
        addScore.call(this, pts[linesInFrame] * level);
        
        if (lines >= level * 10) {
            level++;
            dropInterval = Math.max(100, 1000 - (level - 1) * 100);
        }
        updateUI();
    }
}

function addScore(pts) {
    score += pts;
    updateUI();
}

function updateUI() {
    if (uiScore) uiScore.innerText = score.toLocaleString().padStart(7, '0');
    if (uiLevel) uiLevel.innerText = level.toString().padStart(2, '0');
    if (uiLines) uiLines.innerText = lines;
}

function createParticleTexture(scene, color) {
    const key = 'pastel_' + color;
    if (scene.textures.exists(key)) return key;
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(color, 1);
    g.fillCircle(4, 4, 4);
    g.generateTexture(key, 8, 8);
    return key;
}
