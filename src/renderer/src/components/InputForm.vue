<template>
    <form @submit.prevent="submit">
        <PowerNameInput :names="names" class="input"/>
        <div class="tags">
            <p>Tag Selection</p>
        </div>
        <CommaSeparatedInput name="tag" fullname="tags" />
        <CommaSeparatedInput name="preq" fullname="prerequisites"/>
        <DescriptionInput />
        <div>
            <input type="submit" value="Submit" class="btn w-fit mb-p5rem">
        </div>
    </form>
</template>

<script setup>
import CommaSeparatedInput from './inputComponents/CommaSeparatedInput.vue';
import DescriptionInput from './inputComponents/DescriptionInput.vue';
import PowerNameInput from './inputComponents/PowerNameInput.vue';
import src from '../../../../powers.json';

let names = src.powers.map(p=> p.name);

function submit(e) {
    let data = Object.fromEntries(new FormData(e.target).entries());
    //format data
    data.tag = data.tag.split(",").map(i=>i.trim());
    data.preq = data.preq.split(",").map(i=>i.trim());
    console.log(JSON.stringify(data));

    window.file.append("powers.json", data, (err) => {
        if(err) console.log(err);
        else console.log("Data written");
    });
}


</script>

<style lang="css" scoped>

form {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 0.5rem;
    width: 75%;
    margin: 0px auto;
}

.tags {
    align-self: center;
}

</style>