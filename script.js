// Get references to the UGVs and Buttons
const ugv1 = document.getElementById('ugv1');
const ugv2 = document.getElementById('ugv2');
const redDotsContainer = document.querySelector('.red-dots');
const logBody = document.getElementById('log-body');
const clearLogButton = document.getElementById('clear-log');

// Define paths for UGVs (arrays of {x, y} positions on the map)
const ugv1Path = { x: 10, y: 20 };
const ugv2Path = { x: 20, y: 80 };

// Function to move UGVs along the path
function moveUGV(ugv, path, speed, ugvName) {
    let index = 0;

    function move() {
        const position = path[index];
        if (position) {
            ugv.style.left = position.x + '%';
            ugv.style.top = position.y + '%';
        }
        // Leave a red dot at the current location
        leaveRedDot(position);

        // Log defect on the path at specific points
        if (index === 2) { // Example: logging at 3rd point
            logDefect(ugvName, position);
        }

        index = (index + 1) % path.length;
        setTimeout(move, speed);
    }
    move();
}

// Function to leave a red dot at the UGV's current position
function leaveRedDot(position) {
    const dot = document.createElement('div');
    dot.classList.add('red-dot');
    dot.style.left = position.x + '%';
    dot.style.top = position.y + '%';
    redDotsContainer.appendChild(dot);
}

// Function to log defect in the table
function logDefect(ugvName, position) {
    const logEntry = `
        <tr>
            <td>${ugvName} at (${position.x}%, ${position.y}%)</td>
            <td>${new Date().toLocaleString()}</td>
            <td>Defect detected</td>
            <td><a href="#">View Photo</a></td>
        </tr>
    `;
    logBody.innerHTML += logEntry;
}

// Start moving UGVs
moveUGV(ugv1, ugv1Path, 1000, 'UGV 1'); // Move every 1 second
moveUGV(ugv2, ugv2Path, 1200, 'UGV 2'); // Move every 1.2 seconds


clearLogButton.addEventListener('click', function () {
    logBody.innerHTML = '';
    while(redDotsContainer.firstChild) {
        redDotsContainer.removeChild(redDotsContainer.firstChild);
    }
})
