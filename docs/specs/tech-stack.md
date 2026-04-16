# Tech Stack: Tiny Tamagotchi MVP

## Core Technology
- **Frontend**: Vanilla HTML5, CSS3, and ES6 JavaScript.
- **Styling**: Vanilla CSS with CSS Custom Properties (Variables) for theming.
- **State Management**: Reactive state object with manual DOM reconciliation (optimized for SPA).
- **Persistence**: Web Storage API (`localStorage`).

## Architecture
- **Single Page Application (SPA)**: Root `index.html` with component-based rendering logic in `app.js`.
- **System Logic**: A central `GameState` object that manages vitals, states, and evolution logic.
- **Real-time Engine**: `setInterval` based "tick" system (1 tick = 5 seconds) to handle stat decay.

## Rationale
- **Vanilla for Control**: Ensures maximum flexibility in design and zero dependency overhead.
- **LocalStorage for Simplicity**: Fits the challenge scope of one user/one pet without needing a backend.
- **Rich Aesthetics**: Custom CSS allows for unique glassmorphism and animations that feel premium.
