"use strict"
const API_ROOT = 'http://localhost:3000';

Vue.component('prices', {

    props: ['pricelist'],
    template: `
    <section name="prices" class="prices">
            <div class="prices-wrap wrap">
                <h2 class="prices-h1">ЦЕНЫ</h2>
                <div class="prices-item" v-for="item in pricelist">
                    <div class="price-category"><p>{{item.category}}</p></div>
                    <div class="price-value"><p>{{item.value}}&nbsp<i class="fas fa-ruble-sign"></i></p></div>
                </div>

            </div>
        </section>`
})

Vue.component('v-header', {
    props: ['checkedChange', 'formVisibilityChange', 'menuLinks'],

    template: `
    <header name="header" class="header">
            <div class="header-wrap wrap">
                <v-header-menu
                v-bind:checked-change='checkedChange'
                v-bind:form-visibility-change="formVisibilityChange"
                v-bind:menu-links='menuLinks'
                v-on:order-click='formVisibilityChange'></v-header-menu>
                <div class="header-h1-wrap">
                    <h1 class="header-h1">Отдых как искусство</h1>
                    <h2 class="header-h2">Слоган 2</h2>
                    <button class="sendit-btn header-sendit-btn" v-on:click="formVisibilityChange">арендовать</button>
                </div>
            </div>
        </header>`
})

Vue.component('v-header-menu', {
    props: ['checkedChange', 'formVisibilityChange', 'menuLinks'],

    template: `<nav class="nav">
    <a href="#" class="logo">
        <h2>4Kamping</h2>
    </a>
    <section class="nav-menu">
        <input type="checkbox" id="burger" class="burger">
        <label for="burger" class="burger-label">
            <span></span>
            <span></span>
            <span></span>
        </label>
        <div class="nav-menu-drop">
        <h2>4Kamping</h2>
            <div class="column-menu">
               <ul class="drop-down">
                <li class="drop-down-li" v-for="item in menuLinks"><a :href="item.link" class="drop-down-link" v-on:click="checkedChange">{{item.name}}</a></li>
            </ul> 
            </div>
            <div class="column-menu">

            <p>ОСТАЛИСЬ ВОПРОСЫ?</p>
            <p>Закажите звонок, и менеджер Вам всё расскажет и объяснит</p>
            <div class="nav-menu-form">
            <button class="sendit-btn header-sendit-btn" v-on:click="$emit('order-click')">заказать звонок</button>

            </div>
            <div class="social-media">
                <a href="#"><i class="fab fa-vk"></i></a>
                <a href="https://instagram.com/4kamping"><i class="fab fa-instagram"></i></a>
                <a href="#"><i class="fab fa-facebook-f"></i></a>

            </div>

        </div>
</div>
    </section>
</nav>
    `
})

Vue.component('v-footer', {
    props: ['checkedChange', 'formVisibilityChange', 'menuLinks'],

    template: `
    <footer class="footer">
            <div class="faq-wrap wrap">
                <div class="faq-h2-wrap">
                    <h2 class="faq-h2">ОСТАЛИСЬ ВОПРОСЫ?</h2>
                    <div class="faq-form-wrap"><p>Закажите звонок, и менеджер Вам всё расскажет и объяснит</p>

                    <div class="nav-menu-form">
                    <button class="sendit-btn header-sendit-btn" v-on:click="formVisibilityChange">заказать звонок</button>
    
                    </div></div>
                    
                </div>
                <v-footer-menu
                v-bind:checked-change='checkedChange'
                v-bind:form-visibility-change="formVisibilityChange"
                v-bind:menu-links='menuLinks'
                v-on:order-click='formVisibilityChange'></v-footer-menu>
                <div class="copy">
                    <p class="copy-p">&copy; 4Kamping, {{new Date().getFullYear()}}</p>
                    
                    <p class="design-p"><a href="mailto:vanzhin@outlook.com">сайт создан: V</a>
                    </p>
                </div>
            </div>
        </footer>`
})

Vue.component('v-footer-menu', {
    props: ['checkedChange', 'menuLinks'],

    template: `<nav class="nav nav-footer">
    <a href="#" class="logo"><h2>4Kamping</h2></a>
    <section class="nav-menu">
        <input type="checkbox" id="burger-footer" class="burger">
        <label for="burger-footer" class="burger-label-footer">
            <span></span>
            <span></span>
            <span></span>
        </label>
        <div class="nav-menu-drop-footer">
            <h2>4Kamping</h2>
            <div class="column-menu">
                <ul class="drop-down">
                <li class="drop-down-li" v-for="item in menuLinks"><a :href="item.link" class="drop-down-link" v-on:click="checkedChange">{{item.name}}</a></li>

                </ul>  
            </div>
            <div class="column-menu">
                <p>ОСТАЛИСЬ ВОПРОСЫ?</p>
                <p>Закажите звонок, и менеджер Вам всё расскажет и объяснит</p>

                <div class="nav-menu-form">
                <button class="sendit-btn header-sendit-btn" v-on:click="$emit('order-click')">заказать звонок</button>

                </div>
                <div class="social-media">
                    <a href="#"><i class="fab fa-vk"></i></a>
                    <a href="https://instagram.com/4kamping"><i class="fab fa-instagram"></i></a>
                    <a href="#"><i class="fab fa-facebook-f"></i></a>

                </div>
            </div>
            

        </div>

    </section>
</nav>
    `
})

