# Requirements: Dynamic States

## Functional Requirements
- **FR1: Normal State Criteria**: 
  - `status = 'Normal'` if all stats > 20 and `isEvolved == false`.
- **FR2: Sick State Criteria**: 
  - `status = 'Sick'` if `(Hunger <= 20 OR Happiness <= 20 OR Energy <= 20)` and `isEvolved == false`.
  - Effect: Stat decay multiplier set to `1.5` for all vitals.
- **FR3: Evolved State Criteria**:
  - Requires: `Total Ticks >= 60` AND `Healthy Ticks >= 40`.
  - *Healthy Tick*: A tick where the pet was NOT in a 'Sick' state.
  - Transformation: `isEvolved = true`. Current `status` becomes `Evolved`. 
- **FR4: State Persistence**: 
  - Once `isEvolved` becomes `true`, it cannot ever return to `false`.
  - If an Evolved pet has stats <= 20, it displays the "Sick" icon (🤢) as a status badge over its evolved form to indicate illness without losing its growth level.
- **FR5: Transition Effects**:
  - `Evolution`: Full screen pulse (opacity 0 to 0.4 and back) and sprite scale-up (1.0 to 1.5).
  - `Sickness`: UI background hue-shift (+30deg) to indicate an unhealthy atmosphere.

## Non-Functional Requirements
- **NFR1: Visibility**: The state name must be prominently displayed near the pet's name.
- **NFR2: Transition Effects**: Use a "Flash" or "Sparkle" CSS animation during the Evolution transition.
- **NFR3: Consistency**: The state must be saved to `localStorage` so it persists after refresh.
