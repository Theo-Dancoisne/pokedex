import { createApp } from 'vue'
//import App from './App.vue'
import axios from "axios";

const a = createApp({
    data () {
        return {
            info: null
        }
    },
    mounted () {
        axios.get("https://pokeapi.co/api/v2/pokemon/1").then(response => (this.info = "response"))
    }
});
a.mount("#app");

//createApp(App).mount("#app");
