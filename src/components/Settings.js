import React, {Fragment} from 'react';

const Settings = ({ workLength, setWorkLength, breakLength, setBreakLength }) => {
    const handleWorkChange = (event) => {
        const newLength = parseInt(event.target.value) * 60;
        setWorkLength(newLength);
    };

    const handleBreakChange = (event) => {
        const newLength = parseInt(event.target.value) * 60;
        setBreakLength(newLength);
    };

    return (
        <Fragment>
        <div className="settings row justify-content-center">
            <hr/>
            <div className="col-md-6 text-center">
                <label htmlFor="workLength">Temps de concentration (minutes) :</label>
                <input
                    type="number"
                    id="workLength"
                    value={workLength / 60}
                    onChange={handleWorkChange}
                    min="1"
                    max="60"
                    className="form-control"
                />
            </div>
            <div className="col-md-6 text-center">
                <label htmlFor="breakLength">Temps de pause (minutes) :</label>
                <input
                    type="number"
                    id="breakLength"
                    value={breakLength / 60}
                    onChange={handleBreakChange}
                    min="1"
                    max="60"
                    className="form-control"
                />
            </div>
        </div>
        </Fragment>
    );
};

export default Settings;
