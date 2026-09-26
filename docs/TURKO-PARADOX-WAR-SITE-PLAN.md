# THE TURKO–PARADOX WAR — Website Design Authority

Status: Design authority for the implemented first version; includes the user-approved English chronology amendment.

Plan date: 26 September 2026.

Design concept: **The Unresolved Record**.

## 1. Authority, scope, and fixed commitments

This document is the DESIGN AUTHORITY for the implementation phase. It incorporates the approved visual direction and the user's final structural adjustments. Where earlier chat proposals differ from this document, this document takes precedence. In particular, the complete chronology must be directly visible, production images belong under Astro's `src/assets/`, and original documents are preserved under `archive/`.

Implementation must follow this document unless the user explicitly approves a change. Ordinary implementation choices within the specified design, behavior, and ranges are permitted. Changing the concept, editorial perspective, page structure, content visibility, image decisions, or stack requires an explicitly approved amendment to this plan. Record approved amendments here so that the implementation continues to have one authority.

### Non-negotiable single-page experience

- There is exactly one reader-facing page: `src/pages/index.astro`.
- The hero, summary, conflict panel, complete timeline, article, people, demands, responses, reviews, aftermath, references, and credits all exist in that page.
- Chronicle, Timeline, Demands, and Sources navigate to fragments on the same page.
- Individual events, people, quotations, documents, and references may have stable fragment IDs. These never become separate content routes.
- Do not create `timeline.html`, `people.html`, `sources.html`, event detail pages, chapter pages, or equivalent routes in another format.
- Technical files, optimized image files, fonts, metadata files, and original external sources are not additional reader-facing article pages.
- The only reader-facing HTML document in the deployment is the generated `index.html`. Do not add a separate error article, about page, credits page, translation page, or search-results page.
- All 43 entries of the supplied chronology are rendered and visible directly in the normal page flow. No collapsed main chronology, tabs that conceal days, carousel, load-more button, virtualization, or pagination.
- The full historical narrative is visible in normal reading flow. Mobile contents may collapse; the narrative and main chronology may not.

### Editorial commitments

Use THE TURKO–PARADOX WAR as the event title throughout. Do not qualify it as a joke, meme, or unofficial name.

Preserve the supplied article's chronology, wording, framing, arguments, named people, demands, and conclusions. Its perspective is intentionally sympathetic to the Turkish gaming community. Preserve opposing reactions and Paradox statements within that account. This design phase does not rewrite, shorten, independently fact-check, or neutralize the historical narrative.

Typography, framing, labels, navigation, dated summaries, and supporting exhibits may make the material easier to understand. They must not silently introduce stronger factual claims, invented quotations, fabricated screenshots, or a different conclusion.

## 2. Supplied material and preservation

Both supplied texts and all eight images were inspected before this plan was finalized.

| Material | Observations | Role |
|---|---|---|
| The Turko–Paradox War.md | Approximately 2,350 words; 11 main sections plus introduction; English; no reference URLs | Complete primary narrative |
| Timeline.txt | 43 user-approved English entries; dates and ranges covering 21–26 September; the earlier Turkish version is separately preserved | Complete chronology and passage navigation |
| MainArt.png | 1672 × 941; approximately 3.09 MB; red-left/blue-right composition; embedded title and illustrated interface elements | Opening artwork |
| Six participant-associated images | Photographs and one illustrated avatar, with differing resolutions and crops | Contextual identification |
| GE_Ataturk.jpg | Fantasy-style armored Atatürk artwork | Reserved outside the main launch experience |

### Original documents

`archive/The Turko–Paradox War.md` is the unchanged original article. Following the user's explicit replacement request, `archive/Timeline.txt` and `Documents/Timeline.txt` hold the exact supplied English chronology. The initial Turkish file remains preserved unchanged as `archive/Timeline.tr.original.txt`. These records are historical content authorities, not files to rewrite as part of presentation work without an explicit editorial instruction.

The original `Documents/` and `Media/` folders may remain in the working repository during the transition. Their presence does not authorize duplicate publication or a second source of edited narrative. This planning task preserves the source folders rather than deleting or moving them.

During implementation, create the publication copy of the complete article in `src/content/chronicle.md`. Its prose must match the archived article; presentation metadata may live alongside it. Extract structured events from the archived timeline with all 43 entries retained. Check fidelity after rendering so that restructuring has not dropped or changed paragraphs, names, list items, or quoted wording.

Production image inputs are copied into `src/assets/images/`. Retain the supplied originals. Do not serve production article images directly from `Media/` or place them under `public/` merely for convenience.

### Date boundaries

The article's conclusion describes the situation as of **25 September**. The timeline includes a **26 September** continuation. Preserve that distinction.

- Hero date: September 2026.
- Coverage label: Record covered: 21–26 September 2026.
- Article aftermath: retain its original 25 September boundary.
- Later status: a separately labeled 26 September chronology update.
- The record's coverage end is not the conflict's end date.
- Status labels are editorial snapshots with explicit dates, not a live feed and not automatically advanced by the visitor's clock.
- Publication and modification metadata use actual publication/editorial update dates, separately from the historical dates.

### Language

The main publication and visible chronology are English. The user supplied the complete approved English replacement for Timeline.txt after the first implementation pass. Display those 43 entries verbatim, preserving punctuation, date ranges, and the supplied emphasis on the game title. The 26 September continuation uses the same approved English entry.

Keep the earlier Turkish wording in `archive/Timeline.tr.original.txt` and in each event's `originalTurkish` record for provenance. No additional bilingual route or toggle is required. Keep every event directly visible, use `lang="en"`, and preserve all established event IDs and links. This explicitly approved amendment replaces the earlier pending-translation fallback; do not translate or rewrite the user's English text independently.

## 3. Design concept: The Unresolved Record

