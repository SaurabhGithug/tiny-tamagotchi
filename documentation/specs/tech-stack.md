# Tech Stack: Tiny Tamagotchi MVP

## Technical Specifications
- **Framework**: None (Vanilla JS/ES6+).
- **Styling**: Vanilla CSS3 with Custom Properties (Variables) for theming.
- **Persistence**: `localStorage` API for state serialization.
- **Graphics**: Emoji-based sprites with CSS Keyframe animations.

## Architecture: Logic vs UI Separation
To ensure high testability (as per SDD requirements), the core simulation logic is encapsulated in a pure class:
- **`TamagotchiLogic`**: Handles all mathematical state transitions (decay, replenishment, evolution).
- **`TamagotchiApp`**: Handles DOM manipulation, event listeners, and storage sync.

## Testing Architecture
- **Levels of Difficulty**:
  - **Unit Tests (Node.js)**: Validates `TamagotchiLogic` independently of the DOM.
  - **Manual UI Tests**: Validates accessibility, animations, and visual state shifts.
- **Tooling**: Custom lightweight test runner (`tests/run-tests.js`).

## Architecture
- **Single Page Application (SPA)**: Root `index.html` with component-based rendering logic in `app.js`.
- **System Logic**: A central `GameState` object that manages vitals, states, and evolution logic.
- **Real-time Engine**: `setInterval` based "tick" system (1 tick = 5 seconds) to handle stat decay.

## Rationale
- **Vanilla for Control**: Ensures maximum flexibility in design and zero dependency overhead.
- **LocalStorage for Simplicity**: Fits the challenge scope of one user/one pet without needing a backend.
- **Rich Aesthetics**: Custom CSS allows for unique glassmorphism and animations that feel premium.
