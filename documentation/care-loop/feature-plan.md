# Feature Plan: Care Loop

## Overview
The Care Loop consists of active player interactions that replenish the pet's vital stats. This is the primary gameplay mechanism to ensure the pet survives and thrives.

## User Flow
- The user identifies a low stat (Hunger, Happiness, or Energy).
- The user clicks one of the three action buttons: **Feed**, **Play**, or **Rest**.
- The corresponding stat increases immediately.
- A visual feedback (animation or text) confirms the action's success.
- The pet's mood/animation changes temporarily (e.g., a "heart" or "eating" animation).

## Success Criteria
- Buttons are disabled for a short "cooldown" (2 seconds) to prevent spamming.
- Actions correctly replenish their target stats.
- The pet's state is updated if the action restores them from "Sick" or triggers "Evolution".
- Auditory or visual feedback is provided for every successful interaction.
