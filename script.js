// ===== Birthday Configuration =====
const BIRTHDAY_DATE = new Date('November 27, 2025 00:00:00');
const BIRTHDAY_NAME = 'Afrin Akter Mysha';

// ===== DOM Elements =====
const envelope = document.getElementById('envelope');
const landing = document.getElementById('landing');
const birthdaySection = document.getElementById('birthdaySection');
const countdown = document.getElementById('countdown');
const birthdayMessage = document.getElementById('birthdayMessage');
const surpriseBtn = document.getElementById('surpriseBtn');
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
const confettiCanvas = document.getElementById('confetti');
const ctx = confettiCanvas.getContext('2d');

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    setupEnvelope();
    setupMusic();
    setupSurpriseButton();
    setupCandleBlowing();
    setupBalloonPop();
    setupScratchCard();
    setupMemoryGallery();
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
});

// ===== Floating Hearts Background =====
function createFloatingHearts() {
    const heartsContainer = document.getElementById('hearts');
    const hearts = ['💖', '💕', '💗', '💝', '💞', '💓', '❤️', '💘', '💟'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heartsContainer.appendChild(heart);
        
        setTimeout(() => heart.remove(), 10000);
    }, 500);
}

// ===== Envelope Click Handler =====
function setupEnvelope() {
    envelope.addEventListener('click', () => {
        envelope.classList.add('opened');
        
        setTimeout(() => {
            landing.style.display = 'none';
            birthdaySection.classList.remove('hidden');
            birthdaySection.classList.add('fade-in');
            
            checkBirthdayStatus();
            startCountdown();
            
            // Try to play music on interaction
            if (bgMusic.src) {
                bgMusic.play().catch(() => {});
            }
        }, 800);
    });
}

// ===== Check if it's birthday =====
function checkBirthdayStatus() {
    const now = new Date();
    const isBirthday = now.getDate() === BIRTHDAY_DATE.getDate() && 
                       now.getMonth() === BIRTHDAY_DATE.getMonth() &&
                       now.getFullYear() === BIRTHDAY_DATE.getFullYear();
    
    const isPastBirthday = now >= BIRTHDAY_DATE;
    
    if (isBirthday || isPastBirthday) {
        // It's her birthday or after!
        countdown.style.display = 'none';
        birthdayMessage.style.display = 'block';
        launchConfetti();
    } else {
        // Still counting down
        countdown.style.display = 'block';
        birthdayMessage.style.display = 'block';
    }
}

