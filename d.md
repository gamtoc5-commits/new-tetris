<!-- Cute Tetris - Game Play with All Controls -->
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
            background-size: 32px 32px;
        }
        .block-face {
            font-size: 14px;
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
        .keyboard-hint {
            @apply px-2 py-1 bg-surface-container-lowest rounded-md border border-surface-container-high text-[10px] font-bold font-mono;
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
<div class="max-w-7xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
<!-- Left Panel: Hold & Stats -->
<div class="md:col-span-3 space-y-6 order-2 md:order-1 self-center">
<!-- Hold Slot -->
<div class="bg-surface-container-low rounded-lg p-6 flex flex-col items-center">
<span class="label-caps text-xs font-bold tracking-widest text-on-surface-variant mb-4 uppercase">Hold</span>
<div class="w-20 h-20 bg-surface-container-lowest rounded-md flex items-center justify-center border-4 border-surface-container-high border-dotted">
<span class="material-symbols-outlined text-outline-variant text-3xl" data-icon="back_hand">back_hand</span>
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
<div class="md:col-span-6 flex flex-col items-center order-1 md:order-2 space-y-8">
<div class="relative bg-surface-container-high rounded-xl p-4 shadow-xl">
<!-- Glassy Pause Overlay -->
<div class="hidden absolute inset-0 z-50 bg-surface/80 backdrop-blur-md rounded-xl flex flex-col items-center justify-center space-y-4">
<h2 class="text-4xl font-extrabold text-on-surface tracking-tighter">Paused</h2>
<button class="bg-primary text-on-primary px-8 py-3 rounded-full font-bold hover:scale-95 transition-transform flex items-center gap-2">
<span class="material-symbols-outlined" data-icon="play_arrow">play_arrow</span>
                        Resume
                    </button>
</div>
<!-- Grid reduced size: 320x640 -->
<div class="tetris-grid w-[320px] h-[640px] bg-surface-container-lowest rounded-lg relative overflow-hidden">
<!-- Example Active Piece: T-Block -->
<div class="absolute top-[320px] left-[128px] w-8 h-8 bg-gradient-to-br from-primary-container to-primary rounded-[4px] flex items-center justify-center text-on-primary-container font-bold block-face shadow-sm">:)</div>
<div class="absolute top-[320px] left-[160px] w-8 h-8 bg-gradient-to-br from-primary-container to-primary rounded-[4px] flex items-center justify-center text-on-primary-container font-bold block-face shadow-sm">:)</div>
<div class="absolute top-[320px] left-[192px] w-8 h-8 bg-gradient-to-br from-primary-container to-primary rounded-[4px] flex items-center justify-center text-on-primary-container font-bold block-face shadow-sm">:)</div>
<div class="absolute top-[288px] left-[160px] w-8 h-8 bg-gradient-to-br from-primary-container to-primary rounded-[4px] flex items-center justify-center text-on-primary-container font-bold block-face shadow-sm">:)</div>
<!-- Settled Blocks -->
<div class="absolute bottom-0 left-0 w-8 h-8 bg-secondary-container rounded-[4px] flex items-center justify-center text-on-secondary-container font-bold block-face shadow-sm">:/</div>
<div class="absolute bottom-0 left-[128px] w-8 h-8 bg-tertiary-container rounded-[4px] flex items-center justify-center text-on-tertiary-container font-bold block-face shadow-sm">;)</div>
<div class="absolute bottom-[128px] left-[256px] w-8 h-8 bg-error-container rounded-[4px] flex items-center justify-center text-on-error-container font-bold block-face shadow-sm">:(</div>
</div>
</div>
<!-- Tactile D-Pad Controls for Desktop -->
<div class="flex flex-col items-center gap-6">
<div class="flex items-center gap-8 bg-surface-container-low p-4 px-8 rounded-full shadow-inner border border-surface-container-high">
<!-- Rotate/Hold Button (Circular Rotate Action) -->
<button class="w-14 h-14 bg-surface-container-highest rounded-xl spring-active flex flex-col items-center justify-center text-on-surface shadow-sm hover:bg-surface-container-high transition-colors hand-drawn-border wobbly-line">
<span class="material-symbols-outlined text-xl">rotate_right</span>
<span class="text-[8px] font-bold uppercase tracking-widest mt-1 opacity-40">HOLD</span>
</button>
<!-- Directional Controls Group -->
<div class="grid grid-cols-3 grid-rows-2 gap-3">
<!-- Rotate (Up) -->
<button class="col-start-2 row-start-1 w-14 h-14 bg-white rounded-full spring-active flex flex-col items-center justify-center shadow-md text-primary border-2 border-primary/20 hover:scale-105 transition-transform hand-drawn-border wobbly-line">
<span class="material-symbols-outlined text-xl leading-none">keyboard_arrow_up</span>
<span class="text-[9px] font-black mt-[-4px]">:)</span>
</button>
<!-- Move Left -->
<button class="col-start-1 row-start-2 w-14 h-14 bg-white rounded-full spring-active flex flex-col items-center justify-center shadow-md text-primary border-2 border-primary/20 hover:scale-105 transition-transform hand-drawn-border wobbly-line">
<span class="material-symbols-outlined text-xl leading-none">keyboard_arrow_left</span>
<span class="text-[9px] font-black mt-[-4px]">:/</span>
</button>
<!-- Soft Drop (Down) -->
<button class="col-start-2 row-start-2 w-14 h-14 bg-white rounded-full spring-active flex flex-col items-center justify-center shadow-md text-primary border-2 border-primary/20 hover:scale-105 transition-transform hand-drawn-border wobbly-line">
<span class="material-symbols-outlined text-xl leading-none">keyboard_arrow_down</span>
<span class="text-[9px] font-black mt-[-4px]">o_o</span>
</button>
<!-- Move Right -->
<button class="col-start-3 row-start-2 w-14 h-14 bg-white rounded-full spring-active flex flex-col items-center justify-center shadow-md text-primary border-2 border-primary/20 hover:scale-105 transition-transform hand-drawn-border wobbly-line">
<span class="material-symbols-outlined text-xl leading-none">keyboard_arrow_right</span>
<span class="text-[9px] font-black mt-[-4px]">;)</span>
</button>
</div>
<!-- Hard Drop / Space -->
<button class="w-16 h-16 bg-primary text-on-primary rounded-full spring-active flex flex-col items-center justify-center shadow-lg hover:brightness-110 transition-all hand-drawn-border wobbly-line border-white/20">
<span class="material-symbols-outlined text-2xl leading-none">keyboard_double_arrow_down</span>
<span class="text-[8px] font-black mt-0 tracking-tighter">DROP</span>
</button>
</div>
<!-- Keyboard Controls Instruction Section -->
<div class="bg-surface-container-low/50 hand-drawn-border wobbly-line p-4 px-6 rounded-2xl flex flex-wrap justify-center gap-x-8 gap-y-3 max-w-lg">
<div class="flex items-center gap-2">
<span class="px-2 py-0.5 bg-surface-container-lowest rounded-md border border-surface-container-high text-[10px] font-black font-mono shadow-sm">← →</span>
<span class="text-[10px] font-bold tracking-wider text-on-surface-variant uppercase">Move</span>
</div>
<div class="flex items-center gap-2">
<span class="px-2 py-0.5 bg-surface-container-lowest rounded-md border border-surface-container-high text-[10px] font-black font-mono shadow-sm">↑</span>
<span class="text-[10px] font-bold tracking-wider text-on-surface-variant uppercase">Rotate</span>
</div>
<div class="flex items-center gap-2">
<span class="px-2 py-0.5 bg-surface-container-lowest rounded-md border border-surface-container-high text-[10px] font-black font-mono shadow-sm">↓</span>
<span class="text-[10px] font-bold tracking-wider text-on-surface-variant uppercase">Soft Drop</span>
</div>
<div class="flex items-center gap-2">
<span class="px-3 py-0.5 bg-surface-container-lowest rounded-md border border-surface-container-high text-[10px] font-black font-mono shadow-sm">SPACE</span>
<span class="text-[10px] font-bold tracking-wider text-on-surface-variant uppercase">Hard Drop</span>
</div>
<div class="flex items-center gap-2">
<span class="px-2 py-0.5 bg-surface-container-lowest rounded-md border border-surface-container-high text-[10px] font-black font-mono shadow-sm">C</span>
<span class="text-[10px] font-bold tracking-wider text-on-surface-variant uppercase">Hold</span>
</div>
<div class="flex items-center gap-2">
<span class="px-2 py-0.5 bg-surface-container-lowest rounded-md border border-surface-container-high text-[10px] font-black font-mono shadow-sm">P</span>
<span class="text-[10px] font-bold tracking-wider text-on-surface-variant uppercase">Pause</span>
</div>
</div>
</div>
</div>
<!-- Right Panel: Next & Controls -->
<div class="md:col-span-3 space-y-6 order-3 self-center">
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

