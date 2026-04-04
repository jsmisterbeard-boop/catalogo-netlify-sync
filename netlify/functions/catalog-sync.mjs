import { getStore } from '@netlify/blobs';

const STORE_NAME = 'catalogo-sync-store';
const DATA_KEY = 'site-data';
const AUTH_KEY = 'admin-auth';
const RECOVERY_KEY = 'admin-recovery';
const DEFAULT_RECOVERY_PHONE = '5514991299311';
const RECOVERY_TTL_MS = 10 * 60 * 1000;
const RECOVERY_COOLDOWN_MS = 60 * 1000;

const DEFAULT_PUBLIC_CONFIG = {"brandName": "Radar de Preços", "topbarText": "Catálogo de Preços • Abril 2026", "heroEyebrow": "Sua loja", "heroTitleMain": "Radar de Preços", "heroTitleHighlight": "", "heroText": "Preços atualizados em tempo real dos melhores fornecedores.", "radarTabLabel": "Radar de Preços", "badges": [], "heroCardLabel": "Condições de pagamento", "heroCardTitle": "Tudo sob encomenda • Pagamento seguro", "heroCardText": "💚 PIX à vista • 💳 Cartão em até 12x • 🤝 Atendimento personalizado", "footerNote": "⚠️ Todos os produtos são vendidos sob encomenda. Preços sujeitos a alteração sem aviso prévio.", "statProductsLabel": "Itens publicados no catálogo", "statAdminTitle": "Painel interno", "statAdminText": "Edite textos, cores, preços, login e conteúdo", "statExportTitle": "Excel + backup", "statExportText": "Baixe tabela de preços e cópia completa do site", "productCornerText": "", "whatsappNumber": "5514991299311", "whatsappMessage": "Olá! Vim pelo catálogo e gostaria de mais informações.", "bg": "#f6f3ee", "bgSoft": "#fbfaf8", "surfaceStrong": "#ffffff", "primary": "#c9ab7c", "accent": "#d9e8df", "text": "#222832", "muted": "#8e8a82", "card": "#ffffff", "cardBackground": "#ffffff", "cardBorderColor": "#ece4d8", "cardTextColor": "#222832", "noticeColor": "#b4863c", "pageBackground": "", "customCss": ""};
const DEFAULT_PRODUCTS = [{"id": "iphone-16e-128-gb", "name": "iPhone 16e 128 GB", "category": "iPhone", "section": "iPhone — Linha 16", "emoji": "📱", "storage": "128 GB", "installment": "12x R$ 371", "pixPrice": "R$ 3.900", "pixValue": 3900, "tags": ["Nota Fiscal", "Lacrado", "1 ano Apple"], "notes": "Produto novo, vendido sob encomenda."}, {"id": "iphone-16-128-gb", "name": "iPhone 16 128 GB", "category": "iPhone", "section": "iPhone — Linha 16", "emoji": "📱", "storage": "128 GB", "installment": "12x R$ 461", "pixPrice": "R$ 4.850", "pixValue": 4850, "tags": ["Nota Fiscal", "Lacrado", "1 ano Apple"], "notes": "Produto novo, vendido sob encomenda."}, {"id": "iphone-16-256-gb", "name": "iPhone 16 256 GB", "category": "iPhone", "section": "iPhone — Linha 16", "emoji": "📱", "storage": "256 GB", "installment": "12x R$ 503", "pixPrice": "R$ 5.290", "pixValue": 5290, "tags": ["Nota Fiscal", "Lacrado", "1 ano Apple"], "notes": "Produto novo, vendido sob encomenda."}, {"id": "iphone-16-plus-128-gb", "name": "iPhone 16 Plus 128 GB", "category": "iPhone", "section": "iPhone — Linha 16", "emoji": "📱", "storage": "128 GB", "installment": "12x R$ 494", "pixPrice": "R$ 5.190", "pixValue": 5190, "tags": ["Nota Fiscal", "Lacrado", "1 ano Apple"], "notes": "Produto novo, vendido sob encomenda."}, {"id": "iphone-16-plus-256-gb", "name": "iPhone 16 Plus 256 GB", "category": "iPhone", "section": "iPhone — Linha 16", "emoji": "📱", "storage": "256 GB", "installment": "12x R$ 532", "pixPrice": "R$ 5.590", "pixValue": 5590, "tags": ["Nota Fiscal", "Lacrado", "1 ano Apple"], "notes": "Produto novo, vendido sob encomenda."}, {"id": "iphone-16-pro-128-gb", "name": "iPhone 16 Pro 128 GB", "category": "iPhone", "section": "iPhone — Linha 16", "emoji": "📱", "storage": "128 GB", "installment": "12x R$ 561", "pixPrice": "R$ 5.900", "pixValue": 5900, "tags": ["Nota Fiscal", "Lacrado", "1 ano Apple"], "notes": "Produto novo, vendido sob encomenda."}, {"id": "iphone-16-pro-256-gb", "name": "iPhone 16 Pro 256 GB", "category": "iPhone", "section": "iPhone — Linha 16", "emoji": "📱", "storage": "256 GB", "installment": "12x R$ 589", "pixPrice": "R$ 6.190", "pixValue": 6190, "tags": ["Nota Fiscal", "Lacrado", "1 ano Apple"], "notes": "Produto novo, vendido sob encomenda."}, {"id": "iphone-16-pro-512-gb", "name": "iPhone 16 Pro 512 GB", "category": "iPhone", "section": "iPhone — Linha 16", "emoji": "📱", "storage": "512 GB", "installment": "12x R$ 646", "pixPrice": "R$ 6.790", "pixValue": 6790, "tags": ["Nota Fiscal", "Lacrado", "1 ano Apple"], "notes": "Produto novo, vendido sob encomenda."}, {"id": "iphone-16-pro-max-256-gb", "name": "iPhone 16 Pro Max 256 GB", "category": "iPhone", "section": "iPhone — Linha 16", "emoji": "📱", "storage": "256 GB", "installment": "12x R$ 656", "pixPrice": "R$ 6.890", "pixValue": 6890, "tags": ["Nota Fiscal", "Lacrado", "1 ano Apple"], "notes": "Produto novo, vendido sob encomenda."}, {"id": "iphone-16-pro-max-512-gb", "name": "iPhone 16 Pro Max 512 GB", "category": "iPhone", "section": "iPhone — Linha 16", "emoji": "📱", "storage": "512 GB", "installment": "12x R$ 713", "pixPrice": "R$ 7.490", "pixValue": 7490, "tags": ["Nota Fiscal", "Lacrado", "1 ano Apple"], "notes": "Produto novo, vendido sob encomenda."}, {"id": "macbook-air-m3-256-gb", "name": "MacBook Air M3 256 GB", "category": "Mac", "section": "MacBook", "emoji": "💻", "storage": "256 GB", "installment": "12x R$ 1.050", "pixPrice": "R$ 11.000", "pixValue": 11000, "tags": ["Nota Fiscal", "Lacrado", "1 ano Apple"], "notes": "Produto novo, vendido sob encomenda."}, {"id": "macbook-air-m3-512-gb", "name": "MacBook Air M3 512 GB", "category": "Mac", "section": "MacBook", "emoji": "💻", "storage": "512 GB", "installment": "12x R$ 1.190", "pixPrice": "R$ 12.490", "pixValue": 12490, "tags": ["Nota Fiscal", "Lacrado", "1 ano Apple"], "notes": "Produto novo, vendido sob encomenda."}, {"id": "ipad-10-64-gb", "name": "iPad 10 64 GB", "category": "iPad", "section": "iPad", "emoji": "🖥️", "storage": "64 GB", "installment": "12x R$ 385", "pixPrice": "R$ 3.990", "pixValue": 3990, "tags": ["Nota Fiscal", "Lacrado", "1 ano Apple"], "notes": "Produto novo, vendido sob encomenda."}, {"id": "ipad-10-256-gb", "name": "iPad 10 256 GB", "category": "iPad", "section": "iPad", "emoji": "🖥️", "storage": "256 GB", "installment": "12x R$ 466", "pixPrice": "R$ 4.890", "pixValue": 4890, "tags": ["Nota Fiscal", "Lacrado", "1 ano Apple"], "notes": "Produto novo, vendido sob encomenda."}, {"id": "airpods-4", "name": "AirPods 4", "category": "AirPods", "section": "AirPods", "emoji": "🎧", "storage": "", "installment": "12x R$ 142", "pixPrice": "R$ 1.490", "pixValue": 1490, "tags": ["Nota Fiscal", "Lacrado", "1 ano Apple"], "notes": "Produto novo, vendido sob encomenda."}, {"id": "airpods-pro-2", "name": "AirPods Pro 2", "category": "AirPods", "section": "AirPods", "emoji": "🎧", "storage": "", "installment": "12x R$ 204", "pixPrice": "R$ 2.140", "pixValue": 2140, "tags": ["Nota Fiscal", "Lacrado", "1 ano Apple"], "notes": "Produto novo, vendido sob encomenda."}];
const DEFAULT_ADMIN = {
  user: 'admin',
  password: 'admin123',
};

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

