const el = document.querySelector('.g1')
let c = el.scrollLeft
let m = el.scrollWidth - el.clientWidth
let leB = el.nextElementSibling.querySelector(".leB")
let riB = el.nextElementSibling.querySelector(".riB")
let strings = {}
let langCode = "en"

gstrings(1)

if (c == 0) { leB.classList.remove("active") } else { leB.classList.add("active") }
if (c == m) { riB.classList.remove("active") } else { riB.classList.add("active") }

el.onscroll = function () {
    c = el.scrollLeft
    m = el.scrollWidth - el.clientWidth
    if (c == 0) { leB.classList.remove("active") } else { leB.classList.add("active") }
    if (c == m) { riB.classList.remove("active") } else { riB.classList.add("active") }
}


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
        document.querySelectorAll("*[data-i18n]").forEach(e => e.innerHTML = strings[e.dataset.i18n] || e.innerHTML)
        document.querySelectorAll(".i18n").forEach(e => e.innerHTML = strings[e.innerHTML] || e.innerHTML)
        document.querySelectorAll(".i18nP").forEach(e => e.placeholder = strings[e.placeholder] || e.placeholder)
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

function crowdinproj(name) {
    window.open(`https://crowdin.com/project/${name}`, "_blank")
}

function newpage(page) {
    window.open(page, "_blank")
}