<!-- Cute Tetris - Settings Screen -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;family=Be+Vietnam+Pro:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "primary-fixed": "#fdb5d3",
                    "on-surface-variant": "#5e5b5c",
                    "on-primary": "#ffeff3",
                    "outline": "#797678",
                    "on-error-container": "#510017",
                    "error": "#b41340",
                    "primary-dim": "#753e58",
                    "surface-container": "#ece7e9",
                    "inverse-primary": "#fdb5d3",
                    "primary": "#824a64",
                    "on-tertiary": "#ceffd2",
                    "tertiary": "#2f663d",
                    "surface-variant": "#e1dbde",
                    "surface-bright": "#fbf5f7",
                    "on-secondary-container": "#295169",
                    "surface-container-highest": "#e1dbde",
                    "error-container": "#f74b6d",
                    "outline-variant": "#b0acae",
                    "on-tertiary-fixed": "#164f28",
                    "tertiary-fixed-dim": "#afebb6",
                    "primary-container": "#fdb5d3",
                    "tertiary-dim": "#235a32",
                    "surface-tint": "#824a64",
                    "secondary-fixed": "#b8dffd",
                    "surface-container-lowest": "#ffffff",
                    "on-primary-fixed": "#4d1d36",
                    "secondary": "#396079",
                    "on-primary-container": "#65314a",
                    "primary-fixed-dim": "#eda7c5",
                    "on-tertiary-container": "#2a6239",
                    "background": "#fbf5f7",
                    "surface-container-high": "#e7e1e4",
                    "secondary-fixed-dim": "#aad1ee",
                    "error-dim": "#a70138",
                    "on-primary-fixed-variant": "#6f3a53",
                    "tertiary-fixed": "#bdfac4",
                    "on-tertiary-fixed-variant": "#356c42",
                    "secondary-container": "#b8dffd",
                    "on-background": "#302e30",
                    "on-error": "#ffefef",
                    "tertiary-container": "#bdfac4",
                    "secondary-dim": "#2d546c",
                    "surface": "#fbf5f7",
                    "on-surface": "#302e30",
                    "on-secondary-fixed-variant": "#345a73",
                    "inverse-surface": "#0f0e0f",
                    "surface-container-low": "#f5eff1",
                    "on-secondary-fixed": "#133e56",
                    "inverse-on-surface": "#a09c9e",
                    "on-secondary": "#e9f4ff",
                    "surface-dim": "#d9d3d6"
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
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .wobbly-border {
            border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
        }
        .block-face {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-weight: 800;
        }
    </style>
