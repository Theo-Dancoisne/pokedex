<template>
    <div id="pokedex-classic-container">
        <div>
            <!-- left -->
            <form id="searchBar"><input type="text" placeholder="Search your Pokemon !"><button></button></form>
            <div>
                <!-- some filter -->
            </div>
            <div id="pokemon-list">
            </div>
        </div>
        <div>
            <!-- right -->
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import "./ressources/stylesheets/pokedex_classic.css";
import axios from "axios";

const allPokemons = reactive({});

start();
async function start() {
    await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=898").then(res => (allPokemons.value = res.data.results));
    Object.values(allPokemons.value).forEach(element => {
        console.log(element.name)
    });
}
</script>