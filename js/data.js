// === DATA ===
// Ganti isi array di file ini untuk update konten portofolio.
// File render.js akan otomatis membaca data dari sini.

const NAV_LINKS = [
  {href:"#home", label:"Home"},
  {href:"#about", label:"About"},
  {href:"#gamedev", label:"Projects"},
  {href:"#gaming", label:"Gaming"},
  {href:"#skills", label:"Skills"},
  {href:"#journey", label:"Journey"},
  {href:"#achievements", label:"Achievements"},
  {href:"#gallery", label:"Gallery"},
  {href:"#devlog", label:"Devlog"},
  {href:"#contact", label:"Contact"}
];

// 4 tab utama + tombol "Menu" yang buka drawer berisi NAV_LINKS lengkap
// "icon" merujuk ke id simbol SVG di sprite index.html (lihat <symbol id="i-...">)
const TAB_LINKS = [
  {href:"#home", label:"Home", icon:"home"},
  {href:"#gamedev", label:"Projects", icon:"folder"},
  {href:"#gaming", label:"Gaming", icon:"gamepad"},
  {href:"#skills", label:"Skills", icon:"wrench"}
];

const SOCIAL_LINKS = [
  {icon:"github", url:"#", label:"GitHub"},
  {icon:"discord", url:"#", label:"Discord"},
  {icon:"camera", url:"#", label:"Instagram"},
  {icon:"play", url:"#", label:"YouTube"}
];

const LEVEL_MAP = {
  Learning:{pct:25, color:"var(--cyan)"},
  Familiar:{pct:50, color:"var(--muted)"},
  Intermediate:{pct:75, color:"var(--amber)"},
  Advanced:{pct:95, color:"var(--green)"}
};

const DATA_STATS = [
  {num:"50+", lbl:"Games Played"},
  {num:"5+", lbl:"Projects"},
  {num:"10+", lbl:"Technologies"},
  {num:"Game Dev", lbl:"Currently Learning"}
];

const DATA_GAMES = [
  {name:"Minecraft", tags:"Survival · Building", fav:true, icon:"pickaxe", color:"#4c9a5b"},
  {name:"Valorant", tags:"FPS · Tactical", fav:true, icon:"target", color:"#ff4655"},
  {name:"Mobile Legends", tags:"MOBA · Ranked", icon:"swords", color:"#3ec6ff"},
  {name:"Genshin Impact", tags:"Open World · RPG", icon:"star", color:"#7c6bff"},
  {name:"GTA V", tags:"Open World · Story", icon:"car", color:"#ffb648"},
  {name:"Roblox", tags:"Sandbox · Multiplayer", icon:"cube", color:"#38d98a"}
];

const DATA_GAMEDEV = [
  {name:"Zombie Survival", desc:"A small survival game dibuat sambil belajar Unity dan C#.", engine:"Unity", lang:"C#", status:"In Development", demo:"#", repo:"#"},
  {name:"My First Unity Game", desc:"Proyek pertama untuk memahami dasar game loop dan physics 2D.", engine:"Unity", lang:"C#", status:"Completed", demo:"#", repo:"#"}
];

const DATA_ITPROJECTS = [
  {name:"Personal Website", desc:"My portfolio website using HTML, CSS, JavaScript.", tags:["HTML","CSS","JavaScript"], url:"#", icon:"globe", color:"var(--cyan)"},
  {name:"To-Do App", desc:"Simple task manager app with JavaScript.", tags:["JavaScript","LocalStorage"], url:"#", icon:"check", color:"var(--green)"},
  {name:"Discord Bot", desc:"A basic Discord bot using Python.", tags:["Python","Discord API"], url:"#", icon:"discord", color:"var(--primary2)"},
  {name:"Simple Database App", desc:"User data management app using MySQL.", tags:["MySQL","PHP"], url:"#", icon:"database", color:"var(--amber)"}
];

const DATA_SKILLS = {
  Programming:[["C#","Intermediate"],["JavaScript","Intermediate"],["HTML/CSS","Advanced"],["Python","Familiar"],["C++","Learning"]],
  "Game Development":[["Unity","Intermediate"],["Godot","Familiar"],["Unreal Engine","Learning"]],
  Tools:[["Git","Intermediate"],["GitHub","Intermediate"],["VS Code","Advanced"],["Blender","Learning"],["Figma","Familiar"]]
};

const DATA_JOURNEY = [
  {d:"Sep 2026", t:"Membuat game 2D pertama"},
  {d:"Oct 2026", t:"Belajar JavaScript"},
  {d:"Nov 2026", t:"Belajar Git & GitHub"},
  {d:"Dec 2026", t:"Membuat game dengan sistem inventory"}
];

const DATA_ACHIEVEMENTS = [
  {y:"2026", t:"Completed Unity Beginner Course"},
  {y:"2026", t:"Participated in Game Jam"},
  {y:"2026", t:"Built First Game"},
  {y:"2026", t:"Created First Website"}
];

const DATA_GALLERY = ["Game Screenshot","Coding Session","Character Setup","Game UI Design","Wireframe","Dev Setup"];

const DATA_DEVLOG = [
  {t:"How I Made My First Enemy AI", d:"Sep 2026"},
  {t:"My First Week Learning Unity", d:"Sep 2026"},
  {t:"How I Created a Health System", d:"Oct 2026"},
  {t:"Why My First Game Failed", d:"Oct 2026"}
];

const DATA_CONTACT = [
  {label:"Email", val:"example@gmail.com", url:"mailto:example@gmail.com", icon:"mail"},
  {label:"GitHub", val:"@username", url:"#", icon:"github"},
  {label:"Discord", val:"@username", url:"#", icon:"discord"}
];
