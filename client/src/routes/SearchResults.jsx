import React, { useEffect, useState } from "react";
import SearchResultsDisplay from "../components/SearchResultsDisplay";
import { useLocation } from "react-router-dom";

function SearchResults() {
  const [results, setResults] = useState([]);
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery().get("q");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`http://localhost:3001/search?q=${query}`);
        const data = await response.json();
        setResults(data.videos);
      } catch (err) {
        console.error(err);
      }
    };

    fetchResults();
  }, [query]);

  return <SearchResultsDisplay videos={results} />;
}

export default SearchResults;
