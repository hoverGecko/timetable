import { useEffect, useState } from 'react';
import Course from './Course'
import SemSelector from './SemSelector';
import SearchBar from './SearchBar'

const CourseSelector = ({sem, setSem, selectedCourses, setSelectedCourses, courses, setHoveredCourse}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterConflict, setFilterConflict] = useState(false);
    useEffect(() => {
        setHoveredCourse("");
    }, [searchTerm, setHoveredCourse])
    const maxEntries = 1000;
    const hasConflict = (courseCode) => {
        let course = courses[sem][courseCode];
        let courseTimes = {};
        for (let d in course.days) {
            courseTimes[d] = new Set();
            for (let time of course.days[d]) {
                for (let t = time.startTime; t < time.endTime; ++t) {
                    courseTimes[d].add(t);
                }
            }
        }
        for (let selectedCode of selectedCourses[sem]) {
            let selectedCourse = courses[sem][selectedCode];
            for (let d in selectedCourse.days) {
                for (let time of selectedCourse.days[d]) {
                    for (let t = time.startTime; t < time.endTime; ++t) {
                        if (courseTimes[d] && courseTimes[d].has(t)) return true;
                    }
                }
            }
        }
        return false;
    }
    const fitSearch = (searchTerm, courseCode) => {
        if (searchTerm === undefined) return true;
        let firstMatchIndex;
        try {
            firstMatchIndex = courseCode.search(searchTerm.toUpperCase());
        } catch (err) {
            return false;
        }
        return !(filterConflict && hasConflict(courseCode)) && (firstMatchIndex === 0 || firstMatchIndex === 4); // 0: full match, 4: number match
    }
    const searchRes = Object.keys(courses[sem]).sort().filter(id => fitSearch(searchTerm, id))
    return (
        <div className="CourseSelector">
            <SemSelector sem={sem} setSem={setSem} courses={courses} />
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <label>
                Filter conflicted courses
                <input type="checkbox" onClick={() => setFilterConflict(fc => !fc)}></input>
            </label>
            <div className="ShowingTopResults">{searchRes.length > maxEntries ? "Showing top " + maxEntries  + " results." : "Showing all " + searchRes.length + " results."}</div>
            <div className="SearchedCoursesList">
                {
                    searchRes.slice(0, maxEntries).map(id => 
                        <Course
                            key={id} 
                            sem={sem} 
                            id={id} 
                            title={`${courses[sem][id]["name"]}${courses[sem][id]["instructor"] === undefined ? "" : "\nInstructor: " + courses[sem][id]["instructor"]}`} 
                            selectedCourses={selectedCourses} 
                            setSelectedCourses={setSelectedCourses}
                            withCheckBox={true}
                            setHoveredCourse={setHoveredCourse} 
                        />
                    )
                }
            </div>
        </div>
    );
}

export default CourseSelector