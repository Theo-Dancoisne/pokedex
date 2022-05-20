<template>
    <nav id="top-nav"></nav>
    <div v-html="bodyContent"></div>
    <nav id="bottom-nav">
        <span class="SVGarrow" @click="previousPage()"></span><span class="number" style="display: inline-block;">{{currentPage}}/{{numOfPages}}</span><span class="SVGarrow" @click="nextPage()"></span>
    </nav>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import axios from "axios";

let allPokemons = null;
let allPokemonsSort = {};
const somePokemons = reactive({});
const numOfPages = ref(null);
const currentPage = ref(0);
const emits = defineEmits(["display-pokemon"]);
const list = ref(null);
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
    await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=898").then(res => (allPokemons = res));
    allPokemons = allPokemons.data.results;
    let i = 0;
    while (Object.keys(allPokemons).length > 0) {
        allPokemonsSort[i] = {};
        for (var y=0; y < 20; y++) {
            if (Object.keys(allPokemons)[Object.keys(allPokemons).length-1] != undefined) {
                allPokemonsSort[i][y] = allPokemons.shift();
            }
        }
        i++;
    }
    numOfPages.value = Object.keys(allPokemonsSort)[Object.keys(allPokemonsSort).length-1];
    initPage();
}

function initPage() {
    somePokemons.value = allPokemonsSort[currentPage.value];
    // reset pokemons list & pokemon index
    list.value = "<ul id='pokemonlist'>";
    sharpindex.value = 0;
    previousSharpIndex.value = 0;
    //
    Object.values(somePokemons.value).forEach((element, index) => {list.value += `<li id=${index} pokemonUrl=${element.url}>${element.name}</li>`});
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
        emits("display-pokemon", document.getElementById(sharpindex.value).getAttribute("pokemonUrl"));
        speak(document.getElementById(sharpindex.value).innerHTML);
    }, 10);
}
watch(sharpindex, () => {
    speak(document.getElementById(sharpindex.value).innerHTML);
});
watch(currentPage, () => {
    initPage();
});

document.addEventListener("keydown", (keycode) => {
    if (keycode.key === "ArrowDown") next("down");
    if (keycode.key === "ArrowUp") next("up");
    if (keycode.key === "ArrowLeft") previousPage("down");
    if (keycode.key === "ArrowRight") nextPage("up");
});

function speak(text) {
    speechSynthesis.cancel();
    let syntheVoice = new SpeechSynthesisUtterance(text);
    syntheVoice.voice = allVoices;
    speechSynthesis.speak(syntheVoice);
}
function next(direction) {
    let condition = (direction === "down")? Object.keys(somePokemons.value).length - 1: 0;
    previousSharpIndex.value = sharpindex.value;
    if(sharpindex.value != condition) {
        document.getElementById(previousSharpIndex.value).removeAttribute("class");
        (direction === "down")? sharpindex.value++: sharpindex.value--;
        document.getElementById(sharpindex.value).setAttribute("class", "hover");
        window.location.href = "#" + sharpindex.value;
        emits("display-pokemon", document.getElementById(sharpindex.value).getAttribute("pokemonUrl"));
    }
}
function previousPage() {if (currentPage.value != 0) currentPage.value--;}
function nextPage() {if (currentPage.value != numOfPages.value) currentPage.value++;}
</script>
