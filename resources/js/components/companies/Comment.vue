<template>

</template>

<script>
export default {
    name: "Comment",
    props: {
        visible: Boolean,
        variant: String
    },
    data() {
        return {
            OpenCloseValue: this.visible
        }
    },
    methods: {
        OpenClose() {
            this.OpenCloseValue = !this.OpenCloseValue
        }
    },
    watch: {
        visible: function(newValue, oldValue) {
            this.OpenCloseValue = newValue
        }
    }
}
</script>

<style scoped>

</style>
