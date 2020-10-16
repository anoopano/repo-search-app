import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';


function Home(props) {
    console.log(props.collection)
    var collection = props.collection
    return (
        <div className="container w-75 mt-5">
            <div className="navbar navbar-expand-lg navbar-light bg-light border border-secondary">
                <div className="navbar-brand">Starred repositories</div>
                <Link className="" to="/search">Go to search page</Link>
            </div>
            {props.collection.length > 0 ? <div>
                {
                    props.collection.map(item => (
                        <li key={item.item.id}>name: {item.item.name}</li>
                    ))
                }

            </div> : null}
        </div>
    )
}
export default Home

