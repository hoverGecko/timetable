import Day from './Day'
import courses from '../courses.json'

const Timetable = ({shownDays, fromTime, toTime, sem, selectedCourses}) => {
    console.log(fromTime + ", " + toTime);
    console.log(fromTime >= toTime);
    if (fromTime >= toTime) return <div>Error: From Hour must be smaller than To Hour in Options.</div>
    const dayTimeString = JSON.stringify(new Array(24).fill([]));
    const dt = () => JSON.parse(dayTimeString);
    const dayTitles = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    const generateTimetable = () => {
        let timetable = {'MON':dt(), 'TUE':dt(), 'WED':dt(), 'THU':dt(), 'FRI':dt(), 'SAT':dt(), 'SUN':dt()};
        const daysToTime = (days, id) => {
            const writeTime = (d, times, id) => {
                times.forEach(t => {
                    for (let i = t.startTime; i !== t.endTime; ++i) {
                        timetable[d][i].push(id);
                    }
                })
            }
            Object.keys(days).forEach(d => writeTime(d, days[d], id));
        }
        // console.log(selectedCourses);
        // console.log(sem);
        selectedCourses[sem].forEach(c => {
            daysToTime(courses[sem][c].days, c)
        });
        return timetable;
    }
    const timetable = generateTimetable();
    const DayTime = () => {
        // console.log(fromTime);
        const timeArray = Array(toTime - fromTime).fill(fromTime).map((t, ind) => t + ind);
        // console.log(JSON.stringify(timeArray));
        return (
            <div className="Day">
                <div className="DayTitle">-</div>
                {timeArray.map(t => <div key={t} className="TimeSlotEmpty">{t.toString() + ":30-" + (t+1).toString() + ":20"}</div>)}
            </div>
        );
    }
    return (
        <div className="Timetable">
            <DayTime />
            {dayTitles.map((d, ind) => shownDays[ind] && <Day key={d} fromTime={fromTime} toTime={toTime} day={d} times={timetable[d]} />)}
        </div>
    );
}

export default Timetable