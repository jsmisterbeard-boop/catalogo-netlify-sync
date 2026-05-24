const STORAGE_KEY = 'catalogo_site_editavel_v4';
const ACCESS_METRICS_KEY = 'catalogo_access_metrics_v1';
const API_URL = '/.netlify/functions/catalog-sync';
const DEFAULT_ADMIN = {
  user: 'admin',
  password: 'admin123',
};
const DEFAULT_CONFIG = {
  brandName: 'Radar de Preços',
  topbarText: 'Catálogo de Preços • Abril 2026',
  heroEyebrow: 'Sua loja',
  heroTitleMain: 'Radar de Preços',
  heroTitleHighlight: '',
  heroText: 'Preços atualizados em tempo real dos melhores fornecedores.',
  radarTabLabel: 'Radar de Preços',
  badges: [],
  heroCardLabel: 'Condições de pagamento',
  heroCardTitle: 'Tudo sob encomenda • Pagamento seguro',
  heroCardText: '💚 PIX à vista • 💳 Cartão em até 12x • 🤝 Atendimento personalizado',
  footerNote: '⚠️ Todos os produtos são vendidos sob encomenda. Preços sujeitos a alteração sem aviso prévio.',
  statProductsLabel: 'Itens publicados no catálogo',
  statAdminTitle: 'Painel interno',
  statAdminText: 'Edite textos, cores, preços, login e conteúdo',
  statExportTitle: 'Excel + backup',
  statExportText: 'Baixe tabela de preços e cópia completa do site',
  productCornerText: '',
  whatsappNumber: '5514991299311',
  whatsappMessage: 'Olá! Vim pelo catálogo e gostaria de mais informações.',
  bg: '#f6f3ee',
  bgSoft: '#fbfaf8',
  surfaceStrong: '#ffffff',
  primary: '#c9ab7c',
  accent: '#d9e8df',
  text: '#222832',
  muted: '#8e8a82',
  card: '#ffffff',
  cardBackground: '#ffffff',
  cardBorderColor: '#ece4d8',
  cardTextColor: '#222832',
  noticeColor: '#b4863c',
  panelBgColor: '#f6f3ee',
  panelCardBgColor: '#ffffff',
  panelTitleColor: '#1f2732',
  panelTextColor: '#5f625f',
  panelLabelColor: '#33404d',
  panelInputTextColor: '#25303c',
  panelInputBgColor: '#fffdf9',
  panelInputBorderColor: '#d8ccb9',
  panelPlaceholderColor: '#a0978a',
  dialogBgColor: '#ffffff',
  dialogTextColor: '#222832',
  dialogMutedColor: '#8e8a82',
  dialogPriceColor: '#c9ab7c',
  pageBackground: '',
  customCss: '',
  showMetrics: true,
  metricProductsLabel: 'Itens publicados no catálogo',
  metricCategoriesLabel: 'Categorias ativas',
  metricPriceRangeLabel: 'Faixa de preço',
  metricAvgPriceLabel: 'Ticket médio',
};

const state = {
  products: [],
  filtered: [],
  category: 'Todos',
  storage: '',
  condition: 'Todas condições',
  query: '',
  sort: 'price-asc',
  activeTab: 'radar',
  config: { ...DEFAULT_CONFIG },
  adminLogged: false,
  editingProductId: '',
  adminCredentials: { user: '', password: '' },
  syncEnabled: false,
  lastOpenedProduct: null,
  adminMetrics: null,
};

const els = {
  grid: document.getElementById('productGrid'),
  empty: document.getElementById('emptyState'),
  chips: document.getElementById('categoryChips'),
  count: document.getElementById('resultsCount'),
  statProducts: document.getElementById('statProducts'),
  resultsTitle: document.getElementById('resultsTitle'),
  toolbarNotice: document.getElementById('toolbarNotice'),
  search: document.getElementById('searchInput'),
  categorySelect: document.getElementById('categorySelect'),
  storageSelect: document.getElementById('storageSelect'),
  conditionSelect: document.getElementById('conditionSelect'),
  sort: document.getElementById('sortSelect'),
  resetFilters: document.getElementById('resetFilters'),
  dialog: document.getElementById('productDialog'),
  dialogContent: document.getElementById('dialogContent'),
  closeDialog: document.getElementById('closeDialog'),
  shareButton: document.getElementById('shareButton'),
  radarTab: document.getElementById('radarTab'),
  floatingWhatsapp: document.getElementById('floatingWhatsapp'),
  openFilters: document.getElementById('openFilters'),
  openAdminPanel: document.getElementById('openAdminPanel'),
  closeAdminPanel: document.getElementById('closeAdminPanel'),
  adminDrawer: document.getElementById('adminDrawer'),
  adminOverlay: document.getElementById('adminOverlay'),
  adminLoginSection: document.getElementById('adminLoginSection'),
  adminPanelSection: document.getElementById('adminPanelSection'),
  loginForm: document.getElementById('loginForm'),
  loginUser: document.getElementById('loginUser'),
  loginPassword: document.getElementById('loginPassword'),
  loginStatus: document.getElementById('loginStatus'),
  forgotPasswordBtn: document.getElementById('forgotPasswordBtn'),
  recoveryPanel: document.getElementById('recoveryPanel'),
  recoveryCode: document.getElementById('recoveryCode'),
  recoveryUser: document.getElementById('recoveryUser'),
  recoveryPassword: document.getElementById('recoveryPassword'),
  confirmRecoveryBtn: document.getElementById('confirmRecoveryBtn'),
  cancelRecoveryBtn: document.getElementById('cancelRecoveryBtn'),
  logoutAdmin: document.getElementById('logoutAdmin'),
  heroEyebrow: document.getElementById('heroEyebrow'),
  heroTitleMain: document.getElementById('heroTitleMain'),
  heroTitleHighlight: document.getElementById('heroTitleHighlight'),
  heroText: document.getElementById('heroText'),
  heroBadges: document.getElementById('heroBadges'),
  heroCardLabel: document.getElementById('heroCardLabel'),
  heroCardTitle: document.getElementById('heroCardTitle'),
  heroCardText: document.getElementById('heroCardText'),
  footerNote: document.getElementById('footerNote'),
  topbarText: document.getElementById('topbarText'),
  statProductsLabel: document.getElementById('statProductsLabel'),
  statAdminTitle: document.getElementById('statAdminTitle'),
  statAdminText: document.getElementById('statAdminText'),
  statExportTitle: document.getElementById('statExportTitle'),
  statExportText: document.getElementById('statExportText'),
  heroWhatsappButton: document.getElementById('heroWhatsappButton'),
  scrollAdminHint: document.getElementById('scrollAdminHint'),
  exportExcel: document.getElementById('exportExcel'),
  exportBackup: document.getElementById('exportBackup'),
  importBackupInput: document.getElementById('importBackupInput'),
  adminProductsList: document.getElementById('adminProductsList'),
  newProductBtn: document.getElementById('newProductBtn'),
  saveProduct: document.getElementById('saveProduct'),
  clearProductForm: document.getElementById('clearProductForm'),
  productFormTitle: document.getElementById('productFormTitle'),
  productStatus: document.getElementById('productStatus'),
  layoutStatus: document.getElementById('layoutStatus'),
  securityStatus: document.getElementById('securityStatus'),
  customCssHook: document.getElementById('customCssHook'),
  refreshAdminMetrics: document.getElementById('refreshAdminMetrics'),
  adminMetricTotalAccesses: document.getElementById('adminMetricTotalAccesses'),
  adminMetricTopProduct: document.getElementById('adminMetricTopProduct'),
  adminMetricTopProductDetail: document.getElementById('adminMetricTopProductDetail'),
  adminMetricTopHour: document.getElementById('adminMetricTopHour'),
  adminMetricTopHourDetail: document.getElementById('adminMetricTopHourDetail'),
  adminMetricsUpdatedAt: document.getElementById('adminMetricsUpdatedAt'),
};

