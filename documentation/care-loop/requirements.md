# Requirements: Care Loop

## Functional Requirements
- **FR1: Feed Action Logic**:
  - `Hunger = min(100, Hunger + 20)`
  - `Happiness = max(0, Happiness - 2)`
  - Effect: Triggers `eating` animation for 1500ms.
- **FR2: Play Action Logic**:
  - `Happiness = min(100, Happiness + 25)`
  - `Energy = max(0, Energy - 10)`
  - Effect: Triggers `happy` animation for 1500ms.
- **FR3: Rest Action Logic**:
  - `Energy = min(100, Energy + 40)`
  - `Hunger = max(0, Hunger - 10)`
  - Effect: Triggers `sleeping` animation for 3000ms.
- **FR4: Global Interaction Cooldown**: 
  - After any action click, all action buttons enter `disabled` state for exactly 2000ms.
  - A visual progress bar or "dimming" effect must indicate the cooldown.
- **FR5: Interaction Blocking (Incapacitation)**:
  - If Hunger == 0: Only 'Feed' is clickable. others are `disabled` (requires 'Recovery Path').
  - If Energy == 0: Only 'Rest' is clickable. others are `disabled` (requires 'Recovery Path').

## Non-Functional Requirements
- **NFR1: Tactile Feedback**: Buttons should have active states (visual press) and hover effects.
- **NFR2: Animation**: Transition between pet states must be smooth.
- **NFR3: Error Handling**: If an action is attempted during a state that prohibits it (e.g., trying to Play while the pet is Sick), provide clear player feedback.
