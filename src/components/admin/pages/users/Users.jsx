import React, { useEffect, useRef, useState } from 'react';
import classes from './Users.module.css';
import { AnimatePresence, motion } from 'framer-motion';
import Loader from '../../../ui/loader/Loader';
import Table from '../../../ui/table/Table';
import Pagination from '../../../ui/table/pagination/Pagination';
import { useLocation } from 'react-router-dom';
import OKAlert from '../../../ui/customAlert/okAlert/OKAlert';
import CustomDropdown from '../../../ui/customDropdown/CustomDropdown';

const usersList = [
    {
        id: 1,
        username: 'Sid2024',
        password: 'Sid2024',
        firstname: 'Siddharth',
        lastname: 'Bhat',
        phone: 8208465375,
        email: 'dbgt4531@gmail.com',
        institute: 'ICS',
        programme: 'MCA',
        gr_no: '5875876765768',
        year: '2024',
        status: 1,
        createdAt: '2024-01-01T11:19:37Z'
    },
    {
        id: 2,
        username: 'Ruchi2024',
        password: 'Ruchi2024',
        firstname: 'Ruchita',
        lastname: 'Ganacharya',
        phone: 9765474787,
        email: 'ruchi4gana@gmail.com',
        institute: 'IOM',
        programme: 'MMS',
        gr_no: '6745378523458',
        year: '2024',
        status: 1,
        createdAt: '2024-01-01T11:19:37Z'
    },
    {
        id: 3,
        username: 'Sid2024',
        password: 'Sid2024',
        firstname: 'Siddharth',
        lastname: 'Bhat',
        phone: 8208465375,
        email: 'dbgt4531@gmail.com',
        institute: 'ICS',
        programme: 'MCA',
        gr_no: '5875876765768',
        year: '2024',
        status: 1,
        createdAt: '2024-01-01T11:19:37Z'
    },
    {
        id: 4,
        username: 'Sid2024',
        password: 'Sid2024',
        firstname: 'Siddharth',
        lastname: 'Bhat',
        phone: 8208465375,
        email: 'dbgt4531@gmail.com',
        institute: 'ICS',
        programme: 'MCA',
        gr_no: '5875876765768',
        year: '2024',
        status: 1,
        createdAt: '2024-01-01T11:19:37Z'
    },
    {
        id: 5,
        username: 'Sid2024',
        password: 'Sid2024',
        firstname: 'Siddharth',
        lastname: 'Bhat',
        phone: 8208465375,
        email: 'dbgt4531@gmail.com',
        institute: 'ICS',
        programme: 'MCA',
        gr_no: '5875876765768',
        year: '2024',
        status: 1,
        createdAt: '2024-01-01T11:19:37Z'
    },
    {
        id: 6,
        username: 'Sid2024',
        password: 'Sid2024',
        firstname: 'Siddharth',
        lastname: 'Bhat',
        phone: 8208465375,
        email: 'dbgt4531@gmail.com',
        institute: 'ICS',
        programme: 'MCA',
        gr_no: '5875876765768',
        year: '2024',
        status: 1,
        createdAt: '2024-01-01T11:19:37Z'
    },
    {
        id: 7,
        username: 'Sid2024',
        password: 'Sid2024',
        firstname: 'Siddharth',
        lastname: 'Bhat',
        phone: 8208465375,
        email: 'dbgt4531@gmail.com',
        institute: 'ICS',
        programme: 'MCA',
        gr_no: '5875876765768',
        year: '2024',
        status: 1,
        createdAt: '2024-01-01T11:19:37Z'
    },
    {
        id: 8,
        username: 'Sid2024',
        password: 'Sid2024',
        firstname: 'Siddharth',
        lastname: 'Bhat',
        phone: 8208465375,
        email: 'dbgt4531@gmail.com',
        institute: 'ICS',
        programme: 'MCA',
        gr_no: '5875876765768',
        year: '2024',
        status: 1,
        createdAt: '2024-01-01T11:19:37Z'
    },
    {
        id: 9,
        username: 'Sid2024',
        password: 'Sid2024',
        firstname: 'Siddharth',
        lastname: 'Bhat',
        phone: 8208465375,
        email: 'dbgt4531@gmail.com',
        institute: 'ICS',
        programme: 'MCA',
        gr_no: '5875876765768',
        year: '2024',
        status: 1,
        createdAt: '2024-01-01T11:19:37Z'
    },
    {
        id: 10,
        username: 'Sid2024',
        password: 'Sid2024',
        firstname: 'Siddharth',
        lastname: 'Bhat',
        phone: 8208465375,
        email: 'dbgt4531@gmail.com',
        institute: 'ICS',
        programme: 'MCA',
        gr_no: '5875876765768',
        year: '2024',
        status: 1,
        createdAt: '2024-01-01T11:19:37Z'
    },
    {
        id: 11,
        username: 'Sid2024',
        password: 'Sid2024',
        firstname: 'Siddharth',
        lastname: 'Bhat',
        phone: 8208465375,
        email: 'dbgt4531@gmail.com',
        institute: 'ICS',
        programme: 'MCA',
        gr_no: '5875876765768',
        year: '2024',
        status: 1,
        createdAt: '2024-01-01T11:19:37Z'
    },
    {
        id: 12,
        username: 'Sid2024',
        password: 'Sid2024',
        firstname: 'Siddharth',
        lastname: 'Bhat',
        phone: 8208465375,
        email: 'dbgt4531@gmail.com',
        institute: 'ICS',
        programme: 'MCA',
        gr_no: '5875876765768',
        year: '2024',
        status: 1,
        createdAt: '2024-01-01T11:19:37Z'
    },
    {
        id: 13,
        username: 'Sid2024',
        password: 'Sid2024',
        firstname: 'Siddharth',
        lastname: 'Bhat',
        phone: 8208465375,
        email: 'dbgt4531@gmail.com',
        institute: 'ICS',
        programme: 'MCA',
        gr_no: '5875876765768',
        year: '2024',
        status: 1,
        createdAt: '2024-01-01T11:19:37Z'
    },
    {
        id: 14,
        username: 'Sid2024',
        password: 'Sid2024',
        firstname: 'Siddharth',
        lastname: 'Bhat',
        phone: 8208465375,
        email: 'dbgt4531@gmail.com',
        institute: 'ICS',
        programme: 'MCA',
        gr_no: '5875876765768',
        year: '2024',
        status: 1,
        createdAt: '2024-01-01T11:19:37Z'
    }
];

