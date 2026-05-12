/**
 * ═══════════════════════════════════════════════════════════
 * Soukare Textile  — script.js
 * Loader · Cursor · Header · Bento · Products · Scrollytelling
 * Form · Sticky CTA · Toast · Animations
 * ═══════════════════════════════════════════════════════════
 */

'use strict';

// ------------------------------------------------------------
// Soukare Textile — script.js (refactor “pro”)
// Objectif : code plus clair, plus sûr, même comportement.
// ------------------------------------------------------------

/* ─── 1. CONSTANTES ─────────────────────────────────────── */
const WA_NUMBER = '22374969071';
const WA_BASE   = `https://wa.me/${WA_NUMBER}?text=`;

/** Encode un message pour URL WhatsApp */
const wa = (msg) => WA_BASE + encodeURIComponent(msg);

/** Formate un montant en FCFA */
const fcfa = (n) => n.toLocaleString('fr-FR') + ' FCFA';

/* ─── 2. CATALOGUE PRODUITS ─────────────────────────────── */
/**
 * Pour ajouter un produit : copier un objet, modifier ses valeurs.
 * category : "homme" | "femme" | "boubou" | "tissu"
 * badge    : "new" | "promo" | "sm" (sur mesure) | null
 */
const IMAGE_DIR = 'image/';

/**
 * Ajout photos (auto) :
 * - On préfixe automatiquement le dossier `image/` si besoin.
 */
const normalizeImg = (src) => {
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  if (src.startsWith('image/')) return src;
  if (src.startsWith('/')) return src.slice(1);
  // chemins locaux (ex: 'WhatsApp...jpeg') ou sous-dossiers
  return src.includes('/') ? `${IMAGE_DIR}${src}`.replace(`${IMAGE_DIR}image/`, 'image/') : `${IMAGE_DIR}${src}`;
};

const CATALOGUE = [
  {
    id: 1,
    name: 'Grand Boubou Prestige Onyx',
    cat: 'boubou',
    label: 'Grand Boubou',
    price: 85000,
    priceOld: null,
    badge: 'new',
    badgeText: 'Nouveau',
    madeToOrder: true,
    img: 'image/WhatsApp Image 2026-05-03 at 13.23.27 (1).jpeg',
    desc: 'Bazin bruni, broderies or géométriques',
  },
  {
    id: 2,
    name: 'Complet Bazin Homme — Prestige',
    cat: 'homme',
    label: 'Homme',
    price: 62000,
    priceOld: 78000,
    badge: 'promo',
    badgeText: 'Promo',
    madeToOrder: true,
    img: 'image/WhatsApp Image 2026-05-03 at 13.23.29 (2).jpeg',
    desc: 'Bazin riche, coupe moderne slim',
  },
  {
    id: 3,
    name: 'Boubou Brocart Cérémonie Femme',
    cat: 'femme',
    label: 'Femme',
    price: 70000,
    priceOld: null,
    badge: 'new',
    badgeText: 'Nouveau',
    madeToOrder: true,
    img: 'image/WhatsApp Image 2026-05-03 at 13.21.37 (3).jpeg',
    desc: 'Brocart doré, broderies florales main',
  },
  {
    id: 4,
    name: 'Bazin Rouge',
    cat: 'homme',
    label: 'Homme',
    price: 42000,
    priceOld: null,
    badge: null,
    badgeText: null,
    madeToOrder: false,
    img: 'image/WhatsApp Image 2026-05-03 at 13.21.37 (1).jpeg',
    desc: 'Bazin 100% coton, teint naturel',
  },
  {
    id: 5,
    name: 'Robe Wax Premium Femme',
    cat: 'femme',
    label: 'Femme',
    price: 38000,
    priceOld: 48000,
    badge: 'promo',
    badgeText: 'Promo',
    madeToOrder: true,
    img: 'image/WhatsApp Image 2026-05-03 at 13.23.29 (4).jpeg',
    desc: 'Wax hollandais, coupe africaine moderne',
  },
  {
    id: 6,
    name: 'Grand Boubou Ambassadeur Or',
    cat: 'boubou',
    label: 'Grand Boubou',
    price: 110000,
    priceOld: null,
    badge: 'sm',
    badgeText: 'Sur mesure',
    madeToOrder: true,
    img: 'image/WhatsApp Image 2026-05-03 at 13.23.28 (2).jpeg',
    desc: 'Bazin supérieur, broderies signées Soukare Textile',
  },
  {
    id: 7,
    name: 'Bazin Riche Premium — 2 m',
    cat: 'tissu',
    label: 'Tissu',
    price: 8500,
    priceOld: null,
    badge: null,
    badgeText: null,
    madeToOrder: false,
    img: 'image/WhatsApp Image 2026-05-03 at 13.23.30.jpeg',
    desc: 'Bazin bruni, grade AA, 2 mètres',
  },
  {
    id: 8,
    name: 'Tenue Enfant Petit Boubou',
    cat: 'homme',
    label: 'Enfant',
    price: 19000,
    priceOld: null,
    badge: 'new',
    badgeText: 'Nouveau',
    madeToOrder: true,
    img: 'image/WhatsApp Image 2026-05-03 at 13.21.38 (1).jpeg',
    desc: 'Mini bazin brodé, tailles 2 – 12 ans',
  },
];

