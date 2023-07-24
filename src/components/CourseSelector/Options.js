import { useEffect } from "react";
import * as XLSX from "xlsx";
import { compress, decompress } from "lz-string";
import { Button, Stack } from "@mui/material";
import { Save, Loop, Download, Upload } from "@mui/icons-material";

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

        let res = [{}, {}, {}]; // first sem, second sem, summer sem
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
            res[sem][code]["days"][day].push(section);
        });
        // console.log(JSON.stringify(res)); // DEBUG
        setCourses(res);
        clearStorage();
        save();
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
        localStorage.setItem("compressedCourses", compress(JSON.stringify(courses)));
    }
    const load = () => {
        let savedCourses = {};

        ["firstSemCourses", "secondSemCourses", "summerSemCourses"].forEach(sem => {
            let semCourses = localStorage.getItem(sem);
            if (semCourses === "" || semCourses === null) savedCourses[sem] = [];
            else savedCourses[sem] = semCourses.split(',');
        });
        
        // console.debug(savedCourses);
        setSelectedCourses([savedCourses["firstSemCourses"], savedCourses["secondSemCourses"], savedCourses["summerSemCourses"]]);

        const compressedCourses = localStorage.getItem("compressedCourses");
        if (compressedCourses) setCourses(JSON.parse(decompress(compressedCourses)));
        
        // For migration to compressedCourses
        let storedCourses = localStorage.getItem("courses");
        if (storedCourses !== null) {
            setCourses(courses);
            localStorage.setItem("compressedCourses", compress(JSON.stringify(courses)));
            localStorage.removeItem("courses");
        }
    }
    const clearStorage = () => {
        localStorage.clear();
    }
    const buttonProps = {variant: 'contained', size: 'small'};
    return (
        <div className="Options">
            <div>Options: </div>
            <label>From Hour: 
                <input
                    type="number" 
                    className="SetTimeBar" 
                    placeholder="8"
                    min="0" 
                    max="22" 
                    onChange={event => handleSetTime(event, setFromTime)}
                ></input>
            </label>
            <label>
                To Hour: <input
                    type="number" 
                    className="SetTimeBar" 
                    placeholder="22"
                    min="1" 
                    max="23" 
                    onChange={event => handleSetTime(event, setToTime)}
                ></input>
            </label>
            <label>Days to be shown in the timetable: </label>
            <div className="SetShownDays">
                {days.map((dayString, ind) => <SetShownDaysBox key={dayString + ind} shownDays={shownDays} setShownDays={setShownDays} dayInd={ind} />)}
            </div>
            <Stack spacing={0.5} sx={{mt: 1}}>
                <Button 
                    {...buttonProps}
                    href="https://intraweb.hku.hk/reserved_1/sis_student/sis/SIS-class-timetable.html"
                    target="_blank"
                    startIcon={<Download />} 
                    sx={{px: 3}}
                >
                    Get class timetable
                </Button>
                <input type="file" id="fileUpload" onChange={xlsxToJsonParser} accept=".xlsx" hidden/>
                <label htmlFor='fileUpload'>
                    <Button {...buttonProps} startIcon={<Upload />} sx={{width: "100%"}} component="span">
                        Upload timetable (.xlsx)
                    </Button>
                </label>
                <Stack direction="row" flex justifyContent="space-between" spacing={1}>
                    <Button {...buttonProps} onClick={save} startIcon={<Save />} sx={{width: "50%"}}>Save</Button>
                    <Button {...buttonProps} onClick={load} size="small" startIcon={<Loop />} sx={{width: '50%'}}>Load</Button>
                </Stack>
                <Button {...buttonProps} onClick={() => setSelectedCourses([[], [], []])}>
                    Clear selection
                </Button>
                <Button {...buttonProps} onClick={() => localStorage.clear()}>
                    Clear storage
                </Button>
            </Stack>
        </div>
    );
}

export default Options