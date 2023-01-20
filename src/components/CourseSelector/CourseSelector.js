import { useEffect, useState } from 'react';
import Course from './Course'
import SemSelector from './SemSelector';
import SearchBar from './SearchBar'

const CourseSelector = ({sem, setSem, selectedCourses, setSelectedCourses, courses, setHoveredCourse}) => {
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        setHoveredCourse("");
    }, [searchTerm])
    const maxEntries = 1000;
    const fitSearch = (searchTerm, courseCode) => {
        if (searchTerm === undefined) return true;
        let firstMatchIndex = courseCode.search(searchTerm.toUpperCase());
        return firstMatchIndex === 0 || firstMatchIndex === 4; // 0: full match, 4: number match
    }
    const searchRes = Object.keys(courses[sem]).sort().filter(id => fitSearch(searchTerm.toUpperCase(), id))
    return (
        <div className="CourseSelector">
            <SemSelector sem={sem} setSem={setSem} courses={courses} />
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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