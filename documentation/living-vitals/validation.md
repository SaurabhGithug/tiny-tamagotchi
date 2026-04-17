# Validation: Living Vitals

## Strategy: Automated Unit Tests (Level 1)
- **Suite**: `tests/vitals.test.js`
- **T1: Offline Decay Precision**: Assert that a 30-minute absence results in exactly `360` ticks of decay (capped at 100 as per FR6).
- **T2: Sick Multiplier Verification**: Assert that Hunger decreases by `5 * 1.5 = 7.5` while status is `Sick`.
- **T3: Zero-Floor Constraint**: Mock decay until stats reach 0 and assert they do not go negative.

## Strategy: Smoke Testing (Level 2)
- **S1: App Launch**: Verify the app initializes with default stats (80/80/100) and displays the name correctly.
- **S2: Live Decay**: Observe the vitals meters update every 5 seconds.

## Strategy: User Flow Testing (Level 3)
- **F1: Recovery Flow**: Deplete Energy to 0, verify "Play" is disabled, perform "Rest" until Energy > 0, verify "Play" is re-enabled.
- **F2: Persistence Flow**: Change the pet's name, refresh the browser, and verify the name persists.

## Coverage Matrix
| Requirement | Validation Method |
|-------------|-------------------|
| FR4: Decay Alg | Automated (T1/T2) |
| FR6: Offline | Automated (T1) |
| FR7: Sickness  | Smoke (S2) / Manual |
| FR5: Boundary | Automated (T3) |

**Success Criteria**: 75%+ of features tested via automation; 100% pass rate on `tests/vitals.test.js`.