// ===== Countdown Timer =====
function startCountdown() {
    function updateCountdown() {
        const now = new Date();
        const diff = BIRTHDAY_DATE - now;
        
        if (diff <= 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            countdown.querySelector('h2').textContent = '🎉 The Day Has Arrived! 🎉';
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ===== Surprise Button =====
function setupSurpriseButton() {
    surpriseBtn.addEventListener('click', () => {
        launchConfetti();
        showSurpriseMessage();
    });
}

function showSurpriseMessage() {
    const messages = [
        "You are the most beautiful person I've ever known! 💖",
        "Every day with you is a blessing! 🌟",
        "You make my heart skip a beat! 💓",
        "I'm so lucky to have you! 🍀",
        "You're my sunshine on cloudy days! ☀️",
        "Forever isn't long enough with you! 💕",
        "You complete me in every way! 💝",
        "My love for you grows every day! 🌹"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // Create popup
    const popup = document.createElement('div');
    popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(145deg, #fff, #ffe0e6);
        padding: 40px 50px;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        z-index: 2000;
        text-align: center;
        animation: popIn 0.5s ease;
        border: 3px solid #ff69b4;
    `;
    
    popup.innerHTML = `
        <div style="font-size: 4rem; margin-bottom: 20px;">💝</div>
        <p style="font-family: 'Dancing Script', cursive; font-size: 1.8rem; color: #e91e63; margin-bottom: 20px;">
            ${randomMessage}
        </p>
        <button onclick="this.parentElement.remove()" style="
            background: linear-gradient(145deg, #ff69b4, #ff1493);
            color: white;
            border: none;
            padding: 12px 30px;
            font-size: 1rem;
            border-radius: 25px;
            cursor: pointer;
            font-family: 'Poppins', sans-serif;
        ">Close 💕</button>
    `;
    
    document.body.appendChild(popup);
    
    // Add animation keyframes
    if (!document.getElementById('popInStyle')) {
        const style = document.createElement('style');
        style.id = 'popInStyle';
        style.textContent = `
            @keyframes popIn {
                0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
                50% { transform: translate(-50%, -50%) scale(1.1); }
                100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== Confetti System =====
let confetti = [];

function resizeCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}

function createConfettiPiece() {
    const colors = ['#ff69b4', '#ff1493', '#ffeb3b', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dfe6e9', '#fd79a8'];
    return {
        x: Math.random() * confettiCanvas.width,
        y: Math.random() * confettiCanvas.height - confettiCanvas.height,
        size: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 3 + 2,
        speedX: Math.random() * 4 - 2,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 10 - 5,
        shape: Math.random() > 0.5 ? 'rect' : 'circle'
    };
}

function launchConfetti() {
    confetti = [];
    for (let i = 0; i < 200; i++) {
        confetti.push(createConfettiPiece());
    }
    animateConfetti();
}

function animateConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    
    confetti.forEach((piece, index) => {
        piece.y += piece.speedY;
        piece.x += piece.speedX;
        piece.rotation += piece.rotationSpeed;
        
        ctx.save();
        ctx.translate(piece.x, piece.y);
        ctx.rotate((piece.rotation * Math.PI) / 180);
        ctx.fillStyle = piece.color;
        
        if (piece.shape === 'rect') {
            ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size * 0.6);
        } else {
            ctx.beginPath();
            ctx.arc(0, 0, piece.size / 2, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.restore();
        
        // Remove if off screen
        if (piece.y > confettiCanvas.height) {
            confetti.splice(index, 1);
        }
    });
    
    if (confetti.length > 0) {
        requestAnimationFrame(animateConfetti);
    }
}

// ===== Background Music =====
function setupMusic() {
    let isPlaying = false;
    
    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicToggle.textContent = '🎵';
            musicToggle.classList.remove('playing');
        } else {
            bgMusic.play().then(() => {
                musicToggle.textContent = '🔊';
                musicToggle.classList.add('playing');
            }).catch(() => {
                alert('Add a birthday-song.mp3 file to the assets folder to enable music!');
            });
        }
        isPlaying = !isPlaying;
    });
}

// ===== Add scroll animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe gallery items and wish items
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelectorAll('.gallery-item, .wish-item').forEach(item => {
            observer.observe(item);
        });
    }, 1000);
});

// ===== Easter Egg: Konami Code =====
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Special surprise!
        document.body.style.animation = 'rainbow 2s infinite';
        launchConfetti();
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

console.log('%c💖 Made with love for Afrin Akter Mysha 💖', 
    'font-size: 20px; color: #ff69b4; font-family: cursive;');
console.log('%c🎂 Happy 18th Birthday! 🎂', 
    'font-size: 16px; color: #e91e63;');

// ===== Candle Blowing Feature =====
let candlesLit = 6;
let audioContext = null;
let analyser = null;
let microphone = null;
let isListening = false;

function setupCandleBlowing() {
    const blowBtn = document.getElementById('blowBtn');
    const micBtn = document.getElementById('micBtn');
    const candles = document.querySelectorAll('.candle');
    
    // Click to blow candles
    blowBtn.addEventListener('click', () => {
        blowAllCandles();
    });
    
    // Click individual candles
    candles.forEach(candle => {
        candle.addEventListener('click', () => {
            const flame = candle.querySelector('.flame');
            if (flame && !flame.classList.contains('blown-out')) {
                blowCandle(flame);
            }
        });
    });
    
    // Microphone blow detection
    micBtn.addEventListener('click', async () => {
        if (!isListening) {
            await startMicrophoneDetection();
        } else {
            stopMicrophoneDetection();
        }
    });
}

function blowCandle(flame) {
    if (!flame.classList.contains('blown-out')) {
        flame.classList.add('blown-out');
        candlesLit--;
        
        // Play blow sound effect
        playBlowSound();
        
        // Check if all candles are blown
        if (candlesLit === 0) {
            setTimeout(allCandlesBlown, 500);
        }
    }
}

function blowAllCandles() {
    const flames = document.querySelectorAll('.flame:not(.blown-out)');
    let delay = 0;
    
    flames.forEach(flame => {
        setTimeout(() => {
            blowCandle(flame);
        }, delay);
        delay += 150;
    });
}

function allCandlesBlown() {
    const wishReveal = document.getElementById('wishReveal');
    const blowStatus = document.getElementById('blowStatus');
    
    wishReveal.classList.remove('hidden');
    blowStatus.textContent = "🎉 All candles blown! Your wish will come true! 🎉";
    
    // Launch celebration
    launchConfetti();
    
    // Create fireworks effect
    createFireworks();
}

async function startMicrophoneDetection() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        microphone = audioContext.createMediaStreamSource(stream);
        
        analyser.fftSize = 256;
        microphone.connect(analyser);
        
        isListening = true;
        document.getElementById('micBtn').textContent = '🎤 Listening... (Click to Stop)';
        document.getElementById('blowStatus').textContent = '🌬️ Blow into your microphone!';
        
        detectBlow();
    } catch (err) {
        alert('Microphone access denied. You can still click the candles or use the blow button!');
        console.error('Microphone error:', err);
    }
}

