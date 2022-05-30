<template>
    <div id="pokedex">
        <div id="top-screen-container">
            <div id="speaker">
                <div></div>
                <div id="speaker-cache"></div>
                <div>
                    <div id="speaker-top-hole" class="hole"></div>
                    <div id="speaker-right-hole" class="hole"></div>
                    <div id="speaker-bottom-hole" class="hole"></div>
                    <div id="speaker-left-hole" class="hole"></div>
                </div>
            </div>
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
        </div>
        <div id="separator">
            <span><span><span></span></span></span>
        </div>
        <div id="bottom-screen-container">
            <div id="directional-keys">
                <div><div id="keys">
                    <object id="dirkeyTop" :data="directional_keys+'#top'"></object>
                    <object id="dirkeyRight" :data="directional_keys+'#right'"></object>
                    <object id="dirkeyBottom" :data="directional_keys+'#bottom'"></object>
                    <object id="dirkeyLeft" :data="directional_keys+'#left'"></object>
                </div></div>
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
    </div>
</template>


<script>
import "./ressources/stylesheets/pokedex_advanced.css";
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
            directional_keys: "./src/ressources/images/directional_keys.svg",
        }
    },
    methods: {
        displayPokemon(url) {
            this.pokemonURL = url;
        }
    },
}
</script>