function sanitizePublicConfig(config = {}) {
  const { adminUser, adminPassword, ...publicConfig } = config || {};
  return publicConfig;
}

function normalizeProducts(products = []) {
  if (!Array.isArray(products)) return DEFAULT_PRODUCTS;
  return products.map((product) => ({
    id: String(product.id || '').trim(),
    name: String(product.name || '').trim(),
    category: String(product.category || '').trim(),
    section: String(product.section || '').trim(),
    emoji: String(product.emoji || '📦').trim() || '📦',
    storage: String(product.storage || '').trim(),
    installment: String(product.installment || '').trim(),
    pixPrice: String(product.pixPrice || '').trim(),
    pixValue: Number.isFinite(Number(product.pixValue)) ? Number(product.pixValue) : 0,
    tags: Array.isArray(product.tags) ? product.tags.map((tag) => String(tag || '').trim()).filter(Boolean) : [],
    notes: String(product.notes || '').trim(),
  })).filter((product) => product.name && product.category);
}

function buildDefaultData() {
  return {
    config: DEFAULT_PUBLIC_CONFIG,
    products: DEFAULT_PRODUCTS,
    updatedAt: new Date().toISOString(),
  };
}

async function getStoreData() {
  const store = getStore(STORE_NAME);
  const existingData = await store.get(DATA_KEY, { type: 'json', consistency: 'strong' });
  if (existingData) {
    return {
      store,
      data: {
        config: sanitizePublicConfig(existingData.config || DEFAULT_PUBLIC_CONFIG),
        products: normalizeProducts(existingData.products || DEFAULT_PRODUCTS),
        updatedAt: existingData.updatedAt || new Date().toISOString(),
      },
    };
  }

  const initialData = buildDefaultData();
  await store.setJSON(DATA_KEY, initialData);
  return { store, data: initialData };
}

