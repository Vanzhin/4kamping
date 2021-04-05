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
                <div  class="warning">
<span class="ok" v-if="correctInput">Ура! Все верно.</span></div>
<input id="your-tel" class="callback-input" placeholder="Ваш сотовый"
data-mask="+7 (000) 000-00-00"
         pattern="\\+7 ([0-9]{3}\) [0-9]{3}[\-][0-9]{2}[\-][0-9]{2}"
         type="tel" required title="(000) 000-00-00" v-on:input="maskInput">
                <button  
v-bind:class="['sendit-btn', { disabled: !correctInput}]"
:disabled="!correctInput"
v-on:click="" type="submit"
>отправить</button>

            </form>
        </div>`,
        data() {
            return {
                correctInput: false,
            };
        },
        methods: {
           
            closeForm() {
                this.$emit('close-form', this.isFormActive);
            },
            maskInput(e) {
                var input = e.srcElement;
                var mask = input.dataset.mask;
                var value = input.value;
                var literalPattern = /[0\*]/;
                var numberPattern = /[0-9]/;
                var newValue = "";
                try {
                    var maskLength = mask.length;
                    var valueIndex = 0;
                    var maskIndex = 0;

                    for (; maskIndex < maskLength;) {
                        if (maskIndex >= value.length) break;

                        if (mask[maskIndex] === "0" && value[valueIndex].match(numberPattern) === null) break;

                        // Found a literal
                        while (mask[maskIndex].match(literalPattern) === null) {
                            if (value[valueIndex] === mask[maskIndex]) break;
                            newValue += mask[maskIndex++];
                        }
                        newValue += value[valueIndex++];



                        maskIndex++;
                    }

                    input.value = newValue;
                    if(newValue.length===maskLength){
                        const regexp = /\d/g;
                        console.log(newValue.match(regexp).join('')); 
                        this.correctInput=true;
                        
                    }



                } catch (e) {
                    console.log(e);
                }
            }
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
