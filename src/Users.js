import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { SearchBar } from 'antd-mobile';

function Users () {
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        const getUserData = async () => {
            const response = await axios.get('https://reqres.in/api/users');
            console.log(response);
            setUserInfo(Object.entries(response.data.data));
        };
        getUserData();
    }, [])
    console.log(userInfo);
    return <div>
            <div className="container">
                <div className="row">
                    <div className="col-md">
                        <div className="float-left"><h2> My Customers </h2></div>
                    </div>
                    <div className="col-md">
                        <Link to="/"><div className="float-right">logout</div></Link>
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
                    <button className="btn btn-md btn-primary float-right">
                        Add User
                    </button>
                    </center>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Profile</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Created Date</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userInfo.map((user) => (
                                <tr>
                                    <th scope="row">{user[1].first_name +' '+ user[1].last_name}</th>
                                    <td>{user[1].email}</td>
                                    <td><img src={user[1].avatar}></img></td>
                                    <td></td>
                                    <td></td>
                                    <td><a>Edit</a> <a>Delete</a></td>
                                </tr> 
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>;
}


function Search() {
    return <div className="searchBox">
                <input type="text" style={{width:'80%', margin:30}} placeholder="Type in keywords to filter"/>
            </div>;
}
export default Users