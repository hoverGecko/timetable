import { useEffect, useState } from "react";

const Course = ({sem, id, title, selectedCourses, setSelectedCourses, setHoveredCourse}) => {
    const [boxCheck, setBoxCheck] = useState( // tick box is checked or not i.e. the course is selected or not
        typeof selectedCourses[sem].find(course => id === course) !== 'undefined'
    );
    useEffect(() => {
        if (!selectedCourses[sem].includes(id)) setBoxCheck(false);
    }, [selectedCourses])
    const addCourse = (selectedCourses) => {
        if (typeof selectedCourses[sem].find(c => c === id) !== 'undefined') return selectedCourses;
        let res = selectedCourses.slice();
        res[sem].push(id);
        return res;
    }
    const removeCourse = (selectedCourses) => {
        let res = selectedCourses.slice();
        res[sem] = res[sem].filter(c => c !== id);
        return res;
    }
    const handleMouseEnter = event => {
        setHoveredCourse(id);
    }
    const handleMouseLeave = event => {
        setHoveredCourse("");
    }
    const tickCourse = event => {
        if (boxCheck) {
            setBoxCheck(false);
            setSelectedCourses(removeCourse);
        }
        else {
            setBoxCheck(true);
            setSelectedCourses(addCourse);
        }
    }

    return (
        <div className="Course" title={title} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <label className="CourseName">
                {id}
                {<input
                    type="checkbox"
                    className="CourseCheckbox"
                    id={id} 
                    onChange={tickCourse}
                    checked={boxCheck}
                />}
            </label>
        </div>
    );
}

export default Course