</head>
<body class="bg-surface font-body text-on-background min-h-screen relative overflow-hidden">
<!-- Blurred Game Background (The "Canvas") -->
<div class="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-40 blur-md">
<div class="grid grid-cols-10 grid-rows-20 gap-1 p-4 bg-surface-container-high rounded-lg w-[400px] h-[800px]">
<!-- Decorative Pseudo-Blocks to represent a paused game -->
<div class="bg-primary-container rounded-sm col-start-4 col-span-2 row-start-15 row-span-2 flex items-center justify-center text-[8px] font-bold text-on-primary-container">:)</div>
<div class="bg-secondary-container rounded-sm col-start-5 col-span-1 row-start-14 row-span-3 flex items-center justify-center text-[8px] font-bold text-on-secondary-container">:3</div>
<div class="bg-tertiary-container rounded-sm col-start-2 col-span-3 row-start-18 row-span-1 flex items-center justify-center text-[8px] font-bold text-on-tertiary-container">;-)</div>
<div class="bg-primary-container rounded-sm col-start-7 col-span-2 row-start-17 row-span-2 flex items-center justify-center text-[8px] font-bold text-on-primary-container">owo</div>
</div>
</div>
<!-- Main Pause Overlay -->
<main class="relative z-10 min-h-screen flex items-center justify-center p-6 bg-surface/60 backdrop-blur-xl">
<!-- Large Rounded Container (Bento Style Layout) -->
<div class="w-full max-w-md bg-surface-container-low p-8 rounded-xl flex flex-col gap-8">
<!-- Header Section -->
<header class="text-center space-y-2">
<h1 class="font-headline text-4xl font-extrabold tracking-tight text-on-surface">PAUSED</h1>
<p class="font-label text-xs uppercase tracking-[0.2em] text-on-surface-variant font-bold">Mochi Drop</p>
</header>
<!-- Navigation Buttons (Predicted Component: BottomNavBar Logic applied to vertical layout) -->
<nav class="flex flex-col gap-4">
<!-- Resume Button -->
<button class="group flex items-center justify-between w-full p-6 bg-primary-container rounded-lg hover:scale-[0.96] transition-transform duration-200 active:scale-95">
<div class="flex items-center gap-4">
<div class="w-12 h-12 bg-on-primary-container/10 rounded-full flex items-center justify-center">
<span class="material-symbols-outlined text-on-primary-container text-3xl" data-icon="play_circle" style="font-variation-settings: 'FILL' 1;">play_circle</span>
</div>
<div class="text-left">
<span class="font-headline font-extrabold text-on-primary-container block text-lg">Resume Game</span>
<span class="font-label text-[10px] uppercase tracking-wider text-on-primary-container/70 font-bold">Back to action</span>
</div>
</div>
<span class="block-face text-2xl text-on-primary-container opacity-80 font-black">;)</span>
</button>
<!-- Restart Button -->
<button class="group flex items-center justify-between w-full p-6 bg-secondary-container rounded-lg hover:scale-[0.96] transition-transform duration-200 active:scale-95">
<div class="flex items-center gap-4">
<div class="w-12 h-12 bg-on-secondary-container/10 rounded-full flex items-center justify-center">
<span class="material-symbols-outlined text-on-secondary-container text-3xl" data-icon="refresh">refresh</span>
</div>
<div class="text-left">
<span class="font-headline font-extrabold text-on-secondary-container block text-lg">Restart</span>
<span class="font-label text-[10px] uppercase tracking-wider text-on-secondary-container/70 font-bold">Try again</span>
</div>
</div>
<span class="block-face text-2xl text-on-secondary-container opacity-80 font-black">:0</span>
</button>
<!-- Home Button -->
<button class="group flex items-center justify-between w-full p-6 bg-surface-container-highest rounded-lg hover:scale-[0.96] transition-transform duration-200 active:scale-95">
<div class="flex items-center gap-4">
<div class="w-12 h-12 bg-on-surface/5 rounded-full flex items-center justify-center">
<span class="material-symbols-outlined text-on-surface text-3xl" data-icon="home">home</span>
</div>
<div class="text-left">
<span class="font-headline font-extrabold text-on-surface block text-lg">Home</span>
<span class="font-label text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">Main Menu</span>
</div>
</div>
<span class="block-face text-2xl text-on-surface opacity-80 font-black">:/</span>
</button>
</nav>
<!-- Volume Controls Section (Custom Bento Grid) -->
<section class="space-y-6 pt-4">
<div class="flex flex-col gap-6">
<!-- Music Slider -->
<div class="space-y-3">
<div class="flex justify-between items-end">
<label class="font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold">Music</label>
<span class="font-headline font-bold text-primary">80%</span>
</div>
<div class="relative h-6 flex items-center">
<div class="absolute w-full h-3 bg-surface-variant rounded-full"></div>
<div class="absolute w-[80%] h-3 bg-primary rounded-full"></div>
<div class="absolute left-[80%] -translate-x-1/2 w-8 h-8 bg-surface-container-lowest border-4 border-primary rounded-full flex items-center justify-center shadow-lg cursor-pointer transform hover:scale-110 transition-transform">
<span class="text-xs font-black text-primary">:)</span>
</div>
</div>
</div>
<!-- Sound Effects Slider -->
<div class="space-y-3">
<div class="flex justify-between items-end">
<label class="font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold">Sound Effects</label>
<span class="font-headline font-bold text-tertiary">65%</span>
</div>
<div class="relative h-6 flex items-center">
<div class="absolute w-full h-3 bg-surface-variant rounded-full"></div>
<div class="absolute w-[65%] h-3 bg-tertiary rounded-full"></div>
<div class="absolute left-[65%] -translate-x-1/2 w-8 h-8 bg-surface-container-lowest border-4 border-tertiary rounded-full flex items-center justify-center shadow-lg cursor-pointer transform hover:scale-110 transition-transform">
<span class="text-xs font-black text-tertiary">^w^</span>
</div>
</div>
</div>
</div>
</section>
<!-- Footer Meta -->
<footer class="flex justify-center pt-2">
<div class="bg-surface-container-highest/50 px-4 py-2 rounded-full flex items-center gap-2">
<span class="material-symbols-outlined text-sm" data-icon="trophy">trophy</span>
<span class="font-label text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant">High Score: 99,999</span>
</div>
</footer>
</div>
</main>
<!-- Predicted BottomNavBar Component (Responsive Logic: Only for main game screens, here suppressed as per Task/Shell mandate for focused modal) -->
<!-- The BottomNavBar from JSON is not rendered here to maintain focus on the Pause Modal as per Conflict Resolution Protocol (Task-Focused suppression). -->
</body></html>

<!-- Cute Tetris - Profile Screen -->
<!DOCTYPE html>

