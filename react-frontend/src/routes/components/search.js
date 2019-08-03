import React from "react";
import { Search as Icon } from "react-feather";

const Search = (props) => (
    <React.Fragment>
        <input className="search" type="text" name="search"
            spellCheck="false" autoCorrect="false"
            autoCapitalize="false" autoComplete="false"
            value={props.query}
            placeholder="search for a movie"
            onKeyDown={props.dismiss}
            onChange={props.search}
        />
        <Icon color="white" size={20} className="search-logo" />
    </React.Fragment>
)


export default Search;