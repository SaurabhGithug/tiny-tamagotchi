# Feature Plan: Living Vitals

## Overview
Living Vitals is the core biological engine of the Tiny Tamagotchi. It tracks the pet's survival stats (Hunger, Happiness, Energy) and manages their decay over time.

## User Flow
- The user views three meters on the main dashboard.
- Meters decrease automatically at set intervals.
- If stats fall too low (below 20%), the UI changes to a "Low Health" or "Sick" warning.
- If stats reach zero, the pet becomes incapacitated (recovery path required).

## Success Criteria
- Meters update in real-time without page lag.
- Stats correctly stay within the 0-100 range.
- The "Tick" system runs reliably even if the tab is inactive (via timestamp comparison on refocus).
- Sickness state is triggered correctly based on stats.