/* ─── 3. LOADER ─────────────────────────────────────────── */
function initLoader() {
  // Recommandé pour un loader “pro” : ne pas bloquer trop longtemps.
  // (On garde la même logique existante.)
  const loader   = document.getElementById('loader');
  const progress = document.getElementById('loaderProgress');
  const pct      = document.getElementById('loaderPct');
  if (!loader) return;

  let current = 0;
  const target = 100;
  const duration = 1400; // ms
  const step = target / (duration / 16);

  const interval = setInterval(() => {
    current = Math.min(current + step + Math.random() * 2, target);
    const val = Math.floor(current);
    if (progress) progress.style.width = val + '%';
    if (pct) pct.textContent = val + '%';

    if (current >= target) {
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('out');
        document.body.style.overflow = '';
        // Lance les animations initiales
        initRevealOnLoad();
      }, 280);
    }
  }, 16);

  // Bloque le scroll pendant le loader
  document.body.style.overflow = 'hidden';
}

/* ─── 4. CURSEUR PERSONNALISÉ ────────────────────────────── */
function initCursor() {
  // Désactive sur tactile
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const dot  = document.querySelector('.cursor__dot');
  const ring = document.querySelector('.cursor__ring');
  if (!dot || !ring) return;

  let mouseX = -100, mouseY = -100;
  let ringX  = -100, ringY  = -100;

  // Suivi souris : on évite le jitter en pilotant le rendu via rAF.
  let hasPointer = false;

  const move = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    hasPointer = true;

    // Position dot au pixel exact
    dot.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`;
  };

  document.addEventListener('mousemove', move, { passive: true });

  // Anneau laggy (smooth)
  function animateRing() {
    if (!hasPointer) {
      ring.style.transform = `translate(-100px, -100px)`;
      requestAnimationFrame(animateRing);
      return;
    }

    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;

    ring.style.transform = `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%))`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover sur éléments cliquables → agrandir anneau
  const hoverEls = 'a, button, .bento__cell, .pcard, .filter, .contact-row, .social';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverEls)) {
      document.body.classList.add('cursor-hover');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverEls)) {
      document.body.classList.remove('cursor-hover');
    }
  });
}

/* ─── 5. HEADER SCROLL & NAV ACTIVE ─────────────────────── */
function initHeader() {
  const header   = document.getElementById('header');
  const navItems = document.querySelectorAll('.nav__item');
  const sections = document.querySelectorAll('section[id]');
  if (!header) return;

  // Classe scrolled
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 80);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Section active
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const id = e.target.id;
      navItems.forEach(item => {
        item.classList.toggle('active', item.getAttribute('href') === `#${id}`);
      });
    });
  }, {
    rootMargin: `-${parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 68}px 0px -55% 0px`,
    threshold: 0,
  });

  sections.forEach(s => sectionObserver.observe(s));
}

