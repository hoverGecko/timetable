const Options = ({shownDays, setShownDays, setFromTime, setToTime}) => {
    const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
    const SetShownDaysBox = ({shownDays, setShownDays, dayInd}) => {
        const toggleDay = event => {
            setShownDays(shownDays => {
                let res = shownDays.slice();
                res[dayInd] = !res[dayInd];
                return res;
            });
        }
        const getClassName = () => shownDays[dayInd] ? "SetShownDaysBoxOn" : "SetShownDaysBoxOff";
        return (
            <div className={getClassName()} onClick={toggleDay}>{days[dayInd]}</div>
        );
    }
    const handleSetTime = (event, setTime) => {
        let t = parseInt(event.target.value);
        if (isNaN(t)) return;
        if (t < 0) t = 0;
        if (t > 23) t = 23;
        setTime(t);
    }
    return (
        <div className="Options">
            <div>Options: </div>
            <label>From Hour: </label>
            <input
                    type="text" 
                    className="SetTimeBar" 
                    placeholder="Default: 8"
                    onChange={event => handleSetTime(event, setFromTime)}
            >
            </input>
            <label>To Hour: </label>
            <input
                    type="text" 
                    className="SetTimeBar" 
                    placeholder="Default: 20"
                    onChange={event => handleSetTime(event, setToTime)}
            >
            </input>
            <label>Days to be shown in the timetable: </label>
            <div className="SetShownDays">
                {days.map((_, ind) => <SetShownDaysBox shownDays={shownDays} setShownDays={setShownDays} dayInd={ind} />)}
            </div>
        </div>
    );
}

export default Options