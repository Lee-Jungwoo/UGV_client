// Get references to the UGVs and Buttons
const ugv1 = document.getElementById('ugv1');
const ugv2 = document.getElementById('ugv2');
const mapImage = document.getElementById('map-image');
const redDotsContainer = document.querySelector('.red-dots');
const logBody = document.getElementById('log-body');
const clearLogButton = document.getElementById('clear-log');

// Select the photo popup
const photoPopup = document.getElementById('photo-popup');
const popupPhoto = document.getElementById('popup-photo');

// Define paths for UGVs (arrays of {x, y} positions on the map)
const ugv1Path = [{ x: 50, y: 10 }];
const ugv2Path = [{ x: 10, y: 48 }];

// Define possible failures(defects)
const failureTypes = ['도로 균열', '화재 발생', '미확인 거수자']

// Array to store defects
const defects = [];



// Function to move UGVs along the path
function moveUGV(ugv, path, speed, ugvName) {
    let index = 0;
    let advance = true;

    const ugvNum = ugv.dataset.ugv;
    

    function move() {
        let position = path[index];

        if (position) {
            const mapWidth = mapImage.clientWidth;
            const mapHeight = mapImage.clientHeight;

            
            if (ugvNum == "1") {
                if(advance){
                    path[index].y++;
                }else {
                    path[index].y--;
                }
                if ((position.y / 100) > 0.8 || (position.y / 100) < 0.1) {
                    advance = !advance;
                }

            } else if (ugvNum == "2") {
                if(advance){
                    path[index].x++;
                }else{
                    path[index].x--;
                }
                if ((position.x / 100) > 0.8 || (position.x / 100) < 0.1) {
                    advance = !advance;
                }

            }

            position = path[index]; // update path array

            const ugvLeft = (position.x / 100) * mapWidth;
            const ugvTop = (position.y / 100) * mapHeight;



            ugv.style.left = `${ugvLeft}px`;
            ugv.style.top = `${ugvTop}px`;
        }


        if (Math.random() > 0.95) {
            const f = failureTypes[Math.floor(Math.random() * 3)];

            leaveRedDot(position, ugvNum, f);
            logDefect(ugvName, position, f);
        }


        index = (index + 1) % path.length;
        setTimeout(move, speed);
    }
    move();
}

// Function to leave a red dot at the UGV's current position
function leaveRedDot(position, ugvNum, f) {
    
    let url;
    if(f === '도로 균열'){
        url = 'road_crack.jpg';
    }else if(f === '화재 발생'){
        url = 'fire.png';
    }else if(f==='미확인 거수자'){
        url = 'unidentified_people.jpeg';
    }

    console.log(url);
    const defect = {
        type: f,
        location: `UGV${ugvNum}`,
        time: new Date().toLocaleString(),
        photo: url,
    };

    defects.push(defect);
    
    
    const dot = document.createElement('div');
    dot.classList.add('red-dot');
    dot.style.left = position.x + '%';
    dot.style.top = position.y + '%';
    

    dot.addEventListener('click', function() {
        showDefectPopup(defect);
    });

    redDotsContainer.appendChild(dot);
}

function showDefectPopup(defect) {
    // Populate the popup with defect data
    document.getElementById('defect-type').innerText = defect.type;
    document.getElementById('defect-location').innerText = defect.location;
    document.getElementById('defect-time').innerText = defect.time;
    document.getElementById('defect-photo').src = defect.photo;

    // Show the popup
    document.getElementById('defect-popup').classList.remove('hidden');
    document.getElementById('defect-popup').style.display = 'block';
}

document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('defect-popup').style.display = 'none';
});

// Function to log defect in the table
function logDefect(ugvName, position, f) {
    let url;
    if(f === '도로 균열'){
        url = 'road_crack.jpg';
    }else if(f === '화재 발생'){
        url = 'fire.png';
    }else if(f==='미확인 거수자'){
        url = 'unidentified_people.jpeg';
    }
    
    const logEntry = `
        <tr>
            <td>${ugvName}</td>
            <td>${new Date().toLocaleString()}</td>
            <td>${f}</td>
            <td><button class="view-photo" data-photo="${url}">View Photo</button></td>
        </tr>
    `;
    logBody.innerHTML += logEntry;
}

// Start moving UGVs
moveUGV(ugv1, ugv1Path, 10, 'UGV 1'); // Move every 1 second
moveUGV(ugv2, ugv2Path, 120, 'UGV 2'); // Move every 1.2 seconds


clearLogButton.addEventListener('click', function () {
    logBody.innerHTML = '';
    while (redDotsContainer.firstChild) {
        redDotsContainer.removeChild(redDotsContainer.firstChild);
    }
});



// Function to show photo popup
function showPhotoPopup(photoSrc, buttonElement) {
    // Set the photo in the popup
    popupPhoto.src = photoSrc;

    // Get the button's position and size
    const buttonRect = buttonElement.getBoundingClientRect();

    // Position the popup to the left of the button
    const popupX = buttonRect.left - photoPopup.offsetWidth; // 10px gap
    const popupY = buttonRect.top;

    // Apply the calculated position to the popup
    photoPopup.style.left = `${popupX}px`;
    photoPopup.style.top = `${popupY}px`;

    // Show the popup
    photoPopup.classList.remove('hidden');
    photoPopup.style.display = 'block';
}

// Function to close the photo popup
document.querySelector('.close-photo-btn').addEventListener('click', () => {
    photoPopup.classList.add('hidden');
    photoPopup.style.display = 'none';
});

// Attach click event to "View Photo" links
document.querySelectorAll('.view-photo').forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault();

        const photoSrc = this.dataset.photo; // Assuming you store the photo URL in data-photo
        showPhotoPopup(photoSrc, this);
    });
    console.log("added event listener");
    console.log(this.dataset.photo);
});

