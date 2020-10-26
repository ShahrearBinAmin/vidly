import React from "react";

export default function SearchBox({ value, onChange }) {
  return (
    <input
      value={value}
      name="query"
      type="text"
      className="form-control my-3"
      placeholder="Search.."
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
}
