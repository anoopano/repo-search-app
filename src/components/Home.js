import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';


function Home(props) {
    console.log(props.collection)
    var collection=props.collection
    return (
        <div>
            <Link to="/search">Goto search</Link>
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

