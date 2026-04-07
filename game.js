// Phaser 3 Tactile Playroom - Cute Tetris (400x800 Redesign)
const config = {
    type: Phaser.AUTO,
    width: 400,
    height: 800,
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
const BLOCK_SIZE = 40;

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

const COLORS = {
    'I': 0xb8dffd, // secondary-container
    'J': 0xeda7c5, // primary-fixed-dim
    'L': 0xfdb5d3, // primary-container
    'O': 0xbdfac4, // tertiary-container
    'S': 0xafebb6, // tertiary-fixed-dim
    'T': 0xe1dbde, // surface-container-highest
    'Z': 0xf74b6d  // error-container
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
let gameState = 'INTRO';
let dropCounter = 0;
let dropInterval = 1000;

let graphics;
let emitters = {};
let faceTexts = [];

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
    
    initBoard();
    updateUI();

    // UI Listeners
    startBtn.onclick = () => startGame.call(this);

    // D-Pad Mapping
    document.getElementById('btn-left').onclick = () => { if(gameState==='PLAYING') movePiece(-1, 0); };
    document.getElementById('btn-right').onclick = () => { if(gameState==='PLAYING') movePiece(1, 0); };
    document.getElementById('btn-rotate').onclick = () => { if(gameState==='PLAYING') rotatePiece(); };
    document.getElementById('btn-down').onclick = () => { if(gameState==='PLAYING') dropPiece.call(this); };
    document.getElementById('btn-drop').onclick = () => { if(gameState==='PLAYING') hardDrop.call(this); };
    document.getElementById('btn-hold').onclick = () => { if(gameState==='PLAYING') hold.call(this); };

    // Keyboard
    this.input.keyboard.on('keydown-LEFT', () => { if(gameState==='PLAYING') movePiece(-1, 0); });
    this.input.keyboard.on('keydown-RIGHT', () => { if(gameState==='PLAYING') movePiece(1, 0); });
    this.input.keyboard.on('keydown-UP', () => { if(gameState==='PLAYING') rotatePiece(); });
    this.input.keyboard.on('keydown-DOWN', () => { if(gameState==='PLAYING') dropPiece.call(this); });
    this.input.keyboard.on('keydown-SPACE', () => { if(gameState==='PLAYING') hardDrop.call(this); });
    this.input.keyboard.on('keydown-C', () => { if(gameState==='PLAYING') hold.call(this); });
    this.input.keyboard.on('keydown-P', () => togglePause.call(this));

    // Particle Emitters
    Object.keys(COLORS).forEach(key => {
        emitters[key] = this.add.particles(0, 0, createBlockTexture(this, COLORS[key], key), {
            lifespan: 600,
            speed: { min: 100, max: 200 },
            scale: { start: 1, end: 0 },
            alpha: { start: 0.8, end: 0 },
            emitting: false
        });
    });

    // Face Pool
    for (let i = 0; i < 4; i++) {
        faceTexts.push(this.add.text(0, 0, '', {
            fontFamily: 'Plus Jakarta Sans',
            fontSize: '18px',
            fontWeight: '900',
            color: '#302e30'
        }).setOrigin(0.5).setDepth(10).setVisible(false));
    }
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
    
    nextPiece = generateRandomPiece();
    spawnPiece.call(this);
}

function togglePause() {
    if (gameState === 'PLAYING') {
        gameState = 'PAUSED';
        overlayTitle.innerText = "PAUSED";
        startBtn.innerHTML = '<span class="material-symbols-outlined text-3xl" data-icon="play_arrow" style="font-variation-settings: \'FILL\' 1;">play_arrow</span> Resume Game';
        overlay.classList.remove('hidden');
    } else if (gameState === 'PAUSED') {
        gameState = 'PLAYING';
        overlay.classList.add('hidden');
    }
}

function update(time, delta) {
    if (gameState !== 'PLAYING') {
        draw.call(this); // Keep drawing board even if paused
        return;
    }

    dropCounter += delta;
    if (dropCounter > dropInterval) {
        dropPiece.call(this);
        dropCounter = 0;
    }

    draw.call(this);
}

function draw() {
    graphics.clear();
    faceTexts.forEach(t => t.setVisible(false));

    // Draw Board Blocks
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (board[r][c]) {
                drawBlock(c, r, board[r][c]);
            }
        }
    }

    // Draw Active Piece with Faces
    if (activePiece && gameState === 'PLAYING') {
        let textIdx = 0;
        activePiece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    const bX = activePiece.x + x;
                    const bY = activePiece.y + y;
                    drawBlock(bX, bY, activePiece.type);
                    
                    if (textIdx < faceTexts.length) {
                        const txt = faceTexts[textIdx++];
                        txt.setText(FACES[activePiece.type]);
                        txt.setPosition(bX * BLOCK_SIZE + (BLOCK_SIZE / 2), bY * BLOCK_SIZE + (BLOCK_SIZE / 2) + 2);
                        txt.setVisible(true);
                    }
                }
            });
        });
    }
}

