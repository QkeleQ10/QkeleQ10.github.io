let strings, langCode

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

function openlangpicker() {
    let langs = [["en", "English"]]

    fetch(`https://raw.githubusercontent.com/QkeleQ10/Localisation/master/availableLanguages.json`)
        .then((response) => { return response.json() })
        .then((availableLanguages) => {
            fetch(`https://raw.githubusercontent.com/QkeleQ10/Localisation/master/languageNames.json`)
                .then((response) => { return response.json() })
                .then((languageNames) => {
                    availableLanguages.data.sort((a, b) => b.data.words.approved - a.data.words.approved).forEach(e => {
                        if (e.data.translationProgress > 35) langs.push([e.data.languageId, languageNames[e.data.languageId] || `"${e.data.languageId}"`])
                    })

                    let p = document.getElementById("langpopup")
                    p.classList.remove("hidden")
                    document.querySelector(".popupbk").classList.remove("hidden")
                    document.getElementById("langlist").innerHTML = ""

                    langs.forEach((l) => {
                        let b = document.createElement("button")
                        b.id = l[0]
                        if (langCode === l[0]) b.setAttribute("disabled", true)
                        b.innerHTML = l[1]
                        b.setAttribute("onclick", "picklang(this.id)")
                        document.getElementById("langlist").appendChild(b)
                    })
                })
                .catch(() => {
                    console.log("Loading languages: Failed.")
                })
        })
        .catch(() => {
            console.log("Loading languages: Failed.")
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
    window.open(page, "_blank")
}