const formEls = {
  brandName: document.getElementById('cfgBrandName'),
  topbarText: document.getElementById('cfgTopbarText'),
  heroEyebrow: document.getElementById('cfgHeroEyebrow'),
  heroTitleMain: document.getElementById('cfgHeroTitleMain'),
  heroTitleHighlight: document.getElementById('cfgHeroTitleHighlight'),
  heroText: document.getElementById('cfgHeroText'),
  radarTabLabel: document.getElementById('cfgRadarTabLabel'),
  badge1: document.getElementById('cfgBadge1'),
  badge2: document.getElementById('cfgBadge2'),
  badge3: document.getElementById('cfgBadge3'),
  heroCardTitle: document.getElementById('cfgHeroCardTitle'),
  heroCardText: document.getElementById('cfgHeroCardText'),
  footerNote: document.getElementById('cfgFooterNote'),
  whatsappNumber: document.getElementById('cfgWhatsappNumber'),
  whatsappMessage: document.getElementById('cfgWhatsappMessage'),
  statAdminTitle: document.getElementById('cfgStatAdminTitle'),
  statAdminText: document.getElementById('cfgStatAdminText'),
  statExportTitle: document.getElementById('cfgStatExportTitle'),
  statExportText: document.getElementById('cfgStatExportText'),
  productCornerText: document.getElementById('cfgProductCornerText'),
  bg: document.getElementById('cfgBg'),
  bgSoft: document.getElementById('cfgBgSoft'),
  surfaceStrong: document.getElementById('cfgSurfaceStrong'),
  primary: document.getElementById('cfgPrimary'),
  accent: document.getElementById('cfgAccent'),
  text: document.getElementById('cfgText'),
  muted: document.getElementById('cfgMuted'),
  card: document.getElementById('cfgCard'),
  cardBackground: document.getElementById('cfgCardBackground'),
  cardBorderColor: document.getElementById('cfgCardBorderColor'),
  cardTextColor: document.getElementById('cfgCardTextColor'),
  noticeColor: document.getElementById('cfgNoticeColor'),
  panelBgColor: document.getElementById('cfgPanelBgColor'),
  panelCardBgColor: document.getElementById('cfgPanelCardBgColor'),
  panelTitleColor: document.getElementById('cfgPanelTitleColor'),
  panelTextColor: document.getElementById('cfgPanelTextColor'),
  panelLabelColor: document.getElementById('cfgPanelLabelColor'),
  panelInputTextColor: document.getElementById('cfgPanelInputTextColor'),
  panelInputBgColor: document.getElementById('cfgPanelInputBgColor'),
  panelInputBorderColor: document.getElementById('cfgPanelInputBorderColor'),
  panelPlaceholderColor: document.getElementById('cfgPanelPlaceholderColor'),
  dialogBgColor: document.getElementById('cfgDialogBgColor'),
  dialogTextColor: document.getElementById('cfgDialogTextColor'),
  dialogMutedColor: document.getElementById('cfgDialogMutedColor'),
  dialogPriceColor: document.getElementById('cfgDialogPriceColor'),
  pageBackground: document.getElementById('cfgPageBackground'),
  customCss: document.getElementById('cfgCustomCss'),
  adminUser: document.getElementById('cfgAdminUser'),
  adminPassword: document.getElementById('cfgAdminPassword'),
};

const productFormEls = {
  id: document.getElementById('productId'),
  name: document.getElementById('productName'),
  category: document.getElementById('productCategory'),
  section: document.getElementById('productSection'),
  emoji: document.getElementById('productEmoji'),
  storage: document.getElementById('productStorage'),
  installment: document.getElementById('productInstallment'),
  pixPrice: document.getElementById('productPixPrice'),
  pixValue: document.getElementById('productPixValue'),
  tags: document.getElementById('productTags'),
  notes: document.getElementById('productNotes'),
};

const tabs = Array.from(document.querySelectorAll('.admin-tab'));
const tabContents = Array.from(document.querySelectorAll('.admin-tab-content'));

const formatCount = (n) => `Mostrando ${n} de ${state.products.length} produtos`;
const categories = (products) => ['Todos', ...new Set(products.map((p) => p.category).filter(Boolean))];
const storages = (products) => [...new Set(products.map((p) => normalizeText(p.storage)).filter(Boolean))];
const conditions = (products) => ['Todas condições', ...new Set(products.flatMap((p) => (p.tags || []).map((tag) => normalizeText(tag))).filter(Boolean))];

function normalizeText(value) {
  return String(value || '').trim();
}

function createId(prefix = 'produto') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function priceNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatPixCurrencyNoCents(value) {
  const numeric = Math.round(priceNumber(value));
  return numeric > 0 ? `R$ ${numeric.toLocaleString('pt-BR')}` : '';
}

function ensurePixPriceLabel(value, fallbackValue = 0) {
  const text = normalizeText(value);
  if (text) {
    const cleanText = text.replace(/^r\$\s*/i, '').trim();
    const normalizedNumber = cleanText.replace(/\./g, '').replace(',', '.');

    if (/^\d+(?:[.,]\d{1,2})?$/.test(cleanText)) {
      return formatPixCurrencyNoCents(normalizedNumber);
    }

    const textWithoutZeroCents = cleanText.replace(/([,.]00)\b/g, '').trim();
    return `R$ ${textWithoutZeroCents}`;
  }

  return formatPixCurrencyNoCents(fallbackValue);
}

function formatWhatsappProductText(product) {
  if (!product) return '';
  const price = normalizeText(product.pixPrice) || formatPixCurrencyNoCents(product.pixValue);
  if (price) return `Produto: ${product.name}. Preço anunciado: ${price}.`;
  return `Produto: ${product.name}.`;
}

function getWhatsappReferenceProduct(product) {
  return product || state.lastOpenedProduct || state.filtered[0] || state.products[0] || null;
}

function whatsappLink(product) {
  const referenceProduct = getWhatsappReferenceProduct(product);
  const msg = [
    'Olá! Vim pelo catálogo.',
    formatWhatsappProductText(referenceProduct),
    state.config.whatsappMessage,
  ].filter(Boolean).join(' ');
  return `https://wa.me/${state.config.whatsappNumber}?text=${encodeURIComponent(msg)}`;
}

function sanitizePublicConfig(config = {}) {
  const { adminUser, adminPassword, ...publicConfig } = config || {};
  return publicConfig;
}

function persist() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      config: sanitizePublicConfig(state.config),
      products: state.products,
    })
  );
}

function readPersistedData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function buildEmptyAccessMetrics() {
  return {
    totalAccesses: 0,
    products: {},
    hours: {},
    updatedAt: '',
  };
}

function readLocalAccessMetrics() {
  try {
    const raw = localStorage.getItem(ACCESS_METRICS_KEY);
    if (!raw) return buildEmptyAccessMetrics();
    const parsed = JSON.parse(raw);
    return {
      ...buildEmptyAccessMetrics(),
      ...parsed,
      products: parsed?.products && typeof parsed.products === 'object' ? parsed.products : {},
      hours: parsed?.hours && typeof parsed.hours === 'object' ? parsed.hours : {},
    };
  } catch {
    return buildEmptyAccessMetrics();
  }
}

function persistAccessMetrics(metrics) {
  try {
    localStorage.setItem(ACCESS_METRICS_KEY, JSON.stringify(metrics));
  } catch {}
}

function nextAccessMetrics(metrics = buildEmptyAccessMetrics(), product = {}, occurredAt = new Date().toISOString(), hourKey = '00') {
  const next = {
    ...buildEmptyAccessMetrics(),
    ...metrics,
    products: { ...(metrics?.products || {}) },
    hours: { ...(metrics?.hours || {}) },
  };

  const productId = normalizeText(product.id);
  if (productId) {
    const currentProduct = next.products[productId] || {
      id: productId,
      name: normalizeText(product.name) || 'Produto',
      count: 0,
      lastAccessAt: '',
    };
    next.products[productId] = {
      ...currentProduct,
      name: normalizeText(product.name) || currentProduct.name || 'Produto',
      count: Number(currentProduct.count || 0) + 1,
      lastAccessAt: occurredAt,
    };
  }

  const safeHourKey = String(hourKey || '00').padStart(2, '0').slice(0, 2);
  next.hours[safeHourKey] = Number(next.hours[safeHourKey] || 0) + 1;
  next.totalAccesses = Number(next.totalAccesses || 0) + 1;
  next.updatedAt = occurredAt;
  return next;
}

