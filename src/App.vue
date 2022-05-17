<template>
    <div id="bottom-screen">
        <div class="led-screen">
            <div class="led-color">
                <div id="bottom-screen-body">
                    azertyui
                </div>
            </div>
        </div>
    </div>
    <div>{{pokemonsData}}</div>
</template>

<script>
//import { reactive } from "vue";
import axios from "axios";
import style from "./stylesheet.css";

export default {
    data() {
        return {
            pokemonsData: null
        }
    },
    async mounted() {
        await axios.get("https://pokeapi.co/api/v2/pokemon/1").then(res => (this.pokemonsData = res));
    }
}
</script>