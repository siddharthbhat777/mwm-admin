import React, { Fragment } from 'react';
import NumberOfElementsPerPage from './numberOfElementsPerPage/NumberOfElementsPerPage';
import PaginationButtons from './paginationButtons/PaginationButtons';
import classes from './Pagination.module.css';

const Pagination = ({ rowsPerPage, startIndex, endIndex, numberOfRows, currentPage, totalPageCount, onPageChange }) => {
    return (
        <Fragment>
            <NumberOfElementsPerPage rowsPerPage={rowsPerPage} />
            <div className={classes.rowRange}>
                {startIndex} - {endIndex} of {numberOfRows}
            </div>
            <PaginationButtons currentPage={currentPage} totalPageCount={totalPageCount} onPageChange={onPageChange} />
        </Fragment>
    );
};

export default Pagination;