function formatHourLabel(hourKey = '00') {
  const hour = String(hourKey || '00').padStart(2, '0').slice(0, 2);
  return `${hour}:00`;
}

function getTopProductMetric(metrics = buildEmptyAccessMetrics()) {
  const entries = Object.values(metrics.products || {});
  if (!entries.length) return null;
  return entries.sort((a, b) => Number(b.count || 0) - Number(a.count || 0))[0];
}

function getTopHourMetric(metrics = buildEmptyAccessMetrics()) {
  const entries = Object.entries(metrics.hours || {});
  if (!entries.length) return null;
  const [hour, count] = entries.sort((a, b) => Number(b[1] || 0) - Number(a[1] || 0))[0];
  return { hour, count: Number(count || 0) };
}

function renderAdminMetrics(metrics = state.adminMetrics || readLocalAccessMetrics()) {
  const safeMetrics = {
    ...buildEmptyAccessMetrics(),
    ...metrics,
    products: metrics?.products || {},
    hours: metrics?.hours || {},
  };
  const topProduct = getTopProductMetric(safeMetrics);
  const topHour = getTopHourMetric(safeMetrics);

  if (els.adminMetricTotalAccesses) {
    els.adminMetricTotalAccesses.textContent = String(Number(safeMetrics.totalAccesses || 0));
  }

  if (els.adminMetricTopProduct) {
    els.adminMetricTopProduct.textContent = topProduct?.name || 'Sem dados';
  }

  if (els.adminMetricTopProductDetail) {
    els.adminMetricTopProductDetail.textContent = topProduct
      ? `${Number(topProduct.count || 0)} acessos registrados`
      : 'Nenhum acesso registrado ainda.';
  }

  if (els.adminMetricTopHour) {
    els.adminMetricTopHour.textContent = topHour ? formatHourLabel(topHour.hour) : 'Sem dados';
  }

  if (els.adminMetricTopHourDetail) {
    els.adminMetricTopHourDetail.textContent = topHour
      ? `${Number(topHour.count || 0)} acessos nesse horário`
      : 'Nenhum acesso registrado ainda.';
  }

  if (els.adminMetricsUpdatedAt) {
    els.adminMetricsUpdatedAt.textContent = safeMetrics.updatedAt
      ? `Última atualização: ${new Date(safeMetrics.updatedAt).toLocaleString('pt-BR')}`
      : 'Ainda não há acessos suficientes para exibir métricas.';
  }
}

async function loadAdminMetrics() {
  if (!hasAdminCredentials()) {
    state.adminMetrics = buildEmptyAccessMetrics();
    renderAdminMetrics(state.adminMetrics);
    return;
  }

  try {
    const response = await callCatalogApi('getMetrics', {
      credentials: state.adminCredentials,
    });
    state.adminMetrics = {
      ...buildEmptyAccessMetrics(),
      ...(response?.metrics || {}),
      products: response?.metrics?.products || {},
      hours: response?.metrics?.hours || {},
    };
    persistAccessMetrics(state.adminMetrics);
  } catch {
    state.adminMetrics = readLocalAccessMetrics();
  }

  renderAdminMetrics(state.adminMetrics);
}

async function trackProductAccess(product) {
  const productId = normalizeText(product?.id);
  if (!productId) return;

  const now = new Date();
  const occurredAt = now.toISOString();
  const hourKey = String(now.getHours()).padStart(2, '0');

  const localMetrics = nextAccessMetrics(readLocalAccessMetrics(), {
    id: productId,
    name: normalizeText(product?.name) || 'Produto',
  }, occurredAt, hourKey);

  persistAccessMetrics(localMetrics);

  if (state.adminLogged) {
    state.adminMetrics = localMetrics;
    renderAdminMetrics(state.adminMetrics);
  }

  try {
    const response = await callCatalogApi('trackAccess', {
      product: {
        id: productId,
        name: normalizeText(product?.name) || 'Produto',
      },
      occurredAt,
      hourKey,
    });

    if (response?.metrics) {
      state.adminMetrics = {
        ...buildEmptyAccessMetrics(),
        ...response.metrics,
        products: response.metrics.products || {},
        hours: response.metrics.hours || {},
      };
      persistAccessMetrics(state.adminMetrics);
      if (state.adminLogged) renderAdminMetrics(state.adminMetrics);
    }
  } catch {}
}

function hasAdminCredentials() {
  return Boolean(normalizeText(state.adminCredentials.user) && normalizeText(state.adminCredentials.password));
}

function setAdminCredentials(user = '', password = '') {
  state.adminCredentials = {
    user: normalizeText(user),
    password: normalizeText(password),
  };
}

function setStatusMessage(element, message, isError = false, timeout = 2200) {
  if (!element) return;
  element.textContent = message;
  element.style.color = isError ? '#b42318' : '';
  if (timeout > 0) {
    window.setTimeout(() => {
      if (element.textContent === message) {
        element.textContent = '';
        element.style.color = '';
      }
    }, timeout);
  }
}

async function fetchDefaultProducts() {
  const response = await fetch('./data/products.json', { cache: 'no-store' });
  return response.json();
}

async function callCatalogApi(action = '', payload = {}) {
  const options = {
    method: action ? 'POST' : 'GET',
    headers: action ? { 'Content-Type': 'application/json' } : {},
    cache: 'no-store',
  };

  if (action) {
    options.body = JSON.stringify({ action, ...payload });
  }

  const response = await fetch(API_URL, options);
  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.message || 'Não foi possível concluir a sincronização.');
  }

  return data;
}

function getRemotePayload() {
  return {
    config: sanitizePublicConfig(state.config),
    products: state.products,
  };
}

async function syncCurrentState(element, successMessage) {
  persist();

  if (!hasAdminCredentials()) {
    setStatusMessage(element, 'Alteração salva localmente. Faça login no admin para sincronizar com outros dispositivos.', true, 3200);
    return false;
  }

  try {
    await callCatalogApi('save', {
      credentials: state.adminCredentials,
      data: getRemotePayload(),
    });
    state.syncEnabled = true;
    persist();
    setStatusMessage(element, successMessage);
    return true;
  } catch (error) {
    state.syncEnabled = false;
    const message = error instanceof Error ? error.message : 'Falha ao sincronizar.';
    setStatusMessage(element, `${message} As alterações continuam salvas neste navegador.`, true, 3600);
    return false;
  }
}

async function loadInitialData() {
  const persisted = readPersistedData();

  try {
    const remote = await callCatalogApi();
    state.syncEnabled = true;
    state.config = { ...DEFAULT_CONFIG, ...sanitizePublicConfig(remote?.config || {}) };
    if (state.config.productCornerText === 'Pagamento 100% antecipado') {
      state.config.productCornerText = DEFAULT_CONFIG.productCornerText;
    }
    if (Array.isArray(remote?.products) && remote.products.length) {
      state.products = remote.products;
    } else {
      state.products = await fetchDefaultProducts();
    }
    persist();
  } catch {
    state.syncEnabled = false;

    if (persisted?.config) {
      state.config = { ...DEFAULT_CONFIG, ...sanitizePublicConfig(persisted.config) };
      if (state.config.productCornerText === 'Pagamento 100% antecipado') {
        state.config.productCornerText = DEFAULT_CONFIG.productCornerText;
      }
    }

    if (Array.isArray(persisted?.products) && persisted.products.length) {
      state.products = persisted.products;
    } else {
      state.products = await fetchDefaultProducts();
      persist();
    }
  }

  state.filtered = [...state.products];
}

