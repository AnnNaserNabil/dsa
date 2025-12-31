// Premium DSA Visualization - Artistic Sorting
const canvas = document.getElementById('algoCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
const particleCount = 60;
let isSorting = false;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
}

function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            value: Math.random(),
            x: (i / particleCount) * width,
            targetX: (i / particleCount) * width,
            color: '#6366f1',
            active: false
        });
    }
}

function draw() {
    ctx.clearRect(0, 0, width, height);

    const barWidth = width / particleCount;

    particles.forEach((p, i) => {
        const h = p.value * (height * 0.6);
        const x = p.x;
        const y = height - h;

        // Gradient for bars
        const grad = ctx.createLinearGradient(x, y, x, height);
        if (p.active) {
            grad.addColorStop(0, '#818cf8'); // indigo-400
            grad.addColorStop(1, 'rgba(129, 140, 248, 0)');
        } else {
            grad.addColorStop(0, 'rgba(99, 102, 241, 0.3)'); // indigo-500 with low opacity
            grad.addColorStop(1, 'rgba(99, 102, 241, 0)');
        }

        ctx.fillStyle = grad;
        ctx.fillRect(x + 4, y, barWidth - 8, h);

        // Glowing top point
        if (p.active) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#818cf8';
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(x + barWidth / 2, y, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    });
}

async function sort() {
    if (isSorting) return;
    isSorting = true;

    let n = particles.length;
    let swapped;

    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            particles[i].active = true;
            particles[i + 1].active = true;
            draw();

            await new Promise(r => setTimeout(r, 40));

            if (particles[i].value > particles[i + 1].value) {
                // Swap values
                const temp = particles[i].value;
                particles[i].value = particles[i + 1].value;
                particles[i + 1].value = temp;
                swapped = true;
                draw();
            }

            particles[i].active = false;
            particles[i + 1].active = false;
        }
        n--;
    } while (swapped);

    // Completion effect
    for (let i = 0; i < particles.length; i++) {
        particles[i].active = true;
        draw();
        await new Promise(r => setTimeout(r, 10));
        particles[i].active = false;
    }

    await new Promise(r => setTimeout(r, 3000));
    isSorting = false;
    initParticles();
    sort();
}

window.addEventListener('resize', resize);
resize();
sort();
