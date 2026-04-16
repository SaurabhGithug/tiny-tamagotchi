# Requirements: Care Loop

## Functional Requirements
- **FR1: Feed Action**:
  - Increments Hunger by +20.
  - Decreeases Happiness by -2 (pet doesn't like forced feeding).
  - Triggers "Eating" animation state.
- **FR2: Play Action**:
  - Increments Happiness by +25.
  - Decreases Energy by -10 (play is tiring).
  - Triggers "Happy" animation state.
- **FR3: Rest Action**:
  - Increments Energy by +40.
  - Decreases Hunger by -10 (sleeping makes you hungry later).
  - Triggers "Sleeping" animation state.
- **FR4: Interaction Cooldown**: Buttons must be disabled for 2 seconds after any click to prevent over-leveling.
- **FR5: Boundary Check**: Actions must not allow stats to exceed 100.

## Non-Functional Requirements
- **NFR1: Tactile Feedback**: Buttons should have active states (visual press) and hover effects.
- **NFR2: Animation**: Transition between pet states must be smooth.
- **NFR3: Error Handling**: If an action is attempted during a state that prohibits it (e.g., trying to Play while the pet is Sick), provide clear player feedback.
