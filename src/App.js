import { useState } from 'react';
import CourseSelector from './components/CourseSelector/CourseSelector';
import SelectedCourses from './components/CourseSelector/SelectedCourses';
import Timetable from './components/Timetable/Timetable';
import BottomBar from './components/BottomBar'

export const APP_VERSION = "v0.2.5";

function App() {
  const [courses, setCourses] = useState([{},{},{}]);
  const [selectedCourses, setSelectedCourses] = useState([[],[],[]]);
  const [hoveredCourse, setHoveredCourse] = useState("");
  const [sem, setSem] = useState(0); // 0: First Semester, 1: Second Semester, 2: Summer Semester
  const [shownDays, setShownDays] = useState([true, true, true, true, true, true, true]);
  const [fromTime, setFromTime] = useState(8);
  const [toTime, setToTime] = useState(22);
  const lastUpdated = "2023/07/25";
  const link = "https://github.com/hovergecko/timetable";
  // useEffect(() => console.log(selectedCourses));
  return (
    <div className="App">
      <div className="Main">
        <SelectedCourses shownDays={shownDays} setShownDays={setShownDays} setFromTime={setFromTime} setToTime={setToTime} sem={sem} selectedCourses={selectedCourses} setSelectedCourses={setSelectedCourses} setCourses={setCourses} courses={courses}/>
        <Timetable fromTime={fromTime} toTime={toTime} shownDays={shownDays} sem={sem} selectedCourses={selectedCourses} courses={courses} hoveredCourse={hoveredCourse} />
        <CourseSelector sem={sem} setSem={setSem} selectedCourses={selectedCourses} setSelectedCourses={setSelectedCourses} courses={courses} setHoveredCourse={setHoveredCourse} />
      </div>
      <BottomBar version={APP_VERSION} lastUpdated={lastUpdated} link={link} />
    </div>
  );
}

export default App;