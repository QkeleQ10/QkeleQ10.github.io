export default {
    install: async (app: any, options: { theme: string }) => {
        const colors: any = {
            light: {
                colorPrimary: "#363636",
                colorSecondary: "#585858",
                backgroundPrimary: "#f7f7f7",
                backgroundSecondary: "#ffffff",
                accent: "#629464",
                buttonDefault: "#ebebeb",
                buttonDefaultHover: "#dbe6dc",
                cardShadow: "#aaaaaa60"
            },
            dark: {
                colorPrimary: "#eeeeee",
                colorSecondary: "#bebebe",
                backgroundPrimary: "#2b2b2b",
                backgroundSecondary: "#303030",
                accent: "#77bb78",
                buttonDefault: "#2b2b2b",
                buttonDefaultHover: "#3b473b",
                cardShadow: "#05050560"
            }
        }
        app.config.globalProperties.$theme = () => {
            return colors[options.theme]
        }
    }
}
