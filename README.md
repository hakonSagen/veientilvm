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

## Filer

- `index.html` - spillflate og UI
- `styles.css` - visuell stil og responsivt oppsett
- `game.js` - spillmotor, hindringer, poeng og målfeiring
- `render.yaml` - Render-konfig for statisk deploy
