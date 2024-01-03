import React, { useState } from 'react';
import classes from './NumberOfElementsPerPage.module.css';

const NumberOfElementsPerPage = ({ rowsPerPage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(10);

    const options = [30, 20, 10];

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        rowsPerPage(option);
        setIsOpen(false);
    };

    return (
        <div className={classes.rowsPerPage}>
            <p>Rows per page:</p> &nbsp;
            <div className={classes.rowNumber} onClick={() => setIsOpen(!isOpen)}>
                <span>{selectedOption}</span>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                        <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                    </svg>
                </div>
                {
                    isOpen && (
                        <ul className={classes.dropdown}>
                            {options.map((option) => (
                                <li key={option} onClick={() => handleOptionSelect(option)}>
                                    {option}
                                </li>
                            ))}
                        </ul>
                    )}
            </div>
        </div>
    );
};

export default NumberOfElementsPerPage;