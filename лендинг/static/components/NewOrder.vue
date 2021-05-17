<template>
	<div class="callback-tel-wrap" >
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
        </div>
</template>
<script>
export default {
	    props: ['regexpTel', 'orderOkMessage', 'orderErrMessage', 'orderFormClose', 'loading'],

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


}
</script>