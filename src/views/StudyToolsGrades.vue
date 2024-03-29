<script setup>
import { useMeta } from 'vue-meta'
import { useThemeStore } from '../stores/theme'
import { ref, computed } from 'vue'

import Card from '@/components/Card.vue'
import Heading2 from '@/components/Heading2.vue'
import Metric from '@/components/Metric.vue'
import Icon from '@/components/Icon.vue';
import CollectionHorizontal from '@/components/CollectionHorizontal.vue';

useMeta({ title: "Cijferback-up | Study Tools" })

const theme = useThemeStore()
theme.setScheme('st')

const grades = ref()
const input = ref()
const container = ref()

let asideVisible = ref(window.innerWidth < 1000 ? false : true)
let view = ref({
    meta: { state: true, title: "Details", icon: 'info', requiresOne: true },
    stats: { state: true, title: "Statistieken", icon: 'analytics', requiresOne: true, disallow: 'calculator' },
    calculator: { state: false, title: "Cijfercalculator", icon: 'calculate', requiresOne: true, disallow: 'stats' }
})
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
let calculatorHovering = ref({ x: 0, y: 0 })
let hypotheticalWeight = ref(1)
let hypotheticalResultMean = computed(() => {
    return weightedMean(
        calculatorSelection.value.map(e => e.result),
        calculatorSelection.value.map(e => e.weight)
    )
})
let hypotheticalPossibilities = computed(() => {
    let array = []
    for (let i = 0, x = 1.0; x < 10.0; i++, x = x + 0.1) {
        array[i] = {
            x,
            y: weightedMean(
                calculatorSelection.value.map(e => e.result).concat([x]),
                calculatorSelection.value.map(e => e.weight).concat([hypotheticalWeight.value])
            ) || 0
        }
    }
    return array
})
let hypotheticalMinGrade = computed(() => {
    return hypotheticalPossibilities.value.find(e => e.y >= 5.45) || { x: 0, y: 0 }
})

function changeSelection(result, weight, column, title) {
    if (result?.length > 0) currentlySelected.value = { result, weight, column, title }

    if (view.value.calculator.state) {
        if (result?.length > 0 && Number(result.replace(',', '.'))) {
            let indexOfExisting = calculatorSelection.value.findIndex(e => e.result === Number(result.replace(',', '.')) && e.weight === Number(weight) && e.column === column && e.title === title)
            if (indexOfExisting >= 0) calculatorSelection.value.splice(indexOfExisting, 1)
            else calculatorSelection.value.push({ result: Number(result.replace(',', '.')), weight: Number(weight), column, title })
        }
    }
}

function flipViewState(key) {
    let value = view.value[key]
    view.value[key].state = !value.state
    if (value.state && value.disallow) view.value[value.disallow].state = false
    if (Object.values(view.value).filter(obj => obj.requiresOne === true).every(obj => !obj.state)) Object.values(view.value).filter(obj => obj.requiresOne === true)[0].state = true
}

function excludeSubject(i) {
    excludedSubjects.value.has(i) ? excludedSubjects.value.delete(i) : excludedSubjects.value.add(i)
}

function invertSubjectSelection(override) {
    if (override) excludedSubjects.value.clear()
    else list.value.forEach((e, i) => {
        if (i === 0) return
        excludedSubjects.value.has(i) ? excludedSubjects.value.delete(i) : excludedSubjects.value.add(i)
    })
}