Create a dark editorial chronicle whose narrative tension is measured by the three Turkish demands. The opening establishes confrontation; community chapters establish collective pressure; official statements show institutional acknowledgment; the aftermath returns to the demands and the unresolved outcome.

The site should resemble a carefully assembled digital exhibition and long-form historical feature. Its authority comes from readable prose, clear chronology, attributed documents, consistent date labels, and restraint after the vivid opening artwork.

The supplied hero carries the spectacle. The interface does not imitate every military, gaming, or digital-system element in that image.

### Recurring motif

Use a paired red-and-blue rule at a few important thresholds. Red leads community chapters; blue frames Paradox documents. The closing rules stop with a small gap between them, echoing the unresolved disagreement.

This is a simple typographic/geometric motif, not a territorial map or a scoreboard. Do not invent coordinates, troop counts, front lines, seals, classified stamps, or official-looking document credentials.

### Emotional rhythm

1. **Confrontation:** dense panoramic hero.
2. **Orientation:** numerical strip, original introduction, historical conflict panel, visible chronology.
3. **Understanding:** quiet origins chapter and precise narrative distinctions.
4. **Collective pressure:** contextual portraits, mobilization, and the expansive demands block.
5. **Scale:** the Steam snapshot and wider reactions.
6. **Scrutiny:** cold, clearly attributed Paradox document panels.
7. **Escalation:** sober treatment of Playrion and Valve.
8. **Unresolved accountability:** complete aftermath and the returning demands ledger.

No celebratory victory screen, artificial climax, background audio, or gamified progress score.

## 4. Visual system

### Color

| Token / role | Value | Use |
|---|---|---|
| Main background | `#101214` | Main page and article |
| Secondary surface | `#1B2026` | Timeline structure and supporting information |
| Main text | `#F0EDE6` | Headings, prose, quotations |
| Secondary text | `#ADB5BE` | Captions, dates, attribution |
| Turkish emphasis | `#C93740` | Major numerals, rules, selected markers |
| Paradox emphasis | `#84ACCF` | Statement labels and document borders |
| Paradox document surface | `#14212D` | Official-response excerpts |
| Demands surface | `#241416` | Three Demands section |
| Structural rule | `#46515D` | Necessary boundaries and separators |

Outside the hero, approximately 80% of the visual field remains charcoal and steel. Warm white carries the text. Red and blue are concentrated accents rather than alternating colored text columns. Omit gold from the interface; the supplied artwork already carries warmth.

Do not use the dark red token for small body text. Use warm-white labels with a red rule or marker, and check every actual foreground/background pairing for accessibility. Decorative separators may be quieter than boundaries necessary to understand controls.

### Provenance labels

Use explicit labels where they help readers recognize the origin or role of material:

- **TURKISH COMMUNITY** — community mobilization, demands, reported creator actions.
- **PARADOX RESPONSE** — official statements and moderation-policy material.
- **INTERNATIONAL REACTION** — reactions outside Türkiye, including support and opposition.
- **PLATFORM INTERVENTION** — Valve and other platform actions described in the record.
- **REPORTED CYBER INCIDENT** — the Playrion chapter.
- **ARCHIVAL ILLUSTRATION** or **ILLUSTRATION** — illustrative artwork, where applicable.

Pair labels with names and attribution. Labels identify provenance or subject; they do not certify that the author's paraphrase is an original institutional document. Label individual passages or documents in mixed chapters rather than assigning all their material to one party. A cyber-incident label must not imply that the whole Turkish community carried out the intrusion.

Paradox blue belongs to Paradox material. Other institutional actors use steel-gray treatment. International reaction uses the neutral base with explicit attribution, not a third team color.

### Typography

- **Barlow Condensed Semibold:** chapter headings, large dates, demand numerals.
- **Source Serif 4:** the article and major quotations, using actual weights and italics where required.
- **System sans-serif:** navigation, captions, source metadata, and controls.
- System tabular numerals or a restrained system monospace may be used for short technical metadata; no third downloaded font family is needed.

| Element | Desktop | Mobile |
|---|---|---|
| Chapter heading | 56–72 px | 36–44 px |
| Major date numeral | 88–112 px | 48–64 px |
| Body | 20 px, line height 1.7 | 18 px, line height 1.65 |
| Major quote | 34–44 px | 26–30 px |
| Navigation/caption | 14–16 px | 14–16 px |

Use fluid sizing within these ranges and preserve browser zoom. Keep the article around 64 characters wide. Uppercase is for brief labels and selected display headings, not long paragraphs or personal names. Preserve Turkish spelling and verify `İ ı Ş ş Ğ ğ Ç ç Ö ö Ü ü` in the actual font files and fallbacks.

