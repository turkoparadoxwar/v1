# The Turko–Paradox War

A single-page Astro static chronicle implementing **The Unresolved Record**. The design authority is [docs/TURKO-PARADOX-WAR-SITE-PLAN.md](docs/TURKO-PARADOX-WAR-SITE-PLAN.md). The preserved article and chronology are in `archive/`.

## Run locally

Install Node.js **22.12 or newer** (the workflow uses Node 22). From this directory:

```sh
npm ci
npm run dev
```

Open **http://localhost:4321/**. The preview has exactly one page. All content navigation uses anchors on that page.

To build and inspect the production output:

```sh
npm test
npm run build
npm run preview
```

The preview also defaults to port 4321; stop the development server first, or run `npm run preview -- --port 4322`. A successful build includes structural/content verification. Astro telemetry is disabled by the local command wrapper; no user-wide settings need to be changed.

## Deploy to GitHub Pages

1. Publish this project to the **main** branch of `turkoparadoxwar/v1` (https://github.com/turkoparadoxwar/v1).
2. In the repository, open **Settings → Pages → Build and deployment → Source**, and choose **GitHub Actions**.
3. Open **Actions → Deploy the chronicle to GitHub Pages → Run workflow**, or push a new commit to `main`.
4. Wait for both the `build` and `deploy` jobs. The deployment step provides the public URL; GitHub also lists it under Settings → Pages.

The workflow in `.github/workflows/deploy.yml` reads the real address from `actions/configure-pages`. It automatically sets the correct origin and repository subpath. It runs `npm ci`, the content/citation tests, a static build, and the output verifier, then deploys **only `dist/`**. Archives, design documents, source tests, and original working folders are not published.

The production URL is **https://turkoparadoxwar.github.io/v1/**. The workflow sets `SITE_URL=https://turkoparadoxwar.github.io` and `BASE_PATH=/v1/` from the GitHub Pages configuration.

### Canonical URL, social sharing, and a custom domain

Local builds deliberately omit canonical URL, `og:url`, and absolute social-image metadata until a real origin is supplied. The GitHub Pages workflow supplies that origin automatically, so the deployed build includes the canonical URL, optimized 1200 × 630 sharing image, article metadata, and single-page sitemap. The site title and description are already present in local builds.

For local testing of your **actual** intended address, copy `.env.example` to `.env` and set:

- `SITE_URL`: the real origin, such as your actual GitHub Pages origin, without the repository path.
- `BASE_PATH`: `/YOUR-REPOSITORY/` for a project site, or `/` for a root/custom-domain site.

Use real values, not a placeholder origin, for any publishable build. Both the build and verification scripts load `.env`; explicit environment variables take priority. `.env` is ignored by Git.

For a custom domain, configure it in GitHub Pages settings, follow GitHub's DNS instructions, and add the corresponding `public/CNAME` if appropriate. The workflow uses the address returned by GitHub. Do not create separate reader-facing pages for configuration or metadata.

### Publication attribution

Optional GitHub repository **Actions variables** `PUBLICATION_DATE`, `MODIFIED_DATE`, and `EDITORIAL_BYLINE` supply real publication information. Dates should be ISO 8601 dates/timestamps. These are editorial publication dates, not the September 2026 historical coverage dates. These values only populate machine-readable metadata. There is no public Publication Record panel; no author or release date is fabricated.

## Content and important files

| File / directory | Purpose |
|---|---|
| `src/pages/index.astro` | The only reader-facing route |
| `src/content/chronicle.md` | Exact publication copy of the archived narrative |
| `src/content/events.json` | All 43 approved English entries, preserved original Turkish records, dates/ranges, stable event IDs, passage targets, and documentary source associations |
| `src/content/people.json` | Names, roles, canonical anchors, and contextual portrait placement |
| `src/content/chapters.json` | Chapter navigation, provenance, date labels, and stable passage anchors |
| `src/content/sources.json` | Documentary records, completion status, and citation locations |
| `src/content/media.json` | Image descriptions, credits status, and usage metadata |
| `src/content/site.json` | Coverage, numerical snapshot, and demands ledger |
| `src/assets/images/` | Production image inputs, processed through Astro |
| `src/components/` | Editorial sections and reusable page treatments |
| `src/styles/` | Design tokens, responsive layout, accessibility states, and print layout |
| `src/lib/content.mjs` | Build-time Markdown token rendering and relationship validation |
| `src/lib/citations.mjs` | Available-source numbering and repeated-citation relationships |
| `public/fonts/` | Self-hosted Latin/Latin Extended font subsets and their licenses |
| `scripts/verify-build.mjs` | Original-content, event, anchor, image, metadata, and one-route validation |
| `docs/IMPLEMENTATION-NOTES.md` | Final changes, verification results, and external link-check limitations |

Historical prose lives in content, not components. The Markdown is parsed into tokens, preserving original paragraphs, list items, quoted wording, and all eleven section headings. Components add layout without rewriting the article. The 26 September continuation is explicitly separate from the article's 25 September conclusion.

## Documentary references

The 13 documentary record groups contain all 24 supplied links (19 distinct URLs), with descriptive labels, inline reference numbers, and return links. The records are in `src/content/sources.json`; each `links` array preserves the approved URLs and labels. Keep source IDs stable when updating links. The build checks every supplied link is rendered and every internal citation target resolves.

The final automated link check could read 17 of the 19 distinct destinations. eScholarship presents a JavaScript verification challenge and ModDB returns an anti-bot challenge (HTTP 403); their supplied URLs remain intact. These access restrictions are not treated as missing source records or proof of broken links. See `docs/SOURCE-LINK-CHECK.md` for the check record.

The timeline uses the user's exact approved English replacement for `Timeline.txt`, including all 43 entries and supplied emphasis. Both `Documents/Timeline.txt` and `archive/Timeline.txt` contain that replacement. The initial Turkish source remains unchanged in `archive/Timeline.tr.original.txt` and each event's `originalTurkish` field. All existing event IDs and anchors are preserved. Further translation, historical additions, or changed conclusions require the user's editorial approval. An approved content expansion should also update the baseline counts in the fidelity tests.

## Images and fonts

The original `Media/` assets remain untouched. The seven launch assets are copied into `src/assets/images/`; the reserved `GE_Ataturk.jpg` is not imported into the site. Astro generates responsive AVIF/WebP/JPEG hero variants and optimized WebP portraits. The hero uses the complete panoramic composition on mobile.

`scripts/prepare-assets.mjs` records the mechanical frontal crop for MuratAbiGF, the 1200 × 630 letterboxed sharing image, and copying licensed webfont subsets from the development font packages. The resulting inputs and local font files are already included. Routine builds do not need to regenerate these inputs.

Fonts: Barlow Condensed 600; Source Serif 4 regular, semibold, and italic; Latin and Latin Extended subsets including Turkish glyphs. System sans-serif is used for interface text. No third-party font requests or social embeds are made by readers' browsers.

## Quality checks

```sh
npm test
npm run build
```

These check the original documents, 43 events, date ranges, real narrative targets, citation numbering, a single HTML output, all original rendered prose, six required portraits, all internal anchors, asset paths, missing-source behavior, and metadata when an origin is configured.

For reproducible browser checks, install Chromium once:

```sh
npx playwright install chromium
```

With the development server or production preview already running:

```sh
npm run test:browser
```

`TEST_URL` selects a different preview address. The browser suite tests desktop, tablet, 390 px and 320 px mobile layouts; visible events; internal links; keyboard skip/contents behavior; no-JavaScript reading; print inclusion; and automated accessibility. Screenshots and reports are written to ignored `artifacts/`.

To target a repository-path production preview in PowerShell:

```powershell
$env:TEST_URL = 'http://127.0.0.1:4322/YOUR-REPOSITORY/'
npm run test:browser
```

`scripts/performance-check.mjs` measures a cold-cache mobile lab sample at the same `TEST_URL`: 390 × 844, DPR 2, 4 Mbps download, 100 ms latency, and 4× CPU slowdown. Lab results are diagnostic, not a guarantee of real-user or hosted performance.

## Current limits

The supplied documentary links and English chronology are integrated. Image Credits remains unchanged, including its existing creator-credit notice. The public Publication Record and obsolete import/placeholder code have been removed. Two source sites restrict automated access, as documented above. No project implementation blocker remains. The publication target is `turkoparadoxwar/v1`; deployment status is recorded in the repository’s Actions runs.
