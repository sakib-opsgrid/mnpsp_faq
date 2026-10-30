# MNPSP FAQ – OpsHub

Internal FAQ tool for the Infozillion Service Assurance & A2P team.
Pure HTML, CSS and JavaScript – no build step, no dependencies, no server.

## Features

- Sidebar with all 13 FAQ sections
- Live search across every section (press `/` to focus, `Esc` to clear), matches are highlighted
- One-click **Copy** button next to every reply, so it can be pasted straight to the client
- Entries without a reply block (emails, maintenance mails, etc.) have a Copy button on the entry header
- Expand all / Collapse all
- Light and dark mode (follows the system setting)
- Works on desktop and mobile

## Project structure

```
.
├── index.html      # page structure + all FAQ content
├── style.css       # design / layout
├── script.js       # search, accordion, copy buttons
├── assets/
│   └── logo.png    # Infozillion Teletech BD logo
└── README.md
```

Keep all four files/folders together, `index.html` loads `style.css`, `script.js` and `assets/logo.png` by relative path.

## Run locally

Double-click `index.html`. Everything works offline.

## Deploy on GitHub Pages

1. Create a new repository on GitHub.
2. Upload `index.html`, `style.css`, `script.js` and the `assets` folder to the repository root.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then **Save**.
5. After a minute the site is live at `https://<username>.github.io/<repository>/`.

> Note: GitHub Pages sites are publicly reachable by anyone with the link, even when the repository is private
> (unless you use GitHub Enterprise Cloud with private Pages). Since this FAQ is marked **Internal use only**,
> host it on a private/internal server if the content must not be public.

## Updating FAQ content

Content lives in `index.html`. Each FAQ entry is one `<article class="card">`:

```html
<article class="card">
  <div class="card-head">…title…</div>
  <div class="card-body">
    <p><strong>Reply:</strong></p>
    <div class="reply">
      <button class="copy">Copy</button>
      <p><code>Dear Concerned,</code></p>
      <p><code>Your message here…</code></p>
    </div>
  </div>
</article>
```

- Everything inside a `<div class="reply">` is what the Copy button copies (each `<p>` becomes one paragraph).
- Search and copy read the page text automatically, so after editing text no other change is needed.
- To add a new entry, duplicate an existing `<article class="card">` inside the right `<section>` and edit it.

## Footer

© 2026 Najmaz Sakib · Infozillion Teletech BD
