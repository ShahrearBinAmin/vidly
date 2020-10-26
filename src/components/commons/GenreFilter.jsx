import React from "react";

export default function GenreFilter({ genres, textProperty, valueProperty, selectedItem, onItemSelect }) {
  return (
    <ul className="list-group">
      {genres.map((genre) => (
        <li
          key={genre[valueProperty]}
          className={
            genre === selectedItem
              ? "list-group-item active"
              : "list-group-item"
          }
          style={{ cursor: "pointer" }}

          onClick = {()=> onItemSelect(genre)}
        >
          {genre[textProperty]}
        </li>
      ))}
    </ul>
  );
}

GenreFilter.defaultProps = {
    textProperty :'name',
    valueProperty : '_id'
};