function buildPageBackground(config = state.config) {
  const customBackground = normalizeText(config.pageBackground);
  if (customBackground) return customBackground;
  return `radial-gradient(circle at top, color-mix(in srgb, ${config.accent} 18%, transparent), transparent 34%), linear-gradient(180deg, ${config.bg} 0%, ${config.bgSoft} 100%)`;
}

function applyTheme() {
  const root = document.documentElement;
  root.style.setProperty('--bg', state.config.bg);
  root.style.setProperty('--bg-soft', state.config.bgSoft);
  root.style.setProperty('--surface-strong', state.config.surfaceStrong);
  root.style.setProperty('--primary', state.config.primary);
  root.style.setProperty('--accent', state.config.accent);
  root.style.setProperty('--text', state.config.text);
  root.style.setProperty('--muted', state.config.muted);
  root.style.setProperty('--surface-card', state.config.card);
  root.style.setProperty('--product-card-bg', state.config.cardBackground || DEFAULT_CONFIG.cardBackground);
  root.style.setProperty('--product-card-border', state.config.cardBorderColor || DEFAULT_CONFIG.cardBorderColor);
  root.style.setProperty('--product-card-text', state.config.cardTextColor || DEFAULT_CONFIG.cardTextColor);
  root.style.setProperty('--payment-notice-color', state.config.noticeColor || DEFAULT_CONFIG.noticeColor);
  root.style.setProperty('--page-background', buildPageBackground(state.config));
  els.customCssHook.textContent = state.config.customCss || '';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', state.config.bg);
}

function renderBranding() {
  document.title = `${state.config.brandName} • Catálogo`;
  document.querySelector('meta[name="description"]')?.setAttribute(
    'content',
    `${state.config.brandName}: catálogo digital editável com painel administrativo.`
  );

  els.topbarText.textContent = state.config.topbarText;
  els.heroEyebrow.textContent = state.config.heroEyebrow;
  els.heroTitleMain.textContent = state.config.heroTitleMain;
  els.heroTitleHighlight.textContent = state.config.heroTitleHighlight;
  els.heroText.textContent = state.config.heroText;
  if (els.radarTab) els.radarTab.textContent = state.config.radarTabLabel || DEFAULT_CONFIG.radarTabLabel;
  if (els.heroCardLabel) els.heroCardLabel.textContent = state.config.heroCardLabel;
  if (els.heroCardTitle) els.heroCardTitle.textContent = state.config.heroCardTitle;
  if (els.heroCardText) els.heroCardText.textContent = state.config.heroCardText;
  if (els.footerNote) els.footerNote.textContent = state.config.footerNote;
  if (els.statProductsLabel) els.statProductsLabel.textContent = state.config.statProductsLabel;
  if (els.statAdminTitle) els.statAdminTitle.textContent = state.config.statAdminTitle;
  if (els.statAdminText) els.statAdminText.textContent = state.config.statAdminText;
  if (els.statExportTitle) els.statExportTitle.textContent = state.config.statExportTitle;
  if (els.statExportText) els.statExportText.textContent = state.config.statExportText;
  if (els.toolbarNotice) {
    els.toolbarNotice.textContent = state.config.productCornerText || '';
    els.toolbarNotice.classList.toggle('hidden', !normalizeText(state.config.productCornerText));
  }

  els.heroBadges.innerHTML = '';
  (state.config.badges || []).filter(Boolean).forEach((badge) => {
    const span = document.createElement('span');
    span.className = 'badge badge-light';
    span.textContent = badge;
    els.heroBadges.appendChild(span);
  });
}

function populateForms() {
  formEls.brandName.value = state.config.brandName;
  formEls.topbarText.value = state.config.topbarText;
  formEls.heroEyebrow.value = state.config.heroEyebrow;
  formEls.heroTitleMain.value = state.config.heroTitleMain;
  formEls.heroTitleHighlight.value = state.config.heroTitleHighlight;
  formEls.heroText.value = state.config.heroText;
  formEls.radarTabLabel.value = state.config.radarTabLabel || DEFAULT_CONFIG.radarTabLabel;
  formEls.footerNote.value = state.config.footerNote;
  formEls.whatsappNumber.value = state.config.whatsappNumber;
  formEls.whatsappMessage.value = state.config.whatsappMessage;
  formEls.productCornerText.value = state.config.productCornerText || DEFAULT_CONFIG.productCornerText;
  formEls.bg.value = state.config.bg;
  formEls.bgSoft.value = state.config.bgSoft;
  formEls.surfaceStrong.value = state.config.surfaceStrong;
  formEls.primary.value = state.config.primary;
  formEls.accent.value = state.config.accent;
  formEls.text.value = state.config.text;
  formEls.muted.value = state.config.muted;
  formEls.card.value = state.config.card;
  formEls.cardBackground.value = state.config.cardBackground || DEFAULT_CONFIG.cardBackground;
  formEls.cardBorderColor.value = state.config.cardBorderColor || DEFAULT_CONFIG.cardBorderColor;
  formEls.cardTextColor.value = state.config.cardTextColor || DEFAULT_CONFIG.cardTextColor;
  formEls.noticeColor.value = state.config.noticeColor || DEFAULT_CONFIG.noticeColor;
  formEls.panelBgColor.value = state.config.panelBgColor || DEFAULT_CONFIG.panelBgColor;
  formEls.panelCardBgColor.value = state.config.panelCardBgColor || DEFAULT_CONFIG.panelCardBgColor;
  formEls.panelTitleColor.value = state.config.panelTitleColor || DEFAULT_CONFIG.panelTitleColor;
  formEls.panelTextColor.value = state.config.panelTextColor || DEFAULT_CONFIG.panelTextColor;
  formEls.panelLabelColor.value = state.config.panelLabelColor || DEFAULT_CONFIG.panelLabelColor;
  formEls.panelInputTextColor.value = state.config.panelInputTextColor || DEFAULT_CONFIG.panelInputTextColor;
  formEls.panelInputBgColor.value = state.config.panelInputBgColor || DEFAULT_CONFIG.panelInputBgColor;
  formEls.panelInputBorderColor.value = state.config.panelInputBorderColor || DEFAULT_CONFIG.panelInputBorderColor;
  formEls.panelPlaceholderColor.value = state.config.panelPlaceholderColor || DEFAULT_CONFIG.panelPlaceholderColor;
  formEls.dialogBgColor.value = state.config.dialogBgColor || DEFAULT_CONFIG.dialogBgColor;
  formEls.dialogTextColor.value = state.config.dialogTextColor || DEFAULT_CONFIG.dialogTextColor;
  formEls.dialogMutedColor.value = state.config.dialogMutedColor || DEFAULT_CONFIG.dialogMutedColor;
  formEls.dialogPriceColor.value = state.config.dialogPriceColor || DEFAULT_CONFIG.dialogPriceColor;
  formEls.pageBackground.value = state.config.pageBackground || '';
  formEls.customCss.value = state.config.customCss || '';
  formEls.adminUser.value = '';
  formEls.adminPassword.value = '';
  formEls.adminUser.placeholder = 'Novo usuário do admin';
  formEls.adminPassword.placeholder = 'Nova senha do admin';
}

