import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from './user.actions';

import {Link} from 'react-router-dom'

function Users () {
    const users = useSelector(state => state.users);
    const results = users.search_results;
    console.log("results in app",results);
    const isSearch = users.isSearch;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);

    function handleDeleteUser(id) {
        if (window.confirm('Are you sure you wish to delete this user?'))
            dispatch(userActions.delete(id));
    }

    const display_list = isSearch ? results : users.items;

    return <div>
            <div className="container">
                <div className="row">
                    <div className="col-md">
                        <div className="float-left"><h2> My Customers </h2></div>
                    </div>
                    <div className="col-md">
                        <Link to="/signin"><div className="float-right">logout</div></Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg">
                    </div>
                </div>
                
            </div>
            <Search />
                <div>
                    <center>
                    <Link to="/add" className="btn btn-primary float-right">Add User</Link>
                    </center>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Username</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Created Date</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        {/* <tbody>
                            { users.items && users.items.map((user) => (
                                <tr key={user[1].id}>
                                    <th scope="row">{user[1].name ? user[1].name :
                                    user[1].first_name +' '+ user[1].last_name
                                    }</th>
                                    <td>{user[1].username ? user[1].username : user[1].email}</td>
                                    <td>{user[1].email}</td>
                                    <td>{(user[1].phone)? user[1].phone : ''}</td>
                                    <td>{(user[1].createdAt)? user[1].createdAt : ''}</td>
                                    <td>
                                        <Link to={"/edit/"+user[1].id}>Edit</Link> 
                                    {
                                        user.deleting ? <em> - Deleting...</em>
                                        : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                        : <span> - <a onClick={() => handleDeleteUser(user[1].id)} className="text-primary">Delete</a></span>
                                    }</td>
                                </tr> 
                            ))}
                        </tbody> */}
                        <tbody>
                            { display_list && display_list.map((user) => (
                                <tr key={user[1].id}>
                                    <th scope="row">{user[1].name ? user[1].name :
                                    user[1].first_name +' '+ user[1].last_name
                                    }</th>
                                    <td>{user[1].username ? user[1].username : user[1].email}</td>
                                    <td>{user[1].email}</td>
                                    <td>{(user[1].phone)? user[1].phone : ''}</td>
                                    <td>{(user[1].createdAt)? user[1].createdAt : ''}</td>
                                    <td>
                                        <Link to={"/edit/"+user[1].id}>Edit</Link> 
                                    {
                                        user.deleting ? <em> - Deleting...</em>
                                        : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                        : <span> - <a onClick={() => handleDeleteUser(user[1].id)} className="text-primary">Delete</a></span>
                                    }</td>
                                </tr> 
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>;
}


function Search() {
    const [input, setInput] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const dispatch = useDispatch();
    const user_list = useSelector(state => state.users)
    function handleChange(e) {
        setInput(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const searchTerm = input.toLowerCase();
        const results = user_list.items ? user_list.items.filter(user => {
            return Object.keys(user[1]).some(key =>
                (user[1][key]).toString().toLowerCase().includes(searchTerm));
        }) : '';
        console.log(results);
        dispatch(userActions.search(results));

    };
    
    return <form onSubmit={handleSubmit}>
            <div className="searchBox">
                <input type="text" style={{width:'90%', margin:30}} placeholder="Type in keywords and press enter to search" onChange={handleChange} value={input}/>
            </div></form>;
}
export { Users }