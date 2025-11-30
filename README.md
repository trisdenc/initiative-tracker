# Initiative Tracker

This repository contains two static web pages for tracking D&D-style combat turns. Everything runs locally in the browser—no build tools or network calls are required.

## Quick start
1. Open `index.html` (primary) or `index1.html` (alternate) in any modern browser.
2. Enter a combatant name, initiative score, and HP. The alternate view also accepts an avatar image URL.
3. Click **Add** to place the combatant in the initiative list.
4. Use **Next Turn** to advance the active combatant; the round counter increments after the list loops.
5. Adjust HP with the **+ / −** buttons. Bloodied and dead statuses update automatically.
6. Manage conditions from the dropdown; remove them by selecting the condition chip.
7. Toggle theme (switch on the primary UI, button on the alternate UI).
8. Export or import data using the provided buttons. Data is also stored in `localStorage` between sessions.

## Files at a glance

| File | Purpose |
| --- | --- |
| `index.html`, `style.css`, `script.js` | Primary interface with a built-in dark mode switch, SVG fallback avatars, and condition/HP controls. |
| `index1.html`, `style1.css`, `script1.js` | Alternate, lightweight interface that supports optional image avatars and includes turn-based condition timer helpers. |

## Feature highlights
- **Turn tracking:** Keeps initiative order, highlights the active combatant, and increments rounds automatically.
- **HP management:** Plus/minus buttons update hit points with visual bloodied/dead states.
- **Condition tracking:** Add conditions per combatant; the alternate version includes `advanceTurnTimers` to decrement durations when advancing turns.
- **Dark mode:** Persistent theme toggle (primary UI) or manual toggle button (alternate UI).
- **Import/Export:** Copy initiative data to or from JSON. Both pages store state in `localStorage` under `trackerData` so reloading restores the list and (for the primary UI) theme preference.

## Tips and limitations
- Because everything runs client-side, data persists only in the current browser. Clear `localStorage` to reset.
- The alternate page includes sample logging helpers for extension; they are not wired to the UI beyond the turn-advance call.
- No server-side components are needed—opening the HTML files directly is sufficient.
