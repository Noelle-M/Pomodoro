import React, { useState, useEffect, useRef } from 'react';
import Timer from './components/Timer';
import Controls from './components/Controls';
import Settings from './components/Settings';
import './css/style.css';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const App = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [reset, setReset] = useState(false);
    const [workLength, setWorkLength] = useState(25 * 60);
    const [breakLength, setBreakLength] = useState(5 * 60);
    const [timeLeft, setTimeLeft] = useState(workLength);
    const [initialTimeLeft, setInitialTimeLeft] = useState(workLength);
    const [isWorkTime, setIsWorkTime] = useState(true);
    const audioRef = useRef(null);
    const [isMuted, setIsMuted] = useState(false);
    const [showIcon, setShowIcon] = useState(false);

    useEffect(() => {
        if (isRunning) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [isRunning]);

    useEffect(() => {
        if (timeLeft === 11) {
            audioRef.current.play();
            setShowIcon(true);
        } else if (timeLeft <= 0) {
            setIsWorkTime((prevState) => !prevState);
            setTimeLeft(isWorkTime ? breakLength : workLength);
            setInitialTimeLeft(isWorkTime ? breakLength : workLength);
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setShowIcon(false);
        }
    }, [timeLeft, workLength, breakLength, isWorkTime]);

    const toggleTimer = () => {
        setIsRunning((prevState) => {
            if (!prevState) {
                setInitialTimeLeft(isWorkTime ? workLength : breakLength);
            }
            return !prevState;
        });
    };

    const resetTimer = () => {
        setReset(true);
        setIsRunning(false);
    };

    const onResetHandled = () => {
        setReset(false);
        setTimeLeft(workLength);
        setIsWorkTime(true);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
        audioRef.current.muted = !isMuted;
    };

    return (
        <div className="app">
            <Timer
                timeLeft={timeLeft}
                isRunning={isRunning}
                reset={reset}
                onResetHandled={onResetHandled}
                initialTimeLeft={initialTimeLeft}
            />
            <Controls toggleTimer={toggleTimer} resetTimer={resetTimer} isRunning={isRunning} />
            <Settings
                workLength={workLength}
                setWorkLength={setWorkLength}
                breakLength={breakLength}
                setBreakLength={setBreakLength}
            />
            {showIcon && (
                <div className="volume-icon" onClick={toggleMute}>
                    {isMuted ? (
                        <FaVolumeMute style={{ fontSize: '2rem', cursor: 'pointer' }} />
                    ) : (
                        <FaVolumeUp style={{ fontSize: '2rem', cursor: 'pointer' }} />
                    )}
                </div>
            )}
            <audio ref={audioRef} src="dong-11.mp3" preload="auto" />
        </div>
    );
};

export default App;