const Users = () => {
    const location = useLocation();
    const [openCreate, setOpenCreate] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [showLoader, setShowLoader] = useState(false);
    const [refreshList, setRefreshList] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfRows, setNumberOfRows] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');

    const totalPageCount = Math.ceil(filteredData.length / numberOfRows);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleRowsPerPage = (numberOfRows) => {
        setNumberOfRows(parseInt(numberOfRows));
        setCurrentPage(1);
    };

    useEffect(() => {
        if (location.state) {
            setOpenDetails(true);
            setOpenCreate(false);
            setSelectedRowData(location.state.requisitionData)
        }
    }, [location]);

    useEffect(() => {
        const filteredData = data.filter((requisition) => {
            const searchFields = ['firstname', 'lastname', 'email', 'institute', 'year'];
            return searchFields.some((field) =>
                String(requisition[field]).toLowerCase().includes(searchQuery.toLowerCase())
            );
        });
        if (filteredData.length !== 0) {
            setFilteredData(filteredData);
        } else {
            if (searchQuery.length === 0) {
                setFilteredData(data);
            } else {
                setFilteredData([]);
            }
        }
    }, [data, searchQuery]);

    const startIndex = (currentPage - 1) * numberOfRows;
    const endIndex = Math.min(startIndex + numberOfRows, data.length);
    let displayedData;
    if (window.innerWidth > 480) {
        displayedData = filteredData.slice(startIndex, endIndex);
    } else {
        displayedData = filteredData;
    }

    useEffect(() => {
        const delay = 1000;
        setShowLoader(true);
        const gettingRequisitions = async () => {
            try {
                // const requisitions = await axios.get('http://localhost:8001/api/purchase/requisition/');
                setData(usersList);
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 500) {
                        console.log('Something went wrong');
                    } else {
                        console.log(error.message);
                    }
                } else {
                    console.log(error.message);
                }
            } finally {
                setRefreshList(false);
            }
        };
        const debounce = setTimeout(() => {
            gettingRequisitions();
            setShowLoader(false);
        }, delay);

        return () => {
            clearTimeout(debounce);
        };
    }, [refreshList]);

    const columns = [
        { field: 'firstname', header: 'Firstname' },
        { field: 'lastname', header: 'Lastname' },
        { field: 'email', header: 'E-Mail' },
        { field: 'institute', header: 'Institute' },
        { field: 'year', header: 'Year' }
    ];

    const handleOpenCreate = () => {
        setOpenDetails(false);
        setOpenCreate(true);
    };

    const handleSelectedRow = (row) => {
        setOpenCreate(false);
        setOpenDetails(true);
        setSelectedRowData(row);
    };

    const handleImportData = () => {
        console.log('Data imported');
    };

    return (
        <div className={classes.fullScreen}>
            <AnimatePresence>
                {
                    openCreate &&
                    <CreateComponent setOpenCreate={setOpenCreate} setRefreshList={setRefreshList} />
                }
            </AnimatePresence>
            <div className={window.innerWidth > 480 ? classes.main : ((openCreate || openDetails) ? classes.offmain : classes.main)}>
                {
                    (window.innerWidth > 480 ? true : !openCreate) &&
                    <div className={classes.mainListContainer}>
                        <div className={openCreate ? classes.tableTopOnCreate : classes.tableTopOffCreate}>
                            {
                                !openCreate &&
                                <button className={classes.topCreateButton} onClick={handleOpenCreate}>
                                    <div className={classes.createButtonContainer}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                            <path stroke='#fff' strokeWidth='0.5' fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                                        </svg>
                                        <span>Create</span>
                                    </div>
                                </button>
                            }
                            <div className={openCreate ? classes.searchBoxOnCreate : classes.searchBox}>
                                <div className={classes.searchIcon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg>
                                </div>
                                <input type='text' placeholder='Search here' className={classes.searchInput} onChange={(e) => setSearchQuery(e.target.value)} />
                            </div>
                            <button className={classes.topCreateButton} onClick={handleImportData}>
                                <div className={classes.createButtonContainer}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0" />
                                    </svg>
                                    <span>Import</span>
                                </div>
                            </button>
                        </div>
                        <hr className={classes.tableDivideLine} />
                        <div className={classes.tableContainer}>
                            {
                                showLoader &&
                                <Loader />
                            }
                            {
                                !showLoader &&
                                <Table rows={displayedData} columns={columns} isRowSelected={openDetails} selectedRow={handleSelectedRow} />
                            }
                        </div>
                        {window.innerWidth > 480 && <hr className={classes.tableDivideLine} />}
                        <div className={classes.bottomContainer}>
                            <Pagination rowsPerPage={handleRowsPerPage} startIndex={endIndex > 0 ? (startIndex + 1) : 0} endIndex={endIndex} numberOfRows={filteredData.length} currentPage={currentPage} totalPageCount={totalPageCount} onPageChange={handlePageChange} />
                        </div>
                    </div>
                }
            </div>
            <AnimatePresence>
                {
                    openDetails &&
                    <DetailsView setOpenDetails={setOpenDetails} detailsData={selectedRowData} />
                }
            </AnimatePresence>
        </div>
    );
};

