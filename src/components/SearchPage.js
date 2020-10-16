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
                let per_page= 100
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
        <div>
            <Link to="/" >Go home</Link>

            <input
                className="form-control searchPage-searchbar"
                type="text"
                onChange={
                    event => setSearch(event.target.value)

                }
                value={search}
                placeholder="Find a repository..."
                required
            />
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
                    className="form-check-label text-muted"
                    htmlFor="repoCheckbox">search by repository name
            </label>
            </div>
            {(loading ?<div><MoonLoader loading color='blue'/></div>: null)}
        
            {data.message === "Not Found" ? <div>Try another keyword</div> : null}
            {userChecked ? <ListUserRepos data={data} error={error} addRepos={props.addRepos} /> : null}
            {repoChecked ? <ListRepositories data={data} addRepos={props.addRepos}/> : null}
        </div>
    )
}

export default SearchPage

