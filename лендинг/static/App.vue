<template>
 <div id="app">
        <div class="callback-tel" v-bind:class="[{invisible: !isFormActive}]" v-on:click="formVisibilityChange">
            
        </div>
        <v-header
        v-bind:checked-change='checkedChange'
                v-bind:form-visibility-change="formVisibilityChange"
                v-bind:menu-links='menuLinks'
                ></v-header>
        <section name="whoweare" class="whoweare">
            <div class="whoweare-wrap wrap">
                <div class="whoweare-picture">
                    <i class="fas fa-wind fa-rotate-180"></i>
                    <img src="/static/img/camper+auto2.svg" alt="4kamping">
                </div>   
                <!-- <picture class="whoweare-picture">
                    <source media="(min-width:640px)" srcset="static/img/кемпер с прозрачным небом 3.png">
                    <img src="static/img/кемпер с прозрачным небом 3.png" alt="4Kamping">
                </picture> -->
                <h2 class="whoweare-h2">Мы – сервис по аренде кемперов</h2>
                <p class="whoweare-p">С&nbsp;нами&nbsp;Вы сможете отправиться в&nbsp;самые незабываемые приключения. Для Вас будут открыты самые красивые места нашей страны! Не&nbsp;упускайте возможность отправиться в&nbsp;дикую природу и&nbsp;провести с&nbsp;семьей! А&nbsp;мы&nbsp;будем рады видеть Ваши счастливые лица!</p>
                <button class="sendit-btn header-sendit-btn" v-on:click="formVisibilityChange">арендовать</button>
            </div>
        </section>
                <agreement
  
        ></agreement>
        <new-order 
        v-bind:class="[{invisible: !isFormActive}]"
        v-on:close-form="formVisibilityChange"
            v-bind:regexp-tel="regexpTel"
            v-bind:order-ok-message="orderOkMessage"
            v-bind:order-err-message="orderErrMessage"
            v-on:phone-number="userPhoneNum" 
            v-bind:order-form-close="orderFormClose"  
            v-bind:loading="loading" 
        ></new-order>
        <section class="steps">
            <div class="steps-wrap wrap">
                <div class="steps-item step1">
                    <div class="whoweare-picture"><span class="fa-stack fa-lg"><i class="fas fa-map fa-stack-1x"></i><i class="fas fa-circle fa-stack-1x"></i><i class="fas fa-compass fa-stack-1x"></i></span></div>
                    <!-- <picture class="whoweare-picture">
                        <source media="(min-width:640px) and (max-width:1199px)" srcset="static/img/Asset%203@4x-768.png">
                        <source media="(min-width:1200px)" srcset="static/img/Asset%203@4x-1440.png">
                        <img src="static/img/Asset%203@4x.png" alt="think">
                    </picture> -->

                    <h2 class="step1-h2">Шаг 1</h2>
                    <p class="step1-p">Придумайте, куда поехать</p>
                </div>
                <div class="steps-item step2">
                     <div class="whoweare-picture"><span class="fa-stack fa-lg"><i class="fas fa-window-maximize fa-stack-1x"></i><i class="fas fa-desktop fa-stack-1x"></i><i class="fas fa-mouse-pointer fa-stack-1x"></i></span></div>

                    <!-- <picture class="whoweare-picture">
                        <source media="(min-width:640px) and (max-width:1199px)" srcset="static/img/Asset%204@4x%202-768.png">
                        <source media="(min-width:1200px)" srcset="static/img/Asset%204@4x%202-1440.png">
                        <img src="static/img/Asset%204@4x%202.png" alt="create">
                    </picture> -->
                    <h2 class="step2-h2">Шаг 2</h2>
                    <p class="step2-p">Отправьте <span v-on:click="formVisibilityChange">заявку</span> или позвоните нам. Менеджер подтвердит запрос и уточнит все необходимые данные</p>
                </div>
                <div class="steps-item step3">
                    <div class="whoweare-picture"><span class="fa-stack fa-lg"><i class="fas fa-file-signature signature1 fa-stack-1x"></i><i class="fas fa-file-signature signature2 fa-stack-1x"></i><i class="fas fa-certificate fa-stack-1x"></i></span></div>

                    <!-- <picture class="whoweare-picture">
                        <source media="(min-width:640px) and (max-width:1199px)" srcset="static/img/Asset%205@4x-768.png">
                        <source media="(min-width:1200px)" srcset="static/img/Asset%205@4x-1440.png">
                        <img src="static/img/Asset%205@4x.png" alt="meet">
                    </picture> -->
                    <h2 class="step3-h2">Шаг 3</h2>
                    <p class="step3-p">Подписываете договор аренды и забираете кемпер</p>
                </div>
                <div class="steps-item step4">
                     <div class="whoweare-picture"><span class="fa-stack fa-lg"><i class="fas fa-tree tree1 fa-stack-1x"></i><i class="fas fa-tree tree2 fa-stack-1x"></i><i class="fas fa-tree tree3 fa-stack-1x"></i><img src="/static/img/camper2.svg" alt="4kamping"></span>
                      </div>

                    <!-- <picture class="whoweare-picture">
                        <source media="(min-width:640px) and (max-width:1199px)" srcset="static/img/Asset%206@4x-768.png">
                        <source media="(min-width:1200px)" srcset="static/img/Asset%206@4x-1440.png">
                        <img src="static/img/Asset%206@4x.png" alt="deliver">
                    </picture> -->

                    <h2 class="step4-h2">Шаг 4</h2>
                    <p class="step4-p">Наслаждаетесь комфортом на природе :)</p>
                </div>
            </div>
        </section>
        <section class="order">
            <div class="order-wrap wrap">
                <h2 class="order-h2">
                    Подарите себе новые впечатления
                </h2>
                <button class="sendit-btn header-sendit-btn" v-on:click="formVisibilityChange">арендовать</button>
            </div>
        </section>
        
        <section  name="our-advantage" class="our-advantage">
            <div class="our-advantage-wrap wrap">
                <h2 class="our-advantage-h2">
                    НАШИ ПРЕИМУЩЕСТВА
                </h2>
                <div class="our-advantage-content">
                    <div class="our-advantage-item-wrap">
                        <div class="our-advantage-item">
                            <!-- <picture class="advantage-picture">
                                <source media="(min-width:640px) and (max-width:1199px)" srcset="./static/img/Layer%203-768.png">
                                <source media="(min-width:1200px)" srcset="./static/img/Layer%203-1440.png">
                                <img src="./static/img/Layer%203.png" alt="free-sevice">
                            </picture> -->
                            <i class="fas fa-map-marked-alt"></i>

                        </div>
                        <p class="our-advantage-item-p">Возможность доставки кемпера</p>
                    </div>
                    <div class="our-advantage-item-wrap">
                        <div class="our-advantage-item">
                            <!-- <picture class="advantage-picture">
                                <source media="(min-width:640px) and (max-width:1199px)" srcset="./static/img/Layer%201-768.png">
                                <source media="(min-width:1200px)" srcset="./static/img/Layer%201-1440.png">
                                <img src="./static/img/Layer%201.png" alt="select">
                            </picture> -->
                            <i class="fas fa-egg"></i>
                        </div>
                        <p class="our-advantage-item-p">Новые кемперы и оборудование</p>
                    </div>
                    <div class="our-advantage-item-wrap">
                        <div class="our-advantage-item">
                            <!-- <picture class="advantage-picture">
                                <source media="(min-width:640px) and (max-width:1199px)" srcset="./static/img/Layer%206-768.png">
                                <source media="(min-width:1200px)" srcset="./static/img/Layer%206-1440.png">
                                <img src="./static/img/Layer%206.png" alt="parameter">
                            </picture> -->
                            <img src="/static/img/camper3.svg" alt="4kamping">
                        </div>
                        <p class="our-advantage-item-p">Стильный дизайн</p>
                    </div>
                    <div class="our-advantage-item-wrap">
                        <div class="our-advantage-item">
                            <!-- <picture class="advantage-picture">
                                <source media="(min-width:640px) and (max-width:1199px)" srcset="./static/img/Layer%205-768.png">
                                <source media="(min-width:1200px)" srcset="./static/img/Layer%205-1440.png">
                                <img src="./static/img/Layer%205.png" alt="comfort">
                            </picture> -->
                            <i class="fas fa-mug-hot"></i>

                        </div>
                        <p class="our-advantage-item-p">Есть полевая кухня</p>
                    </div>
                    <div class="our-advantage-item-wrap">
                        <div class="our-advantage-item">
                            <!-- <picture class="advantage-picture">
                                <source media="(min-width:640px) and (max-width:1199px)" srcset="./static/img/Layer%202-768.png">
                                <source media="(min-width:1200px)" srcset="./static/img/Layer%202-1440.png">
                                <img src="./static/img/Layer%202.png" alt="comfort">
                            </picture> -->
                            <i class="fas fa-feather-alt"></i>
                        </div>
                        <p class="our-advantage-item-p">Легкость управления и установки</p>
                    </div>
                    <div class="our-advantage-item-wrap">
                        <div class="our-advantage-item">
                            <!-- <picture class="advantage-picture">
                                <source media="(min-width:640px) and (max-width:1199px)" srcset="./static/img/Layer%204-768.png">
                                <source media="(min-width:1200px)" srcset="./static/img/Layer%204-1440.png">
                                <img src="./static/img/Layer%204.png" alt="one-number">
                            </picture> -->
                            <i class="fas fa-bed"></i>
                        </div>
                        <p class="our-advantage-item-p">Полноразмерное спальное место 200Х140&nbsp;см</p>
                    </div>
                </div>
            </div>
        </section>
        



        
        <gallery
       v-bind:main-pictures="mainPictures"
       ></gallery>
        
        <prices
        v-bind:pricelist="pricelist">
        </prices> 
        <section class="order">
            <div class="order-wrap wrap">
                <h2 class="order-h2">
