# Project Brief: Olympic Sports Standing Tracker

## Product Description
A lightweight web app for students at a school where football/basketball tickets are earned by attending Olympic sporting events. It lets a student log their attendance at these events and see their standing relative to the whole student body — their own count plus a distribution showing how many students have attended each number of events. The exact ticket cutoff isn't public, so the app doesn't pretend to know it; instead it gives students enough visibility to judge for themselves when they've likely attended "enough" and can stop, rather than over-attending indefinitely and crowding out students who hold an Olympic-sports-only pass and have no reason to attend beyond watching the sport itself.

This is an interactive mock-up, not a production app. Use placeholder/sample data (a fictional list of Olympic sporting events with dates, and a sample distribution of attendance counts across a student body — e.g., X students at 3 events, Y students at 4 events, etc.). No real backend, login, or persistence required — client-side state is fine.

## Core Concepts (carry these through every screen — lead with the value)

**Need:** Students chasing football/basketball tickets don't know when they've attended "enough" Olympic sporting events to be reasonably safe, so many keep attending indefinitely just to be sure — filling up games and squeezing out students who hold an Olympic-sports-only pass and just want to watch these events on their own merit, with no tickets at stake for them.

**Persona:** A student chasing football/basketball tickets through the attendance system, unsure how many events is "enough," currently erring on the side of attending more than necessary because there's no visibility into where the cutoff likely is.

**Capability:** Log attendance at an Olympic sporting event, and see your standing — your own count plus a distribution showing how many students have attended each number of events — so you can judge for yourself when you've likely done enough and can stop attending.

**Fundamental Value: CLARITY.** Seeing the real shape of the competition so you can stop attending once you're reasonably safe, instead of over-attending indefinitely and taking spots from students who are just there for the sport itself.

**The affordance sentence — this is the dominant thing a first-time user must encounter on the landing screen:** *"See where you stand — so you know when you can stop taking spots from students who are just there for the game."*

## The Three Screens

### 1. My Standing (Landing screen)
**Job:** Signal the core value (clarity on where you stand) and the primary capability (see your count + the distribution) before the user reads anything else.
**Design question it answers:** Does the landing screen make the user's relative position clear at a glance, without needing the exact ticket cutoff explained?

**Content:**
- The affordance sentence/headline near the top, front and center.
- The student's own attendance count, prominently displayed.
- A compact snapshot of the distribution (e.g., a simple bar chart showing how many students are at each attendance count, with the user's own position visually marked/highlighted).
- A way to get to Screen 2 (Check In) to log a new event.
- A way to get to Screen 3 (Full Distribution) for the complete picture.
- Nothing else. No settings, no login, no unrelated navigation competing with this job.

### 2. Check In
**Job:** Demonstrate the core interaction — logging attendance — and its direct effect on the user's standing.
**Design question it answers:** Does the layout group "which event," "confirm," and "your updated standing" clearly (Gestalt: proximity)?

**Content:**
- A list of Olympic sporting events (sample data — e.g., volleyball, swimming, wrestling, gymnastics — with dates), either upcoming or today's.
- Selecting an event and confirming check-in.
- Immediately after confirming, show the effect: the student's count ticks up by one, and their marked position on a mini version of the distribution visibly shifts.
- Clear, obvious way back to My Standing (Screen 1) from this screen.

### 3. Full Distribution
**Job:** Pay off the "clarity" value with the complete picture of where everyone stands, not just the user's own number.
**Design question it answers:** Does the shape/grouping of the distribution make it obvious where the bulk of students sit relative to the user, without needing every number spelled out?

**Content:**
- A fuller view of the distribution: count of students at each attendance level (e.g., a bar or histogram from 0 events up through the highest counts in the sample data).
- The user's own position clearly highlighted within this full view.
- Clear, obvious way back to My Standing (Screen 1) from this screen.

## Cross-Screen Requirements
- All three screens must have obvious navigation back to My Standing (landing screen).
- The three screens should look like one product — consistent color palette, type, and spacing (nothing fancy needed, just consistent).
- Group related information visually using Gestalt principles (proximity, similarity, alignment) rather than relying on labels/text to explain relationships.
- The tone throughout should avoid telling the student a hard "you're safe" or "you're not safe" — the app doesn't know the real cutoff. It should read as informative, not prescriptive.

## Tone / Style Preferences
- Clean, modern, data-forward feel — think more "simple analytics dashboard" than "game/leaderboard app," since this isn't meant to feel competitive or game-ified, just clarifying.
- Prioritize clarity and glanceability over decoration. This is a mock-up meant to test comprehension, not a finished visual design system — skip elaborate component libraries, design tokens, or illustrations.
- Sample data should feel real: use a handful of fictional but plausible Olympic sporting events, and a distribution of attendance counts across a sample student body (10-20 count buckets is plenty, e.g., "42 students at 3 events, 30 students at 4 events...").

## What NOT to build
- No login/auth, no real backend, no persistence beyond the session.
- No settings screen, no onboarding flow, no additional screens beyond the three above.
- No polished design system, custom component library, or reusable design tokens — consistent enough to look like one product is the bar.
- No explicit "you are safe / not safe" verdict — the app shows the distribution and count; the student draws their own conclusion.