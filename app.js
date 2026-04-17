// Tiny Tamagotchi - Core App Logic

const CONFIG = {
    TICKS_FOR_EVOLUTION: 60,
    HEALTHY_TICKS_THRESHOLD: 40,
    TICK_INTERVAL_MS: 5000,
    SICK_THRESHOLD: 20,
    STAT_DECAY: {
        hunger: -5,
        happiness: -3,
        energy: -2
    },
    COOLDOWN_MS: 2000,
    IDLE_TIMEOUT_MS: 30000
};

// Pure Logic Class for Testability
class TamagotchiLogic {
    static applyDecay(state, ticks = 1) {
        const multiplier = state.status === 'Sick' ? 1.5 : 1;
        
        state.stats.hunger = Math.min(100, Math.max(0, state.stats.hunger + (CONFIG.STAT_DECAY.hunger * ticks * multiplier)));
        state.stats.happiness = Math.min(100, Math.max(0, state.stats.happiness + (CONFIG.STAT_DECAY.happiness * ticks * multiplier)));
        state.stats.energy = Math.min(100, Math.max(0, state.stats.energy + (CONFIG.STAT_DECAY.energy * ticks * multiplier)));
        
        state.totalTicks += ticks;
        if (state.status !== 'Sick') {
            state.healthyTicks += ticks;
        }
        
        return this.updateDerivedState(state);
    }

    static updateDerivedState(state) {
        // Sickness check (Edge Case: Evolution prevents Sickness transition)
        const isLow = state.stats.hunger <= CONFIG.SICK_THRESHOLD || 
                      state.stats.happiness <= CONFIG.SICK_THRESHOLD || 
                      state.stats.energy <= CONFIG.SICK_THRESHOLD;
        
        if (state.status !== 'Evolved') {
            if (isLow) {
                state.status = 'Sick';
            } else {
                state.status = 'Normal';
            }
        }

        // Evolution check (Explicit thresholds)
        if (state.status !== 'Evolved' && 
            state.totalTicks >= CONFIG.TICKS_FOR_EVOLUTION && 
            state.healthyTicks >= CONFIG.HEALTHY_TICKS_THRESHOLD) {
            state.status = 'Evolved';
            state.isEvolved = true;
            return true; // Just evolved
        }
        return false;
    }

    static performAction(state, type) {
        if (type === 'feed') {
            state.stats.hunger = Math.min(100, state.stats.hunger + 20);
            state.stats.happiness = Math.max(0, state.stats.happiness - 2);
        } else if (type === 'play') {
            state.stats.happiness = Math.min(100, state.stats.happiness + 25);
            state.stats.energy = Math.max(0, state.stats.energy - 10);
        } else if (type === 'rest') {
            state.stats.energy = Math.min(100, state.stats.energy + 40);
            state.stats.hunger = Math.max(0, state.stats.hunger - 10);
        }
        this.updateDerivedState(state);
    }
}

// UI & Storage Layer
class TamagotchiApp {
    constructor() {
        this.container = document.getElementById('app-container');
        this.gameState = this.loadState();
        this.cooldownActive = false;
        this.idleTimer = null;
        this.tickInterval = null;

        this.init();
    }

    loadState() {
        const saved = localStorage.getItem('tamagotchi_state');
        if (saved) {
            const state = JSON.parse(saved);
            const now = Date.now();
            const elapsedMs = now - (state.lastTick || now);
            const elapsedTicks = Math.floor(elapsedMs / CONFIG.TICK_INTERVAL_MS);
            
            if (elapsedTicks > 0) {
                // Cap offline decay to 100 ticks to avoid total annihilation
                TamagotchiLogic.applyDecay(state, Math.min(elapsedTicks, 100));
                state.lastTick = now;
            }
            return state;
        }
        return null;
    }

    saveState() {
        this.gameState.lastTick = Date.now();
        localStorage.setItem('tamagotchi_state', JSON.stringify(this.gameState));
    }

    init() {
        if (!this.gameState) {
            this.renderOnboarding();
        } else {
            this.startApp();
        }
        this.applyTheme();
    }

    applyTheme() {
        const hour = new Date().getHours();
        if (hour >= 22 || hour < 6) {
            document.body.classList.add('night-mode');
        } else {
            document.body.classList.remove('night-mode');
        }
    }

