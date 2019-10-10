<template>
    <div>
        <h1>Hi {{user.username}}!</h1>
        <p>You're logged in with Vue + Vuex & JWT!!</p>
        <h3>Posts from secure api end point:</h3>
        <em v-if="posts.loading">Loading posts...</em>
        <span v-if="posts.error" class="text-danger">ERROR: {{posts.error}}</span>
        <ul v-if="posts.items">
            <li v-for="post in posts.items" :key="post.id">
                {{post.body}}
            </li>
        </ul>
        <p>
            <router-link to="/login">Logout</router-link>
        </p>
    </div>
</template>

<script>
    export default {
        computed: {
            user() {
                console.log(this.$store.state.authentication);
                return this.$store.state.authentication.user;
            },
            posts() {
                return this.$store.state.posts.all;
            }
        },
        created() {
            this.$store.dispatch('posts/getPosts', {page: 1});
        }
    };
</script>