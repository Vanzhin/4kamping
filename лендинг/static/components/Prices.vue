<template>
<section name="prices" class="prices">
            <div class="prices-wrap wrap">
                <h2 class="prices-h1">ЦЕНЫ</h2>
                <div class="prices-table-header">
                <h3 class="prices-h2">Период аренды (сутки)</h3>
                <h3 class="prices-h2">Стоимость (₽ в сутки)</h3>
                </div>
                <div class="prices-item" v-for="item in pricelist" :key="item">
                    <div class="price-category"><p>{{item.category}}</p></div>
                    <div class="price-value"><p>{{item.value}}</p></div>
                </div>

            </div>
        </section>
</template>
<script>
export default {
props: ['pricelist']
}
</script>