export default Users;

const CreateComponent = ({ setOpenCreate, setRefreshList }) => {
    const firstnameRef = useRef();
    const lastnameRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const grNumberRef = useRef();
    const emailRef = useRef();
    const phoneNumberRef = useRef();

    const [programme, setProgramme] = useState('');
    const [institute, setInstitute] = useState('');
    const [year, setYear] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);

    const programmeDropdownOptions = ['MCA', 'MMS', 'CIDTL', 'ISDR'];
    const instituteDropdownOptions = ['IIT', 'ICS', 'PGDM', 'IIS', 'Management'];
    const currentYear = new Date().getFullYear();
    const yearsDropdownOptions = Array.from({ length: currentYear - 1992 }, (_, index) => (1993 + index).toString());

    const handleShowAlert = (header, submessage) => {
        setAlertMessage({ header: header, submessage: submessage });
        setShowAlert(true);
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    const handleProgrammeSelect = (value) => {
        setProgramme(value);
    };

    const handleInstituteSelect = (value) => {
        setInstitute(value);
    };

    const handleYearSelect = (value) => {
        setYear(value);
    };

    const handleCreateSubmit = async (event) => {
        event.preventDefault();
        const data = {
            firstname: firstnameRef.current.value,
            lastname: lastnameRef.current.value,
            username: usernameRef.current.value,
            password: passwordRef.current.value,
            grNumber: grNumberRef.current.value,
            year: year,
            email: emailRef.current.value,
            phoneNumber: phoneNumberRef.current.value,
            institute: institute,
            programme: programme
        };
        console.log(data);
        try {
            if (!firstnameRef.current.value) {
                const error = new Error('Please enter required field');
                error.statusCode = 422;
                throw error;
            }
            // await axios.post('http://localhost:8001/api/purchase/requisition/createrequisition', data);
            setRefreshList(true);
            setOpenCreate(false);
        } catch (error) {
            if (error.response) {
                if (error.response.status === 409) {
                    handleShowAlert('Invalid input', error.response.data.message);
                } else if (error.response.status === 500) {
                    handleShowAlert('Server error', 'Something went wrong');
                } else {
                    console.log(error.message);
                }
            } else {
                if (error.statusCode === 422) {
                    handleShowAlert('Invalid input', error.message);
                } else {
                    console.log(error.message);
                }
            }
        }
    };

    return (
        <motion.div initial={{ width: '0' }} animate={window.innerWidth > 480 ? { width: '60%' } : { width: '100%' }} exit={{ width: '0' }} transition={{ duration: 0.3 }} className={classes.mainCreateContainer}>
            {
                showAlert &&
                <OKAlert message={alertMessage} onClose={handleCloseAlert} />
            }
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }} className={classes.closeButtonContainer} onClick={() => setOpenCreate(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                </svg>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }} className={classes.formLayoutContainer}>
                <form method='POST' className={classes.formContainer} onSubmit={(e) => handleCreateSubmit(e)}>
                    <div className={classes.formRowContainer}>
                        <input type='text' className={`${classes.formInput} ${classes.smallInputSize}`} placeholder='Firstname' ref={firstnameRef} />
                        <input type='text' className={`${classes.formInput} ${classes.smallInputSize}`} placeholder='Lastname' ref={lastnameRef} />
                    </div>
                    <div className={classes.formRowContainer}>
                        <input type='text' className={`${classes.formInput} ${classes.smallInputSize}`} placeholder='Username' ref={usernameRef} />
                        <input type='password' className={`${classes.formInput} ${classes.smallInputSize}`} placeholder='Password' ref={passwordRef} />
                    </div>
                    <div className={classes.formRowContainer}>
                        <input type='text' className={`${classes.formInput} ${classes.smallInputSize}`} placeholder='GR Number' ref={grNumberRef} />
                        <CustomDropdown defaultText={'Year'} options={yearsDropdownOptions} onSelect={handleYearSelect} />{/* Dropdown */}
                    </div>
                    <div className={classes.formRowContainer}>
                        <input type='email' className={`${classes.formInput} ${classes.smallInputSize}`} placeholder='E-Mail' ref={emailRef} />
                        <input type='number' className={`${classes.formInput} ${classes.smallInputSize}`} placeholder='Phone number' ref={phoneNumberRef} />
                    </div>
                    <div className={classes.formRowContainer} style={{ zIndex: 2 }}>
                        <CustomDropdown defaultText={'Institute'} options={instituteDropdownOptions} onSelect={handleInstituteSelect} />{/* Dropdown */}
                        <CustomDropdown defaultText={'Programme'} options={programmeDropdownOptions} onSelect={handleProgrammeSelect} />{/* Dropdown */}
                    </div>
                    <button type='submit' className={classes.createButton}>Create</button>
                </form>
            </motion.div>
        </motion.div>
    );
};