/* ─── 6. MENU HAMBURGER MOBILE ───────────────────────────── */
function initMobileMenu() {
  const hamburger  = document.getElementById('hamburger');
  const mainNav    = document.getElementById('mainNav');
  const navOverlay = document.getElementById('navOverlay');
  if (!hamburger || !mainNav) return;

  const open = () => {
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mainNav.classList.add('open');
    navOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mainNav.classList.remove('open');
    navOverlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => hamburger.classList.contains('open') ? close() : open());
  navOverlay.addEventListener('click', close);
  mainNav.querySelectorAll('.nav__item').forEach(l => l.addEventListener('click', close));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

/* ─── 7. BARRE DE RECHERCHE ──────────────────────────────── */
function initSearch() {
  const btn     = document.getElementById('searchBtn');
  const overlay = document.getElementById('searchOverlay');
  const input   = document.getElementById('searchInput');
  const close   = document.getElementById('searchClose');
  if (!btn || !overlay) return;

  btn.addEventListener('click', () => {
    overlay.classList.toggle('open');
    if (overlay.classList.contains('open')) input?.focus();
  });

  close?.addEventListener('click', () => overlay.classList.remove('open'));

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') overlay.classList.remove('open');
  });

  // Recherche → redirige vers WhatsApp
  input?.addEventListener('keydown', e => {
    if (e.key !== 'Enter' || !input.value.trim()) return;
    const q = input.value.trim();
    overlay.classList.remove('open');
    input.value = '';
    window.open(wa(`Bonjour Soukare Textile , je recherche : "${q}". Avez-vous ce produit ?`), '_blank', 'noopener');
  });
}

/* ─── 8. SMOOTH SCROLL ───────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const hh = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 68;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - hh, behavior: 'smooth' });
    });
  });
}

/* ─── 9. ANIMATIONS REVEAL SCROLL ───────────────────────── */
function initRevealObserver() {
  const elements = document.querySelectorAll('[data-reveal]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => observer.observe(el));
}

/** Révèle les éléments déjà visibles au chargement (post-loader) */
function initRevealOnLoad() {
  const elements = document.querySelectorAll('[data-reveal]');
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      el.classList.add('revealed');
    }
  });
}

/* ─── 10. PARALLAXE HERO ─────────────────────────────────── */
function initHeroParallax() {
  const heroImg     = document.getElementById('heroImg');
  const heroContent = document.getElementById('heroContent');
  if (!heroImg) return;

  // Désactive sur mobile (performance)
  if (window.matchMedia('(max-width: 768px)').matches) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      const speed   = 0.3;

      // Image recule légèrement
      if (heroImg) {
        heroImg.style.transform = `scale(1.06) translateY(${scrollY * speed}px)`;
      }

      // Contenu monte plus vite → effet parallaxe
      if (heroContent) {
        heroContent.style.transform = `translateY(${scrollY * 0.15}px)`;
        heroContent.style.opacity   = Math.max(1 - scrollY / 600, 0);
      }

      ticking = false;
    });
  }, { passive: true });
}

/* ─── 11. GÉNÉRATION CARTES PRODUITS ─────────────────────── */
/**
 * Construit l'HTML d'une carte produit
 * @param {Object} p - Données produit
 * @returns {string} HTML
 */
function buildCard(p) {
  const imgUrl = normalizeImg(p.img);

  // Badges
  const badgeHTML = p.badge
    ? `<span class="badge badge--${p.badge}">${p.badgeText}</span>`
    : '';

  const madeHTML = p.madeToOrder
    ? `<span class="badge badge--sm">Sur mesure ✓</span>`
    : '';

  const badgesHTML = (badgeHTML || madeHTML)
    ? `<div class="pcard__badges">${badgeHTML}${madeHTML}</div>`
    : '';

  // Prix barré
  const oldPriceHTML = p.priceOld
    ? `<span class="pcard__price-old">${fcfa(p.priceOld)}</span>`
    : '';

  // Messages WA (pro + cohérents)
  const msgDetail  = `Bonjour Soukare Textile, je voudrais des détails sur "${p.name}" (${fcfa(p.price)}).`;
  const msgOrder   = `Bonjour Soukare Textile, je souhaite commander "${p.name}" (${fcfa(p.price)}). Pouvez-vous me guider ?`;







  return `
<article class="pcard" data-cat="${p.cat}" data-reveal role="listitem">
  <div class="pcard__img-wrap">
    <img
      src="${imgUrl}"
      alt="${p.name}"
      loading="lazy"
      width="400" height="530"
      decoding="async"
      onerror="this.src='https://picsum.photos/400/530?grayscale'"
    />

    ${badgesHTML}
    <div class="pcard__quick">
      <a href="${wa(msgOrder)}" class="quick-order" target="_blank" rel="noopener" aria-label="Commander via WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Commande rapide
      </a>
    </div>
  </div>
  <div class="pcard__body">
    <span class="pcard__cat">${p.label}</span>
    <h3 class="pcard__name">${p.name}</h3>
    <div class="pcard__prices">
      <span class="pcard__price">${fcfa(p.price)}</span>
      ${oldPriceHTML}
    </div>
    <div class="pcard__actions">
      <a href="${wa(msgDetail)}"
         class="pcard__btn pcard__btn--ghost"
         target="_blank" rel="noopener">
        Détails
      </a>
      <a href="${wa(msgOrder)}"
         class="pcard__btn pcard__btn--gold"
         target="_blank" rel="noopener">
        Commander
      </a>
    </div>
  </div>
</article>`;
}

