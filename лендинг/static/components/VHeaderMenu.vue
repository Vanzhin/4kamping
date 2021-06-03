<template><nav class="nav">
    <a href="#" class="logo">
        <h2>4Kamping</h2>
    </a>
    <section class="nav-menu">
        <input type="checkbox" id="burger" class="burger">
        <label for="burger" class="burger-label"
        @click="bodyLock">
            <span></span>
            <span></span>
            <span></span>
        </label>
        <div class="nav-menu-drop">
        <h2>4Kamping</h2>
            <div class="column-menu">
               <ul class="drop-down">
                <li class="drop-down-li" v-for="item in menuLinks" :key="item.name"><a :href="item.link" class="drop-down-link" v-on:click="checkedChange">{{item.name}}</a></li>
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
</template>
<script>

export default {
	    props: ['checkedChange', 'menuLinks'],

	data() {
        return {
           
        };
    },
    methods: {
        bodyLock(){

 document.body.classList.toggle('lock');
}

    }

}
</script>