const DetailsView = ({ setOpenDetails, detailsData }) => {
    const formatDateTime = (createdAt) => {
        if (createdAt === null) {
            return null;
        }
        const date = new Date(createdAt);
        const formatDate = (date) => {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${day < 10 ? `0${day}` : day}/${month < 10 ? `0${month}` : month}/${year}`;
        };
        const formatTime = (date) => {
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let seconds = date.getSeconds();
            let ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            return `${hours}:${minutes}:${seconds} ${ampm}`;
        };
        const formattedDate = formatDate(date);
        const formattedTime = formatTime(date);
        return `${formattedDate} ${formattedTime}`;
    };
    return (
        <motion.div initial={{ width: '0' }} animate={window.innerWidth > 480 ? { width: '60%' } : { width: '100%' }} exit={{ width: '0' }} transition={{ duration: 0.2 }} className={classes.detailsViewContainer}>
            <div className={classes.detailsContainer}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }} className={classes.closeButtonContainer} onClick={() => setOpenDetails(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                    </svg>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }} className={classes.details}>
                    <span>User Details</span>
                    <hr className={classes.detailsSectionHr} />
                    <div><header className={classes.detailsData}>User creation date: </header><data>{formatDateTime(detailsData.createdAt)}</data></div>
                    <div><header className={classes.detailsData}>Name: </header><data>{detailsData.firstname + ' ' + detailsData.lastname}</data></div>
                    <div><header className={classes.detailsData}>Username: </header><data>{detailsData.username}</data></div>
                    <div><header className={classes.detailsData}>GR Number: </header><data>{detailsData.gr_no}</data></div>
                    <div><header className={classes.detailsData}>Year: </header><data>{detailsData.year}</data></div>
                    <div><header className={classes.detailsData}>E-Mail: </header><data>{detailsData.email}</data></div>
                    <div><header className={classes.detailsData}>Phone: </header><data>{detailsData.phone}</data></div>
                    <div><header className={classes.detailsData}>Institute: </header><data>{detailsData.institute}</data></div>
                    <div><header className={classes.detailsData}>Programme: </header><data>{detailsData.programme}</data></div>
                    <div><header className={classes.detailsData}>Status: </header><data>{detailsData.status}</data></div>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }} className={classes.modifyButtons}>
                    <button className={classes.editButton}>Edit &nbsp;
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-fill-gear" viewBox="0 0 16 16">
                            <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4m9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
                        </svg>
                    </button>
                    <button className={classes.deleteButton}>Delete &nbsp;
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-fill-x" viewBox="0 0 16 16">
                            <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708" />
                        </svg>
                    </button>
                </motion.div>
            </div>
        </motion.div>
    );
};