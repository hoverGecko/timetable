const BottomBar = ({version, lastUpdated, link}) => {
    return (
        <div className="BottomBar">
            <a href={link}>{version}</a>. Last updated on {lastUpdated}. Inspired by CUTS. Local storage is used to store course selection and course information.
        </div>
    );
}

// <a href="https://www.github.com/hovergecko/timetable">github.com/hovergecko/timetable</a>.

export default BottomBar