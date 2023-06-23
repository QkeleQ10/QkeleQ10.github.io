<script setup>
import { useThemeStore } from '../stores/theme'
import { ref, reactive } from 'vue'
import Heading2 from '@/components/Heading2.vue'
import Metric from '@/components/Metric.vue'
import NavigationRail from '@/components/NavigationRail.vue';
import Hero from '@/sections/Hero.vue';
import Icon from '@/components/Icon.vue';
import CollectionHorizontal from '@/components/CollectionHorizontal.vue';

const theme = useThemeStore()
theme.setScheme('st')

const grades = ref()
const input = ref()

let list = ref([])
let current = ref({ result: '', weight: '', column: '', title: '' })

function fileChanged(event) {
    list.value = []
    let reader = new FileReader()
    reader.onload = async event => {
        let json = JSON.parse(event.target.result)
        list.value.push(
            ...json.list
                .reduce((acc, obj) => {
                    if (obj.type === "rowheader") {
                        acc.push([])
                    }
                    acc[acc.length - 1].push(obj)
                    return acc
                }, [[]])
        )

        // aside.innerText = "Geïmporteerd uit back-up van " + new Date(json.date).toLocaleString('nl-NL', {
        //     weekday: "long",
        //     year: "numeric",
        //     month: "long",
        //     day: "numeric",
        //     hour: "numeric",
        //     minute: "numeric"
        // })
    }
    reader.readAsText(event.target.files[0])
}
</script>

<template>
    <NavigationRail />
    <main>
        <Hero>
            <div>
                <h1 class="section-title">Cijferback-up</h1>
                <p class="section-about">Importeer je eerder geback-upte cijferoverzicht met onderstaande knop.</p>
            </div>
            <CollectionHorizontal id="hero-buttons">
                <Button icon="upload_file" class="hero" onclick="input.click()">Importeren</Button>
                <input type="file" accept=".json" @change="fileChanged"
                    @input="grades.scrollIntoView({ behavior: 'smooth' })" ref="input" id="input" style="display: none;">

            </CollectionHorizontal>
            <Icon>school</Icon>
        </Hero>
        <section ref="grades" id="grades">
            <Heading2 icon="summarize">Cijferoverzicht</Heading2>
            <div id="table-wrapper">
                <table>
                    <tr v-for="(row) in list">
                        <td v-for="(cell) in row" :class="cell.className" :data-result="cell.result"
                            :data-weight="cell.weight" :data-column="cell.column" :data-title="cell.title"
                            @click="current = { result: cell.result, weight: cell.weight, column: cell.column, title: cell.title }">
                            <span>{{ cell.type === 'rowheader' ? cell.title : cell.result }}</span>
                        </td>
                    </tr>
                </table>
                <p v-show="list.length === 0">Upload je cijferoverzicht met de knop "Importeren".</p>
            </div>
            <div id="details-wrapper">
                <div id="grade-metrics" v-show="current.result || current.weight || current.column || current.title">
                    <CollectionHorizontal stretch uniform>
                        <Metric description="Resultaat"> {{ current.result }} </Metric>
                        <Metric description="Weegfactor" class="insignificant"> {{ current.weight }} </Metric>
                        <Metric description="Kolomnaam" class="insignificant"> {{ current.column }} </Metric>
                    </CollectionHorizontal>
                    <Metric description="Kolomkop" class="insignificant"> {{ current.title }} </Metric>
                </div>
                <CollectionHorizontal stretch uniform id="grade-actions">
                    <Button icon="upload_file" onclick="input.click()">Importeren</Button>
                    <Button icon="calculate" onclick="alert('bijna')">Cijfercalculator</Button>
                </CollectionHorizontal>
                <div id="grade-stats">
                    Statistieken komen hier
                </div>
            </div>
        </section>
    </main>
</template>

<style>
@import "../assets/css/base.css";

table {
    border-spacing: 0px 6px;
    border-collapse: collapse;
}

tr {
    background-color: var(--tablePrimary);
}

tr:first-child {
    display: none;
}

td {
    border: 1px solid var(--border);
    padding: 0;
}

td:last-child {
    display: none;
}

td.text {
    padding: 0 6px;
}

td.text>span {
    font: 600 12px/40px 'Segoe UI', system-ui;
}

td.grade.empty {
    background-color: var(--tableEmpty);
}

td.grade>span {
    display: block;
    width: 40px;
    height: 40px;
    box-sizing: border-box;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
    font: 400 12px/40px 'Segoe UI', system-ui;
}

td.grade:not(.empty)>span {
    cursor: pointer;
}


td.grade.herkansingKolom.heeftonderliggendekolommen,
td.grade.vrijstellingcolumn {
    background-color: var(--bgHighlight);
}

#details-wrapper {
    display: grid;
    grid-template:
        "metrics stats" auto
        "actions stats" auto
        / 30% 1fr;
        gap: 32px;
}

#details-wrapper>#grade-metrics {
    grid-area: metrics;
    display: flex;
    flex-direction: column;
    gap: 32px;
}

#details-wrapper>#grade-actions {
    grid-area: actions;
}

#details-wrapper>#grade-stats {
    grid-area: stats;
}
</style>