<template>
    <div v-html="bodyContent"></div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import axios from "axios";

const allPokemons =  reactive({});
const emits = defineEmits(["display-pokemon"]);
const list = ref("<ul id='pokemonlist'>");
const bodyContent = ref(list);
const sharpindex = ref(0);

const myVoices = [
    "Microsoft Guy Online (Natural) - English (United States)",
    "Google UK English Male"
]
let allVoices = null;

start();
async function start() {
    allVoices = speechSynthesis.getVoices();
    setTimeout(() => {
        allVoices = speechSynthesis.getVoices();
        allVoices = allVoices.find(({ name }) => myVoices.includes(name));
    }, 100);
    await axios.get("https://pokeapi.co/api/v2/pokemon/").then(res => (allPokemons.value = res));
    Object.values(allPokemons.value.data.results).forEach((element, index) => {list.value += `<li id=${index} pokemonUrl=${element.url}>${element.name}</li>`});
    list.value += "</ul>";
    window.location.href = "#" + sharpindex.value;
    setTimeout(() => {
        document.getElementById(sharpindex.value).setAttribute("class", "hover");
        let li = document.getElementById("pokemonlist").childNodes;
        li.forEach(function (element) {
            element.onclick = () => emits("display-pokemon", element.getAttribute("pokemonUrl"));
        });
    }, 10);
}
watch(sharpindex, () => {
    speechSynthesis.cancel();
    let syntheVoice = new SpeechSynthesisUtterance(document.getElementById(sharpindex.value).innerHTML);
    syntheVoice.voice = allVoices;
    speechSynthesis.speak(syntheVoice);
});

document.addEventListener("keydown", (keycode) => {
    if (keycode.key === "ArrowDown") next("down");
    if (keycode.key === "ArrowUp") next("up");
});

function next(direction) {
    let condition = (direction === "down")? Object.keys(allPokemons.value.data.results).length - 1: 0;
    if(sharpindex.value != condition) {
        document.getElementById(sharpindex.value).removeAttribute("class");
        (direction === "down")? sharpindex.value++: sharpindex.value--;
        document.getElementById(sharpindex.value).setAttribute("class", "hover");
        window.location.href = "#" + sharpindex.value;
        emits("display-pokemon", document.getElementById(sharpindex.value).getAttribute("pokemonUrl"));
    }
}
</script>
