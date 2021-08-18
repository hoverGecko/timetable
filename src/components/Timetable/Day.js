const TimeSlot = ({coursesAtTimeSlot}) => {
    return (
        <div className={coursesAtTimeSlot.length === 0 ? "TimeSlotEmpty" : coursesAtTimeSlot.length === 1 ? "TimeSlotFilled" : "TimeSlotConflicted"}>
            {coursesAtTimeSlot.map((c, ind) => <div key={c + ind} className="TimeSlotCourse">{c}</div>)}
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