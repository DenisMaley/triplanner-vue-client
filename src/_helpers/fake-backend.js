export function configureFakeBackend() {
    let user = {
        _links: {
            avatar: "https://www.gravatar.com/avatar/3b36b104d860cb7ef559e685d6cb3701?d=identicon&s=128",
            followed: "/api/users/1/followed",
            followers: "/api/users/1/followers",
            self: "/api/users/1"
        },
        about_me: "I am Denis and I am testing",
        followed_count: 0,
        follower_count: 1,
        id: 1,
        last_seen: "2019-10-01T06:40:20.507757Z",
        post_count: 14,
        username: "test",
        authorization: "Basic dGVzdDp0ZXN0", // Authorization for username:password === test:test
    };

    let users = [user];

    let posts = {
        _links: {
            next: null,
            prev: null,
            self: "/api/posts?page=1&per_page=10"
        },
        _meta: {
            page: 1,
            per_page: 10,
            total_items: 18,
            total_pages: 2
        },
        items: [
            {
                _links: {
                    author: "/api/users/1",
                    self: "/api/posts/18"
                },
                author: {
                    _links: {
                        avatar: "https://www.gravatar.com/avatar/3b36b104d860cb7ef559e685d6cb3701?d=identicon&s=128",
                        followed: "/api/users/1/followed",
                        followers: "/api/users/1/followers",
                        self: "/api/users/1"
                    },
                    about_me: "I am Denis and I am testing",
                    followed_count: 0,
                    follower_count: 1,
                    id: 1,
                    last_seen: "2019-10-01T06:40:20.507757Z",
                    post_count: 14,
                    username: "denis"
                },
                body: "Dit is mijn derde post met API. Bewerkt.",
                id: 18,
                language: "nl",
                timestamp: "Thu, 12 Sep 2019 06:23:12 GMT",
                user_id: 1
            }
        ]
    };

    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {

                // authenticate
                if (url.endsWith('/tokens') && opts.method === 'GET') {
                    // find if any user matches login credentials
                    let filteredUsers = users.filter(user => {
                        return user.authorization === opts.headers.get('Authorization');
                    });

                    if (filteredUsers.length) {
                        // if login details are valid return user details and fake jwt token
                        let user = filteredUsers[0];
                        let responseJson = {
                            token: 'fake-jwt-token',
                            user: user
                        };

                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });
                    } else {
                        // else return error
                        reject('Username or password is incorrect');
                    }

                    return;
                }

                // get posts
                if (url.endsWith('/posts?page=1') && opts.method === 'GET') {
                    // check for fake auth token in header and return posts if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(posts)) });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

            }, 500);
        });
    }
}