function drawBlock(x, y, type) {
    const color = COLORS[type];
    graphics.fillStyle(color, 1);
    graphics.fillRoundedRect(x * BLOCK_SIZE + 3, y * BLOCK_SIZE + 3, BLOCK_SIZE - 6, BLOCK_SIZE - 6, 10);
    // Subtle inner bezel
    graphics.lineStyle(2, 0xffffff, 0.3);
    graphics.strokeRoundedRect(x * BLOCK_SIZE + 5, y * BLOCK_SIZE + 5, BLOCK_SIZE - 10, BLOCK_SIZE - 10, 8);
}

function spawnPiece() {
    activePiece = nextPiece;
    nextPiece = generateRandomPiece();
    canHold = true;
    
    activePiece.x = Math.floor(COLS / 2) - Math.floor(activePiece.shape[0].length / 2);
    activePiece.y = 0;

    renderPreviews();

    if (collide()) {
        gameState = 'GAMEOVER';
        overlayTitle.innerHTML = "GAME OVER<br><span style='font-size:20px; color:#824a64;'>Score: " + score + "</span>";
        startBtn.innerHTML = 'Retry Game';
        overlay.classList.remove('hidden');
    }
}

function generateRandomPiece() {
    const types = 'IJLOSTZ';
    const type = types[Math.floor(Math.random() * types.length)];
    return { type, shape: SHAPES[type], x: 0, y: 0 };
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
    }
    canHold = false;
    renderPreviews();
}

function renderPreviews() {
    // UI Previews (HTML)
    nextContainer.innerHTML = '';
    nextContainer.appendChild(createPieceGrid(nextPiece));

    holdContainer.innerHTML = '';
    if (holdPiece) {
        holdContainer.appendChild(createPieceGrid(holdPiece));
    } else {
        holdContainer.innerHTML = '<span class="material-symbols-outlined text-outline-variant text-4xl">back_hand</span>';
    }
}

function createPieceGrid(piece) {
    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-4 gap-1 transform scale-90';
    piece.shape.forEach(row => {
        row.forEach(val => {
            const b = document.createElement('div');
            b.className = 'w-4 h-4 rounded-md border border-white/20';
            if (val) {
                b.style.backgroundColor = '#' + COLORS[piece.type].toString(16).padStart(6, '0');
            } else {
                b.className += ' opacity-0';
            }
            grid.appendChild(b);
        });
    });
    return grid;
}

function collide(nX = activePiece.x, nY = activePiece.y, nS = activePiece.shape) {
    for (let y = 0; y < nS.length; y++) {
        for (let x = 0; x < nS[y].length; x++) {
            if (nS[y][x]) {
                let bX = nX + x;
                let bY = nY + y;
                if (bX < 0 || bX >= COLS || bY >= ROWS) return true;
                if (bY >= 0 && board[bY][bX]) return true;
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
    const prev = activePiece.shape;
    activePiece.shape = rotated;
    if (collide()) activePiece.shape = prev;
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
    clearLines.call(this);
    spawnPiece.call(this);
}

function clearLines() {
    let linesInFrame = 0;
    for (let r = ROWS - 1; r >= 0; r--) {
        if (board[r].every(v => v !== 0)) {
            for (let c = 0; c < COLS; c++) {
                emitters[board[r][c]].explode(5, c * BLOCK_SIZE + (BLOCK_SIZE/2), r * BLOCK_SIZE + (BLOCK_SIZE/2));
            }
            board.splice(r, 1);
            board.unshift(new Array(COLS).fill(0));
            linesInFrame++;
            r++;
        }
    }
    if (linesInFrame > 0) {
        lines += linesInFrame;
        score += ([0, 100, 300, 500, 800][linesInFrame] || 1200) * level;
        if (lines >= level * 10) {
            level++;
            dropInterval = Math.max(100, 1000 - (level - 1) * 100);
        }
        updateUI();
    }
}

function updateUI() {
    if (uiScore) uiScore.innerText = score.toLocaleString().padStart(7, '0');
    if (uiLevel) uiLevel.innerText = level.toString().padStart(2, '0');
    if (uiLines) uiLines.innerText = lines;
}

function createBlockTexture(scene, color, key) {
    const name = 'block_' + key;
    if (scene.textures.exists(name)) return name;
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(color, 1);
    g.fillRoundedRect(0, 0, BLOCK_SIZE, BLOCK_SIZE, 10);
    g.generateTexture(name, BLOCK_SIZE, BLOCK_SIZE);
    return name;
}
