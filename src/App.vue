<script setup>
import { reactive } from "vue";
/* pokéAPI contain 898 pokemons the 22/05/16, id start at 1 */
const pokemons = reactive(
    {
        all: "erlo"
        // all: await axios.get("https://pokeapi.co/api/v2/pokemon/1")
    }
);
//fetch("https://pokeapi.co/api/v2/pokemon/?limit=898").then(res => res.json()).then(data => {});
</script>

<template>
    <p>{{ pokemons.all }}</p>
</template>