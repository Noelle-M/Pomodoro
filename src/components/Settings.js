import React, { useState } from 'react';

const Settings = ({
                      workLength,
                      setWorkLength,
                      breakLength,
                      setBreakLength,
                      setTimeLeft,
                      isRunning,
                  }) => {
    const [localWorkLength, setLocalWorkLength] = useState(workLength / 60);
    const [localBreakLength, setLocalBreakLength] = useState(breakLength / 60);

    const handleWorkChange = (event) => {
        const newLength = parseInt(event.target.value);
        setLocalWorkLength(newLength);
        setWorkLength(newLength * 60);
        if (!isRunning) {
            setTimeLeft(newLength * 60);
        }
    };

    const handleBreakChange = (event) => {
        const newLength = parseInt(event.target.value);
        setLocalBreakLength(newLength);
        setBreakLength(newLength * 60);
        if (!isRunning) {
            setTimeLeft(newLength * 60);
        }
    };

    return (
        <div className="settings row justify-content-center">
            <hr />
            <div className="col-6 text-center">
                <label htmlFor="workLength">Work (mn)</label>
                <input
                    type="number"
                    id="workLength"
                    value={localWorkLength}
                    onChange={handleWorkChange}
                    min="1"
                    max="60"
                    className="form-control"
                />
            </div>
            <div className="col-6 text-center">
                <label htmlFor="breakLength">Pause (mn)</label>
                <input
                    type="number"
                    id="breakLength"
                    value={localBreakLength}
                    onChange={handleBreakChange}
                    min="1"
                    max="60"
                    className="form-control"
                />
            </div>
        </div>
    );
};

export default Settings;
