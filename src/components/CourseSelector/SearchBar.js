const SearchBar = ({searchTerm, setSearchTerm}) => {
    const handleInput = event => {
        setSearchTerm(event.target.value)
    }
    return (
        <input
            type="text" 
            className="SearchBar" 
            placeholder="Search (support regex)"
            onChange={handleInput}
        >
        </input>
    );
}

export default SearchBar