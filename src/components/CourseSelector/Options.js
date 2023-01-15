import { useEffect } from "react";
import * as XLSX from "xlsx";

const Options = ({selectedCourses, setSelectedCourses, shownDays, setShownDays, setFromTime, setToTime, setCourses, courses}) => {
    useEffect(() => load(), []);
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
    const setXlsxSheetToCourses = (sheet) => {
        let sheetData = XLSX.utils.sheet_to_row_object_array(sheet);
        // console.log(sheetData);

        let res = [{}, {}, {}]; // first sem, second sem, summer sem (not used, used for storing date)
        sheetData.forEach(course => {
            const determineDay = () => { // return array (e.g. ["MON"])
                return ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].filter(day => day in course);
            }
            const dayArray = determineDay();
            if (dayArray.length === 0) return;
            const day = dayArray[0];

            let sem; // 0: first sem, 1: second sem, 2: summer sem
            if (course["TERM"].includes("Sem 1")) sem = 0;
            else if (course["TERM"].includes("Sem 2")) sem = 1;
            else if (course["TERM"].includes("Sum Sem")) sem = 2;
            else sem = undefined;

            let code = course["COURSE CODE"] + "-" + course["CLASS SECTION"];

            if (code in res[sem] === false) {
                res[sem][code] = {
                    "days": {},
                    "name": course["COURSE TITLE"],
                    "instructor": course["INSTRUCTOR"]
                };
            }
            
            let endTime = parseInt(course["END TIME"]);
            if (!endTime) endTime = 8;
            let startTime = parseInt(course["START TIME"]);
            if (!startTime) startTime = endTime;
            let section = {
                "startTime": startTime,
                "endTime": endTime,
                "venue": course["VENUE"]
            };
            if (day in res[sem][code]["days"] === false) res[sem][code]["days"][day] = [];
            if (!(res[sem][code]["days"][day].includes(section))) res[sem][code]["days"][day].push(section);
        });
        // console.log(JSON.stringify(res)); // DEBUG
        setCourses(res);
    }
    const xlsxToJsonParser = (e) => {
        let reader = new FileReader();
        let workbook;
        reader.onload = (readerEvent) => {
            workbook = XLSX.read(readerEvent.target.result, {type: "binary"});
            setXlsxSheetToCourses(workbook.Sheets[workbook.SheetNames[0]]);
        }
        reader.readAsBinaryString(e.target.files[0]);
    }
    const save = () => {
        let selectedCoursesStrings = selectedCourses.map(semCourses => semCourses.join(','));
        localStorage.setItem("firstSemCourses", selectedCoursesStrings[0]);
        localStorage.setItem("secondSemCourses", selectedCoursesStrings[1]);
        localStorage.setItem("summerSemCourses", selectedCoursesStrings[2]);
        if (courses !== [{}, {}, {}]) localStorage.setItem("courses", JSON.stringify(courses));
    }
    const load = () => {
        let savedCourses = {};

        ["firstSemCourses", "secondSemCourses", "summerSemCourses"].forEach(sem => {
            let semCourses = localStorage.getItem(sem);
            if (semCourses === "" || semCourses === null) savedCourses[sem] = [];
            else savedCourses[sem] = semCourses.split(',');
        });
        
        // console.log(savedCourses);
        setSelectedCourses([savedCourses["firstSemCourses"], savedCourses["secondSemCourses"], savedCourses["summerSemCourses"]]);
        
        let storedCourses = localStorage.getItem("courses");
        if (storedCourses !== null) setCourses(JSON.parse(storedCourses));
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
                    placeholder="Default: 22"
                    onChange={event => handleSetTime(event, setToTime)}
            >
            </input>
            <label>Days to be shown in the timetable: </label>
            <div className="SetShownDays">
                {days.map((_, ind) => <SetShownDaysBox shownDays={shownDays} setShownDays={setShownDays} dayInd={ind} />)}
            </div>
            <label>Change <a href="https://intraweb.hku.hk/reserved_1/sis_student/sis/SIS-class-timetable.html">class timetable</a> (.xlsx):</label>
            <input type="file" id="input" onChange={xlsxToJsonParser} accept=".xlsx"/>
            <button className="SaveLoad" onClick={save}>Save selected courses</button>
            <button className="SaveLoad" onClick={load}>Load selected courses</button>
            <button className="SaveLoad" onClick={() => setSelectedCourses([[], [], []])}>Clear current selection</button>
            <button className="SaveLoad" onClick={() => localStorage.clear()}>Clear storage</button>
        </div>
    );
}

export default Options