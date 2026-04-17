// Vitals Logic Tests

const { TamagotchiLogic, CONFIG } = require('../app.js');

function testVitals() {
    console.log("--- Running Vitals Tests ---");

    // T1: Offline Decay Precision
    const state1 = {
        stats: { hunger: 100, happiness: 100, energy: 100 },
        status: 'Normal',
        totalTicks: 0,
        healthyTicks: 0
    };
    TamagotchiLogic.applyDecay(state1, 10); // 10 ticks
    console.assert(state1.stats.hunger === 50, "Hunger should be 50 after 10 ticks (10 * 5)");
    console.assert(state1.stats.happiness === 70, "Happiness should be 70 after 10 ticks (10 * 3)");
    console.assert(state1.stats.energy === 80, "Energy should be 80 after 10 ticks (10 * 2)");

    // T2: Sick Multiplier Verification
    const state2 = {
        stats: { hunger: 20, happiness: 20, energy: 20 },
        status: 'Sick',
        totalTicks: 0,
        healthyTicks: 0
    };
    TamagotchiLogic.applyDecay(state2, 1); // 1 tick while sick (multiplier 1.5)
    console.assert(state2.stats.hunger === 20 - (5 * 1.5), `Sick hunger decay failed: expected 12.5, got ${state2.stats.hunger}`);
    
    // T3: Zero-Floor Constraint
    const state3 = {
        stats: { hunger: 2, happiness: 10, energy: 10 },
        status: 'Normal',
        totalTicks: 0,
        healthyTicks: 0
    };
    TamagotchiLogic.applyDecay(state3, 1);
    console.assert(state3.stats.hunger === 0, "Hunger should floor at 0");

    console.log("Vitals Tests Complete.");
}

module.exports = testVitals;
