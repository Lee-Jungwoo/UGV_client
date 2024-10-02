// Get references to the UGVs and Buttons
const ugv1 = document.getElementById('ugv1');
const ugv2 = document.getElementById('ugv2');
const mapImage = document.getElementById('map-image');
const redDotsContainer = document.querySelector('.red-dots');
const logBody = document.getElementById('log-body');
const clearLogButton = document.getElementById('clear-log');

// Define paths for UGVs (arrays of {x, y} positions on the map)
const ugv1Path = [{ x: 10, y: 20 }];
const ugv2Path = [{ x: 20, y: 80 }];

// Define possible failures(defects)
const failureTypes = ['도로 균열', '화재 발생', '미확인 거수자']

// Function to move UGVs along the path
function moveUGV(ugv, path, speed, ugvName) {
    let index = 0;

    const ugvNum = ugv.dataset.ugv;


    function move() {
        let position = path[index];

        if (position) {
            const mapWidth = mapImage.clientWidth;
            const mapHeight = mapImage.clientHeight;

            if (ugvNum == "1") {
                if ((position.y / 100) > 80) {
                    path[index].y--;

                } else {
                    path[index].y++;
                }
            } else if (ugvNum == "2") {
                if ((position.x / 100) > 80) {
                    path[index].x--;
                } else {
                    path[index].x++;
                }
            }

            position = path[index]; // update path array

            const ugvLeft = (position.x / 100) * mapWidth;
            const ugvTop = (position.y / 100) * mapHeight;



            ugv.style.left = `${ugvLeft}px`;
            ugv.style.top = `${ugvTop}px`;
        }


        if (Math.random() > 0.8) {
            leaveRedDot(position);
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
            <td>${ugvName}</td>
            <td>${new Date().toLocaleString()}</td>
            <td>${failureTypes[Math.floor(Math.random() * 3)]}</td>
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
    while (redDotsContainer.firstChild) {
        redDotsContainer.removeChild(redDotsContainer.firstChild);
    }
})
