/* ═══════════════════════════════════════════════════════════════
   blog/build-index.mjs — regenerates the static card list in
   blog/index.html from blog/posts.mjs.

   Run with `npm run build:blog` from the repo root.

   The site has no content build step and this does not introduce
   one: it is a local convenience that writes plain static HTML into
   a checked-in file. The committed index.html is complete on its own
   and never depends on this script at request time. Nothing about
   the page requires JavaScript to render.

   Usage:
     node blog/build-index.mjs           regenerate
     node blog/build-index.mjs --check   verify index.html is current
                                         (exit 1 if not) — no writes
═══════════════════════════════════════════════════════════════ */

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { POSTS } from "./posts.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const INDEX = join(HERE, "index.html");

const START = "<!-- AUTO-GENERATED:posts — regenerate with `npm run build:blog`, do not hand-edit -->";
const END = "<!-- /AUTO-GENERATED:posts -->";

/** Minimal HTML text escaping for values interpolated into markup. */
const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const LONG_DATE = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const formatDate = (iso) => LONG_DATE.format(new Date(`${iso}T00:00:00Z`));

function renderCard(post) {
  return `        <li>
          <a class="post-card" href="${esc(post.slug)}.html">
            <p class="post-card-meta">
              <time datetime="${esc(post.date)}">${esc(formatDate(post.date))}</time>
              <span class="sep" aria-hidden="true">·</span>
              ${esc(post.readingMinutes)} min read
            </p>
            <h2 class="post-card-title">${esc(post.title)}</h2>
            <p class="post-card-desc">${esc(post.description)}</p>
            <span class="post-card-more">
              Read post
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
          </a>
        </li>`;
}

function render(posts) {
  return posts.map(renderCard).join("\n");
}

const html = await readFile(INDEX, "utf8");

const startAt = html.indexOf(START);
const endAt = html.indexOf(END);
if (startAt === -1 || endAt === -1 || endAt < startAt) {
  console.error(
    `blog/build-index.mjs: could not find the AUTO-GENERATED markers in ${INDEX}.`
  );
  process.exit(1);
}

const before = html.slice(0, startAt + START.length);
const after = html.slice(endAt);
const next = `${before}\n${render(POSTS)}\n${" ".repeat(6)}${after}`;

if (process.argv.includes("--check")) {
  if (next !== html) {
    console.error(
      "blog/index.html is out of date with blog/posts.mjs — run `npm run build:blog`."
    );
    process.exit(1);
  }
  console.log(`blog/index.html is current (${POSTS.length} posts).`);
} else if (next === html) {
  console.log(`blog/index.html already current (${POSTS.length} posts).`);
} else {
  await writeFile(INDEX, next, "utf8");
  console.log(`blog/index.html regenerated (${POSTS.length} posts).`);
}
