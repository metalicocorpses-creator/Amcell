# AmCell — Site com painel admin (Eleventy + Decap CMS)

Este projeto gera o site da AmCell a partir de arquivos de dados (produtos e
artigos do blog), e tem um painel de administração em `/admin` onde dá pra
editar tudo sem mexer em código.

⚠️ **Este projeto não foi testado rodando de verdade** (o ambiente onde foi
escrito não tem acesso à internet para instalar pacotes). Os arquivos foram
revisados com cuidado, mas é esperado que apareça algum erro pequeno na
primeira tentativa — é normal, e os passos abaixo te ajudam a identificar e
corrigir.

## O que você precisa antes de começar

- Uma conta no [GitHub](https://github.com) (gratuita)
- Uma conta no [Netlify](https://netlify.com) (gratuita)
- [Node.js](https://nodejs.org) instalado no seu computador (versão 18 ou mais recente)

## Passo 1 — Testar localmente no seu computador

1. Extraia esta pasta em qualquer lugar do seu computador
2. Abra o terminal (Prompt de Comando, PowerShell ou Terminal do Mac) dentro
   da pasta do projeto
3. Rode:
   ```
   npm install
   ```
   Isso baixa o Eleventy e as dependências. Pode demorar um minuto.
4. Depois rode:
   ```
   npm start
   ```
5. Se tudo der certo, vai aparecer um endereço tipo `http://localhost:8080` —
   abra no navegador. Você deve ver o site completo (home, produtos, blog etc.)

**Se der erro no passo 3 ou 4:** copie a mensagem de erro exata e me envie —
eu corrijo o arquivo específico que estiver com problema.

## Passo 2 — Subir o projeto para o GitHub

1. Crie um repositório novo no GitHub (pode ser privado ou público)
2. Dentro da pasta do projeto, rode:
   ```
   git init
   git add .
   git commit -m "Primeira versão do site"
   git branch -M main
   git remote add origin LINK_DO_SEU_REPOSITORIO
   git push -u origin main
   ```
   (troque `LINK_DO_SEU_REPOSITORIO` pelo link que o GitHub te mostrar ao
   criar o repositório)

## Passo 3 — Conectar o repositório ao Netlify

1. Entre em [app.netlify.com](https://app.netlify.com)
2. Clique em **"Add new site" → "Import an existing project"**
3. Escolha **GitHub** e selecione o repositório que você acabou de criar
4. O Netlify já deve detectar sozinho as configurações (build command
   `npm run build`, pasta `_site`) porque estão no arquivo `netlify.toml`
5. Clique em **Deploy**

Em alguns minutos o site estará no ar em um link tipo
`nome-aleatorio.netlify.app`.

## Passo 4 — Ativar o login do painel admin (Netlify Identity + Git Gateway)

O painel em `/admin` precisa de um sistema de login para saber quem pode
editar o site. Isso é feito pelo Netlify Identity:

1. No painel do seu site no Netlify, vá em **Site configuration → Identity**
2. Clique em **Enable Identity**
3. Em **Registration**, escolha **Invite only** (assim só quem você convidar
   consegue criar login — mais seguro)
4. Ainda em Identity, vá em **Services → Git Gateway** e clique em
   **Enable Git Gateway** (isso permite que o painel salve as alterações
   direto no GitHub)
5. Volte para **Identity** e clique em **Invite users** — coloque seu e-mail
6. Você vai receber um e-mail para criar sua senha

## Passo 5 — Atualizar o link do site no painel

Abra o arquivo `admin-src/config.yml`, encontre as linhas:

```yaml
site_url: https://SEU-SITE.netlify.app
display_url: https://SEU-SITE.netlify.app
```

Troque `SEU-SITE.netlify.app` pelo endereço real que o Netlify te deu no
Passo 3. Depois é só enviar essa mudança pro GitHub de novo:

```
git add .
git commit -m "Atualiza link do site no painel"
git push
```

O Netlify publica a atualização automaticamente.

## Passo 6 — Usar o painel

Acesse `https://SEU-SITE.netlify.app/admin` (troque pelo seu endereço real),
faça login com o e-mail/senha que você criou no Passo 4, e pronto: você verá
as seções **Produtos**, **Blog**, **Dados da loja** e **Categorias**, todas
editáveis por formulário. Toda alteração salva no painel:

1. Vai para o GitHub automaticamente
2. Dispara uma nova publicação no Netlify
3. Em cerca de 1 minuto a mudança aparece no site

## Trocar o WhatsApp e outros dados de contato

Não precisa mexer em código — abra o painel, vá em **Dados da loja** e edite
diretamente o número de WhatsApp, e-mail, Instagram e horário de
atendimento.

## Estrutura do projeto (para referência)

```
src/
  _data/          → dados globais (loja.json, categorias)
  _includes/       → templates reutilizáveis (header, footer, cards)
  produtos/        → um arquivo .md por produto
  blog/            → um arquivo .md por artigo
  images/          → fotos e ilustrações
  css/ e js/        → estilo e interações do site
admin-src/          → painel administrativo (Decap CMS)
.eleventy.js         → configuração do gerador de site
netlify.toml          → configuração de publicação
```

## Problemas comuns

- **"npm: command not found"** → o Node.js não está instalado. Baixe em
  nodejs.org e instale antes de tentar de novo.
- **O painel `/admin` carrega mas não deixa fazer login** → confirme que
  Identity e Git Gateway foram ativados (Passo 4) e que você foi convidado
  como usuário.
- **Mudanças no painel não aparecem no site** → veja em **Deploys** no
  painel do Netlify se o build rodou com sucesso; se falhou, o log mostra o
  erro exato.
