<template>
    <div id="screen">
        <div class="led-background-image">
            <div class="led-background-color">
                <div id="top-screen-body">
                    <TopScreen :pokemonURL="pokemonURL"/>
                </div>
            </div>
        </div>
    </div>
    <div id="screen">
        <div class="led-background-image">
            <div class="led-background-color">
                <div id="bottom-screen-body">
                    <MainScreen @display-pokemon="displayPokemon"/>
                </div>
            </div>
        </div>
    </div>
</template>

<!-- <script setup>
import { ref, reactive } from "vue";
</script> -->

<script>
import "./stylesheet.css";
import TopScreen from "./vues/top-screen.vue";
import MainScreen from "./vues/main-screen.vue";

export default {
    name: "App",
    components: {
        TopScreen,
        MainScreen,
    },
    data() {
        return {
            pokemonURL: null,
        }
    },
    methods: {
        displayPokemon(i) {
            this.pokemonURL = i;
        }
    },
}
</script>