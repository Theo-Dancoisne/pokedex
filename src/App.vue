<template>
    <div id="pokedex">
        <div id="top-screen-support">
            <div class="top-grey-support"><div class="hole top-screen-hole"></div></div>
            <div class="screen">
                <div class="led-background-image">
                    <div class="led-background-color">
                        <div id="top-screen-body">
                            <TopScreen :pokemonURL="pokemonURL"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="separator">
            <span><span><span></span></span></span>
        </div>
        <div id="bottom-screen-support">
            <div class="bottom-grey-support"><div class="little-button"></div><div class="little-button"></div></div>
            <div class="screen">
                <div class="led-background-image">
                    <div class="led-background-color">
                        <div id="bottom-screen-body">
                            <MainScreen @display-pokemon="displayPokemon"/>
                        </div>
                    </div>
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