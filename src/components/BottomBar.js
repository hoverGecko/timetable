const BottomBar = ({version, lastUploaded}) => {
    return (
        <div className="BottomBar">
            {version}. Last uploaded on {lastUploaded}. Inspired by CUTS. Local storage is used to store course selection and course information.
        </div>
    );
}

// <a href="https://www.github.com/hovergecko/timetable">github.com/hovergecko/timetable</a>.

export default BottomBar