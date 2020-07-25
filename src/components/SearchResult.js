import React from "react";

import "./SearchResult.css";

export function SearchResult({ searchTerm, searchResult, onItemClick }) {
  if (!searchResult) return null;
  return (
    <div className="SearchResult">
      <header>Search result for "{searchTerm}"...</header>
      <div className="results">
        {searchResult.map(({ id, name, address }) => (
          <div key={id} className="result" onClick={() => onItemClick(id)}>
            <div className="name">{name}</div>
            <div className="address">{address}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
