let strings, langCode
const langNamesDefault = new Intl.DisplayNames([], { type: "language", fallback: "none", languageDisplay: 'standard' })

if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
    document.getElementById("vars").href = "/css/varsDark.css"
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    const stylesheet = event.matches ? "/css/varsDark.css" : "/css/varsLight.css"
    document.getElementById("vars").href = stylesheet
})

localise(1)

function localise(t) {
    let langCookie = document.cookie.split("lang=")[1]
    if (langCookie) langCookie = langCookie.split(";")[0]
    langCode = langCookie || window.navigator.language || "en"
    if (t > 1) langCode = window.navigator.language.split("-")[0] || "en"
    if (t > 2) langCode = "en"
    if (t > 3) return console.error("Loading strings: Aborted.")

    fetch(`https://raw.githubusercontent.com/QkeleQ10/Localisation/master/strings/${langCode}.json`)
        .then((response) => { return response.json() })
        .then((data) => {
            strings = data
            if (!strings) localise(t + 1)
            document.documentElement.lang = langCode
            document.querySelectorAll("*[data-i18n]").forEach(e => e.innerHTML = strings[e.dataset.i18n] || e.innerHTML)
            document.querySelectorAll(".i18n").forEach(e => e.innerHTML = strings[e.innerHTML] || e.innerHTML)
        })
        .catch(() => {
            console.log("Loading strings: Failed.")
            localise(t + 1)
        })
}

async function openlangpicker() {
    let langs = [{ id: "en", name: "English", ariaLabel: "English" }],
        res1 = await fetch(`https://raw.githubusercontent.com/QkeleQ10/Localisation/master/availableLanguages.json`),
        availableLanguages = await res1.json()

    availableLanguages.data.forEach(e => {
        const id = e.data.languageId,
            langNamesLocalised = new Intl.DisplayNames([id || "en"], { type: "language", fallback: "none", languageDisplay: 'standard' })
        if (e.data.translationProgress > 35) langs.push({ id: id, name: langNamesLocalised.of(id) || langNamesDefault.of(id) || id, ariaLabel: langNamesDefault.of(id) })
    })

    document.getElementById("langpopup").classList.remove("hidden")
    document.querySelector("#popupWrapper").classList.remove("hidden")
    document.getElementById("langlist").innerHTML = ""

    langs.forEach((l, i) => {
        const b = document.createElement("button")
        b.id = l.id
        if (langCode === l.id) b.classList.add("selected")
        b.innerHTML = l.name.capitalizeFirstLetter()
        b.setAttribute("onclick", "picklang(this.id)")
        b.setAttribute("aria-label", l.ariaLabel)
        document.getElementById("langlist").appendChild(b)
    })
}

function picklang(lang) {
    document.cookie = `lang=${lang}`
    window.location.reload()
}

function crowdinproj(name) {
    window.open(`https://crowdin.com/project/${name}`, "_blank")
}

function newpage(page) {
    window.open(`https://${page}`, "_blank")
}

String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
}