<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&amp;family=Be_Vietnam_Pro:wght@300;400;500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "error": "#b41340",
                        "primary-container": "#fdb5d3",
                        "surface-container": "#ece7e9",
                        "secondary-dim": "#2d546c",
                        "error-dim": "#a70138",
                        "on-error-container": "#510017",
                        "tertiary-dim": "#235a32",
                        "secondary": "#396079",
                        "on-secondary-container": "#295169",
                        "on-secondary-fixed-variant": "#345a73",
                        "tertiary-fixed": "#bdfac4",
                        "on-secondary-fixed": "#133e56",
                        "background": "#fbf5f7",
                        "outline": "#797678",
                        "tertiary-container": "#bdfac4",
                        "on-primary-fixed-variant": "#6f3a53",
                        "surface": "#fbf5f7",
                        "on-primary-fixed": "#4d1d36",
                        "surface-dim": "#d9d3d6",
                        "inverse-surface": "#0f0e0f",
                        "on-tertiary-fixed-variant": "#356c42",
                        "on-error": "#ffefef",
                        "primary-fixed": "#fdb5d3",
                        "error-container": "#f74b6d",
                        "surface-bright": "#fbf5f7",
                        "on-secondary": "#e9f4ff",
                        "on-tertiary": "#ceffd2",
                        "outline-variant": "#b0acae",
                        "on-primary-container": "#65314a",
                        "surface-container-low": "#f5eff1",
                        "surface-container-highest": "#e1dbde",
                        "primary": "#824a64",
                        "on-tertiary-container": "#2a6239",
                        "surface-tint": "#824a64",
                        "secondary-fixed-dim": "#aad1ee",
                        "inverse-on-surface": "#a09c9e",
                        "on-primary": "#ffeff3",
                        "on-background": "#302e30",
                        "tertiary": "#2f663d",
                        "secondary-fixed": "#b8dffd",
                        "surface-container-high": "#e7e1e4",
                        "tertiary-fixed-dim": "#afebb6",
                        "on-tertiary-fixed": "#164f28",
                        "on-surface-variant": "#5e5b5c",
                        "secondary-container": "#b8dffd",
                        "on-surface": "#302e30",
                        "primary-dim": "#753e58",
                        "primary-fixed-dim": "#eda7c5",
                        "surface-variant": "#e1dbde",
                        "inverse-primary": "#fdb5d3",
                        "surface-container-lowest": "#ffffff"
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
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .block-face-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
        }
        .bento-card {
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .bento-card:hover {
            transform: scale(0.98);
        }
    </style>
</head>
<body class="bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container">
<!-- Top Navigation Bar -->
<nav class="bg-[#fbf5f7] dark:bg-[#1a1819] flex justify-between items-center w-full px-6 py-4 font-['Plus_Jakarta_Sans'] tracking-tight sticky top-0 z-50">
<div class="text-2xl font-bold text-[#302e30] dark:text-[#f5f0f2]">Mochi Drop</div>
<div class="flex items-center gap-6">
<button class="text-[#302e30]/60 dark:text-[#f5f0f2]/60 hover:scale-[0.96] transition-transform duration-200">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
</button>
<button class="text-[#302e30] dark:text-[#f5f0f2] font-bold hover:scale-[0.96] transition-transform duration-200">
<span class="material-symbols-outlined" data-icon="person" style="font-variation-settings: 'FILL' 1;">person</span>
</button>
</div>
</nav>
<main class="max-w-5xl mx-auto px-6 py-12 space-y-12">
<!-- Profile Header Section -->
<section class="flex flex-col md:flex-row items-center md:items-end gap-8 mb-16">
<div class="relative group">
<div class="w-40 h-40 bg-primary-container rounded-xl flex items-center justify-center relative overflow-hidden shadow-[0_12px_32px_rgba(48,46,48,0.06)] transform -rotate-3 hover:rotate-0 transition-transform duration-300">
<div class="absolute inset-0 bg-gradient-to-tr from-primary to-primary-container opacity-20"></div>
<!-- Block Face Avatar -->
<div class="flex flex-col items-center">
<div class="flex gap-4 mb-2">
<div class="w-3 h-3 bg-on-primary-container rounded-full"></div>
<div class="w-3 h-3 bg-on-primary-container rounded-full"></div>
</div>
<div class="w-10 h-4 border-b-4 border-on-primary-container rounded-full"></div>
</div>
</div>
<div class="absolute -bottom-2 -right-2 bg-tertiary-container p-2 rounded-full shadow-sm">
<span class="material-symbols-outlined text-on-tertiary-container text-sm" data-icon="edit">edit</span>
</div>
</div>
<div class="text-center md:text-left flex-1">
<span class="font-label text-xs tracking-widest uppercase text-outline mb-2 block">Premium Player</span>
<h1 class="font-headline text-5xl font-extrabold tracking-tighter text-on-surface mb-4">PuddingPop</h1>
<div class="flex flex-wrap justify-center md:justify-start gap-3">
<span class="px-4 py-1.5 bg-surface-container-high rounded-full text-sm font-medium">Lvl. 42 Tetris Master</span>
<span class="px-4 py-1.5 bg-secondary-container rounded-full text-sm font-medium text-on-secondary-container">#12 Global</span>
</div>
</div>
<div>
<button class="bg-primary text-on-primary px-8 py-4 rounded-full font-bold shadow-lg hover:scale-[0.96] transition-transform duration-200 flex items-center gap-2">
<span class="material-symbols-outlined" data-icon="arrow_back">arrow_back</span>
                    BACK TO GAME
                </button>
</div>
</section>
<!-- Stats Grid (Bento Style) -->
<section class="grid grid-cols-1 md:grid-cols-3 gap-6">
<!-- Main Stats Card -->
<div class="md:col-span-2 bg-surface-container-low p-8 rounded-lg bento-card border-b-8 border-surface-container-highest">
<div class="flex justify-between items-start mb-8">
<h2 class="font-label text-sm tracking-widest uppercase text-outline">Player Statistics</h2>
<span class="material-symbols-outlined text-primary-container" data-icon="trending_up">trending_up</span>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
<div>
<p class="text-outline text-sm mb-1 uppercase tracking-wider font-label">Total Score</p>
<p class="text-4xl font-headline font-extrabold text-on-surface">1,240,820</p>
</div>
<div>
<p class="text-outline text-sm mb-1 uppercase tracking-wider font-label">Play Time</p>
<p class="text-4xl font-headline font-extrabold text-on-surface">42h 15m</p>
</div>
</div>
<div class="mt-8 pt-8 border-t-4 border-surface-container rounded-full">
<div class="flex justify-between items-center mb-2">
<span class="text-xs font-bold uppercase tracking-widest">Experience Points</span>
<span class="text-xs font-bold">85% to Level 43</span>
</div>
<div class="h-4 bg-surface-container-highest rounded-full overflow-hidden">
<div class="h-full bg-primary-container w-[85%] rounded-full"></div>
</div>
</div>
</div>
<!-- Achievement Mini Card -->
<div class="bg-tertiary-container p-8 rounded-lg bento-card relative overflow-hidden flex flex-col justify-between">
<div class="absolute -right-4 -top-4 opacity-10">
<span class="material-symbols-outlined text-9xl" data-icon="workspace_premium" style="font-variation-settings: 'FILL' 1;">workspace_premium</span>
</div>
<div>
<h2 class="font-label text-sm tracking-widest uppercase text-on-tertiary-container/60 mb-6">Recent Unlock</h2>
<p class="text-2xl font-headline font-bold text-on-tertiary-container leading-tight">Marathon Runner</p>
</div>
<p class="text-sm text-on-tertiary-container/80 mt-2">Clear 1,000 lines in a single session without panicking.</p>
</div>
</section>
<!-- Collection Section -->
<section class="space-y-8">
<div class="flex items-center gap-4">
<h2 class="font-headline text-3xl font-bold tracking-tight">Block Collection</h2>
<div class="h-1 flex-1 bg-surface-container-high rounded-full"></div>
<span class="font-label text-xs tracking-widest uppercase text-outline">7 / 24 Found</span>
</div>
<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
<!-- Obtained Faces -->
<div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-b-4 border-surface-container-high flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 group">
<div class="text-2xl font-headline font-bold mb-4 group-hover:scale-110 transition-transform">: )</div>
<span class="font-label text-[10px] uppercase tracking-tighter text-outline">Default Joy</span>
</div>
<div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-b-4 border-surface-container-high flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 group">
<div class="text-2xl font-headline font-bold mb-4 group-hover:scale-110 transition-transform">; )</div>
<span class="font-label text-[10px] uppercase tracking-tighter text-outline">Cheeky Wink</span>
</div>
<div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-b-4 border-surface-container-high flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 group">
<div class="text-2xl font-headline font-bold mb-4 group-hover:scale-110 transition-transform">: 0</div>
<span class="font-label text-[10px] uppercase tracking-tighter text-outline">Surprise!</span>
</div>
<div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-b-4 border-surface-container-high flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 group">
<div class="text-2xl font-headline font-bold mb-4 group-hover:scale-110 transition-transform">:/</div>
<span class="font-label text-[10px] uppercase tracking-tighter text-outline">Skeptic</span>
</div>
<div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-b-4 border-surface-container-high flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 group">
<div class="text-2xl font-headline font-bold mb-4 group-hover:scale-110 transition-transform">:(</div>
<span class="font-label text-[10px] uppercase tracking-tighter text-outline">Little Sad</span>
</div>
<div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-b-4 border-surface-container-high flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 group">
<div class="text-2xl font-headline font-bold mb-4 group-hover:scale-110 transition-transform">T_T</div>
<span class="font-label text-[10px] uppercase tracking-tighter text-outline">Big Cry</span>
</div>
<div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-b-4 border-surface-container-high flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 group">
<div class="text-2xl font-headline font-bold mb-4 group-hover:scale-110 transition-transform">o_o</div>
<span class="font-label text-[10px] uppercase tracking-tighter text-outline">Blank Stare</span>
</div>
<!-- Locked placeholders -->
<div class="bg-surface-container-low/50 p-6 rounded-xl border-2 border-dashed border-outline-variant flex flex-col items-center justify-center opacity-40">
<span class="material-symbols-outlined mb-2" data-icon="lock">lock</span>
<span class="font-label text-[10px] uppercase tracking-tighter">Unknown</span>
</div>
<div class="bg-surface-container-low/50 p-6 rounded-xl border-2 border-dashed border-outline-variant flex flex-col items-center justify-center opacity-40">
<span class="material-symbols-outlined mb-2" data-icon="lock">lock</span>
<span class="font-label text-[10px] uppercase tracking-tighter">Unknown</span>
</div>
</div>
</section>
<!-- History/Activity Section -->
<section class="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
<div class="space-y-6">
<h3 class="font-headline text-2xl font-bold">Session History</h3>
<div class="space-y-3">
<div class="flex items-center justify-between p-4 bg-surface-container rounded-xl">
<div class="flex items-center gap-4">
<div class="w-2 h-2 bg-primary rounded-full"></div>
<div>
<p class="font-bold">Endless Mode</p>
<p class="text-xs text-outline">Today, 2:45 PM</p>
</div>
</div>
<p class="font-headline font-bold text-primary">124,000</p>
</div>
<div class="flex items-center justify-between p-4 bg-surface-container/50 rounded-xl">
<div class="flex items-center gap-4">
<div class="w-2 h-2 bg-secondary rounded-full"></div>
<div>
<p class="font-bold">Time Attack</p>
<p class="text-xs text-outline">Yesterday, 11:20 PM</p>
</div>
</div>
<p class="font-headline font-bold text-secondary">82,150</p>
</div>
</div>
</div>
<div class="bg-surface-container-highest p-8 rounded-lg flex items-center gap-8">
<img class="w-32 h-32 rounded-xl object-cover shadow-md rotate-2" data-alt="a cute soft pink pastel robot character sitting on a floor with colorful building blocks around it, high key soft studio lighting, claymation style" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhfHeiprlnhmlR9LgjCDsxgWbWB_PMyJoqTt56wd8W8J-NYWrAESRAvNFad6UGs9YcFsZldAXI2xAHpQkdwcoNCDOCVa3UK5rJSFyvDVUkY_W2na0EHdGPrNzbRcLWhIpMTC4DOWQyZYxHCIQalE7CSIsXKe7XbNv-99tmvO8cw3pncroFNxEa8HtbJHkmNvNznhM3K2RnOcVHTD4zA83n2ZF73mkwJ_Lpn06qUkfPCIAWuGiXRcuhMzx2f30E5M-iTME1omzr_Q"/>
<div>
<h3 class="font-headline text-xl font-bold mb-2">Did you know?</h3>
<p class="text-sm leading-relaxed text-on-surface-variant">Your favorite block to drop is the <span class="font-bold text-primary">L-Piece</span>. It accounts for 18% of your total scores!</p>
</div>
</div>
</section>
</main>
<!-- Footer -->
<footer class="bg-[#f5eff1] dark:bg-[#252223] w-full py-8 px-6 flex flex-col md:flex-row justify-between items-center gap-4 font-['Be_Vietnam_Pro'] text-sm tracking-wide uppercase mt-20">
<div class="text-[#302e30]/50 dark:text-[#f5f0f2]/50">© 2024 Tactile Playroom</div>
<div class="flex gap-8">
<a class="text-[#302e30]/50 dark:text-[#f5f0f2]/50 hover:text-[#FFB7D5] transition-colors" href="#">How to Play</a>
<a class="text-[#302e30]/50 dark:text-[#f5f0f2]/50 hover:text-[#FFB7D5] transition-colors" href="#">Privacy</a>
<a class="text-[#302e30]/50 dark:text-[#f5f0f2]/50 hover:text-[#FFB7D5] transition-colors" href="#">Blocks Gallery</a>
</div>
</footer>
</body></html>

<!-- Cute Tetris - Leaderboard -->
<!DOCTYPE html>

<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Tactile Playroom - Leaderboard</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700;800&amp;family=Be+Vietnam+Pro:ital,wght@0,400;0,700;1,400&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "surface-container": "#ece7e9",
                    "outline": "#797678",
                    "primary-fixed-dim": "#eda7c5",
                    "on-primary-fixed-variant": "#6f3a53",
                    "secondary-dim": "#2d546c",
                    "on-tertiary-fixed": "#164f28",
                    "error-dim": "#a70138",
                    "on-tertiary": "#ceffd2",
                    "on-surface-variant": "#5e5b5c",
                    "secondary-fixed": "#b8dffd",
                    "tertiary-fixed-dim": "#afebb6",
                    "on-primary-container": "#65314a",
                    "inverse-primary": "#fdb5d3",
                    "on-primary-fixed": "#4d1d36",
                    "surface-container-highest": "#e1dbde",
                    "primary": "#824a64",
                    "on-secondary-fixed-variant": "#345a73",
                    "on-secondary-fixed": "#133e56",
                    "on-secondary": "#e9f4ff",
                    "on-error": "#ffefef",
                    "primary-dim": "#753e58",
                    "outline-variant": "#b0acae",
                    "surface-bright": "#fbf5f7",
                    "tertiary-dim": "#235a32",
                    "surface-variant": "#e1dbde",
                    "error": "#b41340",
                    "tertiary-fixed": "#bdfac4",
                    "on-primary": "#ffeff3",
                    "secondary-fixed-dim": "#aad1ee",
                    "primary-fixed": "#fdb5d3",
                    "primary-container": "#fdb5d3",
                    "on-background": "#302e30",
                    "surface": "#fbf5f7",
                    "surface-container-low": "#f5eff1",
                    "on-error-container": "#510017",
                    "secondary-container": "#b8dffd",
                    "on-secondary-container": "#295169",
                    "inverse-on-surface": "#a09c9e",
                    "tertiary": "#2f663d",
                    "on-tertiary-fixed-variant": "#356c42",
                    "on-tertiary-container": "#2a6239",
                    "inverse-surface": "#0f0e0f",
                    "surface-tint": "#824a64",
                    "surface-container-high": "#e7e1e4",
                    "on-surface": "#302e30",
                    "background": "#fbf5f7",
                    "error-container": "#f74b6d",
                    "surface-dim": "#d9d3d6",
                    "secondary": "#396079",
                    "tertiary-container": "#bdfac4",
                    "surface-container-lowest": "#ffffff"
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
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        body { font-family: 'Be Vietnam Pro', sans-serif; }
        h1, h2, h3, .plus-jakarta-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
        .soft-shadow { box-shadow: 0 12px 32px rgba(48, 46, 48, 0.06); }
        .kawaii-block { transition: transform 0.2s ease; }
        .kawaii-block:hover { transform: scale(1.05) rotate(2deg); }
    </style>
</head>
<body class="bg-surface text-on-surface min-h-screen relative overflow-x-hidden">
<!-- Floating Background Elements -->
<div class="fixed inset-0 pointer-events-none z-0 opacity-20">
<div class="absolute top-20 left-[10%] w-16 h-16 bg-primary-container rounded-sm rotate-12 flex items-center justify-center">
<span class="text-on-primary-container font-bold text-xl">:)</span>
</div>
<div class="absolute top-[40%] right-[5%] w-20 h-12 bg-secondary-container rounded-sm -rotate-6 flex items-center justify-center">
<span class="text-on-secondary-container font-bold text-xl">;)</span>
</div>
<div class="absolute bottom-20 left-[15%] w-12 h-24 bg-tertiary-container rounded-sm rotate-45 flex items-center justify-center">
<span class="text-on-tertiary-container font-bold text-xl">:0</span>
</div>
<div class="absolute top-[60%] left-[5%] w-14 h-14 bg-error-container rounded-sm -rotate-12 flex items-center justify-center">
<span class="text-on-error-container font-bold text-xl">:/</span>
</div>
<div class="absolute bottom-40 right-[15%] w-16 h-16 bg-primary rounded-sm rotate-12 flex items-center justify-center">
<span class="text-on-primary font-bold text-xl">:)</span>
</div>
</div>
<!-- Top Navigation Shell -->
<header class="bg-[#fbf5f7] dark:bg-[#302e30] flex justify-between items-center px-8 py-6 w-full max-w-7xl mx-auto sticky top-0 z-50">
<div class="text-2xl font-black text-[#302e30] dark:text-[#fbf5f7] tracking-tighter">TACTILE PLAYROOM</div>
<nav class="hidden md:flex items-center gap-8">
<a class="plus-jakarta-sans font-bold uppercase tracking-[0.05em] text-[12px] text-[#302e30] dark:text-[#fbf5f7] opacity-60 hover:scale-95 transition-transform duration-200" href="#">Play</a>
<a class="plus-jakarta-sans font-bold uppercase tracking-[0.05em] text-[12px] text-[#FFB7D5] border-b-4 border-[#FFB7D5] pb-1 hover:scale-95 transition-transform duration-200" href="#">Leaderboard</a>
<a class="plus-jakarta-sans font-bold uppercase tracking-[0.05em] text-[12px] text-[#302e30] dark:text-[#fbf5f7] opacity-60 hover:scale-95 transition-transform duration-200" href="#">Settings</a>
</nav>
<div class="flex items-center gap-4">
<button class="material-symbols-outlined text-[#FFB7D5] hover:scale-95 transition-transform" data-icon="person_search">person_search</button>
</div>
</header>
<main class="relative z-10 max-w-4xl mx-auto px-6 py-12">
<!-- Main Content Card -->
<div class="bg-surface-container-lowest rounded-lg soft-shadow p-8 md:p-12 border-none">
<div class="text-center mb-10">
<h1 class="text-5xl md:text-6xl font-black tracking-tight text-primary mb-2 uppercase italic">Leaderboard</h1>
<p class="text-on-surface-variant font-medium italic">Our most tactile master builders :)</p>
</div>
<!-- Table Container -->
<div class="overflow-x-auto">
<table class="w-full border-separate border-spacing-y-3">
<thead class="text-left text-on-surface-variant uppercase text-xs tracking-widest font-bold">
<tr>
<th class="pb-4 px-4">Rank</th>
<th class="pb-4 px-4">Player</th>
<th class="pb-4 px-4 text-center">Level</th>
<th class="pb-4 px-4 text-right">Score</th>
</tr>
</thead>
<tbody class="plus-jakarta-sans">
<!-- Rank 1 -->
<tr class="bg-primary-container group transition-all duration-200">
<td class="py-4 px-4 rounded-l-xl font-black text-2xl relative text-on-primary-container">
                                1
                                <span class="absolute -top-3 -left-1 rotate-[-15deg] material-symbols-outlined text-amber-500 scale-125" style="font-variation-settings: 'FILL' 1;">workspace_premium</span>
