import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from './user.actions';

import {Link} from 'react-router-dom'

function Users () {
    const users = useSelector(state => state.users);
    // const user = useSelector(state => state.authencation.user);
    const dispatch = useDispatch();
    // const [userInfo, setUserInfo] = useState([]);

    // useEffect(() => {
    //     const getUserData = async () => {
    //         const response = await axios.get('https://reqres.in/api/users');
    //         console.log(response);
    //         setUserInfo(Object.entries(response.data.data));
    //     };
    //     getUserData();
    // }, [])
    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);

    console.log(users.items);

    function handleDeleteUser(id) {
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
                                <th scope="col">Email</th>
                                <th scope="col">Profile</th>
                                <th scope="col">Created Date</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.items && users.items.map((user) => (
                                <tr key={user[1].id}>
                                    <th scope="row">{user[1].first_name +' '+ user[1].last_name}</th>
                                    <td>{user[1].email}</td>
                                    <td><img src={user[1].avatar}></img></td>
                                    <td></td>
                                    <td>Edit {
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