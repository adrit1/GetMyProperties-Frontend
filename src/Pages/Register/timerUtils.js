// timerUtils.js
export const startTimer = (setTimer) => {
    setTimer(30); // Reset timer to 30 seconds
    const interval = setInterval(() => {
        setTimer(prevTimer => {
            if (prevTimer <= 1) {
                clearInterval(interval);
                return 0; // Stop the timer at 0
            }
            return prevTimer - 1; // Decrement the timer
        });
    }, 1000);
};