/**
 * Affiche les produits filtrés dans la grille
 * @param {string} cat - Catégorie ("all" ou slug)
 */
function renderProducts(cat = 'all') {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  const filtered = cat === 'all'
    ? CATALOGUE
    : CATALOGUE.filter(p => p.cat === cat);

  // Fade out
  grid.style.transition = 'opacity 0.2s, transform 0.2s';
  grid.style.opacity = '0';
  grid.style.transform = 'translateY(8px)';

  setTimeout(() => {
    grid.innerHTML = filtered.map(buildCard).join('');

    // Re-observe pour animations reveal
    initRevealObserver();

    grid.style.opacity = '1';
    grid.style.transform = 'translateY(0)';
  }, 200);
}

/* ─── 12. FILTRES PRODUITS ───────────────────────────────── */
function initFilters() {
  const filtersEl = document.getElementById('filters');
  if (!filtersEl) return;

  filtersEl.addEventListener('click', e => {
    const btn = e.target.closest('.filter');
    if (!btn) return;

    filtersEl.querySelectorAll('.filter').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });

    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    btn.setAttribute('tabindex', '0');

    renderProducts(btn.dataset.cat);

    // Gestion tabindex pour navigation clavier
    filtersEl.querySelectorAll('.filter').forEach(b => {
      if (b === btn) b.setAttribute('tabindex', '0');
      else b.setAttribute('tabindex', '-1');
    });
  });

  // Navigation clavier (flèches gauche/droite / home/end)
  filtersEl.addEventListener('keydown', (e) => {
    const active = filtersEl.querySelector('.filter.active') || filtersEl.querySelector('.filter[aria-selected="true"]');
    const buttons = Array.from(filtersEl.querySelectorAll('.filter'));
    const idx = Math.max(0, buttons.indexOf(active));

    const key = e.key;
    if (!['ArrowLeft','ArrowRight','Home','End'].includes(key)) return;
    e.preventDefault();

    let nextIdx = idx;
    if (key === 'ArrowLeft') nextIdx = (idx - 1 + buttons.length) % buttons.length;
    if (key === 'ArrowRight') nextIdx = (idx + 1) % buttons.length;
    if (key === 'Home') nextIdx = 0;
    if (key === 'End') nextIdx = buttons.length - 1;

    const nextBtn = buttons[nextIdx];
    nextBtn?.click();
  });
}


