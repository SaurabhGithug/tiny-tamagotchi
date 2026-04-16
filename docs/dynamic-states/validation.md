# Validation: Dynamic States

## Strategy: Automated Tests
- **T1: Sickness Trigger**: Set Hunger to 15; assert background state becomes "Sick".
- **T2: Cure Logic**: With Sick state active, set Hunger to 40; assert background state returns to "Normal".
- **T3: Evolution Timing**: Mock 60 ticks without sickness; assert state becomes "Evolved".
- **T4: Sickness Reset for Evolution**: Mock 59 ticks, trigger 1 tick of sickness, then mock 20 more ticks; assert state is NOT Evolved.
- **T5: Incapacitation Logic**: Set Energy to 0; assert all buttons except "Rest" have the `disabled` attribute.

## Strategy: Manual Verification (Evolution)
- **V1: Visual Transformation**: Leave the app running (or accelerate time in console) to reach Evolution. Verify the sprite changes drastically and a "Congratulations!" message appears.
- **V2: Sick UI**: Lower stats until the pet feels sick. Verify the UI palette shifts to cooler, "sad" tones.
- **V3: Persistent Evolution**: Evolve the pet, then refresh the browser. Verify the pet remains in its Evolved form.

## Success Definition
- Evolution logic handles the "sickness-free" constraint perfectly.
- State-based UI restrictions (Incapacitation) work as intended.
- State transformations are clearly visible and persistent.
