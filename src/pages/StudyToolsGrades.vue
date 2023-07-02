<script setup>
import { useThemeStore } from '../stores/theme'
import { ref, computed } from 'vue'

import Card from '@/components/Card.vue'
import Heading2 from '@/components/Heading2.vue'
import Metric from '@/components/Metric.vue'
import NavigationRail from '@/components/NavigationRail.vue';
import Hero from '@/sections/Hero.vue';
import Icon from '@/components/Icon.vue';
import CollectionHorizontal from '@/components/CollectionHorizontal.vue';
import CollectionVertical from '@/components/CollectionVertical.vue'

const theme = useThemeStore()
theme.setScheme('st')

const grades = ref()
const input = ref()
const container = ref()

let mode = ref(0)
let list = ref([])
let importedDate = ref('')
let gradesArray = computed(() => {
    let results = []
    list.value.forEach((subArray, i) => {
        if (excludedSubjects.value.has(i)) return
        for (let obj of subArray) {
            let num = Number(obj.result?.replace(',', '.')),
                type = obj.className
            if ((!type?.includes('gemiddeldecolumn') || type?.includes('herkansingKolom') || type?.includes('heeftonderliggendekolommen')) && typeof num === 'number' && !isNaN(num)) {
                results.push(num)
            }
        }
    })
    return results
})
let gradesOkArray = computed(() => gradesArray.value.filter(e => e >= 5.5))
let gradesWarnArray = computed(() => gradesArray.value.filter(e => e < 5.5))
let gradesFrequencyTable = computed(() => {
    const roundedNumbers = gradesArray.value.map((number) => Math.round(number))
    const frequencyTable = {}
    for (let i = 1; i <= 10; i++) { frequencyTable[i] = 0 }
    roundedNumbers.forEach((number) => {
        if (number >= 1 && number <= 10) {
            frequencyTable[number]++
        }
    })
    return frequencyTable
})
let excludedSubjects = ref(new Set())
let currentlySelected = ref({ result: '', weight: '', column: '', title: '' })
let calculatorSelection = ref([])

function changeSelection(result, weight, column, title) {
    if (result?.length > 0) currentlySelected.value = { result, weight, column, title }

    if (mode.value === 'mixed' || mode.value === 'calculator') {
        if (result?.length > 0 && Number(result.replace(',', '.'))) {
            let indexOfExisting = calculatorSelection.value.findIndex(e => e.result === Number(result.replace(',', '.')) && e.weight === Number(weight) && e.column === column && e.title === title)
            if (indexOfExisting >= 0) calculatorSelection.value.splice(indexOfExisting, 1)
            else calculatorSelection.value.push({ result: Number(result.replace(',', '.')), weight: Number(weight), column, title })
        }
    }
}

function excludeSubject(i) {
    excludedSubjects.value.has(i) ? excludedSubjects.value.delete(i) : excludedSubjects.value.add(i)
}

function excludeAllSubjects() {
    list.value.forEach((e, i) => {
        excludedSubjects.value.has(i) ? excludedSubjects.value.delete(i) : excludedSubjects.value.add(i)
    })
}

function fileChanged(event) {
    list.value = []
    importedDate.value = ''
    excludedSubjects.value.clear()
    currentlySelected.value = { result: '', weight: '', column: '', title: '' }
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

                    return acc
                }, [[]])
        )

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
    let res = (result[0] / result[1])
    return isNaN(res) ? undefined : res
}

