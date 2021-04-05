Vue.component('order', {
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

            <from class="contact-info">
                <div class="close" @click="closeForm"><i class="far fa-times-circle"></i></div>
                <div  class="err-warning" v-bind:class="{hidden: !isTelNumOk}" v-bind:isTelNumOk='isTelNumOk'>Ошибка! Номер телефона должен состоять из 11 цифр</div>
                <input type="tel" id="your-tel" class="callback-input" placeholder="Ваш сотовый" v-on:input="handleInput">
                <button class="sendit-btn header-sendit-btn" v-on:click="handleSearch" type="submit">отправить</button>
            </form>
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
    Vue.component('new-order', {
        props: ['regexpTel'],

        template: `<div class="callback-tel-wrap" >

            <from action="#" class="contact-info">
                <div class="close" @click="closeForm"><i class="far fa-times-circle"></i></div>
                <div  class="warning"><span class="err" v-if="!isNumberCorrect()">Номер должен состоять из 11 цифр</span>
<span class="ok" v-if="isNumberCorrect()">Ура! Все верно.</span></div>
                <input type="tel" id="your-tel" class="callback-input" placeholder="Ваш сотовый" v-on:input="handleInput">
                <button  
v-bind:class="['sendit-btn', { disabled: !isNumberCorrect()}]"
:disabled="!isNumberCorrect()"
v-on:click="" type="submit"
>отправить</button>

            </form>
        </div>`,
        data() {
            return {
                inputValue: '',
            };
        },
        methods: {
            handleInput(e) {
                this.inputValue = e.target.value;
                console.log(this.inputValue);
                this.isNumberCorrect();

            },
            isNumberCorrect() {
                console.log(this.regexpTel);
                if (this.regexpTel.test(this.inputValue)) {
                    console.log("все верно");
                    return true;
                } else {
                    console.log("не верно");

                    return false
                };
            },
            closeForm() {
                this.$emit('close-form', this.isFormActive);
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
