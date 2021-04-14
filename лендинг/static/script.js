"use strict"
const API_ROOT = 'http://localhost:3000';
const request = (path = '', method = 'GET', body) => {
    return new Promise((resolve, reject) => {
        let xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log(xhr.responseText);
                    console.log(JSON.parse(xhr.responseText))
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(xhr.responseText);
                }
            }
        }

        xhr.open(method, `${API_ROOT}/${path}`);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(body);
    });
}




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
        props: ['regexpTel', 'orderOkMessage', 'orderErrMessage', 'orderFormClose', 'loading', ],

        template: `<div class="callback-tel-wrap" >
        <div class="close" @click="closeForm"><i class="far fa-times-circle"></i></div>
        <div class="loading" v-bind:class="[{ invisible: !loading}]"><i class="fas fa-caravan"></i><span>Загрузка</span></div>

        <div class="server-warning">
        <div class="server-warning-ok" v-bind:class= "[{ invisible: !orderOkMessage}]">Благодарю Вас. Заявка принята</div>
        <div class="server-warning-err"
        v-bind:class= "[{ invisible: !orderErrMessage}]">Упс, что-то пошло не так. 
        Пожалуйста, попробуйте позднее или свяжитесь с нами по телефону <br>8-999-777-22-22</div></div>

            <form action="#" class="contact-info"
            v-bind:class="[{ invisible: orderFormClose}]" 
            >
                <div  class="warning">
<span class="ok" v-bind:class= "[{ invisible: !correctInput}]">Ура! Все верно.</span>
<span class="ok" v-bind:class= "[{ invisible: correctInput}]">Ваш телефон</span></div>

<div class="callback-input-wrap"><input id="your-tel" class="callback-input" placeholder="+7 (___) ___-__-__"
data-mask="+7 (000) 000-00-00"
         pattern="\\+7 ([0-9]{3}\) [0-9]{3}[\-][0-9]{2}[\-][0-9]{2}"
         type="tel" required title="(000) 000-00-00" v-on:input="maskInput"></div>
                <button  
v-bind:class="['sendit-btn', { disabled: !correctInput}]"
:disabled=!correctInput
v-on:click="dataTransfer" type="button"
>отправить</button>

            </form>
        </div>`,
        data() {
            return {
                correctInput: false,
                phone: '',

            };
        },
        methods: {

            closeForm() {
                this.$emit('close-form', this.isFormActive);
            },
            async maskInput(e) {
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
                    if (newValue.length === maskLength) {
                        const regexp = /\d/g;
                        this.phone = parseInt(newValue.match(regexp).join(''));
                        console.log(this.phone);
                        this.correctInput = true;
                    } else this.correctInput = false;



                } catch (e) {
                    console.log(e);
                }
            },
            dataTransfer() {
                this.$emit('phone-number', this.phone);
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
            telNum: '',
            orderFormClose: false,
            orderOkMessage: false,
            orderErrMessage: false,
            loading: false,



        },
        methods: {
            checkedChange() { //при нажатии на ссылку в мобильном меню - оно сворачивается
                const burger = document.querySelectorAll(".burger");
                console.log(burger);
                for (let i = 0; i < burger.length; i++) {
                    burger[i].checked = false;
                }

            },

            formVisibilityChange() {
                this.isFormActive = !this.isFormActive;

                //перевожу в начальное положение, чтобы все было как при первом нажатии на кнопку
                this.orderOkMessage = false;
                this.orderErrMessage = false;
                this.orderFormClose = false;

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
            userPhoneNum(data) {
                this.telNum = data;
                this.addOrderInfo(this.telNum);


            },
            changerLoad() {
                this.loading = !this.loading;

                this.orderFormClose = !this.orderFormClose;
            },

            async addOrderInfo(item) {
                await this.changerLoad();


                let contactLog = {
                    tel: '',
                    date: '',
                };
                contactLog.tel = item;
                let d1 = new Date();
                d1.setHours(d1.getHours() + 5)
                contactLog.date = d1;

                let response = await fetch(`${API_ROOT}/order`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },


                    body: JSON.stringify(contactLog)
                });

                let result = await response.json();
                this.loading = !this.loading;
                this.clearInput();
                if (result.result === 1) {
                    this.orderOkMessage = !this.orderOkMessage;
                } else {
                    this.orderErrMessage = !this.orderErrMessage;
                }


            },
            clearInput() {
                document.getElementById("your-tel").value = "";
            },
            //            



            valueFromChild(data) {
                return this.inputValue = data;

            },
        }

    })
// smoth transition href
$(function () {
    $('a[href*=#]').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname) {
            var $target = $(this.hash);
            $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
            if ($target.length) {
                var targetOffset = $target.offset().top;
                $('html,body').animate({
                    scrollTop: targetOffset
                }, 500); //скорость прокрутки
                return false;
            }
        }
    });
});