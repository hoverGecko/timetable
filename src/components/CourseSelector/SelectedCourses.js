import Course from './Course'

const SelectedCourses = ({sem, selectedCourses, setSelectedCourses}) => {
    return (
        <div className="SelectedCourses">
            <div>{sem === 0 ? "First Semester" : sem === 1 ? "Second Semester" : "Summer Semester"}</div>
            <div>Selected Courses:</div>
            <div className="Courses">
                {selectedCourses[sem].map((id, ind) => <Course key={id + ind} id={id} sem={sem} selectedCourses={selectedCourses} setSelectedCourses={setSelectedCourses} withCheckBox={false}/>)}
            </div>
        </div>
    );
}

export default SelectedCourses