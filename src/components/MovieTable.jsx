import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./commons/Like";
import Table from "./commons/Table";
import TableBody from "./commons/TableBody";
import TableHeader from "./commons/TableHeader";

export default class MovieTable extends Component {
  columns = [
    {
      path: "title",
      name: "Title",
      content: (movie) => <Link to={`movies/${movie._id}`}>{movie.title}</Link>,
    },
    { path: "genre.name", name: "Genre" },
    { path: "numberInStock", name: "Stock" },
    { path: "dailyRentalRate", name: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => this.props.onDelete(movie)}
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { movies, onLike, onDelete, onSort, sortColumn } = this.props;

    return (
      <Table
        data={movies}
        onSort={onSort}
        sortColumn={sortColumn}
        columns={this.columns}
      />
    );
  }
}
