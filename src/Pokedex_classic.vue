<template>
    <div id="pokedex-classic-container">
        <div id="left">
            <form id="searchBar"><input type="text" placeholder="Search your Pokemon !"><button></button></form>
            from<input type="number" name="from" min="0" v-model="from">to<input type="number" name="to" min="0" v-model="to">
            <div>
                <!-- some filter -->
            </div>
            <div id="pokemon-list">
                <template v-for="pokemon in displayPokemonList">
                    <div class="grid-item" @click="updateRight(pokemon.pokemonUrl);">
                        <div v-html="pokemon.loader"></div>
                        <img :src="pokemon.imgUrl" :alt="'picture of ' + pokemon.name" loading="lazy" decoding="async">
                        <div class="pokemonNum">N°{{pokemon.num}}</div>
                        <div class="pokemonName">{{pokemon.name}}</div>
                        <div class="types" v-html="pokemon.types"></div>
                    </div>
                </template>
            </div>
        </div>
        <div id="right">
            <span id="pokemonNum">#{{stats.num}}</span>
            <span id="pokemonName">{{stats.name}}</span>
            <span id="pokemonAltName">{{stats.altname}}</span>
            <span class="types" id="pokemonTypes" v-html="stats.types"></span>
            <span class="stat-title">POKEDEX ENTRY</span>
            <span id="pokemonDesc" v-html="stats.desc"></span>
            <span class="stat-title">ABILITIES</span>
            <span id="pokemonAbilities" v-html="stats.abilities"></span>
            <span id="other-stats">
                <span class="stat-title">HEIGHT</span><span class="stat-title">WEIGHT</span>
                <span class="other-stats-value"><span id="height">{{stats.height}}m</span></span><span class="other-stats-value"><span id="weight">{{stats.weight}}Kg</span></span>
                <span class="stat-title">WEAKNESSES</span><span class="stat-title">BASE EXP</span>
                <span class="other-stats-value"><span>none</span></span><span class="other-stats-value"><span id="exp">{{stats.exp}}</span></span>
            </span>
            <span class="stat-title">STATS</span>
            <span id="basics-stats">
                <label class="switch" id="pokemonHp"><span class="slider"></span><div class="stat-name">HP</div><div class="stat-value">{{stats.hp}}</div></label>
                <label class="switch" id="pokemonAtk"><span class="slider"></span><div class="stat-name">ATK</div><div class="stat-value">{{stats.atk}}</div></label>
                <label class="switch" id="pokemonDef"><span class="slider"></span><div class="stat-name">DEF</div><div class="stat-value">{{stats.def}}</div></label>
                <label class="switch" id="pokemonSpA"><span class="slider"></span><div class="stat-name">SpA</div><div class="stat-value">{{stats.spatk}}</div></label>
                <label class="switch" id="pokemonSpD"><span class="slider"></span><div class="stat-name">SpD</div><div class="stat-value">{{stats.spdef}}</div></label>
                <label class="switch" id="pokemonSPD"><span class="slider"></span><div class="stat-name">SPD</div><div class="stat-value">{{stats.speed}}</div></label>
                <label class="switch" id="pokemonToT"><span class="slider"></span><div class="stat-name">ToT</div><div class="stat-value">{{stats.total}}</div></label>
            </span>
            <span class="stat-title">EVOLUTION</span>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import "./ressources/stylesheets/pokedex_classic.css";
import axios from "axios";


const displayPokemonList = ref([]);
const from = ref(0);
const to = ref(50);
const stats = reactive(
    {
        num: "none",
        name: "unknow",
        altname: "John Doe",
        types: "none",
        desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas asperiores impedit recusandae provident officiis natus. Id iste ipsam rerum suscipit illo fugiat porro tempore aliquid aut? Nulla voluptatibus iste cum!",
        abilities: "none",
        height: "NaN",
        weight: "NaN",
        exp: "NaN",
        hp: "NaN",
        atk: "NaN",
        def: "NaN",
        spatk: "NaN",
        spdef: "NaN",
        speed: "NaN",
        total: "NaN",
    }
);

start();
function start() {
    let limit = parseFloat(to.value) - parseFloat(from.value);
    displayPokemonList.value = Array(limit).fill({loader: `<div class="loader"></div>`});
    axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${from.value}`).then(res => {
        const promiseArray = Object.values(res.data.results).map((element) => {
            return new Promise((resolve, reject) => {
                axios.get(element.url).then(res2 => {
                    res2 = res2.data;
                    resolve({
                        pokemonUrl: element.url,
                        num: res2.order,
                        name: firstletterToUppercase(res2.name),
                        imgUrl: res2.sprites.front_default,
                        types: getPokemonTypes(res2.types),
                        loader: "",
                    });
                }).catch(error => console.error(error));
            });
        });
        Promise.all(promiseArray).then((pokemonList) => {
            displayPokemonList.value = pokemonList;
        });
    }).catch(error => console.error(error));
}


function updateRight(url) {
    axios.get(url).then(res => {
        res = res.data;
        let basic_stats = Array();
        for(var i=0; i <= 5; i++) { basic_stats.push(res.stats[i].base_stat); }
        stats.num = res.order;
        stats.name = firstletterToUppercase(res.name);
        stats.altname = firstletterToUppercase(res.species.name);
        stats.types = getPokemonTypes(res.types);
        stats.abilities= getPokemonAbilities(res.abilities);
        stats.height = (res.height * 0.1).toFixed(1);
        stats.weight = (res.weight * 0.1).toFixed(1);
        stats.exp = res.base_experience;
        stats.hp = basic_stats[0];
        stats.atk = basic_stats[1];
        stats.def = basic_stats[2];
        stats.spatk = basic_stats[3];
        stats.spdef = basic_stats[4];
        stats.speed = basic_stats[5];
        stats.total = basic_stats.reduce((a, b) => a + b);
        axios.get(res.species.url).then(res2 => {
            res2 = res2.data;
            stats.desc = res2.flavor_text_entries[0].flavor_text.replace(/\n/, " ").replace(/\f/, "");
        }).catch(error => console.error(error));
    }).catch(error => console.error(error));
}
watch([from, to], () => {
    // issue, to.value is not set (except if from.value is set first)
    if ((from.value && to.value) > 0) start();
});

function getPokemonTypes(arrayOfTypes) {
    return arrayOfTypes.map(element => `<div class="${element.type.name}">${element.type.name}</div>`).join("");
}
function getPokemonAbilities(arrayOfAbilities) {
    return arrayOfAbilities.map(element => `<span class="other-stats-value"><span>${firstletterToUppercase(element.ability.name)}</span></span>`).join("");
}
function firstletterToUppercase(string) {
    return string[0].toUpperCase() + string.slice(1);
}
</script>