Font references: [Barlow official project](https://github.com/jpt/barlow), [Source Serif 4 official specimen](https://adobe-fonts.github.io/source-serif/). Self-host necessary webfont files and retain their license notices.

### Spacing, surfaces, and texture

Use an 8 px rhythm: 8, 16, 24, 32, 48, 64, 96, and 128. Start with roughly 24 px paragraph spacing; 96–128 px between major desktop chapters; 64–80 px on mobile.

Use rectangular surfaces, fine rules, minimal corner rounding, and no floating card shadows. Portraits and documents are placed in the editorial grid rather than displayed in a generic card wall. Empty margins are intentional when no exhibit is needed.

Very faint grain is allowed only in spacious chapter-opening or background areas. Do not put noisy texture behind body text, small captions, or evidence screenshots. Small registration marks and numbered figure captions supply enough archival character. Avoid excessive glassmorphism, fake paper damage, repeated military interfaces, gradients across prose, or decorative maps without useful geographical information.

## 5. Single-page information architecture and desktop composition

### Final page sequence

1. Hero artwork, exact title, and date.
2. Numerical summary immediately after the hero.
3. Complete original introduction, including the developer/title paragraph.
4. Conflict at a Glance historical information panel, with a compact linked people index.
5. Timeline overview and the directly visible complete 43-event chronology.
6. Origins of the conflict.
7. Turkish community mobilization, with the Three Demands in their original narrative position.
8. Emrah Safa Gürkan joins the boycott.
9. The Steam offensive, including the article's international community reactions.
10. The TommyKay controversy.
11. Paradox's first response.
12. Paradox's second response, Rule 4, and the article's explanation of unmet demands.
13. Playrion cyber escalation.
14. Valve intervenes.
15. International support and `[Neolithic]To the End`.
16. Full original aftermath, demands ledger, then separately labeled 26 September update.
17. Numbered sources, credits, and publication/update information.

The inserted orientation tools supplement the article. They do not replace paragraphs or change the ordering of its narrative sections. The Three Demands section is an expanded treatment of the existing list, not a second replacement account. The aftermath ledger is an additional summary following the full conclusion.

### Desktop reading grid

At approximately 1440 px viewport width, use a centered editorial shell around 1240–1280 px wide:

- Left: approximately 144–160 px for a sticky chapter/date rail.
- Center: approximately 640–680 px for the article, with an additional character-width cap.
- Right: approximately 240–280 px for contextual portraits, source notes, or documents.
- Distribute the remaining width as comfortable gutters.

The hero, timeline, Three Demands, numerical exhibits, and selected chapter openings may span the wider content area. Keep long prose to the reading measure even inside a wide section.

The right margin remains empty when there is no useful supporting item. Do not force all paragraphs to have an illustration or annotation.

### Same-page navigation

Use a slim opaque header with the title/wordmark and these links:

| Navigation item | Same-page destination |
|---|---|
| Chronicle | `#chronicle` at the beginning of the full narrative introduction |
| Timeline | `#timeline` |
| Demands | `#three-demands` |
| Sources | `#sources` |

Give the origins chapter its own `#origins` anchor and offer a clearly visible **Continue to the narrative** link near the start of the timeline. This helps returning readers bypass a long chronology without hiding any of it.

The left rail provides chapter links and current-chapter highlighting. It may display the chapter's documented date or range. The article has thematic passages and dated snapshots, so the rail must not imply that every subsequent paragraph advances calendar time.

Use ordinary fragment links. A small enhancement may highlight the current section; passive scrolling must not repeatedly alter the URL or fill browser history. Explicit navigation preserves normal browser Back behavior. Account for sticky navigation height at anchor targets.

Assign stable, unique ASCII fragment IDs to chapters, demands, events, people, quotes, and references. Examples include `#person-jahrein`, `#quote-paradox-failed`, and `#event-rule-four-rewritten`. Keep IDs stable when display wording or citation numbering changes. Repeated mentions of a person link back to the canonical identified occurrence rather than duplicating an ID.

External original sources may open their source websites. All content navigation within this publication remains within the single page.

## 6. Section-by-section design and implementation blueprint

### 6.1 Hero: the confrontation

Present MainArt.png as a panoramic plate against charcoal/black. Preserve the Turkish crowd and Atatürk at left, the blue institutional imagery at right, and the central rupture and embedded title. Keep controls and interface copy away from the illustrated title.

Use a modest selectable HTML H1 carrying the exact event title in the opening masthead. Do not overlay a second enormous title on the already lettered artwork. Place September 2026 and the record-coverage label in the opening's surrounding editorial space.

On desktop, retain the approximately 16:9 image composition. The image and masthead can fill roughly a screen, but natural content dimensions take precedence over a forced viewport-height crop. Cap enlargement to avoid visibly soft results from the 1672 px original.

On mobile, show the full composition at screen width, followed by a readable title/date band. Do not use a narrow portrait crop that removes a side or cuts the embedded title. Provide a direct full-image asset link for closer inspection without creating a new article page.

Identify the hero as illustration, not documentary proof. Its pictured review graphs, dialogue, and tactical objects are artwork, not source records.

### 6.2 Numerical summary: directly after the hero

Create a short ruled strip on charcoal with five figures. It precedes the original introduction. Use display numerals and small readable explanatory labels; do not animate counts.

| Headline | Required explanation |
|---|---|
| **6 DAYS** | Record covered: 21–26 September 2026, counted inclusively. This is coverage, not the completed duration of the conflict. |
| **300+ DISCORD BANS** | Turkish users banned on the official HOI4 Discord, as described in the supplied account. |
| **25,034 RECENT REVIEWS** | Recorded Steam snapshot, 25 September. Do not imply all these reviews were negative or all were written by Turkish users. |
| **1 POLICY REWRITTEN** | Discord Rule 4, as recorded on 25 September. |
| **3 DEMANDS** | Not fully satisfied in the supplied record; status through the 26 September chronology entry. |

Use **not fully satisfied**, rather than calling the demands entirely unanswered: the narrative includes responses, acknowledgment, and a rule change while distinguishing the requested remedies.

On desktop, arrange five aligned columns with subtle separators. On mobile, use a two-column grid with the final demand item spanning the row. Let labels wrap, and keep explanations visible rather than hiding scope or dates in tooltips.

Link the figures to their relevant passages where helpful. Derive repeated values from the same structured records, preserve the dates wherever numbers recur, and later attach actual supporting references when supplied.

### 6.3 Introduction

Render both original introductory paragraphs in their original order. Use quiet prose after the dense hero and compact statistics. Do not shorten the introduction to a new marketing subtitle or move its developer/title paragraph out of the opening.

### 6.4 Conflict at a Glance

Build a historical-war-style information panel: a strong heading, paired color rule, and compact label/value rows. The character comes from its organized record, not imitation military controls.

| Field | Planned contents |
|---|---|
| Date | September 2026; record covers 21–26 September; no declared end date |
| Main Platforms | Official HOI4 Discord, Steam, X, Reddit, Twitch, Paradox support; identify Playrion support within the later escalation |
| Main Parties | Turkish gaming community; Paradox Interactive and official HOI4 moderation; distinguish Valve and other outside actors from the two main parties |
| Trigger | The account-restoration condition concerning the Atatürk photograph and the ensuing historical accusation, preserving the distinction from the original spam ban |
| Turkish Demands | Explicit apology; moderator removal; withdrawal/correction of the historical accusation; link each label to the complete demand |
| Recorded Outcome / Current Status | Inconsistent enforcement acknowledged and Rule 4 rewritten; three demands not fully satisfied in the supplied record; explicit date boundary |

On desktop, place core facts on the left and demands/status on the right within a single bounded information panel. On mobile, use one semantic label/value sequence. This is descriptive content, so use a definition list or comparably accessible structure rather than a decorative two-column table that breaks reading order.

A compact **People in this account** index follows within the orientation area. Link Yiğit Emre Katran, CarrieRTV/Sefa, Maxmarine/Agora, MuratAbiGF, Yusuf Kayaalp, Jahrein, Prof. Dr. Emrah Safa Gürkan, chakerathe, Batya, and TommyKay to their contextual appearances. No separate people page or portrait carousel.

### 6.5 Complete timeline

Begin with a compact six-date overview, 21 through 26 September. On desktop this date selector is horizontal. On mobile it wraps into a fully visible compact grid or vertical list; no hidden dates requiring horizontal swiping.

Immediately below it, render all 43 chronology entries in a continuous vertical timeline. Every date group and event remains visible. The date overview scrolls to groups; it does not filter or replace the list.

On desktop, use large dates in a narrow left column and compact event rows to the right. A single thin vertical rule connects groups. On mobile, dates move above each day's rows and the line sits beside the text. Keep every row in normal document order.

Each record contains a stable ID, actual supplied date or date range, source wording, provenance/actor information where useful, related narrative anchor, and any supplied source references. Every event appears exactly once in the main chronology.

Group ranged entries under their starting date while displaying the complete range, such as 21–22 September. Preserve original ordering among entries with the same start date unless a later explicit source/approved edit establishes a more precise order. Do not invent hours or turn a range into a single-day assertion.

Use compact typography, shared date headings, and restrained spacing to manage the length. Do not solve length by concealing events. Offer the same-page narrative continuation link above and below the timeline. Event links target the relevant article passage; multiple events may share a paragraph destination where that is the supplied article's actual granularity. The 26 September event targets the separately dated update.

The full chronology must remain readable with JavaScript disabled, in print, and during browser find. Provenance labels can be shared by a coherent cluster when repeating them on every row would add clutter.

### 6.6 Origins

Place a large 21 / SEP in the date margin. Keep the prose central and the chakerathe image modestly sized in the right margin beside its first meaningful mention.

Emphasize the existing distinction between the original spam ban and the later restoration condition without rewriting it. Preserve the historical-accusation discussion and its attribution. Give the central-issue passage a small amount of additional breathing room.

Use the supplied image with a plain name-and-role caption and neutral framing. Do not invent a Discord conversation layout or an avatar image for Katran. Actual screenshots can later become attributed exhibits.

### 6.7 Mobilization and the Three Demands

Open with 22–23 / SEP and a leading red rule. The reading column continues; contextual images make the section feel increasingly populated.

Maxmarine receives the principal mobilization portrait. MuratAbiGF and Yusuf Kayaalp receive smaller contextual images beside the boycott and commercial-relationship passages. Jahrein receives a small image beside the management-contact passage. CarrieRTV/Sefa and Yiğit Emre Katran remain prominent through names and narrative despite no supplied portraits.

The reported 300+ bans can appear as a dated/contextual margin annotation, without an animated counter or implied real-time total.

At the existing list of demands, widen the layout into the Three Demands section. Use three desktop columns, thin dividers, the burgundy-black surface, and large red 01 / 02 / 03 numerals. Each has a short label plus the full original demand wording. On mobile, stack three rows and allow the longer third demand enough space.

Render the article's existing list here once. Continue the original following paragraphs immediately afterward. The exact demand wording has priority over equal card heights or artificially short labels.

### 6.8 Emrah Safa Gürkan

Slow the rhythm with the largest contextual portrait. At desktop widths the portrait sits left of the prose; on mobile, a moderate-width image precedes the passage. Keep the original article's discussion intact.

Do not present a paraphrased statement as a direct quotation. Use a quotation treatment only for exact quoted source wording actually supplied.

### 6.9 Steam offensive

Expand the visual field around the recorded 25 September snapshot: 25,034 recent reviews, 7% positive, and the recorded Overwhelmingly Negative classification. Keep the date next to the figures, including when reused outside this chapter.

A simple proportional bar may visualize the supplied 7% share. It must be labeled as that snapshot, never an invented trend chart or a count of Turkish reviews. Preserve the full article text and the international-community reaction paragraphs in this section.

Reserve an exhibit placement for a genuine dated Steam screenshot. Do not reconstruct the Steam interface as if it were documentary evidence.

### 6.10 TommyKay controversy

Return to the normal reading measure. Keep the remarks, reactions, voice conversation, and reported seven-day suspension together with their original attribution.

Use the established Jahrein identification rather than another oversized portrait. TommyKay remains text-only until an appropriate asset is supplied. Insulting remarks remain at documentary reading scale and do not become a monumental decorative quote.

### 6.11 First Paradox response

Introduce 24 / SEP with the PARADOX RESPONSE label and a blue-black document surface. On desktop, pair article analysis on the left with a quoted excerpt at right. On mobile, place the excerpt after its introductory paragraph.

The document panel has a cold-blue upper rule, named speaker, date, and actual source link when available. Emphasize the supplied quotation about inconsistent enforcement. The article's paraphrase and commentary remain outside the quotation panel.

Do not style the author's summary as a full original statement. Until original statement material is supplied, label the panel as a quoted excerpt reproduced in the supplied article.

### 6.12 Second response, Rule 4, and what remained unmet

Introduce 25 / SEP and set the exact supplied quotation, “This should have been prevented, and we failed.”, in large warm-white serif text within the blue-black panel. Attribution sits directly beneath it.

Continue all paragraphs about support messages, the rewritten rule, and the transition period. A structured policy summary may restate only what the supplied article describes, clearly labeled as a summary. An exact before/after rule comparison awaits both original rule texts.

Return to charcoal for the full explanation of why the demands remained unsatisfied. Short red margin labels can identify apology, retraction, and moderator accountability without replacing the prose. Preserve the distinction between accepting responsibility and meeting the specific demands.

### 6.13 Cyber escalation

Use a steel divider, explicit date, and REPORTED CYBER INCIDENT label. Present HACKED BY TURKS as the reported email subject in a compact document excerpt, surrounded by the article's context.

Keep the 2.2 million account figure explicitly attached to the attackers' claim wherever displayed. It must not become an unqualified headline statistic. Preserve the article's acquisition/sale timing discussion without adding a new conclusion.

No terminal animation, flashing warning, credential imagery, or hacker-themed background. Do not imply collective responsibility for the Turkish community.

### 6.14 Valve intervention

Use PLATFORM INTERVENTION with steel-gray visual treatment. Add a compact explanatory visual alongside the existing prose: reviews remain visible, while the affected period is excluded from the default score calculation, using the article's qualifications.

Use two clear labeled boxes or a simple text diagram. Do not invent before/after aggregate ratings or make a stronger claim that all reviews were retained or removed.

### 6.15 International support

Return to a warmer charcoal surface with a restrained red rule and INTERNATIONAL REACTION label. Keep the supplied developer diary title, quotation, and explanation intact.

Use a genuine diary capture or the actual in-game portraits when supplied. GE_Ataturk.jpg is not a substitute for those in-game assets and must not imply what the developer added.

### 6.16 Aftermath and returning demands ledger

Render the full original aftermath first. Then return to the 01 / 02 / 03 visual system as a status ledger:

| Demand | Status in the supplied article, as of 25 September |
|---|---|
| Explicit official apology | Not issued as demanded |
| Moderator removal | No removal publicly announced |
| Historical accusation withdrawn/corrected | No public retraction/correction described |

Do not turn a lack of public announcement into proof that no internal action occurred. Keep dates and provenance next to the status.

Follow with the distinct 26 September chronology update stating the continuing unresolved status in that supplied record. Preserve original wording or an approved translation; do not rewrite the article's own end date.

End the narrative with open space and the separated red-and-blue rules. The conclusion is unresolved accountability, not a victory screen.

### 6.17 Sources and credits

Place the complete reference list, image credits, editorial attribution, and publication/update information in the same page. Give them the same typographic care as the narrative. Do not create a separate sources or credits route.

## 7. Portraits, quotations, and document treatments

### Portrait system

Use consistent rectangular framing and restrained scale. Photographs can receive a light, consistent grayscale or saturation treatment. Do not change identities or fabricate period appearance. Illustrated avatars remain visibly illustrations rather than being forced to look like photographs.

Place images at the point where a person becomes important to the narrative. The compact linked people index provides a directory; it does not repeat all images as a gallery. Evidence screenshots retain their original colors and proportions and remain visually distinct from editorial portraits.

### Quotation system

| Material | Appearance | Attribution requirement |
|---|---|---|
| Exact article pull quote | Large serif on charcoal, without a card | Identify the passage; do not imply it is a speaker quote |
| Official quoted excerpt | Blue-black rectangular panel and blue upper rule | Speaker, role if supplied, date, document/source link |
| Community quotation | Warm-white serif with a red margin rule | Speaker, platform/date when supplied, source |
| Reported cyber-message excerpt | Neutral document excerpt | Label reported subject/message and the article's qualification |

Do not convert indirect speech into direct quotation. Do not merge fragments from different statements into a single invented document. Repeated quotes used for visual emphasis should not make the main narrative harder to follow; retain the complete original passage and use repetitions sparingly.

### Evidence exhibits

For genuine screenshots: preserve a readable full version, show a clearly captioned preview, record its date/source, and provide an image link for inspection. Do not add fake letterheads, verified marks, seals, or source credentials. Missing evidence uses the article's existing prose until a real asset exists, not a fabricated replacement.

## 8. Citation and reference system

The supplied article has no reference URLs. A real source inventory is a required content-preparation activity; this plan does not claim that sources have been assembled or independently checked.

- Use numbered references next to the relevant claim or exact quotation.
- Each citation is a normal same-page link to a stable reference ID.
- Reference display numbers can follow order of first appearance; their stable IDs do not depend on those numbers.
- Store each source once and reuse its ID. Give repeated citations unique backlink targets.
- Include author/organization, title, date where known, platform, original URL, and archive URL if available.
- Provide readable link text and return links to citing passages.
- Distinguish source publication dates, event dates, and access/archive dates.
- Direct screenshot captions connect to their source records, rather than presenting an image as self-authenticating.
- A hover/focus preview is optional enhancement. The baseline citation jump and return links work on keyboard, touch, and with JavaScript disabled.
- External original sources may leave the site; citations, reference navigation, and historical content remain within index.astro.
- Do not publish broken placeholder links, invented URLs, empty numbered references, or labels that imply unavailable verification. Track missing records in content metadata; if still absent at publication, state the source limitation plainly in the Sources section.

## 9. Responsive behavior

| Layout range | Required behavior |
|---|---|
| Wide desktop, roughly 1200 px and above | Three-part editorial grid, left sticky rail, right contextual margin, full-width exhibits where appropriate |
| Tablet / narrower desktop, roughly 800–1199 px | Two-part reading layout where space allows; move right-margin exhibits into the flow; simplify the rail |
| Mobile, below roughly 800 px | One column, 20–24 px gutters, compact chapter/Contents navigation, stacked demands and document panels |

Breakpoints are selected to preserve readable content rather than specific device brands. Below very narrow widths, reduce gutters enough to avoid horizontal overflow while retaining breathing room.

On mobile, use one compact sticky reading bar showing the current chapter and a Contents disclosure. Do not stack a permanent header, date strip, and bottom toolbar over the text. Contents expands as a clear in-page navigation list. It may close after an explicit selection; move focus appropriately.

All timeline entries remain visible on mobile. Metadata wraps, long names and URLs break safely, images preserve intrinsic proportions, and no horizontal drag gesture is required to access historical content.

The demands stack in numerical order. Statement excerpts follow the paragraph that introduces them. Portraits appear next to the relevant passage in the document's reading order. Statistical explanations remain visible.

## 10. Accessibility and motion

- Semantic header, navigation, main/article, sections, figures, and footer; one HTML H1 and a coherent heading hierarchy.
- A visible-on-focus skip link and descriptive navigation landmarks.
- Ordinary links for navigation and buttons/disclosures only for actions.
- Keyboard access and visible focus for every control. Current navigation state is conveyed in text/semantics as well as color.
- Minimum 44 px comfortable touch targets for primary controls and sufficient separation for dense event/reference links.
- WCAG AA contrast targets: 4.5:1 for ordinary text, 3:1 for large text, and 3:1 for required control boundaries/state indicators. Verify actual pairings during implementation.
- All relevant provenance and status distinctions have explicit text labels; red/blue is never the sole information channel.
- Meaningful alt text for content images. Decorative rules and textures are ignored by assistive technology. The hero's illustration description does not present its embedded depicted messages as verified evidence.
- Correct English page and per-entry language metadata for the approved English chronology; preserve Turkish glyphs in names.
- Semantic machine-readable dates alongside visible dates, preserving ranges.
- Usable reflow at 320 CSS px and browser zoom; no clipped text or obscured anchor targets.
- The complete article, chronology, and references are pre-rendered and remain accessible without JavaScript.
- Print styles remove sticky controls and decorative backgrounds, use dark text on light paper, and include all 43 timeline entries, the full article, and references.

Motion is restrained: a short 180–240 ms fade and, at most, an 8 px rise for selected chapter-opening elements. Body text and events are visible immediately; animation must not be required to reveal content. The active navigation rule may transition quietly. Optional smooth scrolling respects reduced-motion preferences.

Disable nonessential animation under reduced motion. No scroll locking, scroll-jacking, parallax, autoplay media, artificial loaders, flashing, animated counters, or essential hover-only interactions.

## 11. Asset usage map and production locations

All paths below `src/assets/` are planned production inputs to be created during implementation, not files already built in this planning phase. The original image filenames remain preserved in the supplied material.

| Original asset | Inspected size | Use and crop | Planned production location |
|---|---|---|---|
| MainArt.png | 1672 × 941 | Dominant panoramic hero; preserve both sides and embedded title; use full composition on mobile; identify as illustration | `src/assets/images/hero/main-art.png` |
| chakerathe.jpg | 400 × 400 | Contextual origins image, about 160–200 CSS px wide; neutral caption and framing | `src/assets/images/people/chakerathe.jpg` |
| emrahsafagurkan.jpg | 530 × 570 | Largest contextual portrait, about 280–320 CSS px wide; historian chapter | `src/assets/images/people/emrah-safa-gurkan.jpg` |
| Jahrein.jpg | 225 × 225 | Small portrait, about 96–112 CSS px wide; no large feature enlargement | `src/assets/images/people/jahrein.jpg` |
| Maxmarine.jpg | 918 × 709 | Principal mobilization portrait; respect the already close framing | `src/assets/images/people/maxmarine.jpg` |
| Muratabigf.webp | 1280 × 720, two views | Use frontal-view crop at left; avoid displaying the paired composition as a dramatic exhibit | `src/assets/images/people/muratabigf.webp` |
| yusufkayaalp.jpg | 900 × 900, illustrated avatar | Small complete avatar beside commercial-relationship passage; preserve illustrated identity | `src/assets/images/people/yusuf-kayaalp.jpg` |
| GE_Ataturk.jpg | 750 × 976 | Omit from launch narrative; reserve original. A future same-page community-art appendix would require approved scope/content | No launch production import |

Future real screenshots belong in `src/assets/images/evidence/` and have caption/source metadata. Do not add generated evidence, substitute unrelated art for actual in-game portraits, or enlarge small supplied photos beyond their useful resolution.

The social-sharing image is a separately composed 1200 × 630 asset derived from the supplied hero. Preserve the artwork's embedded title and avoid a second overlapping giant title. Its production source belongs in `src/assets/images/social/`; resolve the generated output URL for metadata. It is an asset, not another page.

The favicon uses the simple paired red-and-blue rule motif on charcoal and remains legible at small sizes. A small SVG under `public/` is appropriate for this technical icon; article and portrait image inputs still belong in `src/assets/`.

## 12. Technical approach

### Selected stack

Use **Astro with static output**, custom CSS, Markdown/structured content, and a small vanilla JavaScript enhancement for navigation. Do not add React, a client-side router, a backend, a database, a CMS, or a general component library for this scope.

| Option considered | Decision |
|---|---|
| Plain HTML/CSS/JavaScript | Technically suitable for one fixed page, but manual coordination of the long article, events, people, citations, and optimized media would increase maintenance work |
| Vite with vanilla JavaScript | Useful tooling but would still require establishing the publication/content-rendering structure |
| Astro | Selected for content rendering, reusable editorial components, static output, and local image processing with small browser-side code |
| Eleventy | A credible alternative, but no project-specific advantage sufficient to change the selected approach |

Astro supports Markdown and defaults to no client JavaScript for components unless it is added. Its static output fits GitHub Pages. References: [Astro architecture](https://docs.astro.build/en/concepts/why-astro/), [Markdown in Astro](https://docs.astro.build/en/guides/markdown-content/), [Vite static deployment](https://vite.dev/guide/static-deploy). Consult current official setup details when implementation starts; do not pin an unverified version from this plan.

### Content model

- `chronicle.md`: full publication narrative, preserving the archived prose.
- `events.json`: all 43 events, with stable IDs, dates/ranges, the exact approved English wording, the separately preserved `originalTurkish` record, provenance, actor IDs where supplied, narrative targets, and source IDs.
- `people.json`: canonical names, roles as supported, first-appearance IDs, image keys, and captions. Preserve spelling and aliases.
- `sources.json`: actual source records, stable IDs, bibliographic metadata, and URLs.
- `chapters.json`: stable section IDs, date labels, original heading associations, and presentation choices.
- `media.json`: image keys, intended crop, alt text, caption, source/credit, and placement.
- Site metadata: title, description, actual publication/update dates, editorial attribution, deployment origin, and coverage boundaries.

Use one source for repeated figures, demand identities, and reference records. Do not separately hard-code the same status or Steam count in multiple components. Presentation components must not own rewritten copies of historical paragraphs.

Use build-time content validation for required IDs and link relationships. Avoid fragile raw-string substitutions to split or rewrite the article. Preserve the original list and paragraph order when rendering custom sections. Any parser/build helper is a technical project file, not an additional reader-facing route.

### Maintenance workflow

An editor adds or updates a structured event, provides actual source records, associates it with the relevant narrative passage, and supplies any image input and credit. New editorial narrative or revised historical conclusions require explicit user authorization, consistent with the preserved-source policy.

The initial 43 entries must remain accounted for. Future additions may increase that count through an approved content update. Old deep links remain valid. Updating metadata or images should not require redesigning the page.

## 13. Proposed repository structure

This is the target implementation structure. Apart from the preserved archive and this plan, it does not imply that site code has been created.

```text
Turko-ParadoxWar/
├── archive/
│   ├── The Turko–Paradox War.md
│   ├── Timeline.txt
│   └── Timeline.tr.original.txt
├── docs/
│   └── TURKO-PARADOX-WAR-SITE-PLAN.md
├── src/
│   ├── assets/
│   │   └── images/
│   │       ├── hero/
│   │       ├── people/
│   │       ├── evidence/
│   │       └── social/
│   ├── content/
│   │   ├── chronicle.md
│   │   ├── events.json
│   │   ├── people.json
│   │   ├── sources.json
│   │   ├── chapters.json
│   │   └── media.json
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── NumericalSummary.astro
│   │   ├── ConflictPanel.astro
│   │   ├── Timeline.astro
│   │   ├── Chapter.astro
│   │   ├── Demands.astro
│   │   ├── Portrait.astro
│   │   ├── Statement.astro
│   │   ├── References.astro
│   │   └── ReadingNavigation.astro
│   ├── layouts/
│   │   └── ChronicleLayout.astro
│   ├── pages/
│   │   └── index.astro
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── global.css
│   │   └── print.css
│   └── scripts/
│       └── navigation.js
├── public/
│   ├── fonts/
│   ├── favicon.svg
│   └── robots.txt
├── .github/
│   └── workflows/
│       └── deploy.yml
├── astro.config.mjs
├── package.json
├── package-lock.json
└── README.md
```

Configuration, content-schema, verification, license, or asset-processing files may be added as technical implementation requires. They do not create additional article routes. `dist/` is generated output, not the content-authoring source. Keep archives and the planning document outside the published output.

## 14. Performance considerations

- Import production images from `src/assets/images/` using Astro's image facilities so responsive derivatives and dimensions can be produced at build time.
- Preserve the original files and use appropriately sized modern web formats with suitable fallbacks.
- The supplied hero is about 3.09 MB. Deliver an optimized responsive derivative rather than automatically sending the original PNG to every visitor.
- Give the above-the-fold hero eager loading/high priority as appropriate; do not lazy-load the principal opening image.
- Lazy-load lower-page portraits and evidence images. Reserve image dimensions to avoid layout shifts.
- Ensure optimization does not destroy the hero's embedded lettering or make evidence screenshots unreadable. Do not upscale low-resolution portraits.
- Self-host only necessary font files, retain Turkish glyph coverage, use fallback stacks and font-display behavior that keeps text visible.
- Render the complete article, timeline, and references at build time. Do not fetch the historical record after page load.
- Use CSS for layout and simple transitions. Browser JavaScript should be limited to the navigation enhancement and any justified small utility.
- Avoid live social embeds, analytics packages, charting frameworks, animation libraries, and icon libraries unless later scope explicitly requires them.

Planning budgets, to be measured during implementation: initial mobile transfer around 1 MB where image quality permits; compressed site-authored JavaScript below roughly 20 KB; LCP around 2.5 seconds or better and CLS below 0.1 on an agreed mobile test profile. These are targets, not measured results. Adjust encoding within the design before sacrificing content fidelity or hiding the timeline.

## 15. GitHub Pages deployment and metadata

Use GitHub Actions to build Astro's static output and deploy the generated artifact to GitHub Pages. GitHub Pages hosts static files; no server process or runtime API is required. References: [GitHub Pages overview](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages), [Astro GitHub Pages guide](https://docs.astro.build/en/guides/deploy/github/).

During implementation:

1. Confirm the real repository owner/name and intended public URL. Do not invent the canonical URL.
2. Select a currently supported Node version and Astro release, and commit the package lockfile.
3. Configure Astro static output and the real site origin. For a repository project site, configure the repository base path; for a root site/custom domain, use the corresponding root configuration.
4. Keep local content navigation fragment-based and account for the base path in assets and absolute metadata URLs.
5. Configure a GitHub Pages workflow with the permissions required for artifact deployment. Build and deploy `dist/`, not the raw workspace, `archive/`, or `docs/`.
6. Verify the generated site at the actual base path before public deployment. No SPA fallback or client router is needed for the one-page design.
7. Check the deployed hero, fonts, all main anchors, a representative event/person/reference fragment, and the social image URL.

Provide the exact site title, an approved concise description, canonical URL, Open Graph title/description/image, social-card metadata, favicon, language, and appropriate article metadata. Use only real editorial attribution and publication dates. A sitemap can contain the single canonical page; fragments are not separate sitemap pages.

The social image URL must be absolute and resolve to a deployed optimized/generated asset. Its file must not introduce a second article page. A custom domain's technical CNAME file can be added if the user selects one later.

No deployment or site code is authorized by this planning task itself; implementation follows when the user asks to build.

## 16. Development phases and acceptance criteria

### Phase 1 — Preserve and model the content

Preserve the original documents, establish the publication copy, extract all 43 approved English timeline events, retain the initial Turkish version separately, assign stable IDs, record date ranges, and inventory source links and media credits. Create the relationship between numerical summaries and their dated source records.

Acceptance: archived documents match the supplied originals; every original paragraph/list item and all 43 events are accounted for; no invented dates, quotations, or URLs.

### Phase 2 — Establish the visual system

Implement the single page's typography, color tokens, hero, immediate numerical strip, conflict panel, and a representative reading chapter. Establish the demands block, portrait frame, provenance label, and statement panel as components on that same page.

Acceptance: desktop and mobile compositions follow this plan; the hero preserves its composition; numeric qualifiers are visible; production images are imported from `src/assets/`.

### Phase 3 — Assemble the complete chronicle

Render the entire 43-event timeline openly, all original article sections in order, contextual portraits, both response treatments, the full aftermath, dated update, and references. Add only genuine available evidence exhibits.

Acceptance: there is one reader-facing route; no hidden event groups; all narrative text is present; all figures and statuses retain their scope/date; absent evidence has not been fabricated.

### Phase 4 — Navigation, accessibility, and responsive behavior

Complete ordinary fragment navigation, chapter tracking, mobile Contents, stable event/person/quote/reference links, citation return links, keyboard focus, reduced-motion behavior, zoom/reflow, and print styling.

Acceptance: all main navigation stays on the page; explicit links and browser Back behave predictably; the complete record remains readable without JavaScript and in print; desktop/tablet/mobile layouts and keyboard operation pass review.

### Phase 5 — Publication preparation

Optimize images, prepare licensed local fonts, create the favicon and social image, configure metadata, and add the static GitHub Pages workflow using the actual repository URL.

Acceptance: output contains one reader-facing HTML page, correct base-path assets and canonical metadata, and no archived/planning documents unintentionally published. Performance budgets are measured and material misses addressed.

### Phase 6 — Final verification and release

Review content fidelity, every timeline entry, date boundaries, reference targets, image captions, responsive visual quality, and deployed links. Publish when implementation/deployment is authorized, then verify the public result.

Use meaningful validation for this scope: a content-fidelity check; an event-count/unique-ID check; fragment/reference relationship checks; and a check for unintended HTML routes. Combine these with visual, keyboard, zoom, print, no-JavaScript, and performance review. Do not write large test suites that simply mirror static styles.

Final completion requires the single-page structure and fully visible chronology, not merely a visually polished first viewport.

## 17. Remaining asset/content needs

### Highest-value documentary additions

- Original moderation/appeal conversation links or captures, with provenance and dates.
- Both Paradox statements, including complete original texts and links.
- Original and revised Rule 4 text for a precise comparison.
- The dated Steam review snapshot and Valve's review-activity notice.
- Sources for creator interventions, boycott actions, and the TommyKay/Jahrein sequence.
- Playrion incident material supporting the article's report and claimed account figure.
- The `[Neolithic]To the End` developer diary and actual in-game Atatürk portrait assets/captures.
- The scholarly reference mentioned in the origins section and supporting references for the historical narrative's other source-dependent passages.

### Publication and presentation inputs

- English timeline wording has been supplied and approved by the user; no timeline translation remains outstanding.
- Image credits/provenance and any supplied reuse information.
- A higher-resolution Jahrein portrait for greater flexibility; the current small portrait is sufficient for the specified treatment.
- Actual editorial/byline details, publication date, repository URL, and any chosen custom domain.
- Original hero artwork without embedded lettering would offer future compositional flexibility, but is not required and is not part of the selected launch design.

Additional portraits are optional. Missing portraits use text identification; missing screenshots use the existing article prose. Documentary sources and genuine exhibits improve this publication more than extra decorative imagery.

No missing item authorizes fabricated material, unapproved historical rewriting, separate content pages, hidden chronology, or a departure from The Unresolved Record.

## 18. Approval record

26 September 2026: The user retained The Unresolved Record concept and requested this permanent design-authority document. Final approved adjustments: exactly one continuous reader-facing page; all 43 timeline events directly visible; stronger historical conflict information panel; numerical summary immediately after the hero using only supplied figures; explicit provenance labels; production images under Astro `src/assets/`; original documents preserved under `archive/`.

Later design changes must be explicitly approved by the user and recorded here.

26 September 2026 — English chronology amendment: the user explicitly supplied replacement Timeline.txt content in English and instructed implementation to continue. The 43 English entries are now the visible chronology authority. Update Timeline.txt in both current source locations, preserve the initial Turkish file separately, keep all stable event IDs/date ranges, and use the approved English 26 September update. The single-page architecture, visual concept, main article, and all other requirements remain unchanged.

26 September 2026 — Finalization amendment approved by the user: populate all 13 documentary groups with the 24 supplied source links; retain Image Credits unchanged; remove the public Publication Record and its unused presentation code/data; end the page with sources and image credits; use the exact final English chronology, including unitalicized [Neolithic]To the End. These explicit final instructions supersede earlier pending-link and Publication Record requirements. The visual concept and single-page structure remain unchanged.