function stopMicrophoneDetection() {
    if (audioContext) {
        audioContext.close();
    }
    isListening = false;
    document.getElementById('micBtn').textContent = '🎤 Enable Microphone to Blow';
    document.getElementById('blowStatus').textContent = '';
}

function detectBlow() {
    if (!isListening || !analyser) return;
    
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(dataArray);
    
    // Calculate average volume
    const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
    
    // If volume is high enough (blow detected)
    if (average > 50) {
        const flames = document.querySelectorAll('.flame:not(.blown-out)');
        if (flames.length > 0) {
            // Blow a random candle
            const randomFlame = flames[Math.floor(Math.random() * flames.length)];
            blowCandle(randomFlame);
        }
    }
    
    if (candlesLit > 0) {
        requestAnimationFrame(detectBlow);
    } else {
        stopMicrophoneDetection();
    }
}

function playBlowSound() {
    // Create a simple blow sound using Web Audio API
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
}

function createFireworks() {
    const colors = ['#ff69b4', '#ffeb3b', '#ff6b6b', '#4ecdc4', '#45b7d1', '#a66cff'];
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.cssText = `
                position: fixed;
                left: ${Math.random() * 80 + 10}%;
                top: ${Math.random() * 50 + 20}%;
                width: 10px;
                height: 10px;
                z-index: 1001;
                pointer-events: none;
            `;
            
            // Create particles
            for (let j = 0; j < 12; j++) {
                const particle = document.createElement('div');
                const angle = (j / 12) * 360;
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                particle.style.cssText = `
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    background: ${color};
                    border-radius: 50%;
                    animation: fireworkParticle 1s ease-out forwards;
                    transform: rotate(${angle}deg) translateY(0);
                `;
                
                firework.appendChild(particle);
            }
            
            document.body.appendChild(firework);
            
            setTimeout(() => firework.remove(), 1000);
        }, i * 300);
    }
    
    // Add firework animation if not exists
    if (!document.getElementById('fireworkStyle')) {
        const style = document.createElement('style');
        style.id = 'fireworkStyle';
        style.textContent = `
            @keyframes fireworkParticle {
                0% { transform: rotate(inherit) translateY(0); opacity: 1; }
                100% { transform: rotate(inherit) translateY(-100px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== Balloon Pop Feature =====
function setupBalloonPop() {
    const balloons = document.querySelectorAll('.balloon');
    const popMessage = document.getElementById('popMessage');
    
    balloons.forEach(balloon => {
        balloon.addEventListener('click', () => {
            if (balloon.classList.contains('popped')) return;
            
            const message = balloon.dataset.message;
            
            // Pop animation
            balloon.classList.add('popped');
            
            // Play pop sound
            playPopSound();
            
            // Create pop particles
            createPopParticles(balloon);
            
            // Show message
            popMessage.textContent = message;
            popMessage.classList.add('show');
            
            // Remove balloon after animation
            setTimeout(() => {
                balloon.style.visibility = 'hidden';
            }, 300);
            
            // Hide message after delay
            setTimeout(() => {
                popMessage.classList.remove('show');
            }, 2500);
        });
    });
}

function playPopSound() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create noise for pop sound
    const bufferSize = audioCtx.sampleRate * 0.1;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }
    
    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    
    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
    
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1000;
    
    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    noise.start();
}

function createPopParticles(balloon) {
    const rect = balloon.getBoundingClientRect();
    const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6bd6', '#a66cff'];
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        const angle = Math.random() * 360;
        const velocity = Math.random() * 100 + 50;
        const size = Math.random() * 10 + 5;
        
        particle.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1002;
            animation: popParticle 0.6s ease-out forwards;
            --angle: ${angle}deg;
            --velocity: ${velocity}px;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 600);
    }
    
    // Add particle animation if not exists
    if (!document.getElementById('popParticleStyle')) {
        const style = document.createElement('style');
        style.id = 'popParticleStyle';
        style.textContent = `
            @keyframes popParticle {
                0% { 
                    transform: translate(0, 0) scale(1);
                    opacity: 1;
                }
                100% { 
                    transform: translate(
                        calc(cos(var(--angle)) * var(--velocity)),
                        calc(sin(var(--angle)) * var(--velocity))
                    ) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== Scratch Card Feature =====
function setupScratchCard() {
    const canvas = document.getElementById('scratchCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let isScratching = false;
    let scratchedPercentage = 0;
    
    // Initialize canvas with scratch surface
    initScratchCard(ctx, canvas);
    
    // Mouse events
    canvas.addEventListener('mousedown', (e) => {
        isScratching = true;
        scratch(e, ctx, canvas);
    });
    
    canvas.addEventListener('mousemove', (e) => {
        if (isScratching) {
            scratch(e, ctx, canvas);
        }
    });
    
    canvas.addEventListener('mouseup', () => {
        isScratching = false;
        checkScratchProgress(ctx, canvas);
    });
    
    canvas.addEventListener('mouseleave', () => {
        isScratching = false;
    });
    
    // Touch events for mobile
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        isScratching = true;
        scratchTouch(e, ctx, canvas);
    });
    
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (isScratching) {
            scratchTouch(e, ctx, canvas);
        }
    });
    
    canvas.addEventListener('touchend', () => {
        isScratching = false;
        checkScratchProgress(ctx, canvas);
    });
}

