import React, { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const AnimatedMulti = ({ placeholder, defaultValues, options, onSelectChange }) => {
    const [selectedValues, setSelectedValues] = useState(defaultValues || []);

    const customStyles = {
        control: (provided) => ({
            ...provided,
            width: 195 // Set your desired width here
        })
    };

    const handleSelectChange = (selectedOptions) => {
        setSelectedValues(selectedOptions);
        onSelectChange(selectedOptions); // Pass the selected options to the parent component
    };

    return (
        <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            value={selectedValues}
            onChange={handleSelectChange}
            isMulti
            placeholder={placeholder}
            options={options}
            styles={customStyles}
        />
    );
};

export default AnimatedMulti;