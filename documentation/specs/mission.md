# Mission: Tiny Tamagotchi MVP

## Mission Statement
To create a digital companion that fosters daily engagement through a simple, living care-system, demonstrating the power of Spec-Driven Development.

## Audience
- Casual gamers who enjoy virtual pet simulations.
- Developers and learners interested in Spec-Driven Development examples.

## Constraints
- **Scope**: Single user, single pet, one evolution path.
- **No-Go**: Authentication, multiple pets, inventories, currencies, mini-games, social features.
- **Persistence**: Data must persist across browser refreshes via `localStorage`.

## User Flows
1. **Initial Setup**: User enters the app, names their pet, and starts the care loop.
2. **Care Loop**: User monitors Hunger, Happiness, and Energy; performs Feed, Play, or Rest actions.
3. **State Management**: Pet transitions between Normal, Sick, and Evolved states based on care quality.
4. **Maintenance**: User returns periodically to prevent stat depletion.

## Success Criteria
- **Vitals Decay**: Stats decay every 5 seconds; 100% match with defined algorithms in `living-vitals/requirements.md`.
- **Action Precision**: Actions replenish stats without overflow; matches `care-loop/requirements.md`.
- **State Integrity**: Transitions occur exactly at thresholds (e.g., Evolution at 60 ticks); matches `dynamic-states/requirements.md`.
- **Persistence**: Game state survives reload with accurate offline decay calculation (max 100 ticks).
- **Test Coverage**: 100% pass rate on automated logic tests.

## Edge Cases & Handling
- **Simultaneous Zero Stats**: If Hunger and Energy both reach 0, the pet is "Incapacitated". Only the specific restorative action (Feed for Hunger, Rest for Energy) is enabled until the stat rises above 0.
- **Offline Decay**: Uses `lastTick` timestamp to calculate missed cycles. Total offline decay is capped at 100 ticks (approx 8.3 mins) to prevent pet death from long absences.
- **Evolution Priority**: Once a pet evolves, it remains in the Evolved form visually even if stats subsequently drop to Sick levels (though it may show a "Sick" indicator).
- **Easter Eggs**: Specific pet names trigger unique visual states, bypassing standard evolution paths.
