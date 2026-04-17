## Strategy: Automated Tests (Level 1)
- **T1: Night Mode Condition**: Mock system hour to 1 AM; verify `isNight()` would return true.
- **T2: Easter Egg Matching**: Input name "Antigravity"; verify `sprite.classList` contains `animate-float`.
- **T3: Idle Reset**: Mock 30 seconds of idle; verify pet enters float/idle animation.

## Strategy: Smoke Testing (Level 2)
- **S1: Sprite Interaction**: Click the pet and verify the "Bounce" animation and speech bubble appear instantly.
- **S2: Theme Shift**: Manually toggle the "night-mode" class; verify the background shifts to a dark navy gradient.

## Strategy: User Flow Testing (Level 3)
- **F1: The Specialist Path**: Name the pet "DeepLearning". Verify the graduating cap icon appears. Refresh; verify it persists.
- **F2: Discovery Flow**: Interact with the pet for 5 minutes (evolve it). Observe if speech bubbles change or interactions feel different in the evolved form.

## Success Definition
- All Easter eggs respond to the specific strings defined in Requirements.
- Night mode activates/deactivates based on local system clock.
- Idle behaviors do not block core gameplay (care loop).
