// Minimal DSA Visualization - Looping Bubble Sort
const canvas = document.getElementById('algoCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let bars = [];
const barCount = 40;
let isSorting = false;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initBars();
}

function initBars() {
    bars = [];
    for (let i = 0; i < barCount; i++) {
        bars.push({
            value: Math.random() * 0.6 + 0.1, // 10% to 70% of height
            color: '#e5e7eb' // gray-200
        });
    }
}

function draw() {
    ctx.clearRect(0, 0, width, height);

    const barWidth = width / barCount;

    bars.forEach((bar, i) => {
        const h = bar.value * height;
        const x = i * barWidth;
        const y = height - h;

        ctx.fillStyle = bar.color;
        ctx.fillRect(x + 2, y, barWidth - 4, h);
    });
}

async function loop() {
    if (isSorting) return;
    isSorting = true;

    // Reset colors
    bars.forEach(b => b.color = '#f3f4f6'); // gray-100

    let n = bars.length;
    let swapped;

    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            // Highlight current
            const originalColor = bars[i].color;
            bars[i].color = '#6366f1'; // indigo-500
            bars[i + 1].color = '#6366f1';

            draw();
            await new Promise(r => setTimeout(r, 50));

            if (bars[i].value > bars[i + 1].value) {
                [bars[i], bars[i + 1]] = [bars[i + 1], bars[i]];
                swapped = true;
                draw();
            }

            bars[i].color = '#f3f4f6';
            bars[i + 1].color = '#f3f4f6';
        }
        n--;
    } while (swapped);

    // Fade to success color
    bars.forEach(b => b.color = '#10b981'); // emerald-500
    draw();
    await new Promise(r => setTimeout(r, 2000));

    // Restart
    isSorting = false;
    initBars();
    loop();
}

window.addEventListener('resize', resize);
resize();
loop();
