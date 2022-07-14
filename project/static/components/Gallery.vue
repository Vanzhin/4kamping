<template>
<section name="gallery" class="gallery">
            <div class="gallery-wrap wrap">
            <div class="gallery-title"><h2 class="gallery-h1">ФОТО</h2>
            </div>
                              <div class="carousel"
   data-flickity='{ "lazyLoad": 2, "adaptiveHeight": true, "wrapAround": true, "autoPlay":2000,"fullscreen": true}'>
  <div class="carousel-cell" v-for="item in mainPictures" v-bind:key="item.src">
    <img class="carousel-cell-image" :alt="item.title"
      :data-flickity-lazyload-src="item.src"
      :data-flickity-lazyload-srcset="item.srcTablet + ' 720w'+','+ item.Mobile +' 360w'"
      sizes="(min-width: 1024px) 720px, 360px"
      
      />
  </div>
</div>
</div>
</section>
</template>
<script>
export default{
	 props: ['mainPictures'],

}
</script>