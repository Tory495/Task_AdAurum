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
            <div class="form-outline mb-4">
                <input v-model="password_confirmation" type="password" id="password_confirmation" class="form-control"/>
                <label class="text-white form-label" for="password_confirmation">Подтверждение пароля</label>
            </div>
            <button @click.prevent="store" type="submit" class="btn btn-warning btn-block mb-4">Войти</button>
        </form>
    </div>
</template>

<script>

export default {
    name: "Register",

    data() {
        return {
            username: null,
            password: null,
            password_confirmation: null,
        }
    },

    methods: {
        store() {
            axios.post('/api/users', {username: this.username, password: this.password, password_confirmation: this.password_confirmation})
                .then(response => {
                    localStorage.setItem('access_token', response.data.access_token)
                    this.$router.push({name: 'companies'})
                })
        }
    }
}
</script>

<style scoped>

</style>