function fileChanged(event) {
    list.value = []
    importedDate.value = ''
    excludedSubjects.value.clear()
    currentlySelected.value = { result: '', weight: '', column: '', title: '' }
    calculatorSelection.value = []
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
    <Teleport to="#hero-title">Cijferback-up</Teleport>
    <Teleport to="#hero-description">
        Importeer je eerder geback-upte cijferoverzicht met onderstaande knop.
    </Teleport>
    <Teleport to="#hero-buttons">
        <Button icon="upload" class="hero" @click="input.click()">{{ $i18n('Import grades') }}</Button>
        <input type="file" accept="application/JSON" @change="fileChanged"
            @input="grades.scrollIntoView({ behavior: 'smooth' })" ref="input" id="input" style="display: none;">
    </Teleport>
    <Teleport to="#hero-icon">
        <Icon>school</Icon>
    </Teleport>

    <section ref="grades" id="grades" :class="asideVisible ? 'full max-full' : 'full max-full hide-aside'">
        <Heading2 icon="summarize" v-if="view.calculator.state">Cijfercalculator</Heading2>
        <Heading2 icon="summarize" v-else>Cijferoverzicht</Heading2>
        <TransitionGroup name="horizontal" tag="div" class="collection-horizontal no-row-gap wrap" id="grade-actions">
            <Button key="select-empty" icon="deselect" class="secondary" title="Alles deselecteren"
                @click="invertSubjectSelection()"
                v-if="list.length > 0 && excludedSubjects.size === 0 && !view.calculator.state">
                Alles deselecteren
            </Button>
            <Button key="select-all" icon="select_all" class="secondary" title="Alles selecteren"
                @click="invertSubjectSelection(true)"
                v-else-if="list.length > 0 && excludedSubjects.size > 0 && !view.calculator.state">
                Alles selecteren
            </Button>
            <Button key="select-invert" icon="indeterminate_check_box" class="secondary" title="Selectie omkeren"
                @click="invertSubjectSelection()"
                v-if="list.length > 0 && excludedSubjects.size > 0 && excludedSubjects.size < list.length - 1 && !view.calculator.state">
                Selectie omkeren
            </Button>
            <Button key="import-big" icon="upload" :title="$i18n('Import grades')" @click="input.click()"
                v-if="list.length < 1">{{
                    $i18n('Import grades') }}</Button>
            <Button key="import-small" icon="upload" class="secondary" :title="$i18n('Import grades')"
                @click="input.click()" v-else></Button>
            <Button key="aside-toggler" role="checkbox" class="secondary" title="Zijpaneel weergeven of verbergen"
                :icon="asideVisible ? 'right_panel_close' : 'right_panel_open'" :filled="asideVisible"
                :aria-checked="asideVisible" @click="asideVisible = !asideVisible"></Button>
        </TransitionGroup>

        <div id="table-wrapper">
            <table>
                <tr v-for="(row, i) in list" :data-excluded="excludedSubjects.has(i)" :key="i">
                    <td v-for="(cell) in row" :class="cell.className" :key="cell.column">
                        <span :tabindex="cell.result ? 1 : -1" role="button"
                            :aria-label="cell.result ? (`${(cell.className.includes('gemiddeldecolumn') ? 'Gemiddeld ' : '') + cell.result} voor ${row[0].title}. Titel: ${cell.title}. Kolom: ${cell.column}. Telt ${cell.weight} keer mee.`) : 'Lege cel'"
                            :title="`${cell.result || 'Lege cel'}\n${cell.title || 'Geen kolomkop'}`"
                            :data-current="currentlySelected.result === cell.result && currentlySelected.weight === cell.weight && currentlySelected.column === cell.column && currentlySelected.title === cell.title"
                            :data-included="view.calculator.state && calculatorSelection.some(e => e.result === Number(String(cell.result).replace(',', '.')) && e.weight === Number(cell.weight) && e.column === cell.column && e.title === cell.title)"
                            @click="changeSelection(cell.result, cell.weight, cell.column, cell.title)"
                            @keyup.enter="changeSelection(cell.result, cell.weight, cell.column, cell.title)"
                            @keyup.space="changeSelection(cell.result, cell.weight, cell.column, cell.title)">
                            {{ cell.type === 'rowheader' ? cell.title : cell.result }}
                        </span>
                        <Icon aria-hidden="false" role="button" v-if="cell.type === 'rowheader'" tabindex="1"
                            :title="excludedSubjects.has(i) ? 'Weer aan selectie toevoegen' : 'Uit selectie verwijderen'"
                            :filled="!excludedSubjects.has(i)" @click="excludeSubject(i)" @keyup.enter="excludeSubject(i)"
                            @keyup.space="excludeSubject(i)">{{ excludedSubjects.has(i)
                                ? 'crop_square'
                                : 'check_box' }}
                        </Icon>
                    </td>
                </tr>
            </table>
            <p v-show="list.length === 0">Je cijferoverzicht zal hier verschijnen wanneer je deze hebt geüpload met
                de knop "{{ $i18n('Import grades') }}".</p>
        </div>

        <TransitionGroup name="aside" tag="div" id="aside">
            <CollectionHorizontal id="view" key="view" gapless stretch uniform>
                <Button v-for="(value, key) in view" :icon="view[key].icon" :filled="view[key].state" role="checkbox"
                    class="secondary" :aria-checked="view[key].state"
                    :title="view[key].title + (view[key].state ? ` verbergen` : ` weergeven`)"
                    @click="flipViewState(key)"></Button>
            </CollectionHorizontal>
            <Card id="meta" key="meta" v-if="view.meta.state" small>
                <template #title>Details</template>
                <template #subtitle v-if="importedDate && list.length > 0">Gegevens geïmporteerd uit back-up van
                    {{ importedDate }}</template>
                <template #content>
                    <CollectionHorizontal stretch uniform wrap v-if="list.length > 0">
                        <Metric description="Resultaat" stretch> {{ currentlySelected.result || '?' }} </Metric>
                        <Metric description="Weegfactor" insignificant> {{ currentlySelected.weight > 0 ?
                            currentlySelected.weight + '×' : currentlySelected.weight === 0 ? 'formatief' : '?' }}
                        </Metric>
                        <Metric description="Kolomnaam" insignificant> {{ currentlySelected.column || '?' }}
                        </Metric>
                        <Metric description="Kolomkop" insignificant stretch>
                            {{ currentlySelected.title || "Klik op een cijfer" }}
                        </Metric>
                    </CollectionHorizontal>
                    <p v-else>Upload je cijfers om details te bekijken.</p>
                </template>
            </Card>
            <Card id="grade-stats" key="grade-stats" v-if="view.stats.state" small>
                <template #title>Statistieken</template>
                <template #content v-if="gradesArray.length > 0">
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
                <template #content v-else>
                    Er zijn geen cijfers geselecteerd.
                </template>
            </Card>
            <div id="calculator" key="calculator" v-if="view.calculator.state">
                <Card id="calculator-added" small>
                    <template #title>Toegevoegde cijfers</template>
                    <template #content>
                        <TransitionGroup name="list" tag="ul">
                            <li v-for="(item, i) in calculatorSelection" :key="item.column" tabindex="1" role="button"
                                @click="calculatorSelection.splice(i, 1)" @keyup.enter="calculatorSelection.splice(i, 1)"
                                @keyup.space="calculatorSelection.splice(i, 1)">
                                {{ `${item.result.toLocaleString('nl-NL', {
                                    minimumFractionDigits: 1,
                                    maximumFractionDigits: 1
                                })} (${item.weight}×) — ${item.column}, ${item.title}` }}
                            </li>
                            <p v-if="calculatorSelection.length < 1">
                                Klik op de cijfers die je wilt toevoegen aan de berekening.
                            </p>
                        </TransitionGroup>
                    </template>
                </Card>
                <Card id="calculator-result" small>
                    <template #content>
                        <CollectionHorizontal stretch uniform wrap>
                            <Metric description="Gemiddelde (incl. weging)">{{
                                hypotheticalResultMean?.toLocaleString('nl-NL',
                                    { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '?' }}</Metric>
                            <Metric description="Mediaan">{{
                                median(calculatorSelection.map(e => e.result))?.toLocaleString('nl-NL',
                                    { minimumFractionDigits: 1, maximumFractionDigits: 1 }) || '?' }}</Metric>
                        </CollectionHorizontal>
                    </template>
                </Card>
                <Card id="calculator-chart" small>
                    <template #title>Toekomstig cijfer</template>
                    <template #subtitle>
                        <TransitionGroup name="list">
                            <span key="hovering-increase"
                                v-if="calculatorHovering.x && calculatorHovering.y.toFixed(2) > hypotheticalResultMean.toFixed(2)">
                                Als je een {{ calculatorHovering.x.toLocaleString('nl-NL', {
                                    minimumFractionDigits: 1,
                                    maximumFractionDigits: 1
                                }) }} haalt, dan stijgt je gemiddelde tot een {{
    calculatorHovering.y.toLocaleString('nl-NL', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }) }}.
                            </span>
                            <span key="hovering-decrease"
                                v-else-if="calculatorHovering.x && calculatorHovering.y.toFixed(2) < hypotheticalResultMean.toFixed(2)">
                                Als je een {{ calculatorHovering.x.toLocaleString('nl-NL', {
                                    minimumFractionDigits: 1,
                                    maximumFractionDigits: 1
                                }) }} haalt, dan zakt je gemiddelde tot een {{
    calculatorHovering.y.toLocaleString('nl-NL', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }) }}.
                            </span>
                            <span key="hovering-same" v-else-if="calculatorHovering.x > 0">
                                Als je een {{ calculatorHovering.x.toLocaleString('nl-NL', {
                                    minimumFractionDigits: 1,
                                    maximumFractionDigits: 1
                                }) }} haalt, dan blijf je gemiddeld een {{ calculatorHovering.y.toLocaleString('nl-NL',
    {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }) }} staan.
                            </span>
                            <span key="sufficient-guaranteed"
                                v-else-if="calculatorSelection.length > 0 && hypotheticalMinGrade.x < 1.05">
                                Met een cijfer dat {{ hypotheticalWeight }}× meetelt blijf je in elk geval een voldoende
                                staan.
                            </span>
                            <span key="insufficient-guaranteed"
                                v-else-if="calculatorSelection.length > 0 && hypotheticalMinGrade.y < 5.45">
                                Met een cijfer dat {{ hypotheticalWeight }}× meetelt kun je geen voldoende komen te
                                staan..
                            </span>
                            <span key="advice" v-else-if="calculatorSelection.length > 0 && hypotheticalMinGrade.x > 1.05">
                                Haal een {{ hypotheticalMinGrade.x.toLocaleString('nl-NL', {
                                    minimumFractionDigits: 1,
                                    maximumFractionDigits: 1
                                }) }} {{ hypotheticalMinGrade.x <= 9.95 ? "of hoger" : "" }} om een voldoende te {{
    hypotheticalResultMean >= 5.45 ? "blijven" : "komen" }} staan.
                            </span>
                            <span key="placeholder" v-else>
                                Zie hier wat je moet halen en wat je komt te staan.
                            </span>
                        </TransitionGroup>
                    </template>
                    <template #content>
                        <input type="number" v-model="hypotheticalWeight" />
                        <CollectionHorizontal stretch gapless @mouseleave="calculatorHovering = {}">
                            <div v-for="item in hypotheticalPossibilities" class="grid-column"
                                :data-x="item.x.toLocaleString('nl-NL', { minimumFractionDigits: 1, maximumFractionDigits: 1 })"
                                :data-y="item.y.toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })"
                                @mouseenter="calculatorHovering = { x: item.x, y: item.y }">
                            </div>
                        </CollectionHorizontal>
                    </template>
                </Card>
            </div>
        </TransitionGroup>

    </section>
</template>

<style>
@import "../assets/css/base.css";

#grades {
    display: grid;
    grid-template:
        'heading actions aside' auto
        'content content aside' 1fr
        / 1fr auto 300px;
    gap: 10px;
    max-height: 100vh;
    overflow: hidden;
    transition: grid-template-columns 200ms, gap 200ms;
}

