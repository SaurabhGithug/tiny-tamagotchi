# Requirements: Dynamic States

## Functional Requirements
- **FR1: Normal State**: Stat ranges [21-100]. Pet displays standard animation.
- **FR2: Sick State**: Triggered if [Hunger | Happiness | Energy] <= 20. 
  - Visual: Pet turns blue/grey or shows "ill" emoji.
  - Performance: Decay rate for other stats increases by 1.5x while sick.
- **FR3: Evolved State**: Triggered when `Total Ticks >= 60` AND `Last 20 Ticks sickness-free`.
  - Visual: Pet character sprite changes to a larger, more complex form.
  - Multi-state: Evolution is persistent even if stats drop later.
- **FR4: Recovery Path**: If a stat is 0, the pet is "Incapacitated". All actions except the one specifically replenishing that stat (e.g., Feed for 0 Hunger) are disabled.

## Non-Functional Requirements
- **NFR1: Visibility**: The state name must be prominently displayed near the pet's name.
- **NFR2: Transition Effects**: Use a "Flash" or "Sparkle" CSS animation during the Evolution transition.
- **NFR3: Consistency**: The state must be saved to `localStorage` so it persists after refresh.
