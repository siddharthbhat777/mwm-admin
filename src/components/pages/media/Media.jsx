import React, { Fragment, useEffect, useRef, useState } from 'react';
import classes from '../CommonPages.module.css';
import { AnimatePresence, motion } from 'framer-motion';
import Loader from '../../ui/loader/Loader';
import Table from '../../ui/table/Table';
import { useLocation } from 'react-router-dom';
import OKAlert from '../../ui/customAlert/okAlert/OKAlert';
import TagsInput from '../../ui/tagsInput/TagsInput';
import axios from 'axios';
import YesNoAlert from '../../ui/customAlert/yesNoAlert/YesNoAlert';
import ReturnKeyDropdown from '../../ui/customDropdown/returnKeyDropdown/ReturnKeyDropdown';
import AnimatedMulti from '../../ui/customDropdown/animatedMulti/AnimatedMulti';

const Media = () => {
    const location = useLocation();
    const [openCreate, setOpenCreate] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);
    const [data, setData] = useState([]);
    const [showLoader, setShowLoader] = useState(false);
    const [refreshList, setRefreshList] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (location.state) {
            setOpenDetails(true);
            setOpenCreate(false);
            setSelectedRowData(location.state.requisitionData)
        }
    }, [location]);

    // useEffect(() => {
    //     const filteredData = data.filter((requisition) => {
    //         const searchFields = ['title', 'director', 'views_count', 'likes_count', 'dislikes_count'];
    //         return searchFields.some((field) =>
    //             String(requisition[field]).toLowerCase().includes(searchQuery.toLowerCase())
    //         );
    //     });
    //     if (filteredData.length !== 0) {
    //         setFilteredData(filteredData);
    //     } else {
    //         if (searchQuery.length === 0) {
    //             setFilteredData(data);
    //         } else {
    //             setFilteredData([]);
    //         }
    //     }
    // }, [data, searchQuery]);

    // const startIndex = (currentPage - 1) * numberOfRows;
    // const endIndex = Math.min(startIndex + numberOfRows, data.length);
    // let displayedData;
    // if (window.innerWidth > 480) {
    //     displayedData = data.slice(startIndex, endIndex);
    // } else {
    //     displayedData = data;
    // }

    useEffect(() => {
        const delay = 1000;
        setShowLoader(true);
        const gettingMedia = async () => {
            try {
                const media = await axios.get(`http://mwm.met.edu/api/media/search?query=${searchQuery}`);
                setData(media.data.media);
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
            gettingMedia();
            setShowLoader(false);
        }, delay);

        return () => {
            clearTimeout(debounce);
        };
    }, [refreshList, searchQuery]);

    const columns = [
        { field: 'title', header: 'Title' },
        { field: 'director', header: 'Director' },
        { field: 'views_count', header: 'Views' },
        { field: 'likes_count', header: 'Likes' },
        { field: 'dislikes_count', header: 'Dislikes' }
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
                        <div className={openCreate ? classes.tableTopOnCreate : `${classes.tableTopOffCreate} ${classes.twoCols}`}>
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
                        </div>
                        <hr className={classes.tableDivideLine} />
                        <div className={classes.tableContainer}>
                            {
                                showLoader &&
                                <Loader />
                            }
                            {
                                !showLoader &&
                                <Table rows={data} columns={columns} isRowSelected={openDetails} selectedRow={handleSelectedRow} />
                            }
                        </div>
                        {window.innerWidth > 480 && <hr className={classes.tableDivideLine} />}
                        {/* <div className={classes.bottomContainer}>
                            <NumberOfElementsPerPage rowsPerPage={handleRowsPerPage} />
                        </div> */}
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

export default Media;

const CreateComponent = ({ setOpenCreate, setRefreshList }) => {
    const titleRef = useRef();
    const fileRef = useRef();
    const thumbnailRef = useRef();
    const lyricistRef = useRef();
    const directorRef = useRef();
    const albumRef = useRef();

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);
    const [selectedArtistsOptions, setSelectedArtistsOptions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [tags, setTags] = useState([]);
    const [artists, setArtists] = useState([]);
    const [categories, setCategories] = useState([]);

    const transformedData = artists.map(item => ({ value: item.name, label: item.name }));

    const handleShowAlert = (header, submessage) => {
        setAlertMessage({ header: header, submessage: submessage });
        setShowAlert(true);
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    useEffect(() => {
        const getArtistCategories = async () => {
            try {
                const artists = await axios.get('http://mwm.met.edu/api/artists/all');
                const categories = await axios.get('http://mwm.met.edu/api/categories/all-categories');
                setArtists(artists.data.artists);
                setCategories(categories.data.categories.map(category => {
                    return { key: category._id, name: category.category_name };
                }));
            } catch (error) {
                console.log(error.message);
            }
        };
        getArtistCategories();
    }, []);

    const handleCreateSubmit = async () => {
        try {
            if (
                !titleRef.current.value ||
                !fileRef.current.value ||
                !thumbnailRef.current.value ||
                selectedCategory.length === 0 ||
                !lyricistRef.current.value ||
                !albumRef.current.value ||
                !directorRef.current.value
            ) {
                const error = new Error('Please enter required field');
                error.statusCode = 422;
                throw error;
            }
            const formData = new FormData();
            formData.append('title', titleRef.current.value);
            selectedArtistsOptions.forEach(artist => {
                formData.append('artists', artist.value);
            });
            formData.append('file_path', fileRef.current.value);
            formData.append('thumbnail', thumbnailRef.current.value);
            formData.append('category', selectedCategory);
            formData.append('lyricist', lyricistRef.current.value);
            formData.append('album', albumRef.current.value);
            formData.append('director', directorRef.current.value);
            tags.forEach(tag => {
                formData.append('tags', tag);
            });
            await axios.post('http://mwm.met.edu/api/media/add', formData);
            setRefreshList(true);
            setOpenCreate(false);
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

    // const handleArtistsSelectionChange = (updatedOptions) => {
    //     setSelectedArtistsOptions(updatedOptions);
    // };

    const selectedTags = tags => {
        setTags(tags);
    };

    const handleCategorySelect = (value) => {
        setSelectedCategory(value);
    };

    const handleArtistSelect = (value) => {
        setSelectedArtistsOptions(value);
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
                <div className={classes.formContainer}>
                    <div className={classes.formRowContainer}>
                        <input type='text' className={`${classes.formInput} ${classes.largeInputSize}`} placeholder='Title' ref={titleRef} />
                    </div>
                    <div className={classes.formRowContainer}>
                        {/* <MultiSelectDropdown header={'Artists'} options={artists} selectedOptions={selectedArtistsOptions} handleSelection={handleArtistsSelectionChange} labelKey={'name'} /> */}
                        <ReturnKeyDropdown defaultText={'Category'} options={categories} onSelect={handleCategorySelect} />
                    </div>
                    <div className={classes.formRowContainer}>
                        <AnimatedMulti options={transformedData} placeholder={'Artists'} defaultValues={null} onSelectChange={handleArtistSelect} />
                    </div>
                    <div className={classes.formRowContainer}>
                        <span className={classes.createFieldHeader}>Media file: </span><input type='text' required className={`${classes.formInput} ${classes.smallInputSize}`} placeholder='Media URL' ref={fileRef} />
                    </div>
                    <div className={classes.formRowContainer}>
                        <span className={classes.createFieldHeader}>Thumbnail: </span><input type='text' required className={`${classes.formInput} ${classes.mediumInputSize}`} placeholder='Thumbnail URL' ref={thumbnailRef} />
                    </div>
                    <div className={classes.formRowContainer}>
                        <input type='text' className={`${classes.formInput} ${classes.smallInputSize}`} placeholder='Lyricist' ref={lyricistRef} />
                        <input type='text' className={`${classes.formInput} ${classes.smallInputSize}`} placeholder='Director' ref={directorRef} />
                    </div>
                    <div className={classes.formRowContainer}>
                        <input type='text' className={`${classes.formInput} ${classes.smallInputSize}`} placeholder='Album' ref={albumRef} />
                    </div>
                    <TagsInput selectedTags={selectedTags} tagsInput={tags} header={'tags'} />
                    <button onClick={handleCreateSubmit} className={classes.createButton}>Create</button>
                </div>
            </motion.div>
        </motion.div>
    );
};

const DetailsView = ({ setOpenDetails, detailsData, setRefreshList }) => {
    console.log(detailsData);
    const [title, setTitle] = useState(detailsData.title);
    const [editMode, setEditMode] = useState(false);
    const [selectedArtistsOptions, setSelectedArtistsOptions] = useState(detailsData.artists.map(artist => artist._id));
    const [selectedCategory, setSelectedCategory] = useState('');
    const [artists, setArtists] = useState([]);
    const [categories, setCategories] = useState([]);
    const [file, setFile] = useState(detailsData.file_path)
    const [lyricist, setLyricist] = useState(detailsData.lyricist);
    const [album, setAlbum] = useState(detailsData.album);
    const [director, setDirector] = useState(detailsData.director);
    const [tags, setTags] = useState(detailsData.tags);
    const [showAlert, setShowAlert] = useState(false);
    const [showOkAlert, setShowOkAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);
    const [deleteId] = useState(detailsData._id);
    const [thumbnail, setThumbnail] = useState(detailsData.thumbnail);

    const transformedData = artists.map(item => ({ value: item.name, label: item.name }));
    const transformedSelectedData = detailsData.artists.map(item => ({ value: item.name, label: item.name }));

    const handleShowAlert = (header, submessage) => {
        setAlertMessage({ header: header, submessage: submessage });
        setShowOkAlert(true);
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    const handleCloseOKAlert = () => {
        setShowOkAlert(false);
    };

    const handleSubmitAlert = async () => {
        if (deleteId.length !== 0) {
            try {
                await axios.delete(`http://mwm.met.edu/api/media/${deleteId}`);
                setShowAlert(false);
                setOpenDetails(false);
                setRefreshList(true);
            } catch (error) {
                console.log(error.message);
            }
        }
    };

    useEffect(() => {
        const getArtistCategories = async () => {
            try {
                const artists = await axios.get('http://mwm.met.edu/api/artists/all');
                const categories = await axios.get('http://mwm.met.edu/api/categories/all-categories');
                setArtists(artists.data.artists);
                setCategories(categories.data.categories.map(category => {
                    return { key: category._id, name: category.category_name };
                }));
            } catch (error) {
                console.log(error.message);
            }
        };
        getArtistCategories();
    }, []);

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

    // const handleArtistsSelectionChange = (updatedOptions) => {
    //     setSelectedArtistsOptions(updatedOptions);
    // };

    const selectedTags = tags => {
        setTags(tags);
    };
    

    const handleEditSubmit = async (id) => {
        try {
            const formData = new FormData();
            formData.append('title', title);
            selectedArtistsOptions.forEach(artist => {
                formData.append('artists', artist.value);
            });
            formData.append('file_path', file);
            formData.append('thumbnail', thumbnail);
            formData.append('category', selectedCategory);
            formData.append('lyricist', lyricist);
            formData.append('album', album);
            formData.append('director', director);
            tags.forEach(tag => {
                formData.append('tags', tag);
            });
            await axios.put(`http://mwm.met.edu/api/media/update/${id}`, formData)
            setOpenDetails(false);
            setRefreshList(true);
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

    const handleCategorySelect = (value) => {
        setSelectedCategory(value);
    };

    const handleArtistSelect = (value) => {
        setSelectedArtistsOptions(value);
    };

    return (
        <motion.div initial={{ width: '0' }} animate={window.innerWidth > 480 ? { width: '60%' } : { width: '100%' }} exit={{ width: '0' }} transition={{ duration: 0.2 }} className={classes.detailsViewContainer}>
            <div className={classes.detailsContainer}>
                {
                    showOkAlert &&
                    <OKAlert message={alertMessage} onClose={handleCloseOKAlert} />
                }
                {showAlert && <YesNoAlert message={{ header: 'Delete', submessage: 'Do you really want to delete?' }} onClose={handleCloseAlert} onSubmit={handleSubmitAlert} />}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }} className={classes.closeButtonContainer} onClick={() => setOpenDetails(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                    </svg>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }} className={classes.details}>
                    <span className={classes.detailsHeading}>{editMode ? 'Edit Media Details' : 'Media Details'}</span>
                    <hr className={classes.detailsSectionHr} />
                    <div className={classes.flexBr}>
                        <header className={classes.detailsData}>Media creation date: </header>
                        <data>{formatDateTime(detailsData.createdAt)}</data>
                    </div>
                    <div className={classes.flexBr}>
                        <header className={classes.detailsData}>Title: </header>
                        {
                            editMode ?
                                <input type='text' className={`${classes.formInput} ${classes.smallerInputSize}`} placeholder='Title' defaultValue={detailsData.title} onChange={(e) => setTitle(e.target.value)} />
                                :
                                <data>{detailsData.title}</data>
                        }
                    </div>
                    <div className={classes.flexBr}>
                        <header className={classes.detailsData}>Artists: </header>
                        {
                            editMode ?
                                <AnimatedMulti options={transformedData} placeholder={'Artists'} defaultValues={transformedSelectedData} onSelectChange={handleArtistSelect} />
                                :
                                <data>{detailsData.artists.map(artist => artist.name).toString()}</data>
                        }
                    </div>
                    <div className={classes.flexBr}>
                        <header className={classes.detailsData}>Media file: </header>
                        {
                            editMode ?
                                <input type='text' className={`${classes.formInput} ${classes.smallInputSize}`} placeholder='Media file' defaultValue={detailsData.file_path} onChange={(e) => setFile(e.target.value)} />
                                :
                                <data>{detailsData.file_path}</data>
                        }
                    </div>
                    <div className={classes.flexBr}>
                        <header className={classes.detailsData}>Thumbnail: </header>
                        {
                            editMode ?
                                <input type='text' className={`${classes.formInput} ${classes.smallInputSize}`} placeholder='Thumbnail' defaultValue={detailsData.thumbnail} onChange={(e) => setThumbnail(e.target.value)} />
                                :
                                <data>{detailsData.thumbnail}</data>
                        }
                    </div>
                    <div className={classes.flexBr}>
                        <header className={classes.detailsData}>Category: </header>
                        {
                            editMode ?
                                <ReturnKeyDropdown defaultText={'Category'} options={categories} onSelect={handleCategorySelect} />
                                :
                                <data>{detailsData.category.category_name}</data>
                        }
                    </div>
                    <div className={classes.flexBr}>
                        <header className={classes.detailsData}>Lyricist: </header>
                        {
                            editMode ?
                                <input type='text' className={`${classes.formInput} ${classes.smallerInputSize}`} placeholder='Lyricist' defaultValue={detailsData.lyricist} onChange={(e) => setLyricist(e.target.value)} />
                                :
                                <data>{detailsData.lyricist}</data>
                        }
                    </div>
                    <div className={classes.flexBr}>
                        <header className={classes.detailsData}>Album: </header>
                        {
                            editMode ?
                                <input type='text' className={`${classes.formInput} ${classes.smallerInputSize}`} placeholder='Album' defaultValue={detailsData.album} onChange={(e) => setAlbum(e.target.value)} />
                                :
                                <data>{detailsData.album}</data>
                        }
                    </div>
                    <div className={classes.flexBr}>
                        <header className={classes.detailsData}>Director: </header>
                        {
                            editMode ?
                                <input type='text' className={`${classes.formInput} ${classes.smallerInputSize}`} placeholder='Director' defaultValue={detailsData.director} onChange={(e) => setDirector(e.target.value)} />
                                :
                                <data>{detailsData.director}</data>
                        }
                    </div>
                    <div className={classes.flexBr}>
                        <header className={classes.detailsData}>Views: </header>
                        <data>{detailsData.views_count}</data>
                    </div>
                    <div className={classes.flexBr}>
                        <header className={classes.detailsData}>Likes: </header>
                        <data>{detailsData.likes_count}</data>
                    </div>
                    <div className={classes.flexBr}>
                        <header className={classes.detailsData}>Dislikes: </header>
                        <data>{detailsData.dislikes_count}</data>
                    </div>
                    <div className={classes.flexBr}>
                        <header className={classes.detailsData}>Tags: </header>
                        {
                            editMode ?
                                <TagsInput selectedTags={selectedTags} tagsInput={tags} header={'tags'} />
                                :
                                <data>{detailsData.tags.toString()}</data>
                        }
                    </div>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }} className={classes.modifyButtons}>
                    {
                        editMode ?
                            <Fragment>
                                <button className={classes.editButton} onClick={() => handleEditSubmit(detailsData._id)}>Save changes &nbsp;
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