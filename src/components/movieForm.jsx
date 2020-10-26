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
      rate: "",
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
    rate: Joi.number().required().min(0).max(10).label("Rate"),
  };

  async componentDidMount() {
    const { data: genres } = await getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    if (movieId === "new") return;

    const { data: movie } = await getMovie(movieId);
    if (!movie) return this.props.history.replace("/not-found");
    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel(movie) {
    return {
      _id: movie.id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      rate: movie.dailyRentalRate,
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
          {this.renderInput("rate", "Rate", "number")}
          {this.renderSubmitButton("Save")}
        </form>
      </div>
    );
  }
}
