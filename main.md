<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;family=Be+Vietnam+Pro:wght@300;400;500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                      "tertiary-container": "#bdfac4",
                      "on-tertiary-fixed-variant": "#356c42",
                      "error-container": "#f74b6d",
                      "surface": "#fbf5f7",
                      "on-error": "#ffefef",
                      "outline": "#797678",
                      "secondary-dim": "#2d546c",
                      "outline-variant": "#b0acae",
                      "error-dim": "#a70138",
                      "surface-tint": "#824a64",
                      "on-background": "#302e30",
                      "tertiary-fixed-dim": "#afebb6",
                      "primary-container": "#fdb5d3",
                      "secondary-container": "#b8dffd",
                      "primary-dim": "#753e58",
                      "surface-dim": "#d9d3d6",
                      "surface-container-high": "#e7e1e4",
                      "surface-container-low": "#f5eff1",
                      "on-secondary": "#e9f4ff",
                      "background": "#fbf5f7",
                      "secondary": "#396079",
                      "primary-fixed-dim": "#eda7c5",
                      "tertiary": "#2f663d",
                      "on-secondary-fixed-variant": "#345a73",
                      "surface-container": "#ece7e9",
                      "primary": "#824a64",
                      "tertiary-fixed": "#bdfac4",
                      "inverse-surface": "#0f0e0f",
                      "error": "#b41340",
                      "on-primary-fixed-variant": "#6f3a53",
                      "on-secondary-fixed": "#133e56",
                      "surface-bright": "#fbf5f7",
                      "on-surface-variant": "#5e5b5c",
                      "primary-fixed": "#fdb5d3",
                      "inverse-primary": "#fdb5d3",
                      "on-error-container": "#510017",
                      "tertiary-dim": "#235a32",
                      "on-primary-container": "#65314a",
                      "secondary-fixed-dim": "#aad1ee",
                      "secondary-fixed": "#b8dffd",
                      "on-tertiary": "#ceffd2",
                      "on-tertiary-container": "#2a6239",
                      "on-tertiary-fixed": "#164f28",
                      "on-primary-fixed": "#4d1d36",
                      "surface-container-lowest": "#ffffff",
                      "on-surface": "#302e30",
                      "surface-container-highest": "#e1dbde",
                      "on-primary": "#ffeff3",
                      "inverse-on-surface": "#a09c9e",
                      "on-secondary-container": "#295169",
                      "surface-variant": "#e1dbde"
              },
              "borderRadius": {
                      "DEFAULT": "1rem",
                      "lg": "2rem",
                      "xl": "3rem",
                      "full": "9999px"
              },
              "fontFamily": {
                      "headline": ["Plus Jakarta Sans"],
                      "body": ["Be Vietnam Pro"],
                      "label": ["Plus Jakarta Sans"]
              }
            },
          },
        }
    </script>
