import axios from 'axios';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import classes from '../CommonData.module.css';
import pageClasses from '../CommonPages.module.css';
import Loader from '../../ui/loader/Loader';
import Pagination from '../../ui/BasicPagination/Pagination';
import YesNoAlert from '../../ui/customAlert/yesNoAlert/YesNoAlert';
import Swal from 'sweetalert2';

const Artist = () => {
    const artistNameRef = useRef();
    const fileInputRef = useRef();

    const [showLoader, setShowLoader] = useState(false);
    const [refreshList, setRefreshList] = useState(false);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfRows, setNumberOfRows] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [openAddContent, setOpenAddContent] = useState(false);
    const [openEditLayout, setOpenEditLayout] = useState(null);
    const [updatedArtistName, setUpdatedArtistName] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [deleteId, setDeleteId] = useState();

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    const handleSubmitAlert = async () => {
        if (deleteId.length !== 0) {
            try {
                await axios.delete(`http://mwm.met.edu/api/artists/delete/${deleteId}`);
                setShowAlert(false);
                setRefreshList(true);
            } catch (error) {
                console.log(error.message);
            }
        }
    };

    useEffect(() => {
        const delay = 1000;
        setShowLoader(true);
        const gettingArtists = async () => {
            try {
                const artists = await axios.get('http://mwm.met.edu/api/artists/all');
                setData(artists.data.artists);
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
            gettingArtists();
            setShowLoader(false);
        }, delay);

        return () => {
            clearTimeout(debounce);
        };
    }, [refreshList]);

    useEffect(() => {
        const filteredData = data.filter((artist) => {
            const searchFields = ['name'];
            return searchFields.some((field) =>
                String(artist[field]).toLowerCase().includes(searchQuery.toLowerCase())
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

    const totalPageCount = Math.ceil(filteredData.length / numberOfRows);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleRowsPerPage = (numberOfRows) => {
        setNumberOfRows(parseInt(numberOfRows));
        setCurrentPage(1);
    };

    const handleAddArtist = async () => {
        try {
            await axios.post('http://mwm.met.edu/api/artists/add', { name: artistNameRef.current.value });
            setOpenAddContent(false);
            setRefreshList(true);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleEditArtist = async (id) => {
        try {
            await axios.put(`http://mwm.met.edu/api/artists/update/${id}`, { name: updatedArtistName });
            setOpenEditLayout(false);
            setRefreshList(true);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleDeleteData = (id) => {
        setDeleteId(id);
        setShowAlert(true);
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
            await axios.post('http://mwm.met.edu/api/artists/import', formData, {
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
        <div className={classes.fullscreen}>
            {showAlert && <YesNoAlert message={{ header: 'Delete', submessage: 'Do you really want to delete?' }} onClose={handleCloseAlert} onSubmit={handleSubmitAlert} />}
            <div className={classes.topContainer}>
                {
                    openAddContent ?
                        <div className={classes.addContentLayout}>
                            <input className={classes.addContentInput} type="text" placeholder='Artist name' ref={artistNameRef} />
                            <button className={classes.addContentSubmit} onClick={handleAddArtist}>Add</button>
                            <button className={classes.addContentCancel} onClick={() => setOpenAddContent(false)}>Cancel</button>
                        </div>
                        :
                        <button className={classes.addContent} onClick={() => setOpenAddContent(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                            </svg>
                            <span>Add Artist</span>
                        </button>
                }
                {
                    window.innerWidth < 480 ?
                        <Fragment>
                            {
                                !openAddContent &&
                                <div className={classes.searchBox}>
                                    <div className={classes.searchIcon}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                        </svg>
                                    </div>
                                    <input type='text' placeholder='Search here' className={classes.searchInput} onChange={(e) => setSearchQuery(e.target.value)} />
                                </div>
                            }
                        </Fragment>
                        :
                        <div className={classes.searchBox}>
                            <div className={classes.searchIcon}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </div>
                            <input type='text' placeholder='Search here' className={classes.searchInput} onChange={(e) => setSearchQuery(e.target.value)} />
                        </div>
                }
                <button className={classes.addContent} style={{ marginRight: '1rem' }} onClick={handleImportData}>
                    <div className={pageClasses.createButtonContainer}>
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
            <div className={classes.mainSection}>
                {
                    showLoader &&
                    <Loader />
                }
                {
                    !showLoader &&
                    displayedData.map((artist) => (
                        <div key={artist._id} className={classes.singleEntry}>
                            <div className={classes.heading}>
                                {
                                    openEditLayout && (openEditLayout === artist._id) ?
                                        <div className={classes.editContentLayout}>
                                            <input className={classes.editContentInput} type="text" placeholder='Artist name' defaultValue={artist.name} onChange={(e) => setUpdatedArtistName(e.target.value)} />
                                            <button className={classes.editContentSubmit} onClick={() => handleEditArtist(artist._id)}>Edit</button>
                                            <button className={classes.editContentCancel} onClick={() => setOpenEditLayout(null)}>Cancel</button>
                                        </div>
                                        :
                                        <Fragment>
                                            <span className={classes.headingName}>{artist.name}</span>
                                            <div className={classes.editEntry} onClick={() => setOpenEditLayout(artist._id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                </svg>
                                            </div>
                                        </Fragment>
                                }
                            </div>
                            <button className={classes.deleteButton} onClick={() => handleDeleteData(artist._id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                </svg>
                            </button>
                        </div>
                    ))
                }
            </div>
            <div className={classes.bottomContainer}>
                <Pagination rowsPerPage={handleRowsPerPage} startIndex={endIndex > 0 ? (startIndex + 1) : 0} endIndex={endIndex} numberOfRows={filteredData.length} currentPage={currentPage} totalPageCount={totalPageCount} onPageChange={handlePageChange} />
            </div>
        </div>
    );
};

export default Artist;