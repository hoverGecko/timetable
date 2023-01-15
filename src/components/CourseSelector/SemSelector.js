import { useEffect } from "react";

const SemButton = ({buttonSem, buttonSemName, sem, setSem}) => {
    return (
        <div className={sem === buttonSem  ? "SemSelected" : "Sem"} onClick={() => setSem(buttonSem)}>{buttonSemName}</div>
    );
}

const SemSelector = ({sem, setSem, courses}) => {
    useEffect(() => {
        if (Object.keys(courses[0]).length === 0 && Object.keys(courses[1]).length !== 0) setSem(1);
        else setSem(0);
    }, [setSem, courses]);
    let semHasCourses = courses.map(semCourses => Object.keys(semCourses).length !== 0);
    return (
        <div className="SemSelector">
            {semHasCourses[0] && <SemButton buttonSem={0} buttonSemName="First Semester" sem={sem} setSem={setSem} />}
            {semHasCourses[1] && <SemButton buttonSem={1} buttonSemName="Second Semester" sem={sem} setSem={setSem} />}
            {semHasCourses[2] && <SemButton buttonSem={2} buttonSemName="Summer Semester" sem={sem} setSem={setSem} />}
        </div>
    );
}

export default SemSelector