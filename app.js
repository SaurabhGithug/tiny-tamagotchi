// Tiny Tamagotchi - Core App Logic

const CONFIG = {
    TICKS_FOR_EVOLUTION: 60,
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
            // Offline decay
            const now = Date.now();
            const elapsedMs = now - state.lastTick;
            const elapsedTicks = Math.floor(elapsedMs / CONFIG.TICK_INTERVAL_MS);
            
            if (elapsedTicks > 0) {
                this.applyDecay(state, elapsedTicks);
                state.lastTick = now;
            }
            return state;
        }
        return null; // No pet yet
    }

    saveState() {
        this.gameState.lastTick = Date.now();
        localStorage.setItem('tamagotchi_state', JSON.stringify(this.gameState));
    }

    applyDecay(state, ticks = 1) {
        const multiplier = state.status === 'Sick' ? 1.5 : 1;
        state.stats.hunger = Math.max(0, state.stats.hunger + (CONFIG.STAT_DECAY.hunger * ticks * multiplier));
        state.stats.happiness = Math.max(0, state.stats.happiness + (CONFIG.STAT_DECAY.happiness * ticks * multiplier));
        state.stats.energy = Math.max(0, state.stats.energy + (CONFIG.STAT_DECAY.energy * ticks * multiplier));
        
        state.totalTicks += ticks;
        if (state.status !== 'Sick') {
            state.healthyTicks += ticks;
        }
        
        this.updateDerivedState(state);
    }

    updateDerivedState(state) {
        // Sickness check
        const isLow = state.stats.hunger <= CONFIG.SICK_THRESHOLD || 
                      state.stats.happiness <= CONFIG.SICK_THRESHOLD || 
                      state.stats.energy <= CONFIG.SICK_THRESHOLD;
        
        if (isLow && state.status !== 'Evolved') {
            state.status = 'Sick';
        } else if (!isLow && state.status === 'Sick') {
            state.status = 'Normal';
        }

        // Evolution check
        if (state.status !== 'Evolved' && state.totalTicks >= CONFIG.TICKS_FOR_EVOLUTION && state.healthyTicks >= 40) {
            state.status = 'Evolved';
            this.showFeedback("EVOLVED! ✨");
        }
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
            this.applyDecay(this.gameState);
            this.saveState();
            this.updateUI();
        }, CONFIG.TICK_INTERVAL_MS);

        this.resetIdleTimer();
        window.onclick = () => this.resetIdleTimer();
    }

    renderDashboard() {
        this.container.innerHTML = `
            <div class="screen active">
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

        // Incapacitation check
        if (this.isStatDepleted()) {
            if (type === 'feed' && this.gameState.stats.hunger > 0) return;
            if (type === 'rest' && this.gameState.stats.energy > 0) return;
        }

        const stats = this.gameState.stats;
        let animation = 'animate-bounce';

        if (type === 'feed') {
            stats.hunger = Math.min(100, stats.hunger + 20);
            stats.happiness = Math.max(0, stats.happiness - 2);
            this.showFeedback("Yum!");
        } else if (type === 'play') {
            stats.happiness = Math.min(100, stats.happiness + 25);
            stats.energy = Math.max(0, stats.energy - 10);
            this.showFeedback("Wheee!");
        } else if (type === 'rest') {
            stats.energy = Math.min(100, stats.energy + 40);
            stats.hunger = Math.max(0, stats.hunger - 10);
            animation = 'animate-float';
            this.showFeedback("Zzz...");
        }

        this.triggerAnimation(animation);
        this.activateCooldown();
        this.updateDerivedState(this.gameState);
        this.saveState();
        this.updateUI();
    }

    isStatDepleted() {
        return this.gameState.stats.hunger === 0 || this.gameState.stats.energy === 0;
    }

    triggerAnimation(className) {
        const sprite = document.getElementById('pet-sprite');
        sprite.classList.add(className);
        setTimeout(() => sprite.classList.remove(className), 1000);
    }

    activateCooldown() {
        this.cooldownActive = true;
        const btns = document.querySelectorAll('.action-btn');
        btns.forEach(b => b.disabled = true);
        setTimeout(() => {
            this.cooldownActive = false;
            this.updateButtonVisibility();
        }, CONFIG.COOLDOWN_MS);
    }

    updateButtonVisibility() {
        const btns = document.querySelectorAll('.action-btn');
        const hunger0 = this.gameState.stats.hunger === 0;
        const energy0 = this.gameState.stats.energy === 0;

        document.getElementById('feed-btn').disabled = this.cooldownActive || (energy0 && !hunger0);
        document.getElementById('play-btn').disabled = this.cooldownActive || hunger0 || energy0;
        document.getElementById('rest-btn').disabled = this.cooldownActive || (hunger0 && !energy0);
    }

    updateUI() {
        if (!this.gameState) return;

        // Update Stats
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

        // Update Sprite & Status
        const sprite = document.getElementById('pet-sprite');
        const status = document.getElementById('status-label');
        if (status) status.innerText = this.gameState.status;

        if (sprite) {
            let icon = '🐣';
            if (this.gameState.status === 'Sick') icon = '🤢';
            if (this.gameState.status === 'Evolved') icon = '🦄';
            
            // Easter Egg Names
            if (this.gameState.name.toLowerCase() === 'antigravity') {
                sprite.classList.add('animate-float');
                icon = '🛸';
            } else if (this.gameState.name.toLowerCase() === 'deeplearning') {
                icon = '🎓';
            }

            sprite.innerText = icon;
        }

        this.updateButtonVisibility();
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
        if (sprite) sprite.classList.remove('animate-float');
        
        this.idleTimer = setTimeout(() => {
            if (this.gameState && this.gameState.status !== 'Sick') {
                const sprite = document.getElementById('pet-sprite');
                if (sprite) sprite.classList.add('animate-float');
            }
        }, CONFIG.IDLE_TIMEOUT_MS);
    }
}

// Start App
window.onload = () => new TamagotchiApp();