</td>
<td class="py-4 px-4">
<div class="flex items-center gap-3">
<div class="w-10 h-10 bg-on-primary-container rounded-sm flex items-center justify-center text-primary-container font-bold text-lg">:)</div>
<span class="font-bold text-on-primary-container text-lg">PuddingPop</span>
</div>
</td>
<td class="py-4 px-4 text-center font-bold text-on-primary-container">24</td>
<td class="py-4 px-4 text-right font-black text-xl rounded-r-xl text-on-primary-container">482,900</td>
</tr>
<!-- Rank 2 -->
<tr class="bg-secondary-container group transition-all duration-200">
<td class="py-4 px-4 rounded-l-xl font-black text-2xl text-on-secondary-container">2</td>
<td class="py-4 px-4">
<div class="flex items-center gap-3">
<div class="w-10 h-10 bg-on-secondary-container rounded-sm flex items-center justify-center text-secondary-container font-bold text-lg">;)</div>
<span class="font-bold text-on-secondary-container text-lg">MochiMaster</span>
</div>
</td>
<td class="py-4 px-4 text-center font-bold text-on-secondary-container">22</td>
<td class="py-4 px-4 text-right font-black text-xl rounded-r-xl text-on-secondary-container">412,450</td>
</tr>
<!-- Rank 3 -->
<tr class="bg-tertiary-container group transition-all duration-200">
<td class="py-4 px-4 rounded-l-xl font-black text-2xl text-on-tertiary-container">3</td>
<td class="py-4 px-4">
<div class="flex items-center gap-3">
<div class="w-10 h-10 bg-on-tertiary-container rounded-sm flex items-center justify-center text-tertiary-container font-bold text-lg">:0</div>
<span class="font-bold text-on-tertiary-container text-lg">SoftBlock</span>
</div>
</td>
<td class="py-4 px-4 text-center font-bold text-on-tertiary-container">19</td>
<td class="py-4 px-4 text-right font-black text-xl rounded-r-xl text-on-tertiary-container">389,000</td>
</tr>
<!-- Standard Rows (4-10) -->
<tr class="bg-surface-container-low hover:bg-surface-container-high transition-all duration-200">
<td class="py-4 px-4 rounded-l-xl font-bold text-on-surface-variant">4</td>
<td class="py-4 px-4">
<div class="flex items-center gap-3">
<div class="w-8 h-8 bg-outline-variant rounded-sm flex items-center justify-center text-surface font-bold text-sm">:/</div>
<span class="font-bold text-on-surface">NeonCat</span>
</div>
</td>
<td class="py-4 px-4 text-center text-on-surface-variant">17</td>
<td class="py-4 px-4 text-right font-bold rounded-r-xl text-on-surface">321,100</td>
</tr>
<tr class="bg-surface-container-low hover:bg-surface-container-high transition-all duration-200">
<td class="py-4 px-4 rounded-l-xl font-bold text-on-surface-variant">5</td>
<td class="py-4 px-4">
<div class="flex items-center gap-3">
<div class="w-8 h-8 bg-outline-variant rounded-sm flex items-center justify-center text-surface font-bold text-sm">:)</div>
<span class="font-bold text-on-surface">LofiGirl</span>
</div>
</td>
<td class="py-4 px-4 text-center text-on-surface-variant">16</td>
<td class="py-4 px-4 text-right font-bold rounded-r-xl text-on-surface">298,400</td>
</tr>
<tr class="bg-surface-container-low hover:bg-surface-container-high transition-all duration-200">
<td class="py-4 px-4 rounded-l-xl font-bold text-on-surface-variant">6</td>
<td class="py-4 px-4">
<div class="flex items-center gap-3">
<div class="w-8 h-8 bg-outline-variant rounded-sm flex items-center justify-center text-surface font-bold text-sm">;)</div>
<span class="font-bold text-on-surface">TetriTaco</span>
</div>
</td>
<td class="py-4 px-4 text-center text-on-surface-variant">15</td>
<td class="py-4 px-4 text-right font-bold rounded-r-xl text-on-surface">254,900</td>
</tr>
<tr class="bg-surface-container-low hover:bg-surface-container-high transition-all duration-200">
<td class="py-4 px-4 rounded-l-xl font-bold text-on-surface-variant">7</td>
<td class="py-4 px-4">
<div class="flex items-center gap-3">
<div class="w-8 h-8 bg-outline-variant rounded-sm flex items-center justify-center text-surface font-bold text-sm">:0</div>
<span class="font-bold text-on-surface">CloudBoi</span>
</div>
</td>
<td class="py-4 px-4 text-center text-on-surface-variant">14</td>
<td class="py-4 px-4 text-right font-bold rounded-r-xl text-on-surface">211,200</td>
</tr>
<tr class="bg-surface-container-low hover:bg-surface-container-high transition-all duration-200">
<td class="py-4 px-4 rounded-l-xl font-bold text-on-surface-variant">8</td>
<td class="py-4 px-4">
<div class="flex items-center gap-3">
<div class="w-8 h-8 bg-outline-variant rounded-sm flex items-center justify-center text-surface font-bold text-sm">:/</div>
<span class="font-bold text-on-surface">Marshmallow</span>
</div>
</td>
<td class="py-4 px-4 text-center text-on-surface-variant">12</td>
<td class="py-4 px-4 text-right font-bold rounded-r-xl text-on-surface">198,000</td>
</tr>
<tr class="bg-surface-container-low hover:bg-surface-container-high transition-all duration-200">
<td class="py-4 px-4 rounded-l-xl font-bold text-on-surface-variant">9</td>
<td class="py-4 px-4">
<div class="flex items-center gap-3">
<div class="w-8 h-8 bg-outline-variant rounded-sm flex items-center justify-center text-surface font-bold text-sm">:)</div>
<span class="font-bold text-on-surface">BeanPlayer</span>
</div>
</td>
<td class="py-4 px-4 text-center text-on-surface-variant">11</td>
<td class="py-4 px-4 text-right font-bold rounded-r-xl text-on-surface">176,550</td>
</tr>
<tr class="bg-surface-container-low hover:bg-surface-container-high transition-all duration-200">
<td class="py-4 px-4 rounded-l-xl font-bold text-on-surface-variant">10</td>
<td class="py-4 px-4">
<div class="flex items-center gap-3">
<div class="w-8 h-8 bg-outline-variant rounded-sm flex items-center justify-center text-surface font-bold text-sm">;)</div>
<span class="font-bold text-on-surface">SillySquare</span>
</div>
</td>
<td class="py-4 px-4 text-center text-on-surface-variant">10</td>
<td class="py-4 px-4 text-right font-bold rounded-r-xl text-on-surface">152,000</td>
</tr>
</tbody>
</table>
</div>
<!-- CTA Section -->
<div class="mt-12 flex justify-center">
<button class="bg-primary text-on-primary rounded-full px-12 py-5 font-black text-xl uppercase tracking-tighter hover:scale-[0.96] transition-transform duration-200 soft-shadow flex items-center gap-3">
<span class="material-symbols-outlined" data-icon="arrow_back">arrow_back</span>
                    BACK TO GAME
                </button>
