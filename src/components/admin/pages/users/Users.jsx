import React, { Fragment, useEffect, useRef, useState } from 'react';
import classes from '../CommonPages.module.css';
import { AnimatePresence, motion } from 'framer-motion';
import Loader from '../../../ui/loader/Loader';
import Table from '../../../ui/table/Table';
import Pagination from '../../../ui/table/pagination/Pagination';
import { useLocation } from 'react-router-dom';
import OKAlert from '../../../ui/customAlert/okAlert/OKAlert';
import CustomDropdown from '../../../ui/customDropdown/CustomDropdown';
// import { usersList } from '../../../../utils/dummydata';
import axios from 'axios';
import YesNoAlert from '../../../ui/customAlert/yesNoAlert/YesNoAlert';
import Swal from 'sweetalert2';

const Users = () => {
    const location = useLocation();
    const fileInputRef = useRef();
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
        const filteredData = data.filter((user) => {
            const searchFields = ['firstname', 'lastname', 'email', 'institute', 'year'];
            return searchFields.some((field) =>
                String(user[field]).toLowerCase().includes(searchQuery.toLowerCase())
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
        const gettingUsers = async () => {
            try {
                const users = await axios.get('https://mwm.met.edu/api/auth/get-all-users');
                setData(users.data.users);
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
            gettingUsers();
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

    const handleImportData = async () => {
        try {
            fileInputRef.current.click();
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        try {
            const formData = new FormData();
            formData.append('file', file);
            await axios.post('https://mwm.met.edu/api/auth/upload-file', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setRefreshList(true);
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: "Imported data successfully"
            });
        } catch (error) {
            console.error(error.message);
        }
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
                        <div className={openCreate ? classes.tableTopOnCreate : `${classes.tableTopOffCreate} ${classes.threeCols}`}>
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
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                        accept=".csv"
                                    />
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
                    <DetailsView setOpenDetails={setOpenDetails} detailsData={selectedRowData} setRefreshList={setRefreshList} />
                }
            </AnimatePresence>
        </div>
    );
};

export default Users;

const CreateComponent = ({ setOpenCreate, setRefreshList }) => {
    const firstnameRef = useRef();
    const middlenameRef = useRef();
    const lastnameRef = useRef();
    const grNumberRef = useRef();
    const emailRef = useRef();

    const [programme, setProgramme] = useState('');
    const [institute, setInstitute] = useState('');
    const [startYear, setStartYear] = useState('');
    const [endYear, setEndYear] = useState('');
    const [type, setType] = useState('');
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

    const handleStartYearSelect = (value) => {
        setStartYear(value);
    };

    const handleEndYearSelect = (value) => {
        setEndYear(value);
    };

    const handleTypeSelect = (value) => {
        setType(value);
    };

    const handleCreateSubmit = async (event) => {
        event.preventDefault();
        const toSentenceCase = (str) => {
            return str.toLowerCase().replace(/(?:^|\s)\w/g, (match) => match.toUpperCase());
        };
        const data = {
            firstname: toSentenceCase(firstnameRef.current.value),
            middlename: toSentenceCase(middlenameRef.current.value),
            lastname: toSentenceCase(lastnameRef.current.value),
            gr_no: grNumberRef.current.value,
            year: (startYear.length !== 0 && endYear.length !== 0) ? `${startYear}-${endYear}` : '',
            type: type,
            email: emailRef.current.value,
            institute: institute,
            programme: programme
        };
        try {
            if (
                !firstnameRef.current.value ||
                !middlenameRef.current.value ||
                !lastnameRef.current.value ||
                type.length === 0 ||
                !grNumberRef.current.value ||
                !emailRef.current.value ||
                institute.length === 0 ||
                programme.length === 0 ||
                startYear.length === 0 ||
                endYear.length === 0
            ) {
                const error = new Error('Please enter required field');
                error.statusCode = 422;
                throw error;
            }
            await axios.post('https://mwm.met.edu/api/auth/register', data);
            setRefreshList(true);
            setOpenCreate(false);
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: "Created user data successfully"
            });
        } catch (error) {
            if (error.response) {
                if (error.response.status === 409 || error.response.status === 400) {
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
                        <input type='text' className={`${classes.formInput} ${classes.smallInputSize}`} placeholder='Middlename' ref={middlenameRef} />
                    </div>
                    <div className={classes.formRowContainer}>
                        <input type='text' className={`${classes.formInput} ${classes.smallInputSize}`} placeholder='Lastname' ref={lastnameRef} />
                        <CustomDropdown defaultText={'Type'} options={['staff', 'student']} onSelect={handleTypeSelect} />{/* Dropdown */}
                    </div>
                    <div className={classes.formRowContainer}>
                        <input type='text' size={13} className={`${classes.formInput} ${classes.smallInputSize}`} placeholder='GR Number' ref={grNumberRef} />
                        <input type='email' pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" className={`${classes.formInput} ${classes.smallInputSize}`} placeholder='E-Mail' ref={emailRef} />
                    </div>
                    <div className={classes.formRowContainer} style={{ zIndex: 2 }}>
                        <CustomDropdown defaultText={'Institute'} options={instituteDropdownOptions} onSelect={handleInstituteSelect} />{/* Dropdown */}
                        <CustomDropdown defaultText={'Programme'} options={programmeDropdownOptions} onSelect={handleProgrammeSelect} />{/* Dropdown */}
                    </div>
                    <div className={classes.formRowContainer} style={{ zIndex: 1 }}>
                        <CustomDropdown defaultText={'Start year'} options={yearsDropdownOptions} onSelect={handleStartYearSelect} />{/* Dropdown */}
                        <CustomDropdown defaultText={'End year'} options={yearsDropdownOptions} onSelect={handleEndYearSelect} />{/* Dropdown */}
                    </div>
                    <button type='submit' className={classes.createButton}>Create</button>
                </form>
            </motion.div>
        </motion.div>
    );
};

const DetailsView = ({ setOpenDetails, detailsData, setRefreshList }) => {
    const firstnameRef = useRef(detailsData.firstname);
    const middlenameRef = useRef(detailsData.middlename);
    const lastnameRef = useRef(detailsData.lastname);
    const grNumberRef = useRef(detailsData.gr_no);
    const emailRef = useRef(detailsData.email);

    const [editMode, setEditMode] = useState(false);
    const [programme, setProgramme] = useState(detailsData.programme);
    const [institute, setInstitute] = useState(detailsData.institute);
    const [startYear, setStartYear] = useState(detailsData.year.split('-')[0]);
    const [endYear, setEndYear] = useState(detailsData.year.split('-')[1]);
    const [type, setType] = useState(detailsData.type);
    const [showAlert, setShowAlert] = useState(false);
    const [showOKAlert, setShowOKAlert] = useState(false);
    const [deleteId] = useState(detailsData._id);
    const [alertMessage, setAlertMessage] = useState(null);

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    const handleOKCloseAlert = () => {
        setShowOKAlert(false);
    };

    const handleShowAlert = (header, submessage) => {
        setAlertMessage({ header: header, submessage: submessage });
        setShowOKAlert(true);
    };

    const handleSubmitAlert = async () => {
        if (deleteId.length !== 0) {
            try {
                await axios.delete(`https://mwm.met.edu/api/auth/delete-user/${deleteId}`);
                setShowAlert(false);
                setOpenDetails(false);
                setRefreshList(true);
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "Deleted user data successfully"
                });
            } catch (error) {
                console.log(error.message);
            }
        }
    };

    const programmeDropdownOptions = ['MCA', 'MMS', 'CIDTL', 'ISDR'];
    const instituteDropdownOptions = ['IIT', 'ICS', 'PGDM', 'IIS', 'Management'];
    const currentYear = new Date().getFullYear();
    const yearsDropdownOptions = Array.from({ length: currentYear - 1992 }, (_, index) => (1993 + index).toString());

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

    const handleProgrammeSelect = (value) => {
        setProgramme(value);
    };

    const handleInstituteSelect = (value) => {
        setInstitute(value);
    };

    const handleStartYearSelect = (value) => {
        setStartYear(value);
    };

    const handleEndYearSelect = (value) => {
        setEndYear(value);
    };
    
    const handleUserTypeSelect = (value) => {
        setType(value);
    };
    
    const handleEditChanges = async (id) => {
        const toSentenceCase = (str) => {
            return str.toLowerCase().replace(/(?:^|\s)\w/g, (match) => match.toUpperCase());
        };
        try {
            if (
                !firstnameRef.current.value ||
                !middlenameRef.current.value ||
                !lastnameRef.current.value ||
                type.length === 0 ||
                !grNumberRef.current.value ||
                !emailRef.current.value ||
                institute.length === 0 ||
                programme.length === 0 ||
                startYear.length === 0 ||
                endYear.length === 0
                ) {
                    const error = new Error('Please enter required field');
                    error.statusCode = 422;
                    throw error;
                }
                const data = {
                    firstname: toSentenceCase(firstnameRef.current.value),
                    middlename: toSentenceCase(middlenameRef.current.value),
                    lastname: toSentenceCase(lastnameRef.current.value),
                    gr_no: grNumberRef.current.value,
                    type: type,
                    institute: institute,
                    programme: programme,
                    year: (startYear.length !== 0 && endYear.length !== 0) ? `${startYear}-${endYear}` : '',
                    email: emailRef.current.value
                };
                await axios.put(`https://mwm.met.edu/api/auth/update-user/${id}`, data)
            setEditMode(false);
            setOpenDetails(false);
            setRefreshList(true);
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: "Edited user data successfully"
            });
        } catch (error) {
            if (error.response) {
                if (error.response.status === 409 || error.response.status === 400) {
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

    const handleDeleteUser = () => {
        setShowAlert(true);
    };

    return (
        <motion.div initial={{ width: '0' }} animate={window.innerWidth > 480 ? { width: '60%' } : { width: '100%' }} exit={{ width: '0' }} transition={{ duration: 0.2 }} className={classes.detailsViewContainer}>
            <div className={classes.detailsContainer}>
                {
                    showOKAlert &&
                    <OKAlert message={alertMessage} onClose={handleOKCloseAlert} />
                }
                {showAlert && <YesNoAlert message={{ header: 'Delete', submessage: 'Do you really want to delete?' }} onClose={handleCloseAlert} onSubmit={handleSubmitAlert} />}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }} className={classes.closeButtonContainer} onClick={() => setOpenDetails(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                    </svg>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }} className={classes.details}>
                    <span className={classes.detailsHeading}>{editMode ? 'Edit User Details' : 'User Details'}</span>
                    <hr className={classes.detailsSectionHr} />
                    <div className={classes.flexBr}>
                        <header className={classes.detailsData}>User creation date: </header>
                        <data>{formatDateTime(detailsData.createdAt)}</data>
                    </div>
                    <div className={classes.flexBr}>
                        <header className={classes.detailsData}>Name: </header>
                        {
                            editMode ?
                                <Fragment>
                                    <input type='text' className={`${classes.formInput} ${classes.smallestInputSize}`} placeholder='Firstname' defaultValue={detailsData.firstname} ref={firstnameRef} />
                                    <input type='text' className={`${classes.formInput} ${classes.smallestInputSize}`} placeholder='Middlename' defaultValue={detailsData.middlename} ref={middlenameRef} />
                                    <input type='text' className={`${classes.formInput} ${classes.smallestInputSize}`} placeholder='Lastname' defaultValue={detailsData.lastname} ref={lastnameRef} />
                                </Fragment>
                                :
                                <data>{detailsData.firstname + ' ' + detailsData.middlename + ' ' + detailsData.lastname}</data>
                        }
                    </div>
                    <div className={classes.flexBr}>
                        <header className={classes.detailsData}>GR Number: </header>
                        {
                            editMode ?
                                <input type='text' size={13} className={`${classes.formInput} ${classes.smallInputSize}`} placeholder='GR Number' defaultValue={detailsData.gr_no} ref={grNumberRef} />
                                :
                                <data>{detailsData.gr_no}</data>
                        }
                    </div>
                    <div className={classes.flexBr}>
                        <header className={classes.detailsData}>Type: </header>
                        {
                            editMode ?
                                <CustomDropdown defaultText={detailsData.type} options={['staff', 'student']} onSelect={handleUserTypeSelect} />
                                :
                                <data>{detailsData.type}</data>
                        }
                    </div>
                    <div className={classes.flexBr}>
                        <header className={classes.detailsData}>Institute: </header>
                        {
                            editMode ?
                                <CustomDropdown defaultText={detailsData.institute} options={instituteDropdownOptions} onSelect={handleInstituteSelect} />
                                :
                                <data>{detailsData.institute}</data>
                        }
                    </div>
                    <div className={classes.flexBr}>
                        <header className={classes.detailsData}>Programme: </header>
                        {
                            editMode ?
                                <CustomDropdown defaultText={detailsData.programme} options={programmeDropdownOptions} onSelect={handleProgrammeSelect} />
                                :
                                <data>{detailsData.programme}</data>
                        }
                    </div>
                    <div className={classes.flexBr}>
                        <header className={classes.detailsData}>Year: </header>
                        {
                            editMode ?
                                <Fragment>
                                    <CustomDropdown defaultText={detailsData.year.split('-')[0]} options={yearsDropdownOptions} onSelect={handleStartYearSelect} />
                                    <CustomDropdown defaultText={detailsData.year.split('-')[1]} options={yearsDropdownOptions} onSelect={handleEndYearSelect} />
                                </Fragment>
                                :
                                <data>{detailsData.year}</data>
                        }
                    </div>
                    <div className={classes.flexBr}>
                        <header className={classes.detailsData}>E-Mail: </header>
                        {
                            editMode ?
                                <input type='email' className={`${classes.formInput} ${classes.smallInputSize}`} placeholder='E-Mail' defaultValue={detailsData.email} ref={emailRef} />
                                :
                                <data>{detailsData.email}</data>
                        }
                    </div>
                    <div className={classes.flexBr}>
                        <header className={classes.detailsData}>Status: </header>
                        <data>{detailsData.status === 1 ? 'Active' : 'Inactive'}</data>
                    </div>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }} className={classes.modifyButtons}>
                    {
                        editMode ?
                            <Fragment>
                                <button className={classes.editButton} onClick={() => handleEditChanges(detailsData._id)}>Save changes &nbsp;
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-floppy2" viewBox="0 0 16 16">
                                        <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v3.5A1.5 1.5 0 0 1 11.5 6h-7A1.5 1.5 0 0 1 3 4.5V1H1.5a.5.5 0 0 0-.5.5m9.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z" />
                                    </svg>
                                </button>
                                <button className={classes.deleteButton} onClick={() => setEditMode(false)}>Cancel &nbsp;
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                                    </svg>
                                </button>
                            </Fragment>
                            :
                            <Fragment>
                                <button className={classes.editButton} onClick={() => setEditMode(true)}>Edit &nbsp;
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                    </svg>
                                </button>
                                <button className={classes.deleteButton} onClick={() => handleDeleteUser(detailsData._id)}>Delete &nbsp;
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                    </svg>
                                </button>
                            </Fragment>
                    }
                </motion.div>
            </div>
        </motion.div>
    );
};