import React, { Component } from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

export default class Table extends Component {
  render() {
    const { columns, data, onSort, sortColumn } = this.props;
    return (
      <table className="table">
        <TableHeader
          columns={columns}
          onSort={onSort}
          sortColumn={sortColumn}
        />
        <TableBody data={data} columns={columns} />
      </table>
    );
  }
}
