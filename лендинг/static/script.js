"use strict"
import Vue from 'vue'
import App from './App.vue'
import css from "./css/style.css";




Vue.config.productionTip = false
export const eventEmitter = new Vue()
new Vue({
    render: h => h(App),
}).$mount('#app');

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