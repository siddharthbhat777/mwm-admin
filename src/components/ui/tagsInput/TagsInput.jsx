import React, { useState } from "react";
import classes from './TagsInput.module.css';

const TagsInput = ({ selectedTags, tagsInput }) => {
    const [tags, setTags] = useState(tagsInput);

    const removeTags = indexToRemove => {
        setTags([...tags.filter((_, index) => index !== indexToRemove)]);
    };

    const addTags = event => {
        if (event.target.value !== "") {
            setTags([...tags, event.target.value]);
            selectedTags([...tags, event.target.value]);
            event.target.value = "";
        }
    };
    
    return (
        <div className={classes.tagsInput}>
            <ul className={classes.tags}>
                {
                    tags.map((tag, index) => (
                        <li key={index} className={classes.tag}>
                            <span className={classes.tagTitle}>{tag}</span>
                            <span className={classes.tagCloseIcon} onClick={() => removeTags(index)}>
                                x
                            </span>
                        </li>
                    ))
                }
            </ul>
            <input type="text" onKeyUp={event => event.key === "Enter" ? addTags(event) : null} placeholder="Press enter to add tags" />
        </div>
    );
};

export default TagsInput;