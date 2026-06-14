# Guia de Deploy

## Variáveis obrigatórias
- `JWT_SECRET`

## Variáveis opcionais
- `ADMIN_BOOTSTRAP_EMAIL`
- `ADMIN_BOOTSTRAP_NAME`
- `ADMIN_BOOTSTRAP_PASSWORD`

## Publicação no Netlify
1. Envie a pasta para um repositório Git
2. Conecte o repositório ao Netlify
3. Use publish directory `.`
4. Use functions directory `netlify/functions`
5. Configure `JWT_SECRET`
6. Publique

## Primeiro acesso
Entre com o admin inicial e crie os demais usuários no painel.
