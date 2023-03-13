<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <router-link class="navbar-brand text-warning" :to="{name: 'test'}">TO<span class="text-bg-warning">GO</span>LDEN</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul class="navbar-nav mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link :key="$route.fullPath" class="nav-link" :to="{name: 'companies'}">Компании</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :key="$route.fullPath" v-if="!accessToken" class="nav-link" :to="{name: 'login'}">Войти</router-link>
                        <a type="button" @click.prevent="logout" v-if="accessToken" class="nav-link">Выйти</a>
                    </li>
                    <li class="nav-item">
                        <router-link :key="$route.fullPath" v-if="!accessToken" class="nav-link" :to="{name: 'register'}">Регистрация</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <router-view></router-view>
</template>

<script>
import api from "@/api";

export default {
    name: "App",
    data() {
        return {
            accessToken: null
        }
    },

    mounted() {
        this.getAccessToken()
    },


    updated() {
        this.getAccessToken()
    },

    methods: {
        getAccessToken() {
            this.accessToken = localStorage.getItem('access_token')
        },
        logout() {
            api.post('/api/auth/logout')
                .then( response => {
                    localStorage.removeItem('access_token');
                    this.$router.push({ name: 'login' })
                })
        }
    }

}
</script>

<style scoped>

</style>
