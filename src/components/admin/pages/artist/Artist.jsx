import axios from 'axios';
import React, { useEffect, useState } from 'react';
import classes from '../CommonData.module.css';
import Loader from '../../../ui/loader/Loader';
import Pagination from '../../../ui/BasicPagination/Pagination';

const Artist = () => {
    const [showLoader, setShowLoader] = useState(false);
    const [refreshList, setRefreshList] = useState(false);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfRows, setNumberOfRows] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const delay = 1000;
        setShowLoader(true);
        const gettingUsers = async () => {
            try {
                const artists = await axios.get('https://mwm.met.edu/api/artists/all');
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
            gettingUsers();
            setShowLoader(false);
        }, delay);

        return () => {
            clearTimeout(debounce);
        };
    }, [refreshList]);

    useEffect(() => {
        const filteredData = data.filter((requisition) => {
            const searchFields = ['name'];
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

    const totalPageCount = Math.ceil(filteredData.length / numberOfRows);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleRowsPerPage = (numberOfRows) => {
        setNumberOfRows(parseInt(numberOfRows));
        setCurrentPage(1);
    };

    return (
        <div className={classes.fullscreen}>
            <div className={classes.topContainer}>
                <div className={classes.searchBox}>
                    <div className={classes.searchIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </div>
                    <input type='text' placeholder='Search here' className={classes.searchInput} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <div className={classes.pagination}>
                    <Pagination rowsPerPage={handleRowsPerPage} startIndex={endIndex > 0 ? (startIndex + 1) : 0} endIndex={endIndex} numberOfRows={filteredData.length} currentPage={currentPage} totalPageCount={totalPageCount} onPageChange={handlePageChange} />
                </div>
            </div>
            <div className={classes.mainSection}>
                {
                    showLoader &&
                    <Loader />
                }
                {
                    !showLoader &&
                    displayedData.map((artist) => (
                        <div className={classes.singleEntry}>{artist.name}</div>
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