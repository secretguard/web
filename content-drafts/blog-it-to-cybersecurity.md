---
title: "From IT Support to Cybersecurity: A Concrete Starting Plan"
description: "A practical, mostly free roadmap for moving from IT support, helpdesk, or development into cybersecurity, including exactly where to start and how to build a lab habit that actually sticks."
canonical: https://sarathg.me/blog/it-to-cybersecurity.html
---

# From IT support to cybersecurity: a concrete starting plan

If you work in IT support, helpdesk, sysadmin work, or general development, you already understand how systems behave, how networks are put together, how software gets deployed and breaks. That's a real advantage, most beginner security material spends weeks building exactly that context, and you can skip past it. Here's a concrete plan for what to build next, and how to make it stick.

## Step 1: Security fundamentals, specifically

Knowing how a network works is not the same as knowing how it's attacked. This layer has to be built deliberately.

**TryHackMe's "Pre Security" and "Complete Beginner" paths** are free or very low cost, and structured specifically for this transition, they assume general IT knowledge and build security-specific concepts on top of it, which fits your starting point better than a path built for someone with zero technical background.

Work through this before touching offensive tooling. It's tempting to skip straight to "hacking" content, resist that, the fundamentals underneath it are what make the tooling make sense later instead of feeling like memorized commands.

## Step 2: Build a lab habit that survives past week one

This is the more common failure point than knowledge gaps. People start strong, do a few guided labs, then the habit falls apart once the material stops being guided.

A structure that actually holds up:

- **Fix a specific day and time each week**, not "whenever I have time". Treat it like a recurring meeting with yourself.
- **Start with HackTheBox's "Starting Point" tier**, free, built as a genuinely guided on-ramp before the harder unguided machines. Do these fully, including writing up what you did, before moving to retired machines without guidance.
- **Track it somewhere visible**, a simple log of what you attempted and what happened, even a plain text file. The habit dies quietly when there's no record and no visible streak to protect.

## Step 3: Notes that would survive someone else reading them

Not notes for remembering commands. Notes structured well enough that another engineer, or a future interviewer, could follow your reasoning: what the target was, what you tried, what worked, why. Publish some of these publicly if you're comfortable, a personal blog or GitHub is enough, this is also, separately, how you start building a visible track record before you have a job title that does it for you.

## Step 4: The real milestone to aim for

Not a certificate. Being able to take a target you've genuinely never seen before, work it within a reasonable time, and explain clearly afterward why what you found matters and how you got there, without a guide open in another tab.

If you want a target built specifically to give no obvious hint of what's wrong, once the basics above feel solid, I built and maintain [ShopEasy](https://sarathg.me/shopeasy.html), a free vulnerable API lab, and my broader public labs are at [labs.sarathg.me](https://labs.sarathg.me). Both are free whether or not you ever talk to me.

## Why certifications alone don't get you past this

A certification validates that you covered the material in a controlled format. It doesn't validate that you can apply it to something you haven't seen before, because that isn't what a certification exam is built to test. This is why "I got certified and still can't get past the technical interview" is such a common experience specifically for people coming from IT backgrounds, the certification did its job, it just was never the whole job.

## If you've done this and you're still stuck

Some people build the lab habit, do the fundamentals, and still hit a wall they can't diagnose on their own, usually because nobody is reviewing the actual approach, not just whether the exercise got completed. That's the specific point where [1:1 mentorship](https://sarathg.me/coaching/) tends to help, not as a substitute for the steps above, but for when the practice alone isn't surfacing what's actually going wrong. The [mentorship page](https://sarathg.me/coaching/) has the details, and the first conversation costs nothing.
