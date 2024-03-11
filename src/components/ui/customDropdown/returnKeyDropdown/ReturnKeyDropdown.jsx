import React, { useState } from 'react';
import classes from './ReturnKeyDropdown.module.css';

const ReturnKeyDropdown = ({ defaultText, options, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option.name);
        setIsOpen(false);
        onSelect(option.key);
    };

    return (
        <div className={classes.customDropdown}>
            <div className={classes.dropdownHeader} onClick={toggleDropdown}>
                {selectedOption || defaultText}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-compact-down" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z" />
                </svg>
            </div>
            {
                isOpen && (
                    <ul className={classes.dropdownOptions}>
                        {options.map((option) => (
                            <li key={option.key} onClick={() => handleOptionClick(option)}>
                                {option.name}
                            </li>
                        ))}
                    </ul>
                )
            }
        </div>
    );
};

export default ReturnKeyDropdown;