/* ─── 13. FORMULAIRE DE DEVIS ────────────────────────────── */
function initForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const fields = {
    nom:     form.querySelector('#f-nom'),
    tel:     form.querySelector('#f-tel'),
    type:    form.querySelector('#f-type'),
    msg:     form.querySelector('#f-msg'),
    occ:     form.querySelector('#f-occ'),
    budget:  form.querySelector('#f-budget'),
  };

  const requiredFields = [fields.nom, fields.tel, fields.type, fields.msg];

  // Validation en temps réel
  requiredFields.forEach(f => {
    if (!f) return;
    f.addEventListener('input',  () => f.classList.remove('err'));
    f.addEventListener('change', () => f.classList.remove('err'));
  });

  form.addEventListener('submit', e => {
    e.preventDefault();

    // Validation
    let valid = true;
    requiredFields.forEach(f => {
      if (!f) return;
      if (!f.value.trim()) { f.classList.add('err'); valid = false; }
      else f.classList.remove('err');
    });

    if (!valid) {
      showToast('⚠️ Merci de remplir tous les champs obligatoires.', 4500);
      const firstErr = form.querySelector('.err');
      if (firstErr) firstErr.focus();
      return;
    }

    // Labels
    const typeLabels = {
      boubou: 'Grand Boubou', costume: 'Costume / Complet', bazin: 'Tenue Bazin Riche',
      femme: 'Tenue Femme Traditionnelle', enfant: 'Tenue Enfant', tissu: 'Tissu au mètre', autre: 'Autre',
    };
    const budgetLabels = {
      'moins25k': '< 25 000 FCFA', '25-50k': '25 000 – 50 000 FCFA',
      '50-100k': '50 000 – 100 000 FCFA', 'plus100k': '+ 100 000 FCFA',
    };

    const nom    = fields.nom.value.trim();
    const tel    = fields.tel.value.trim();
    const type   = typeLabels[fields.type.value]  || fields.type.value;
    const occ    = fields.occ?.value.trim()  || '';
    const budget = budgetLabels[fields.budget?.value] || '';
    const msg    = fields.msg.value.trim();

    let waMsg = `✨ *DEVIS Soukare Textile *\n\n`;
    waMsg += `👤 *Nom :* ${nom}\n`;
    waMsg += `📱 *WhatsApp :* ${tel}\n`;
    waMsg += `👗 *Type :* ${type}\n`;
    if (occ)    waMsg += `🎉 *Occasion :* ${occ}\n`;
    if (budget) waMsg += `💰 *Budget :* ${budget}\n`;
    waMsg += `\n📝 *Détails :*\n${msg}\n\n`;
    waMsg += `Merci de me recontacter dès que possible 🙏`;

    // Ouvre WhatsApp
    window.open(wa(waMsg), '_blank', 'noopener');

    // Confirmation
    showToast('✅ Demande envoyée sur WhatsApp ! Réponse garantie sous 2h.', 6000);
    form.reset();
  });
}

/* ─── 14. STICKY CTA MOBILE ──────────────────────────────── */
function initStickyCTA() {
  const cta = document.getElementById('stickyCta');
  if (!cta) return;

  // Affiche uniquement sur mobile (CSS gère display:none sur desktop)
  let visible = false;

  window.addEventListener('scroll', () => {
    const shouldShow = window.scrollY > window.innerHeight * 0.4;
    if (shouldShow !== visible) {
      visible = shouldShow;
      cta.classList.toggle('visible', visible);
    }
  }, { passive: true });
}

/* ─── 15. TOAST ─────────────────────────────────────────── */
let toastTimer = null;

/**
 * Affiche un message toast temporaire
 * @param {string} msg - Message à afficher
 * @param {number} duration - Durée en ms
 */
function showToast(msg, duration = 4000) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  if (toastTimer) { clearTimeout(toastTimer); toast.classList.remove('show'); }

  requestAnimationFrame(() => {
    toast.textContent = msg;
    requestAnimationFrame(() => {
      toast.classList.add('show');
      toastTimer = setTimeout(() => {
        toast.classList.remove('show');
        toastTimer = null;
      }, duration);
    });
  });
}

/* ─── 16. TICKER SCROLL INFINI ───────────────────────────── */
/**
 * Le ticker HTML est déjà doublé pour le loop.
 * On pause l'animation au hover.
 */
function initTicker() {
  const ticker = document.getElementById('tickerInner');
  if (!ticker) return;

  ticker.addEventListener('mouseenter', () => { ticker.style.animationPlayState = 'paused'; });
  ticker.addEventListener('mouseleave', () => { ticker.style.animationPlayState = 'running'; });
}

/* ─── 17. COMPTEURS ANIMÉS ───────────────────────────────── */
/**
 * Anime un nombre de 0 à cible (effet count-up)
 * @param {HTMLElement} el
 * @param {number} target
 * @param {string} suffix
 */
