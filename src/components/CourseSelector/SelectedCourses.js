import Course from './Course'
import Options from './Options'

const semNames = ["First Semester", "Second Semester", "Summer Semester"];

const SelectedCourses = ({shownDays, setShownDays, setFromTime, setToTime, sem, selectedCourses, setSelectedCourses, setCourses, courses}) => {
    return (
        <div className="SelectedCourses">
            <div>Selected Courses:</div>
            <div className="SelectedCoursesList">
                {semNames.map((name, semIndex) => (
                    <div key={semIndex}>
                        <div style={{margin: 4}}>{name}:</div>
                        <div>
                            {selectedCourses[semIndex].map((id, ind) => 
                                <Course 
                                    key={sem + id + ind} 
                                    id={id} 
                                    sem={sem} 
                                    selectedCourses={selectedCourses} 
                                    setSelectedCourses={setSelectedCourses} 
                                    withCheckBox={false}
                                    setHoveredCourse={() => {}}
                                    checkboxAlwaysOn={true}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <Options 
                selectedCourses={selectedCourses} 
                setSelectedCourses={setSelectedCourses} 
                shownDays={shownDays} 
                setShownDays={setShownDays} 
                setFromTime={setFromTime} 
                setToTime={setToTime} 
                setCourses={setCourses} 
                courses={courses}
            />
        </div>
    );
}

export default SelectedCourses