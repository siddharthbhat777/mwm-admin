import axios from 'axios';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import classes from '../CommonData.module.css';
import Loader from '../../../ui/loader/Loader';
import Pagination from '../../../ui/BasicPagination/Pagination';
import YesNoAlert from '../../../ui/customAlert/yesNoAlert/YesNoAlert';

const Category = () => {
    const categoryNameRef = useRef();
    const categorySvgRef = useRef();

    const [showLoader, setShowLoader] = useState(false);
    const [refreshList, setRefreshList] = useState(false);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfRows, setNumberOfRows] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [openAddContent, setOpenAddContent] = useState(false);
    const [openEditLayout, setOpenEditLayout] = useState(null);
    const [updatedCategoryName, setUpdatedCategoryName] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [deleteId, setDeleteId] = useState();

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    const handleSubmitAlert = async () => {
        if (deleteId.length !== 0) {
            try {
                await axios.delete(`https://mwm.met.edu/api/categories/delete-categories/${deleteId}`);
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
        const gettingCategories = async () => {
            try {
                const categories = await axios.get('https://mwm.met.edu/api/categories/all-categories');
                setData(categories.data.categories);
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
            gettingCategories();
            setShowLoader(false);
        }, delay);

        return () => {
            clearTimeout(debounce);
        };
    }, [refreshList]);

    useEffect(() => {
        const filteredData = data.filter((category) => {
            const searchFields = ['category_name'];
            return searchFields.some((field) =>
                String(category[field]).toLowerCase().includes(searchQuery.toLowerCase())
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

    const handleAddCategory = async () => {
        try {
            const formData = new FormData();
            formData.append('category_name', categoryNameRef.current.value);
            formData.append('icon', categorySvgRef.current.files[0]);
            await axios.post('https://mwm.met.edu/api/categories/add', formData);
            setOpenAddContent(false);
            setRefreshList(true);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleEditCategory = async (id) => {
        try {
            await axios.put(`https://mwm.met.edu/api/categories/update-categories/${id}`, { category_name: updatedCategoryName });
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

    return (
        <div className={classes.fullscreen}>
            {showAlert && <YesNoAlert message={{ header: 'Delete', submessage: 'Do you really want to delete?' }} onClose={handleCloseAlert} onSubmit={handleSubmitAlert} />}
            <div className={classes.topContainer}>
                {
                    openAddContent ?
                        <div className={classes.addContentLayout}>
                            <input className={classes.addContentInput} type="text" placeholder='Category name' ref={categoryNameRef} />
                            <input className={classes.addContentFileInput} type="file" placeholder='Category svg' ref={categorySvgRef} />
                            <button className={classes.addContentSubmit} onClick={handleAddCategory}>Add</button>
                            <button className={classes.addContentCancel} onClick={() => setOpenAddContent(false)}>Cancel</button>
                        </div>
                        :
                        <button className={classes.addContent} onClick={() => setOpenAddContent(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                            </svg>
                            <span>Add Category</span>
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
            </div>
            <div className={classes.mainSection}>
                {
                    showLoader &&
                    <Loader />
                }
                {
                    !showLoader &&
                    displayedData.map((category) => (
                        <div key={category._id} className={classes.singleEntry}>
                            <div className={classes.heading}>
                                {
                                    openEditLayout && (openEditLayout === category._id) ?
                                        <div className={classes.editContentLayout}>
                                            <input className={classes.editContentInput} type="text" placeholder='Artist name' defaultValue={category.category_name} onChange={(e) => setUpdatedCategoryName(e.target.value)} />
                                            <button className={classes.editContentSubmit} onClick={() => handleEditCategory(category._id)}>Edit</button>
                                            <button className={classes.editContentCancel} onClick={() => setOpenEditLayout(null)}>Cancel</button>
                                        </div>
                                        :
                                        <Fragment>
                                            <span className={classes.headingName}>{category.category_name}</span>
                                            <div className={classes.editEntry} onClick={() => setOpenEditLayout(category._id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                </svg>
                                            </div>
                                        </Fragment>
                                }
                            </div>
                            <button className={classes.deleteButton} onClick={() => handleDeleteData(category._id)}>
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

export default Category;