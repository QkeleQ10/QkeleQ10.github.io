let strings, langCode

async function localise(t) {
    let langCookie = document.cookie.split("lang=")[1]
    if (langCookie) langCookie = langCookie.split(";")[0]
    langCode = langCookie || window.navigator.language || "en"
    if (t > 0) langCode = window.navigator.language.split("-")[0] || "en"
    if (t > 1) langCode = "en"
    if (t > 2) return

    fetch("https://raw.githubusercontent.com/QkeleQ10/Localisation/master/strings/" + langCode + ".json", { method: 'GET' })
        .then((response) => { return response.json() })
        .then((data) => {
            strings = data
            if (!strings) localise(t + 1)
            document.documentElement.lang = langCode
            document.querySelectorAll("*[data-i18n]").forEach(e => e.innerHTML = strings[e.dataset.i18n] || e.innerHTML)
            document.querySelectorAll(".i18n").forEach(e => e.innerHTML = strings[e.innerHTML] || e.innerHTML)
        })
}

function crowdinproj(name) {
    window.open(`https://crowdin.com/project/${name}`, "_blank")
}

function newpage(page) {
    window.open(page, "_blank")
}