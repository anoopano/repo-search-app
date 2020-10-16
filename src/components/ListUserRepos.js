import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';

function ListUserRepos({ data, error, addRepos }) {

    return (
        <div>
            {
                ((data.length !== 0 || error) && (data.message !== "Not Found") || data.total_count >= 0) ?
                    data.map(item => (

                        <li className="" key={item.id}>
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-text">{item.name} : <span className="text-muted">{item.owner.login}</span></h4>

                                    <a href={item.html_url}>go to github repo</a>
                                </div>
                                <button className="btn btn-primary" onClick={() => addRepos(item)} >add to fav</button>
                            </div>
                        </li>

                    ))
                    : null
            }{
                (data.message === "Not Found") ? <div>sorry</div> : null
            }

        </div>
    )
}

export default ListUserRepos
