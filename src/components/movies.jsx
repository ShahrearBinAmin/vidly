import React, { Component } from "react";
// import { getMovies } from "../services/fakeMovieService";
// import { getGenres } from "../services/fakeGenreService";

import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

import PaginationNavigation from "./PaginationNavigation";
import { paginate } from "../utils/pagiante";
import { filterMovies } from "../utils/filterMovies";
import GenreFilter from "./commons/GenreFilter";
import MovieTable from "./MovieTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import Input from "./commons/input";
import SearchBox from "./commons/searchBox";
import { toast } from "react-toastify";

export default class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data: genresData } = await getGenres();
    const genres = [{ name: "All movies", _id: "test" }, ...genresData];
    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  handleLiked = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreChange = (genre) => {
    this.setState({ selectedItem: genre, searchQuery: "", currentPage: 1 });
  };

  handleSearchQuery = (query) => {
    this.setState({ searchQuery: query, selectedItem: null, currentPage: 1 });
  };

  handleDelete = async (movie) => {
    const previousMovies = this.state.movies;
    this.setState({
      movies: this.state.movies.filter((item) => item._id !== movie._id),
    });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie is already has been deleted");
        console.log(this.state.movies.length, previousMovies.length);
        this.setState({ movies: previousMovies });
      }
    }
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedItem,
      sortColumn,
      searchQuery,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter((movie) =>
        movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedItem && selectedItem._id) {
      filtered = filterMovies(allMovies, selectedItem);
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      genres,
      selectedItem,
      sortColumn,
      searchQuery,
    } = this.state;

    const { totalCount, data: movies } = this.getPagedData();

    if (count === 0) return <p>There are no movies!</p>;
    else
      return (
        <div className="row">
          <div className="col-3">
            <GenreFilter
              genres={genres}
              onItemSelect={this.handleGenreChange}
              selectedItem={selectedItem}
            />
          </div>
          <div className="col">
            {this.props.user && (
              <Link to="/movies/new">
                <button className="btn btn-primary m-2">New Movie</button>
              </Link>
            )}
            <p>There are {totalCount} movies in the list</p>
            <SearchBox value={searchQuery} onChange={this.handleSearchQuery} />
            <MovieTable
              movies={movies}
              onLike={this.handleLiked}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            />
            <PaginationNavigation
              totalItemCount={totalCount}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      );
  }
}
