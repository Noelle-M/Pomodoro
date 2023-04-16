import React from 'react';
import { FaPlay, FaPause, FaRedo  } from 'react-icons/fa';

const Controls = ({ toggleTimer, resetTimer, isRunning }) => {
    return (
        <div className="controls row mt-5">
            <hr/>
            <div className="col-6 mt-5">
                <button className="btn-start-pause btn btn-success" onClick={toggleTimer}>
                    {isRunning ? <FaPause /> : <FaPlay />}
                </button>
            </div>
            <div className="col-6 mt-5">
            <button className="btn-reset btn btn-warning" onClick={resetTimer}>
                <FaRedo />
            </button>
            </div>
        </div>
    );
};

export default Controls;
