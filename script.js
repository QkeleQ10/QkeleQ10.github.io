let strings = {}
let langCode = "en"

gstrings(1)

async function gstrings(t) {
    let langCookie = document.cookie.split("lang=")[1]
    if (langCookie) langCookie = langCookie.split(";")[0]
    langCode = langCookie || window.navigator.language || "en"
    if (t > 1) langCode = window.navigator.language.split("-")[0] || "en"
    if (t > 2) langCode = "en"
    let requestURL = "https://raw.githubusercontent.com/QkeleQ10/Localisation/master/strings/" + langCode + ".json"
    let request = new XMLHttpRequest()
    request.open('GET', requestURL)
    request.responseType = 'json'
    request.send()
    request.onloadend = function () {
        if (!strings || request.status == 404) gstrings(t + 1)
        strings = request.response
        document.documentElement.lang = langCode
        document.querySelectorAll(".l18n").forEach(e => e.innerHTML = strings[e.innerHTML].replace("%dev%", "Quinten Althues").replace("%support%", "undefined") || e.innerHTML)
        document.querySelectorAll(".l18nP").forEach(e => e.placeholder = strings[e.placeholder] || e.placeholder)
        document.querySelectorAll(".languagediv>*").forEach(e => {
            e.setAttribute("tabindex", "0")
            if (e.getAttribute("onclick").slice(24, 29).split("'")[0] == langCode) {
                e.style.backgroundColor = "var(--transparent)"
                e.style.color = "var(--background)"
                document.getElementById("languagediv").append(e)
            }
        })
    }
}