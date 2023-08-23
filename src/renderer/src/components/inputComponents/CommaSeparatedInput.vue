<template>
    <div class="input">
        <label :for="props.name" class="w-34">{{ label }}</label>
        <div class="w-66">
            <input :name="props.name" :id="props.name" type="text" :placeholder="`Comma-separated ${props.fullname}`"
                v-model="input" @beforeinput="oldName = input" @input.prevent="validate"
                @submit="(e) => e.preventDefault()">
            <p class="error" v-if="invalid">Invalid input</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

let props = defineProps(["fullname", "name"]);
let label = props.fullname[0].toUpperCase() + props.fullname.slice(1) + ": ";
let input = ref("");
let invalid = ref(false);
let oldInput = input.value;

function validate(e) {
    oldInput = input.value;
    let newInput = e.target.value;
    let lines = newInput.split(",");
    invalid.value = false;
    for (let line of lines) {
        if (!(/^[a-z0-9\s+-]+$/i.test(line) || line === "")) invalid.value = true;
    }

    if(newInput==="") invalid.value = true;

    if (invalid.value) input.value = oldInput;
    else input.value = newInput;
}

</script>

<style lang="css" scoped></style>