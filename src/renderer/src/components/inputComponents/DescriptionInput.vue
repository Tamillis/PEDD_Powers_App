<template>
    <div class="input">
        <label for="desc" class="w-34">Description: </label>
        <div class="w-66">
            <textarea name="desc" id="desc" cols="30" rows="10"
                placeholder="Subtitle-description &#13;&#10;Subtitle-description &#13;&#10;..." @input="validate"
                @submit="(e) => e.preventDefault()"></textarea>
            <p class="error" :class="{hide:!invalid}">{{ errMsg }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const invalid = ref(true);
const errMsg = ref("Blank description invalid");

function validate(e) {
    //do more complex validation here to check the text is in the right format
    let newInput = e.target.value;

    invalid.value = false;
    if(newInput==="") {
        invalid.value = true;
        errMsg = "Blank description invalid";
    }
}
</script>

<style lang="css" scoped></style>