<template>
    <div class="grid-item" pokemonUrl="${element.url}">
        <img src="${thisPokemon.sprites.front_default}" alt="picture of${thisPokemon.name}" loading="lazy" decoding="async">
        <div class="pokemonNum">N°${thisPokemon.order}</div>
        <div class="pokemonName">${thisPokemon.name}</div>
        <div class="types">${pokemonTypes}</div>
    </div>
</template>

<script>
const props = defineProps(["pokemonURL"]);
</script>