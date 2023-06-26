<script setup>
import { useThemeStore } from '../stores/theme'
import { ref, reactive } from 'vue'
import Heading2 from '@/components/Heading2.vue'
import Metric from '@/components/Metric.vue'
import NavigationRail from '@/components/NavigationRail.vue';
import Hero from '@/sections/Hero.vue';
import Icon from '@/components/Icon.vue';
import CollectionHorizontal from '@/components/CollectionHorizontal.vue';
import Heading4 from '@/components/Heading4.vue';

const theme = useThemeStore()
theme.setScheme('st')

const grades = ref()
const input = ref()

let list = ref([])
let valueArray = ref([])
let valuesSufficient = ref([])
let valuesInsufficient = ref([])
let importedDate = ref('')
let current = ref({ result: '', weight: '', column: '', title: '' })

function fileChanged(event) {
    list.value = []
    valueArray.value = []
    valuesSufficient.value = []
    valuesInsufficient.value = []
    importedDate.value = ''
    current.value = { result: '', weight: '', column: '', title: '' }
    let reader = new FileReader()
    reader.onload = async event => {
        let json = JSON.parse(event.target.result)
        list.value.push(
            ...json.list
                .reduce((acc, e) => {
                    if (e.type === "rowheader") {
                        acc.push([])
                    }
                    acc[acc.length - 1].push(e)

                    let string = e.result?.replace(',', '.'),
                        number = Number(string)
                    if ((!e.className.includes('gemiddeldecolumn') || e.className.includes('herkansingKolom') || e.className.includes('heeftonderliggendekolommen')) && !isNaN(number)) {
                        valueArray.value.push(number)
                        if (number >= 5.5) valuesSufficient.value.push(number)
                        else valuesInsufficient.value.push(number)
                    }

                    return acc
                }, [[]])
        )

        console.log((valueArray))

        importedDate.value = new Date(json.date).toLocaleString('nl-NL', {
            weekday: "long", year:
                "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric"
        })
    }
    reader.readAsText(event.target.files[0])
}

function weightedMean(valueArray = [], weightArray = []) {
    let result = valueArray.map((value, i) => {
        let weight = weightArray[i] ?? 1,
            sum = value * weight
        return [sum, weight]
    }).reduce((p, c) => {
        return [p[0] + c[0], p[1] + c[1]]
    }, [0, 0])
    return (result[0] / result[1])
}

