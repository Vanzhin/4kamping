"use strict"
const API_ROOT = 'http://localhost:3000';

Vue.component('feedback-form', {
    props: ['sending', 'sent'],
    data() {
        return {
            name: "",
            email: "",
            message: "",
            checkedPeriod: '',
            file: null,
            errors: {},
            agree: "",
            popUpErrors: {
                name: false,
                email: false,
                period: false,
                message: false,
                agree: false
            },
        }
    },
    template: `
    <form id="formElem" :class="['feedback-write-form', { _sending: sending, _sent: sent}]" @submit.prevent="onSubmit" enctype="multipart/form-data" method="POST">
    <div class="feedback-write-form-item">
    <p v-bind:class="['errors', { invisible: !popUpErrors.name}]">{{errors.name}}</p>
        <label for="userName" class="form-label">Имя<span>*</span>:</label><input v-on:click.prevent="popUpErrors.name=false" v-model="name" id="userName" name="userName" type="text" :class="['form-input', { _error: popUpErrors.name}]">
    </div>
    <div class="feedback-write-form-item">
    <p :class="['errors', { invisible: !popUpErrors.email}]">{{errors.email}}</p>
        <label for="userEmail" class="form-label">Почта<span>*</span>: </label><input @click.prevent="popUpErrors.email=false" v-model.lazy="email" id="userEmail" name="userEmail" type="text" :class="['form-input', { _error: popUpErrors.email}]">
    </div>
    <div class="checkbox">
    <p :class="['errors', { invisible: !popUpErrors.period}]">{{errors.checkedPeriod}}</p>
        <p>Срок аренды:</p>
        <input v-model="checkedPeriod"
         type="radio" name="userPeriod" id="userPeriod1" class="checkbox-input" value="менее 3 суток">
        <label @click="popUpErrors.period=false" for="userPeriod1" class="form-label"><span>менее 3 суток</span></label>
        <input  v-model="checkedPeriod" type="radio" name="userPeriod" id="userPeriod2" class="checkbox-input" value="от 3 до 14 суток">
        <label @click="popUpErrors.period=false" for="userPeriod2" class="form-label"><span>от 3 до 14 суток</span></label>
        <input  v-model="checkedPeriod"  type="radio" name="userPeriod" id="userPeriod3" class="checkbox-input" value="более 14 суток">
        <label  @click="popUpErrors.period=false" for="userPeriod3" class="form-label"><span>более 14 суток</span></label>
    </div>
    <div class="feedback-write-form-item">
    <p :class="['errors', { invisible: !popUpErrors.message}]">{{errors.message}}</p>

        <label for="userMessage" class="form-label">Сообщение<span>*</span>: </label><textarea :class="['form-input', { _error: popUpErrors.message}]" @click="popUpErrors.message=false" v-model.lazy="message" id="userMessage" name="userMessage" class="form-input"></textarea>
    </div>
    <div class="feedback-write-form-item">
        <div class="file-item">
            <p>Прикрепить фото: (не более 2 МБ)</p>
            <input ref="file" v-on:change="handleFileUpload" accept="image/*" size ="1000" type="file" name="filedata" id="userFile" class="form-input-file">
            <div class="file-button">Выбрать</div><span class="file-name" v-if="file">Выбран: {{file.name}}</span><span class="file-name" v-if="!file">Фото не прикреплено</span>

        </div>
        
    </div>
    <div class="feedback-write-form-item">
        
        <div class="checkbox">
        <p :class="['errors', { invisible: !popUpErrors.agree}]">{{errors.agree}}</p>

            <input value="agree"  v-model="agree" checked type="checkbox" name="agreement" id="userAgreement" class="checkbox-input">
            <label for="userAgreement" class="form-label"><span>согласен на обработку персональных данных</span></label>

        </div>
    </div>
    <div class="feedback-write">
        <button type="submit" class="sendit-btn header-sendit-btn"
        >оставить отзыв</button>
    </div>
</form>

    `,
    methods: {
        errorHide() {
            this.popUpError = false
        },
        handleFileUpload() {
            this.file = this.$refs.file.files[0];
            console.log(this.file);
            if (this.file.size > 2200000) {
                console.log("file is more than 2 MB");
                this.file = ""
            }
        },
        onSubmit() {


            let productReview = [];
            if (/^[A-zА-яЁё]+$/.test(this.name)) {
                productReview.push({
                    name: this.name
                });
                this.$set(this.errors, 'name', "");
                this.popUpErrors.name = false;


            } else {
                this.$set(this.errors, 'name', "Имя было указано с ошибкой или поле сталось пустым. Пожалуйста, укажите имя без цифр и символов");
                this.popUpErrors.name = true;
                // setTimeout(() => this.popUpError = true, 3000);


            };
            if (/^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/.test(this.email)) {
                productReview.push({
                    email: this.email
                });
                this.$set(this.errors, 'email', '');
                this.popUpErrors.email = false;

            } else {
                this.$set(this.errors, 'email', "Почта была указана с ошибкой или поле осталось пустым. Пожалуйста, укажите почту в формате ivan@mail.ru");
                this.popUpErrors.email = true;

            };
            if (!this.message) {
                this.popUpErrors.message = true;
                this.$set(this.errors, "message", "Пожалуйста, напишите что-то");
            } else {

                productReview.push({
                    message: this.message
                });
                this.$set(this.errors, "message", "");
                this.popUpErrors.message = false;

            };
            if (!this.checkedPeriod) {
                this.$set(this.errors, "checkedPeriod", "Пожалуйста, укажите период аренды")
                this.popUpErrors.period = true;
            } else {
                productReview.push({
                    checkedPeriod: this.checkedPeriod
                });
                this.$set(this.errors, "checkedPeriod", "");
                this.popUpErrors.period = false;

            };
            if (this.agree.length === 0) {
                this.popUpErrors.agree = true;
                setTimeout(() => this.popUpErrors.agree = false, 3000);
                this.$set(this.errors, "agree", "Нам необходимо получить Ваше согласие на обработку персональных данных")
            } else {
                productReview.push({
                    agree: this.agree
                });
                this.$set(this.errors, "agree", "");
                this.popUpErrors.agree = false;


            }
            productReview.push({
                file: this.file
            });
            console.log(productReview);
            console.log(this.errors);

            if (productReview.length === 6) {
                this.$emit('review-submitted', productReview);
                this.name = '';
                this.email = '';
                this.message = '';
                this.checkedPeriod = '';
                this.file = null;
                this.errors = {};

            }
            productReview.file = this.file;
            console.log(productReview);
            console.log(this.errors);

        }
    }
})
Vue.component('gallery', {
    props: ['mainPictures'],
    template: `
    <section name="gallery" class="gallery">
            <div class="gallery-wrap wrap">
            <div class="gallery-title"><h2 class="gallery-h1">ФОТО</h2>
            </div>
                              <div class="carousel"
   data-flickity='{ "lazyLoad": 2, "adaptiveHeight": true, "wrapAround": true, "autoPlay":2000,"fullscreen": true}'>
  <div class="carousel-cell" v-for="item in mainPictures">
    <img class="carousel-cell-image" :alt="item.title"
      :data-flickity-lazyload-src="item.src"
      :data-flickity-lazyload-srcset="item.srcTablet + ' 720w'+','+ item.Mobile +' 360w'"
      sizes="(min-width: 1024px) 720px, 360px"
      
      />
  </div>
</div>
</div>
</section>`
})