function median(valueArray = []) {
    let values = [...valueArray].sort()
    var half = Math.floor(values.length / 2)
    if (values.length % 2) return values[half]
    let res = (values[half - 1] + values[half]) / 2.0
    return isNaN(res) ? undefined : res
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
                <Button icon="upload_file" class="hero" @click="input.click()">{{ $i18n('Import grades') }}</Button>
                <input type="file" accept=".json" @change="fileChanged"
                    @input="grades.scrollIntoView({ behavior: 'smooth' })" ref="input" id="input" style="display: none;">
            </CollectionHorizontal>
            <Icon>school</Icon>
        </Hero>
        <section ref="grades" id="grades" class="full max-full">
            <Heading2 icon="summarize">Cijferoverzicht</Heading2>
            <CollectionHorizontal stretch uniform id="grade-actions" wrap>
                <Button icon="calculate" title="Cijfercalculator"
                    @click="mode ^= 1; calculatorSelection = []">Cijfercalculator</Button>
                    <!-- add a button like the theme switcher, so that the user can toggle modes -->
                <Button icon="upload_file" :title="$i18n('Import grades')" class="secondary"
                    @click="input.click()"></Button>
                <Button icon="info" class="secondary" title="Zijbalk weergeven of verbergen"
                    @click="container.classList.toggle('hide-aside')"></Button>
                <Button icon="deselect" class="secondary" title="Selectie omkeren" @click="excludeAllSubjects()"></Button>
            </CollectionHorizontal>
            <div ref="container" id="container">
                <div id="table-wrapper">
                    <table>
                        <tr v-for="(row, i) in list" :data-excluded="excludedSubjects.has(i)" :key="i">
                            <td v-for="(cell) in row" :class="cell.className" :key="cell.column">
                                <span :tabindex="cell.result ? 1 : -1" role="button"
                                    :aria-label="cell.result ? (`${(cell.className.includes('gemiddeldecolumn') ? 'Gemiddeld ' : '') + cell.result} voor ${row[0].title}. Titel: ${cell.title}. Kolom: ${cell.column}. Telt ${cell.weight} keer mee.`) : 'Lege cel'"
                                    :title="`${cell.result || 'Lege cel'}\n${cell.title || 'Geen kolomkop'}`"
                                    :data-current="currentlySelected.result === cell.result && currentlySelected.weight === cell.weight && currentlySelected.column === cell.column && currentlySelected.title === cell.title"
                                    :data-included="calculatorSelection.some(e => e.result === Number(String(cell.result).replace(',', '.')) && e.weight === Number(cell.weight) && e.column === cell.column && e.title === cell.title)"
                                    @click="changeSelection(cell.result, cell.weight, cell.column, cell.title)"
                                    @keyup.enter="changeSelection(cell.result, cell.weight, cell.column, cell.title)"
                                    @keyup.space="changeSelection(cell.result, cell.weight, cell.column, cell.title)">
                                    {{ cell.type === 'rowheader' ? cell.title : cell.result }}
                                </span>
                                <Icon aria-hidden="false" role="button" v-if="cell.type === 'rowheader'" tabindex="1"
                                    :title="excludedSubjects.has(i) ? 'Weer aan selectie toevoegen' : 'Uit selectie verwijderen'"
                                    @click="excludeSubject(i)" @keyup.enter="excludeSubject(i)"
                                    @keyup.space="excludeSubject(i)">{{ excludedSubjects.has(i) ? 'check_box_outline_blank'
                                        : 'check_box' }}
                                </Icon>
                            </td>
                        </tr>
                    </table>
                    <p v-show="list.length === 0">Je cijferoverzicht zal hier verschijnen wanneer je deze hebt geüpload met
                        de knop "{{ $i18n('Import grades') }}".</p>
                </div>
                <CollectionVertical id="aside">
                    <Card id="meta" v-show="mode === 'mixed' || mode === 'stats'" small>
                        <template #title>Details</template>
                        <template #subtitle v-if="importedDate && list.length > 0">Gegevens geïmporteerd uit back-up van
                            {{ importedDate }}</template>
                        <template #subtitle v-else>Wanneer je je back-up hebt geïmporteerd zullen hier aanvullende
                            details
                            en statistieken verschijnen.</template>
                        <template #content>
                            <CollectionHorizontal stretch uniform wrap v-show="list.length > 0">
                                <Metric description="Resultaat" stretch> {{ currentlySelected.result || '?' }} </Metric>
                                <Metric description="Weegfactor" insignificant> {{ currentlySelected.weight || '?' }}×
                                </Metric>
                                <Metric description="Kolomnaam" insignificant> {{ currentlySelected.column || '?' }}
                                </Metric>
                                <Metric description="Kolomkop" insignificant stretch>
                                    {{ currentlySelected.title || "Klik op een cijfer" }}
                                </Metric>
                            </CollectionHorizontal>
                        </template>
                    </Card>
                    <Card id="grade-stats" v-if="list.length > 0" v-show="mode === 'stats'" small>
                        <template #title>Statistieken</template>
                        <template #content>
                            <CollectionHorizontal stretch uniform wrap>
                                <Metric description="Gemiddelde (excl. weging)">{{
                                    weightedMean(gradesArray)?.toLocaleString('nl-NL', {
                                        minimumFractionDigits: 3,
                                        maximumFractionDigits: 3
                                    }) || '?' }}</Metric>
                                <Metric description="Mediaan" insignificant>{{
                                    median(gradesArray)?.toLocaleString('nl-NL', {
                                        minimumFractionDigits: 1,
                                        maximumFractionDigits: 1
                                    }) || '?' }}</Metric>
                                <Metric description="Aantal" insignificant>{{ gradesArray.length }}</Metric>
                                <Metric description="Voldoendes" insignificant
                                    :extra="gradesOkArray.length ? (gradesOkArray.length / gradesArray.length * 100).toLocaleString('nl-NL', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '%' : ''">
                                    {{ gradesOkArray.length || "geen" }}</Metric>
                                <Metric description="Onvoldoendes" insignificant
                                    :extra="gradesWarnArray.length ? (gradesWarnArray.length / gradesArray.length * 100).toLocaleString('nl-NL', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '%' : ''">
                                    {{ gradesWarnArray.length || "geen" }}
                                </Metric>
                                <Metric description="Laagste cijfer" insignificant>{{
                                    Math.min(...gradesArray).toLocaleString('nl-NL', {
                                        minimumFractionDigits: 1,
                                        maximumFractionDigits: 1
                                    }) }}</Metric>
                                <Metric description="Hoogste cijfer" insignificant>{{
                                    Math.max(...gradesArray).toLocaleString('nl-NL', {
                                        minimumFractionDigits: 1,
                                        maximumFractionDigits: 1
                                    }) }}</Metric>
                            </CollectionHorizontal>
                            <Metric id="bar-chart-title" description="Histogram (afgeronde behaalde cijfers)"></Metric>
                            <div id="bar-chart">
                                <div v-for="n in 10" :data-grade="n" :data-frequency="gradesFrequencyTable[n]"
                                    :data-percentage="Math.round(gradesFrequencyTable[n] / gradesArray.length * 100)"
                                    :style="`min-height: ${(gradesFrequencyTable[n] / Math.max(...Object.values(gradesFrequencyTable)) * 100) || 0}%; max-height: ${(gradesFrequencyTable[n] / Math.max(...Object.values(gradesFrequencyTable)) * 100) || 0}%`">
                                </div>
                            </div>
                        </template>
                    </Card>
                    <Card id="calculator-added" v-if="list.length > 0" v-show="mode === 'mixed' || mode === 'calculator'"
                        small>
                        <template #title>Toegevoegde cijfers</template>
                        <template #content>
                            <ul>
                                <p v-if="calculatorSelection.length < 1">Klik op de cijfers die je wilt
                                    toevoegen aan de berekening.</p>
                                <li v-for="(item, i) in calculatorSelection" :key="item.column" tabindex="1" role="button"
                                    @click="calculatorSelection.splice(i, 1)"
                                    @keyup.enter="calculatorSelection.splice(i, 1)"
                                    @keyup.space="calculatorSelection.splice(i, 1)">
                                    {{ `${item.result.toLocaleString('nl-NL', {
                                        minimumFractionDigits: 1,
                                        maximumFractionDigits: 1
                                    })} (${item.weight}×) — ${item.column}, ${item.title}` }}
                                </li>
                            </ul>
                        </template>
                    </Card>
                    <Card id="calculator-result" v-if="list.length > 0" v-show="mode === 'mixed' || mode === 'calculator'"
                        small>
                        <template #content>
                            <CollectionHorizontal stretch uniform wrap>
                                <Metric description="Gemiddelde (incl. weging)">{{
                                    weightedMean(calculatorSelection.map(e => e.result), calculatorSelection.map(e =>
                                        e.weight))?.toLocaleString('nl-NL',
                                            { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '?' }}</Metric>
                                <Metric description="Mediaan">{{
                                    median(calculatorSelection.map(e => e.result))?.toLocaleString('nl-NL',
                                        { minimumFractionDigits: 1, maximumFractionDigits: 1 }) || '?' }}</Metric>
                            </CollectionHorizontal>
                        </template>
                    </Card>
                    <Card id="calculator-chart" v-if="list.length > 0" v-show="mode === 'mixed' || mode === 'calculator'"
                        small>
                        <template #title>Toekomstig cijfer</template>
                        <template #subtitle>Zie hier wat je moet halen en wat je komt te staan.</template>
                        <template #content>Komt binnenkort!np</template>
                    </Card>
                </CollectionVertical>
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

#container {
    grid-area: content;
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 1.5rem;
    overflow: hidden;
    transition: grid-template-columns 200ms, gap 200ms;
}

#container.hide-aside {
    grid-template-columns: 1fr 0px;
    gap: 0;
}

#aside {
    width: 300px;
    overflow-y: auto;
}

