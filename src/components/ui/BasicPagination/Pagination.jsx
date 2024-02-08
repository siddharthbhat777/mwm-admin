import React, { Fragment } from 'react';
import PaginationButtons from './paginationButtons/PaginationButtons';
import classes from './Pagination.module.css';

const Pagination = ({ rowsPerPage, startIndex, endIndex, numberOfRows, currentPage, totalPageCount, onPageChange }) => {
    return (
        <Fragment>
            <div className={classes.rowRange}>
                {startIndex} - {endIndex} of {numberOfRows}
            </div>
            <PaginationButtons currentPage={currentPage} totalPageCount={totalPageCount} onPageChange={onPageChange} />
        </Fragment>
    );
};

export default Pagination;