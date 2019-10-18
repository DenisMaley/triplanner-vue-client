import config from 'config';

export const userService = {
    register,
    login,
    logout
};

function register(username, email, password) {

    const data = {
        'username': username,
        'email': email,
        'password': password
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    return fetch(`${config.apiUrl}/users`, requestOptions)
        .then(handleResponse)
        .then(data => {
            console.log(data);

            return data;
        });
}

function login(username, password) {

    let authString = `${username}:${password}`;
    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(authString));

    const requestOptions = {
        method: 'GET',
        headers: headers,
    };

    return fetch(`${config.apiUrl}/tokens`, requestOptions)
        .then(handleResponse)
        .then(data => {
            // login successful if there's a jwt token in the response
            if (data.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('token', JSON.stringify(data.token));
                localStorage.setItem('user', JSON.stringify(data.user));
            }

            return data;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {

            console.log(data);

            let error = (data && data.message) || response.statusText;

            if (response.status === 401) {
                error = 'Invalid credentials';
            }

            return Promise.reject(error);
        }

        return data;
    });
}
