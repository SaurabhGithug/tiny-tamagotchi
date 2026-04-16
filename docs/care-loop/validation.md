# Validation: Care Loop

## Strategy: Automated Tests
- **T1: Feed Effectiveness**: Assert Hunger increases by 20 and Happiness decreases by 2.
- **T2: Play Effectiveness**: Assert Happiness increases by 25 and Energy decreases by 10.
- **T3: Rest Effectiveness**: Assert Energy increases by 40 and Hunger decreases by 10.
- **T4: Cooldown Logic**: Programmatically click twice within 500ms; assert only the first click impacts the state.
- **T5: Boundary Saturation**: With Hunger at 90, click Feed; assert Hunger is 100, not 110.

## Strategy: Manual Verification (Usability)
- **V1: UI Cooldown**: Click "Feed" and verify the button visually dims and becomes unclickable for 2 seconds.
- **V2: Visual Response**: Click "Play" and verify the pet's face/icon changes to a "Happy" state for a multi-second duration.
- **V3: Feedback Loop**: Verify that replenishing Energy via "Rest" allows the player to resume "Play" actions that were previously depleted.

## Success Definition
- All interaction math is verified via unit tests.
- UI cooldown is visually and functionally confirmed.
- User feedback for actions (animations/text) is clearly visible.
