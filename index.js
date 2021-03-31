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
    let e = document.getElementById("langpicker")
    let langs = ["en", "nl", "de", "fr", "pt", "ru", "tr", "id", "ms", "pl"]
    e.toggleAttribute("disabled")
    e.innerHTML = ""
    e.style.background = "none"
    e.style.padding = "0"
    langs.forEach(l => {
        let b = document.createElement("button")
        b.id = l
        b.innerHTML = l.toUpperCase()
        b.setAttribute("onclick", "picklang(this.id)")
        e.appendChild(b)
        b.style.margin = "0"
        if (langCode == l) b.setAttribute("disabled", true)
        if (e.scrollWidth > e.clientWidth) document.getElementById("bigLogo").style.width = "0"
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