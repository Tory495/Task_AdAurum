<template>
    <div class="container m-auto mt-5">
        <form class="my-form">
            <div class="form-outline mb-4">
                <input v-model="username" type="text" id="username" class="form-control"/>
                <label class="text-white form-label" for="username">Имя пользователя</label>
            </div>
            <div class="form-outline mb-4">
                <input v-model="password" type="password" id="password" class="form-control"/>
                <label class="text-white form-label" for="password">Пароль</label>
            </div>
            <button @click.prevent="login" type="button" class="btn btn-warning btn-block mb-4">Войти</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            username: null,
            password: null,
        }
    },

    methods: {
        login() {
            axios.post('/api/auth/login', {username: this.username, password: this.password})
                .then(response => {
                    localStorage.access_token = response.data.access_token;
                })
                .then(() => this.$router.push(this.$route.query.redirect || '/companies'))
                .catch(error => {
                    console.log(error)
                })
        }
    }
}
</script>

<style scoped>

</style>
