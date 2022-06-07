import { createApp } from "vue";
import Pokedex_classic from "./Pokedex_classic.vue";
import Pokedex_advanced from "./Pokedex_advanced.vue";


const apps = [Pokedex_classic, Pokedex_advanced];
createApp(apps[0]).mount("#app");
function Switch(index) {
    createApp(apps[index]).mount("#app");
}
window.Switch = Switch;