Возьмите комфорт в путешествие                </h2>
                <button class="sendit-btn header-sendit-btn" v-on:click="formVisibilityChange">арендовать</button>
            </div>
        </section> 
<section name="feedback" class="feedback">
    <div class="feedback-wrap wrap">
        <h2 class="feedback-h1">ОТЗЫВЫ</h2>



                <!-- Flickity HTML init -->
        <div class="carousel" data-flickity='{ "wrapAround": false }'>
  <div class="carousel-cell">
      <article class="feedback-slider-content-column content-column-item">
                    <picture class="feedback-picture">
                        <source media="(min-width:1200px)" srcset="static/img/no_foto.png">
                        <img class ="feedback-img" src="static/img/no_foto.png" alt="customer_photo">
                    </picture>
                    <div class="customer-info">
                        <h2 class="customer-info-h2">Николай</h2>
                        <p class="customer-info-p">менее 3-х суток</p>
                        <span class="service">Дата отзыва: 17.05.2021</span>
                        <!-- <span class="from">Откуда: Москва</span>
                        <span class="where">Куда: Нижневартовск</span> -->
                    </div>
                    <p class="feedback-text">Брали кемпер на майские. Понравилось отношение сервиса. ездили на увилды. было приятно, что на озере такого не было ни у кого.</p>
                </article>
  </div>
  <div class="carousel-cell">
      <article class="feedback-slider-content-column content-column-item">
                    <picture class="feedback-picture">
                        <source media="(min-width:1200px)" srcset="static/img/no_foto.png">
                        <img class ="feedback-img" src="static/img/no_foto.png" alt="customer_photo">
                    </picture>

                    <div class="customer-info">
                        <h2 class="customer-info-h2">Павел</h2>
                        <p class="customer-info-p">от 3 до 14 суток</p>
                        <span class="service">Дата отзыва: 01.06.2021</span>
                        <!-- <span class="from">Откуда: Москва</span>
                        <span class="where">Куда: Калининград</span> -->
                    </div>
                    <p class="feedback-text">Давно хотели поехать на Волчихинское, взяли кемпер и не прогадали. понравилось, что все под рукой. управлять сначала не привычно, но потом ок</p>
                </article>
  </div>
   <div class="carousel-cell">
      <article class="feedback-slider-content-column content-column-item">
                    <picture class="feedback-picture">
                        <source media="(min-width:1200px)" srcset="static/img/no_foto.png">
                        <img class ="feedback-img" src="static/img/no_foto.png" alt="customer_photo">
                    </picture>

                    <div class="customer-info">
                        <h2 class="customer-info-h2">Константин</h2>
                        <p class="customer-info-p">от 3 до 14 суток</p>
                        <span class="service">Дата отзыва: 19.06.2021</span>
                        <!-- <span class="from">Откуда: Москва</span>
                        <span class="where">Куда: Калининград</span> -->
                    </div>
                    <p class="feedback-text">Прекрасный бюджетный отдых особенно в текущий период. Хорошо отдохнули семьей на берегу озера в дали от городского шума и от большого количества людей</p>
                </article>
  </div>
  <div class="carousel-cell">
      <article class="feedback-slider-content-column content-column-item">
                    <picture class="feedback-picture">
                        <source media="(min-width:1200px)" srcset="static/img/no_foto.png">
                        <img class ="feedback-img" src="static/img/no_foto.png" alt="customer_photo">
                    </picture>

                    <div class="customer-info">
                        <h2 class="customer-info-h2">Дмитрий</h2>
                        <p class="customer-info-p">от 3 до 14 суток</p>
                        <span class="service">Дата отзыва: 15.06.2021</span>
                        <!-- <span class="from">Откуда: Москва</span>
                        <span class="where">Куда: Калининград</span> -->
                    </div>
                    <p class="feedback-text">Отличный сервис. Кемпер оборудован всем необходимым. Спать было удобно. Планирую воспользоваться данными услугами еще не один раз</p>
                </article>
  </div>
        </div>

        <input class="feedback-form-preview" type="checkbox" name="feedbackMenu" id="feedbackMenu"><label class="feedback-form-open" for="feedbackMenu"><span class="open">Оставить отзыв</span></label>
        
        <feedback-form 
        :sending="sending"
        :sent="sent"
        v-on:review-submitted="addFeedbackInfo"
        
        ></feedback-form>
        
    </div>
  
     </section>   
        <section name="doubt" class="doubt">
            <div class="doubt-wrap wrap">
                <h2 class="doubt-h1">ОСТАЛИСЬ СОМНЕНИЯ?</h2>
                <details class="doubt-details">
                    <summary class="doubt-summary">
                        <span class="doubt-summary-p">
                            Мне будет сложно управлять автомобилем с прицепом
                        </span>
                    </summary>
                    <p class="doubt-details-p">Как правило, получасовая практика перед поездкой устраняет неуверенность</p>
                </details>
                <details class="doubt-details">
                    <summary class="doubt-summary">
                        <span class="doubt-summary-p">
                            Мой автомобиль не сможет передвигаться с кемпером
                        </span>
                    </summary>
                    <p class="doubt-details-p"> Масса кемпера 500 кг и для транспортировки подойдет практически любой автомобиль со стандартным прицепным устройством</p>
                </details>
                <details class="doubt-details">
                    <summary class="doubt-summary">
                        <span class="doubt-summary-p">
                            Я не смогу уехать за границу
                        </span>
                    </summary>
                    <p class="doubt-details-p">Вы можете путешествовать как по России и СНГ, так и по странам дальнего зарубежья</p>
                </details>
                <details class="doubt-details">
                    <summary class="doubt-summary">
                        <span class="doubt-summary-p">
                            Могут возникнуть проблемы при проверке документов</span>
                    </summary>
                    <p class="doubt-details-p">На срок аренды у Вас будут все необходимые документы - это свидетельство о регистрации и договор аренды</p>
                </details>
                <details class="doubt-details">
                    <summary class="doubt-summary">
                        <span class="doubt-summary-p">
    Кемпер сильно увеличивает расход топлива</span>
                    </summary>
                    <p class="doubt-details-p">Из нашего опыта, расход увеличивается в среднем на 2 л на 100 км пути</p>
                </details>
                <details class="doubt-details">
                    <summary class="doubt-summary">
                        <span class="doubt-summary-p">
                            Меня съедят комары
                        </span>
                    </summary>
                    <p class="doubt-details-p">Возможно, но только не в кемпере, окна и люк которого оборудованы москитными сетками</p>
                </details>
            </div>
        </section>
        
        <section name= "contact" class="contacts">
            <div class="contacts-wrap wrap">
                <h2 class="contacts-h1">КОНТАКТЫ</h2>
                <div class="contacts-column-wrap">
                    <div class="contacts-column">
                        <h3 class="contacts-h3">Мы на связи </h3> 
                        <p>Остались вопросы, звоните!</p>
                        <p><a href="tel:+79028773061">+7 (902) 877-30-61</a></p>



                        <div class="contacts-column">
                             
        <div class="contacts-social">
                <a href="https://t.me/Arenda_Campera_Ekb" title="telegram"><i class="fab fa-telegram-plane"></i></a>
                <a href="https://wa.me/79028773061" title="whats up"><i class="fab fa-whatsapp"></i></a>
                <!-- <a href="viber://add?number=+79028773061" title="viber"><i class="fab fa-viber"></i></a> -->
        </div>
                        </div>
                        <p><a href="mailto:info@4kamping.ru"> info@4kamping.ru</a></p>
                        <p></p> 
                        
                    </div>
                    <div class="contacts-column">
                        <h3 class="contacts-h3">4Kamping в социальных сетях</h3> 
    <div class="contacts-social">
            <a href="https://vk.com/4kamping" title="vkontakte"><i class="fab fa-vk"></i></a>
            <a href="https://instagram.com/4kamping" title="instagram"><i class="fab fa-instagram"></i></a>
            <!-- <a href="#"><i class="fab fa-facebook-f" title="facebook"></i></a> -->
    </div>
                    </div>
                    <div class="contacts-column">
                        <div class="partners-wrap wrap">

                            <h3 class="partners-h2"> Наши партнеры </h3>
                            <a href="https://smartcamper.ru/main" title="smartcamper"> <img src="static/img/logo_zel_menu.svg" alt="smartcamper"></a>
                         </div>
                    </div>
                </div>
                
            </div>
        </section>
        <v-footer
        v-bind:checked-change='checkedChange'
        v-bind:form-visibility-change="formVisibilityChange"
        v-bind:menu-links='menuLinks'></v-footer>
    </div>
