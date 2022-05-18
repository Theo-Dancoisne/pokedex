<template>
    <ul v-html="list"></ul>
</template>

<script setup >
import { ref, reactive } from "vue";

const props = defineProps(["pokemonsData"]);
const list = ref("");
setTimeout(() => {
    const allPokemons = reactive(props.pokemonsData);
    Object.values(allPokemons.data.results).forEach((element, index) => {list.value += `<li id=${index}>${element.name}</li>`});
}, 100);

//document.onkeydown = (e) => alert(e.key+e.keyCode);
document.addEventListener("keydown", function (keycode) {
    if (keycode.key === "ArrowDown") {
        console.log("azaaa");
        window.location.href = "#" + 10;
        document.getElementById("10")[0].focus();
    }
}
);
</script>