function initScratchCard(ctx, canvas) {
    // Create gradient scratch surface
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#c0c0c0');
    gradient.addColorStop(0.5, '#d4d4d4');
    gradient.addColorStop(1, '#a8a8a8');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add scratch pattern
    ctx.fillStyle = '#b0b0b0';
    for (let i = 0; i < 50; i++) {
        ctx.beginPath();
        ctx.arc(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            Math.random() * 20 + 5,
            0,
            Math.PI * 2
        );
        ctx.fill();
    }
    
    // Add text
    ctx.fillStyle = '#888';
    ctx.font = 'bold 20px Poppins, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Scratch Here! ✨', canvas.width / 2, canvas.height / 2);
}

function scratch(e, ctx, canvas) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();
}

function scratchTouch(e, ctx, canvas) {
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();
}

function checkScratchProgress(ctx, canvas) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;
    
    for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] < 128) {
            transparentPixels++;
        }
    }
    
    const percentage = (transparentPixels / (pixels.length / 4)) * 100;
    
    // If more than 50% scratched, reveal completely
    if (percentage > 50) {
        canvas.style.transition = 'opacity 0.5s ease';
        canvas.style.opacity = '0';
        
        // Celebration
        launchConfetti();
    }
}

// ===== Memory Gallery Feature =====
function setupMemoryGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const memoryPopup = document.getElementById('memoryPopup');
    const memoryImage = document.getElementById('memoryImage');
    const memoryText = document.getElementById('memoryText');
    const memoryClose = document.getElementById('memoryClose');
    
    if (!memoryPopup) return;
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const memory = item.dataset.memory;
            const img = item.querySelector('img');
            
            // Set the image
            memoryImage.innerHTML = `<img src="${img.src}" alt="Memory">`;
            
            // Set the memory text
            memoryText.textContent = memory;
            
            // Show popup
            memoryPopup.classList.remove('hidden');
            
            // Add floating hearts effect
            createMemoryHearts();
        });
    });
    
    // Close popup
    memoryClose.addEventListener('click', () => {
        memoryPopup.classList.add('hidden');
    });
    
    // Close on background click
    memoryPopup.addEventListener('click', (e) => {
        if (e.target === memoryPopup) {
            memoryPopup.classList.add('hidden');
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !memoryPopup.classList.contains('hidden')) {
            memoryPopup.classList.add('hidden');
        }
    });
}

function createMemoryHearts() {
    const hearts = ['💖', '💕', '💗', '💝', '💞'];
    
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}vw;
                top: 100vh;
                font-size: ${Math.random() * 20 + 20}px;
                pointer-events: none;
                z-index: 2001;
                animation: floatUpMemory 3s ease-out forwards;
            `;
            
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 3000);
        }, i * 100);
    }
    
    // Add animation if not exists
    if (!document.getElementById('memoryHeartsStyle')) {
        const style = document.createElement('style');
        style.id = 'memoryHeartsStyle';
        style.textContent = `
            @keyframes floatUpMemory {
                0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}
