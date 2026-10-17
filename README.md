# Yash Patle — The Developer Series

A responsive, cinematic developer portfolio built with plain HTML, CSS, and JavaScript. It runs directly in VS Code Live Server; no package install or build step is required.

## Run locally

1. Open this folder in VS Code.
2. Install the **Live Server** extension if needed.
3. Right-click `index.html` and choose **Open with Live Server**.

Google Fonts load from Google Fonts when a network connection is available. The layout and CSS artwork are local.

## Personalize the content

- Edit the hero, about, education, and experience copy in `index.html`.
- Update the `portfolioConfig.links` object in `script.js` with real GitHub, demo, email, LinkedIn, and GitHub profile values. Leave a value empty until it is confirmed; empty links are shown as unavailable.
- Update project names, descriptions, technologies, and their matching `data-project-link` keys in `index.html`.
- Replace the clearly marked education and experience placeholders in the timeline with accurate details. Remove optional cards that do not apply.
- The current resume is `assets/Resume.pdf`; replace it with your updated PDF and update `resumePath` in `script.js` if you change the filename.
- The profile card, hero, and intro dialog use the optimized `assets/My_Pic_Hoodie_SoftEdges.webp` portrait; the original PNG remains in `assets/` as a source copy.
- Verified project and contact links are configured in `script.js`. Unverified project links are shown as non-clickable “Link pending verification” labels.
- Change the title and description metadata in the `<head>` of `index.html` if desired.

## Files

- `index.html` — semantic page content and portfolio sections
- `style.css` — theme, responsive layouts, and artwork
- `script.js` — profile selection, navigation, modal, link configuration, and resume detection
- `assets/` — local assets such as the resume PDF
- `references/` — place the supplied visual references here if you want to keep them alongside the project

The reference screenshots were not present in the workspace when this page was created, so the implementation follows the written design brief. No personal photo, contact address, repository URL, deployment URL, employment record, or project metric has been invented.
