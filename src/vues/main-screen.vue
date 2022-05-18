<template>
    <div v-html="bodyContent"></div>
</template>

<script setup>
import { ref, reactive, defineEmits, watch } from "vue";

const props = defineProps(["pokemonsData"]);
const emits = defineEmits(["display-pokemon"]);
const list = ref("<ul>");
const bodyContent = ref(list);
const sharpindex = ref(0);
window.location.href = "#" + sharpindex.value;
watch(sharpindex, () => {
    let syntheVoice = new SpeechSynthesisUtterance(document.getElementById(sharpindex.value).innerHTML);
    const myVoices = [
        "Microsoft Guy Online (Natural) - English (United States)",
        "Google US English (en-US)"/*,
        "Google UK English Male"*/
    ]
    let allVoices = speechSynthesis.getVoices();
    setTimeout(() => {
        speechSynthesis.cancel();
        allVoices = speechSynthesis.getVoices();
        allVoices = allVoices.find(({ name }) => myVoices.includes(name));
        syntheVoice.voice = allVoices;
        speechSynthesis.speak(syntheVoice);
    }, 100);
});

setTimeout(() => {
    const allPokemons = reactive(props.pokemonsData);
    Object.values(allPokemons.data.results).forEach((element, index) => {list.value += `<li id=${index} @click="emits('display-pokemon')">${element.name}</li>`});
    list.value += "</ul>";
}, 100);

//let sharpindex = 0;
document.addEventListener("keydown", (keycode) => {
    if (keycode.key === "ArrowDown") {
        if (Object.keys(props.pokemonsData.data.results).length - 1 != sharpindex.value) {
            sharpindex.value++;
            window.location.href = "#" + sharpindex.value;
            //speechSynthesis.speak(new SpeechSynthesisUtterance(document.getElementById(sharpindex.value).innerHTML));
        }
    }
});
document.addEventListener("keydown", (keycode) => {
    if (keycode.key === "ArrowUp") {
        if (sharpindex.value != 0) {
            sharpindex.value--;
            window.location.href = "#" + sharpindex.value;
            //speechSynthesis.speak(new SpeechSynthesisUtterance(document.getElementById(sharpindex.value).innerHTML));
        }
    }
});

const displayPokemon = ref(() => {
    //const data = await axios.get("https://pokeapi.co/api/v2/pokemon/");
    console.log("yo");
});
</script>
