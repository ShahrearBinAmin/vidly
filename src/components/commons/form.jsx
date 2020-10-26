import React, { Component } from "react";
import Joi from "joi-browser";
import _ from "lodash";
import Input from "./input";
import Select from "./select";

export default class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors });
    if (!_.isEmpty(errors)) return null;
    this.doSubmit();
  };

  doSubmit = () => {
    console.log("Submitted");
  };

  validate = () => {
    const options = {
      abortEarly: false,
    };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return {};

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const options = { abortEarly: false };
    const { error } = Joi.validate(obj, schema, options);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };

    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderSelect = (options) => {
    return <Select options={options} />;
  };

  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        type={type}
        label={label}
        onChange={this.handleChange}
        value={data[name]}
        error={errors[name]}
      />
    );
  };

  renderSelect = (name, label, options) => {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };

  renderSubmitButton = (label) => {
    return (
      <button
        disabled={!_.isEmpty(this.validate())}
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  };
}
