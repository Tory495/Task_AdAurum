/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import './bootstrap';
import {createApp} from 'vue';
import {createRouter, createWebHistory} from 'vue-router';
import ExampleComponent from '@/components/ExampleComponent.vue';
import TestComponent from "@/components/TestComponent.vue";
import App from "@/components/App.vue";
import Companies from "@/components/companies/Companies.vue";
import Company from "@/components/companies/Company.vue";
import "bootstrap/dist/css/bootstrap.css";
import Login from "@/components/user/Login.vue";
import Register from "@/components/user/Register.vue";
import StoreCompany from "@/components/companies/StoreCompany.vue";

/**
 * Next, we will create a fresh Vue application instance. You may then begin
 * registering components with the application instance, so they are ready
 * to use in your application's views. An example is included for you.
 */

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', name: 'test', component: TestComponent},
        {path: '/example', name: 'example', component: ExampleComponent},
        {path: '/companies/', name: 'companies', component: Companies},
        {path: '/companies/:companyId', name: 'company', component: Company, props: true},
        {path: '/login', name: 'login', component: Login},
        {path: '/register', name: 'register', component: Register},
        {path: '/companies/new', name: 'newCompany', component: StoreCompany},
        // {path: '/*', name: '404', component: TestComponent},
    ],
});
//const app = createApp({}).use(router);


//app.component('App', App);

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// Object.entries(import.meta.glob('./**/*.vue', { eager: true })).forEach(([path, definition]) => {
//     app.component(path.split('/').pop().replace(/\.\w+$/, ''), definition.default);
// });

/**
 * Finally, we will attach the application instance to a HTML element with
 * an "id" attribute of "app". This element is included with the "auth"
 * scaffolding. Otherwise, you will need to add an element yourself.
 */
router.beforeEach((to, from, next) => {
    const accessToken = localStorage.getItem('access_token')

    // if (to.name !== 'login') {
    //     if (!accessToken) {
    //         return next({
    //             name: 'login'
    //         })
    //     }
    // }
    if ((to.name === 'login' || to.name === 'register') && accessToken) {
        return next({
            name: 'test'
        })

    }


    next()
})

createApp(App).use(router).mount('#app');

