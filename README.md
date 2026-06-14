# Admin Métricas Completo

Projeto completo e funcional para publicação no Netlify, com persistência em **Netlify Blobs**, autenticação segura no backend e painel administrativo completo.

## Funcionalidades
- Login via backend com JWT
- Senhas com bcrypt
- Perfis: `admin`, `editor`, `viewer`
- Persistência de usuários, produtos, métricas e auditoria em Netlify Blobs
- Dashboard com gráfico de visualizações e conversão
- Busca sem acentos e fuzzy
- Paginação
- Upload drag and drop com conversão WEBP
- Auditoria de login, CRUD e uploads
- Tema escuro persistido
- PWA + cache offline
- SEO básico (Open Graph, sitemap, robots)
- Código modular em `src/`

## Credenciais iniciais
- E-mail: `admin@empresa.com`
- Senha: `TroqueAgora123!`

Altere imediatamente após o primeiro acesso.

## Deploy
1. Suba esta pasta em um repositório Git
2. Conecte no Netlify
3. Configure `JWT_SECRET`
4. Faça o deploy
5. Acesse o painel e altere a senha do admin criando um novo usuário, se desejar

## Estrutura
- `index.html`
- `src/`
- `netlify/functions/api.mjs`
- `DEPLOY_GUIDE.md`
- `PRODUCTION_CHECKLIST.md`
