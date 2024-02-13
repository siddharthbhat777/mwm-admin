import React, { useState } from "react";
import classes from "./MultiSelectDropdown.module.css";

function MultiSelectDropdown({ header, options, selectedOptions, handleSelection, labelKey }) {
  const [expanded, setExpanded] = useState(false);

  const showCheckboxes = () => {
    setExpanded(!expanded);
  };
  const handleCheckboxChange = (option) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];
    handleSelection(updatedOptions);
  };

  return (
    <div>
      <div className={classes.multiselect}>
        <div className={classes.selectBox} onClick={showCheckboxes}>
          <select>
            <option>{header}</option>
          </select>
          <div className={classes.overSelect}></div>
        </div>
        <div
          id="checkboxes"
          className={classes.checkboxes}
          style={{ display: expanded ? "block" : "none" }}
        >
          {options.map((option, index) => (
            <label key={index} htmlFor={option}>
              <input
                type="checkbox"
                id={option._id}
                checked={selectedOptions.includes(option._id)}
                onChange={() => handleCheckboxChange(option._id)}
              />{" "}
              {option[labelKey]}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MultiSelectDropdown;
