import Course from './Course'
import Options from './Options'

const SelectedCourses = ({shownDays, setShownDays, setFromTime, setToTime, sem, selectedCourses, setSelectedCourses, }) => {
    return (
        <div className="SelectedCourses">
            <div>{sem === 0 ? "First Semester" : sem === 1 ? "Second Semester" : "Summer Semester"}</div>
            <div>Selected Courses:</div>
            <div className="Courses">
                {selectedCourses[sem].map((id, ind) => <Course key={id + ind} id={id} sem={sem} selectedCourses={selectedCourses} setSelectedCourses={setSelectedCourses} withCheckBox={false}/>)}
            </div>
            <Options selectedCourses={selectedCourses} setSelectedCourses={setSelectedCourses} shownDays={shownDays} setShownDays={setShownDays} setFromTime={setFromTime} setToTime={setToTime} />
        </div>
    );
}

export default SelectedCourses