import { authHeader } from './auth-header';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export const userService = {
    login,
    logout,
    getAll,
    update,
    delete: _delete
};

function login(email, password) {
    return axios.post('https://reqres.in/api/login', {
            "email": email,
            "password": password
        })
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        }).catch(err => {
            console.log(err);
            throw err;
        });
    // return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
    //     .then(handleResponse)
    //     .then(user => {
    //         // store user details and jwt token in local storage to keep user logged in between page refreshes
    //         localStorage.setItem('user', JSON.stringify(user));

    //         return user;
    //     });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    return axios.get('https://reqres.in/api/users')
           .then(users => {
                return Object.entries(users.data.data);
           })
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    // return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {

    return axios.delete('https://reqres.in/api/users/'+id)
        .then(resp => {
            return resp;
        }).catch(err => {
            console.log(err);
            throw err;
        });
    // return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text();
}