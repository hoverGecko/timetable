import { useState } from 'react';
import CourseSelector from './components/CourseSelector/CourseSelector';
import SelectedCourses from './components/CourseSelector/SelectedCourses';
import Timetable from './components/Timetable/Timetable';
import BottomBar from './components/BottomBar'

function App() {
  const [courses, setCourses] = useState([{},{},{}]);
  const [selectedCourses, setSelectedCourses] = useState([[],[],[]]);
  const [sem, setSem] = useState(0); // 0: First Semester, 1: Second Semester, 2: Summer Semester
  const [shownDays, setShownDays] = useState([true, true, true, true, true, true, true]);
  const [fromTime, setFromTime] = useState(8);
  const [toTime, setToTime] = useState(20);
  const version = "v0.2.1";
  const lastUploaded = "2023/01/15";
  // useEffect(() => console.log(selectedCourses));
  return (
    <div className="App">
      <div className="Main">
        <SelectedCourses shownDays={shownDays} setShownDays={setShownDays} setFromTime={setFromTime} setToTime={setToTime} sem={sem} selectedCourses={selectedCourses} setSelectedCourses={setSelectedCourses} setCourses={setCourses} courses={courses}/>
        <Timetable fromTime={fromTime} toTime={toTime} shownDays={shownDays} sem={sem} selectedCourses={selectedCourses} courses={courses}/>
        <CourseSelector sem={sem} setSem={setSem} selectedCourses={selectedCourses} setSelectedCourses={setSelectedCourses} courses={courses} />
      </div>
      <BottomBar version={version} lastUploaded={lastUploaded} />
    </div>
  );
}

export default App;