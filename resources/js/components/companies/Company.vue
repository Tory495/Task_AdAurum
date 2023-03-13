<template>
    <div class="container mt-3">
        <ul class="list-unstyled">
            <li class="comment-li mb-5 d-flex justify-content-between">
                <div>
                    <h5 class="text-warning m-0">Название</h5>
                    <p class="text-white m-0">{{ company.name }}</p>
                    <div class="text-black text-white-50 m-2" v-for="comment in comments">
                        <p v-if="comment.user_id === userId && comment.company_id === company.id && comment.field === 1">
                            {{ new Date(comment.created_at).toLocaleString() }}
                            <span class="text-warning">{{ username }}: </span>
                            {{ comment.commentary }}</p>
                    </div>
                </div>
                <div>
                    <p @click.prevent="storeComment(company.id, 1)" class="text-white">Прокомментировать</p>
                </div>
            </li>
            <li class="comment-li mb-5 d-flex justify-content-between">
                <div>
                    <h5 class="text-warning m-0">ИНН</h5>
                    <p class="text-white m-0">{{ company.inn }}</p>
                    <div class="text-black text-white-50 m-2" v-for="comment in comments">
                        <p v-if="comment.user_id === userId && comment.company_id === company.id && comment.field === 2">
                            {{ new Date(comment.created_at).toLocaleString() }}
                            <span class="text-warning">{{ username }}: </span>
                            {{ comment.commentary }}</p>
                    </div>
                </div>
                <div>
                    <p @click.prevent="storeComment(company.id, 2)" class="text-white">Прокомментировать</p>
                </div>
            </li>
            <li class="comment-li mb-5 d-flex justify-content-between">
                <div>
                    <h5 class="text-warning m-0">Общая информация</h5>
                    <p class="text-white m-0">{{ company.info }}</p>
                    <div class="text-black text-white-50 m-2" v-for="comment in comments">
                        <p v-if="comment.user_id === userId && comment.company_id === company.id && comment.field === 3">
                            {{ new Date(comment.created_at).toLocaleString() }}
                            <span class="text-warning">{{ username }}: </span>
                            {{ comment.commentary }}</p>
                    </div>
                </div>
                <div>
                    <p @click.prevent="storeComment(company.id, 3)" class="text-white">Прокомментировать</p>
                </div>
            </li>
            <li class="comment-li mb-5 d-flex justify-content-between">
                <div>
                    <h5 class="text-warning m-0">Генеральный директор</h5>
                    <p class="text-white m-0">{{ company.ceo }}</p>
                    <div class="text-black text-white-50 m-2" v-for="comment in comments">
                        <p v-if="comment.user_id === userId && comment.company_id === company.id && comment.field === 4">
                            {{ new Date(comment.created_at).toLocaleString() }}
                            <span class="text-warning">{{ username }}: </span>
                            {{ comment.commentary }}</p>
                    </div>
                </div>
                <div>
                    <p @click.prevent="storeComment(company.id, 4)" class="text-white">Прокомментировать</p>
                </div>
            </li>
            <li class="comment-li mb-5 d-flex justify-content-between">
                <div>
                    <h5 class="text-warning m-0">Адрес</h5>
                    <p class="text-white m-0">{{ company.address }}</p>
                    <div class="text-black text-white-50 m-2" v-for="comment in comments">
                        <p v-if="comment.user_id === userId && comment.company_id === company.id && comment.field === 5">
                            {{ new Date(comment.created_at).toLocaleString() }}
                            <span class="text-warning">{{ username }}: </span>
                            {{ comment.commentary }}</p>
                    </div>
                </div>
                <div>
                    <p @click.prevent="storeComment(company.id, 5)" class="text-white">Прокомментировать</p>
                </div>
            </li>
            <li class="comment-li mb-5 d-flex justify-content-between">
                <div>
                    <h5 class="text-warning m-0">Телефон</h5>
                    <p class="text-white m-0">{{ company.phone }}</p>
                    <div class="text-black text-white-50 m-2" v-for="comment in comments">
                        <p v-if="comment.user_id === userId && comment.company_id === company.id && comment.field === 6">
                            {{ new Date(comment.created_at).toLocaleString() }}
                            <span class="text-warning">{{ username }}: </span>
                            {{ comment.commentary }}</p>
                    </div>
                </div>
                <div>
                    <p @click.prevent="storeComment(company.id, 6)" class="text-white">Прокомментировать</p>
                </div>
            </li>
            <li class="comment-li mb-5 d-flex justify-content-between">
                <div>
                    <div class="text-black text-white-50 m-2" v-for="comment in comments">
                        <p v-if="comment.user_id === userId && comment.company_id === company.id && comment.field === 7">
                            {{ new Date(comment.created_at).toLocaleString() }}
                            <span class="text-warning">{{ username }}: </span>
                            {{ comment.commentary }}</p>
                    </div>
                </div>
                <div>
                    <p @click.prevent="storeComment(company.id, 7)" class="text-white">Прокомментировать компанию</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import api from "@/api";

export default {
    props: [
        'companyId'
    ],
    name: "Company",
    data() {
        return {
            company: [],
            erorred: false,
            username: null,
            userId: null,
            comments: [],
        }
    },
    mounted() {
        this.me()

        axios.get('/api/companies/' + this.companyId)
            .then(response => {
                this.company = response.data.data
            })
            .catch(error => {
                console.log(error)
                this.errored = true // todo errors show
            })

        if (localStorage.getItem('access_token')) {
            this.getComments()
        }
    },
    methods: {
        storeComment(companyId, field) {
            let comm = prompt('Напишите комментарий: ')
            if (comm) {
                api.post('/api/comments', {
                    commentary: comm,
                    field: field,
                    user_id: this.userId,
                    company_id: companyId,
                    created_at: new Date()
                })
                    .then(response => {
                        this.getComments()
                    })
            }
        },

        getComments() {
            axios.get('/api/comments/')
                .then(response => {
                    this.comments = response.data.data
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
        },

        me() {
            api.post('/api/auth/me')
                .then(response => {
                    this.username = response.data.username
                    this.userId = response.data.id
                })
        }
    }
}
</script>

<style scoped>

</style>