#calculator-added ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

#calculator-added ul>li:not(:last-child) {
    margin-bottom: 6px;
}

#calculator-result {
    padding-top: 7px;
}

#bar-chart-title {
    margin-top: 24px;
}

#bar-chart {
    display: flex;
    justify-content: space-between;
    align-items: end;
    gap: 4px;
    width: 100%;
    height: 150px;
    padding-block: 32px 16px;
}

#bar-chart>* {
    position: relative;
    flex: 1 1;
    background-color: var(--accentOk);
    transition-property: min-height, max-height;
    transition-duration: 200ms;
}

#bar-chart>*:nth-child(-n+5) {
    background: var(--accentWarn);
}

#bar-chart>*:after {
    content: attr(data-grade);
    position: absolute;
    bottom: -20px;
    left: 50%;
    translate: -50%;
    font-size: 12px;
    opacity: 0.6;
}

#bar-chart>*:before {
    content: attr(data-frequency) '×';
    position: absolute;
    top: -20px;
    left: 50%;
    translate: -50%;
    font-size: 12px;
}

#bar-chart>*:hover:before {
    content: attr(data-percentage) '%';
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
    transition: opacity 200ms;
}

tr:first-child {
    display: none;
}

tr[data-excluded=true] {
    opacity: .5;
}

