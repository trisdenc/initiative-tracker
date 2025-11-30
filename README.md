# Initiative Tracker

This repository contains two static web pages for tracking D&D combat turns. Each version runs entirely in the browser with no build step required.

## Files
- `index.html`, `style.css`, `script.js`: Primary themed interface with a switch-based dark mode, SVG avatars, and condition/HP management.
- `index1.html`, `style1.css`, `script1.js`: Alternate, lighter-weight interface that also supports optional image avatars and turn-based condition timers.

## Using the tracker
1. Open `index.html` (or `index1.html` for the alternate layout) directly in a browser.
2. Add characters with a name, initiative score, and hit points (plus an avatar URL on the alternate page).
3. Use the **Next Turn** button to advance the active combatant; the round counter increases after the list loops.
4. Adjust hit points with the plus/minus controls; bloodied and dead statuses update automatically.
5. Manage conditions via the dropdown and remove them by clicking condition chips.
6. Toggle dark mode with the switch (primary) or button (alternate) UI.
7. Export or import initiative data through the provided buttons; data also persists in `localStorage` between sessions.

## Data persistence
Both versions store characters in `localStorage` under the `trackerData` key so state is restored when reloading the page. The primary version also saves dark mode preference.

## Notes on the alternate version
The alternate files include an `advanceTurnTimers` helper that reduces condition durations on each turn and example log utilities for recording events. These helpers are present for extension but are not currently wired to UI controls beyond the turn advance call.
