<template>
    <div class="container mt-3">
        <div class="row row-cols-1 row-cols-md-3 g-4">
            <div class="col d-flex justify-content-between align-items-start" v-for="company in companies">
                <router-link :to="{name: 'company', params: {companyId: company.id}}" class="text-decoration-none">
                    <h5 class="card-title text-warning mb-2">{{ company.name }}</h5>
                    <p class="card-text text-white m-0">Адрес: {{ company.address }}</p>
                    <p class="card-text text-white m-0">Телефон: {{ company.phone }}</p>
                    <p class="card-text text-white m-0">Генеральный директор: {{ company.ceo }}</p>
                </router-link>
                <button v-if="accessToken" @click.prevent="deleteCompany(company.id)" type="button" class="btn btn-danger">X</button>
            </div>

        </div>
        <router-link v-if="accessToken" :to="{name: 'newCompany'}" type="button" class="btn btn-warning mt-5">Новая компания</router-link>
    </div>

</template>

<script>
import api from "@/api";
export default {
    name: "Companies",
    data() {
        return {
            companies: [],
            erorred: false,
            accessToken: null,
        }
    },
    mounted() {
        this.getAccessToken()
        this.getCompanies()
    },
    methods: {
        getCompanies() {
            api.get('/api/companies')
                .then(response => {
                    this.companies = response.data.data
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true // todo errors show
                })
        },

        getAccessToken() {
            this.accessToken = localStorage.getItem('access_token')
        },

        deleteCompany(id) {
            if (confirm('Вы действительно хотите удалить компанию?')) {
                axios.post('/api/companies/' + id, {
                    _method: 'DELETE'
                }).then(response => {
                    this.companies = []
                    this.getCompanies()
                }).catch(error => {
                    console.log(error)
                    this.errored = true
                });
            }
        }
    }
}
</script>

<style scoped>

</style>
