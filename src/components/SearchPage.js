import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ListUserRepos from './ListUserRepos';
import ListRepositories from './ListRepositories';
import Pagination from './Pagination'

function SearchPage(props) {
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userChecked, setUserChecked] = useState(false); //search by username
    const [repoChecked, setRepoChecked] = useState(false);  //search by repository name
    const [currentPage, setCurrentPage] = useState(1)

    function paginationFn(page) {
        setCurrentPage(page)
    }

    useEffect(() => {

        // selecting the url to be fetched
        setCurrentPage(1)
        if (userChecked) {
            URL = `https://api.github.com/users/${search}/repos`

        } else if (repoChecked) {
            URL = `https://api.github.com/search/repositories?q=${search}+in:name&page=${currentPage}`

        } else {
            URL = ''
        }
        //setting a timeout for fetching when user stops typing on the searchbar

        setData([])
        const timeOutFn = setTimeout(() => {
            if (search.length) {
                setLoading(true);
                fetch(URL)
                    .then(
                        (res) => {
                            res.json()
                                .then((resp) => {
                                    setData(resp);
                                    setLoading(false)

                                })
                        }
                    )
                    .catch((error) => {
                        setLoading(false)
                        setError(true)
                        throw (error)
                    })
            }
        }, 1000)
        return () => clearTimeout(timeOutFn)
    }, ([search]))

    useEffect(() => {
        if (userChecked) {
            URL = `https://api.github.com/users/${search}/repos`

        } else if (repoChecked) {
            URL = `https://api.github.com/search/repositories?q=${search}+in:name&page=${currentPage}`

        } else {
            URL = ''
        }
        fetch(URL)
            .then(
                (res) => {
                    res.json()
                        .then((resp) => {
                            setData(resp)
                            setLoading(false)
                        })
                }
            )
            .catch((error) => {
                setLoading(false)
                setError(true)
                throw (error)
            })


    }, [currentPage])

    return (
        <div className="container mt-2 w-75">

            <Link to="/" className="mt-2 mr-3">Back</Link>
            <input
                className="form-control searchPage-searchbar mt-3"
                type="text"
                onChange={
                    event => setSearch(event.target.value)

                }
                value={search}
                placeholder="Find a repository..."
                required
            />

            <div className="d-flex justify-content-start mt-3 mb-4">
                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="userCheckbox"
                        checked={userChecked}
                        value="userSearch"
                        onChange={() => { setUserChecked(!userChecked); setData([]); setSearch("") }}
                    />
                    <label
                        className="form-check-label"
                        htmlFor="userCheckbox">search by user name
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={repoChecked}
                        id="repoCheckbox"
                        value="repoSearch"
                        onChange={() => { setRepoChecked(!repoChecked); setData([]); setSearch("") }} />
                    <label
                        className="form-check-label"
                        htmlFor="repoCheckbox">search by repository name
                    </label>
                </div>
            </div>
            {loading ?
                <div className="d-flex justify-content-center mb-5">
                    <div className="spinner-border text-secondary" role="status" >
                    </div>

                </div>
                : null}
            {!userChecked && !repoChecked ?
                <div className="alert alert-danger" role="alert">
                    Select atleast one option!
                </div>
                : null}
            {userChecked && repoChecked ?
                <div className="alert alert-dark " role="alert">
                    Select one option at a time!
                </div> : null}

            {data.message === "Not Found" ? <div className="alert alert-danger w-50">Try another keyword</div> : null}
            {userChecked ? <ListUserRepos data={data} error={error} addRepos={props.addRepos} /> : null}
            {repoChecked ? <ListRepositories data={data} addRepos={props.addRepos} /> : null}
            {repoChecked && data.total_count > 30 ? <Pagination data={data} paginationFn={paginationFn} page={currentPage}></Pagination> : null}
        </div>
    )
}

export default SearchPage