async function getAdminCredentials(store) {
  const existingAuth = await store.get(AUTH_KEY, { type: 'json', consistency: 'strong' });
  if (existingAuth?.user && existingAuth?.password) {
    return existingAuth;
  }
  await store.setJSON(AUTH_KEY, DEFAULT_ADMIN);
  return DEFAULT_ADMIN;
}

async function isAuthorized(store, credentials = {}) {
  const auth = await getAdminCredentials(store);
  return auth.user === String(credentials.user || '').trim() && auth.password === String(credentials.password || '').trim();
}

function normalizePhone(value = '') {
  return String(value || '').replace(/\D/g, '');
}

function maskPhone(phone = '') {
  const digits = normalizePhone(phone);
  if (digits.length < 4) return 'WhatsApp do administrador';
  const local = digits.slice(-11);
  const ddd = local.slice(0, 2);
  const suffix = local.slice(-4);
  return `(${ddd}) 9****-${suffix}`;
}

function generateRecoveryCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

async function sendRecoveryCodeViaWhatsApp(code) {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const graphVersion = process.env.WHATSAPP_GRAPH_VERSION || 'v23.0';
  const recoveryTo = normalizePhone(process.env.WHATSAPP_RECOVERY_TO || DEFAULT_RECOVERY_PHONE);

  if (!accessToken || !phoneNumberId) {
    throw new Error('Recuperação por WhatsApp não configurada no Netlify. Adicione WHATSAPP_ACCESS_TOKEN e WHATSAPP_PHONE_NUMBER_ID nas variáveis do site.');
  }

  const response = await fetch(`https://graph.facebook.com/${graphVersion}/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: recoveryTo,
      type: 'text',
      text: {
        body: `Código de recuperação do admin: ${code}. Esse código expira em 10 minutos. Se você não solicitou a recuperação, ignore esta mensagem.`
      }
    }),
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.error?.message || 'Não foi possível enviar o código de recuperação pelo WhatsApp.');
  }

  return { recoveryTo };
}

export default async function handler(req) {
  const { store, data } = await getStoreData();

  if (req.method === 'GET') {
    return jsonResponse(data);
  }

  if (req.method !== 'POST') {
    return jsonResponse({ message: 'Método não suportado.' }, 405);
  }

  let body = {};
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ message: 'JSON inválido.' }, 400);
  }

  const action = String(body.action || '').trim();
  const credentials = body.credentials || {};

  if (!action) {
    return jsonResponse({ message: 'Ação inválida.' }, 400);
  }

  if (action === 'auth') {
    const authorized = await isAuthorized(store, credentials);
    if (!authorized) {
      return jsonResponse({ message: 'Usuário ou senha inválidos.' }, 401);
    }
    return jsonResponse({ ok: true });
  }

  if (action === 'requestPasswordRecovery') {
    const existingRecovery = await store.get(RECOVERY_KEY, { type: 'json', consistency: 'strong' });
    const now = Date.now();

    if (existingRecovery?.requestedAt) {
      const requestedAt = Date.parse(existingRecovery.requestedAt);
      if (!Number.isNaN(requestedAt) && now - requestedAt < RECOVERY_COOLDOWN_MS) {
        return jsonResponse({ message: 'Aguarde alguns segundos antes de solicitar um novo código.' }, 429);
      }
    }

    const code = generateRecoveryCode();
    const { recoveryTo } = await sendRecoveryCodeViaWhatsApp(code);
    await store.setJSON(RECOVERY_KEY, {
      code,
      requestedAt: new Date(now).toISOString(),
      expiresAt: new Date(now + RECOVERY_TTL_MS).toISOString(),
    });

    return jsonResponse({
      ok: true,
      maskedPhone: maskPhone(recoveryTo),
      expiresInMinutes: 10,
    });
  }

  if (action === 'confirmPasswordRecovery') {
    const recovery = await store.get(RECOVERY_KEY, { type: 'json', consistency: 'strong' });
    const code = String(body.code || '').trim();
    const nextCredentials = body.nextCredentials || {};
    const nextUser = String(nextCredentials.user || '').trim();
    const nextPassword = String(nextCredentials.password || '').trim();

    if (!recovery?.code || !recovery?.expiresAt) {
      return jsonResponse({ message: 'Nenhum código de recuperação ativo foi encontrado. Solicite um novo código.' }, 400);
    }

    if (Date.now() > Date.parse(recovery.expiresAt)) {
      await store.delete(RECOVERY_KEY);
      return jsonResponse({ message: 'O código de recuperação expirou. Solicite um novo código.' }, 410);
    }

    if (code !== String(recovery.code).trim()) {
      return jsonResponse({ message: 'Código de validação inválido.' }, 401);
    }

    if (!nextUser || !nextPassword) {
      return jsonResponse({ message: 'Informe o novo usuário e a nova senha.' }, 400);
    }

    await store.setJSON(AUTH_KEY, { user: nextUser, password: nextPassword });
    await store.delete(RECOVERY_KEY);
    return jsonResponse({ ok: true });
  }

  const authorized = await isAuthorized(store, credentials);
  if (!authorized) {
    return jsonResponse({ message: 'Sessão inválida. Faça login novamente.' }, 401);
  }

  if (action === 'save') {
    const payload = body.data || {};
    const nextData = {
      config: sanitizePublicConfig(payload.config || DEFAULT_PUBLIC_CONFIG),
      products: normalizeProducts(payload.products || DEFAULT_PRODUCTS),
      updatedAt: new Date().toISOString(),
    };
    await store.setJSON(DATA_KEY, nextData);
    return jsonResponse({ ok: true, updatedAt: nextData.updatedAt });
  }

  if (action === 'updateSecurity') {
    const nextCredentials = body.nextCredentials || {};
    const nextUser = String(nextCredentials.user || '').trim();
    const nextPassword = String(nextCredentials.password || '').trim();

    if (!nextUser || !nextPassword) {
      return jsonResponse({ message: 'Informe usuário e senha válidos para o novo acesso.' }, 400);
    }

    await store.setJSON(AUTH_KEY, { user: nextUser, password: nextPassword });
    return jsonResponse({ ok: true });
  }

  return jsonResponse({ message: 'Ação não reconhecida.' }, 400);
}
