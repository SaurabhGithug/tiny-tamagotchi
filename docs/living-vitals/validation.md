# Validation: Living Vitals

## Strategy: Automated Tests
- **T1: Initial State**: Verify that a new pet starts with 80 Hunger, 80 Happiness, and 100 Energy.
- **T2: Linear Decay**: Mock the passage of one tick (5 seconds) and assert stats decrease by defined amounts.
- **T3: Zero-Floor Constraint**: Mock decay until stats reach 0 and assert they do not go negative.
- **T4: MAX-Capping**: Mock a replenishing action and assert stats do not exceed 100.

## Strategy: Manual Verification (Smoke Tests)
- **V1: Visual Sync**: Open the app and observe the bars decreasing every 5 seconds.
- **V2: Color Transition**: Manually edit the state via console to low values (e.g., 15) and verify the bars turn red.
- **V3: Tab Persistence**: Start the app, close the tab, wait 30 seconds, and reopen. Verify stats have decreased by 6 ticks worth of decay (approx 30 Hunger, etc).

## Success Definition
- 100% of automated tests pass.
- Manual observation confirms real-time visual updates.
- State is consistent after page reload.
