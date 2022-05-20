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
const previousSharpIndex = ref(0);

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
        li.forEach(function (element, index) {
            element.onclick = () => {
                emits("display-pokemon", element.getAttribute("pokemonUrl"));
                speak(element.innerHTML);
                previousSharpIndex.value = sharpindex.value;
                document.getElementById(previousSharpIndex.value).removeAttribute("class");
                sharpindex.value = index;
                document.getElementById(sharpindex.value).setAttribute("class", "hover");
            }
        });
    }, 10);
}
watch(sharpindex, () => {
    speak(document.getElementById(sharpindex.value).innerHTML);
});

document.addEventListener("keydown", (keycode) => {
    if (keycode.key === "ArrowDown") next("down");
    if (keycode.key === "ArrowUp") next("up");
});

function speak(text) {
    speechSynthesis.cancel();
    let syntheVoice = new SpeechSynthesisUtterance(text);
    syntheVoice.voice = allVoices;
    speechSynthesis.speak(syntheVoice);
}
function next(direction) {
    let condition = (direction === "down")? Object.keys(allPokemons.value.data.results).length - 1: 0;
    previousSharpIndex.value = sharpindex.value;
    if(sharpindex.value != condition) {
        document.getElementById(previousSharpIndex.value).removeAttribute("class");
        (direction === "down")? sharpindex.value++: sharpindex.value--;
        document.getElementById(sharpindex.value).setAttribute("class", "hover");
        window.location.href = "#" + sharpindex.value;
        emits("display-pokemon", document.getElementById(sharpindex.value).getAttribute("pokemonUrl"));
    }
}
</script>