function median(valueArray = []) {
    let values = [...valueArray].sort()
    var half = Math.floor(values.length / 2)
    if (values.length % 2) return values[half]
    return (values[half - 1] + values[half]) / 2.0
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
                <Button icon="upload_file" class="hero" onclick="input.click()">{{ $i18n('Import grades') }}</Button>
                <input type="file" accept=".json" @change="fileChanged"
                    @input="grades.scrollIntoView({ behavior: 'smooth' })" ref="input" id="input" style="display: none;">
            </CollectionHorizontal>
            <Icon>school</Icon>
        </Hero>
        <section ref="grades" id="grades">
            <Heading2 icon="summarize">Cijferoverzicht</Heading2>
            <CollectionHorizontal stretch uniform id="grade-actions" wrap>
                <Button icon="upload_file" onclick="input.click()">{{ $i18n('Import grades') }}</Button>
                <Button icon="calculate" onclick="alert('Komt binnenkort!')">Cijfercalculator</Button>
            </CollectionHorizontal>
            <div id="grades-wrapper">
                <div id="table-wrapper">
                    <table>
                        <tr v-for="(row) in list">
                            <td v-for="(cell) in row" :class="cell.className">
                                <span :tabindex="cell.result ? 1 : -1"
                                    :aria-label="cell.result ? (`${(cell.className.includes('gemiddeldecolumn') ? 'Gemiddeld ' : '') + cell.result} voor ${row[0].title}. Titel: ${cell.title}. Kolom: ${cell.column}. Telt ${cell.weight} keer mee.`) : 'Lege cel'"
                                    :title="`${cell.result}\n${cell.title}`"
                                    @focus="current = { result: cell.result, weight: cell.weight, column: cell.column, title: cell.title }">{{
                                        cell.type === 'rowheader' ? cell.title : cell.result }}</span>
                            </td>
                        </tr>
                    </table>
                    <p v-show="list.length === 0">Je cijferoverzicht zal hier verschijnen wanneer je deze hebt geüpload met
                        de knop "{{ $i18n('Import grades') }}".</p>
                </div>
                <aside>
                    <div id="meta">
                        <Heading4>Details</Heading4>
                        <p v-if="importedDate && list.length > 0">Geïmporteerd uit back-up van {{ importedDate }}</p>
                        <p v-else>Als je je back-up hebt geïmporteerd, dan zullen hier aanvullende details
                            en statistieken verschijnen.</p>
                    </div>
                    <div id="grade-details" v-show="list.length > 0">
                        <CollectionHorizontal stretch uniform wrap>
                            <Metric description="Resultaat" stretch> {{ current.result || '?' }} </Metric>
                            <Metric description="Weegfactor" insignificant> {{ current.weight || '?' }} </Metric>
                            <Metric description="Kolomnaam" insignificant> {{ current.column || '?' }} </Metric>
                            <Metric description="Kolomkop" insignificant stretch> {{ current.title || "Klik op een cijfer"
                            }}
                            </Metric>
                        </CollectionHorizontal>
                    </div>
                    <div id="grade-stats" v-show="list.length > 0">
                        <Heading4 icon="l">Statistieken</Heading4>
                        <CollectionHorizontal stretch uniform wrap>
                            <Metric description="Gemiddelde (excl. weging)">{{
                                weightedMean(valueArray).toLocaleString('nl-NL', {
                                    minimumFractionDigits: 3,
                                    maximumFractionDigits: 3
                                }) }}</Metric>
                            <Metric description="Mediaan" insignificant>{{
                                median(valueArray).toLocaleString('nl-NL', {
                                    minimumFractionDigits: 1,
                                    maximumFractionDigits: 1
                                }) }}</Metric>
                            <Metric description="Aantal" insignificant>{{ valueArray.length }}</Metric>
                            <Metric description="Voldoendes" insignificant
                                :extra="valuesSufficient.length ? (valuesSufficient.length / valueArray.length * 100).toLocaleString('nl-NL', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '%' : ''">
                                {{ valuesSufficient.length || "geen" }}</Metric>
                            <Metric description="Onvoldoendes" insignificant
                                :extra="valuesInsufficient.length ? (valuesInsufficient.length / valueArray.length * 100).toLocaleString('nl-NL', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '%' : ''">
                                {{ valuesInsufficient.length || "geen" }}
                            </Metric>
                            <Metric description="Laagste cijfer" insignificant>{{
                                Math.min(...valueArray).toLocaleString('nl-NL', {
                                    minimumFractionDigits: 1,
                                    maximumFractionDigits: 1
                                }) }}</Metric>
                            <Metric description="Hoogste cijfer" insignificant>{{
                                Math.max(...valueArray).toLocaleString('nl-NL', {
                                    minimumFractionDigits: 1,
                                    maximumFractionDigits: 1
                                }) }}</Metric>
                        </CollectionHorizontal>
                    </div>
                </aside>
            </div>
        </section>
    </main>
</template>

<style>
@import "../assets/css/base.css";

#grades {
    display: grid;
    grid-template:
        'heading actions actions' auto
        'content content content' 1fr
        / 1fr auto 300px;
}

#grade-actions {
    grid-area: actions;
}

#grades-wrapper {
    grid-area: content;
    display: grid;
    grid-template:
        'table aside' 100%
        / 1fr 300px;
    gap: 1.5rem;
}

aside {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--border);
    overflow-y: auto;
}

aside>* {
    padding: 1rem;
}

aside>*+* {
    border-top: 1px solid var(--border);
}

#table-wrapper {
    overflow: auto;
}

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
    white-space: nowrap;
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

td.text>span {
    white-space: nowrap;
}

td.grade:not(.empty)>span {
    cursor: pointer;
}

td>span:focus {
    outline: 3px solid var(--accentVeryLight);
}

td.grade>span[title^="5,0"],
td.grade>span[title^="5,1"],
td.grade>span[title^="5,2"],
td.grade>span[title^="5,3"],
td.grade>span[title^="5,4"],
td.grade>span[title^="1,"],
td.grade>span[title^="2,"],
td.grade>span[title^="3,"],
td.grade>span[title^="4,"] {
    color: #e94f4f !important;
    font-weight: 700;
}

td.grade.herkansingKolom.heeftonderliggendekolommen,
td.grade.vrijstellingcolumn {
    background-color: var(--bgHighlight);
}

td.grade.gemiddeldecolumn {
    background-color: var(--bgPositive);
}
</style>