function getDraftConfig() {
  return {
    ...state.config,
    brandName: normalizeText(formEls.brandName.value) || DEFAULT_CONFIG.brandName,
    topbarText: normalizeText(formEls.topbarText.value) || DEFAULT_CONFIG.topbarText,
    heroEyebrow: normalizeText(formEls.heroEyebrow.value) || DEFAULT_CONFIG.heroEyebrow,
    heroTitleMain: normalizeText(formEls.heroTitleMain.value) || DEFAULT_CONFIG.heroTitleMain,
    heroTitleHighlight: normalizeText(formEls.heroTitleHighlight.value) || DEFAULT_CONFIG.heroTitleHighlight,
    heroText: normalizeText(formEls.heroText.value) || DEFAULT_CONFIG.heroText,
    radarTabLabel: normalizeText(formEls.radarTabLabel.value) || DEFAULT_CONFIG.radarTabLabel,
    footerNote: normalizeText(formEls.footerNote.value) || DEFAULT_CONFIG.footerNote,
    whatsappNumber: normalizeText(formEls.whatsappNumber.value) || DEFAULT_CONFIG.whatsappNumber,
    whatsappMessage: normalizeText(formEls.whatsappMessage.value) || DEFAULT_CONFIG.whatsappMessage,
    productCornerText: normalizeText(formEls.productCornerText.value) || DEFAULT_CONFIG.productCornerText,
    bg: formEls.bg.value || DEFAULT_CONFIG.bg,
    bgSoft: formEls.bgSoft.value || DEFAULT_CONFIG.bgSoft,
    surfaceStrong: formEls.surfaceStrong.value || DEFAULT_CONFIG.surfaceStrong,
    primary: formEls.primary.value || DEFAULT_CONFIG.primary,
    accent: formEls.accent.value || DEFAULT_CONFIG.accent,
    text: formEls.text.value || DEFAULT_CONFIG.text,
    muted: formEls.muted.value || DEFAULT_CONFIG.muted,
    card: formEls.card.value || DEFAULT_CONFIG.card,
    cardBackground: formEls.cardBackground.value || DEFAULT_CONFIG.cardBackground,
    cardBorderColor: formEls.cardBorderColor.value || DEFAULT_CONFIG.cardBorderColor,
    cardTextColor: formEls.cardTextColor.value || DEFAULT_CONFIG.cardTextColor,
    noticeColor: formEls.noticeColor.value || DEFAULT_CONFIG.noticeColor,
    panelBgColor: formEls.panelBgColor.value || DEFAULT_CONFIG.panelBgColor,
    panelCardBgColor: formEls.panelCardBgColor.value || DEFAULT_CONFIG.panelCardBgColor,
    panelTitleColor: formEls.panelTitleColor.value || DEFAULT_CONFIG.panelTitleColor,
    panelTextColor: formEls.panelTextColor.value || DEFAULT_CONFIG.panelTextColor,
    panelLabelColor: formEls.panelLabelColor.value || DEFAULT_CONFIG.panelLabelColor,
    panelInputTextColor: formEls.panelInputTextColor.value || DEFAULT_CONFIG.panelInputTextColor,
    panelInputBgColor: formEls.panelInputBgColor.value || DEFAULT_CONFIG.panelInputBgColor,
    panelInputBorderColor: formEls.panelInputBorderColor.value || DEFAULT_CONFIG.panelInputBorderColor,
    panelPlaceholderColor: formEls.panelPlaceholderColor.value || DEFAULT_CONFIG.panelPlaceholderColor,
    dialogBgColor: formEls.dialogBgColor.value || DEFAULT_CONFIG.dialogBgColor,
    dialogTextColor: formEls.dialogTextColor.value || DEFAULT_CONFIG.dialogTextColor,
    dialogMutedColor: formEls.dialogMutedColor.value || DEFAULT_CONFIG.dialogMutedColor,
    dialogPriceColor: formEls.dialogPriceColor.value || DEFAULT_CONFIG.dialogPriceColor,
    pageBackground: formEls.pageBackground.value || '',
    customCss: formEls.customCss.value || '',
  };
}

function applyDraftPreview() {
  const previewConfig = getDraftConfig();
  const current = state.config;
  state.config = previewConfig;
  applyTheme();
  renderBranding();
  renderProducts();
  state.config = current;
}

async function saveLayout() {
  state.config = getDraftConfig();
  applyTheme();
  renderBranding();
  renderProducts();
  await syncCurrentState(els.layoutStatus, 'Layout salvo e sincronizado entre dispositivos.');
}

async function resetLayout() {
  state.config = { ...DEFAULT_CONFIG, products: undefined };
  delete state.config.products;
  populateForms();
  applyTheme();
  renderBranding();
  renderProducts();
  await syncCurrentState(els.layoutStatus, 'Layout padrão restaurado e sincronizado.');
}

function buildChips() {
  els.chips.innerHTML = '';
  categories(state.products).forEach((category) => {
    const btn = document.createElement('button');
    btn.className = `chip ${state.category === category ? 'active' : ''}`;
    btn.type = 'button';
    btn.textContent = category;
    btn.addEventListener('click', () => {
      state.category = category;
      if (els.categorySelect) els.categorySelect.value = category;
      buildChips();
      applyFilters();
    });
    els.chips.appendChild(btn);
  });
}

function fillSelectOptions(select, values, currentValue) {
  if (!select) return;
  select.innerHTML = values.map((value) => `<option value="${value}">${value}</option>`).join('');
  select.value = values.includes(currentValue) ? currentValue : values[0];
}

function buildFilterControls() {
  fillSelectOptions(els.categorySelect, categories(state.products), state.category);
  fillSelectOptions(els.storageSelect, [''].concat(storages(state.products)), state.storage);
  if (els.storageSelect?.options[0]) {
    els.storageSelect.options[0].textContent = 'Armazenamento';
  }
  fillSelectOptions(els.conditionSelect, conditions(state.products), state.condition);
}

function setTopTab(tab) {
  state.activeTab = 'radar';
  els.radarTab?.classList.toggle('is-active', true);
  if (els.resultsTitle) {
    els.resultsTitle.textContent = state.category === 'Todos' ? 'Radar de preços' : `Radar • ${state.category}`;
  }
}

function applyFilters() {
  const query = state.query.trim().toLowerCase();
  let list = [...state.products];

  if (state.category !== 'Todos') {
    list = list.filter((p) => p.category === state.category);
  }

  if (state.storage) {
    list = list.filter((p) => normalizeText(p.storage) === state.storage);
  }

  if (state.condition !== 'Todas condições') {
    list = list.filter((p) => (p.tags || []).map(normalizeText).includes(state.condition));
  }

  if (query) {
    list = list.filter((p) =>
      [p.name, p.category, p.section, p.storage, ...(p.tags || []), p.notes]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(query)
    );
  }

  switch (state.sort) {
    case 'price-desc':
      list.sort((a, b) => priceNumber(b.pixValue) - priceNumber(a.pixValue));
      break;
    case 'name':
      list.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
      break;
    case 'popular':
      list.sort((a, b) => (b.tags?.length || 0) - (a.tags?.length || 0) || priceNumber(a.pixValue) - priceNumber(b.pixValue));
      break;
    default:
      list.sort((a, b) => priceNumber(a.pixValue) - priceNumber(b.pixValue));
      break;
  }

  state.filtered = list;
  renderProducts();
}

function renderProducts() {
  els.grid.innerHTML = '';
  els.count.textContent = formatCount(state.filtered.length);
  els.resultsTitle.textContent = state.category === 'Todos' ? 'Radar de preços' : `Radar • ${state.category}`;
  els.empty.classList.toggle('hidden', state.filtered.length > 0);
  if (els.statProducts) els.statProducts.textContent = String(state.products.length);

  state.filtered.forEach((product) => {
    const card = document.createElement('article');
    const tagList = orderProductTags((product.tags || []).filter(Boolean));
    const detailChips = [product.storage, ...tagList]
      .filter(Boolean)
      .slice(0, 4)
      .map((tag) => {
        const highlight = /novo|lacrado|disponivel|disponível/i.test(String(tag));
        return `<span class="product-chip ${highlight ? 'is-highlight' : ''}">${tag}</span>`;
      })
      .join('');

    const statusLabel = tagList.find((tag) => /novo|lacrado|disponivel|disponível/i.test(String(tag))) || 'Sob encomenda';
    const summary = normalizeText(product.notes) || 'Catálogo atualizado';

    card.className = 'product-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Ver detalhes de ${product.name || 'produto'}`);

    card.innerHTML = `
      <div class="product-card-top">
        <div class="product-head-main">
          <div class="product-emoji">${product.emoji || '📦'}</div>
          <div class="product-head-copy">
            <h3 class="product-title">${product.name || 'Produto'}</h3>
            <p class="product-section">${product.section || product.category || ''}</p>
          </div>
        </div>
        <span class="category-pill">${product.category || 'Produto'}</span>
      </div>
      ${detailChips ? `<div class="product-detail-chips">${detailChips}</div>` : ''}
      <div>
        <p class="product-price">${product.pixPrice || 'Consulte'}</p>
        <p class="product-installment">${product.installment || 'Consulte condições de pagamento'}</p>
      </div>
      <div class="product-card-meta-row">
        <p class="product-meta">${summary}</p>
        <p class="product-age">${statusLabel}</p>
      </div>
      <div class="product-card-footer">Toque para ver detalhes e contato</div>
    `;

    const openDetails = () => openDialog(product);
    card.addEventListener('click', openDetails);
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openDetails();
      }
    });

    els.grid.appendChild(card);
  });
}

