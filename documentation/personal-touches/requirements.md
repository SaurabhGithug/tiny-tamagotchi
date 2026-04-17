# Requirements: Personal Touches

## Functional Requirements
- **FR1: Poke Interaction**: Clicking the pet sprite plays a "Bounce" animation and shows a random speech bubble (e.g., "Hey!", "Tickles!", "*Wink*").
- **FR2: Night Shift**:
  - Logic: `hours = new Date().getHours();`
  - Effect: If `hours >= 22` OR `hours < 6`, add `.night-mode` class to the body.
  - Changes: Background becomes a dark navy gradient; pet brightness drops slightly.
- **FR3: Easter Egg Names**:
  - Name "DeepLearning": Pet wears a tiny graduation cap.
  - Name "Antigravity": Pet floats slightly higher with a "zero-g" hover animation.
- **FR4: Idle Timer**:
  - Timer resets on any user click.
  - At 30 seconds idle, trigger the `idle` animation loop.

## Non-Functional Requirements
- **NFR1: Charm Factor**: Animations should have "squash and stretch" feels to appear organic.
- **NFR2: Unobtrusiveness**: Idle animations should not block or delay care actions.
- **NFR3: Discovery**: Speech bubbles should hint at Easter eggs occasionally.
