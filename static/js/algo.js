// Canvas setup
const canvas = document.getElementById('algoCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

// Initial resize
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Array to be sorted
let array = [];
const arraySize = 50;
let animationSpeed = 20;
let isSorting = false;
let animationId = null;

// Initialize array with random values
function initArray() {
    array = [];
    const minHeight = 10;
    const maxHeight = canvas.height - 20;
    
    for (let i = 0; i < arraySize; i++) {
        array.push({
            value: Math.floor(Math.random() * (maxHeight - minHeight) + minHeight),
            color: '#6366F1' // indigo-500
        });
    }
}

// Draw the array
function drawArray(highlight1 = -1, highlight2 = -1) {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const barWidth = (canvas.width - 20) / array.length - 2;
    const xSpacing = (canvas.width - 20) / array.length;
    
    array.forEach((item, index) => {
        // Set bar color
        if (index === highlight1 || index === highlight2) {
            ctx.fillStyle = '#EC4899'; // pink-500 for highlighted bars
        } else {
            ctx.fillStyle = item.color;
        }
        
        // Draw bar
        const x = 10 + index * xSpacing;
        const y = canvas.height - item.value - 10;
        const height = item.value;
        
        // Draw bar with rounded top corners
        const radius = 4;
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + barWidth - radius, y);
        ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + radius);
        ctx.lineTo(x + barWidth, y + height);
        ctx.lineTo(x, y + height);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.fill();
        
        // Add subtle shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
    });
    
    // Reset shadow
    ctx.shadowColor = 'transparent';
}

// Bubble Sort Algorithm
async function bubbleSort() {
    if (isSorting) return;
    isSorting = true;
    
    let n = array.length;
    let swapped;
    
    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            // Highlight the two elements being compared
            drawArray(i, i + 1);
            
            // Add a small delay for visualization
            await new Promise(resolve => setTimeout(resolve, animationSpeed));
            
            if (array[i].value > array[i + 1].value) {
                // Swap elements
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                swapped = true;
                
                // Redraw after swap
                drawArray(i, i + 1);
                await new Promise(resolve => setTimeout(resolve, animationSpeed));
            }
        }
        n--;
    } while (swapped && isSorting);
    
    // Final draw
    drawArray();
    isSorting = false;
}

// Selection Sort Algorithm
async function selectionSort() {
    if (isSorting) return;
    isSorting = true;
    
    const n = array.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        // Find the minimum element in the unsorted array
        for (let j = i + 1; j < n; j++) {
            // Highlight the current minimum and the element being compared
            drawArray(minIndex, j);
            await new Promise(resolve => setTimeout(resolve, animationSpeed));
            
            if (array[j].value < array[minIndex].value) {
                minIndex = j;
            }
        }
        
        // Swap the found minimum element with the first element
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            drawArray(i, minIndex);
            await new Promise(resolve => setTimeout(resolve, animationSpeed));
        }
    }
    
    // Final draw
    drawArray();
    isSorting = false;
}

// Randomize array and redraw
function randomizeArray() {
    if (isSorting) {
        isSorting = false;
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    }
    initArray();
    drawArray();
}

// Change sorting speed
function changeSpeed(speed) {
    animationSpeed = 100 - speed; // Invert so higher values are faster
}

// Initialize everything when the page loads
function init() {
    initArray();
    drawArray();
    
    // Add event listeners for controls
    document.getElementById('randomizeBtn')?.addEventListener('click', randomizeArray);
    document.getElementById('bubbleSortBtn')?.addEventListener('click', bubbleSort);
    document.getElementById('selectionSortBtn')?.addEventListener('click', selectionSort);
    document.getElementById('speedControl')?.addEventListener('input', (e) => {
        changeSpeed(e.target.value);
    });
    
    // Initial draw
    drawArray();
}

// Start the visualization when the page loads
window.addEventListener('load', init);
