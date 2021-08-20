const Options = ({selectedCourses, setSelectedCourses, shownDays, setShownDays, setFromTime, setToTime}) => {
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
    const saveToCookie = () => {
        let selectedCoursesStrings = selectedCourses.map(semCourses => semCourses.join(','));
        document.cookie = "firstSemCourses=" + selectedCoursesStrings[0] + ";SameSite=Strict;path=/;";
        document.cookie = "secondSemCourses=" + selectedCoursesStrings[1] + ";SameSite=Strict;path=/;";
        document.cookie = "summerSemCourses=" + selectedCoursesStrings[2] + ";SameSite=Strict;path=/;";
    }
    const loadFromCookie = () => {
        let cookies = document.cookie.split("; ");
        if (cookies.length < 3) return;
        let savedCourses = {};
        cookies.forEach(cookieString => {
            let [semester, coursesString] = cookieString.split('=');
            let courses = coursesString.split(',');
            savedCourses[semester] = courses;
        });
        console.log(savedCourses);
        setSelectedCourses([savedCourses["firstSemCourses"], savedCourses["secondSemCourses"], savedCourses["summerSemCourses"]]);
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
            <button className="SaveLoad" onClick={saveToCookie}>Save To Cookie</button>
            <button className="SaveLoad" onClick={loadFromCookie}>Load From Cookie</button>
        </div>
    );
}

export default Options