    renderOnboarding() {
        this.container.innerHTML = `
            <div class="screen active">
                <h1>Adopt a Pet</h1>
                <p>Welcome! Give your new companion a name to begin.</p>
                <div class="input-group">
                    <input type="text" id="pet-name-input" placeholder="e.g. Pixel" maxlength="15">
                </div>
                <button id="adopt-btn">Adopt Pet</button>
            </div>
        `;

        document.getElementById('adopt-btn').onclick = () => {
            const name = document.getElementById('pet-name-input').value.trim();
            if (name) this.adoptPet(name);
        };
    }

    adoptPet(name) {
        this.gameState = {
            name: name,
            stats: { hunger: 80, happiness: 80, energy: 100 },
            status: 'Normal',
            isEvolved: false,
            totalTicks: 0,
            healthyTicks: 0,
            lastTick: Date.now()
        };
        this.saveState();
        this.startApp();
    }

    startApp() {
        this.renderDashboard();
        this.tickInterval = setInterval(() => {
            const evolved = TamagotchiLogic.applyDecay(this.gameState);
            if (evolved) this.showFeedback("EVOLVED! ✨");
            this.saveState();
            this.updateUI();
        }, CONFIG.TICK_INTERVAL_MS);

        this.resetIdleTimer();
        window.onclick = () => this.resetIdleTimer();
    }

    renderDashboard() {
        this.container.innerHTML = `
            <div class="screen active" id="game-screen">
                <div class="pet-status" id="status-label">${this.gameState.status}</div>
                <h1 class="pet-name">${this.gameState.name}</h1>
                
                <div class="pet-display" id="pet-target">
                    <div class="bubble" id="speech-bubble">Hi!</div>
                    <div class="pet-sprite" id="pet-sprite">🐣</div>
                </div>

                <div class="vitals-container">
                    ${this.createVitalRow('Hunger', 'hunger')}
                    ${this.createVitalRow('Happiness', 'happiness')}
                    ${this.createVitalRow('Energy', 'energy')}
                </div>

                <div class="actions-container">
                    <button class="action-btn" id="feed-btn">
                        <span class="action-icon">🍎</span>
                        <span>Feed</span>
                    </button>
                    <button class="action-btn" id="play-btn">
                        <span class="action-icon">🎾</span>
                        <span>Play</span>
                    </button>
                    <button class="action-btn" id="rest-btn">
                        <span class="action-icon">💤</span>
                        <span>Rest</span>
                    </button>
                </div>
            </div>
        `;

        this.setupActionListeners();
        this.updateUI();
        document.getElementById('pet-target').onclick = () => this.pokePet();
    }

    createVitalRow(label, key) {
        return `
            <div class="vital-row">
                <div class="vital-label">
                    <span>${label}</span>
                    <span id="${key}-val">0</span>
                </div>
                <div class="meter-bg">
                    <div class="meter-fill" id="${key}-fill"></div>
                </div>
            </div>
        `;
    }

    setupActionListeners() {
        document.getElementById('feed-btn').onclick = () => this.handleAction('feed');
        document.getElementById('play-btn').onclick = () => this.handleAction('play');
        document.getElementById('rest-btn').onclick = () => this.handleAction('rest');
    }

    handleAction(type) {
        if (this.cooldownActive) return;

        // Incapacitation check (Recovery Path)
        const hunger0 = this.gameState.stats.hunger === 0;
        const energy0 = this.gameState.stats.energy === 0;
        if (hunger0 && type !== 'feed') return;
        if (energy0 && type !== 'rest') return;

        TamagotchiLogic.performAction(this.gameState, type);
        
        let animation = 'animate-bounce';
        if (type === 'feed') this.showFeedback("Yum!");
        if (type === 'play') this.showFeedback("Wheee!");
        if (type === 'rest') {
            this.showFeedback("Zzz...");
            animation = 'animate-float';
        }

        this.triggerAnimation(animation);
        this.activateCooldown();
        this.saveState();
        this.updateUI();
    }

    triggerAnimation(className) {
        const sprite = document.getElementById('pet-sprite');
        sprite.classList.add(className);
        setTimeout(() => sprite.classList.remove(className), className === 'animate-float' ? 3000 : 1500);
    }

