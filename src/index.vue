<template>
    <span id="pokeball_background"></span>
        <header>
            <nav id="navbar">
                <template v-for="(page, key) in Pages">
                    <!-- <button :id="page.id" :class="page.class" :style="page.bg_img_selected">{{page.text}}</button> -->
                    <button :id="page.id" :class="[page.class, (page.isSelected)?'selected':'']" :style="[(page.isSelected)?page.bg_img_selected:page.bg_img]" @click="switchPage(key);">{{page.text}}</button>
                </template>
            </nav>
        </header>
        <main>
            <Main />
        </main>
    <footer><p>Made by Théo Dancoisne during an internship at <a href="https://www.oeilpouroeil.fr/">Oeil Pour Oeil</a></p></footer>
</template>

<script setup>
import { ref, reactive, watch, shallowRef, defineAsyncComponent } from "vue";
const Pokedex_classic = defineAsyncComponent(() => import("./Pokedex_classic.vue"));
const Pokedex_advanced = defineAsyncComponent(() => import("./Pokedex_advanced.vue"));


const Pages = reactive(
    {
        home: {
            text: "Home",
            id: "home",
            class: null,
            goto: {},
            isSelected: false,
            bg_img: {"background-image": "url(/src/ressources/images/home_grey.png)"},
            bg_img_selected: {"background-image": "url(/src/ressources/images/home_red.png)"},
        },
        pokedexClassic: {
            text: "Pokedex Classic",
            id: "pokedex-classic",
            class: "Pokedex",
            goto: shallowRef(Pokedex_classic),
            isSelected: true,
            bg_img: {"background-image": "url(/src/ressources/images/pokeball_grey.png)"},
            bg_img_selected: {"background-image": "url(/src/ressources/images/pokeball_red.png)"},
        },
        pokedexAdvanced: {
            text: "Pokedex Advanced",
            id: "pokedex-advanced",
            class: "Pokedex",
            goto: shallowRef(Pokedex_advanced),
            isSelected: false,
            bg_img: {"background-image": "url(/src/ressources/images/pokeball_grey.png)"},
            bg_img_selected: {"background-image": "url(/src/ressources/images/pokeball_red.png)"},
        },
        about: {
            text: "About",
            id: "about",
            class: null,
            goto: {},
            isSelected: false,
            bg_img: {"background-image": "url(/src/ressources/images/news_grey.png)"},
            bg_img_selected: {"background-image": "url(/src/ressources/images/news_red.png)"},
        },
    }
);
const Main = shallowRef(Pages.pokedexClassic.goto);

function switchPage(key) {
    Object.values(Pages).forEach(element => {
        element.isSelected = false;
    });
    Pages[key].isSelected = true;
    Main.value = Pages[key].goto;
}
</script>
