# Validation: Personal Touches

## Strategy: Automated Tests
- **T1: Night Mode Condition**: Mock system time to 1 AM; assert `isNight()` returns true.
- **T2: Easter Egg Matching**: Input name "Antigravity"; assert `hasFloatingEffect` is true in state.
- **T3: Idle Reset**: Mock 29 seconds of idle, trigger a click, wait 5 more seconds; assert `idleState` is still false.

## Strategy: Manual Verification (Polishing)
- **V1: Sprite Interaction**: Click the pet sprite 5 times. Verify a variety of speech bubbles appear and the "Bounce" animation plays every time.
- **V2: Night Mode Visuals**: Manually toggle the `night-mode` class in the inspector or change system time. Verify the UI darkens and the gradient shifts to a premium dark theme.
- **V3: Idle Observation**: Leave the cursor still for 35 seconds. Verify the pet begins its idle animation (e.g., spinning).

## Success Definition
- All easter eggs are verifiable through specific inputs.
- Night mode functions automatically based on the hour.
- Idle behaviors trigger exactly at the 30-second mark of inactivity.
