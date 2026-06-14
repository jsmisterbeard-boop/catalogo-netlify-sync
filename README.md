# Admin Métricas Pro

Refatoração completa do catálogo digital com painel administrativo, backend serverless, autenticação JWT, RBAC, auditoria, dashboard e PWA.

## Principais melhorias implementadas
- Login via backend com JWT
- Senhas com bcrypt
- Perfis: `admin`, `editor`, `viewer`
- Persistência em Supabase
- Tabelas: `users`, `products`, `metrics`, `audit_logs`
- Auditoria de login, CRUD e uploads
- Dashboard com Chart.js
- Busca sem acentos + fuzzy search
- Paginação e lazy loading
- Upload por drag and drop com conversão para WEBP
- SEO básico: Open Graph, sitemap e robots
- Tema escuro persistido
- PWA com cache offline
- Frontend modular sem uso inseguro de `innerHTML` para conteúdo dinâmico

## Estrutura
- `index.html`: shell da aplicação
- `src/`: frontend modular
- `netlify/functions/api.mjs`: API backend
- `supabase/schema.sql`: schema completo
- `supabase/seed.sql`: seed inicial com produtos e admin
- `DEPLOY_GUIDE.md`: guia de publicação
- `PRODUCTION_CHECKLIST.md`: checklist final

## Variáveis de ambiente
Copie `.env.example` para `.env` e preencha as credenciais do seu projeto.

## Publicação rápida
1. Crie o projeto no Supabase
2. Rode `supabase/schema.sql`
3. Rode `supabase/seed.sql`
4. Configure as variáveis do Netlify
5. Faça deploy do repositório

## Observações
- O alvo de Lighthouse > 90 foi tratado com otimizações de cache, lazy loading, paginação e PWA, mas deve ser validado no ambiente final.
- O campo de imagem usa Supabase Storage (`SUPABASE_STORAGE_BUCKET`).
