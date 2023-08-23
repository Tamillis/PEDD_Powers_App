<template>
    <div>
        <h4>Power Name: </h4>
        <div class="flex mb-p5rem">
            <p>{{ data.name }}</p>
        </div>

        <h4>Tags:</h4>
        <div class="flex mb-p5rem">
            <div v-for="tag in data.tag">
                <p>{{ tag }}</p>
            </div>
        </div>

        <h4>Prerequisites:</h4>
        <div class="flex mb-p5rem">
            <div v-for="preq in data.preq">
                <p>{{ preq }}</p>
            </div>
        </div>

        <h4>Description: </h4>
        <div class="flex mb-p5rem">
            <pre>{{ data.desc }}</pre>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(["data"]);
</script>

<style lang="scss" scoped></style>