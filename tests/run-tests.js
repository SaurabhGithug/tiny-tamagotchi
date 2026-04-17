// Tiny Tamagotchi - Test Runner

const vitals = require('./vitals.test.js');
const interactions = require('./interactions.test.js');

function runAllTests() {
    console.log("========================================");
    console.log("🚀 STARTING TINY TAMAGOTCHI TEST SUITE");
    console.log("========================================");
    
    let passCount = 0;
    let failCount = 0;

    const originalAssert = console.assert;
    console.assert = (condition, message) => {
        if (!condition) {
            console.error(`❌ FAIL: ${message}`);
            failCount++;
        } else {
            passCount++;
        }
    };

    try {
        vitals();
        interactions();
        
        console.log("========================================");
        if (failCount === 0) {
            console.log(`✅ ALL TESTS PASSED (${passCount} assertions)`);
        } else {
            console.error(`💥 TEST SUITE FAILED: ${failCount} failures, ${passCount} passes`);
            process.exit(1);
        }
        console.log("========================================");
    } catch (err) {
        console.error("⛔ CRITICAL TEST ERROR:", err);
        process.exit(1);
    }
}

if (require.main === module) {
    runAllTests();
}

module.exports = runAllTests;
