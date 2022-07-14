<template>
	<div class="column">
    <picture class="pictures-picture" v-for="item in pictures" :key="item">
    <source media="(min-width:640px) and (max-width:1199px)" :srcset="item.srcTablet">
    <source media="(min-width:1200px)" :srcset="item.src">
    <img :src="item.srcMobile" alt="picture">
</picture>
    </div>
</template>
<script>
export default {
     props: ['pictures'],

}
</script>