</div>
</div>
<!-- Decorative Info -->
<div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
<div class="bg-surface-container-low p-6 rounded-xl text-center">
<div class="text-primary text-3xl font-black mb-1">12,402</div>
<div class="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Games Played Today</div>
</div>
<div class="bg-surface-container-low p-6 rounded-xl text-center">
<div class="text-secondary text-3xl font-black mb-1">4.8k</div>
<div class="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Active Playroomers</div>
</div>
<div class="bg-surface-container-low p-6 rounded-xl text-center">
<div class="text-tertiary text-3xl font-black mb-1">Level 24</div>
<div class="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Current Record</div>
</div>
</div>
</main>
<!-- Footer Shell -->
<footer class="bg-transparent flex flex-col items-center justify-center gap-2 w-full pb-8 z-10 relative mt-12">
<div class="be-vietnam-pro text-sm italic text-[#302e30] dark:text-[#fbf5f7] opacity-40">© 2024 Tactile Playroom :)</div>
<div class="flex gap-6">
<a class="be-vietnam-pro text-sm italic text-[#302e30] dark:text-[#fbf5f7] opacity-40 hover:opacity-100 transition-opacity underline" href="#">Support</a>
<a class="be-vietnam-pro text-sm italic text-[#302e30] dark:text-[#fbf5f7] opacity-40 hover:opacity-100 transition-opacity underline" href="#">Privacy</a>
</div>
</footer>
</body></html>

