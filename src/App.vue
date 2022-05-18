<template>
    <div id="bottom-screen">
        <div class="led-screen">
            <div class="led-color">
                <div id="bottom-screen-body">
                    <MainScreen :pokemonsData="pokemonsData"/>
                </div>
            </div>
        </div>
    </div>
    {{ pokemonsData }}
</template>

<!-- <script setup>
import { ref, reactive } from "vue";
</script> -->

<script>
import axios from "axios";
import "./stylesheet.css";
import MainScreen from "./vues/main-screen.vue";

export default {
    name: "App",
    components: {
        MainScreen
    },
    data() {
        return {
            pokemonsData: null,
        }
    },
    async mounted() {
        await axios.get("https://pokeapi.co/api/v2/pokemon/").then(res => (this.pokemonsData = res));
    }
}
</script>