#grades.hide-aside {
    grid-template-columns: 1fr auto 0px;
    column-gap: 0;
}

#grades.hide-aside #aside {
    opacity: 0;
    pointer-events: none;
}

#grade-actions {
    position: relative;
    grid-area: actions;
}

#grade-actions .button {
    margin-top: 0;
}

#aside {
    grid-area: aside;
    position: relative;
    width: 300px;
    overflow-y: auto;
    overflow-x: hidden;
    transition: opacity 200ms;
}

#aside>* {
    min-width: 300px;
    max-width: 300px;
    box-sizing: border-box;
}

#aside>*:not(:last-child),
#calculator>*:not(:last-child) {
    margin-bottom: 10px;
}

#aside .button {
    margin-top: 0;
}

#calculator-added ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

#calculator-added ul>li {
    cursor: pointer;
}

#calculator-added ul>li:hover,
#calculator-added ul>li:focus {
    color: var(--accentWarn);
}

#calculator-added ul>li:not(:last-child) {
    margin-bottom: 6px;
}

#calculator-result {
    padding-top: 7px;
}

#calculator-chart .grid-column {
    height: 40px;
    width: 100%;
    background: var(--);
    transition: none;
}

#calculator-chart .grid-column:hover {
    background: var(--accentDark);
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
    grid-area: content;
    overflow: auto;
}

