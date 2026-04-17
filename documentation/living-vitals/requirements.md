# Requirements: Living Vitals

## Functional Requirements
- **FR1: Hunger Meter**: Tracks pet satiety (0 to 100). Starts at 80.
- **FR2: Happiness Meter**: Tracks pet joy (0 to 100). Starts at 80.
- **FR3: Energy Meter**: Tracks pet wakefulness (0 to 100). Starts at 100.
- **FR4: Real-time Decay Algorithm**: Every "Tick" (5 seconds), stats decrease:
  - Hunger: `-5 * multiplier`
  - Happiness: `-3 * multiplier`
  - Energy: `-2 * multiplier`
  - *Multiplier*: `1.0` if Normal; `1.5` if Sick.
- **FR5: Boundary Logic**: `Math.min(100, Math.max(0, currentStat + change))`.
- **FR6: Offline Decay Calculation**:
  ```
  elapsedMs = Date.now() - lastTickTimestamp
  missedTicks = floor(elapsedMs / 5000)
  decayCount = min(missedTicks, 100) // Cap to prevent extreme decay
  ```
- **FR7: Sickness Threshold**: `isSick = Hunger <= 20 OR Happiness <= 20 OR Energy <= 20`.

## Non-Functional Requirements
- **NFR1: Performance**: Gauge animations must be smooth (using CSS transitions).
- **NFR2: UI Clarity**: Meters should change color (e.g., Green > Yellow > Red) based on level.
- **NFR3: Scalability**: New stats should be easily addable to the system state.
