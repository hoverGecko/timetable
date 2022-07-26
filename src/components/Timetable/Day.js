const TimeSlot = ({coursesAtTimeSlot}) => {
    let coursesNoDuplicate = [...new Set(coursesAtTimeSlot)];
    return (
        <div className={coursesNoDuplicate.length === 0 ? "TimeSlotEmpty" : coursesNoDuplicate.length === 1 ? "TimeSlotFilled" : "TimeSlotConflicted"}>
            {coursesNoDuplicate.map((c, ind) => <div key={c + ind} className="TimeSlotCourse">{c}</div>)}
        </div>
    );
}
const Day = ({fromTime, toTime, day, times}) => {
    return (
        <div className="Day">
            <div className="DayTitle">{day}</div>
            {
                times.map((coursesAtTimeSlot, ind) => (ind >= fromTime && ind < toTime) ? <TimeSlot key={ind} coursesAtTimeSlot={coursesAtTimeSlot} /> : <div key={ind} style={{display: "hidden"}}></div>)
            }
        </div>
    );
}

export default Day