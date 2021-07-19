<template>
	<footer class="footer">
            <div class="faq-wrap wrap">
                <div class="faq-h2-wrap">
                    <h2 class="faq-h2">ОСТАЛИСЬ ВОПРОСЫ?</h2>
                    <div class="faq-form-wrap"><p>Закажите звонок, и&nbsp;менеджер Вам всё расскажет и&nbsp;объяснит</p>

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
        </footer>
</template>
<script>
import VFooterMenu from './VFooterMenu.vue'

export default {
    props: ['checkedChange', 'formVisibilityChange', 'menuLinks'],
 components: {
        VFooterMenu,
    }
}
</script>