function animateCount(el, target, suffix = '') {
  const duration = 1600;
  const start    = performance.now();

  const tick = (now) => {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.round(target * eased) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

function initCounters() {
  const statNum = document.querySelector('.bento__stat-num');
  if (!statNum) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      animateCount(e.target, 48, 'h');
      observer.unobserve(e.target);
    });
  }, { threshold: 0.5 });

  // Réinitialise pour l'animation
  statNum.textContent = '0h';
  observer.observe(statNum);
}

/* ─── 18. BACK TO TOP ────────────────────────────────────── */
function initBackToTop() {
  const btn = document.createElement('button');
  btn.setAttribute('aria-label', 'Retour en haut de page');
  btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 15l-6-6-6 6"/></svg>`;

  const s = btn.style;
  Object.assign(s, {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    background: 'rgba(198,155,60,0.85)',
    color: '#0A0A0A',
    border: '1px solid rgba(198,155,60,0.5)',
    backdropFilter: 'blur(12px)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '800',
    opacity: '0',
    transform: 'translateY(12px)',
    transition: 'opacity 0.35s, transform 0.35s',
    pointerEvents: 'none',
    boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
  });


  btn.querySelector('svg').style.cssText = 'width:18px;height:18px;';
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    const show = window.scrollY > 500;
    btn.style.opacity = show ? '1' : '0';
    btn.style.transform = show ? 'translateY(0)' : 'translateY(12px)';
    btn.style.pointerEvents = show ? 'auto' : 'none';
  }, { passive: true });

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Hover effect
  btn.addEventListener('mouseenter', () => { btn.style.background = 'var(--gold)'; btn.style.transform = 'translateY(-3px) scale(1.08)'; });
  btn.addEventListener('mouseleave', () => { btn.style.background = 'rgba(198,155,60,0.85)'; btn.style.transform = 'translateY(0)'; });
}

/* ─── 19. MICRO-INTERACTIONS BOUTONS ─────────────────────── */
function initMicroInteractions() {
  // Effet ripple or sur les boutons primaires
  document.querySelectorAll('.btn--primary').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      const rect   = this.getBoundingClientRect();
      const size   = Math.max(rect.width, rect.height) * 2;
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top  - size / 2;

      Object.assign(ripple.style, {
        position: 'absolute',
        width: size + 'px',
        height: size + 'px',
        left: x + 'px',
        top: y + 'px',
        background: 'rgba(255,255,255,0.3)',
        borderRadius: '50%',
        transform: 'scale(0)',
        animation: 'rippleEffect 0.5s ease-out forwards',
        pointerEvents: 'none',
      });

      if (!document.getElementById('rippleStyles')) {
        const style = document.createElement('style');
        style.id = 'rippleStyles';
        style.textContent = `@keyframes rippleEffect { to { transform: scale(1); opacity: 0; } }`;
        document.head.appendChild(style);
      }

      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 550);
    });
  });
}

/* ─── 20. IMAGE LAZY LOAD (fallback) ─────────────────────── */
function initLazyLoad() {
  if ('loading' in HTMLImageElement.prototype) return;

  const imgs = document.querySelectorAll('img[loading="lazy"]');
  const obs  = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const img = e.target;
      if (img.dataset.src) img.src = img.dataset.src;
      obs.unobserve(img);
    });
  });

  imgs.forEach(img => obs.observe(img));
}

/* ─── 21. ACCORDÉON FAQ (extensible) ─────────────────────── */
/**
 * Prêt à l'emploi — ajouter des éléments avec [data-accordion-trigger]
 * et [data-accordion-panel] dans le HTML si nécessaire.
 */
function initAccordions() {
  document.querySelectorAll('[data-accordion-trigger]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const panel  = document.querySelector(trigger.dataset.accordionTrigger);
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', !isOpen);
      if (panel) {
        panel.style.maxHeight = isOpen ? '0' : panel.scrollHeight + 'px';
        panel.style.overflow  = 'hidden';
        panel.style.transition = 'max-height 0.4s ease';
      }
    });
  });
}

/* ─── 22. GESTION PHOTOS (propriétaire) ───────────────────── */
const PHOTO_KEYS = {
  hero: 'photo.hero',
  manifeste: 'photo.manifeste',
  collections: 'photo.collections', // tableau 6
  savoir: 'photo.savoir', // tableau 3
};

