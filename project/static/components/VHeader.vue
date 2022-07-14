<template>
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
                    <!-- <button class="sendit-btn header-sendit-btn" v-on:click="formVisibilityChange">арендовать</button> -->
                    <a class="sendit-btn header-sendit-btn" href="tel:+79028773061"><span >позвонить</span><span class="desktop-view">+7 (902) 877-30-61</span></a>

                </div>
            </div>
        </header>
</template>
<script>
import VHeaderMenu from './VHeaderMenu.vue'

export default {
	    props: ['checkedChange', 'formVisibilityChange', 'menuLinks'],
 components: {
        VHeaderMenu,
    }
}
</script>