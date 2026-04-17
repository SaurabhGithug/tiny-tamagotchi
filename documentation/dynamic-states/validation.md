## Strategy: Automated Unit Tests (Level 1)
- **Suite**: `tests/vitals.test.js` (State Logic)
- **T1: Healthy Tick Accumulation**: Mock 10 ticks in 'Normal' state; verify `healthyTicks` incremented to 10.
- **T2: Sickness Trigger**: Set Hunger to 15; verify `status` becomes 'Sick'.
- **T3: Evolution Lock**: Mock 60 total ticks and 40 healthy ticks; verify `isEvolved` becomes true and cannot be reversed even if Hunger drops.

## Strategy: Smoke Testing (Level 2)
- **S1: Initial State**: Verify the pet starts as 'Normal' (🐣).
- **S2: Visual Sickness**: Force Hunger to 10 in the console; verify the screen hue shifts (+30deg) and emoji changes to 🤢.

## Strategy: User Flow Testing (Level 3)
- **F1: Recovery Path**: In 'Sick' state, Feed the pet until Hunger > 20. Verify status returns to 'Normal' and sick visuals disappear.
- **F2: Evolution Moment**: Use a "Skip Time" dev command (or wait) to reach thresholds. Verify the full-screen pulse effect and the permanent shift to the Evolved form (🦄).

## Coverage Matrix
| Requirement | Validation Method |
|-------------|-------------------|
| FR2: Sick State | Automated (T2) / Smoke (S2) |
| FR3: Evolution | Automated (T1/T3) / Flow (F2) |
| FR4: Persistence | Automated (T3) |
| FR5: Effects | User Flow (F2) / Smoke (S2) |

**Success Criteria**: 100% pass rate on transition logic; visual confirmation of all theme shifts.

## Success Definition
- Evolution logic handles the "sickness-free" constraint perfectly.
- State-based UI restrictions (Incapacitation) work as intended.
- State transformations are clearly visible and persistent.