#container:not(.hide-aside) #table-wrapper {
    padding-right: 10px;
    border-right: 2px solid var(--bgSecondary);
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
    font-size: 12px;
    line-height: 40px;
    font-weight: 600;
}

td.text>.icon {
    position: absolute;
    right: 8px;
    top: 50%;
    translate: 150% -50%;
    transition: translate 200ms, color 200ms, font-variation-settings 200ms;
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
    font-size: 12px;
    line-height: 40px;
    font-weight: 400;
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
    outline: 2px solid var(--accentLight);
    outline-offset: -1px;
}

td.grade>span[data-included=true] {
    box-shadow: inset 0px 0px 0px 4px var(--accentOk);
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

.list-move,
.list-enter-active,
.list-leave-active,
.aside-move,
.aside-enter-active,
.aside-leave-active,
.horizontal-move,
.horizontal-enter-active,
.horizontal-leave-active {
    transition: all 200ms ease;
}

.list-leave-active,
.aside-leave-active,
.horizontal-leave-active {
    position: absolute;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    translate: -30px;
}

.aside-enter-from,
.aside-leave-to {
    opacity: 0;
    scale: .5;
    translate: 0 -25%;
}

.horizontal-enter-from,
.horizontal-leave-to {
    opacity: 0;
    scale: .5 1;
    translate: 25%;
}

@media (width <=620px) {
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