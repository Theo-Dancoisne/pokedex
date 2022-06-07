<template>
    <span id="pokeball_background"></span>
        <header>
            <nav id="navbar">
                <template v-for="page in Pages">
                    <button :id="page.id" :class="page.class" page.is_selected>{{page.text}}</button>
                </template>
                <!-- <button id="home" type="button" @click="nav(this);">Home</button>
                <button id="pokedex-classic" type="button" class="Pokedex" @click="nav(this);">Pokedex Classic</button>
                <button id="pokedex-advanced" type="button" class="Pokedex" @click="nav(this);">Pokedex Advanced</button>
                <button id="about" type="button" @click="nav(this);">About</button> -->
            </nav>
        </header>
        <main>
            <Main/>
            <!-- <div id="app"></div>
            <script type="module" src="/src/main.js"></script> -->
        </main>
    <footer><p>Made by Théo Dancoisne during an internship at <a href="https://www.oeilpouroeil.fr/">Oeil Pour Oeil</a></p></footer>
</template>

<script setup>
import { ref, reactive, watch, shallowRef } from "vue";
import Pokedex_classic from "./Pokedex_classic.vue";
import Pokedex_advanced from "./Pokedex_advanced.vue";

const apps = [Pokedex_classic, Pokedex_advanced];
const Main = shallowRef(apps[0]);
const Pages = reactive(
    {
        home: {
            text: "Home",
            id: "home",
            class: null,
            goto: null,
            is_selected: "",
        },
        pokedexClassic: {
            text: "Pokedex Classic",
            id: "pokedex-classic",
            class: "Pokedex",
            goto: Pokedex_classic,
            is_selected: "is_selected",
        },
        pokedexAdvanced: {
            text: "Pokedex Advanced",
            id: "pokedex-advanced",
            class: "Pokedex",
            goto: Pokedex_advanced,
            is_selected: "",
        },
        about: {
            text: "About",
            id: "about",
            class: null,
            goto: null,
            is_selected: "",
        },
    }
);

function Switch(index) {
    Main.value = apps[index];
}

function nav(node) {
    console.log(node);
    const buttons = document.getElementById("navbar").getElementsByTagName("button");
    Object.values(buttons).forEach(element => {
        element.removeAttribute("is_selected");
    });
    node.setAttribute("is_selected", "");
    switch (node.id) {
        case "home":
            console.log("nothing for the moment");
            break;
        case "pokedex-classic":
            window.Switch(0);
            break;
        case "pokedex-advanced":
            window.Switch(1);
            break;
        case "about":
            console.log("nothing for the moment");
            break;
    }
}
</script>