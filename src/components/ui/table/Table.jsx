import React, { Fragment, useEffect, useState } from 'react';
import classes from './Table.module.css';

const formatDate = (createdAt) => {
    if (createdAt === null) {
        return null;
    }
    const date = new Date(createdAt);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? `0${day}` : day}/${month < 10 ? `0${month}` : month}/${year}`;
};

const Table = ({ rows, columns, isRowSelected, selectedRow }) => {
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);

    useEffect(() => {
        if (!isRowSelected) {
            setSelectedRowIndex(null);
        }
    }, [isRowSelected]);

    const handleRowSelect = (row, index) => {
        selectedRow(row);
        setSelectedRowIndex(index);
    };

    return (
        <Fragment>
            {
                rows.length !== 0 ?
                    <table className={classes.mainTable}>
                        <thead>
                            <tr>
                                {
                                    columns.map((column) => (
                                        <th key={column.field}>{column.header}</th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                rows.map((row, index) => (
                                    <tr key={index} onClick={() => handleRowSelect(row, index)} className={index === selectedRowIndex ? classes.selectedRow : ''}>
                                        {
                                            columns.map((column) => (
                                                <td key={column.field}>
                                                    {
                                                        column.type === 'Date' ? formatDate(row[column.field]) : row[column.field]
                                                    }
                                                </td>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    :
                    <div className={classes.noData}>No data found</div>
            }
        </Fragment>
    );
};

export default Table;