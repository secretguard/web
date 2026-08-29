---
title: "Moving From SOC or GRC Into Offensive Security: A Practical Roadmap"
description: "A concrete, mostly free roadmap for SOC analysts and GRC professionals moving into penetration testing or red team work, including what actually transfers and what to build from scratch."
canonical: https://sarathg.me/blog/soc-grc-to-offensive.html
---

# Moving from SOC or GRC into offensive security: a practical roadmap

If you work in a Security Operations Center (SOC) or in Governance, Risk and Compliance (GRC), you're not starting from zero. But the specific thing that gets you hired for offensive work, penetration testing, red team, VAPT (Vulnerability Assessment and Penetration Testing), is not the thing your current role has been building. Here's what actually transfers, what doesn't, and a concrete plan to close the gap.

## What genuinely carries over

From SOC work: you already understand what an attack looks like from the defending side, which log sources catch what, which techniques trigger which alerts. This is a real advantage. Map what you already know against the [MITRE ATT&CK framework](https://attack.mitre.org/), it's free and it's the shared vocabulary between blue and red teams. Going through it deliberately, technique by technique, and noting which ones you've seen fire in real alerts is a genuinely useful exercise, not busywork.

From GRC work: you're usually already comfortable writing clearly under pressure and communicating risk to a business audience. That is a real head start on report writing, which is a bigger part of pentest work than people expect, and something plenty of purely technical learners struggle with.

## What doesn't transfer, and has to be built

The offensive method itself. Recognizing a technique in a log is not the same as independently finding a way in against a target that gives you no hints. This has to be built through direct practice, not inferred from adjacent experience.

**If you're coming from SOC**, your main gap is usually offensive tooling and hands-on technique. Start with:

- **TryHackHouse's or TryHackMe's "SOC Level" or blue-to-red transition content** (TryHackMe specifically has paths aimed at exactly this move), which frames offensive technique in terms you already have context for.
- **HackTheBox's free retired machines**, worked blind, to build the live decision-making SOC work doesn't require.
- **eJPT (eLearnSecurity Junior Penetration Tester)** as a reasonably priced, practically-oriented first offensive certification if you want a structured curriculum, it's less theory-heavy than some alternatives.

**If you're coming from GRC**, the gap is larger and more foundational. Before offensive technique, you need the hands-on technical base GRC roles don't typically require day to day:

- **Networking and Linux fundamentals** if these are genuinely shaky, TryHackMe's "Pre Security" path and OverTheWire's Bandit wargame (both free or nearly free) are the standard, well-tested starting points.
- **Then the same live-target practice** described above, once the fundamentals are solid enough that you're not fighting the basics and the target at the same time.

## Turn your reporting skill into pentest-specific reporting practice

This is the one place your existing skill set gives you a genuine shortcut, if you use it deliberately. Find a real, public penetration test report template, PTES (Penetration Testing Execution Standard) has a widely used structure, or look at published sample reports from firms like Offensive Security. Practice writing a full report against your own HackTheBox or lab attempts using that structure, not just notes for yourself, a report as if a client will read it. Most technical learners never practice this deliberately. You already have the underlying communication skill, you just need to aim it at the right format.

## A realistic sequence

1. Fill any genuine gaps in networking and Linux fundamentals (skip this step if you're already solid here, most SOC analysts are).
2. Work through MITRE ATT&CK deliberately, connecting it to what you already recognize from the defensive side.
3. Start live, hint-free practice on retired HackTheBox machines or a free platform like [ShopEasy](https://sarathg.me/shopeasy.html) (a lab I built and maintain, free either way), on a real time limit, writing up every attempt.
4. Practice writing a full report against your own attempts using a real report template, not just notes.
5. Only then look at a formal offensive certification, if you want one, so the certification confirms a skill you're already building rather than substituting for the practice.

## If you've worked through this and you're still stuck

Some people go through this exact sequence and the transition still doesn't click, usually because nobody is reviewing whether the specific plan fits what they actually bring in from SOC or GRC, versus what a generic beginner path assumes. That's the point where [1:1 mentorship](https://sarathg.me/coaching/) tends to help, an honest read of what you already have, and a plan built from that rather than from scratch. The [mentorship page](https://sarathg.me/coaching/) explains how that diagnosis works, and it costs nothing to find out if it's a fit.
