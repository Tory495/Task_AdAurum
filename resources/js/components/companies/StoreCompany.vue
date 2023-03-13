<template>
    <div class="container m-auto mt-5">
        <form class="my-form">
            <div class="form-outline mb-4">
                <input v-model="name" type="text" id="name" class="form-control"/>
                <label class="text-white form-label" for="name">Название</label>
            </div>
            <div class="form-outline mb-4">
                <input v-model="inn" type="text" id="inn" class="form-control"/>
                <label class="text-white form-label" for="inn">ИНН</label>
            </div>
            <div class="form-outline mb-4">
                <input v-model="info" type="text" id="info" class="form-control"/>
                <label class="text-white form-label" for="info">Информация</label>
            </div>
            <div class="form-outline mb-4">
                <input v-model="ceo" type="text" id="ceo" class="form-control"/>
                <label class="text-white form-label" for="ceo">Генеральный директор</label>
            </div>
            <div class="form-outline mb-4">
                <input v-model="address" type="text" id="address" class="form-control"/>
                <label class="text-white form-label" for="address">Адрес</label>
            </div>
            <div class="form-outline mb-4">
                <input v-model="phone" type="text" id="phone" class="form-control"/>
                <label class="text-white form-label" for="phone">Телефон</label>
            </div>
            <button @click.prevent="store" type="submit" class="btn btn-primary btn-block mb-4">Создать</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "StoreCompany",
    data() {
        return {
            name: null,
            inn: null,
            info: null,
            ceo: null,
            address: null,
            phone: null,
        }
    },
    methods: {
        store() {
            axios.post('/api/companies', {name: this.name, inn: this.inn, info: this.info, ceo: this.ceo, address: this.address, phone: this.phone})
                .then(response => {
                    this.$router.push({name: 'companies'})
                })
        }
    }
}
</script>

<style scoped>

</style>
