import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from './user.actions';

import {Link} from 'react-router-dom'

function Users () {
    const users = useSelector(state => state.users);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);

    // console.log(users.items);
    // console.log(users.new_items);

    function handleDeleteUser(id) {
        if (window.confirm('Are you sure you wish to delete this user?'))
            dispatch(userActions.delete(id));
    }

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
                        <tbody>
                            {users.items && users.items.map((user) => (
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
    return <div className="searchBox">
                <input type="text" style={{width:'90%', margin:30}} placeholder="Type in keywords to filter"/>
            </div>;
}
export { Users }