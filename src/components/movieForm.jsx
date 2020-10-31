import React, { Component } from "react";
import Form from "./commons/form";
import Joi from "joi-browser";
import { toast } from "react-toastify";
// import { getGenres } from "../services/fakeGenreService";
// import { getMovie, saveMovie } from "../services/fakeMovieService";

import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";

export default class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    errors: {},
    genres: [],
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .integer()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number().required().min(0).max(10).label("Rate"),
  };

  async populateGenres() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
  }

  async populateMovie() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async componentDidMount() {
    this.populateMovie();
    this.populateGenres();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = async () => {
    //saveMovie(this.state.data);

    this.props.history.push("/movies");
    try {
      await saveMovie(this.state.data);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie is already deleted");
      }
    }
  };

  render() {
    const { match, history } = this.props;
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {this.renderSubmitButton("Save")}
        </form>
      </div>
    );
  }
}
