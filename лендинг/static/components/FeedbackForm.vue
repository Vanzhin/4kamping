<template>
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

            <input value="agree"  v-model="agree" type="checkbox" name="agreement" id="userAgreement" class="checkbox-input">
            <label for="userAgreement" class="form-label"><span>согласен на обработку персональных данных</span></label>

        </div>
    </div>
    <div class="feedback-write">
        <button type="submit" class="sendit-btn header-sendit-btn">оставить отзыв</button>
    </div>
</form>
</template>
<script>
export default {
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
            if (this.agree === false || null) {
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

	}
</script>