function openDialog(product) {
  state.lastOpenedProduct = product || null;
  void trackProductAccess(product);
  els.dialogContent.innerHTML = `
    <div class="dialog-head">
      <div class="dialog-emoji">${product.emoji || '📦'}</div>
      <div>
        <span class="category-pill">${product.category || 'Categoria'}</span>
        <h3 class="dialog-title">${product.name || 'Produto'}</h3>
        <p class="dialog-meta">${product.section || product.category || ''}</p>
        <p class="dialog-price">${product.pixPrice || 'Consulte'}</p>
        <p class="product-installment">${product.installment || 'Parcelamento sob consulta'}</p>
      </div>
    </div>
    <div class="dialog-tags">
      ${(product.tags || []).map((tag) => `<span class="badge badge-light">${tag}</span>`).join('')}
    </div>
    <p class="dialog-note">${product.notes || 'Produto vendido sob encomenda.'}</p>
    <p class="dialog-note"><strong>Armazenamento:</strong> ${product.storage || 'Consulte opções disponíveis'}</p>
    <div class="dialog-actions">
      <a class="btn btn-primary" href="${whatsappLink(product)}" target="_blank" rel="noopener">Falar no WhatsApp</a>
      <button class="btn btn-secondary" type="button" id="copyProductName">Copiar nome do produto</button>
    </div>
  `;
  els.dialog.showModal();
  document.getElementById('copyProductName')?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(product.name || 'Produto');
      const btn = document.getElementById('copyProductName');
      if (btn) {
        btn.textContent = 'Copiado';
        setTimeout(() => { btn.textContent = 'Copiar nome do produto'; }, 1200);
      }
    } catch {}
  });
}

function openAdmin() {
  els.adminDrawer.classList.add('open');
  els.adminDrawer.setAttribute('aria-hidden', 'false');
  els.adminOverlay.classList.remove('hidden');
}

function closeAdmin() {
  els.adminDrawer.classList.remove('open');
  els.adminDrawer.setAttribute('aria-hidden', 'true');
  els.adminOverlay.classList.add('hidden');
}

function resetRecoveryForm() {
  if (els.recoveryCode) els.recoveryCode.value = '';
  if (els.recoveryUser) els.recoveryUser.value = DEFAULT_ADMIN.user;
  if (els.recoveryPassword) els.recoveryPassword.value = '';
}

function toggleRecoveryPanel(visible) {
  els.recoveryPanel?.classList.toggle('hidden', !visible);
  if (!visible) resetRecoveryForm();
}

function setAdminLogged(logged) {
  state.adminLogged = logged;
  els.adminLoginSection.classList.toggle('hidden', logged);
  els.adminPanelSection.classList.toggle('hidden', !logged);
  els.loginStatus.textContent = '';
  toggleRecoveryPanel(false);

  if (logged) {
    loadAdminMetrics();
    return;
  }

  state.adminMetrics = buildEmptyAccessMetrics();
  renderAdminMetrics(state.adminMetrics);
  els.loginPassword.value = '';
  setAdminCredentials('', '');
}

function renderAdminProducts() {
  els.adminProductsList.innerHTML = '';

  if (!state.products.length) {
    els.adminProductsList.innerHTML = '<p>Nenhum produto cadastrado.</p>';
    return;
  }

  state.products
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
    .forEach((product) => {
      const row = document.createElement('div');
      row.className = 'product-row';
      row.innerHTML = `
        <div class="product-row-head">
          <div>
            <h4>${product.name}</h4>
            <p>${product.category || 'Sem categoria'} • ${product.pixPrice || 'Sem preço'}</p>
          </div>
          <span class="category-pill">${product.emoji || '📦'}</span>
        </div>
        <p>${product.section || ''}</p>
        <div class="product-row-actions">
          <button class="small-btn" type="button" data-action="edit">Editar</button>
          <button class="small-btn danger" type="button" data-action="delete">Excluir</button>
        </div>
      `;
      row.querySelector('[data-action="edit"]')?.addEventListener('click', () => fillProductForm(product));
      row.querySelector('[data-action="delete"]')?.addEventListener('click', () => deleteProduct(product.id));
      els.adminProductsList.appendChild(row);
    });
}

function fillProductForm(product) {
  state.editingProductId = product?.id || '';
  els.productFormTitle.textContent = product ? `Editando: ${product.name}` : 'Novo produto';
  productFormEls.id.value = product?.id || '';
  productFormEls.name.value = product?.name || '';
  productFormEls.category.value = product?.category || '';
  productFormEls.section.value = product?.section || '';
  productFormEls.emoji.value = product?.emoji || '';
  productFormEls.storage.value = product?.storage || '';
  productFormEls.installment.value = product?.installment || '';
  productFormEls.pixPrice.value = product?.pixPrice || '';
  productFormEls.pixValue.value = product?.pixValue ?? '';
  productFormEls.tags.value = (product?.tags || []).join(', ');
  productFormEls.notes.value = product?.notes || '';
}

function clearProductForm() {
  state.editingProductId = '';
  els.productFormTitle.textContent = 'Novo produto';
  Object.values(productFormEls).forEach((field) => {
    field.value = '';
  });
  els.productStatus.textContent = '';
}

async function saveProduct() {
  const payload = {
    id: normalizeText(productFormEls.id.value) || createId('item'),
    name: normalizeText(productFormEls.name.value),
    category: normalizeText(productFormEls.category.value),
    section: normalizeText(productFormEls.section.value),
    emoji: normalizeText(productFormEls.emoji.value) || '📦',
    storage: normalizeText(productFormEls.storage.value),
    installment: normalizeText(productFormEls.installment.value),
    pixPrice: ensurePixPriceLabel(productFormEls.pixPrice.value, productFormEls.pixValue.value),
    pixValue: priceNumber(productFormEls.pixValue.value),
    tags: normalizeText(productFormEls.tags.value)
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean),
    notes: normalizeText(productFormEls.notes.value),
  };

  if (!payload.name || !payload.category || !payload.pixPrice) {
    setStatusMessage(els.productStatus, 'Preencha nome, categoria e preço PIX.', true);
    return;
  }

  const index = state.products.findIndex((item) => item.id === payload.id);
  if (index >= 0) {
    state.products[index] = payload;
  } else {
    state.products.push(payload);
  }

  buildChips();
  buildFilterControls();
  setTopTab('radar');
  applyFilters();
  renderAdminProducts();
  fillProductForm(payload);
  await syncCurrentState(els.productStatus, 'Produto salvo e sincronizado entre celular e desktop.');
}

async function deleteProduct(productId) {
  const product = state.products.find((item) => item.id === productId);
  if (!product) return;

  const confirmed = window.confirm(`Excluir o produto “${product.name}”?`);
  if (!confirmed) return;

  state.products = state.products.filter((item) => item.id !== productId);
  buildChips();
  if (state.category !== 'Todos' && !categories(state.products).includes(state.category)) {
    state.category = 'Todos';
  }
  applyFilters();
  renderAdminProducts();
  clearProductForm();
  await syncCurrentState(els.productStatus, 'Produto removido e sincronizado entre dispositivos.');
}