    activateCooldown() {
        this.cooldownActive = true;
        this.updateButtonStates();
        setTimeout(() => {
            this.cooldownActive = false;
            this.updateButtonStates();
        }, CONFIG.COOLDOWN_MS);
    }

    updateButtonStates() {
        const feedBtn = document.getElementById('feed-btn');
        const playBtn = document.getElementById('play-btn');
        const restBtn = document.getElementById('rest-btn');
        if (!feedBtn) return;

        const hunger0 = this.gameState.stats.hunger === 0;
        const energy0 = this.gameState.stats.energy === 0;

        feedBtn.disabled = this.cooldownActive || (energy0 && !hunger0);
        playBtn.disabled = this.cooldownActive || hunger0 || energy0;
        restBtn.disabled = this.cooldownActive || (hunger0 && !energy0);
    }

    updateUI() {
        if (!this.gameState) return;

        // Stats UI
        for (let key in this.gameState.stats) {
            const val = Math.round(this.gameState.stats[key]);
            const fill = document.getElementById(`${key}-fill`);
            const label = document.getElementById(`${key}-val`);
            if (fill) {
                fill.style.width = `${val}%`;
                fill.style.backgroundColor = val > 50 ? 'var(--success)' : (val > 20 ? 'var(--warning)' : 'var(--danger)');
            }
            if (label) label.innerText = val;
        }

        // Sprite & Status UI
        const sprite = document.getElementById('pet-sprite');
        const statusLabel = document.getElementById('status-label');
        if (statusLabel) statusLabel.innerText = this.gameState.status;

        if (sprite) {
            let icon = '🐣';
            if (this.gameState.status === 'Sick') icon = '🤢';
            if (this.gameState.isEvolved) {
                // Evolved form stays, but if stats are low, show sick icon as indicator
                const isLow = this.gameState.stats.hunger <= CONFIG.SICK_THRESHOLD || 
                              this.gameState.stats.happiness <= CONFIG.SICK_THRESHOLD || 
                              this.gameState.stats.energy <= CONFIG.SICK_THRESHOLD;
                icon = isLow ? '🤢 (🦄)' : '🦄';
            }
            
            // Easter Eggs
            const name = this.gameState.name.toLowerCase();
            if (name === 'antigravity') {
                sprite.classList.add('animate-float');
                icon = '🛸';
            } else if (name === 'deeplearning') {
                icon = '🎓';
            }
            sprite.innerText = icon;
        }

        // Sick UI Hue Shift (Applies whenever stats are low, even if evolved)
        const isLow = this.gameState.stats.hunger <= CONFIG.SICK_THRESHOLD || 
                      this.gameState.stats.happiness <= CONFIG.SICK_THRESHOLD || 
                      this.gameState.stats.energy <= CONFIG.SICK_THRESHOLD;
        
        if (isLow) {
            document.body.style.filter = 'hue-rotate(30deg)';
        } else {
            document.body.style.filter = 'none';
        }

        this.updateButtonStates();
    }

    pokePet() {
        const responses = ["Hey!", "Tee-hee!", "Tickles!", "*Wink*", "Love ya!"];
        this.showFeedback(responses[Math.floor(Math.random() * responses.length)]);
        this.triggerAnimation('animate-spin');
    }

    showFeedback(text) {
        const bubble = document.getElementById('speech-bubble');
        if (!bubble) return;
        bubble.innerText = text;
        bubble.classList.add('active');
        setTimeout(() => bubble.classList.remove('active'), 2000);
    }

    resetIdleTimer() {
        clearTimeout(this.idleTimer);
        const sprite = document.getElementById('pet-sprite');
        if (sprite && !this.gameState?.isEvolved) sprite.classList.remove('animate-float');
        
        this.idleTimer = setTimeout(() => {
            if (this.gameState && this.gameState.status !== 'Sick') {
                const sprite = document.getElementById('pet-sprite');
                if (sprite) sprite.classList.add('animate-float');
            }
        }, CONFIG.IDLE_TIMEOUT_MS);
    }
}

// Start App
if (typeof window !== 'undefined') {
    window.onload = () => new TamagotchiApp();
}

// Export for testing
if (typeof module !== 'undefined') {
    module.exports = { TamagotchiLogic, CONFIG };
}
