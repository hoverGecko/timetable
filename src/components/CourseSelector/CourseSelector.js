import { useState } from 'react';
import Course from './Course'
import SemSelector from './SemSelector';
import SearchBar from './SearchBar'

const CourseSelector = ({sem, setSem, selectedCourses, setSelectedCourses, courses}) => {
    const maxEntries = 1000;
    const [searchTerm, setSearchTerm] = useState("");
    const fitSearch = (searchTerm, courseCode) => {
        for (let i = 0; i < searchTerm.length; i++) {
            if (courseCode[i] !== searchTerm[i]) return false;
        }
        return true;
    }
    const searchRes = Object.keys(courses[sem]).sort().filter(id => fitSearch(searchTerm.toUpperCase(), id))
    return (
        <div className="CourseSelector">
            <SemSelector sem={sem} setSem={setSem} courses={courses} />
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className="ShowingTopResults">{searchRes.length > maxEntries ? "Showing top " + maxEntries  + " results." : "Showing all " + searchRes.length + " results."}</div>
            <div className="Courses">
                {
                    searchRes.slice(0,maxEntries).map(id => 
                        <Course
                            key={id} 
                            sem={sem} 
                            id={id} 
                            title={`${courses[sem][id]["name"]}${courses[sem][id]["instructor"] === undefined ? "" : "\nInstructor: " + courses[sem][id]["instructor"]}`} 
                            selectedCourses={selectedCourses} 
                            setSelectedCourses={setSelectedCourses}
                            withCheckBox={true}
                        />
                    )
                }
            </div>
        </div>
    );
}

export default CourseSelector