// ====== CONFIGURAÇÃO: coloque seu WhatsApp aqui ======
const WHATSAPP_PHONE_E164 = "55SEUNUMEROAQUI"; // exemplo: "5511999999999"
const DEFAULT_MSG = "Olá! Vim pelo site da SIMAU e quero um orçamento. Minha cidade é ___ e o serviço é ___.";

// Monta link do WhatsApp
function waLink(message) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_PHONE_E164}?text=${text}`;
}

// Atualiza todos os CTAs
function applyWhatsAppLinks() {
  const link = waLink(DEFAULT_MSG);
  ["ctaTop", "ctaTopMobile", "ctaHero", "ctaContato", "ctaCard"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = link;
  });
}

applyWhatsAppLinks();
document.getElementById("year").textContent = new Date().getFullYear();

// ====== MENU MOBILE ======
const burger = document.getElementById("burger");
const mobilemenu = document.getElementById("mobilemenu");

if (burger && mobilemenu) {
  burger.addEventListener("click", () => {
    const isOpen = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", String(!isOpen));
    mobilemenu.hidden = isOpen;
  });

  // Fecha menu ao clicar em link
  mobilemenu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      burger.setAttribute("aria-expanded", "false");
      mobilemenu.hidden = true;
    });
  });
}

// ====== MODAL (ícones clicáveis) ======
const modal = document.getElementById("modal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalBullets = document.getElementById("modalBullets");
const modalCTA = document.getElementById("modalCTA");
const modalIcon = document.getElementById("modalIcon");

const SERVICES = {
  reformas: {
    icon: "🏗️",
    title: "Reformas & Obras",
    desc: "Reformas completas e adequações com padrão de entrega, organização e limpeza.",
    bullets: ["Pintura e acabamento", "Pisos e revestimentos", "Drywall e divisórias", "Adequações e melhorias"],
    msg: "Olá! Quero orçamento para REFORMAS/OBRAS. Cidade: ___. Detalhes: ___. Posso enviar fotos?"
  },
  eletrica: {
    icon: "⚡",
    title: "Instalações Elétricas",
    desc: "Execução e correções elétricas com foco em segurança, organização e qualidade.",
    bullets: ["Quadros e circuitos", "Iluminação e tomadas", "Correções e melhorias", "Organização e identificação"],
    msg: "Olá! Quero orçamento para INSTALAÇÕES ELÉTRICAS. Cidade: ___. Detalhes: ___. Posso enviar fotos?"
  },
  dados: {
    icon: "🧰",
    title: "Infra de Dados",
    desc: "Infraestrutura e organização para rede e cabeamento estruturado.",
    bullets: ["Cabeamento estruturado", "Racks e patch panels", "Passagem de infraestrutura", "Organização e identificação"],
    msg: "Olá! Quero orçamento para INFRA DE DADOS. Cidade: ___. Detalhes: ___. Posso enviar fotos?"
  },
  manutencao: {
    icon: "🛠️",
    title: "Manutenção Predial",
    desc: "Manutenção preventiva e corretiva para manter tudo funcionando no dia a dia.",
    bullets: ["Preventiva e corretiva", "Pequenos reparos", "Ajustes e melhorias", "Atendimento sob demanda"],
    msg: "Olá! Quero orçamento para MANUTENÇÃO PREDIAL. Cidade: ___. Detalhes: ___. Posso enviar fotos?"
  }
};

function openModal(key) {
  const s = SERVICES[key];
  if (!s) return;

  modalIcon.textContent = s.icon;
  modalTitle.textContent = s.title;
  modalDesc.textContent = s.desc;

  modalBullets.innerHTML = "";
  s.bullets.forEach(b => {
    const div = document.createElement("div");
    div.className = "pill";
    div.textContent = b;
    modalBullets.appendChild(div);
  });

  modalCTA.href = waLink(s.msg);
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll(".iconcard").forEach(btn => {
  btn.addEventListener("click", () => openModal(btn.dataset.service));
});

modal.addEventListener("click", (e) => {
  const target = e.target;
  if (target && (target.dataset.close === "true")) closeModal();
});
modalClose.addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") closeModal();
});
