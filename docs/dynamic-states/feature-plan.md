# Feature Plan: Dynamic States

## Overview
Dynamic States provide immediate visual and logic feedback on the pet's health and growth. This feature manages transitions between Normal, Sick, and Evolved states.

## User Flow
- **Normal**: The default state when stats are above 20.
- **Sick**: Triggered when any stat falls below 20. The pet looks miserable and action icons may change.
- **Evolved**: Triggered after 5 minutes (60 ticks) of sustained care (no sickness during that time). The pet significantly changes appearance.
- **Death (Out of Scope)**: Permanent death is not allowed by challenge constraints. If stats reach 0, the pet enters a "Coma" or "Exhausted" state that requires a "Recovery Path" (Rest/Heal action).

## Success Criteria
- Visual state transitions are instantaneous upon meeting criteria.
- Evolution is a one-way transformation once achieved.
- Sickness can be cured by replenishing the relevant stat above the 20 threshold.
- The UI reflects the state through icon changes and theme shifts (e.g., desaturated colors when Sick).