</template>

<script>
let API_ROOT='https://4kamping.ru';

import FeedbackForm from './components/FeedbackForm.vue'
import Gallery from './components/Gallery.vue'
import Prices from './components/Prices.vue'
import VHeader from './components/VHeader.vue'
import VFooter from './components/VFooter.vue'
import PictureList from './components/PictureList.vue'
import NewOrder from './components/NewOrder.vue'
import Agreement from './components/Agreement.vue';




export default {
	name:'App',
	components: {
        FeedbackForm,
        Gallery,
        Prices,
        VHeader,
        VFooter,
        PictureList,
        NewOrder,
        Agreement
	},
	data(){
		return{
            API_ROOT:'https://4kamping.ru',
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

            pictures: [
                {
                    main: true,
                    title: '4Kamping',
                    src: './static/img/IMG_0613.jpeg',
                    srcMobile: './static/img/IMG_0613_tel.jpeg',
                    srcTablet: './static/img/IMG_0613_tablet.jpeg'
                },
                {
                    main: true,
                    src: './static/img/IMG_0614.jpeg',
                    title: '4Kamping',
                    srcMobile: './static/img/IMG_0614_tel.jpeg',
                    srcTablet: './static/img/IMG_0614_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './static/img/IMG_0619.jpeg',
                    srcMobile: './static/img/IMG_0619_tel.jpeg',
                    srcTablet: './static/img/IMG_0619_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './static/img/IMG_8042.jpeg',
                    srcMobile: './static/img/IMG_8042_tel.jpeg',
                    srcTablet: './static/img/IMG_8042_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './static/img/IMG_8242.jpeg',
                    srcMobile: './static/img/IMG_8242_tel.jpeg',
                    srcTablet: './static/img/IMG_8242_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './static/img/IMG_8247.jpeg',
                    srcMobile: './static/img/IMG_8247_tel.jpeg',
                    srcTablet: './static/img/IMG_8247_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './static/img/IMG_8256.jpeg',
                    srcMobile: './static/img/IMG_8256_tel.jpeg',
                    srcTablet: './static/img/IMG_8256_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './static/img/IMG_1343.jpeg',
                    srcMobile: './static/img/IMG_1343_tel.jpeg',
                    srcTablet: './static/img/IMG_1343_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './static/img/IMG_1339.jpeg',
                    srcMobile: './static/img/IMG_1339_tel.jpeg',
                    srcTablet: './static/img/IMG_1339_tablet.jpeg'
                },


                {
                    main: true,
                    title: '4Kamping',
                    src: './static/img/IMG_1140.jpeg',
                    srcMobile: './static/img/IMG_1140_tel.jpeg',
                    srcTablet: './static/img/IMG_1140_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './static/img/IMG_0621.jpeg',
                    srcMobile: './static/img/IMG_0621_tel.jpeg',
                    srcTablet: './static/img/IMG_0621.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './static/img/IMG_1142.jpeg',
                    srcMobile: './static/img/IMG_1142_tel.jpeg',
                    srcTablet: './static/img/IMG_1142_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './static/img/IMG_1144.jpeg',
                    srcMobile: './static/img/IMG_1144_tel.jpeg',
                    srcTablet: './static/img/IMG_1144_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './static/img/IMG_1647.jpeg',
                    srcMobile: './static/img/IMG_1647_tel.jpeg',
                    srcTablet: './static/img/IMG_1647_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './static/img/IMG_1648.jpeg',
                    srcMobile: './static/img/IMG_1648_tel.jpeg',
                    srcTablet: './static/img/IMG_1648_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './static/img/IMG_1150.jpeg',
                    srcMobile: './static/img/IMG_1150_tel.jpeg',
                    srcTablet: './static/img/IMG_1150_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './static/img/IMG_1162.jpeg',
                    srcMobile: './static/img/IMG_1162_tel.jpeg',
                    srcTablet: './static/img/IMG_1162_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './static/img/IMG_1167.jpeg',
                    srcMobile: './static/img/IMG_1167_tel.jpeg',
                    srcTablet: './static/img/IMG_1167_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './static/img/IMG_1357.jpeg',
                    srcMobile: './static/img/IMG_1357_tel.jpeg',
                    srcTablet: './static/img/IMG_1357_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './static/img/IMG_1454.jpeg',
                    srcMobile: './static/img/IMG_1454_tel.jpeg',
                    srcTablet: './static/img/IMG_1454_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './static/img/IMG_1476.jpeg',
                    srcMobile: './static/img/IMG_1476_tel.jpeg',
                    srcTablet: './static/img/IMG_1476_tablet.jpeg'
                },
                 {
                    main: true,
                    title: '4Kamping',
                    src: './static/img/IMG_1742.jpeg',
                    srcMobile: './static/img/IMG_1742_tel.jpeg',
                    srcTablet: './static/img/IMG_1742_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './static/img/IMG_2046.jpeg',
                    srcMobile: './static/img/IMG_2046_tel.jpeg',
                    srcTablet: './static/img/IMG_2046_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './static/img/IMG_2063.jpeg',
                    srcMobile: './static/img/IMG_2063_tel.jpeg',
                    srcTablet: './static/img/IMG_2063_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './static/img/IMG_2313.jpeg',
                    srcMobile: './static/img/IMG_2313_tel.jpeg',
                    srcTablet: './static/img/IMG_2313_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './static/img/IMG_2358.jpeg',
                    srcMobile: './static/img/IMG_2358_tel.jpeg',
                    srcTablet: './static/img/IMG_2358_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './static/img/IMG_5633.jpeg',
                    srcMobile: './static/img/IMG_5633_tel.jpeg',
                    srcTablet: './static/img/IMG_5633_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './static/img/IMG_5635.jpeg',
                    srcMobile: './static/img/IMG_5635_tel.jpeg',
                    srcTablet: './static/img/IMG_5635_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './static/img/IMG_3675.jpeg',
                    srcMobile: './static/img/IMG_3675_tel.jpeg',
                    srcTablet: './static/img/IMG_3675_tablet.jpeg'
                },
                {
                    main: true,
                    title: '4Kamping',
                    src: './static/img/IMG_3678.jpeg',
                    srcMobile: './static/img/IMG_3678_tel.jpeg',
                    srcTablet: './static/img/IMG_3678_tablet.jpeg'
                },
            ]



        }
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
                document.body.classList.remove('lock'); //удаляю лок для бади

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
        },
        created() {
            this.pictureToMain();
        }

}
</script>