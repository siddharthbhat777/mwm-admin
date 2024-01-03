import React from 'react';
import classes from './PaginationButtons.module.css';

const PaginationButtons = ({ currentPage, totalPageCount, onPageChange }) => {
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPageCount;

    const handleFirstPage = () => {
        if (!isFirstPage && totalPageCount !== 0) {
            onPageChange(1);
        }
    };

    const handlePreviousPage = () => {
        if (!isFirstPage && totalPageCount !== 0) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (!isLastPage && totalPageCount !== 0) {
            onPageChange(currentPage + 1);
        }
    };

    const handleLastPage = () => {
        if (!isLastPage && totalPageCount !== 0) {
            onPageChange(totalPageCount);
        }
    };
    return (
        <div className={classes.paginationToggleButtons}>
            <div onClick={handleFirstPage} className={(isFirstPage || totalPageCount === 0) ? classes.disabledButton : ''}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-bar-left" viewBox="0 0 16 16">
                    <path strokeWidth='0.5' fillRule="evenodd" d="M11.854 3.646a.5.5 0 0 1 0 .708L8.207 8l3.647 3.646a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708 0zM4.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 1 0v-13a.5.5 0 0 0-.5-.5z" />
                </svg>
            </div>
            <div onClick={handlePreviousPage} className={(isFirstPage || totalPageCount === 0) ? classes.disabledButton : ''}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-compact-left" viewBox="0 0 16 16">
                    <path strokeWidth='0.5' fillRule="evenodd" d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z" />
                </svg>
            </div>
            <div onClick={handleNextPage} className={(isLastPage || totalPageCount === 0) ? classes.disabledButton : ''}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-compact-right" viewBox="0 0 16 16">
                    <path strokeWidth='0.5' fillRule="evenodd" d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z" />
                </svg>
            </div>
            <div onClick={handleLastPage} className={(isLastPage || totalPageCount === 0) ? classes.disabledButton : ''}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-bar-right" viewBox="0 0 16 16">
                    <path strokeWidth='0.5' fillRule="evenodd" d="M4.146 3.646a.5.5 0 0 0 0 .708L7.793 8l-3.647 3.646a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708 0zM11.5 1a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-1 0v-13a.5.5 0 0 1 .5-.5z" />
                </svg>
            </div>
        </div>
    );
};

export default PaginationButtons;