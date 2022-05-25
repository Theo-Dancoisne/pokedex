<template>
    <div id="porkemonData">
        <div>
            <h3>Types :</h3>
            <!-- <span>{{pokemonData.value.types[0].type.name}}</span> -->
            <span>{{ pokemonSumUp.types }}</span>
            <h3>Abilities :</h3>
            <span>{{ pokemonSumUp.abilities }}</span>
            <h3>Height :</h3>
            <span class="number">{{ pokemonSumUp.height }} dec</span>
            <h3>Weight :</h3>
            <span class="number">{{ pokemonSumUp.weight }} hec</span>
        </div>
        <img :src="pokemonSumUp.sprite" alt="pokemon sprite">
    </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import axios from "axios";

const props = defineProps(["pokemonURL"]);
const pokemonData = reactive({});
const pokemonSumUp = reactive({types: "", height: null, weight: null, sprite: null, abilities: ""});
watch(props, () => {
    if (props.pokemonURL) start();
});

async function start() {
    // ‼ don't reset variables before this following async function ‼
    await axios.get(props.pokemonURL).then(res => (pokemonData.value = res));
    pokemonData.value = await pokemonData.value.data;
    pokemonSumUp.types = pokemonSumUp.abilities = "";
    pokemonSumUp.sprite = pokemonData.value.sprites.front_default;;
    // sprite.value = pokemonData.value.sprites.versions["generation-i"]["red-blue"].front_transparent;
    pokemonData.value.types.forEach(element => pokemonSumUp.types += element.type.name + " ");
    pokemonData.value.abilities.forEach(element => pokemonSumUp.abilities += element.ability.name + " ");
    pokemonSumUp.height = pokemonData.value.height;
    pokemonSumUp.weight = pokemonData.value.weight;
}
</script>
