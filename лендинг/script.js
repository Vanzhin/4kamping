Vue.component('search', {
        props: {
            isTelNumOk: {
                type: Boolean,
                required: true
            },
            isFormActive: {
                type: Boolean,
                required: true
            }


        },
    
        template: `<div class="callback-tel-wrap" >

            <div class="contact-info">
                <div class="close" @click="closeForm"><i class="far fa-times-circle"></i></div>
                <div  class="err-warning" v-bind:class="{hidden: !isTelNumOk}" v-bind:isTelNumOk='isTelNumOk'>Ошибка! Номер телефона должен состоять из цифр</div>
                <input type="tel" id="your-tel" class="callback-input" placeholder="Ваш сотовый" v-on:input="handleInput">
                <button class="sendit-btn header-sendit-btn" v-on:click="handleSearch">отправить</button>
            </div>
        </div>`,
        data() {
            return {
                inputValue: '',
            };
        },
        methods: {
            handleInput(e) {
                this.inputValue = e.target.value;
                this.changeIsNumOk;

            },
            handleSearch() {
                this.$emit('search', this.inputValue);
            },
            closeForm() {
                this.$emit('close-form', this.isFormActive);
            },
            changeIsNumOk() {
            this.$emit('change', this.inputValue);
        },
        }

        
    }),
    new Vue({
        el: '#app',
        data: {
            isFormActive: false,
            inputValue: '',
            regexpTel: /^(89|\+79)\d{9}$/,
            isTelNumOk: false,


        },
        methods: {

            formVisibilityChange() {
                this.isFormActive = !this.isFormActive;
            },
            handleInput(e) {
                this.inputValue = e.target.value;
                this.isValidTel();
            },

            isValidTel() {
                if (!this.regexpTel.test(this.inputValue)) {
                    console.log("поле ввода телефона необходимо заполнять в формате +7(000)000-0000");
                    this.isTelNumOk = true;
                    return false;
                } else {
                    this.isTelNumOk = false;
                    return true
                };
            },
            //            



            valueFromChild(data) {
                return this.inputValue = data;

            },
        }

    })
