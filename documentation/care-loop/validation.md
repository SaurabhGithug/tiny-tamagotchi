# Validation: Care Loop

## Strategy: Automated Unit Tests (Level 1)
- **Suite**: `tests/interactions.test.js`
- **T1: Satiation Accuracy**: Feed the pet; verify Hunger increases by exactly 20.
- **T2: Energy Exhaustion**: Play with the pet 10 times; verify Energy hits 0 and "Play" button becomes disabled.
- **T3: Cooldown Logic**: Click "Feed"; verify all boutons are disabled. Mock 2s pass; verify buttons are re-enabled.

## Strategy: Smoke Testing (Level 2)
- **S1: Button Responsiveness**: Click each action button and verify the pet plays its associated animation (Bounce/Float).
- **S2: Cooldown Visualization**: Observe buttons dimming/disabling for 2 seconds after every interaction.

## Strategy: User Flow Testing (Level 3)
- **F1: Exhaustion & Recovery**: Play with the pet until Energy is 0. Attempt to click "Play" (should fail). Click "Rest" (should succeed). Verify "Play" is re-activated after Energy > 0.
- **F2: Sick Management**: Force a Sick state; verify interaction logic still holds (Hunger/Energy decay faster).

## Coverage Matrix
| Requirement | Validation Method |
|-------------|-------------------|
| FR1-3: Logic | Automated (T1/T2) |
| FR4: Cooldown | Automated (T3) / Smoke (S2) |
| FR5: Blocking | Automated (T2) / Flow (F1) |

**Success Criteria**: 100% pass rate on `tests/interactions.test.js`; smooth visual feedback for all cooldowns.
