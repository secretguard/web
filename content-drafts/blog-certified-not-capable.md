---
title: "You're Certified. You Still Can't Work a Live Target. Here's the Fix."
description: "A practical, free method for closing the gap between passing a certification exam and actually working an unfamiliar target: where to practice, how to structure it, and how to know it's working."
canonical: https://sarathg.me/blog/certified-not-capable.html
---

# You're certified. You still can't work a live target. Here's the fix.

You passed the exam. You have the certificate. And the first time someone hands you a real target with no walkthrough, no hints, and no answer key, you sit there not knowing where to start.

This is not a knowledge gap. It is a practice gap, and it is fixable with the right kind of practice, most of which is free. Here is the actual method.

## Why this happens

Certification labs are built to demonstrate a specific technique. You learn SQL injection, then practice it against a lab built to contain SQL injection. The path to the answer is narrow by design, because the lab exists to teach that one thing.

A real target does not do this. Nothing tells you what's wrong with it. The skill that's missing is not "more techniques", it's deciding what to try first out of everything you already know, with nothing pointing you toward the answer. That only comes from practicing on things that were not built to teach you one specific lesson.

## Where to actually practice this

**Retired HackTheBox machines, without reading the writeup first.** HackTheBox's free tier gives you access to retired boxes. Pick one blind. Give yourself a real time box, two to three hours, before you allow yourself to look anything up. The goal isn't finishing fast, it's practicing the decision-making with nothing to lean on.

**PortSwigger's Web Security Academy**, free, for web-specific work. It's structured as labs with no walkthrough required, and it covers a wider range of real web vulnerability classes than most paid courses.

**OverTheWire's Bandit wargame**, free, if command-line comfort under pressure is part of what's shaky. It won't teach pentesting directly, but working through it without hints builds the same "figure it out yourself" muscle.

**VulnHub**, free, for older but still-useful vulnerable VMs you run locally, good for practicing full enumeration-to-root workflows end to end without a subscription.

If you want a live application built specifically to have no obvious hint of what's wrong, I built and maintain [ShopEasy](https://sarathg.me/shopeasy.html), a free vulnerable API lab covering BOLA, JWT flaws, broken authentication and debug data leaks, alongside a fixed version so you can compare. It's free whether or not you ever talk to me. The rest of my public labs are at [labs.sarathg.me](https://labs.sarathg.me).

## The method, not just the targets

Picking hard targets isn't enough on its own. Structure matters more than people expect.

**Set a real time limit before you start**, and write down what you tried and in what order, even the things that failed. This single habit does more than anything else here. Reviewing your own failed attempts afterward is how you notice the pattern in what you skip or default to too early.

**Do full enumeration before you commit to a theory.** The most common failure mode isn't lack of knowledge, it's locking onto the first plausible idea and burning the whole session chasing it. Run a proper enumeration pass, port scan, service versions, visible endpoints, before deciding what's likely wrong.

**Write it up afterward like a report, not a diary.** Even if no one else will read it. What was the target, what did you find, how did you find it, what would you do differently. This is also, separately, the exact skill that gets you through a technical interview and through actual client work later, so it isn't wasted effort even where it feels like busywork now.

**Only look at a writeup after your own attempt is genuinely done**, not when you're frustrated twenty minutes in. Comparing your approach to someone else's afterward, once you've actually tried, is where the real learning happens.

## How to know it's working

Not when you pass a course. When you can take a target you've genuinely never seen before, work it within a reasonable time, and explain clearly afterward why what you found matters and how you got there, without a browser tab open to someone else's answer.

## If you've done this and you're still stuck

Some people work through exactly this, consistently, for months, and the gap doesn't close. That's not a motivation problem, and it's usually not a knowledge problem either by that point. It's more often that nobody is reviewing the actual approach, only the outcome, so the same habits that don't work keep repeating unnoticed.

That's the specific point where [1:1 mentorship](https://sarathg.me/coaching/) tends to actually help, not as a replacement for the practice above, but for when the practice alone isn't enough to catch what's going wrong. If that's where you are, the [mentorship page](https://sarathg.me/coaching/) explains how the diagnosis works before anything is planned or priced.
