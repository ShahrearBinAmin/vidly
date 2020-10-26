import React from "react";
import PropTypes from 'prop-types';
import _ from "lodash";

export default function PaginationNavigation({
  totalItemCount,
  pageSize,
  currentPage,
  onPageChange,
}) {
  const pagesCount = Math.ceil(totalItemCount / pageSize);
  //console.log(currentPage);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li key={page} className={currentPage===page? "page-item active" : "page-item" }style={{ cursor: "pointer" }}>
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

PaginationNavigation.propTypes = {
    totalItemCount : PropTypes.number.isRequired,
    pageSize : PropTypes.number.isRequired,
    currentPage : PropTypes.number.isRequired,
    onPageChange : PropTypes.func.isRequired,
};