function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1200);
}

function normalizeHeaderKey(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function getRowValue(row, aliases) {
  const map = new Map(Object.keys(row || {}).map((key) => [normalizeHeaderKey(key), row[key]]));
  for (const alias of aliases) {
    const normalizedAlias = normalizeHeaderKey(alias);
    if (map.has(normalizedAlias)) {
      return map.get(normalizedAlias);
    }
  }
  return '';
}

function parseTagList(value) {
  return String(value || '')
    .split(/[|,;]+/)
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function orderProductTags(tags = []) {
  const preferredOrder = ['nota fiscal', 'lacrado', '1 ano apple', 'novo'];
  return [...tags].sort((a, b) => {
    const aIndex = preferredOrder.indexOf(String(a).trim().toLowerCase());
    const bIndex = preferredOrder.indexOf(String(b).trim().toLowerCase());
    const safeA = aIndex === -1 ? preferredOrder.length : aIndex;
    const safeB = bIndex === -1 ? preferredOrder.length : bIndex;
    if (safeA !== safeB) return safeA - safeB;
    return String(a).localeCompare(String(b), 'pt-BR');
  });
}

function spreadsheetRowToProduct(row, index) {
  const name = normalizeText(getRowValue(row, ['Nome', 'name']));
  const category = normalizeText(getRowValue(row, ['Categoria', 'category']));
  const pixPriceRaw = getRowValue(row, ['Preco_PIX', 'Preço PIX', 'Preço', 'Preco', 'pixPrice']);
  const pixValueRaw = getRowValue(row, ['Valor_PIX', 'Valor PIX', 'Preço numérico', 'pixValue', 'price']);
  const pixValue = priceNumber(String(pixValueRaw).replace(',', '.'));
  const pixPrice = ensurePixPriceLabel(pixPriceRaw, pixValue);

  const hasRelevantData = [name, category, pixPrice].some(Boolean);
  if (!hasRelevantData) return null;

  return {
    id: normalizeText(getRowValue(row, ['ID', 'id'])) || createId('item'),
    name,
    category,
    section: normalizeText(getRowValue(row, ['Secao', 'Seção', 'section'])),
    emoji: normalizeText(getRowValue(row, ['Emoji', 'emoji'])) || '📦',
    storage: normalizeText(getRowValue(row, ['Armazenamento', 'storage'])),
    installment: normalizeText(getRowValue(row, ['Parcelamento', 'installment'])),
    pixPrice,
    pixValue,
    tags: parseTagList(getRowValue(row, ['Tags', 'tags'])),
    notes: normalizeText(getRowValue(row, ['Observacoes', 'Observações', 'notes'])),
  };
}

async function refreshAfterImport(message) {
  persist();
  applyTheme();
  renderBranding();
  populateForms();
  buildChips();
  if (state.category !== 'Todos' && !categories(state.products).includes(state.category)) {
    state.category = 'Todos';
  }
  applyFilters();
  renderAdminProducts();
  clearProductForm();
  await syncCurrentState(els.layoutStatus, `${message} Sincronização concluída.`);
}

function exportExcel() {
  const rows = state.products.map((product) => ({
    ID: product.id,
    Nome: product.name,
    Categoria: product.category,
    Secao: product.section,
    Emoji: product.emoji,
    Armazenamento: product.storage,
    Parcelamento: product.installment,
    Preco_PIX: product.pixPrice,
    Valor_PIX: priceNumber(product.pixValue),
    Tags: (product.tags || []).join(' | '),
    Observacoes: product.notes,
  }));

  if (typeof XLSX !== 'undefined') {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(rows);
    ws['!cols'] = [
      { wch: 22 },
      { wch: 28 },
      { wch: 18 },
      { wch: 18 },
      { wch: 10 },
      { wch: 18 },
      { wch: 24 },
      { wch: 16 },
      { wch: 12 },
      { wch: 28 },
      { wch: 32 },
    ];
    XLSX.utils.book_append_sheet(wb, ws, 'Produtos');
    const workbookArray = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    downloadBlob(
      new Blob([workbookArray], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }),
      'tabela_precos_catalogo.xlsx'
    );
    return;
  }

  const headers = Object.keys(rows[0] || {
    ID: '',
    Nome: '',
    Categoria: '',
    Secao: '',
    Emoji: '',
    Armazenamento: '',
    Parcelamento: '',
    Preco_PIX: '',
    Valor_PIX: '',
    Tags: '',
    Observacoes: '',
  });
  const escapeCsvValue = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;
  const csvContent = [
    headers.map(escapeCsvValue).join(';'),
    ...rows.map((row) => headers.map((header) => escapeCsvValue(row[header])).join(';')),
  ].join('\n');

  downloadBlob(
    new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8;' }),
    'tabela_precos_catalogo.csv'
  );
  els.layoutStatus.textContent = 'Excel indisponível. Arquivo exportado em CSV.';
  setTimeout(() => (els.layoutStatus.textContent = ''), 2200);
}

function exportBackup() {
  const blob = new Blob([
    JSON.stringify({ config: sanitizePublicConfig(state.config), products: state.products }, null, 2),
  ], { type: 'application/json' });
  downloadBlob(blob, 'backup_catalogo_editavel.json');
}

function importBackup(file) {
  if (!file) return;

  const fileName = String(file.name || '').toLowerCase();
  const isJson = fileName.endsWith('.json') || file.type.includes('json');
  const isSpreadsheet = /\.(xlsx|xls|csv)$/i.test(fileName) || /sheet|excel|csv/.test(file.type);

  if (isJson) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result || '{}'));
        if (!Array.isArray(parsed.products) || !parsed.config) {
          throw new Error('Arquivo inválido');
        }
        state.products = parsed.products;
        state.config = { ...DEFAULT_CONFIG, ...sanitizePublicConfig(parsed.config) };
        refreshAfterImport('Backup JSON importado com sucesso.').catch(() => {});
      } catch {
        alert('Não foi possível importar o backup JSON.');
      }
    };
    reader.readAsText(file);
    return;
  }

  if (isSpreadsheet) {
    if (typeof XLSX === 'undefined') {
      alert('A importação de Excel precisa da biblioteca de planilhas carregada.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const workbook = XLSX.read(reader.result, { type: 'array' });
        const firstSheetName = workbook.SheetNames?.[0];
        const sheet = workbook.Sheets?.[firstSheetName];
        const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });
        const importedProducts = rows
          .map((row, index) => spreadsheetRowToProduct(row, index))
          .filter(Boolean);

        if (!importedProducts.length) {
          throw new Error('Planilha sem produtos válidos');
        }

        state.products = importedProducts;
        refreshAfterImport('Planilha importada com sucesso.').catch(() => {});
      } catch {
        alert('Não foi possível importar a planilha. Verifique se o arquivo contém colunas como Nome, Categoria e Preco_PIX.');
      }
    };
    reader.readAsArrayBuffer(file);
    return;
  }

  alert('Formato não suportado. Envie um arquivo JSON, XLSX, XLS, ou CSV.');
}

async function saveSecurity() {
  if (!hasAdminCredentials()) {
    setStatusMessage(els.securityStatus, 'Faça login no admin antes de alterar o acesso.', true, 3200);
    return;
  }

  const adminUser = normalizeText(formEls.adminUser.value) || DEFAULT_ADMIN.user;
  const adminPassword = normalizeText(formEls.adminPassword.value) || DEFAULT_ADMIN.password;

  try {
    await callCatalogApi('updateSecurity', {
      credentials: state.adminCredentials,
      nextCredentials: {
        user: adminUser,
        password: adminPassword,
      },
    });
    setAdminCredentials(adminUser, adminPassword);
    setStatusMessage(els.securityStatus, 'Novo acesso salvo e sincronizado.');
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Não foi possível atualizar o acesso.';
    setStatusMessage(els.securityStatus, message, true, 3600);
  }
}

