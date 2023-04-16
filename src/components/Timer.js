import React, { useEffect, useState, useRef } from 'react';

const formatTime = (timeLeft) => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const Timer = ({
                   timeLeft,
                   isRunning,
                   reset,
                   onResetHandled,
                   initialTimeLeft,
                   isWorkTime,
                   toggleMute,
                   isMuted,
               }) => {
    const [displayTime, setDisplayTime] = useState(formatTime(timeLeft));
    const audioRef = useRef(null);

    useEffect(() => {
        if (timeLeft === 11) {
            audioRef.current.play();
        } else if (timeLeft <= 0) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }, [timeLeft]);

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

    useEffect(() => {
        audioRef.current.muted = isMuted;
    }, [isMuted]);

    const progressWidth = (timeLeft / initialTimeLeft) * 100;

    return (
        <div className="timer-container">
            <img
                src={`${process.env.PUBLIC_URL}/${isWorkTime ? 'work_image.png' : 'pause_image.gif'}`}
                alt={isWorkTime ? 'Travail' : 'Pause'}
            />
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
            <audio ref={audioRef} src={`${process.env.PUBLIC_URL}/dong-11.mp3`} preload="auto" />
        </div>
    );
};

export default Timer;
