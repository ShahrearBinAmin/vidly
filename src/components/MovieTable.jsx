import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./commons/Like";
import Table from "./commons/Table";
import TableBody from "./commons/TableBody";
import TableHeader from "./commons/TableHeader";
import auth from "../services/authService";

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
  ];

  deleteColumn = {
    key: "delete",
    content: (movie) => (
      <button
        className="btn btn-danger btn-sm"
        onClick={() => this.props.onDelete(movie)}
      >
        Delete
      </button>
    ),
  };

  constructor(props) {
    super(props);
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

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