<style>
        body { font-family: 'Be Vietnam Pro', sans-serif; }
        h1, h2, h3, .label-caps { font-family: 'Plus Jakarta Sans', sans-serif; }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .tetris-grid {
            background-image: radial-gradient(circle, #e1dbde 2px, transparent 2px);
            background-size: 40px 40px;
        }
        .block-face {
            font-size: 16px;
            line-height: 1;
            letter-spacing: -1px;
        }
        .spring-active:active {
            transform: scale(0.92);
            transition: transform 0.1s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        /* Hand-drawn effect helpers */
        .hand-drawn-border {
            border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
            border: 2px solid currentColor;
        }
        .wobbly-line {
            filter: url(#wobble);
        }
    </style>
</head>
<body class="bg-surface text-on-surface selection:bg-primary-container min-h-screen flex flex-col overflow-x-hidden">
<svg class="hidden">
<defs>
<filter id="wobble">
<feturbulence basefrequency="0.02" numoctaves="3" result="noise" seed="1" type="fractalNoise"></feturbulence>
<fedisplacementmap in="SourceGraphic" in2="noise" scale="3"></fedisplacementmap>
</filter>
</defs>
</svg>
<!-- TopNavBar -->
<nav class="bg-[#fbf5f7]/80 backdrop-blur-sm w-full top-0 px-8 py-4 font-['Plus_Jakarta_Sans'] tracking-tight z-10">
<div class="flex justify-between items-center max-w-7xl mx-auto">
<div class="text-2xl font-bold text-[#302e30] dark:text-[#fbf5f7] tracking-widest uppercase">
                Tactile Playroom
            </div>
<div class="hidden md:flex gap-10 items-center">
<a class="text-[#302e30] dark:text-[#fbf5f7] opacity-60 hover:scale-95 transition-transform duration-200" href="#">How to Play</a>
<a class="text-[#302e30] dark:text-[#fbf5f7] opacity-60 hover:scale-95 transition-transform duration-200" href="#">Leaderboard</a>
<a class="text-[#302e30] dark:text-[#fbf5f7] opacity-60 hover:scale-95 transition-transform duration-200" href="#">Settings</a>
</div>
<div class="flex items-center gap-4">
<button class="material-symbols-outlined text-on-surface hover:scale-95 transition-transform duration-200" data-icon="account_circle">account_circle</button>
</div>
</div>
</nav>
<!-- Main Game Canvas -->
<main class="flex-grow flex items-center justify-center p-4 md:p-8">
<div class="max-w-7xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
<!-- Left Panel: Controls & Score -->
<div class="md:col-span-3 space-y-8 flex flex-col">
<!-- Keyboard Controls Instruction Section (Moved from bottom) -->
<div class="bg-surface-container-low/50 hand-drawn-border wobbly-line p-5 rounded-2xl flex flex-col gap-4 border-on-surface-variant/20">
<span class="label-caps text-[10px] font-black tracking-[0.2em] text-on-surface-variant uppercase text-center border-b border-on-surface-variant/10 pb-2">Controller Map</span>
<div class="grid grid-cols-2 gap-x-4 gap-y-3">
<div class="flex items-center gap-2">
<span class="px-2 py-0.5 bg-surface-container-lowest rounded-md border border-surface-container-high text-[10px] font-black font-mono shadow-sm">← →</span>
<span class="text-[9px] font-bold tracking-wider text-on-surface-variant uppercase">Move</span>
</div>
<div class="flex items-center gap-2">
<span class="px-2 py-0.5 bg-surface-container-lowest rounded-md border border-surface-container-high text-[10px] font-black font-mono shadow-sm">↑</span>
<span class="text-[9px] font-bold tracking-wider text-on-surface-variant uppercase">Rotate</span>
</div>
<div class="flex items-center gap-2">
<span class="px-2 py-0.5 bg-surface-container-lowest rounded-md border border-surface-container-high text-[10px] font-black font-mono shadow-sm">↓</span>
<span class="text-[9px] font-bold tracking-wider text-on-surface-variant uppercase">Soft Drop</span>
</div>
<div class="flex items-center gap-2">
<span class="px-2 py-0.5 bg-surface-container-lowest rounded-md border border-surface-container-high text-[10px] font-black font-mono shadow-sm">SPACE</span>
<span class="text-[9px] font-bold tracking-wider text-on-surface-variant uppercase">Hard</span>
</div>
<div class="flex items-center gap-2">
<span class="px-2 py-0.5 bg-surface-container-lowest rounded-md border border-surface-container-high text-[10px] font-black font-mono shadow-sm">C</span>
<span class="text-[9px] font-bold tracking-wider text-on-surface-variant uppercase">Hold</span>
</div>
<div class="flex items-center gap-2">
<span class="px-2 py-0.5 bg-surface-container-lowest rounded-md border border-surface-container-high text-[10px] font-black font-mono shadow-sm">P</span>
<span class="text-[9px] font-bold tracking-wider text-on-surface-variant uppercase">Pause</span>
</div>
</div>
</div>
<!-- Score Board -->
<div class="bg-surface-container-low rounded-lg p-6 space-y-6">
<div>
<span class="label-caps text-xs font-bold tracking-widest text-on-surface-variant uppercase">Score</span>
<div class="text-4xl font-extrabold text-primary tracking-tighter">004,820</div>
</div>
<div class="flex justify-between items-center">
<div>
<span class="label-caps text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">Level</span>
<div class="text-xl font-bold">08</div>
</div>
<div class="text-right">
<span class="label-caps text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">Lines</span>
<div class="text-xl font-bold">42</div>
</div>
</div>
</div>
</div>
<!-- Center: Game Board & On-Screen Controls -->
<div class="md:col-span-6 flex flex-col items-center space-y-8">
<div class="relative bg-surface-container-high rounded-xl p-5 shadow-2xl">
<!-- Glassy Pause Overlay -->
<div class="hidden absolute inset-0 z-50 bg-surface/80 backdrop-blur-md rounded-xl flex flex-col items-center justify-center space-y-4">
<h2 class="text-4xl font-extrabold text-on-surface tracking-tighter">Paused</h2>
<button class="bg-primary text-on-primary px-8 py-3 rounded-full font-bold hover:scale-95 transition-transform flex items-center gap-2">
<span class="material-symbols-outlined" data-icon="play_arrow">play_arrow</span>
                            Resume
                        </button>
</div>
<!-- Increased Grid size: 400x800 (10x20 blocks of 40px) -->
<div class="tetris-grid w-[400px] h-[800px] bg-surface-container-lowest rounded-lg relative overflow-hidden ring-1 ring-black/5">
<!-- Example Active Piece: T-Block (Upscaled positions) -->
<div class="absolute top-[400px] left-[160px] w-10 h-10 bg-gradient-to-br from-primary-container to-primary rounded-[6px] flex items-center justify-center text-on-primary-container font-bold block-face shadow-sm">:)</div>
<div class="absolute top-[400px] left-[200px] w-10 h-10 bg-gradient-to-br from-primary-container to-primary rounded-[6px] flex items-center justify-center text-on-primary-container font-bold block-face shadow-sm">:)</div>
<div class="absolute top-[400px] left-[240px] w-10 h-10 bg-gradient-to-br from-primary-container to-primary rounded-[6px] flex items-center justify-center text-on-primary-container font-bold block-face shadow-sm">:)</div>
<div class="absolute top-[360px] left-[200px] w-10 h-10 bg-gradient-to-br from-primary-container to-primary rounded-[6px] flex items-center justify-center text-on-primary-container font-bold block-face shadow-sm">:)</div>
<!-- Settled Blocks -->
<div class="absolute bottom-0 left-0 w-10 h-10 bg-secondary-container rounded-[6px] flex items-center justify-center text-on-secondary-container font-bold block-face shadow-sm">:/</div>
<div class="absolute bottom-0 left-[160px] w-10 h-10 bg-tertiary-container rounded-[6px] flex items-center justify-center text-on-tertiary-container font-bold block-face shadow-sm">;)</div>
<div class="absolute bottom-[160px] left-[320px] w-10 h-10 bg-error-container rounded-[6px] flex items-center justify-center text-on-error-container font-bold block-face shadow-sm">:(</div>
</div>
</div>
<!-- Tactile D-Pad Controls -->
<div class="flex items-center gap-8 bg-surface-container-low p-4 px-8 rounded-full shadow-inner border border-surface-container-high">
<!-- Rotate/Hold Button -->
<button class="w-14 h-14 bg-surface-container-highest rounded-xl spring-active flex flex-col items-center justify-center text-on-surface shadow-sm hover:bg-surface-container-high transition-colors hand-drawn-border wobbly-line">
<span class="material-symbols-outlined text-xl">rotate_right</span>
<span class="text-[8px] font-bold uppercase tracking-widest mt-1 opacity-40">HOLD</span>
</button>
<!-- Directional Controls Group -->
<div class="grid grid-cols-3 grid-rows-2 gap-3">
<button class="col-start-2 row-start-1 w-14 h-14 bg-white rounded-full spring-active flex flex-col items-center justify-center shadow-md text-primary border-2 border-primary/20 hover:scale-105 transition-transform hand-drawn-border wobbly-line">
<span class="material-symbols-outlined text-xl leading-none">keyboard_arrow_up</span>
<span class="text-[9px] font-black mt-[-4px]">:)</span>
</button>
<button class="col-start-1 row-start-2 w-14 h-14 bg-white rounded-full spring-active flex flex-col items-center justify-center shadow-md text-primary border-2 border-primary/20 hover:scale-105 transition-transform hand-drawn-border wobbly-line">
<span class="material-symbols-outlined text-xl leading-none">keyboard_arrow_left</span>
<span class="text-[9px] font-black mt-[-4px]">:/</span>
</button>
<button class="col-start-2 row-start-2 w-14 h-14 bg-white rounded-full spring-active flex flex-col items-center justify-center shadow-md text-primary border-2 border-primary/20 hover:scale-105 transition-transform hand-drawn-border wobbly-line">
<span class="material-symbols-outlined text-xl leading-none">keyboard_arrow_down</span>
<span class="text-[9px] font-black mt-[-4px]">o_o</span>
</button>
<button class="col-start-3 row-start-2 w-14 h-14 bg-white rounded-full spring-active flex flex-col items-center justify-center shadow-md text-primary border-2 border-primary/20 hover:scale-105 transition-transform hand-drawn-border wobbly-line">
<span class="material-symbols-outlined text-xl leading-none">keyboard_arrow_right</span>
<span class="text-[9px] font-black mt-[-4px]">;)</span>
</button>
</div>
<!-- Hard Drop -->
<button class="w-16 h-16 bg-primary text-on-primary rounded-full spring-active flex flex-col items-center justify-center shadow-lg hover:brightness-110 transition-all hand-drawn-border wobbly-line border-white/20">
<span class="material-symbols-outlined text-2xl leading-none">keyboard_double_arrow_down</span>
<span class="text-[8px] font-black mt-0 tracking-tighter">DROP</span>
</button>
</div>
</div>
<!-- Right Panel: Next & Decoration -->
<div class="md:col-span-3 space-y-8 flex flex-col">
<!-- Next Piece Preview -->
<div class="bg-surface-container-low rounded-lg p-6 flex flex-col items-center">
<span class="label-caps text-xs font-bold tracking-widest text-on-surface-variant mb-4 uppercase">Next</span>
<div class="w-24 h-24 bg-surface-container-highest rounded-xl flex items-center justify-center relative">
<div class="grid grid-cols-2 gap-1">
<div class="w-6 h-6 bg-secondary-container rounded-[3px] flex items-center justify-center text-on-secondary-container block-face font-bold text-xs">:o</div>
<div class="w-6 h-6 bg-secondary-container rounded-[3px] flex items-center justify-center text-on-secondary-container block-face font-bold text-xs">:o</div>
<div class="w-6 h-6 bg-secondary-container rounded-[3px] flex items-center justify-center text-on-secondary-container block-face font-bold text-xs">:o</div>
<div class="w-6 h-6 bg-secondary-container rounded-[3px] flex items-center justify-center text-on-secondary-container block-face font-bold text-xs">:o</div>
</div>
</div>
</div>
<!-- Decoration -->
<div class="rounded-xl overflow-hidden aspect-square relative group shadow-sm">
<img alt="Cute toys" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmafBMpOsnk74oCH3Z_nkfsjfaabMMXiEEaYU7QXwGXkkEVfWvIJUbBF8n_9gVTMu6cKQHgKzTrXKrqgejYtIbFFo8Re9S4nlifvh3h2vaz04HcUPnJhIq3ejX8cYJ61i8wTxdlA72RcjP2ukaY6U60xkXxmLt-eTwQq1Ko7xB4B9_RaMdLlpVIbYpOLBEwiYQ7cTaYLnZKrwGKbQf6d4tvM9LjitlycYktkQulV_Dn7waEThYSWcQ-5SfJU44vFeFZY1M1x4Oag"/>
<div class="absolute inset-0 bg-gradient-to-t from-surface-container-low/80 to-transparent"></div>
</div>
</div>
</div>
</main>
</body></html>