import React from 'react';
import {Link} from 'react-router-dom';
import './Home.css';


function Home(props) {
    
    return (
        <div className="container w-75 mt-5">
            <div className="navbar navbar-light bg-light border border-secondary d-flex justify-content-between">
                <div className="navbar-brand">REPOSITORIES</div>
                <Link to="/search">Search repositories</Link>
            </div>
            {props.collection.length > 0 ? <div className="mt-3">
                {props.collection.map(item => (
                <ul className="list-group">
                    
                        <li className="list-group-item list d-flex justify-content-between" key={item.item.id}>
                            <div className="">
                                <a href={item.item.owner.html_url} className="mr-2">{item.item.owner.login}</a>/
                                <a className="ml-1" href={item.item.html_url}>{item.item.name}</a>
                                
                            </div>
                            <button 
                                className="btn btn-outline-secondary btn-sm d-flex justify-content-end"
                                onClick={()=> props.deleteFn(item.item.id)}>
                                delete
                            </button>
                        </li>
                    
                </ul>
                ))
                }
            </div> : null}
        </div>
    )
}
export default Home
    /*
    
       {  props.collection.map(item => (
                            <ul className="list-group">
                        <li className="list-group-item" key={item.item.id}>
                            <div className="d-flex justify-content-between">
                                <a href={item.item.html_url}>{item.item.name}</a>
                                <div>
                                    <a href={item.item.owner.html_url}>
                                        {item.item.owner.login}
                                    </a>
                                </div>
                            </div>
                        </li>
                    </ul>




                     < ul className = "list-group" >
        <li className="list-group-item" key={item.item.id}>
            <div className="d-flex justify-content-between">
                <a href={item.item.html_url}>{item.item.name}</a>
                <div>
                    <a href={item.item.owner.html_url}>
                        {item.item.owner.login}
                    </a>
                </div>
            </div>
        </li>
</ul >
    
    */
   