Vue.component('picture-list', {
        props: ['pictures'],
        template: `
    <div class="column">

    <picture class="pictures-picture" v-for="item in pictures" >
    <source media="(min-width:640px) and (max-width:1199px)" :srcset="item.srcTablet">
    <source media="(min-width:1200px)" :srcset="item.src">
    <img :src="item.srcMobile" alt="picture">
</picture>
    </div>`,
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

                    while (maskIndex < maskLength) {
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
            pricelist: [{
                category: "1 сутки",
                value: 100
            }, {
                category: "2 сутки",
                value: 200
            }, {
                category: "3 сутки",
                value: 300
            }, {
                category: "4 сутки",
                value: 300
            }, ],
            menuLinks: [{
                name: "О нас",
                link: "#whoweare"
            }, {
                name: "Преимущества",
                link: "#our-advantage"
            }, {
                name: "Отзывы",
                link: "#feedback"
            }, {
                name: "Цены",
                link: "#prices"
            }, {
                name: "Фото",
                link: "#gallery"
            }, {
                name: "Вопросы",
                link: "#doubt"
            }, {
                name: "Контакты",
                link: "#contact"
            }],

            pictures: [{
                    main: false,
                    src: 'img/IMG_1140.JPG',
                    srcMobile: 'img/IMG_1140.JPG',
                    srcTablet: 'img/IMG_1140.JPG'
                },
                {
                    main: false,
                    src: 'img/IMG_0613.JPG',
                    srcMobile: 'img/IMG_0613.JPG',
                    srcTablet: 'img/IMG_0613.JPG'
                },
                {
                    main: false,
                    src: 'img/IMG_0614.JPG',
                    srcMobile: 'img/IMG_0614.JPG',
                    srcTablet: 'img/IMG_0614.JPG'
                },
                {
                    main: false,
                    src: 'img/IMG_0619.JPG',
                    srcMobile: 'img/IMG_0619.JPG',
                    srcTablet: 'img/IMG_0619.JPG'
                },
                {
                    main: false,
                    src: 'img/IMG_0621.JPG',
                    srcMobile: 'img/IMG_0621.JPG',
                    srcTablet: 'img/IMG_0621.JPG'
                },
                {
                    main: false,
                    src: 'img/IMG_1142.JPG',
                    srcMobile: 'img/IMG_1142.JPG',
                    srcTablet: 'img/IMG_1142.JPG'
                },
                {
                    main: false,
                    src: 'img/IMG_1144.JPG',
                    srcMobile: 'img/IMG_1144.JPG',
                    srcTablet: 'img/IMG_1144.JPG'
                },
                {
                    main: false,
                    src: 'img/IMG_1140.JPG',
                    srcMobile: 'img/IMG_1140.JPG',
                    srcTablet: 'img/IMG_1140.JPG'
                },
                {
                    main: false,
                    src: 'img/IMG_0613.JPG',
                    srcMobile: 'img/IMG_0613.JPG',
                    srcTablet: 'img/IMG_0613.JPG'
                },
                {
                    main: false,
                    src: 'img/IMG_0614.JPG',
                    srcMobile: 'img/IMG_0614.JPG',
                    srcTablet: 'img/IMG_0614.JPG'
                },
                {
                    main: false,
                    src: 'img/IMG_0619.JPG',
                    srcMobile: 'img/IMG_0619.JPG',
                    srcTablet: 'img/IMG_0619.JPG'
                },
                {
                    main: false,
                    src: 'img/IMG_0621.JPG',
                    srcMobile: 'img/IMG_0621.JPG',
                    srcTablet: 'img/IMG_0621.JPG'
                },
                {
                    main: false,
                    src: 'img/IMG_1142.JPG',
                    srcMobile: 'img/IMG_1142.JPG',
                    srcTablet: 'img/IMG_1142.JPG'
                },
                {
                    main: false,
                    src: 'img/IMG_1144.JPG',
                    srcMobile: 'img/IMG_1144.JPG',
                    srcTablet: 'img/IMG_1144.JPG'
                },
                {
                    main: false,
                    src: 'img/IMG_1140.JPG',
                    srcMobile: 'img/IMG_1140.JPG',
                    srcTablet: 'img/IMG_1140.JPG'
                },
                {
                    main: false,
                    src: 'img/IMG_0613.JPG',
                    srcMobile: 'img/IMG_0613.JPG',
                    srcTablet: 'img/IMG_0613.JPG'
                },
                {
                    main: false,
                    src: 'img/IMG_0614.JPG',
                    srcMobile: 'img/IMG_0614.JPG',
                    srcTablet: 'img/IMG_0614.JPG'
                },
                {
                    main: false,
                    src: 'img/IMG_0619.JPG',
                    srcMobile: 'img/IMG_0619.JPG',
                    srcTablet: 'img/IMG_0619.JPG'
                },
                {
                    main: false,
                    src: 'img/IMG_0621.JPG',
                    srcMobile: 'img/IMG_0621.JPG',
                    srcTablet: 'img/IMG_0621.JPG'
                },
                {
                    main: false,
                    src: 'img/IMG_1142.JPG',
                    srcMobile: 'img/IMG_1142.JPG',
                    srcTablet: 'img/IMG_1142.JPG'
                },
                {
                    main: false,
                    src: 'img/IMG_1144.JPG',
                    srcMobile: 'img/IMG_1144.JPG',
                    srcTablet: 'img/IMG_1144.JPG'
                },
            ]



        },
        computed: {

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
                console.log("form");
                this.isFormActive = !this.isFormActive;

                //перевожу в начальное положение, чтобы все было как при первом нажатии на кнопку
                this.orderOkMessage = false;
                this.orderErrMessage = false;
                this.orderFormClose = false;
                this.loading = false;

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

    });

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