Vue.component('prices', {

    props: ['pricelist'],
    template: `
    <section name="prices" class="prices">
            <div class="prices-wrap wrap">
                <h2 class="prices-h1">ЦЕНЫ</h2>
                <div class="prices-table-header">
                <h3 class="prices-h2">Период аренды (сутки)</h3>
                <h3 class="prices-h2">Стоимость (₽ в сутки)</h3>
                </div>
                <div class="prices-item" v-for="item in pricelist">
                    <div class="price-category"><p>{{item.category}}</p></div>
                    <div class="price-value"><p>{{item.value}}</i></p></div>
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
                    <h2 class="header-h2">Аренда стильных и комфортных кемперов</h2>
                    <button class="sendit-btn header-sendit-btn" v-on:click="formVisibilityChange">арендовать</button>
                </div>
            </div>
        </header>`
})

Vue.component('v-header-menu', {
    props: ['checkedChange', 'menuLinks'],

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
                    
                    <p class="design-p"><a href="mailto:vanzhin@outlook.com">сайт создан: NV</a>
                    </p>
                </div>
            </div>
        </footer>`
})

Vue.component('v-footer-menu', {
    props: ['checkedChange', 'menuLinks'],

    template: `<nav class="nav nav-footer">
    <a href="#header" class="logo"><h2>4Kamping</h2></a>
    <section class="nav-menu">
        <input type="checkbox" id="burger-footer" class="burger">
        <label for="burger-footer" class="burger-label-footer">
            <span></span>
            <span></span>
            <span></span>
        </label>
        <div class="nav-menu-drop-footer">
        <a href="#header" class= "nav-menu-drop-link" v-on:click="checkedChange">4Kamping</a>
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
            feedbackVisiblity: false,
            sending: false,
            sent: false,


            pricelist: [{
                category: "2 - 5  ",
                value: 2000
            }, {
                category: "6 - 10",
                value: 1750
            }, {
                category: "11 - 20",
                value: 1500
            }, {
                category: "> 20",
                value: 'обсудим'
            }, ],
            menuLinks: [{
                name: "О нас",
                link: "#whoweare"
            }, {
                name: "Преимущества",
                link: "#our-advantage"
            }, {
                name: "Фото",
                link: "#gallery"
            }, {
                name: "Цены",
                link: "#prices"
            }, {
                name: "Отзывы",
                link: "#feedback"
            }, {
                name: "Вопросы",
                link: "#doubt"
            }, {
                name: "Контакты",
                link: "#contact"
            }],
            mainPictures: [],

            pictures: [{
                    main: true,
                    title: '4Kamping',
                    src: './img/IMG_1140.jpeg',
                    srcMobile: './img/IMG_1140_tel.jpeg',
                    srcTablet: './img/IMG_1140_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './img/IMG_0613.jpeg',
                    srcMobile: './img/IMG_0613_tel.jpeg',
                    srcTablet: './img/IMG_0613_tablet.jpeg'
                },
                {
                    main: true,
                    src: './img/IMG_0614.jpeg',
                    title: '4Kamping',
                    srcMobile: './img/IMG_0614_tel.jpeg',
                    srcTablet: './img/IMG_0614_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './img/IMG_0619.jpeg',
                    srcMobile: './img/IMG_0619_tel.jpeg',
                    srcTablet: './img/IMG_0619_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './img/IMG_0621.jpeg',
                    srcMobile: './img/IMG_0621_tel.jpeg',
                    srcTablet: './img/IMG_0621.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './img/IMG_1142.jpeg',
                    srcMobile: './img/IMG_1142_tel.jpeg',
                    srcTablet: './img/IMG_1142_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './img/IMG_1144.jpeg',
                    srcMobile: './img/IMG_1144_tel.jpeg',
                    srcTablet: './img/IMG_1144_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './img/IMG_1150.jpeg',
                    srcMobile: './img/IMG_1150_tel.jpeg',
                    srcTablet: './img/IMG_1150_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './img/IMG_1162.jpeg',
                    srcMobile: './img/IMG_1162_tel.jpeg',
                    srcTablet: './img/IMG_1162_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './img/IMG_0614.jpeg',
                    srcMobile: './img/IMG_0614_tel.jpeg',
                    srcTablet: './img/IMG_0614_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './img/IMG_1167.jpeg',
                    srcMobile: './img/IMG_1167_tel.jpeg',
                    srcTablet: './img/IMG_1167_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './img/IMG_1339.jpeg',
                    srcMobile: './img/IMG_1339_tel.jpeg',
                    srcTablet: './img/IMG_1339_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './img/IMG_1343.jpeg',
                    srcMobile: './img/IMG_1343_tel.jpeg',
                    srcTablet: './img/IMG_1343_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './img/IMG_1357.jpeg',
                    srcMobile: './img/IMG_1357_tel.jpeg',
                    srcTablet: './img/IMG_1357_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './img/IMG_1140.jpeg',
                    srcMobile: './img/IMG_1140_tel.jpeg',
                    srcTablet: './img/IMG_1140_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './img/IMG_1454.jpeg',
                    srcMobile: './img/IMG_1454_tel.jpeg',
                    srcTablet: './img/IMG_1454_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './img/IMG_1476.jpeg',
                    srcMobile: './img/IMG_1476_tel.jpeg',
                    srcTablet: './img/IMG_1476_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './img/IMG_2063.jpeg',
                    srcMobile: './img/IMG_2063_tel.jpeg',
                    srcTablet: './img/IMG_2063_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './img/IMG_0621.jpeg',
                    srcMobile: './img/IMG_0621_tel.jpeg',
                    srcTablet: './img/IMG_0621_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './img/IMG_2270.jpeg',
                    srcMobile: './img/IMG_2270_tel.jpeg',
                    srcTablet: './img/IMG_2270_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './img/IMG_2271.jpeg',
                    srcMobile: './img/IMG_2271_tel.jpeg',
                    srcTablet: './img/IMG_2271_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './img/IMG_2358.jpeg',
                    srcMobile: './img/IMG_2358_tel.jpeg',
                    srcTablet: './img/IMG_2358_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './img/IMG_3675.jpeg',
                    srcMobile: './img/IMG_3675_tel.jpeg',
                    srcTablet: './img/IMG_3675_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './img/IMG_3678.jpeg',
                    srcMobile: './img/IMG_3678_tel.jpeg',
                    srcTablet: './img/IMG_3678_tablet.jpeg'
                },
            ]



        },
        computed: {

        },
        created() {
            this.pictureToMain();
        },


        methods: {
            visibilityOn() {
                this.feedbackVisiblity = !this.feedbackVisiblity;
                console.log("gopa")
            },

            pictureToMain() {
                this.pictures.forEach(element => {
                    if (element.main) {
                        this.mainPictures.push(element)
                    }


                });
                console.log(this.mainPictures);

            },
            checkedChange() { //при нажатии на ссылку в мобильном меню - оно сворачивается
                const burger = document.querySelectorAll(".burger");
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
                console.log(item);

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
            async addFeedbackInfo(item) {
                this.sending = true;
                let response = await fetch(`${API_ROOT}/feedback`, {
                    method: 'POST',
                    // headers: {
                    //     'Content-Type': 'form/multipart'
                    // },


                    body: new FormData(formElem)
                });

                let result = await response.json();
                if (result.result === 1) {
                    this.sending = false;
                    this.sent = true;

                } else {}


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