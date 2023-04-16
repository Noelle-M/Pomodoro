import React from 'react';
import { FaPlay, FaPause, FaRedo  } from 'react-icons/fa';

const Controls = ({ toggleTimer, resetTimer, isRunning }) => {
    return (
        <div className="controls">
            <button className="btn-start-pause btn btn-success" onClick={toggleTimer}>
                {isRunning ? <FaPause /> : <FaPlay />}
            </button>
            <button className="btn-reset btn btn-warning" onClick={resetTimer}>
                <FaRedo />
            </button>
        </div>
    );
};

export default Controls;
