import axios from 'axios';

export const userService = {
    login,
    logout,
    getAll,
    create,
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

function create(user) {
    return axios.post('https://reqres.in/api/users', {
        "name": user.name,
        "username": user.username,
        "email": user.email,
        "phone": user.phone
    }).then(user => {
        // localStorage.setItem('user', JSON.stringify(user));
        return user;
    }).catch(err => {
        console.log(err);
        throw err;
    });
}

function update(user) {

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