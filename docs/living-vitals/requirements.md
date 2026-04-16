# Requirements: Living Vitals

## Functional Requirements
- **FR1: Hunger Meter**: Tracks pet satiety (0 to 100).
- **FR2: Happiness Meter**: Tracks pet joy (0 to 100).
- **FR3: Energy Meter**: Tracks pet wakefulness (0 to 100).
- **FR4: Real-time Decay**: Every "Tick" (5 seconds of active time), stats decrease:
  - Hunger: -5
  - Happiness: -3
  - Energy: -2
- **FR5: Boundary Logic**: Stats cannot exceed 100 or fall below 0.
- **FR6: Persistent Context**: The "Last Tick" timestamp must be stored. Upon app launch, the system calculates "Offline Decay" by comparing the current time with the last stored timestamp.

## Non-Functional Requirements
- **NFR1: Performance**: Gauge animations must be smooth (using CSS transitions).
- **NFR2: UI Clarity**: Meters should change color (e.g., Green > Yellow > Red) based on level.
- **NFR3: Scalability**: New stats should be easily addable to the system state.
