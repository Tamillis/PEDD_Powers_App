<template>
    <div class="input">
        <label for="name" class="w-34">Power Name: </label>
        <div class="w-66">
            <input name="name" id="name" type="text" placeholder="A unique name" v-model="input"
                @beforeinput="(e) => oldInput = e.target.value" @input.prevent="validate" @submit="(e) => e.preventDefault()"
                class="name-input">
            <p class="error" :class="{ hide: !invalid }">{{ errMsg }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(["names"])

let input = ref("");
let invalid = ref(true)
let oldInput = "";

let errMsg = ref("Power name invalid");

function validate(e) {
    //sanitize input
    let newInput = e.target.value;
    if (/^[a-z0-9\s]+$/i.test(newInput) || newInput === "") input.value = newInput;
    else input.value = oldInput;

    //validate resultant input
    invalid.value = false;
    if (input.value === "") {
        invalid.value = true;
        errMsg.value = "Empty name invalid";
    }

    if (props.names.includes(input.value)) {
        invalid.value = true;
        errMsg.value = "Name taken";
    }
}

</script>

<style lang="css" scoped>

</style>