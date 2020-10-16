import React from 'react';
import './ListUserRepos.css';

function ListUserRepos({ data, error, addRepos }) {

    return (
        <div className="listUserRepos">
            {
                ((data.length !== 0 || error) && (data.message !== "Not Found") || data.total_count >= 0) ?
                    data.map(item => (
                       
                            <li key={item.id}>
                                <div className="card w-100 mt-3">
                                    <div className="card-header d-flex justify-content-between">
                                        <div>{item.owner.login}</div>
                                        <button className=" btn btn-outline-secondary" onClick={() => addRepos(item)}>add to fav</button>
                                    </div>
                                    <div className="card-body">
                                        <a href={item.html_url}>{item.name}</a>
                                        <div className="mt-4">
                                            <svg width="1em"
                                                height="1em"
                                                viewBox="0 0 16 16"
                                                className="bi bi-circle-fill ml-"
                                                fill="yellow"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="6" cy="6" r="6" />
                                            </svg>{item.language}
                                        </div>
                                        <div className="d-flex mt-3">
                                            <svg width="1em"
                                                height="1em"
                                                viewBox="0 0 16 16"
                                                class="bi bi-star"
                                                fill="currentColor"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd"
                                                    d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                            </svg><div className="ml-3">{item.stargazers_count}</div>
                                        </div>



                                    </div>
                                </div>
                            </li>
                      

                    ))
                    : null
            }

        </div>
    )
}

export default ListUserRepos
