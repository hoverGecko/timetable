const SemSelector = ({sem, setSem}) => {
    return (
        <div className="SemSelector">
            <div className={sem === 0 ? "SemSelected" : "Sem"} onClick={() => setSem(0)}>First Semester</div>
            <div className={sem === 1 ? "SemSelected" : "Sem"} onClick={() => setSem(1)}>Second Semester</div>
        </div>
    );
}

export default SemSelector