<!-- Cute Tetris - Game Over -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Tactile Playroom - Game Over</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&amp;family=Be+Vietnam+Pro:wght@300;400;500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "surface-container": "#ece7e9",
                        "primary-dim": "#753e58",
                        "on-error-container": "#510017",
                        "error": "#b41340",
                        "surface-variant": "#e1dbde",
                        "tertiary": "#2f663d",
                        "primary": "#824a64",
                        "on-tertiary": "#ceffd2",
                        "inverse-primary": "#fdb5d3",
                        "primary-fixed": "#fdb5d3",
                        "outline": "#797678",
                        "on-surface-variant": "#5e5b5c",
                        "on-primary": "#ffeff3",
                        "tertiary-dim": "#235a32",
                        "surface-tint": "#824a64",
                        "tertiary-fixed-dim": "#afebb6",
                        "primary-container": "#fdb5d3",
                        "secondary-fixed": "#b8dffd",
                        "on-secondary-container": "#295169",
                        "surface-bright": "#fbf5f7",
                        "outline-variant": "#b0acae",
                        "on-tertiary-fixed": "#164f28",
                        "surface-container-highest": "#e1dbde",
                        "error-container": "#f74b6d",
                        "secondary-fixed-dim": "#aad1ee",
                        "error-dim": "#a70138",
                        "surface-container-high": "#e7e1e4",
                        "background": "#fbf5f7",
                        "on-primary-fixed-variant": "#6f3a53",
                        "tertiary-fixed": "#bdfac4",
                        "secondary": "#396079",
                        "on-primary-fixed": "#4d1d36",
                        "surface-container-lowest": "#ffffff",
                        "on-tertiary-container": "#2a6239",
                        "primary-fixed-dim": "#eda7c5",
                        "on-primary-container": "#65314a",
                        "surface-container-low": "#f5eff1",
                        "on-secondary-fixed-variant": "#345a73",
                        "inverse-surface": "#0f0e0f",
                        "secondary-dim": "#2d546c",
                        "surface": "#fbf5f7",
                        "on-surface": "#302e30",
                        "surface-dim": "#d9d3d6",
                        "on-secondary": "#e9f4ff",
                        "inverse-on-surface": "#a09c9e",
                        "on-secondary-fixed": "#133e56",
                        "on-tertiary-fixed-variant": "#356c42",
                        "tertiary-container": "#bdfac4",
                        "on-error": "#ffefef",
                        "on-background": "#302e30",
                        "secondary-container": "#b8dffd"
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
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .tetromino-block {
            width: 32px;
            height: 32px;
            border-radius: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            font-weight: bold;
        }
    </style>
