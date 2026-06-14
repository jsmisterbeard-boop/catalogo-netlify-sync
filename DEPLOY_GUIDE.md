# Guia de Deploy

## 1. Supabase
- Crie um projeto
- Execute `supabase/schema.sql`
- Execute `supabase/seed.sql`
- Crie o bucket público `product-images`

## 2. Variáveis no Netlify
Configure:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_ANON_KEY`
- `SUPABASE_STORAGE_BUCKET`
- `JWT_SECRET`
- `APP_URL`

## 3. Publicação
- Suba esta pasta em um repositório Git
- Conecte o repositório ao Netlify
- Build command: vazio
- Publish directory: `.`
- Functions directory: `netlify/functions`

## 4. Primeiro acesso
Use o usuário admin gerado no seed e troque a senha imediatamente.
