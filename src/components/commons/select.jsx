import React, { Component } from "react";

export default class Select extends Component {
  render() {
    const { name, label, error, options, ...rest } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <select name={name} id={name} {...rest} className="form-control">
          <option value="" />
          {options.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}
