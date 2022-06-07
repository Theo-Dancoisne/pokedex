import { createApp } from "vue";
import Index from "./index.vue";


createApp(Index).mount("#app");
const apps = [Pokedex_classic, Pokedex_advanced];
// createApp(apps[0]).mount("#app");
function Switch(index) {
    createApp(apps[index]).mount("#app");
}
window.Switch = Switch;
