Vue.component('callback-form', {
    template: `<div class="form-to-order" @click='change-v'><h2>Нет данных</h2>
	<img src="https://autostol63.ru/image/catalog/podbor-tovara1.jpg" style="width: 100px;" alt="no data">
    </div>`,
    metods: {
        changeV() {
            this.$emit('qwqw');
        }
    }
});

new Vue({
    el: '#app',
    data: {
        isFormActive: true
    },
    methods: {
        formVisibilityChange() {
            this.isFormActive = !this.isFormActive;
        }
    }

})