</head>
<body class="bg-surface font-body text-on-surface">
<!-- Background: Blurred Game Board (Represented via Tonal Layering) -->
<div class="fixed inset-0 z-0 flex items-center justify-center overflow-hidden opacity-50 blur-md pointer-events-none">
<div class="grid grid-cols-10 gap-1 p-4 bg-surface-container-high rounded-xl aspect-[1/2] h-[819px]">
<!-- Simulated background blocks -->
<div class="bg-primary-container rounded-sm w-full h-full opacity-20"></div>
<div class="bg-secondary-container rounded-sm w-full h-full opacity-20"></div>
<div class="bg-tertiary-container rounded-sm w-full h-full opacity-20"></div>
<div class="bg-surface-container-highest rounded-sm w-full h-full opacity-20"></div>
<div class="bg-primary-container rounded-sm w-full h-full opacity-20"></div>
<div class="col-start-4 col-span-2 row-start-12 bg-primary-dim rounded-sm w-full h-full"></div>
<div class="col-start-6 col-span-2 row-start-15 bg-secondary-dim rounded-sm w-full h-full"></div>
<div class="col-start-2 col-span-4 row-start-18 bg-tertiary-dim rounded-sm w-full h-full"></div>
</div>
</div>
<!-- Main Navigation (Suppressed for Focus Journey, but kept TopAppBar if needed for Exit) -->
<header class="fixed top-0 left-0 right-0 z-50 flex justify-between items-center w-full px-6 py-4 bg-[#fbf5f7] dark:bg-[#1a1819] no-borders">
<div class="text-2xl font-bold text-[#FFB7D5] dark:text-[#FFD1E3] lowercase font-plus-jakarta tracking-tighter">
            tactile playroom
        </div>
<div class="flex gap-4">
<button class="hover:scale-95 transition-transform duration-200 text-[#302e30] dark:text-[#f5eff1]">
<span class="material-symbols-outlined" data-icon="help">help</span>
</button>
</div>
</header>
<!-- Game Over Modal Overlay -->
<div class="fixed inset-0 z-50 flex items-center justify-center p-6 bg-surface/80 backdrop-blur-[20px]">
<!-- Modal Card -->
<div class="relative max-w-md w-full bg-surface-container-low rounded-xl p-10 flex flex-col items-center text-center shadow-[0_12px_32px_rgba(48,46,48,0.06)]">
<!-- Doodle Elements (Abstract Shapes) -->
<div class="absolute -top-6 -right-6 w-20 h-20 bg-primary-container opacity-30 rounded-full blur-xl"></div>
<div class="absolute -bottom-10 -left-10 w-24 h-24 bg-secondary-container opacity-30 rounded-full blur-xl"></div>
<!-- Header Section -->
<div class="flex flex-col items-center gap-2 mb-8">
<div class="w-16 h-16 bg-error-container rounded-lg flex items-center justify-center transform -rotate-6">
<span class="text-3xl font-bold text-on-error-container">:(</span>
</div>
<h1 class="text-5xl font-extrabold font-headline tracking-tighter text-on-surface-variant mt-4">OH NO!</h1>
<p class="text-on-surface opacity-70 font-medium">Game Over! You did your best.</p>
</div>
<!-- Stats Card -->
<div class="w-full bg-surface-container-lowest rounded-lg p-6 mb-8 flex flex-col gap-4">
<div class="flex justify-between items-center border-b-4 border-surface-container-low pb-4">
<span class="font-label text-[10px] tracking-widest uppercase opacity-60">Final Score</span>
<span class="text-3xl font-bold font-headline text-primary">004,820</span>
</div>
<div class="flex justify-between items-center pt-2">
<span class="font-label text-[10px] tracking-widest uppercase opacity-60">Level Reached</span>
<span class="text-xl font-bold font-headline text-secondary">08</span>
</div>
</div>
<!-- Action Buttons -->
<div class="flex flex-col w-full gap-4">
<button class="group w-full py-5 px-8 bg-primary rounded-full text-on-primary font-bold text-lg hover:scale-95 transition-transform duration-200 flex items-center justify-center gap-3">
<div class="relative">
<span class="material-symbols-outlined text-3xl group-hover:rotate-180 transition-transform duration-500" data-icon="sync">sync</span>
<span class="absolute inset-0 flex items-center justify-center text-[8px] font-black top-0.5">:0</span>
</div>
                    RETRY
                </button>
<button class="w-full py-4 px-8 bg-secondary-container rounded-xl text-on-secondary-container font-semibold hover:scale-95 transition-transform duration-200">
                    LEADERBOARD
                </button>
</div>
<!-- Pathos/Sad Blocks -->
<div class="mt-12 flex gap-4 items-end">
<div class="tetromino-block bg-primary-container opacity-80 transform -rotate-12 hover:translate-y-1 transition-transform cursor-default">
                    :(
                </div>
<div class="tetromino-block bg-secondary-container transform rotate-6 hover:translate-y-1 transition-transform cursor-default">
                    T_T
                </div>
<div class="tetromino-block bg-tertiary-container opacity-60 transform -rotate-3 hover:translate-y-1 transition-transform cursor-default">
                    :/
                </div>
<div class="tetromino-block bg-surface-container-highest transform rotate-45 hover:translate-y-1 transition-transform cursor-default">
                    ;_;
                </div>
</div>
<!-- Hand-drawn Doodle (Represented by SVG illustration) -->
<div class="absolute -z-10 top-0 left-0 w-full h-full pointer-events-none opacity-40">
<svg class="absolute top-10 left-[-40px] w-24" viewbox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
<path class="text-primary-container" d="M20,50 Q40,10 60,50 T100,50" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"></path>
</svg>
<svg class="absolute bottom-10 right-[-40px] w-24" viewbox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
<circle class="text-secondary-container" cx="50" cy="50" fill="none" r="40" stroke="currentColor" stroke-dasharray="5,5" stroke-width="2"></circle>
</svg>
</div>
</div>
</div>
<!-- Image for Context (Decorative background illustration if needed) -->
<div class="fixed bottom-0 left-0 p-8 z-10 hidden md:block">
<img class="w-48 h-48 object-cover rounded-xl opacity-20 grayscale" data-alt="Soft aesthetic gradient background with pillowy shapes in muted pastel pink and cream tones" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAakHa08I_fl9gwxPCeerQXMhsyeNYsZk0oBLLSSnF2eLmBiO-f-1_himXJglAA1FraPjonzF1KQuu4RU_qN5s8mPXfkxV6b_KSW5L9AMzrT6Z6VNZU2zdtqsHWtwNXUx1bApVZR4FxOKHMqPSLPkl6_BCCSIYZeaQWgGVGvb6ixgtRdbdiHuaseCwaripyNb2Ev3456nDqhUqqwpP8BUilqZ9RQ4_itk71qNiFJfWJkiEQVI8YgtUkfUxv5xQrMUfdaJYZgVlnFw"/>
</div>
</body></html>