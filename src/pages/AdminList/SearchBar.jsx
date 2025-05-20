const SearchBar = ({ search, setSearch }) => {
    return (
      <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 mb-6">
        <input
          type="text"
          placeholder="Search Users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full sm:w-64 mb-2 sm:mb-0"
        />
      </div>
    );
  };
  
  export default SearchBar;