import React, { useState } from "react";

const SearchContract = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(query);
        }
    };

    return (
        <form className="input-group mb-3" onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="Search..."
                className="form-control search"
                value={query}
                onChange={handleInputChange}
            />
            <div className="input-group-prepend">
                <button className="input-group-text search_btn" type="submit">
                    <i className="fas fa-search" />
                </button>
            </div>
        </form>
    );
};

export default SearchContract;