td {
    border: 1px solid var(--border);
    padding: 0;
}

td:last-child {
    display: none;
}

td.text {
    position: relative;
    padding: 0 6px;
    white-space: nowrap;
    overflow: hidden;
}

td.text>span:first-child {
    font: 600 12px/40px 'Segoe UI', system-ui;
}

td.text>.icon {
    position: absolute;
    right: 8px;
    top: 50%;
    translate: 150% -50%;
    transition: translate 200ms, color 200ms;
    color: var(--fgTertiary);
    background: var(--tablePrimary);
    cursor: pointer;
}

tr:hover>td.text>.icon,
tr:focus-within>td.text>.icon,
tr[data-excluded=true]>td.text>.icon {
    translate: 0 -50%;
}

td.text>.icon:hover,
td.text>.icon:focus {
    color: var(--accentDark);
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
    box-shadow: inset 0px 0px 0px 0px transparent;
    transition: box-shadow 200ms;
}

td.text>span {
    white-space: nowrap;
}

td.grade:not(.empty)>span {
    cursor: pointer;
}

td.grade>span[data-current=true] {
    box-shadow: inset 0px 0px 0px 2px var(--accentLight);
}

td.grade>span[data-included=true] {
    box-shadow: inset 0px 0px 0px 3px var(--accentOk);
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


@media (max-width: 620px) {
    #grades {
        display: grid;
        grid-template:
            'heading' auto
            'actions' auto
            'content' 1fr
            / 1fr;
    }
}
</style>