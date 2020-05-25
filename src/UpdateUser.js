import React, { useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from './user.actions';

function UpdateUser() {
    const { id } = useParams();
    const users = useSelector(state => state.users)
    let edit_user;
    let history = useHistory()
    if (users.items) {
        users.items.forEach(user => {
            if (parseInt(user[1].id) === parseInt(id)) {
                edit_user = user;
            }
        });
    }
    if (!edit_user) {
        edit_user = [0, {
            name:' ',
            email:'',
            username:'',
            phone:'',
            createdAt:''
        }]
        history.push('/users')
    }

    const [user, setUser] = useState({
        name: edit_user[1].name?edit_user[1].name:(edit_user[1].first_name+' '+edit_user[1].last_name),
        email: edit_user[1].email,
        username: edit_user[1].username?edit_user[1].username:edit_user[1].email,
        phone: edit_user[1].phone,
        id: id,
        createdAt: edit_user[1].createdAt || ''
    });
    const [submitted, setSubmitted] = useState(false);
    const updating = useSelector(state => state.users.updating);
    const dispatch = useDispatch();

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (user.phone && user.name && user.username && user.email) {
            dispatch(userActions.update(user));
        }
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>Edit user</h2>
            <form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" value={user.name} onChange={handleChange} className={'form-control' + (submitted && !user.name ? ' is-invalid' : '')} />
                    {submitted && !user.name &&
                        <div className="invalid-feedback">Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="username" value={user.username} onChange={handleChange} className={'form-control' + (submitted && !user.username ? ' is-invalid' : '')} />
                    {submitted && !user.username &&
                        <div className="invalid-feedback">Username is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" name="email" value={user.email} onChange={handleChange} className={'form-control' + (submitted && !user.email ? ' is-invalid' : '')} />
                    {submitted && !user.email &&
                        <div className="invalid-feedback">Email is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input type="text" name="phone" value={user.phone} onChange={handleChange} className={'form-control' + (submitted && !user.phone ? ' is-invalid' : '')} />
                    {submitted && !user.phone &&
                        <div className="invalid-feedback">Phone is required</div>
                    }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">
                        {updating && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Update
                    </button>
                    <Link to="/users" className="btn btn-link">Cancel</Link>
                </div>
            </form>
        </div>
    );
}

export { UpdateUser };