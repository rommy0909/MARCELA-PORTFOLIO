document.addEventListener('DOMContentLoaded', function() {
    // Verify DOM is loaded
    console.log('DOM fully loaded and parsed');

    // Element declarations - Double check these IDs match your HTML EXACTLY
    const display = document.getElementById('display');
    const startStopButton = document.getElementById('startStop');
    const stopButton = document.getElementById('stopButton'); // ADDED
    const resetButton = document.getElementById('reset');
    const lapButton = document.getElementById('lap');
    const lapList = document.getElementById('lapList');
    const sessionNameInput = document.getElementById('sessionName');
    const saveSessionButton = document.getElementById('saveSession');
    const savedSessionsList = document.getElementById('savedSessions');
    const clearAllSessionsButton = document.getElementById('clearAllSessions');
    const themeSelect = document.getElementById('theme');

    // Timer Mode Elements
    const stopwatchBtn = document.getElementById('stopwatchBtn');
    const timerBtn = document.getElementById('timerBtn');
    const stopwatchContainer = document.getElementById('stopwatch-container'); // Corrected ID
    const timerContainer = document.getElementById('timer-container'); // Corrected ID
    const timerControls = document.getElementById('timerControls');
    const timerNameInput = document.getElementById('timerName');
    const hoursInput = document.getElementById('hours');
    const minutesInput = document.getElementById('minutes');
    const secondsInput = document.getElementById('seconds');
    const setTimerButton = document.getElementById('setTimer');
    const activeTimersList = document.getElementById('activeTimers');
    const startAllTimersButton = document.getElementById('startAllTimers'); // New Line
    const alarmSound = document.getElementById('alarmSound'); // Added

    // Check if elements are null (for debugging)
    if (!display || !startStopButton || !stopButton || !resetButton || !lapButton || !lapList ||
        !sessionNameInput || !saveSessionButton || !savedSessionsList || !clearAllSessionsButton || !themeSelect ||
        !stopwatchBtn || !timerBtn || !stopwatchContainer || !timerContainer || !timerControls || !timerNameInput ||
        !hoursInput || !minutesInput || !secondsInput || !setTimerButton || !activeTimersList || !startAllTimersButton || !alarmSound) { // Modified Line
        console.error('One or more elements not found. Check your IDs!');
        return; // Stop script execution if elements are missing
    }

    let timerInterval;
    let startTime;
    let elapsedTime = 0;
    let lapNumber = 1;
    let isRunning = false;
    let timerMode = 'stopwatch'; // Default to stopwatch mode
    let timerEndTime;
    let activeTimers = [];

    // Functions
    function formatTime(ms) {
        const date = new Date(ms);
        const days = Math.floor(ms / (1000 * 60 * 60 * 24));
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        const seconds = date.getUTCSeconds().toString().padStart(2, '0');
        const milliseconds = Math.floor(date.getUTCMilliseconds() / 10).toString().padStart(2, '0');
        return `${days}:${hours}:${minutes}:${seconds}:${milliseconds}`;
    }

    function updateDisplay() {
        display.textContent = formatTime(elapsedTime);
    }

    function startTimer() {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
            saveState();
        }, 10);
        startStopButton.textContent = 'Stop';
        isRunning = true;
    }

    function stopTimer() {  // NEW FUNCTION
        clearInterval(timerInterval);
        isRunning = false;
        startStopButton.textContent = 'Start';
    }

    function startStop() {
        if (isRunning) {
            stopTimer();
        } else {
            startTimer();
        }
        saveState();
    }

    function reset() {
        stopTimer();  // Make sure the timer is stopped
        elapsedTime = 0;
        updateDisplay();
        lapList.innerHTML = '';
        lapNumber = 1;
        clearState();
    }

    function lap() {
        const lapTime = formatTime(elapsedTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapNumber}: ${lapTime}`;
        lapList.appendChild(lapItem);
        lapNumber++;
    }

    function saveSession() {
        const sessionName = sessionNameInput.value.trim();
        if (sessionName === '') {
            alert('Please enter a session name.');
            return;
        }
        const sessionData = {
            name: sessionName,
            time: formatTime(elapsedTime),
            laps: Array.from(lapList.children).map(li => li.textContent)
        };

        let savedSessions = JSON.parse(localStorage.getItem('timerSessions') || '[]');
        savedSessions.push(sessionData);
        localStorage.setItem('timerSessions', JSON.stringify(savedSessions));
        displaySavedSessions();
        sessionNameInput.value = '';
        reset();
    }

    function displaySavedSessions() {
        savedSessionsList.innerHTML = '';
        let savedSessions = JSON.parse(localStorage.getItem('timerSessions') || '[]');
        savedSessions.forEach((session, index) => {
            const sessionItem = document.createElement('li');
            sessionItem.innerHTML = `
                ${session.name} - ${session.time}
                <button class="deleteSession" data-index="${index}">Delete</button>
            `;
            savedSessionsList.appendChild(sessionItem);
        });

        document.querySelectorAll('.deleteSession').forEach(button => {
            button.addEventListener('click', deleteSession);
        });
    }

    function deleteSession(event) {
        const index = event.target.dataset.index;
        let savedSessions = JSON.parse(localStorage.getItem('timerSessions') || '[]');
        savedSessions.splice(index, 1);
        localStorage.setItem('timerSessions', JSON.stringify(savedSessions));
        displaySavedSessions();
    }

    function clearAllSessions() {
        localStorage.removeItem('timerSessions');
        displaySavedSessions();
    }

    function setTheme(theme) {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
        // Apply theme to the container
        container.className = `container ${theme}`; // Corrected line
        updateDisplayColor(theme); // Update color based on theme
    }

    function loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        themeSelect.value = savedTheme;
    }

    // Timer Functions
    function setTimer() {
        const timerName = timerNameInput.value.trim();
        if (timerName === '') {
            alert('Please enter a timer name.');
            return;
        }
        const hours = parseInt(hoursInput.value) || 0;
        const minutes = parseInt(minutesInput.value) || 0;
        const seconds = parseInt(secondsInput.value) || 0;
        const totalMilliseconds = (hours * 60 * 60 + minutes * 60 + seconds) * 1000;

        if (totalMilliseconds <= 0) {
            alert("Please enter a valid time.");
            return;
        }

        const timer = {
            name: timerName,
            initialTime: totalMilliseconds,
            remainingTime: totalMilliseconds,
            isRunning: false,
        };

        activeTimers.push(timer);
        displayActiveTimers();

        // Clear input fields
        timerNameInput.value = '';
        hoursInput.value = '';
        minutesInput.value = '';
        secondsInput.value = '';
    }

    function startActiveTimer(index) {
        const timer = activeTimers[index];
        if (!timer) return;

        if (!timer.isRunning) {
            timer.isRunning = true;
            displayActiveTimers(); // Update display immediately

            timer.intervalId = setInterval(() => {
                timer.remainingTime -= 1000; // count down by 1 second intervals

                if (timer.remainingTime <= 0) {
                    timer.remainingTime = 0; // Ensure value reaches zero.
                    clearInterval(timer.intervalId); // Clear the interval
                    timer.isRunning = false; // mark as timer is stopped
                    displayActiveTimers(); // Update Timer Display with alarm Sound
                    playSound(); // Play alarm sound
                    return;
                }

                displayActiveTimers(); // Update Display with current time
            }, 1000);
        }
    }

    function deleteActiveTimer(index) {
        const timer = activeTimers[index];

        if (timer.isRunning) {
            clearInterval(timer.intervalId); // Clear interval if timer is running
        }

        activeTimers.splice(index, 1);
        displayActiveTimers();
    }

    function formatTimerTime(ms) {
        const hours = Math.floor(ms / (1000 * 60 * 60));
        const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((ms % (1000 * 60)) / 1000);

        const hoursStr = hours.toString().padStart(2, '0');
        const minutesStr = minutes.toString().padStart(2, '0');
        const secondsStr = seconds.toString().padStart(2, '0');

        return `${hoursStr}:${minutesStr}:${secondsStr}`;
    }

    function displayActiveTimers() {
        activeTimersList.innerHTML = '';
        activeTimers.forEach((timer, index) => {
            const timerItem = document.createElement('li');

            timerItem.innerHTML = `
                <span>${timer.name} - ${formatTimerTime(timer.remainingTime)}</span>
                <button class="startTimerBtn" data-index="${index}" ${timer.isRunning ? 'disabled' : ''}>
                    ${timer.isRunning ? 'Running' : 'Start'}
                </button>
                <button class="deleteTimerBtn" data-index="${index}">Delete</button>
                <button class="restartTimerBtn" data-index="${index}">Restart</button>
            `;
            activeTimersList.appendChild(timerItem);

            const startButton = timerItem.querySelector('.startTimerBtn');
            const deleteButton = timerItem.querySelector('.deleteTimerBtn');
            const restartButton = timerItem.querySelector('.restartTimerBtn'); // Add restart button

            startButton.addEventListener('click', () => {
                if (!timer.isRunning) {
                    startActiveTimer(index);
                }
            });

            deleteButton.addEventListener('click', () => deleteActiveTimer(index));

            restartButton.addEventListener('click', () => {
                // Ensure timer stops before restarting
                if (timer.isRunning) {
                    clearInterval(timer.intervalId);
                    timer.isRunning = false;
                }
                // Reset timer to initial values
                timer.remainingTime = timer.initialTime;
                displayActiveTimers();
            });
        });
    }

    function startAllTimers() { // New Function
        activeTimers.forEach((timer, index) => {
            if (!timer.isRunning) {
                startActiveTimer(index);
            }
        });
    }

    function playSound() {  // Added Function
        alarmSound.play().catch(error => {
            console.error("Playback failed:", error);
        });
    }
    // Function to update display color based on theme
    function updateDisplayColor(theme) {
        const displayElement = document.getElementById('display');
        const clockFaceElement = document.querySelector('.clock-face');

        // Define colors for each theme
        const themeColors = {
            'dark': '#fff', // White for dark theme
            'light': '#333', // Dark gray for light theme
            'blue': '#1F618D', // Blue theme
            'green': '#1E8449', // Green theme
            'red': '#C0392B', // Red theme
            'pink': '#D35400', // Pink theme
            'purple': '#8E44AD', // Purple theme
            'orange': '#D35400', // Orange theme
            'teal': '#008080', // Teal theme
            'lime': '#9ACD32', // Lime theme
            'brown': '#8B4513', // Brown theme
            'gray': '#555', // Gray theme
            'soft-pink': '#663333', // Soft Pink theme
            'lavender': '#4B0082', // Lavender theme
            'steel-blue': '#4682B4', // Steel Blue theme
            'light-steel': '#B0C4DE', // Light Steel theme
            'mint': '#F0FFF0', // Mint theme
            'dusty-rose': '#FFF0F5', // Dusty Rose theme
            'forest-green': '#228B22', // Forest Green theme
            'pastel-green': '#90EE90', // Pastel Green theme
            'ocean-blue': '#4682B4', // Ocean Blue theme
            'orchid': '#DA70D6', // Orchid theme
            'deep-teal': '#008080', // Deep Teal theme
            'slate-gray': '#708090', // Slate Gray theme
            'burnt-sienna': '#E97451', // Burnt Sienna theme
            'seafoam-green': '#2E8B57', // Seafoam Green theme
            'ghost-white': '#F8F8FF' // Ghost White theme
        };

        // Set color based on selected theme
        displayElement.style.color = themeColors[theme] || '#000'; // Default to black if theme not found
        clockFaceElement.style.color = themeColors[theme] || '#000';
    }

    // Mode Toggling
    function showStopwatch() {
        timerMode = 'stopwatch';
        stopwatchContainer.style.display = 'block';
        timerContainer.style.display = 'none';
        stopwatchBtn.classList.add('active');
        timerBtn.classList.remove('active');
    }

    function showTimer() {
        timerMode = 'timer';
        stopwatchContainer.style.display = 'none';
        timerContainer.style.display = 'block';
        timerBtn.classList.add('active');
        stopwatchBtn.classList.remove('active');
    }

    function saveState() {
        localStorage.setItem('startTime', startTime);
        localStorage.setItem('elapsedTime', elapsedTime);
        localStorage.setItem('isRunning', isRunning);
    }

    function clearState() {
        localStorage.removeItem('startTime');
        localStorage.removeItem('elapsedTime');
        localStorage.removeItem('isRunning');
    }

    // Master Update Function
    function masterUpdate() {
        updateDisplay();
    }

    // Set the master update to run every 10 milliseconds
    setInterval(masterUpdate, 10);

    themeSelect.addEventListener('change', (e) => setTheme(e.target.value));

    // Event Listeners
    startStopButton.addEventListener('click', startStop); // Unified startStop
    stopButton.addEventListener('click', stopTimer); // separate stop
    resetButton.addEventListener('click', reset);
    lapButton.addEventListener('click', lap);
    saveSessionButton.addEventListener('click', saveSession);
    clearAllSessionsButton.addEventListener('click', clearAllSessions);
    stopwatchBtn.addEventListener('click', showStopwatch);
    timerBtn.addEventListener('click', showTimer);
    setTimerButton.addEventListener('click', setTimer);
    startAllTimersButton.addEventListener('click', startAllTimers); // New Line

    const container = document.querySelector('.container');

    // Initial Setup
    loadTheme();
    displaySavedSessions();
    updateDisplay();
    showStopwatch(); // Initialize in stopwatch mode
    displayActiveTimers();
});