function getStoredPhoto(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function setStoredPhoto(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // ignore
  }
}

function setAllImagesFromStorage() {
  // HERO
  const heroImg = document.getElementById('heroImg');
  const heroSrc = getStoredPhoto(PHOTO_KEYS.hero);
  if (heroImg && heroSrc) heroImg.src = heroSrc;

  // MANIFESTE
  const manifesteImg = document.querySelector('.manifeste__img-frame img');
  const manSrc = getStoredPhoto(PHOTO_KEYS.manifeste);
  if (manifesteImg && manSrc) manifesteImg.src = manSrc;

  // BENTO collections : on cible les 4 images + 1 enfant + 1 tissus (total 5) ici dans HTML.
  const bentoImgs = document.querySelectorAll('#collections .bento img');
  const collectionsJson = getStoredPhoto(PHOTO_KEYS.collections);
  if (bentoImgs && bentoImgs.length && collectionsJson) {
    try {
      const arr = JSON.parse(collectionsJson);
      bentoImgs.forEach((img, i) => {
        if (arr[i]) img.src = arr[i];
      });
    } catch {}
  }

  // SAVOIR-FAIRE : 3 images (pas picsum)
  const savoirImgs = document.querySelectorAll('#savoir-faire .sf__step-img img');
  const savoirJson = getStoredPhoto(PHOTO_KEYS.savoir);
  if (savoirImgs && savoirImgs.length && savoirJson) {
    try {
      const arr = JSON.parse(savoirJson);
      savoirImgs.forEach((img, i) => {
        if (arr[i]) img.src = arr[i];
      });
    } catch {}
  }
}

