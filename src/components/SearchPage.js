import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ListUserRepos from './ListUserRepos';
import ListRepositories from './ListRepositories';
import MoonLoader from 'react-spinners/MoonLoader';

function SearchPage(props) {
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userChecked, setUserChecked] = useState(false)  //search by username
    const [repoChecked, setRepoChecked] = useState(false)  //search by repository name


    useEffect(() => {

        // selecting the url to be fetched

        if (userChecked) {
            URL = `https://api.github.com/users/${search}/repos?per_page=5`

        } else if (repoChecked) {
            URL = `https://api.github.com/search/repositories?q=${search}+in:name`

        } else {
            URL = ''
        }
        //setting a time out for fetching when user stops typing on the searchbar

        setData([])
        const timeOutFn = setTimeout(() => {

            console.log(search)
            if (search.length) {
                let per_page = 100
                setLoading(true);
                fetch(URL)
                    .then(

                        (res) => {

                            res.json()
                                .then((resp) => {
                                    setData(resp);
                                    console.log(resp)
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
    }, [search])

    //


    return (
        <div className="container mt-5 w-75">
            <div className="">
                <Link to="/" className="mt-2 mr-3">Go home</Link>

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
               
            </div>
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
                <div className="row justify-content-center">
                    <div className="col-6 mx-auto">
                        <div className="spinner-border text-secondary" role="status" >
                            <span className="sr-only">Loading...</span>
                        </div>
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
        </div>
    )
}

export default SearchPage

//<MoonLoader loading color='blue' />