import { useEffect, useState } from "react";
import { Stack } from "@mui/material";

const Course = ({sem, id, title, selectedCourses, setSelectedCourses, setHoveredCourse, checkboxAlwaysOn = false}) => {
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
            setHoveredCourse("");
        }
        else {
            setBoxCheck(true);
            setSelectedCourses(addCourse);
        }
    }

    return (
        <label 
            className="Course" 
            title={title} 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave} 
            style={{paddingTop: 5, paddingBottom: 5}}
        >
            <Stack>
                <span>{id}</span>
                <span style={{
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    fontSize: 'min(0.8rem, 1.6vw)',
                    maxWidth: '15rem'
                }}>
                    {title}
                </span>
            </Stack>
            {<input
                type="checkbox"
                className="CourseCheckbox"
                id={id} 
                onChange={tickCourse}
                checked={boxCheck || checkboxAlwaysOn}
            />}
        </label>
    );
}

export default Course