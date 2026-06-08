# Kommer fosningen til VM?

Et enkelt, mobilvennlig HTML5-spill laget for Fosna-Folket om en lokal fotballreise fra Fosen til VM.

## Lokalt

Åpne prosjektmappa og start en enkel server:

```bash
python3 -m http.server 8000
```

Besøk deretter `http://localhost:8000`.

## Deploy til Render

Prosjektet er satt opp som en Render Static Site med konfig i `render.yaml`.

1. Opprett eller bruk et GitHub-repo.
2. Push prosjektet til `main`.
3. Logg inn i Render.
4. Velg `New` -> `Blueprint` eller `New` -> `Static Site`.
5. Koble til GitHub-repoet.
6. Hvis du bruker `Blueprint`, vil Render lese `render.yaml` automatisk.
7. Hvis du bruker `Static Site` manuelt, bruk:
   - Build Command: tom
   - Publish Directory: `.`

Render bygger deretter en statisk side og gir deg en `onrender.com`-adresse.

## Embed i sak på Fosna-Folket

Den tryggeste måten å vise spillet i en artikkel på er å embedde Render-versjonen i en `iframe`.

Viktig:
- `render.yaml` er satt opp uten `X-Frame-Options: SAMEORIGIN`, slik at spillet kan vises inne på `fosna-folket.no`.
- Etter endringer i `render.yaml` må Render deployes på nytt før embed virker.

Bruk denne koden i artikkelen og bytt ut `DIN-RENDER-URL` med den publiserte adressen:

```html
<div style="width:100%;max-width:980px;margin:0 auto;">
  <iframe
    src="https://DIN-RENDER-URL.onrender.com/"
    title="Kommer fosningen til VM?"
    loading="lazy"
    allow="fullscreen; clipboard-write"
    allowfullscreen
    style="display:block;width:100%;aspect-ratio:16/9;border:0;border-radius:12px;overflow:hidden;background:#eef3f8;"
  ></iframe>
</div>
```

Hvis embedsystemet i publiseringsløsningen ikke godtar `aspect-ratio`, bruk denne varianten:

```html
<div style="position:relative;width:100%;padding-top:56.25%;max-width:980px;margin:0 auto;">
  <iframe
    src="https://DIN-RENDER-URL.onrender.com/"
    title="Kommer fosningen til VM?"
    loading="lazy"
    allow="fullscreen; clipboard-write"
    allowfullscreen
    style="position:absolute;inset:0;width:100%;height:100%;border:0;border-radius:12px;overflow:hidden;background:#eef3f8;"
  ></iframe>
</div>
```

Anbefaling:
- bruk bredde `100%`
- la høyden styres av `16:9`
- slå på `allowfullscreen`
- bruk Render-URL-en som peker til siste deploy

## Filer

- `index.html` - spillflate og UI
- `styles.css` - visuell stil og responsivt oppsett
- `game.js` - spillmotor, hindringer, poeng og målfeiring
- `render.yaml` - Render-konfig for statisk deploy
