import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';

const Search = (props) => {
    const [searchValue, setSearchValue] = useState("");

    const handleSearchInputChanges = (e) => {
        setSearchValue(e.target.value);
        
        // DEFAULT_SEARCH= searchValue
        // console.log(DEFAULT_SEARCH)
    }

    const resetInputField = () => {
        setSearchValue("");
    }

    const callSearchFunction = (e) => {
        e.preventDefault();
        props.search(searchValue);
        resetInputField();
    }


    return(
        <div>
            <form className="d-flex" role="search">
                <input 
                    className="form-control me-2" 
                    type="search" 
                    placeholder="Search"
                    value={searchValue}
                    onChange={handleSearchInputChanges}
                />
                <button 
                    className="btn btn-outline-light" 
                    type="submit"
                    onClick={callSearchFunction}>
                        Search
                </button>
            </form>
        </div>
    )
}

export default Search