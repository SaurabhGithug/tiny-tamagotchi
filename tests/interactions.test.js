// Interaction Logic Tests

const { TamagotchiLogic } = require('../app.js');

function testInteractions() {
    console.log("--- Running Interaction Tests ---");

    // T1: Action Resource Cost
    const state1 = {
        stats: { hunger: 50, happiness: 50, energy: 50 },
        status: 'Normal',
        totalTicks: 0,
        healthyTicks: 0
    };
    TamagotchiLogic.performAction(state1, 'play');
    console.assert(state1.stats.happiness === 75, "Play should add 25 happiness");
    console.assert(state1.stats.energy === 40, "Play should drain 10 energy");

    // T3: Boundary Saturation
    const state3 = {
        stats: { hunger: 90, happiness: 50, energy: 50 },
        status: 'Normal',
        totalTicks: 0,
        healthyTicks: 0
    };
    TamagotchiLogic.performAction(state3, 'feed');
    console.assert(state3.stats.hunger === 100, "Hunger should saturate at 100, not 110");

    // Evolution Logic Test
    const state4 = {
        stats: { hunger: 80, happiness: 80, energy: 80 },
        status: 'Normal',
        totalTicks: 59,
        healthyTicks: 39,
        isEvolved: false
    };
    TamagotchiLogic.applyDecay(state4, 1); // 60 ticks, 40 healthy ticks
    console.assert(state4.status === 'Evolved', "Pet should evolve after 60 total ticks and 40 healthy ticks");
    console.assert(state4.isEvolved === true, "isEvolved flag should be true");

    // T5: Incapacitation Logic (Recovery Path)
    const state5 = {
        stats: { hunger: 0, happiness: 50, energy: 50 },
        status: 'Sick',
        totalTicks: 0,
        healthyTicks: 0
    };
    // In actual app, UI prevents this. Logic should still handle stat changes.
    TamagotchiLogic.performAction(state5, 'play');
    console.assert(state5.stats.happiness === 75, "Logic still allows play, UI enforces incapacitation");
    
    // T6: Max-Cap Constraint
    const state6 = {
        stats: { hunger: 95, happiness: 95, energy: 95 },
        status: 'Normal',
        totalTicks: 0,
        healthyTicks: 0
    };
    // No action should push it above 100
    TamagotchiLogic.performAction(state6, 'feed');
    console.assert(state6.stats.hunger === 100, "Hunger should cap at 100");

    console.log("Interaction Tests Complete.");
}

module.exports = testInteractions;
