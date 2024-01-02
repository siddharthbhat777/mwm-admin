import React, { useState } from 'react';
import classes from './Users.module.css';
import Table from '../../../ui/table/Table';

const usersList = [
    {
        username: 'Sid2024',
        password: 'Sid2024',
        firstname: 'Siddharth',
        lastname: 'Bhat',
        phone: 8208465375,
        email: 'dbgt4531@gmail.com',
        institute: 'ICS',
        program: 'MCA',
        gr_number: '5875876765768',
        year: '2024',
        createdAt: '2024-01-01T11:19:37Z'
    },
    {
        username: 'Ruchi2024',
        password: 'Ruchi2024',
        firstname: 'Ruchita',
        lastname: 'Ganacharya',
        phone: 9765474787,
        email: 'ruchi4gana@gmail.com',
        institute: 'IOM',
        program: 'MMS',
        gr_number: '6745378523458',
        year: '2024',
        createdAt: '2024-01-01T11:19:37Z'
    },
    {
        username: 'Sid2024',
        password: 'Sid2024',
        firstname: 'Siddharth',
        lastname: 'Bhat',
        phone: 8208465375,
        email: 'dbgt4531@gmail.com',
        institute: 'ICS',
        program: 'MCA',
        gr_number: '5875876765768',
        year: '2024',
        createdAt: '2024-01-01T11:19:37Z'
    },
    {
        username: 'Sid2024',
        password: 'Sid2024',
        firstname: 'Siddharth',
        lastname: 'Bhat',
        phone: 8208465375,
        email: 'dbgt4531@gmail.com',
        institute: 'ICS',
        program: 'MCA',
        gr_number: '5875876765768',
        year: '2024',
        createdAt: '2024-01-01T11:19:37Z'
    },
    {
        username: 'Sid2024',
        password: 'Sid2024',
        firstname: 'Siddharth',
        lastname: 'Bhat',
        phone: 8208465375,
        email: 'dbgt4531@gmail.com',
        institute: 'ICS',
        program: 'MCA',
        gr_number: '5875876765768',
        year: '2024',
        createdAt: '2024-01-01T11:19:37Z'
    },
    {
        username: 'Sid2024',
        password: 'Sid2024',
        firstname: 'Siddharth',
        lastname: 'Bhat',
        phone: 8208465375,
        email: 'dbgt4531@gmail.com',
        institute: 'ICS',
        program: 'MCA',
        gr_number: '5875876765768',
        year: '2024',
        createdAt: '2024-01-01T11:19:37Z'
    },
    {
        username: 'Sid2024',
        password: 'Sid2024',
        firstname: 'Siddharth',
        lastname: 'Bhat',
        phone: 8208465375,
        email: 'dbgt4531@gmail.com',
        institute: 'ICS',
        program: 'MCA',
        gr_number: '5875876765768',
        year: '2024',
        createdAt: '2024-01-01T11:19:37Z'
    },
    {
        username: 'Sid2024',
        password: 'Sid2024',
        firstname: 'Siddharth',
        lastname: 'Bhat',
        phone: 8208465375,
        email: 'dbgt4531@gmail.com',
        institute: 'ICS',
        program: 'MCA',
        gr_number: '5875876765768',
        year: '2024',
        createdAt: '2024-01-01T11:19:37Z'
    },
    {
        username: 'Sid2024',
        password: 'Sid2024',
        firstname: 'Siddharth',
        lastname: 'Bhat',
        phone: 8208465375,
        email: 'dbgt4531@gmail.com',
        institute: 'ICS',
        program: 'MCA',
        gr_number: '5875876765768',
        year: '2024',
        createdAt: '2024-01-01T11:19:37Z'
    },
    {
        username: 'Sid2024',
        password: 'Sid2024',
        firstname: 'Siddharth',
        lastname: 'Bhat',
        phone: 8208465375,
        email: 'dbgt4531@gmail.com',
        institute: 'ICS',
        program: 'MCA',
        gr_number: '5875876765768',
        year: '2024',
        createdAt: '2024-01-01T11:19:37Z'
    },
    {
        username: 'Sid2024',
        password: 'Sid2024',
        firstname: 'Siddharth',
        lastname: 'Bhat',
        phone: 8208465375,
        email: 'dbgt4531@gmail.com',
        institute: 'ICS',
        program: 'MCA',
        gr_number: '5875876765768',
        year: '2024',
        createdAt: '2024-01-01T11:19:37Z'
    },
    {
        username: 'Sid2024',
        password: 'Sid2024',
        firstname: 'Siddharth',
        lastname: 'Bhat',
        phone: 8208465375,
        email: 'dbgt4531@gmail.com',
        institute: 'ICS',
        program: 'MCA',
        gr_number: '5875876765768',
        year: '2024',
        createdAt: '2024-01-01T11:19:37Z'
    },
    {
        username: 'Sid2024',
        password: 'Sid2024',
        firstname: 'Siddharth',
        lastname: 'Bhat',
        phone: 8208465375,
        email: 'dbgt4531@gmail.com',
        institute: 'ICS',
        program: 'MCA',
        gr_number: '5875876765768',
        year: '2024',
        createdAt: '2024-01-01T11:19:37Z'
    },
    {
        username: 'Sid2024',
        password: 'Sid2024',
        firstname: 'Siddharth',
        lastname: 'Bhat',
        phone: 8208465375,
        email: 'dbgt4531@gmail.com',
        institute: 'ICS',
        program: 'MCA',
        gr_number: '5875876765768',
        year: '2024',
        createdAt: '2024-01-01T11:19:37Z'
    }
];


const Users = () => { // username, password, firstname, lastname, phone, email, institute, program, grno, year 
    const [openDetails, setOpenDetails] = useState(false);

    const columns = [
        { field: 'firstname', header: 'Firstname' },
        { field: 'lastname', header: 'Lastname' },
        { field: 'email', header: 'E-Mail' },
        { field: 'institute', header: 'Institute' },
        { field: 'year', header: 'Year' },
        { field: 'createdAt', header: 'Date', type: 'Date' }
    ];

    const handleSelectedRow = (row) => {
        // setOpenCreate(false);
        // setOpenDetails(true);
        // setSelectedRowData(row);
    };
    return (
        <div className={classes.outletScreen}>
            <div></div>
            <div className={classes.tableLayout}>
                <div className={classes.mainLayout}>
                    <Table rows={usersList} columns={columns} isRowSelected={openDetails} selectedRow={handleSelectedRow} />
                </div>
                <div className={classes.bottomLayout}>Bottom</div>
            </div>
        </div>
    );
};

export default Users;