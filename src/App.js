import { useState } from 'react';
import CourseSelector from './components/CourseSelector/CourseSelector';
import SelectedCourses from './components/CourseSelector/SelectedCourses';
import Timetable from './components/Timetable/Timetable';
import BottomBar from './components/BottomBar'

function App() {
  const [selectedCourses, setSelectedCourses] = useState([[],[],[]]);
  const [sem, setSem] = useState(0); // 0: First Semester, 1: Second Semester, 2: Summer Semester
  // useEffect(() => console.log(selectedCourses));
  const fromTime = 8, toTime = 20;
  return (
    <div className="App">
      <div className="Main">
        <SelectedCourses sem={sem} selectedCourses={selectedCourses} setSelectedCourses={setSelectedCourses} />
        <Timetable fromTime={fromTime} toTime={toTime} sem={sem} selectedCourses={selectedCourses} />
        <CourseSelector sem={sem} setSem={setSem} selectedCourses={selectedCourses} setSelectedCourses={setSelectedCourses} />
      </div>
      <BottomBar />
    </div>
  );
}

export default App;