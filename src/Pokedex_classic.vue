<template>
    <div id="pokedex-classic-container">
        <div id="left">
            <form id="searchBar"><input type="text" placeholder="Search your Pokemon !"><button></button></form>
            from<input type="text" name="from" v-model="from">to<input type="text" name="to" v-model="to">
            <div>
                <!-- some filter -->
            </div>
                <div id="pokemon-list" v-html="displayItems">
            </div>
        </div>
        <div id="right">
            <span id="pokemonNum"></span>
            <span id="pokemonName"></span>
            <span id="pokemonAltName"></span>
            <span class="types" id="pokemonTypes"></span>
            <span class="stat-title">POKEDEX ENTRY</span>
            <span id="pokemonDesc"></span>
            <span class="stat-title">ABILITIES</span>
            <span class="abilities" id="pokemonAbilities"></span>
            <span id="someStats">
                <span class="stat-title">HEIGHT</span><span class="stat-title">WEIGHT</span>
                <span id="height"></span><span id="weight"></span>
                <span class="stat-title">WEAKNESSES</span><span class="stat-title">BASE EXP</span>
                <span></span><span id="exp"></span>
            </span>
            <span class="stat-title">STATS</span>
            <span>
                <span><span>HP</span><span id="pokemonHp"></span></span>
                <span><span>ATK</span><span id="pokemonAtk"></span></span>
                <span><span>DEF</span><span id="pokemonDef"></span></span>
                <span><span>SpA</span><span id="pokemonSpA"></span></span>
                <span><span>SpD</span><span id="pokemonSpD"></span></span>
                <span><span>SPD</span><span id="pokemonSPD"></span></span>
                <span><span>ToT</span><span id="pokemonToT"></span></span>
            </span>
            <span class="stat-title">EVOLUTION</span>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import "./ressources/stylesheets/pokedex_classic.css";
import axios from "axios";

const allPokemons = reactive({});
// const pokemonList = ref("");
const pokemonList = reactive({});
const Pokemon = ref("");
const from = ref(0);
const to = ref(50);
const displayItems = ref("");

start();
function start() {
    let thisPokemon = null;
    let limit = parseFloat(to.value) - parseFloat(from.value);
    axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${from.value}`).then(res => {
        //console.log(res.data.results);
        pokemonList.value = {};
        Object.values(res.data.results).forEach((element, index) => {
            axios.get(element.url).then(res2 => {
                thisPokemon = res2.data;
                let pokemonTypes = getPokemonTypes(thisPokemon.types);
                thisPokemon.name = thisPokemon.name[0].toUpperCase() + thisPokemon.name.slice(1);
                pokemonList.value[index] =    `<div class="grid-item" pokemonUrl="${element.url}">
                                            <img src="${thisPokemon.sprites.front_default}" alt="picture of${thisPokemon.name}">
                                            <div class="pokemonNum">N°${thisPokemon.order}</div>
                                            <div class="pokemonName">${thisPokemon.name}</div>
                                            <div class="types">${pokemonTypes}</div>
                                        </div>`;
            }).catch(error => console.log(error));
        });
    }).catch(error => console.log(error))
    .then(() => {
        setTimeout(async () => {
            displayItems.value = Object.values(pokemonList.value).reduce((a, b) => a + b);
            let items = await document.getElementById("pokemon-list").childNodes;
            items.forEach(element => {
                element.onclick = () => {Pokemon.value = element.getAttribute("pokemonUrl");}
            });
        }, 1000);
    });
}
watch(Pokemon, () => {
    axios.get(Pokemon.value).then(res => {
        res = res.data;
        document.getElementById("pokemonNum").innerText = "#" + res.order;
        document.getElementById("pokemonName").innerHTML = res.name[0].toUpperCase() + res.name.slice(1);
        document.getElementById("pokemonAltName").innerHTML = res.species.name[0].toUpperCase() + res.species.name.slice(1);
        document.getElementById("pokemonTypes").innerHTML = getPokemonTypes(res.types);
        document.getElementById("pokemonAbilities").innerHTML = getPokemonAbilities(res.abilities);
        document.getElementById("height").innerText = (res.height * 0.1).toFixed(1) + "m";
        document.getElementById("weight").innerText = (res.weight * 0.1).toFixed(1) + "Kg";
        document.getElementById("exp").innerText = res.base_experience;
        let stats = Array();
        for(var i=0; i <= 5; i++) { stats.push(res.stats[i].base_stat); }
        document.getElementById("pokemonHp").innerText = stats[0];
        document.getElementById("pokemonAtk").innerText = stats[1];
        document.getElementById("pokemonDef").innerText = stats[2];
        document.getElementById("pokemonSpA").innerText = stats[3];
        document.getElementById("pokemonSpD").innerText = stats[4];
        document.getElementById("pokemonSPD").innerText = stats[5];
        document.getElementById("pokemonToT").innerText = stats.reduce((a, b) => a + b);
        axios.get(res.species.url).then(res2 => {
            res2 = res2.data;
            //console.log(res2);
            document.getElementById("pokemonDesc").innerText = res2.flavor_text_entries[0].flavor_text.replace("\f", "");
        }).catch(error => console.log(error));
    }).catch(error => console.log(error));
});
watch([from, to], () => {
    start();
});

function getPokemonTypes(arrayOfTypes) {
    let divs = "";
    arrayOfTypes.forEach(element => {
        let color = null;
        switch (element.type.name) {
            case "grass":
                color = "grass";
                break;
            case "fire":
                color = "fire";
                break;
            case "fithing":
                color = "fithing";
                break;
            case "water":
                color = "water";
                break;
            case "steel":
                color = "steel";
                break;
            case "fairy":
                color = "fairy";
                break;
            case "poison":
                color = "poison";
                break;
            case "flying":
                color = "flying";
                break;
            case "normal":
                color = "normal";
                break;
            case "electric":
                color = "electric";
                break;
            case "ground":
                color = "ground";
                break;
            case "bug":
                color = "bug";
                break;
        }
        divs += `<div class="${color}">${element.type.name}</div>`;
    });
    return divs;
}
function getPokemonAbilities(arrayOfAbilities) {
    let divs = "";
    arrayOfAbilities.forEach(element => {
        divs += element.ability.name;
    });
    return divs
}
</script>