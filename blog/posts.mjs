/* ═══════════════════════════════════════════════════════════════
   blog/posts.mjs — the single source of truth for the post list.

   This file is NOT loaded by the browser. The blog index ships its
   cards as static HTML so the section is fully legible to crawlers
   with JavaScript off, which is a stated product constraint. This
   array is the input to `npm run build:blog`, which regenerates that
   static card markup in blog/index.html between the AUTO-GENERATED
   markers.

   TO ADD A POST
   1. Create blog/<slug>.html from any existing post as a template.
   2. Prepend an entry to the array below (newest / most prominent
      first — the array order is the page order).
   3. Run `npm run build:blog`.
   4. Add the URL to sitemap.xml.

   `description` is copied verbatim from the post's markdown
   frontmatter — the listing does not paraphrase post content.
═══════════════════════════════════════════════════════════════ */

export const POSTS = [
  {
    slug: "zero-background-beginner",
    title: "Zero IT Background, Want Into Cybersecurity? The Real First 90 Days",
    description:
      "A concrete, mostly free roadmap for absolute beginners, students or career-changers from unrelated fields, moving into cybersecurity from genuinely zero technical background.",
    date: "2026-08-30",
    readingMinutes: 4,
  },
  {
    slug: "it-to-cybersecurity",
    title: "From IT Support to Cybersecurity: A Concrete Starting Plan",
    description:
      "A practical, mostly free roadmap for moving from IT support, helpdesk, or development into cybersecurity, including exactly where to start and how to build a lab habit that actually sticks.",
    date: "2026-08-30",
    readingMinutes: 4,
  },
  {
    slug: "soc-grc-to-offensive",
    title: "Moving From SOC or GRC Into Offensive Security: A Practical Roadmap",
    description:
      "A concrete, mostly free roadmap for SOC analysts and GRC professionals moving into penetration testing or red team work, including what actually transfers and what to build from scratch.",
    date: "2026-08-30",
    readingMinutes: 4,
  },
  {
    slug: "certified-not-capable",
    title:
      "You're Certified. You Still Can't Work a Live Target. Here's the Fix.",
    description:
      "A practical, free method for closing the gap between passing a certification exam and actually working an unfamiliar target: where to practice, how to structure it, and how to know it's working.",
    date: "2026-08-30",
    readingMinutes: 4,
  },
];
