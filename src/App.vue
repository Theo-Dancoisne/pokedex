<template>
    <div id="bottom-screen">
        <div class="led-screen">
            <div class="led-color">
                <div id="bottom-screen-body">
                    <MainScreen :pokemonsData="pokemonsData" @display-pokemon="displayPokemon"/>
                </div>
            </div>
        </div>
    </div>
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
    methods: {
        displayPokemon() {
            console.log("hi");
        }
    },
    async mounted() {
        await axios.get("https://pokeapi.co/api/v2/pokemon/").then(res => (this.pokemonsData = res));
    }
}
</script>