function setActiveTab(tabId) {
  tabs.forEach((tab) => tab.classList.toggle('active', tab.dataset.tab === tabId));
  tabContents.forEach((content) => content.classList.toggle('active', content.id === tabId));
}

async function requestPasswordRecovery() {
  try {
    const response = await callCatalogApi('requestPasswordRecovery');
    toggleRecoveryPanel(true);
    if (els.recoveryCode) els.recoveryCode.focus();
    const target = response?.maskedPhone ? ` em ${response.maskedPhone}` : '';
    setStatusMessage(els.loginStatus, `Código enviado para o WhatsApp do administrador${target}.`, false, 5200);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Não foi possível enviar o código de recuperação.';
    setStatusMessage(els.loginStatus, message, true, 4800);
  }
}

async function confirmPasswordRecovery() {
  const code = normalizeText(els.recoveryCode?.value).replace(/\D/g, '');
  const user = normalizeText(els.recoveryUser?.value) || DEFAULT_ADMIN.user;
  const password = normalizeText(els.recoveryPassword?.value);

  if (code.length != 6) {
    setStatusMessage(els.loginStatus, 'Digite o código de 6 dígitos enviado no WhatsApp.', true, 3600);
    return;
  }

  if (!password) {
    setStatusMessage(els.loginStatus, 'Digite a nova senha para concluir a recuperação.', true, 3600);
    return;
  }

  try {
    await callCatalogApi('confirmPasswordRecovery', {
      code,
      nextCredentials: { user, password },
    });
    setAdminCredentials(user, password);
    setAdminLogged(true);
    try {
      window.alert('Código validado com sucesso. O acesso do administrador foi redefinido.');
    } catch {}
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Não foi possível validar o código de recuperação.';
    setStatusMessage(els.loginStatus, message, true, 4200);
  }
}

function registerEvents() {
  els.search.addEventListener('input', (e) => {
    state.query = e.target.value;
    applyFilters();
  });

  els.categorySelect?.addEventListener('change', (e) => {
    state.category = e.target.value;
    buildChips();
    applyFilters();
  });

  els.storageSelect?.addEventListener('change', (e) => {
    state.storage = e.target.value;
    applyFilters();
  });

  els.conditionSelect?.addEventListener('change', (e) => {
    state.condition = e.target.value;
    applyFilters();
  });

  els.sort?.addEventListener('change', (e) => {
    state.sort = e.target.value;
    applyFilters();
  });

  els.resetFilters?.addEventListener('click', () => {
    state.query = '';
    state.category = 'Todos';
    state.storage = '';
    state.condition = 'Todas condições';
    state.sort = 'price-asc';
    if (els.search) els.search.value = '';
    if (els.sort) els.sort.value = state.sort;
    buildChips();
    buildFilterControls();
    applyFilters();
  });

  els.closeDialog.addEventListener('click', () => els.dialog.close());
  els.dialog.addEventListener('click', (e) => {
    const shell = e.target.closest('.dialog-shell');
    if (!shell) els.dialog.close();
  });

  els.shareButton.addEventListener('click', async () => {
    const data = {
      title: document.title,
      text: `Veja o catálogo ${state.config.brandName}.`,
      url: window.location.href,
    };
    if (navigator.share) {
      try { await navigator.share(data); } catch {}
      return;
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
      els.shareButton.textContent = 'Link copiado';
      setTimeout(() => (els.shareButton.textContent = 'Compartilhar'), 1400);
    } catch {}
  });

  els.floatingWhatsapp.addEventListener('click', () => {
    window.open(whatsappLink(), '_blank', 'noopener');
  });

  els.radarTab?.addEventListener('click', () => setTopTab('radar'));

  els.heroWhatsappButton?.addEventListener('click', () => {
    window.open(whatsappLink(), '_blank', 'noopener');
  });

  els.scrollAdminHint?.addEventListener('click', () => openAdmin());
  els.openFilters?.addEventListener('click', () => {
    document.getElementById('categoryChips')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  els.openAdminPanel.addEventListener('click', openAdmin);
  els.closeAdminPanel.addEventListener('click', closeAdmin);
  els.adminOverlay.addEventListener('click', closeAdmin);

  els.forgotPasswordBtn?.addEventListener('click', requestPasswordRecovery);
  els.cancelRecoveryBtn?.addEventListener('click', () => {
    toggleRecoveryPanel(false);
    setStatusMessage(els.loginStatus, 'Recuperação cancelada.', false, 1600);
  });
  els.confirmRecoveryBtn?.addEventListener('click', confirmPasswordRecovery);

  els.loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = normalizeText(els.loginUser.value);
    const password = normalizeText(els.loginPassword.value);

    if (!user || !password) {
      setStatusMessage(els.loginStatus, 'Preencha usuário e senha.', true);
      return;
    }

    try {
      await callCatalogApi('auth', {
        credentials: { user, password },
      });
      setAdminCredentials(user, password);
      setAdminLogged(true);
      setStatusMessage(els.loginStatus, 'Login autorizado.', false, 1200);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Usuário ou senha inválidos.';
      setStatusMessage(els.loginStatus, message, true, 3200);
    }
  });

  els.logoutAdmin.addEventListener('click', () => {
    setAdminLogged(false);
    setStatusMessage(els.loginStatus, 'Sessão encerrada.', false, 1200);
  });

  els.refreshAdminMetrics?.addEventListener('click', () => {
    loadAdminMetrics();
  });

  [
    formEls.brandName,
    formEls.topbarText,
    formEls.heroEyebrow,
    formEls.heroTitleMain,
    formEls.heroTitleHighlight,
    formEls.heroText,
    formEls.radarTabLabel,
    formEls.footerNote,
    formEls.whatsappNumber,
    formEls.whatsappMessage,
    formEls.productCornerText,
    formEls.bg,
    formEls.bgSoft,
    formEls.surfaceStrong,
    formEls.primary,
    formEls.accent,
    formEls.text,
    formEls.muted,
    formEls.card,
    formEls.cardBackground,
    formEls.cardBorderColor,
    formEls.cardTextColor,
    formEls.noticeColor,
    formEls.panelBgColor,
    formEls.panelCardBgColor,
    formEls.panelTitleColor,
    formEls.panelTextColor,
    formEls.panelLabelColor,
    formEls.panelInputTextColor,
    formEls.panelInputBgColor,
    formEls.panelInputBorderColor,
    formEls.panelPlaceholderColor,
    formEls.dialogBgColor,
    formEls.dialogTextColor,
    formEls.dialogMutedColor,
    formEls.dialogPriceColor,
    formEls.pageBackground,
    formEls.customCss,
  ].forEach((field) => {
    field?.addEventListener('input', applyDraftPreview);
  });

  document.getElementById('saveLayout')?.addEventListener('click', saveLayout);
  document.getElementById('resetLayout')?.addEventListener('click', resetLayout);

  els.newProductBtn.addEventListener('click', clearProductForm);
  els.saveProduct.addEventListener('click', saveProduct);
  els.clearProductForm.addEventListener('click', clearProductForm);
  els.exportExcel.addEventListener('click', exportExcel);
  els.exportBackup.addEventListener('click', exportBackup);
  els.importBackupInput.addEventListener('change', (e) => importBackup(e.target.files?.[0]));
  document.getElementById('saveSecurity')?.addEventListener('click', saveSecurity);

  tabs.forEach((tab) => tab.addEventListener('click', () => setActiveTab(tab.dataset.tab)));
}

async function init() {
  await loadInitialData();
  applyTheme();
  renderBranding();
  populateForms();
  buildChips();
  buildFilterControls();
  setTopTab('radar');
  applyFilters();
  renderAdminProducts();
  clearProductForm();
  setAdminLogged(false);
  registerEvents();
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}

init().catch(() => {
  els.empty.classList.remove('hidden');
  els.empty.innerHTML = '<h3>Erro ao carregar catálogo</h3><p>Tente atualizar a página novamente.</p>';
});
