const BottomBar = ({version, lastUploaded}) => {
    return (
        <div className="BottomBar">
            <a href="https://github.com/hoverGecko/timetable">github.com/hoverGecko/timetable</a>. {version}. Course information last uploaded on {lastUploaded}. Inspired by CUTS. Cookies are used to store course selection.
        </div>
    );
}

export default BottomBar