function initPhotoManager() {
  // Mode admin simple : on active seulement si l’URL contient ?admin=1
  const isAdmin = new URLSearchParams(window.location.search).get('admin') === '1';
  if (!isAdmin) return;

  // Injecte un panneau admin léger
  const panel = document.createElement('div');
  panel.setAttribute('id', 'photoAdminPanel');
  panel.style.cssText = [
    'position:fixed','top:88px','right:16px','z-index:2000',
    'background:rgba(10,10,10,0.92)','color:#F4EADE',
    'border:1px solid rgba(244,234,222,0.12)',
    'border-radius:14px','backdrop-filter:blur(14px)',
    'padding:12px','max-width:320px'
  ].join(';');
  panel.innerHTML = `
    <div style="font-family: Jost, sans-serif; font-size:0.9rem; text-transform:uppercase; letter-spacing:0.12em; opacity:0.85;">
      Admin photos
    </div>
    <div style="margin-top:10px; display:flex; flex-direction:column; gap:8px;">
      <button type="button" data-pick="hero" style="padding:10px 12px; border-radius:12px; background:#C69B3C; border:none; color:#0A0A0A; font-weight:700; cursor:pointer;">Changer photo Hero</button>
      <button type="button" data-pick="manifeste" style="padding:10px 12px; border-radius:12px; background:#C69B3C; border:none; color:#0A0A0A; font-weight:700; cursor:pointer;">Changer photo Manifeste</button>
      <button type="button" data-pick="collections" style="padding:10px 12px; border-radius:12px; background:#C69B3C; border:none; color:#0A0A0A; font-weight:700; cursor:pointer;">Changer photos Collections</button>
      <button type="button" data-pick="savoir" style="padding:10px 12px; border-radius:12px; background:#C69B3C; border:none; color:#0A0A0A; font-weight:700; cursor:pointer;">Changer photos Savoir-faire</button>
      <button type="button" id="photoReset" style="padding:10px 12px; border-radius:12px; background:transparent; border:1px solid rgba(198,155,60,0.55); color:#DDB85C; font-weight:700; cursor:pointer;">Réinitialiser</button>
      <div style="font-size:0.75rem; opacity:0.7; line-height:1.4; margin-top:2px;">
        Ajoute des photos avec ton téléphone/PC : elles restent dans le navigateur (localStorage).
      </div>
    </div>
  `;

  document.body.appendChild(panel);

  setAllImagesFromStorage();

  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.multiple = true;
  fileInput.style.display = 'none';
  document.body.appendChild(fileInput);

  const openPicker = (mode) => {
    fileInput.dataset.mode = mode;
    if (mode === 'collections' || mode === 'savoir') fileInput.multiple = true;
    else fileInput.multiple = false;
    fileInput.click();
  };

  panel.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-pick]');
    if (!btn) return;
    const mode = btn.getAttribute('data-pick');
    openPicker(mode);
  });

  fileInput.addEventListener('change', () => {
    const mode = fileInput.dataset.mode;
    const files = Array.from(fileInput.files || []);
    if (!files.length) return;

    const readFileAsDataURL = (file) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('File read error'));
      reader.readAsDataURL(file);
    });

    Promise.all(files.map(readFileAsDataURL)).then((dataUrls) => {
      if (mode === 'hero') {
        setStoredPhoto(PHOTO_KEYS.hero, dataUrls[0]);
        const heroImg = document.getElementById('heroImg');
        if (heroImg) heroImg.src = dataUrls[0];
      } else if (mode === 'manifeste') {
        setStoredPhoto(PHOTO_KEYS.manifeste, dataUrls[0]);
        const img = document.querySelector('.manifeste__img-frame img');
        if (img) img.src = dataUrls[0];
      } else if (mode === 'collections') {
        const bentoImgs = document.querySelectorAll('#collections .bento img');
        const current = (() => {
          const raw = getStoredPhoto(PHOTO_KEYS.collections);
          if (!raw) return [];
          try { return JSON.parse(raw); } catch { return []; }
        })();
        const arr = current.slice();
        dataUrls.forEach((u, i) => { arr[i] = u; });
        setStoredPhoto(PHOTO_KEYS.collections, JSON.stringify(arr));
        bentoImgs.forEach((img, i) => { if (arr[i]) img.src = arr[i]; });
      } else if (mode === 'savoir') {
        const savoirImgs = document.querySelectorAll('#savoir-faire .sf__step-img img');
        const current = (() => {
          const raw = getStoredPhoto(PHOTO_KEYS.savoir);
          if (!raw) return [];
          try { return JSON.parse(raw); } catch { return []; }
        })();
        const arr = current.slice();
        dataUrls.forEach((u, i) => { arr[i] = u; });
        setStoredPhoto(PHOTO_KEYS.savoir, JSON.stringify(arr));
        savoirImgs.forEach((img, i) => { if (arr[i]) img.src = arr[i]; });
      }

      setTimeout(() => {
        initRevealOnLoad();
      }, 50);
    });
  });

  const resetBtn = panel.querySelector('#photoReset');
  resetBtn?.addEventListener('click', () => {
    Object.values(PHOTO_KEYS).forEach((k) => {
      try { localStorage.removeItem(k); } catch {}
    });
    panel.remove();
    fileInput.remove();
    location.reload();
  });
}

/* ─── 22. INITIALISATION PRINCIPALE ──────────────────────── */
function init() {
  initPhotoManager();     // 0. Gestionnaire photos (propriétaire)
  initLoader();            // 1. Loader écran

  initCursor();            // 2. Curseur personnalisé
  initHeader();            // 3. Header scroll + nav active
  initMobileMenu();        // 4. Hamburger mobile
  initSearch();            // 5. Barre de recherche
  initSmoothScroll();      // 6. Scroll doux ancres
  initHeroParallax();      // 7. Parallaxe hero
  renderProducts('all');   // 8. Produits initial
  initFilters();           // 9. Filtres catégories

  // Le dropdown catalogue a été supprimé côté HTML.
  // Rien à initialiser ici : on garde uniquement les filtres boutons (#filters).

  initRevealObserver();    // 10. Animations reveal
  initForm();              // 11. Formulaire devis WA
  initStickyCTA();         // 12. CTA sticky mobile
  initTicker();            // 13. Ticker pause hover
  initCounters();          // 14. Compteurs animés
  initBackToTop();         // 15. Bouton retour haut
  initMicroInteractions(); // 16. Ripple boutons
  initLazyLoad();          // 17. Lazy load fallback
  initAccordions();        // 18. Accordéons (si présents)

  console.info('%c✦ Soukare Textile  — Site initialisé', 'color:#C69B3C;font-weight:600;');
}

/* ─── DOM READY ──────────────────────────────────────────── */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
