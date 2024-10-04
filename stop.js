let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 1;

const display = document.getElementById("display");
const lapList = document.getElementById("lapList");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const clock = document.getElementById("clock");

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 10); // Update every 10 milliseconds
        running = true;

        // Disable the start button to avoid multiple clicks
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        resetBtn.disabled = false;
        lapBtn.disabled = false;
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10); // Convert milliseconds to a 2-digit format

    display.innerHTML = (hours < 10 ? "0" : "") + hours + ":" + 
                        (minutes < 10 ? "0" : "") + minutes + ":" + 
                        (seconds < 10 ? "0" : "") + seconds + "." + 
                        (milliseconds < 10 ? "0" : "") + milliseconds; // Format display
}

function pauseTimer() {
    clearInterval(tInterval);
    running = false;

    // Enable the start button again
    startBtn.disabled = false;
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerHTML = "00:00:00.000"; // Reset display
    lapList.innerHTML = ""; // Clear lap times
    lapCounter = 1; // Reset lap counter

    // Reset button states
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
}

function recordLap() {
    if (running) {
        const lapTime = display.innerHTML;
        const lapItem = document.createElement("li");
        lapItem.textContent = "Lap " + lapCounter + ": " + lapTime;
        lapList.appendChild(lapItem);
        lapCounter++;
    }
}

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    clock.innerHTML = ${hours}:${minutes}:${seconds};
}

// Event Listeners for Desktop (click)
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", recordLap);

// Update the clock every second
setInterval(updateClock, 1000);
updateClock(); // Initial call to set clock immediately

// Initial button states (for when the page loads)
pauseBtn.disabled = true;
resetBtn.disabled = true;
lapBtn.disabled = true;
