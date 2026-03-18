# penetrationstest.guru

One-Pager Basisprojekt fuer eine Penetrationstest-Marke auf Basis von Vite. Das Projekt ist fuer Cloudflare Pages vorbereitet.

## Lokal starten

```bash
npm install
npm run dev
```

## Produktion bauen

```bash
npm run build
```

Das Build-Ergebnis liegt anschliessend in `dist/`.

## GitHub

```bash
git init
git add .
git commit -m "Initial landing page"
git branch -M main
git remote add origin https://github.com/DEIN-USERNAME/penetrationstest.guru.git
git push -u origin main
```

## Cloudflare Pages

### Variante A: Deployment ueber GitHub

1. Repository bei GitHub anlegen und pushen.
2. In Cloudflare zu `Workers & Pages` gehen.
3. `Create application` > `Pages` > `Connect to Git` waehlen.
4. GitHub-Repository `penetrationstest.guru` verbinden.
5. Build-Einstellungen setzen:
   - Build command: `npm run build`
   - Build output directory: `dist`
6. Deployment starten.

Wenn Cloudflare in deinem Projekt statt eines klassischen Pages-Builds einen
verpflichtenden `Deploy command` erwartet, dann nutze dieses Repo mit:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`

Die `wrangler.jsonc` ist dafuer vorbereitet und deployed die statischen Assets
aus `dist`.

### Variante B: Direkt per Wrangler deployen

```bash
npx wrangler login
npm run build
npx wrangler pages deploy dist --project-name penetrationstest-guru
```
