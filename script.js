window.addEventListener("load", () => {
    const frontPortal = document.getElementById("frontPortal");
    const portalEnterBtn = document.getElementById("portalEnterBtn");
    const luxuryMain = document.getElementById("luxuryMain");
    const stardustLayer = document.getElementById("stardustLayer");
    const fireBlastCanvas = document.getElementById("fireBlastCanvas");
    const hangingGarland = document.getElementById("hangingGarland");
    
    const candleFlameTarget = document.getElementById("candleFlameTarget");
    const candleFlame = document.getElementById("candleFlame");
    const smokeTrail = document.getElementById("smokeTrail");
    const cakeAssembly = document.getElementById("cakeAssembly");
    const wishRevealPanel = document.getElementById("wishRevealPanel");
    
    const nextToBalloonBtn = document.getElementById("nextToBalloonBtn");
    const balloonSection = document.getElementById("balloonSection");
    const surpriseBalloon = document.getElementById("surpriseBalloon");
    
    const giftSection = document.getElementById("giftSection");
    const giftPackage = document.getElementById("giftPackage");
    const memoirLetter = document.getElementById("memoirLetter");
    
    const goToAlbumBtn = document.getElementById("goToAlbumBtn");
    const albumSection = document.getElementById("albumSection");

    let context = fireBlastCanvas ? fireBlastCanvas.getContext("2d") : null;
    let effectParticles = [];
    let loopId = null;

    function handleResize() {
        if (!fireBlastCanvas) return;
        fireBlastCanvas.width = window.innerWidth;
        fireBlastCanvas.height = window.innerHeight;
    }
    window.addEventListener("resize", handleResize);
    handleResize();

    function makeAtmosphere() {
        if (!stardustLayer) return;
        stardustLayer.innerHTML = ""; 
        for (let i = 0; i < 45; i++) {
            const particle = document.createElement('div');
            particle.className = 'dust-particle';
            particle.style.width = `${Math.random() * 3 + 1}px`;
            particle.style.height = particle.style.width;
            particle.style.left = `${Math.random() * 100}vw`;
            particle.style.top = `${Math.random() * 100}vh`;
            
            particle.animate([{ opacity: 0.1 }, { opacity: 0.9 }, { opacity: 0.1 }], {
                duration: 2000 + Math.random() * 2000,
                iterations: Infinity
            });
            stardustLayer.appendChild(particle);
        }
    }
    makeAtmosphere();

    // SUPER GLOWING RITUAL BLAST SYSTEM FOR CANDLE & BALLOON
    class MagicalBlastParticle {
        constructor(x, y, category) {
            this.x = x;
            this.y = y;
            this.category = category; // 'star', 'balloon', 'candy', 'sparkle'
            
            this.vx = (Math.random() - 0.5) * 20;
            this.vy = (Math.random() - 0.5) * 20 - 4;
            this.alpha = 1;
            this.decay = Math.random() * 0.012 + 0.006;
            this.rotation = Math.random() * 360;
            this.spin = (Math.random() - 0.5) * 8;
            
            // Assign custom size/emojis based on category
            if (this.category === 'star') {
                this.char = "⭐️";
                this.size = Math.random() * 16 + 14;
            } else if (this.category === 'balloon') {
                this.char = Math.random() > 0.5 ? "🎈" : "🌸";
                this.size = Math.random() * 20 + 16;
                this.vy = -Math.random() * 12 - 4; // Fly up gracefully
            } else if (this.category === 'candy') {
                this.char = Math.random() > 0.5 ? "🍬" : "🍭";
                this.size = Math.random() * 16 + 14;
            } else {
                this.char = "✨";
                this.size = Math.random() * 12 + 10;
            }
        }
        step() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.category !== 'balloon') this.vy += 0.12; // Gravity effect
            this.alpha -= this.decay;
            this.rotation += this.spin;
        }
        render() {
            if (!context) return;
            context.save();
            context.globalAlpha = this.alpha;
            context.font = `${this.size}px Arial`;
            context.translate(this.x, this.y);
            context.rotate((this.rotation * Math.PI) / 180);
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillText(this.char, 0, 0);
            context.restore();
        }
    }

    function deployUltimateMegaBlast(x, y, amount) {
        const pools = ['star', 'balloon', 'candy', 'sparkle'];
        for (let i = 0; i < amount; i++) {
            let selectedPool = pools[Math.floor(Math.random() * pools.length)];
            effectParticles.push(new MagicalBlastParticle(x, y, selectedPool));
        }
        if (!loopId) masterLoop();
    }

    function masterLoop() {
        if (!context) return;
        context.clearRect(0, 0, fireBlastCanvas.width, fireBlastCanvas.height);
        
        for (let i = effectParticles.length - 1; i >= 0; i--) {
            effectParticles[i].step();
            if (effectParticles[i].alpha <= 0) {
                effectParticles.splice(i, 1);
            } else {
                effectParticles[i].render();
            }
        }
        
        if (effectParticles.length > 0) {
            loopId = requestAnimationFrame(masterLoop);
        } else {
            loopId = null;
        }
    }

    // Smooth Enter Portal Navigation
    if (portalEnterBtn && frontPortal && luxuryMain && hangingGarland) {
        portalEnterBtn.addEventListener("click", (e) => {
            e.preventDefault();
            frontPortal.classList.add("dismissed");
            luxuryMain.classList.remove("hidden");
            window.scrollTo({ top: 0 });
            setTimeout(() => {
                hangingGarland.style.transform = "translate3d(-50%, 150px, 0)";
            }, 300);
        });
    }

    let candleIsLit = true;
    if (candleFlameTarget && candleFlame && smokeTrail && cakeAssembly && wishRevealPanel) {
        candleFlameTarget.addEventListener("click", () => {
            if (!candleIsLit) return;
            candleIsLit = false;
            candleFlame.classList.add("dead");
            smokeTrail.classList.add("rise");
            
            // Mega Full Screen Blast Trigger
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            deployUltimateMegaBlast(centerX, centerY - 50, 180);
            deployUltimateMegaBlast(centerX - 100, centerY, 100);
            deployUltimateMegaBlast(centerX + 100, centerY, 100);
            
            setTimeout(() => {
                cakeAssembly.classList.add("quenched");
                wishRevealPanel.classList.remove("hidden");
            }, 900);
        });
    }

    if (nextToBalloonBtn && balloonSection) {
        nextToBalloonBtn.addEventListener("click", () => {
            balloonSection.classList.remove("hidden");
            balloonSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }

    let balloonPopped = false;
    if (surpriseBalloon && giftSection) {
        surpriseBalloon.addEventListener("click", (evt) => {
            if (balloonPopped) return;
            balloonPopped = true;
            surpriseBalloon.style.display = 'none';
            
            deployUltimateMegaBlast(evt.clientX || window.innerWidth/2, evt.clientY || window.innerHeight/2, 150);
            
            setTimeout(() => {
                giftSection.classList.remove("hidden");
                giftSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 700);
        });
    }

    if (giftPackage && memoirLetter) {
        giftPackage.addEventListener("click", () => {
            giftPackage.classList.add("unwrapped");
            setTimeout(() => {
                memoirLetter.classList.remove("hidden");
                memoirLetter.offsetHeight;
                memoirLetter.classList.add("visible");
            }, 500);
        });
    }

    if (goToAlbumBtn && albumSection) {
        goToAlbumBtn.addEventListener("click", () => {
            albumSection.classList.remove("hidden");
            albumSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }
});
      
