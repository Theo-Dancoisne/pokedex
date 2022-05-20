<template>
    <div class="porkemonSprite">
        <img :src="sprite" alt="pokemon sprite">
    </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import axios from "axios";

const props = defineProps(["pokemonURL"]);
const sprite = ref(null);
watch(props, () => {
    if (props.pokemonURL) start();
});

async function start() {
    await axios.get(props.pokemonURL).then(res => (sprite.value = res));
    sprite.value = await sprite.value.data.sprites.front_default;
}
</script>
