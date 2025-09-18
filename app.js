// ==================== Firebase (ESM) ====================
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBt6OlcaDWbhx-ldI4l0a4kDPu8U1dm48c",
  authDomain: "login-de-lista-de-fallas.firebaseapp.com",
  projectId: "login-de-lista-de-fallas",
  storageBucket: "login-de-lista-de-fallas.firebasestorage.app",
  messagingSenderId: "632649294661",
  appId: "1:632649294661:web:9c6daa894931936c87142c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

// ==================== 2º factor: configuración ====================
const PASSWORD_HASH = "7a92c8be74878e8ee870f84cc90dcf431a4104dc2d93426a56eb96008699ff52";

async function sha256Hex(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}
function show(id, display = "flex") { const el = document.getElementById(id); if (el) el.style.display = display; }
function hide(id) { const el = document.getElementById(id); if (el) el.style.display = "none"; }
function isSecondFactorOk() { return sessionStorage.getItem("secondFactorOk") === "1"; }
function setSecondFactorOk(v) { sessionStorage.setItem("secondFactorOk", v ? "1" : "0"); }

// ==================== Login / Logout (globales) ====================
window.login = () =>
  signInWithPopup(auth, provider)
    .then(() => {
      // tras login, mostrar GATE de contraseña
      setSecondFactorOk(false);
      hide("loginContainer");
      show("passwordGate", "flex");
      hide("appContent");
      requestAnimationFrame(() => document.getElementById("passwordGate")?.classList.add("hud-appear"));
    })
    .catch(err => alert("Error al iniciar sesión: " + err.message));

window.logout = () => signOut(auth);

// ==================== Verificación de contraseña (2FA) ====================
window.verifyPassword = async () => {
  const input = document.getElementById("pwdInput");
  const error = document.getElementById("pwdError");
  if (!input) return;

  const typedHash = await sha256Hex((input.value || "").trim());

  if (typedHash === PASSWORD_HASH) {
    setSecondFactorOk(true);
    hide("passwordGate");
    show("appContent", "flex");
    document.getElementById("logoutBtn")?.style && (document.getElementById("logoutBtn").style.display = "inline-block");
  } else {
    // animación de error + redirección a los 5s
    input.classList.add("error","shake");
    if (error) { error.style.display = "block"; error.textContent = "Contraseña incorrecta"; }
    setTimeout(() => input.classList.remove("shake"), 600);
    await signOut(auth);
    setSecondFactorOk(false);
    setTimeout(() => location.replace("https://www.google.com/"), 5000);
  }
};

// ==================== Estado Auth ====================
onAuthStateChanged(auth, user => {
  const emailText = document.getElementById("emailText");
  const logoutBtn = document.getElementById("logoutBtn");

  if (user) {
    emailText.textContent = user.email || "";
    logoutBtn.style.display = "inline-block";

    if (isSecondFactorOk()) {
      // ya pasó la contraseña en esta sesión
      hide("loginContainer");
      hide("passwordGate");
      show("appContent", "flex");
      document.getElementById("appContent")?.classList.add("hud-appear");
    } else {
      // mostrar gate de contraseña
      hide("loginContainer");
      show("passwordGate", "flex");
      hide("appContent");
      requestAnimationFrame(() => document.getElementById("passwordGate")?.classList.add("hud-appear"));
    }
  } else {
    // no autenticado
    setSecondFactorOk(false);
    show("loginContainer", "flex");
    hide("passwordGate");
    hide("appContent");
    logoutBtn.style.display = "none";
    emailText.textContent = "";
  }
});

// ==================== Datos (globales) ====================
window.respuestasPorFalla = { /* === tu objeto grande tal cual lo tenías === */ };

// ==================== UI helpers (globalizar) ====================
window.ocultarTodo = () => {
  ["mainMenu", "usoMenu", "fallasMenu", "respuestas", "contactoMenu"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });
  const resp = document.getElementById("respuestas");
  if (resp) resp.innerHTML = "";
};

window.showResponse = (falla) => {
  window.ocultarTodo();
  const respuestas = document.getElementById("respuestas");
  respuestas.style.display = "flex";
  void respuestas.offsetWidth;
  respuestas.classList.add("hud-appear");
  respuestas.innerHTML = `<button onclick="volverA('fallas')">← Volver</button><h2>${falla}</h2>`;

  if (window.respuestasPorFalla[falla]) {
    window.respuestasPorFalla[falla].forEach(([titulo, descripcion]) => {
      const btn = document.createElement("button");
      btn.textContent = titulo;
      btn.onclick = () => {
        respuestas.querySelectorAll(".response-box.dynamic").forEach(e => e.remove());
        const box = document.createElement("div");
        box.className = "response-box hud-appear dynamic";
        box.innerHTML = `➡ ${descripcion}`;
        respuestas.appendChild(box);
      };
      respuestas.appendChild(btn);
    });
  }
};

window.mostrarComoUsar = () => {
  window.ocultarTodo();
  const uso = document.getElementById("usoMenu");
  uso.style.display = "flex";
  requestAnimationFrame(() => uso.classList.add("hud-appear"));
};

window.mostrarFallas = () => {
  window.ocultarTodo();
  const fallas = document.getElementById("fallasMenu");
  fallas.style.display = "flex";
  requestAnimationFrame(() => fallas.classList.add("hud-appear"));
};

window.mostrarContacto = () => {
  window.ocultarTodo();
  const contacto = document.getElementById("contactoMenu");
  contacto.style.display = "flex";
  requestAnimationFrame(() => contacto.classList.add("hud-appear"));
};

window.volverA = (seccion) => {
  window.ocultarTodo();
  const destino = seccion === "main" ? "mainMenu" : "fallasMenu";
  const menu = document.getElementById(destino);
  menu.style.display = "flex";
  requestAnimationFrame(() => menu.classList.add("hud-appear"));
};

window.toggleTheme = () => document.body.classList.toggle("light-mode");
window.goToHome = () => { window.volverA("main"); document.getElementById("mainMenu").style.display = "flex"; };

// ==================== Preloader ====================
const preloader = document.getElementById("preloader");
const fill = document.getElementById("progressFill");
const percentText = document.getElementById("percentage");
const smoothProgress = [1, 5, 10, 20, 35, 50, 65, 80, 90, 100];
let index = 0;

window.onload = () => setTimeout(updateProgress, 200);
function updateProgress() {
  if (index < smoothProgress.length) {
    const value = smoothProgress[index];
    if (fill) fill.style.width = value + "%";
    if (percentText) percentText.textContent = value + "%";
    index++;
    setTimeout(updateProgress, 100);
  } else {
    percentText?.classList.add("flash");
    fill?.classList.add("flash");
    setTimeout(() => {
      if (preloader) preloader.style.display = "none";
      const appContent = document.getElementById("appContent");
      appContent?.classList.add("hud-appear");
    }, 500);
  }
}

// ==================== Restricciones ====================
document.addEventListener("contextmenu", e => e.preventDefault());

// ==================== Limpieza de error al tipear (2FA) ====================
document.getElementById("pwdInput")?.addEventListener("input", () => {
  const input = document.getElementById("pwdInput");
  const error = document.getElementById("pwdError");
  input?.classList.remove("error", "shake");
  if (error) { error.style.display = "none"; error.textContent = ""; }
});
