import React, { useEffect, useState } from 'react';

const formatTime = (timeLeft) => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const Timer = ({ timeLeft, isRunning, reset, onResetHandled, initialTimeLeft }) => {
    const [displayTime, setDisplayTime] = useState(formatTime(timeLeft));

    useEffect(() => {
        if (reset) {
            setDisplayTime(formatTime(timeLeft));
            onResetHandled();
        }
    }, [reset, timeLeft, onResetHandled]);

    useEffect(() => {
        if (isRunning) {
            const timer = setInterval(() => {
                setDisplayTime((prevDisplayTime) => {
                    const newTimeLeft = timeLeft - 1;
                    return formatTime(newTimeLeft);
                });
            }, 1000);
            return () => clearInterval(timer);
        } else {
            setDisplayTime(formatTime(timeLeft));
        }
    }, [isRunning, timeLeft]);

    useEffect(() => {
        setDisplayTime(formatTime(timeLeft));
    }, [timeLeft]);

    const progressWidth = (timeLeft / initialTimeLeft) * 100;

    return (
        <div className="timer-container">
            <div className="timer">
                <div
                    className="timer-progress"
                    style={{
                        width: progressWidth + '%',
                        backgroundColor: isRunning ? '#157347' : '#FFD54F',
                    }}
                ></div>
                <span className="timer-text text-white">{displayTime}</span>
            </div>
        </div>
    );
};

export default Timer;
