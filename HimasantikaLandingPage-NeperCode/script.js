/* ============================================
   Himasantika Landing Page — JavaScript
   Interaksi: navbar scroll, mobile menu,
              divisi filter tabs, divisi modal popup,
              contact form + toast
   ============================================ */

(function () {
  "use strict";

  /* ===== 1. Header scroll state ===== */
  const header = document.getElementById("header");
  const onScroll = () => {
    if (window.scrollY > 24) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ===== 2. Mobile hamburger menu ===== */
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");

  const toggleMenu = () => {
    const open = nav.classList.toggle("is-open");
    hamburger.classList.toggle("is-open", open);
    hamburger.setAttribute("aria-expanded", open ? "true" : "false");
    hamburger.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
  };
  hamburger.addEventListener("click", toggleMenu);

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      hamburger.classList.remove("is-open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });

  /* ===== 3. Divisi filter tabs ===== */
  const tabs = document.querySelectorAll(".divisi-tab");
  const cards = document.querySelectorAll(".divisi-card");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const cat = tab.dataset.cat;
      tabs.forEach((t) => t.classList.remove("divisi-tab--active"));
      tab.classList.add("divisi-tab--active");
      cards.forEach((card) => {
        card.style.display = (cat === "all" || card.dataset.cat === cat) ? "" : "none";
      });
    });
  });

  /* ===== 4. Modal popup (BPH tugas + Divisi staff flowchart) ===== */
  const modal = document.getElementById("divisiModal");
  const modalContent = document.getElementById("modalContent");

  const escapeHtml = (str) =>
    String(str).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const renderStaffList = (list) =>
    list.map((name) => `<li>${escapeHtml(name)}</li>`).join("");

  /* Render untuk modal BPH (single content: jabatan + nama + deskripsi) */
  const renderBphContent = (jabatan, nama, desc) => `
    <span class="modal-content__eyebrow">Tugas Jabatan</span>
    <h2 class="modal-content__title" id="modalTitle">${escapeHtml(jabatan)}</h2>
    <p class="modal-content__subtitle">Pemegang jabatan: <strong style="color: var(--primary);">${escapeHtml(nama)}</strong></p>
    <div class="bph-modal-desc">
      <div class="bph-modal-desc__icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
      </div>
      <p>${escapeHtml(desc)}</p>
    </div>
  `;

  /* Render untuk modal Divisi (flowchart staff) */
  const renderDivisiContent = (name, staffData) => {
    let data;
    try {
      data = typeof staffData === "string" ? JSON.parse(staffData) : staffData;
    } catch (e) {
      data = { ketua: "-", staff24: [], staff25: [] };
    }
    return `
      <span class="modal-content__eyebrow">Struktur Staff</span>
      <h2 class="modal-content__title" id="modalTitle">${escapeHtml(name)}</h2>
      <p class="modal-content__subtitle">Periode Kepengurusan 2026 · Himasantika UMC</p>
      <div class="flowchart">
        <div class="flowchart__ketua">
          <span class="flowchart__ketua-label">Ketua</span>
          <span class="flowchart__ketua-name">${escapeHtml(data.ketua || "-")}</span>
        </div>
        <div class="flowchart__connector"></div>
        <div class="flowchart__branches">
          <div class="flowchart__branch">
            <span class="flowchart__branch-label">Staff Angkatan 24</span>
            <ul class="flowchart__staff">
              ${data.staff24 && data.staff24.length ? renderStaffList(data.staff24) : "<li>—</li>"}
            </ul>
          </div>
          <div class="flowchart__branch">
            <span class="flowchart__branch-label">Staff Angkatan 25</span>
            <ul class="flowchart__staff">
              ${data.staff25 && data.staff25.length ? renderStaffList(data.staff25) : "<li>—</li>"}
            </ul>
          </div>
        </div>
      </div>
    `;
  };

  const openModal = (html) => {
    modalContent.innerHTML = html;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  /* Handler untuk BPH cards */
  document.querySelectorAll(".bph-card").forEach((card) => {
    card.addEventListener("click", () => {
      const jabatan = card.dataset.jabatan;
      const nama = card.dataset.nama;
      const desc = card.dataset.desc;
      if (jabatan && nama && desc) {
        openModal(renderBphContent(jabatan, nama, desc));
      }
    });
  });

  /* Handler untuk Divisi cards */
  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target.closest("a, button")) return;
      const name = card.dataset.name || card.querySelector("h3").textContent;
      const staff = card.dataset.staff;
      if (staff) openModal(renderDivisiContent(name, staff));
    });
  });

  /* Close modal: klik backdrop / tombol close / tombol ESC */
  modal.querySelectorAll("[data-close]").forEach((el) => {
    el.addEventListener("click", closeModal);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });

  /* ===== 5. Contact form + toast ===== */
  const form = document.getElementById("contactForm");
  const toast = document.getElementById("toast");
  const toastTitle = document.getElementById("toastTitle");
  const toastDesc = document.getElementById("toastDesc");
  let toastTimer = null;

  const showToast = (title, desc) => {
    toastTitle.textContent = title;
    toastDesc.textContent = desc;
    toast.classList.add("is-show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-show"), 4500);
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nama = document.getElementById("nama").value.trim();
    const email = document.getElementById("email").value.trim();
    const pesan = document.getElementById("pesan").value.trim();

    if (!nama || !email || !pesan) {
      showToast("Form belum lengkap", "Mohon lengkapi semua field terlebih dahulu.");
      return;
    }
    showToast("Pesan terkirim! ✨", `Terima kasih ${nama}, tim Himasantika akan menghubungi Anda secepatnya.`);
    form.reset();
  });

  /* ===== 6. Footer year ===== */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
