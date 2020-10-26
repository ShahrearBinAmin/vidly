import React, { Component } from "react";
import Form from "./commons/form";
import Joi from "joi-browser";

export default class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "email")}
          {this.renderInput("password", "Password")}
          {this.renderInput("name", "Name")}
          {this.renderSubmitButton("Register")}
        </form>
      </div>
    );
  }
}
