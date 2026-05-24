SITE EDITÁVEL COM PAINEL ADMINISTRATIVO + SINCRONIZAÇÃO NETLIFY
================================================================

O que esta versão entrega
- Site responsivo e otimizado para celular.
- Painel administrativo dentro do próprio site.
- Login do admin validado por função serverless.
- Sincronização entre celular, desktop e outros dispositivos após publicar no Netlify.
- Armazenamento das alterações em Netlify Functions + Netlify Blobs.
- Edição de textos, cores, identidade visual, fundo da página, fundo dos cards e CSS extra.
- Cadastro, edição e exclusão de produtos.
- Exportação da tabela de preços em Excel (.xlsx), com fallback em CSV se necessário.
- Exportação de backup completo em JSON.
- Importação de backup em JSON e importação de produtos via Excel (.xlsx/.xls) ou CSV.
- Remoção do filtro da direita na barra superior.

Acesso padrão do admin
- Usuário: admin
- Senha: admin123

Como publicar no Netlify
IMPORTANTE
- Esta versão agora usa Netlify Functions e Netlify Blobs para sincronização.
- Por isso, NÃO use o Netlify Drop de arrastar pasta na tela.
- Publique via Git (recomendado) ou Netlify CLI.

Opção 1 — Publicar via GitHub + Netlify
1. Envie esta pasta para um repositório no GitHub.
2. No Netlify, clique em “Add new site” > “Import an existing project”.
3. Conecte o repositório.
4. O Netlify detectará o projeto, instalará as dependências e publicará o site com as funções.

Opção 2 — Publicar via Netlify CLI
1. Instale o CLI: npm install -g netlify-cli
2. Dentro da pasta do projeto, rode: npm install
3. Faça login: netlify login
4. Vincule/crie o site: netlify init
5. Publique: netlify deploy --prod

Como abrir o painel
- Clique no botão “Admin” no topo do site.
- Faça login.
- Use as abas Layout, Produtos e Segurança.

Recuperação de senha por WhatsApp
- O botão “Esqueci a senha” envia um código de validação para o WhatsApp padrão do administrador: (14) 99129-9311.
- Para o envio funcionar no site publicado, configure no Netlify as variáveis WHATSAPP_ACCESS_TOKEN e WHATSAPP_PHONE_NUMBER_ID.
- Opcionalmente, você pode definir WHATSAPP_RECOVERY_TO. Se não definir, o sistema usa 5514991299311 como destino padrão.
- Depois de receber o código no WhatsApp, digite o código na tela, informe o novo usuário e a nova senha e conclua a redefinição.

Como a sincronização funciona
- O catálogo e o layout são salvos em nuvem no Netlify.
- Depois de publicado corretamente, as mudanças feitas no desktop aparecem no celular e vice-versa.
- Se o site estiver offline ou rodando fora do Netlify, ele usa o navegador apenas como fallback local.

Arquivos principais
- index.html
- styles.css
- app.js
- data/products.json
- netlify/functions/catalog-sync.mjs
- netlify.toml
- package.json

Sugestões
- Depois de configurar tudo, exporte um Backup JSON para guardar uma cópia da versão atual.
- Para importar produtos por planilha, use colunas como: Nome, Categoria, Secao, Emoji, Armazenamento, Parcelamento, Preco_PIX, Valor_PIX, Tags e Observacoes.
