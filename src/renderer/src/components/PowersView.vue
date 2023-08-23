<template>
    <div>
        <button @click="decr" class="mt-p5rem btn">Prev</button>
        <p>{{ index + 1}} / {{ data.powers.length }}</p>
        <Power :data="currPower" class="card mb-p5rem" />
        <button @click="incr" class="btn">Next</button>
    </div>
</template>

<script setup>
import Power from './Power.vue';
import dataIn from "../../../../powers.json";
import { ref, reactive, computed } from 'vue';

let index = ref(0);

let data = reactive(dataIn);

let currPower = computed(() => data.powers[index.value]);

function incr() {
    index.value++;
    if (index.value >= data.powers.length) index.value = 0;
}

function decr() {
    index.value--;
    if (index.value < 0) index.value = data.powers.length - 1;
}

</script>

<style lang="css" scoped></style>